/* Vérification automatique des bras et des mains de tous les signes.
 * Lance : node outils/verifier-bras.js            (résumé)
 *         node outils/verifier-bras.js --detail    (chaque problème, image par image)
 *         node outils/verifier-bras.js --id bonjour (un seul signe)
 * Le script rejoue chaque signe (toutes les 20 ms) et mesure ce qu'un vrai corps ne peut pas faire :
 * bras trop tendu ou trop replié, poignet trop cassé, avant-bras trop tordu, coude dans le corps,
 * main qui traverse la tête ou le buste, mains qui se traversent, main hors de l'image.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RACINE = path.join(__dirname, '..');
global.window = global;
global.console = console;
const charger = (f) => vm.runInThisContext(fs.readFileSync(path.join(RACINE, f), 'utf8'), { filename: f });
['js/moteur/mains.js', 'js/moteur/corps.js', 'js/moteur/lecteur.js', 'js/lsf.js'].forEach(charger);
fs.readdirSync(path.join(RACINE, 'js/data')).filter((f) => f.endsWith('.js')).forEach((f) => charger('js/data/' + f));

const H = window.LSFMains, C = window.LSFCorps, MO = window.LSFMoteur, M = H.M;
const L1 = 140, L2 = 125;
const deg = (r) => (r * 180) / Math.PI;

const args = process.argv.slice(2);
const DETAIL = args.includes('--detail');
const SEUL = args.includes('--id') ? args[args.indexOf('--id') + 1] : null;
const JSON_OUT = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;

/* ---------- volumes du corps (approximation 3D du dessin) ---------- */
// tête : ellipsoïde (le visage est à z ≈ 30-44, les oreilles à z ≈ 0)
const TETE = { c: [200, 118, -10], r: [47, 66, 52] };
const dansTete = (p) => {
  const dx = (p[0] - TETE.c[0]) / TETE.r[0], dy = (p[1] - TETE.c[1]) / TETE.r[1], dz = (p[2] - TETE.c[2]) / TETE.r[2];
  return dx * dx + dy * dy + dz * dz;
};
// buste : largeur selon la hauteur, devant bombé (z ≈ 26 au milieu), dos à z = -60
function demiLargeurBuste(y) {
  if (y < 205) return 0;
  if (y < 250) return 64 + ((y - 205) / 45) * 18;
  if (y < 320) return 82;
  // la robe dessinée est large aux hanches, mais la vraie taille est plus fine : un coude posé contre la taille est normal
  return Math.max(70, 82 - ((y - 320) / 60) * 12);
}
// profondeur à laquelle un point est enfoncé dans le buste (0 = dehors)
function enfonceBuste(p, marge) {
  const hw = demiLargeurBuste(p[1]);
  if (!hw || p[1] > 470) return 0;
  const ex = Math.abs(p[0] - 200);
  if (ex > hw - marge) return 0;
  const devant = 26 * Math.sqrt(Math.max(0, 1 - (ex / hw) ** 2));
  if (p[2] < -60) return 0;
  return Math.max(0, devant - marge - p[2]);
}

/* ---------- mesures sur une main ---------- */
const POINTS_MAIN = ['index', 'majeur', 'annulaire', 'auriculaire', 'pouce', 'paume', 'dos', 'centre', 'jointures', 'tranche', 'cote_index'];

function mesurer(m, cote, autre) {
  const pb = [];
  const W = m.W;
  const S = C.epaule(cote, W);
  const E = C.coude(cote, W, S, m.th, m.coude);
  const R = M.matDeQuat(m.q);
  const T = R[0], F = R[1], N = R[2];
  const mu = cote === 'd' ? -1 : 1;
  const pouceDir = M.mul(T, mu); // côté du pouce (repère écran)

  // 1. longueur du bras
  const dSW = M.len(M.sub(W, S));
  if (dSW > L1 + L2 + 2) pb.push({ type: 'bras-trop-tendu', val: Math.round(dSW - (L1 + L2)), unite: 'px de trop' });
  // léger : avec la grosse tête et le cou court du style anime, une main posée sur la poitrine ou l'épaule est forcément
  // près de l'épaule ; le moteur calcule alors le coude avec une épaule « virtuelle » plus loin (DMIN), le dessin reste naturel
  if (dSW < 60) pb.push({ type: 'bras-trop-replie', val: Math.round(dSW), unite: 'px épaule-poignet', leger: true });

  // 2. poignet : flexion / extension et inclinaison, mesurées dans le repère de la main
  const u = M.norm(M.sub(W, E));
  const uF = M.dot(u, F), uN = M.dot(u, N), uP = M.dot(u, pouceDir);
  const flexion = deg(Math.atan2(-uN, uF));        // + = doigts vers l'intérieur de la paume
  const inclin = deg(Math.atan2(-uP, uF));         // + = vers le pouce (radial)
  const total = deg(Math.acos(M.clamp(uF, -1, 1)));
  // le pli ne compte que s'il se VOIT de face : angle 2D entre l'avant-bras et la main, main pas trop « vers nous »
  const fl2 = Math.hypot(F[0], F[1]), ul2 = Math.hypot(u[0], u[1]);
  const visible = fl2 > 0.45 && ul2 > 0.35 ? deg(Math.acos(M.clamp((F[0] * u[0] + F[1] * u[1]) / (fl2 * ul2), -1, 1))) : 0;
  if (visible > 55) {
    if (flexion > 95) pb.push({ type: 'poignet-trop-plie', val: Math.round(flexion), unite: '° (max ≈ 80)' });
    if (flexion < -88) pb.push({ type: 'poignet-trop-casse-arriere', val: Math.round(-flexion), unite: '° (max ≈ 70)' });
    if (inclin > 45) pb.push({ type: 'poignet-tordu-cote-pouce', val: Math.round(inclin), unite: '° (max ≈ 25)' });
    if (inclin < -62) pb.push({ type: 'poignet-tordu-cote-auriculaire', val: Math.round(-inclin), unite: '° (max ≈ 40)' });
    if (total > 110) pb.push({ type: 'main-retournee-vers-le-bras', val: Math.round(total), unite: '° entre avant-bras et main' });
  }

  // 3. torsion de l'avant-bras (pronation / supination) par rapport au plan du coude
  const a = M.sub(S, E);
  const ap = M.norm(M.sub(a, M.mul(u, M.dot(a, u))));
  const med = M.mul(M.cross(u, ap), cote === 'd' ? 1 : -1); // vers le milieu du corps
  const Np = M.sub(N, M.mul(u, M.dot(N, u)));
  const torsion = deg(Math.atan2(M.dot(Np, ap), M.dot(Np, med))); // + supination (paume vers le haut), - pronation
  // léger : la torsion est mesurée par rapport au plan du coude ; un vrai bras la complète en tournant l'épaule,
  // et le bras dessiné (un tube) ne la montre pas
  if (M.len(Np) > 0.4 && Math.abs(torsion) > 150) pb.push({ type: 'avant-bras-trop-tordu', val: Math.round(torsion), unite: '° de torsion', leger: true });

  // 4. coude
  if ((cote === 'd' && E[0] > 212) || (cote === 'nd' && E[0] < 188)) pb.push({ type: 'coude-de-l-autre-cote', val: Math.round(Math.abs(E[0] - 200)), unite: 'px après le milieu' });
  const coudeDedans = enfonceBuste(E, 8);
  if (coudeDedans > 6) pb.push({ type: 'coude-dans-le-buste', val: Math.round(coudeDedans), unite: 'px' });
  if (E[1] < S[1] - 70) pb.push({ type: 'coude-plus-haut-que-l-epaule', val: Math.round(S[1] - E[1]), unite: 'px', leger: true });

  // 5. bras qui traversent le corps (avant-bras entier, haut du bras sans l'épaule)
  let traverse = 0, traverseTete = false;
  for (let i = 1; i <= 8; i++) {
    const p = M.lerp3(E, W, i / 8);
    traverse = Math.max(traverse, enfonceBuste(p, 12));
    if (dansTete(p) < 0.75) traverseTete = true;
  }
  for (let i = 4; i <= 8; i++) {
    const p = M.lerp3(S, E, i / 8);
    traverse = Math.max(traverse, enfonceBuste(p, 14) * (i < 6 ? 0.5 : 1));
  }
  if (traverse > 8) pb.push({ type: 'bras-dans-le-buste', val: Math.round(traverse), unite: 'px' });
  if (traverseTete) pb.push({ type: 'avant-bras-dans-la-tete' });

  // 6. main qui rentre dans la tête ou le buste
  let tete = 9, buste = 0, horsCadre = 0, derriere = 0;
  for (const nom of POINTS_MAIN) {
    const p = H.pointMonde(m, nom);
    tete = Math.min(tete, dansTete(p));
    buste = Math.max(buste, enfonceBuste(p, 4));
    horsCadre = Math.max(horsCadre, -p[0] - 4, p[0] - 404, -p[1] - 10);
    derriere = Math.max(derriere, -p[2] - 70);
  }
  if (tete < 0.6) pb.push({ type: 'main-dans-la-tete', val: Math.round((1 - tete) * 100), unite: '% enfoncé' });
  if (buste > 10) pb.push({ type: 'main-dans-le-buste', val: Math.round(buste), unite: 'px' });
  if (horsCadre > 0) pb.push({ type: 'main-hors-image', val: Math.round(horsCadre), unite: 'px' });
  if (derriere > 0) pb.push({ type: 'main-derriere-le-corps', val: Math.round(derriere), unite: 'px' });

  // 7. mains qui se traversent (points de cette main dans la paume de l'autre)
  if (autre && autre.W[1] < 470) {
    const Ra = M.matDeQuat(autre.q), mua = autre.cote === 'd' ? -1 : 1;
    let dedans = 0;
    for (const nom of POINTS_MAIN) {
      const p = M.sub(H.pointMonde(m, nom), autre.W);
      const lx = M.dot(p, Ra[0]) * mua / autre.s, ly = M.dot(p, Ra[1]) / autre.s, lz = M.dot(p, Ra[2]) / autre.s;
      if (Math.abs(lx) < 0.4 && ly > 0.1 && ly < 0.95 && Math.abs(lz - 0.02) < 0.07) dedans++;
    }
    if (dedans >= 2) pb.push({ type: 'mains-qui-se-traversent', val: dedans, unite: 'points' });
  }
  return { pb, info: { dSW, flexion, inclin, torsion, E, S } };
}

/* ---------- données des images-clés ---------- */
function verifierDonnees(signe) {
  const pb = [];
  (signe.images || []).forEach((img, i) => {
    for (const cote of ['d', 'nd']) {
      const h = img[cote];
      if (!h || h.paume == null || h.doigts == null) continue;
      const a = H.dirSigneur(h.paume), b = H.dirSigneur(h.doigts);
      if (a && b && Math.abs(M.dot(a, b)) > 0.75) pb.push({ type: 'paume-et-doigts-presque-paralleles', image: i, cote, val: `${h.paume} / ${h.doigts}` });
    }
  });
  return pb;
}

/* ---------- tour de tous les signes ---------- */
const PAS = 20;
const resultats = [];
const signes = window.LSF.signes.filter((s) => !SEUL || s.id === SEUL);
for (const signe of signes) {
  let tl;
  try { tl = MO.construire(signe); } catch (e) { resultats.push({ id: signe.id, mot: signe.mot, erreurs: [{ type: 'erreur-moteur', val: String(e) }] }); continue; }
  const vus = new Map(); // type+cote → pire valeur
  const ajouter = (p, cote, t) => {
    const cle = p.type + '|' + (cote || '');
    const v = typeof p.val === 'number' ? Math.abs(p.val) : 1;
    const ancien = vus.get(cle);
    if (!ancien || v > ancien.v) vus.set(cle, { ...p, cote, t: Math.round(t), v, n: (ancien ? ancien.n : 0) + 1 });
    else ancien.n++;
  };
  // instants à tester : toutes les 20 ms + chaque fin de segment (images-clés)
  const instants = new Set();
  for (let t = 0; t <= tl.total; t += PAS) instants.add(t);
  tl.segs.forEach((s) => instants.add(s.fin));
  // toute l'animation telle que le lecteur la joue en boucle : le signe (avec ses répétitions),
  // puis le retour à la pose de départ (520 ms), puis le redémarrage à t = 0
  const etapes = [...instants].sort((a, b) => a - b).map((t) => ({ t, e: () => MO.echantillon(tl, t) }));
  const fin = tl.total;
  for (let r = PAS; r <= 520; r += PAS) etapes.push({ t: fin + r, retour: true, e: () => MO.etatRetour(tl, r / 520) });
  etapes.push({ t: fin + 520 + PAS, retour: true, e: () => MO.echantillon(tl, 0) });
  const avant = {};
  for (const { t, e: calc, retour } of etapes) {
    const e = calc();
    for (const cote of ['d', 'nd']) {
      const m = e[cote];
      if (!m || m.W[1] > 470) { avant[cote] = null; continue; }
      const autre = e[cote === 'd' ? 'nd' : 'd'];
      const { pb, info } = mesurer(m, cote, cote === 'd' ? autre : null);
      pb.forEach((p) => ajouter(Object.assign(p, retour ? { retour: true } : {}), cote, t));
      const a = avant[cote];
      if (a && t - a.t > 0 && t - a.t <= PAS + 1) {
        const k = PAS / (t - a.t); // ramené à 20 ms
        const saut = M.len(M.sub(info.E, a.E)) * k, main = M.len(M.sub(m.W, a.W)) * k;
        const bout = M.len(M.sub(H.pointMonde(m, 'majeur'), a.bout)) * k;
        // coude qui saute d'un coup alors que la main bouge peu
        if (saut > 14 && saut > main * 2.2) ajouter({ type: 'coude-qui-saute', val: Math.round(saut), unite: 'px en 20 ms', retour }, cote, t);
        // main qui se téléporte (un vrai poignet ne parcourt pas plus de ≈ 6 cm en 20 ms)
        if (main > 45) ajouter({ type: 'main-qui-se-teleporte', val: Math.round(main), unite: 'px en 20 ms', retour }, cote, t);
        else if (bout > 70) ajouter({ type: 'doigts-qui-se-teleportent', val: Math.round(bout), unite: 'px en 20 ms', retour }, cote, t);
      }
      avant[cote] = { E: info.E, W: m.W, bout: H.pointMonde(m, 'majeur'), t };
    }
  }
  verifierDonnees(signe).forEach((p) => ajouter(p, p.cote, 0));
  const erreurs = [...vus.values()];
  if (erreurs.length) resultats.push({ id: signe.id, mot: signe.mot, total: Math.round(tl.total), erreurs });
}

/* ---------- rapport ---------- */
const parType = {}, legers = new Set();
resultats.forEach((r) => r.erreurs.forEach((e) => { if (e.leger) legers.add(e.type); (parType[e.type] = parType[e.type] || []).push(r.id + (e.cote ? '(' + e.cote + ')' : '') + (e.val !== undefined ? ' ' + e.val : '')); }));
console.log(`${signes.length} signes vérifiés, ${resultats.filter((r) => r.erreurs.some((e) => !e.leger)).length} avec au moins un problème.`);
// problèmes sérieux d'abord, puis les remarques « légères » (normales pour ce personnage, voir les commentaires plus haut)
for (const [type, liste] of Object.entries(parType).sort((a, b) => legers.has(a[0]) - legers.has(b[0]) || b[1].length - a[1].length)) {
  console.log(`\n${legers.has(type) ? '· (léger)' : '■'} ${type} : ${liste.length}`);
  console.log('  ' + (DETAIL ? liste.join('\n  ') : liste.slice(0, 25).join(', ') + (liste.length > 25 ? ', …' : '')));
}
if (DETAIL || SEUL) for (const r of resultats) {
  console.log(`\n${r.id} (${r.mot})`);
  r.erreurs.forEach((e) => console.log(`  - ${e.type}${e.cote ? ' [' + e.cote + ']' : ''}${e.val !== undefined ? ' : ' + e.val + ' ' + (e.unite || '') : ''} à t=${e.t} ms (${e.n} images)`));
}
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(resultats, null, 1));
