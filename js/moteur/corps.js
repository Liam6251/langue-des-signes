/* Moteur LSF — corps du personnage (style anime, ombrage « cel » en aplats) :
 * repères, visage, cheveux (carré ou chignon) avec mèches et nœud animés par ressort,
 * robe à manches longues, bras (IK 3D à deux os), caméra « mes yeux » (vue à la première personne).
 * Les repères (endroits du corps) ne changent pas : toutes les données de signes restent valables.
 */
(function () {
  'use strict';
  const { M } = window.LSFMains;
  const f1 = (n) => Math.round(n * 10) / 10;

  // Repères écran pour un signeur droitier vu de face (_dom = à gauche de l'écran)
  const REPERES = {
    tete: [200, 62, 10], front: [200, 94, 34], front_dom: [180, 96, 32], front_non: [220, 96, 32],
    tempe_dom: [156, 106, 12], tempe_non: [244, 106, 12], oeil_dom: [181, 116, 34], oeil_non: [219, 116, 34],
    sourcils: [200, 102, 36], nez: [200, 135, 44], joue_dom: [168, 146, 26], joue_non: [232, 146, 26],
    oreille_dom: [151, 126, 0], oreille_non: [249, 126, 0], bouche: [200, 158, 36], menton: [200, 180, 28],
    cou: [200, 200, 14],
    epaule_dom: [142, 228, 12], epaule_non: [258, 228, 12], poitrine: [200, 268, 24], poitrine_dom: [168, 266, 24],
    poitrine_non: [232, 266, 24], coeur: [226, 262, 24], ventre: [200, 350, 28], ventre_dom: [168, 350, 26],
    ventre_non: [232, 350, 26],
    // espace de signation : à environ un avant-bras devant soi (z ≈ 105) — plus près, le coude rentrait dans le buste
    neutre: [200, 292, 105], neutre_haut: [200, 170, 110], neutre_bas: [200, 352, 100], neutre_dom: [158, 292, 105],
    neutre_non: [242, 292, 105], cote_dom: [92, 250, 60], cote_non: [308, 250, 60], loin: [200, 275, 165],
    dactylo: [134, 214, 95], dactylo_haut: [134, 190, 95], neutre_dom_haut: [156, 236, 100], neutre_non_haut: [244, 236, 100],
    cote_epaule_dom: [122, 236, 70], cote_epaule_non: [278, 236, 70],
    sous_menton: [200, 190, 30], au_dessus_tete: [200, 30, 40], levre_haut: [200, 150, 40],
    coin_bouche_dom: [188, 158, 34], coin_bouche_non: [212, 158, 34], hanche_dom: [118, 410, 20], hanche_non: [282, 410, 20], front_tempe_dom: [166, 98, 24], front_tempe_non: [234, 98, 24],
    repos_dom: [116, 505, 0], repos_non: [284, 505, 0]
  };
  const ALIAS = { levres: 'bouche', yeux: 'sourcils', visage: 'nez', ventre_milieu: 'ventre', espace: 'neutre' };

  function repere(nom, cote) {
    let n = window.LSFMains.sansAccent(nom || 'neutre').replace(/\s+/g, '_');
    if (n === 'repos') n = cote === 'd' ? 'repos_dom' : 'repos_non';
    n = ALIAS[n] || n;
    n = n.replace(/_(droite|droit|d)$/, '_dom').replace(/_(gauche|g|nd)$/, '_non');
    const r = REPERES[n];
    if (!r) { window.LSFMains.avertir('endroit inconnu : ' + nom); return REPERES.neutre.slice(); }
    return r.slice();
  }

  /* ---------- style courant (réglé par l'application) ---------- */
  // theme : null (personnage normal) ou un personnage secret ('coraline', 'arthur', 'zz', 'mavis', 'lune' = Koro Sensei, 'oni' = Ryuk) qui change la tête, le visage et la tenue.
  // Les mains et les bras ne changent pas (seulement leur couleur, via --peau / --haut).
  const STYLE = { coiffure: 'carre', noeud: true, cernes: false, theme: null };
  function regler(style) { Object.assign(STYLE, style || {}); }

  /* ---------- bras ---------- */
  // articulation de l'épaule au bord du buste (avant : trop près du cou → coudes qui montent)
  const EPAULES = { d: [118, 236, -8], nd: [282, 236, -8] };
  // longueurs réalistes (tête ≈ 125 px ≈ 23 cm → bras ≈ 26 cm, avant-bras ≈ 23 cm)
  const L1 = 140, L2 = 125;

  // l'épaule se soulève un peu quand la main monte haut (plus naturel)
  function epaule(cote, W) {
    const S = EPAULES[cote].slice();
    const lev = M.clamp((236 - W[1]) / 26, 0, 6);
    S[1] -= lev;
    S[0] += (cote === 'd' ? 1 : -1) * lev * 0.25;
    return S;
  }

  // profondeur à laquelle un point est rentré dans le buste (0 = dehors) — sert à garder les coudes hors du corps
  function dansBuste(p, marge) {
    if (p[1] < 205 || p[1] > 470) return 0;
    const hw = p[1] < 250 ? 64 + ((p[1] - 205) / 45) * 18 : 82;
    const ex = Math.abs(p[0] - 200);
    if (ex > hw - marge || p[2] < -60) return 0;
    return Math.max(0, 26 * Math.sqrt(Math.max(0, 1 - (ex / hw) ** 2)) - marge - p[2]);
  }

  // angles du poignet (en degrés) pour un avant-bras de direction u et une main d'orientation q
  // flexion + = doigts vers l'intérieur de la paume ; inclin + = vers le pouce ; torsion + = paume qui se tourne vers le haut
  function anglesPoignet(cote, u, q, S, E) {
    const R = M.matDeQuat(q), F = R[1], N = R[2], P = M.mul(R[0], cote === 'd' ? -1 : 1);
    const uF = M.dot(u, F);
    const r = {
      flexion: Math.atan2(-M.dot(u, N), uF) / DEG,
      inclin: Math.atan2(-M.dot(u, P), uF) / DEG,
      total: Math.acos(M.clamp(uF, -1, 1)) / DEG,
      torsion: 0
    };
    if (S && E) {
      const a = M.sub(S, E);
      const ap = M.sub(a, M.mul(u, M.dot(a, u)));
      const Np = M.sub(N, M.mul(u, M.dot(N, u)));
      if (M.len(ap) > 1e-3 && M.len(Np) > 0.4) {
        const apn = M.norm(ap), med = M.mul(M.cross(u, apn), cote === 'd' ? 1 : -1);
        r.torsion = Math.atan2(M.dot(Np, apn), M.dot(Np, med)) / DEG;
      }
    }
    return r;
  }
  const DEG = Math.PI / 180;

  // Butées du poignet (degrés) : un vrai poignet ne va pas plus loin. Si une pose demande plus, la main
  // tourne juste assez vers l'avant-bras pour rester possible (comme un vrai corps qui « force » au maximum).
  const BUTEES = { flexion: 85, extension: 75, pouce: 30, auriculaire: 45 };
  const dansButees = (a) => a.flexion <= BUTEES.flexion + 0.5 && -a.flexion <= BUTEES.extension + 0.5 && a.inclin <= BUTEES.pouce + 0.5 && -a.inclin <= BUTEES.auriculaire + 0.5;
  const tourner = (v, k, a) => { const c = Math.cos(a), s = Math.sin(a); return M.add(M.add(M.mul(v, c), M.mul(M.cross(k, v), s)), M.mul(k, M.dot(k, v) * (1 - c))); };
  const tournerQ = (q, k, a) => { const R = M.matDeQuat(q); return M.quatDeMat([tourner(R[0], k, a), tourner(R[1], k, a), tourner(R[2], k, a)]); };
  function limiterPoignet(cote, q, W, E, S) {
    const u = M.norm(M.sub(W, E));
    if (dansButees(anglesPoignet(cote, u, q, S, E))) return q;
    const R = M.matDeQuat(q), F = R[1];
    let k = M.cross(u, F);
    if (M.len(k) < 1e-4) k = R[2]; // main exactement à l'envers de l'avant-bras
    k = M.norm(k);
    const theta = Math.acos(M.clamp(M.dot(u, F), -1, 1));
    let lo = 0, hi = 1;
    for (let i = 0; i < 12; i++) {
      const mid = (lo + hi) / 2;
      if (dansButees(anglesPoignet(cote, u, tournerQ(q, k, -mid * theta), S, E))) hi = mid; else lo = mid;
    }
    return tournerQ(q, k, -hi * theta);
  }

  // « gêne » d'une position du coude : poignet cassé, avant-bras tordu, coude levé sans raison,
  // coude dans le corps ou derrière le dos. Plus c'est petit, plus c'est naturel.
  function geneCoude(cote, W, S, E, q) {
    let g = 0;
    if (q) {
      const u = M.norm(M.sub(W, E));
      const w = anglesPoignet(cote, u, q, S, E);
      const fl = Math.max(0, w.flexion - 78) + Math.max(0, -w.flexion - 70);
      const inc = Math.max(0, w.inclin - 20) + Math.max(0, -w.inclin - 35);
      const tor = Math.max(0, Math.abs(w.torsion) - 110);
      g += fl * fl + 1.6 * inc * inc + 0.6 * tor * tor + 0.06 * w.total * w.total;
    }
    const leve = Math.max(0, S[1] + 105 - E[1]);         // coude qui remonte (au repos il est ≈ 120 px sous l'épaule)
    const haut = Math.max(0, S[1] + 6 - E[1]);           // coude au-dessus de l'épaule
    const ecarte = cote === 'd' ? Math.max(0, S[0] - 35 - E[0]) : Math.max(0, E[0] - S[0] - 35); // coude écarté sur le côté
    const dedans = dansBuste(E, 10);                      // coude rentré dans le buste
    const dos = Math.max(0, -E[2] - 25);                  // coude derrière le dos
    const travers = cote === 'd' ? Math.max(0, E[0] - 175) : Math.max(0, 225 - E[0]); // coude passé de l'autre côté
    g += 0.3 * leve * leve + 0.9 * haut * haut + 0.8 * ecarte * ecarte + 40 * dedans * dedans + 3 * dos * dos + 6 * travers * travers;
    // le coude et l'avant-bras ne traversent jamais la tête (ellipsoïde qui passe par les repères du visage)
    for (let i = 0; i <= 6; i++) {
      const p = M.lerp3(E, W, i / 9);
      const dx = (p[0] - 200) / 47, dy = (p[1] - 118) / 66, dz = (p[2] + 10) / 52, r = dx * dx + dy * dy + dz * dz;
      if (r < 1.1) g += 6000 * (1.1 - r);
    }
    // l'avant-bras ne doit pas passer devant le visage (il le cacherait : les expressions comptent en LSF)
    for (let i = 1; i <= 6; i++) {
      const p = M.lerp3(E, W, i / 9);
      const dx = (p[0] - 200) / 50, dy = (p[1] - 120) / 66;
      const r = dx * dx + dy * dy;
      if (r < 1) g += 1000 * (1 - r);
    }
    return g;
  }

  // Cercle des coudes possibles : pour une épaule S et un poignet W donnés, le coude peut tourner autour de l'axe
  // épaule → poignet. Angle 0 = coude « par défaut » (il pend vers le bas, un peu dehors et un peu en avant).
  function cercleCoude(cote, W, S) {
    const w = [W[0], W[1], W[2] || 0];
    let dv = M.sub(w, S);
    let d = M.len(dv) || 1;
    const u = M.mul(dv, 1 / d);
    // personnage style anime (grosse tête, cou court) : une main près du visage est très près de l'épaule.
    // Dans ce cas on calcule le coude comme si l'épaule était un peu plus loin (bras moins écrasé).
    const DMIN = 100;
    if (d < DMIN) { S = M.sub(w, M.mul(u, DMIN)); d = DMIN; }
    if (d >= L1 + L2 - 0.5) return { tendu: true, E: M.add(S, M.mul(u, L1)) };
    const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
    const pole = M.norm([cote === 'd' ? -0.35 : 0.35, 1, 0.45]);
    let perp = M.sub(pole, M.mul(u, M.dot(pole, u)));
    if (M.len(perp) < 0.15) perp = M.sub([0, 0, 1], M.mul(u, u[2]));
    perp = M.norm(perp);
    const centre = M.add(S, M.mul(u, a)), autre = M.cross(u, perp);
    return { w, centre, h, perp, autre, point: (t) => M.add(centre, M.add(M.mul(perp, h * Math.cos(t)), M.mul(autre, h * Math.sin(t)))) };
  }

  // Meilleur angle du coude pour une main d'orientation q (calculé une fois par image-clé, puis interpolé
  // en douceur pendant le mouvement : le coude ne saute jamais d'une position à une autre).
  // prec (facultatif) : { W, E } de l'image-clé précédente → le coude reste où il était si la main bouge peu
  function angleCoude(cote, W, q, prec) {
    const S = epaule(cote, W), c = cercleCoude(cote, W, S);
    const bougeMain = prec ? M.len(M.sub(W, prec.W)) : 0;
    if (c.tendu || !q) return 0;
    const N = 72, pas = (2 * Math.PI) / N, gens = [];
    let imin = 0;
    for (let i = 0; i < N; i++) {
      const t = i < N / 2 ? i * pas : (i - N) * pas; // de -180° à +180°
      // petite préférence pour le coude par défaut : à gêne égale, on garde la position habituelle
      const E = c.point(t);
      let g = geneCoude(cote, c.w, S, E, q) + 260 * (1 - Math.cos(t));
      if (prec) { const dep = Math.max(0, M.len(M.sub(E, prec.E)) - 0.8 * bougeMain); g += 0.7 * dep * dep; }
      gens.push({ t, g });
      if (gens[i].g < gens[imin].g) imin = i;
    }
    // affinage autour du meilleur angle (moyenne pondérée des voisins proches seulement)
    let acc = 0, tot = 0;
    for (let k = -4; k <= 4; k++) {
      const e = gens[(imin + k + N) % N];
      const poids = Math.exp(-(e.g - gens[imin].g) / 150);
      acc += (gens[imin].t + k * pas) * poids; tot += poids;
    }
    const t = acc / tot;
    return Math.atan2(Math.sin(t), Math.cos(t));
  }

  // IK 3D à deux os : th = angle du coude sur son cercle (0 = position par défaut).
  // cible (facultatif) : point vers lequel on veut le coude (pendant un mouvement, le coude glisse entre ses
  // positions des images-clés) ; on prend le point du cercle le plus proche → pas de saut brusque.
  function coude(cote, W, S, th, cible) {
    S = S || EPAULES[cote];
    const c = cercleCoude(cote, W, S);
    if (c.tendu) return c.E;
    if (cible) {
      let v = M.sub(cible, c.centre);
      const u = M.cross(c.perp, c.autre);
      v = M.sub(v, M.mul(u, M.dot(v, u)));
      if (M.len(v) > 1) return M.add(c.centre, M.mul(M.norm(v), c.h));
    }
    return c.point(th || 0);
  }

  const ortho = (p) => [p[0], p[1], p[2] || 0, 1];

  function trait(a, b, w, col, extra) {
    return `<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" stroke="${col}" stroke-width="${f1(w)}" stroke-linecap="round"${extra || ''}/>`;
  }

  /**
   * Bras en manche longue : épaule → coude → poignet, avec revers de manche et ombrage.
   * cam (facultatif) : projection 3D → [x, y, profondeur, échelle] ou null si derrière la caméra.
   */
  function dessinerBras(cote, W, cam, opts) {
    opts = opts || {};
    const proj = cam || ortho;
    const S3 = epaule(cote, W);
    const E3 = coude(cote, W, S3, opts.th, opts.coude);
    const R3 = M.lerp3(E3, W, 0.86); // fin de manche (revers)
    let S = opts.avantBrasSeul ? null : proj(S3);
    const E = proj(opts.avantBrasSeul ? M.lerp3(W, E3, 0.75) : E3), Wp = proj(W), R = proj(R3);
    if (!E || !Wp || !R) return '';
    const ow = 2.1;
    const k = (p) => (p ? p[3] : 1);
    let kH = (k(S) + k(E)) / 2;
    if (cam && !opts.avantBrasSeul) {
      // vue « mes yeux » : l'épaule est trop près de l'œil ; le haut du bras sort simplement par le bas de l'image
      let dx = S ? S[0] - E[0] : (cote === 'd' ? 1 : -1), dy = S ? S[1] - E[1] : 1;
      if (dy < 0.3) dy = 0.3;
      const l = Math.hypot(dx, dy) || 1;
      S = [E[0] + (dx / l) * 700, E[1] + (dy / l) * 700, E[2], E[3]];
      kH = k(E) * 1.15;
    }
    const kB = (k(E) + k(Wp)) / 2;
    const wH = 31 * kH, wB = 25 * kB, wP = 15 * k(Wp);
    // ombre portée du côté opposé à la lumière (haut-gauche)
    const ombre = (a, b, w) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      let nx = -dy / l, ny = dx / l;
      if (nx * 0.6 + ny * 0.8 < 0) { nx = -nx; ny = -ny; }
      const o = w * 0.22;
      return trait([a[0] + nx * o, a[1] + ny * o], [b[0] + nx * o, b[1] + ny * o], w * 0.5, 'var(--haut-ombre)', ' opacity=".85"');
    };
    let s = '';
    // poignet (peau) sous le revers
    s += trait(R, Wp, wP + ow * 2, 'var(--contour)') + trait(R, Wp, wP, 'var(--peau)');
    // contours de la manche puis remplissage (pas de couture visible au coude)
    if (S) s += trait(S, E, wH + ow * 2, 'var(--contour)');
    s += trait(E, R, wB + ow * 2, 'var(--contour)');
    if (S) s += trait(S, E, wH, 'var(--haut)');
    s += trait(E, R, wB, 'var(--haut)');
    if (S) s += ombre(S, E, wH);
    s += ombre(E, R, wB);
    // reflet clair du côté de la lumière (perpendiculaire à la manche, jamais en dehors du contour)
    if (S) {
      const dx = E[0] - S[0], dy = E[1] - S[1], l = Math.hypot(dx, dy) || 1;
      let nx = -dy / l, ny = dx / l;
      if (nx * 0.6 + ny * 0.8 > 0) { nx = -nx; ny = -ny; }
      const o = wH * 0.24;
      s += trait([S[0] + nx * o + dx * 0.08, S[1] + ny * o + dy * 0.08], [E[0] + nx * o - dx * 0.08, E[1] + ny * o - dy * 0.08], wH * 0.14, 'var(--haut-clair)', ' opacity=".45"');
    }
    // revers de manche
    const rv = M.lerp3(R, E, 0.12);
    s += trait(rv, R, wB * 1.06 + ow * 2, 'var(--contour)') + trait(rv, R, wB * 1.06, 'var(--haut-revers)');
    if (STYLE.theme === 'lune') s += bandesManche(R, E, wB);
    if (STYLE.theme === 'arthur') s += galonManche(R, E, wB);
    if (STYLE.theme === 'zz') s += galonManche(R, E, wB, ZZ_OR);
    if (STYLE.theme === 'lumiere') s += galonManche(R, E, wB, LUM_CHEMISE);
    return s;
  }

  /* ---------- visage ---------- */
  const VISAGES = {
    neutre: { sourcils: 0, froncer: 0, yeux: 1, largeur: 1, ouvert: 0, sourire: 0.22 },
    sourire: { sourcils: 0.15, froncer: 0, yeux: 0.92, largeur: 1.15, ouvert: 0.1, sourire: 0.95 },
    joie: { sourcils: 0.45, froncer: 0, yeux: 0.7, largeur: 1.25, ouvert: 0.55, sourire: 1, dents: 1 },
    triste: { sourcils: 0.2, froncer: -0.9, yeux: 0.8, largeur: 0.95, ouvert: 0, sourire: -0.75 },
    surpris: { sourcils: 1, froncer: 0, yeux: 1.3, largeur: 0.7, ouvert: 0.75, sourire: 0 },
    question: { sourcils: 0.95, froncer: 0, yeux: 1.15, largeur: 0.95, ouvert: 0, sourire: 0, tete: 3 },
    interrogatif: { sourcils: -0.45, froncer: 0.9, yeux: 0.85, largeur: 0.95, ouvert: 0, sourire: -0.1, tete: 2 },
    colere: { sourcils: -0.6, froncer: 1, yeux: 0.9, largeur: 0.9, ouvert: 0.12, sourire: -0.7, dents: 1 },
    degout: { sourcils: -0.35, froncer: 0.55, yeux: 0.7, largeur: 0.85, ouvert: 0.1, sourire: -0.6, langue: 0.6 },
    peur: { sourcils: 0.85, froncer: -0.6, yeux: 1.3, largeur: 0.8, ouvert: 0.38, sourire: -0.35 },
    fatigue: { sourcils: -0.1, froncer: -0.3, yeux: 0.42, largeur: 0.9, ouvert: 0.05, sourire: -0.2 },
    concentre: { sourcils: -0.3, froncer: 0.45, yeux: 0.82, largeur: 0.8, ouvert: 0, sourire: 0 },
    moue: { sourcils: 0.1, froncer: -0.2, yeux: 0.95, largeur: 0.68, ouvert: 0, sourire: -0.45 }
  };
  const BOUCHES = {
    fermee: { ouvert: 0, langue: 0, dents: 0 },
    ouverte: { ouvert: 0.7 },
    o: { ouvert: 0.6, largeur: 0.55, sourire: 0 },
    serree: { ouvert: 0, largeur: 0.82, sourire: -0.1 },
    souffle: { joues: 1, ouvert: 0, largeur: 0.55, sourire: 0 },
    langue: { ouvert: 0.42, langue: 1 },
    dents: { ouvert: 0.28, dents: 1, largeur: 1.2 }
  };
  const BASE_VISAGE = { sourcils: 0, froncer: 0, yeux: 1, largeur: 1, ouvert: 0, sourire: 0, joues: 0, langue: 0, dents: 0, tete: 0 };

  function paramsVisage(visage, bouche) {
    const nom = window.LSFMains.sansAccent(visage || 'neutre');
    const v = VISAGES[nom] || VISAGES.neutre;
    if (!VISAGES[nom]) window.LSFMains.avertir('visage inconnu : ' + visage);
    const p = Object.assign({}, BASE_VISAGE, v);
    if (bouche) {
      const b = BOUCHES[window.LSFMains.sansAccent(bouche)];
      if (b) Object.assign(p, b); else window.LSFMains.avertir('bouche inconnue : ' + bouche);
    }
    return p;
  }
  function lerpVisage(a, b, t) {
    const r = {};
    for (const k in BASE_VISAGE) r[k] = M.lerp(a[k], b[k], t);
    return r;
  }

  // yeux, joues, nez, bouche (les sourcils sont dessinés à part, par-dessus la frange)
  function dessinerVisage(p, cligne, regard) {
    regard = regard || [0, 0];
    if (STYLE.theme === 'lune') return visageLune(p, cligne, regard);
    if (STYLE.theme === 'oni') return visageOni(p, cligne, regard);
    let s = '';
    // joues gonflées
    if (p.joues > 0.05) {
      const j = p.joues;
      s += `<ellipse cx="${f1(161 - j * 3)}" cy="152" rx="${f1(10 + j * 5)}" ry="${f1(12 + j * 4)}" fill="var(--peau)"/>` +
        `<ellipse cx="${f1(239 + j * 3)}" cy="152" rx="${f1(10 + j * 5)}" ry="${f1(12 + j * 4)}" fill="var(--peau)"/>` +
        `<path d="M${f1(154 - j * 2)} 138Q${f1(143 - j * 6)} 152 ${f1(156 - j * 2)} 168M${f1(246 + j * 2)} 138Q${f1(257 + j * 6)} 152 ${f1(244 + j * 2)} 168" fill="none" stroke="var(--contour)" stroke-width="2.4" stroke-linecap="round" opacity="${f1(Math.min(1, j * 1.4))}"/>`;
    }
    // joues roses façon anime (ovale + petits traits) — pas pour le style « cernes » ni pour Arthur (plus sérieux)
    const arthur = STYLE.theme === 'arthur', cora = STYLE.theme === 'coraline', mavis = STYLE.theme === 'mavis', zz = STYLE.theme === 'zz', lum = STYLE.theme === 'lumiere', aly = STYLE.theme === 'alysa';
    const oeil = arthur ? '#3F7FC4' : 'var(--oeil)', oeilClair = arthur ? '#A9D6F7' : 'var(--oeil-clair)';
    // ZZ : grande cicatrice de brûlure autour de l'œil droit de l'écran (sous les yeux, cachée en haut par la frange)
    if (zz) s += cicatriceZZ();
    for (const cx of STYLE.cernes || arthur || zz || lum ? [] : [167, 233]) {
      // Coraline : joues à peine rosées + taches de rousseur ; Mavis : joues roses sans les petits traits
      s += `<ellipse cx="${cx}" cy="146" rx="${f1(9.5 + p.joues * 4)}" ry="5.5" fill="var(--blush)" opacity="${f1((cora ? 0.2 : 0.42) + p.joues * 0.2)}"/>` +
        (cora || mavis ? '' : `<path d="M${cx - 5} 148l2.4 -4M${cx - 1} 148l2.4 -4M${cx + 3} 148l2.4 -4" stroke="var(--blush-trait)" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>`);
      if (cora || aly) for (const [dx, dy] of [[-6, -8], [-1, -6], [4, -8], [-3, -2], [3, -3]]) s += `<circle cx="${cx + dx}" cy="${146 + dy}" r="1.05" fill="#B9785C" opacity=".8"/>`;
    }
    // yeux : grands ovales sombres, deux reflets, paupière épaisse
    const o = p.yeux * (cligne ? 0.06 : 1);
    const heureux = p.sourire > 0.75 && p.yeux < 0.85;
    const rx = M.clamp(regard[0], -2, 2), ry = M.clamp(regard[1], -1.5, 2);
    for (const cx of [181, 219]) {
      const cy = 119;
      if (heureux) {
        s += `<path d="M${cx - 7} ${cy + 1}Q${cx} ${cy - 8} ${cx + 7} ${cy + 1}" fill="none" stroke="var(--contour)" stroke-width="3.2" stroke-linecap="round"/>`;
      } else if (o < 0.45) {
        s += `<path d="M${cx - 7} ${cy}Q${cx} ${f1(cy + 3 + o * 4)} ${cx + 7} ${cy}" fill="none" stroke="var(--contour)" stroke-width="3" stroke-linecap="round"/>`;
      } else if (STYLE.cernes) {
        // grands yeux fixes : blanc de l'œil, petite pupille, cernes sombres tout autour
        const h = 8.2 * o;
        s += `<ellipse cx="${cx}" cy="${cy + 1}" rx="12" ry="${f1(h + 4.5)}" fill="var(--cerne)" opacity=".55"/>` +
          `<path d="M${cx - 10} ${f1(cy + h * 0.7 + 2)}Q${cx} ${f1(cy + h + 7)} ${cx + 10} ${f1(cy + h * 0.7 + 2)}" fill="none" stroke="var(--cerne-trait)" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>` +
          `<ellipse cx="${cx}" cy="${cy}" rx="8.2" ry="${f1(h)}" fill="#FBF8F4" stroke="var(--contour)" stroke-width="1.8"/>` +
          `<circle cx="${f1(cx + rx * 1.3)}" cy="${f1(cy + ry * 0.8)}" r="${f1(Math.min(3.8, h * 0.5))}" fill="var(--oeil)"/>` +
          `<circle cx="${f1(cx + rx * 1.3 + 1.2)}" cy="${f1(cy + ry * 0.8 - 1.3)}" r="1.1" fill="#fff"/>` +
          `<path d="M${cx - 9} ${f1(cy - h * 0.55)}Q${cx} ${f1(cy - h * 1.25)} ${cx + 9} ${f1(cy - h * 0.55)}" fill="none" stroke="var(--contour)" stroke-width="2.6" stroke-linecap="round"/>`;
      } else if (cora || mavis) {
        s += grandsYeux(cx, cy, o, rx, ry, mavis);
      } else if (zz) {
        s += oeilAmande(cx, cy, o, rx, ry, '#C98A1E', '#F6C855', cx > 200 ? 0.6 : 1);
      } else if (lum) {
        s += oeilAmande(cx, cy, o, rx, ry, '#8E3A1C', '#E08A55', 0.92);
      } else {
        const h = 8 * o;
        s += `<ellipse cx="${f1(cx + rx)}" cy="${f1(cy + ry)}" rx="5.8" ry="${f1(h)}" fill="${oeil}"/>` +
          `<ellipse cx="${f1(cx + rx)}" cy="${f1(cy + ry + h * 0.35)}" rx="3.6" ry="${f1(h * 0.42)}" fill="${oeilClair}" opacity="${arthur ? '.9' : '.55'}"/>` +
          (arthur ? `<circle cx="${f1(cx + rx)}" cy="${f1(cy + ry)}" r="${f1(Math.min(2.4, h * 0.3))}" fill="#14243A"/>` : '') +
          `<circle cx="${f1(cx + rx + 1.9)}" cy="${f1(cy + ry - h * 0.38)}" r="2.1" fill="#fff"/>` +
          `<circle cx="${f1(cx + rx - 1.8)}" cy="${f1(cy + ry + h * 0.3)}" r=".95" fill="#fff" opacity=".9"/>` +
          `<path d="M${cx - 8} ${f1(cy - h * 0.62)}Q${cx} ${f1(cy - h * 1.32)} ${cx + 8} ${f1(cy - h * 0.62)}" fill="none" stroke="var(--contour)" stroke-width="2.8" stroke-linecap="round"/>` +
          (aly
            // Alysa : trait d'eye-liner en aile, bien marqué au coin extérieur
            ? (cx < 200 ? `<path d="M${cx - 8} ${f1(cy - h * 0.62)}l-6.5 -4" stroke="var(--contour)" stroke-width="2.8" stroke-linecap="round"/>`
              : `<path d="M${cx + 8} ${f1(cy - h * 0.62)}l6.5 -4" stroke="var(--contour)" stroke-width="2.8" stroke-linecap="round"/>`)
            : cx < 200 ? `<path d="M${cx - 8} ${f1(cy - h * 0.62)}l-3 -2" stroke="var(--contour)" stroke-width="2" stroke-linecap="round"/>`
            : `<path d="M${cx + 8} ${f1(cy - h * 0.62)}l3 -2" stroke="var(--contour)" stroke-width="2" stroke-linecap="round"/>`);
      }
    }
    // nez : petit trait
    s += `<path d="M201 133Q198.5 137 201.5 138.5" fill="none" stroke="var(--peau-ombre)" stroke-width="2.2" stroke-linecap="round"/>`;
    // bouche
    const cx = 200, cy = 159, hw = 9.5 * p.largeur, sm = p.sourire, op = p.ouvert;
    const coinY = cy - sm * 3.5;
    // lèvres : rouge doux pour Coraline, rouge à lèvres noir pour Mavis
    const levre = cora ? '#B5454B' : mavis ? '#2E1E30' : aly ? '#C4433F' : 'var(--contour)';
    if (op < 0.06) {
      s += `<path d="M${f1(cx - hw)} ${f1(coinY)}Q${cx} ${f1(cy + sm * 6)} ${f1(cx + hw)} ${f1(coinY)}" fill="none" stroke="${levre}" stroke-width="${mavis ? 3.2 : 2.6}" stroke-linecap="round"/>`;
    } else {
      const haut = cy - op * 3 + sm * 2;
      const bas = cy + op * 15 + sm * 4;
      const d = `M${f1(cx - hw)} ${f1(coinY)}Q${cx} ${f1(haut)} ${f1(cx + hw)} ${f1(coinY)}Q${cx} ${f1(bas)} ${f1(cx - hw)} ${f1(coinY)}Z`;
      s += `<path d="${d}" fill="var(--bouche)" stroke="${levre}" stroke-width="${mavis ? 3 : 2.4}" stroke-linejoin="round"/>`;
      // Mavis est une vampire : deux petits crocs quand elle ouvre la bouche
      if (mavis && op > 0.15) {
        const yc = (coinY + haut) / 2 + 0.6;
        s += `<path d="M${f1(cx - 6.5)} ${f1(yc)}L${f1(cx - 4.6)} ${f1(yc + 4.6)}L${f1(cx - 2.8)} ${f1(yc)}ZM${f1(cx + 2.8)} ${f1(yc)}L${f1(cx + 4.6)} ${f1(yc + 4.6)}L${f1(cx + 6.5)} ${f1(yc)}Z" fill="#fff" stroke="var(--contour)" stroke-width=".8" stroke-linejoin="round"/>`;
      }
      if (p.dents > 0.3) {
        s += `<path d="M${f1(cx - hw * 0.72)} ${f1(coinY + 1.2)}Q${cx} ${f1(haut + 1.5)} ${f1(cx + hw * 0.72)} ${f1(coinY + 1.2)}L${f1(cx + hw * 0.6)} ${f1(coinY + 4)}Q${cx} ${f1(haut + 5.5)} ${f1(cx - hw * 0.6)} ${f1(coinY + 4)}Z" fill="#fff" opacity=".95"/>`;
      }
      if (p.langue > 0.3) {
        s += `<ellipse cx="${cx}" cy="${f1(cy + op * 10.5 + sm * 3)}" rx="${f1(hw * 0.55)}" ry="${f1(3 + op * 4 * p.langue)}" fill="var(--langue)"/>`;
      }
    }
    return s;
  }

  function dessinerSourcils(p) {
    if (STYLE.theme === 'lune') return sourcilsLune(p);
    if (STYLE.theme === 'oni') return sourcilsOni(p);
    if (STYLE.theme === 'zz') return sourcilsZZ(p);
    if (STYLE.theme === 'lumiere') return sourcilsLumiere(p);
    const by = 104 - p.sourcils * 7;
    const fr = p.froncer * 4.5;
    // Coraline : fins sourcils bruns (pas bleus comme ses cheveux)
    const cora = STYLE.theme === 'coraline';
    // Alysa : sourcils brun foncé (ses racines sont brunes), même si ses cheveux sont surtout blonds
    const coul = cora ? '#7A4E3A' : STYLE.theme === 'alysa' ? ALY_BRUN : 'var(--cheveux-sombre)';
    return `<path d="M170 ${f1(by + 2)}Q180 ${f1(by - 3 + fr * 0.2)} 191 ${f1(by + fr)}M230 ${f1(by + 2)}Q220 ${f1(by - 3 + fr * 0.2)} 209 ${f1(by + fr)}" fill="none" stroke="${coul}" stroke-width="${cora ? 2.6 : 3.6}" stroke-linecap="round" opacity=".95"/>`;
  }

  /* ---------- tête, cheveux, nœud ---------- */
  const TRAIT = 'stroke="var(--contour)" stroke-width="2.4" stroke-linejoin="round"';

  // cheveux derrière la tête (bougent avec la tête)
  function cheveuxArriere() {
    if (STYLE.theme === 'lune') return '';
    if (STYLE.theme === 'oni') return cheveuxArriereOni();
    if (STYLE.theme === 'arthur') return cheveuxArriereArthur();
    if (STYLE.theme === 'coraline') return cheveuxArriereCoraline();
    if (STYLE.theme === 'mavis') return cheveuxArriereMavis();
    if (STYLE.theme === 'zz') return cheveuxArriereZZ();
    if (STYLE.theme === 'lumiere') return cheveuxArriereLumiere();
    if (STYLE.theme === 'alysa') return cheveuxArriereAlysa();
    if (STYLE.coiffure === 'chignon') {
      return `<circle cx="226" cy="58" r="20" fill="var(--cheveux)" ${TRAIT}/>` +
        `<path d="M212 70Q224 76 238 68" fill="none" stroke="var(--accent-perso)" stroke-width="5" stroke-linecap="round"/>`;
    }
    if (STYLE.coiffure === 'ebouriffe') {
      // cheveux en épis dans tous les sens, jusque sous la mâchoire
      // masse arrondie en haut, mèches en pointes qui retombent sur les côtés et dans le cou
      return `<path d="M174 48L166 24L188 42L198 18L210 42L230 26L230 50L256 42L244 62Z" fill="var(--cheveux)" ${TRAIT}/>` +
        `<path d="M200 40C166 40 146 60 140 86L122 90L138 104L116 118L138 126L120 150L142 148L132 176L152 162L156 188L172 170L228 170L244 188L248 162L268 176L258 148L280 150L262 126L284 118L262 104L278 90L260 86C254 60 234 40 200 40Z" fill="var(--cheveux)" ${TRAIT}/>` +
        `<path d="M146 112L132 136M254 112L268 136M150 150L142 170M250 150L258 170" fill="none" stroke="var(--cheveux-reflet)" stroke-width="2" stroke-linecap="round" opacity=".3"/>`;
    }
    // carré : la masse tombe jusqu'à la mâchoire de chaque côté
    return `<path d="M200 44C160 44 138 72 141 112C142 140 138 160 145 177C153 184 167 182 171 172L229 172C233 182 247 184 255 177C262 160 258 140 259 112C262 72 240 44 200 44Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M146 150C148 164 152 172 160 176M254 150C252 164 248 172 240 176" fill="none" stroke="var(--cheveux-sombre)" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  }

  function tete() {
    if (STYLE.theme === 'lune') return teteLune();
    if (STYLE.theme === 'oni') return teteOni();
    return (
      `<ellipse cx="153" cy="126" rx="8" ry="12" fill="var(--peau)" ${TRAIT}/>` +
      `<ellipse cx="247" cy="126" rx="8" ry="12" fill="var(--peau)" ${TRAIT}/>` +
      `<path d="M153 120C153 52 247 52 247 120C247 155 229 181 200 181C171 181 153 155 153 120Z" fill="var(--peau)" stroke="var(--contour)" stroke-width="2.6"/>` +
      // ombre douce sur les côtés du visage (volume)
      `<path d="M156 128C158 154 172 174 190 179C172 178 157 160 156 128ZM244 128C242 154 228 174 210 179C228 178 243 160 244 128Z" fill="var(--peau-ombre)" opacity=".35"/>`
    );
  }

  // cheveux devant : calotte + frange, ombre portée de la frange sur le front
  function cheveuxAvant() {
    if (STYLE.theme === 'lune') return chapeauLune();
    if (STYLE.theme === 'oni') return cheveuxAvantOni();
    if (STYLE.theme === 'arthur') return cheveuxAvantArthur();
    if (STYLE.theme === 'coraline') return cheveuxAvantCoraline();
    if (STYLE.theme === 'mavis') return cheveuxAvantMavis();
    if (STYLE.theme === 'zz') return cheveuxAvantZZ();
    if (STYLE.theme === 'lumiere') return cheveuxAvantLumiere();
    if (STYLE.theme === 'alysa') return cheveuxAvantAlysa();
    if (STYLE.coiffure === 'chignon') {
      return `<path d="M151 122C144 74 178 50 205 51C236 52 258 78 249 122C246 104 240 92 228 86C214 80 196 93 176 88C164 92 155 106 151 122Z" fill="var(--cheveux)" ${TRAIT}/>` +
        `<path d="M190 60C182 68 176 78 174 88M214 58C224 66 232 76 236 88" fill="none" stroke="var(--cheveux-reflet)" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>`;
    }
    if (STYLE.coiffure === 'ebouriffe') {
      // frange en pointes qui retombe jusqu'aux yeux
      const pointes = 'M150 120C144 70 170 46 200 46C230 46 256 70 250 120L244 104L240 126L232 100L226 122L218 98L212 118L205 96L199 124L192 98L186 118L179 99L173 124L166 100L160 120L156 104Z';
      return (
        `<path d="M158 106L166 112L173 106L180 113L186 106L192 112L199 106L206 112L212 106L218 112L226 106L232 112L240 106L242 114L232 120L226 116L218 120L212 116L205 120L199 116L192 120L186 116L180 120L173 116L166 120L158 116Z" fill="var(--peau-ombre)" opacity=".5"/>` +
        `<path d="${pointes}" fill="var(--cheveux)" ${TRAIT}/>` +
        `<path d="M180 60L186 80M204 56L202 78M224 60L218 80" fill="none" stroke="var(--cheveux-reflet)" stroke-width="2" stroke-linecap="round" opacity=".28"/>`
      );
    }
    const frange = 'M150 118C146 72 172 49 200 49C228 49 254 72 250 118C247 106 243 98 237 93Q231 106 223 98Q215 106 207 97Q199 106 191 97Q183 105 175 97Q167 103 161 99Q153 106 150 118Z';
    return (
      // ombre de la frange sur le front
      `<path d="M160 103Q167 107 175 101Q183 109 191 101Q199 110 207 101Q215 110 223 102Q231 110 238 98L240 104Q231 116 223 108Q215 116 207 107Q199 116 191 107Q183 115 175 107Q167 112 160 108Z" fill="var(--peau-ombre)" opacity=".45"/>` +
      `<path d="${frange}" fill="var(--cheveux)" ${TRAIT}/>` +
      // reflet « anime » sur le dessus
      `<path d="M168 66Q200 54 232 66" fill="none" stroke="var(--cheveux-reflet)" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 6" opacity=".55"/>` +
      `<path d="M183 72Q187 84 186 94M213 72Q211 84 214 94" fill="none" stroke="var(--cheveux-sombre)" stroke-width="2" stroke-linecap="round" opacity=".6"/>`
    );
  }

  // mèches latérales (animées) — pivot en haut de chaque mèche
  const PIVOTS = { g: [152, 100], d: [248, 100] };
  function meche(cote) {
    if (STYLE.theme === 'lune') return '';
    if (STYLE.theme === 'oni') return mecheOni(cote);
    if (STYLE.theme === 'arthur') return mecheArthur(cote);
    if (STYLE.theme === 'coraline') return mecheCoraline(cote);
    if (STYLE.theme === 'mavis') return mecheMavis(cote);
    if (STYLE.theme === 'zz') return mecheZZ(cote);
    if (STYLE.theme === 'lumiere') return mecheLumiere(cote);
    if (STYLE.theme === 'alysa') return mecheAlysa(cote);
    if (STYLE.coiffure === 'chignon') return '';
    if (STYLE.coiffure === 'ebouriffe') {
      return cote === 'g'
        ? `<path d="M150 98L136 134L146 130L138 168L152 140L154 158L162 110Z" fill="var(--cheveux)" ${TRAIT}/>`
        : `<path d="M250 98L264 134L254 130L262 168L248 140L246 158L238 110Z" fill="var(--cheveux)" ${TRAIT}/>`;
    }
    return cote === 'g'
      ? `<path d="M148 100C139 126 141 152 149 172C155 162 158 136 160 108Z" fill="var(--cheveux)" ${TRAIT}/>`
      : `<path d="M252 100C261 126 259 152 251 172C245 162 242 136 240 108Z" fill="var(--cheveux)" ${TRAIT}/>`;
  }

  // gros nœud (animé) + bandeau
  const PIVOT_NOEUD = [236, 56];
  function bandeau() {
    if (STYLE.theme) return '';
    if (!STYLE.noeud || STYLE.coiffure === 'chignon') return '';
    return `<path d="M156 96C162 60 238 58 246 92" fill="none" stroke="var(--contour)" stroke-width="7.5" stroke-linecap="round"/>` +
      `<path d="M156 96C162 60 238 58 246 92" fill="none" stroke="var(--noeud)" stroke-width="4.5" stroke-linecap="round"/>`;
  }
  function noeud() {
    if (STYLE.theme) return '';
    if (!STYLE.noeud || STYLE.coiffure === 'chignon') return '';
    const [x, y] = PIVOT_NOEUD;
    return (
      `<path d="M${x} ${y}C${x - 10} ${y - 30} ${x - 40} ${y - 30} ${x - 34} ${y - 4}C${x - 32} ${y + 6} ${x - 16} ${y + 6} ${x} ${y}Z" fill="var(--noeud)" ${TRAIT}/>` +
      `<path d="M${x} ${y}C${x + 12} ${y - 32} ${x + 44} ${y - 26} ${x + 38} ${y}C${x + 34} ${y + 9} ${x + 16} ${y + 7} ${x} ${y}Z" fill="var(--noeud)" ${TRAIT}/>` +
      `<path d="M${x - 6} ${y - 4}C${x - 14} ${y - 18} ${x - 26} ${y - 18} ${x - 26} ${y - 8}M${x + 6} ${y - 4}C${x + 16} ${y - 20} ${x + 30} ${y - 16} ${x + 30} ${y - 6}" fill="none" stroke="var(--noeud-ombre)" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${x - 4} ${y + 2}L${x - 12} ${y + 22}L${x - 4} ${y + 18}ZM${x + 4} ${y + 2}L${x + 14} ${y + 20}L${x + 6} ${y + 18}Z" fill="var(--noeud)" ${TRAIT}/>` +
      `<ellipse cx="${x}" cy="${y}" rx="7.5" ry="8" fill="var(--noeud)" ${TRAIT}/>` +
      `<path d="M${x - 24} ${y - 14}Q${x - 18} ${y - 22} ${x - 10} ${y - 18}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".45"/>`
    );
  }

  /* ---------- corps (robe) ---------- */
  function dessinerCorps() {
    const tenues = { lune: tenueLune, oni: tenueOni, arthur: tenueArthur, coraline: tenueCoraline, mavis: tenueMavis, zz: tenueZZ, lumiere: tenueLumiere, alysa: tenueAlysa };
    return corpsBase() + (tenues[STYLE.theme] ? tenues[STYLE.theme]() : '');
  }
  function corpsBase() {
    return (
      // robe : buste, épaules arrondies
      `<path d="M186 192C170 205 150 210 132 214C108 220 97 240 96 272L92 460L308 460L304 272C303 240 292 220 268 214C250 210 230 205 214 192Z" fill="var(--haut)" stroke="var(--contour)" stroke-width="2.4" stroke-linejoin="round"/>` +
      // volume : côtés plus sombres, reflet au centre
      `<path d="M100 260C102 320 100 390 98 460L128 460C124 390 126 320 132 250Z" fill="var(--haut-ombre)" opacity=".7"/>` +
      `<path d="M300 260C298 320 300 390 302 460L272 460C276 390 274 320 268 250Z" fill="var(--haut-ombre)" opacity=".7"/>` +
      `<path d="M150 300C160 330 160 380 156 440M250 300C240 330 240 380 244 440" fill="none" stroke="var(--haut-ombre)" stroke-width="3" stroke-linecap="round" opacity=".8"/>` +
      `<path d="M176 236C190 232 210 232 224 236" fill="none" stroke="var(--haut-clair)" stroke-width="3" stroke-linecap="round" opacity=".35"/>` +
      // cou + ombre sous le menton
      `<path d="M186 168L186 200Q200 212 214 200L214 168Z" fill="var(--peau)" stroke="var(--contour)" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<path d="M187 170Q200 190 213 170L213 182Q200 196 187 182Z" fill="var(--peau-ombre)" opacity=".6"/>` +
      // encolure ronde
      `<path d="M176 195Q200 222 224 195" fill="none" stroke="var(--haut-revers)" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M174 194Q200 225 226 194" fill="none" stroke="var(--contour)" stroke-width="2.2" stroke-linecap="round"/>`
    );
  }

  /* =====================================================================
     PERSONNAGES SECRETS (débloqués avec l'XP) : Koro Sensei (thème « lune ») et Ryuk (thème « oni »).
     Seuls la tête, le visage et la tenue changent : les mains et les bras gardent
     la même forme, ils prennent juste les couleurs du personnage (--peau, --haut).
     ===================================================================== */
  // point sur une courbe de bouche (quadratique symétrique) : t de 0 (coin gauche) à 1 (coin droit), creux = profondeur au milieu
  const ptBouche = (hw, coin, creux, t) => [200 - hw + 2 * hw * t, coin + 4 * t * (1 - t) * creux];
  const courbe = (hw, coin, creux) => `Q200 ${f1(coin + 2 * creux)}`;

  // ---------- Koro Sensei : grosse tête ronde jaune, petits yeux, immense sourire, toque de diplômé ----------
  function teteLune() {
    return (
      `<circle cx="200" cy="116" r="64" fill="var(--peau)" stroke="var(--contour)" stroke-width="2.8"/>` +
      // volume en aplats : ombre en croissant à droite, reflet doux à gauche
      `<path d="M238 66C270 98 266 160 214 178C248 158 260 112 238 66Z" fill="#E9A400" opacity=".55"/>` +
      `<ellipse cx="168" cy="82" rx="17" ry="9" transform="rotate(-30 168 82)" fill="#fff" opacity=".45"/>`
    );
  }
  function chapeauLune() {
    const noir = '#16151B', bord = '#2A2833', or = '#E8A33A';
    return (
      // calotte posée sur le haut du crâne
      `<path d="M172 56Q200 66 228 56L226 66Q200 76 174 66Z" fill="${noir}" ${TRAIT}/>` +
      // plateau carré vu de biais, un peu penché
      `<path d="M154 48L198 33L246 45L202 61Z" fill="${noir}" ${TRAIT}/>` +
      `<path d="M160 48L198 36L238 46" fill="none" stroke="${bord}" stroke-width="2" stroke-linecap="round"/>` +
      // bouton et pompon doré qui pend sur le côté
      `<path d="M200 46L240 47L243 66" fill="none" stroke="${or}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M239 64L247 64L249 80L237 80Z" fill="${or}" stroke="var(--contour)" stroke-width="1.6" stroke-linejoin="round"/>` +
      `<path d="M240 70L240 79M243 70L243 79M246 70L246 79" stroke="#B9741C" stroke-width="1.2"/>` +
      `<ellipse cx="200" cy="46" rx="4" ry="2.6" fill="${or}" stroke="var(--contour)" stroke-width="1.4"/>`
    );
  }
  function visageLune(p, cligne, regard) {
    let s = '';
    const rx = M.clamp(regard[0], -2, 2), ry = M.clamp(regard[1], -1.5, 2);
    // tout petits yeux noirs ronds (de simples points) : un peu plus grands quand il est surpris, en arc quand il rit
    const o = p.yeux * (cligne ? 0.06 : 1);
    const heureux = p.sourire > 0.75 && p.yeux < 0.85;
    for (const cx of [183, 217]) {
      const cy = 111;
      if (heureux) s += `<path d="M${cx - 4} ${cy + 1}Q${cx} ${cy - 4} ${cx + 4} ${cy + 1}" fill="none" stroke="var(--contour)" stroke-width="2.2" stroke-linecap="round"/>`;
      else if (o < 0.45) s += `<path d="M${cx - 4} ${cy}L${cx + 4} ${cy}" stroke="var(--contour)" stroke-width="2.2" stroke-linecap="round"/>`;
      else s += `<circle cx="${f1(cx + rx * 0.8)}" cy="${f1(cy + ry * 0.8)}" r="${f1(2.5 * Math.min(1.5, o))}" fill="var(--contour)"/>`;
    }
    // très large sourire en banane, bien plat : deux rangées de dents blanches, coins pointus qui remontent
    const sm = p.sourire, op = M.clamp(p.ouvert, 0, 1);
    const hw = (43 + 4 * Math.max(0, sm)) * (0.8 + 0.2 * p.largeur);
    const coin = 131 - sm * 3;
    const haut = 6 + sm * 9;                  // creux de la lèvre du haut (sourire → plus creusé)
    const bas = haut + 15 + op * 12;          // bas de la bouche (s'ouvre quand il parle)
    const g = f1(200 - hw), d = f1(200 + hw), c = f1(coin);
    const contourBouche = `M${g} ${c}${courbe(hw, coin, haut)} ${d} ${c}${courbe(hw, coin, bas)} ${g} ${c}Z`;
    // séparations verticales entre les dents, entre deux courbes
    const separations = (de, a) => {
      let z = '';
      for (let i = 1; i < 10; i++) {
        const t = 0.06 + (0.88 * i) / 10, p1 = ptBouche(hw, coin, de, t), p2 = ptBouche(hw, coin, a, t);
        z += `M${f1(p1[0])} ${f1(p1[1])}L${f1(p2[0])} ${f1(p2[1])}`;
      }
      return z;
    };
    // petits coins qui remontent au bout du sourire
    const coins = `M${g} ${c}l-3 -3.5M${d} ${c}l3 -3.5`;
    if (op > 0.12) {
      // bouche ouverte : intérieur sombre, rangée de dents en haut et en bas
      const ep = 6.5;
      s += `<path d="${contourBouche}" fill="#5A1A1A" stroke="var(--contour)" stroke-width="2.4" stroke-linejoin="round"/>` +
        `<path d="M${g} ${c}${courbe(hw, coin, haut)} ${d} ${c}${courbe(hw, coin, haut + ep)} ${g} ${c}Z" fill="#fff"/>` +
        `<path d="M${g} ${c}${courbe(hw, coin, bas - ep)} ${d} ${c}${courbe(hw, coin, bas)} ${g} ${c}Z" fill="#fff"/>` +
        `<path d="${separations(haut, haut + ep)}${separations(bas - ep, bas)}" stroke="var(--contour)" stroke-width="1.2" stroke-linecap="round"/>` +
        `<path d="${contourBouche}${coins}" fill="none" stroke="var(--contour)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;
    } else {
      // bouche fermée : dents serrées, ligne au milieu et séparations
      s += `<path d="${contourBouche}" fill="#fff" stroke="var(--contour)" stroke-width="2.6" stroke-linejoin="round"/>` +
        `<path d="M${g} ${c}${courbe(hw, coin, (haut + bas) / 2)} ${d} ${c}${separations(haut, bas)}" fill="none" stroke="var(--contour)" stroke-width="1.4" stroke-linecap="round"/>` +
        `<path d="${coins}" fill="none" stroke="var(--contour)" stroke-width="2.4" stroke-linecap="round"/>`;
    }
    return s;
  }
  function sourcilsLune(p) {
    // Koro n'a pas de sourcils : deux petits traits qui n'apparaissent que pendant une expression
    // (sourcils levés ou froncés, importants en LSF) ; visage neutre = pas de traits
    const force = M.clamp((Math.abs(p.sourcils) + Math.abs(p.froncer) - 0.2) * 1.4, 0, 1);
    if (force < 0.05) return '';
    const by = 99 - p.sourcils * 6, fr = p.froncer * 3.5;
    return `<path d="M175 ${f1(by + 1)}Q181 ${f1(by - 2)} 189 ${f1(by + fr)}M225 ${f1(by + 1)}Q219 ${f1(by - 2)} 211 ${f1(by + fr)}" fill="none" stroke="#B8790A" stroke-width="2.4" stroke-linecap="round" opacity="${f1(0.8 * force)}"/>`;
  }
  function tenueLune() {
    const rouge = '#C8252E', or = '#E8A33A', noir = '#111014';
    return (
      // ouverture de la toge : gilet rouge
      `<path d="M172 198L228 198L240 460L160 460Z" fill="${rouge}" ${TRAIT}/>` +
      `<path d="M176 230L170 460M224 230L230 460" stroke="#97161E" stroke-width="3" opacity=".6"/>` +
      // chemise blanche en V et col montant (cache le cou : la tête de Koro est posée sur le col)
      `<path d="M180 197L200 252L220 197Z" fill="#F6F4F0" ${TRAIT}/>` +
      `<path d="M180 168L220 168L224 199Q200 212 176 199Z" fill="#F6F4F0" ${TRAIT}/>` +
      `<path d="M178 195L193 216L200 205ZM222 195L207 216L200 205Z" fill="#fff" ${TRAIT}/>` +
      // cravate noire avec un croissant de lune doré
      `<path d="M196 207L204 207L206 216L209 268L200 280L191 268L194 216Z" fill="${noir}" ${TRAIT}/>` +
      `<path d="M196 207L204 207L203 216L197 216Z" fill="#2A2833"/>` +
      `<path d="M203 241A8 8 0 1 0 203 259A6.2 6.2 0 1 1 203 241Z" fill="${or}"/>` +
      // étole dorée de chaque côté de l'ouverture
      `<path d="M150 210Q164 200 176 199L168 460L146 460Z" fill="${or}" ${TRAIT}/>` +
      `<path d="M250 210Q236 200 224 199L232 460L254 460Z" fill="${or}" ${TRAIT}/>` +
      `<path d="M154 220L150 460M246 220L250 460" stroke="#B9741C" stroke-width="2.4" opacity=".6"/>`
    );
  }
  // bandes violettes aux manches de la toge de Koro
  function bandesManche(R, E, w) {
    let s = '';
    for (const [a, b] of [[0.17, 0.23], [0.29, 0.35]]) {
      const p = M.lerp3(R, E, a), q = M.lerp3(R, E, b);
      s += `<path d="M${f1(p[0])} ${f1(p[1])}L${f1(q[0])} ${f1(q[1])}" stroke="#6B4FC8" stroke-width="${f1(w)}"/>`;
    }
    return s;
  }

  // ---------- Ryuk : cheveux noirs en épis, peau blafarde, yeux jaunes cernés, grand sourire bleu, col de plumes blanches ----------
  function cheveuxArriereOni() {
    return (
      `<path d="M200 50L186 6L178 46L154 12L160 52L124 32L146 72L90 62L140 94L84 106L142 118L98 150L148 138L126 180L158 160L170 178L230 178L242 160L274 180L252 138L302 150L258 118L316 106L260 94L310 62L254 72L276 32L240 52L246 12L222 46L214 6Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M112 70L146 86M104 110L140 112M168 30L176 56M232 30L224 56M288 70L254 86M296 110L260 112" fill="none" stroke="var(--cheveux-reflet)" stroke-width="2" stroke-linecap="round" opacity=".4"/>`
    );
  }
  function teteOni() {
    const ombre = '#A9AEBD', argent = '#C9CDD6';
    // boucle d'oreille : petite chaîne et cœur, sur l'oreille droite de l'écran
    let chaine = '';
    for (const y of [138, 146, 154]) chaine += `<ellipse cx="249" cy="${y}" rx="2.2" ry="3.6" fill="none" stroke="${argent}" stroke-width="1.6"/>`;
    return (
      `<ellipse cx="152" cy="124" rx="7.5" ry="11.5" fill="var(--peau)" ${TRAIT}/>` +
      `<ellipse cx="248" cy="124" rx="7.5" ry="11.5" fill="var(--peau)" ${TRAIT}/>` +
      `<path d="M153 118C153 50 247 50 247 118C247 160 228 187 200 187C172 187 153 160 153 118Z" fill="var(--peau)" stroke="var(--contour)" stroke-width="2.6"/>` +
      `<path d="M156 128C158 156 173 179 191 184C171 182 157 162 156 128ZM244 128C242 156 227 179 209 184C229 182 243 162 244 128Z" fill="${ombre}" opacity=".55"/>` +
      chaine +
      `<path d="M249 160C245 155 240 160 243 165L249 172L255 165C258 160 253 155 249 160Z" fill="#F1F2F5" stroke="var(--contour)" stroke-width="1.4" stroke-linejoin="round"/>`
    );
  }
  function cheveuxAvantOni() {
    // calotte noire, épis sur le dessus, pointe qui descend au milieu du front
    return (
      `<path d="M150 110C146 66 170 44 200 44C230 44 254 66 250 110L240 84L230 80L220 88L208 76L200 98L192 76L180 88L170 80L160 84Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M178 56L184 74M200 50L200 70M222 56L216 74" fill="none" stroke="var(--cheveux-reflet)" stroke-width="2" stroke-linecap="round" opacity=".4"/>`
    );
  }
  function mecheOni(cote) {
    return cote === 'g'
      ? `<path d="M152 96L118 130L138 124L126 152L158 116Z" fill="var(--cheveux)" ${TRAIT}/>`
      : `<path d="M248 96L282 130L262 124L274 152L242 116Z" fill="var(--cheveux)" ${TRAIT}/>`;
  }
  function sourcilsOni(p) {
    // arcades sombres en pointe (suivent les expressions)
    const by = 104 - p.sourcils * 7, fr = p.froncer * 4.5;
    return `<path d="M164 ${f1(by + 4)}L190 ${f1(by + fr - 1)}L193 ${f1(by + fr + 4)}L168 ${f1(by + 8)}Z" fill="#24223A"/>` +
      `<path d="M236 ${f1(by + 4)}L210 ${f1(by + fr - 1)}L207 ${f1(by + fr + 4)}L232 ${f1(by + 8)}Z" fill="#24223A"/>`;
  }
  function visageOni(p, cligne, regard) {
    let s = '';
    const rx = M.clamp(regard[0], -2, 2), ry = M.clamp(regard[1], -1.5, 2);
    const o = p.yeux * (cligne ? 0.06 : 1);
    const cerne = '#2A2846', ride = '#8C91A1';
    // rides du front et des joues
    s += `<path d="M188 86L195 96M212 86L205 96M196 78L200 90L204 78M162 136L168 152M238 136L232 152" fill="none" stroke="${ride}" stroke-width="1.6" stroke-linecap="round"/>`;
    for (const cx of [181, 219]) {
      const cy = 118, miroir = cx > 200 ? ` transform="translate(${2 * cx} 0) scale(-1 1)"` : '';
      // grandes cernes sombres autour de l'œil
      s += `<path d="M${cx - 17} ${cy - 5}Q${cx - 8} ${cy - 15} ${cx + 6} ${cy - 11}L${cx + 15} ${cy - 5}Q${cx + 16} ${cy + 11} ${cx + 3} ${cy + 14}Q${cx - 12} ${cy + 14} ${cx - 15} ${cy + 4}Z" fill="${cerne}"${miroir}/>`;
      if (o < 0.45) { s += `<path d="M${cx - 9} ${cy}Q${cx} ${cy + 4} ${cx + 9} ${cy}" fill="none" stroke="#8F8BB8" stroke-width="2.4" stroke-linecap="round"/>`; continue; }
      // gros œil jaune rond, petite pupille rouge
      const r = 9.5 * Math.min(1.25, o);
      s += `<ellipse cx="${cx}" cy="${cy}" rx="${f1(Math.max(r, 8.5))}" ry="${f1(r)}" fill="#E9D86C" stroke="var(--contour)" stroke-width="1.8"/>` +
        `<circle cx="${f1(cx + rx * 1.6)}" cy="${f1(cy + ry)}" r="2.8" fill="#C0272D"/>` +
        `<circle cx="${f1(cx - 3.5)}" cy="${f1(cy - 3.5)}" r="1.4" fill="#fff" opacity=".8"/>`;
    }
    // nez de crâne : deux narines sombres
    s += `<path d="M196 133L193 142L198 140ZM204 133L207 142L202 140Z" fill="${cerne}"/>`;
    // grande bouche aux lèvres bleues, dents pointues
    const sm = p.sourire, op = M.clamp(p.ouvert, 0, 1);
    const hw = 34 * (0.8 + 0.2 * p.largeur);
    const coin = 152 - sm * 5;
    const haut = 6 + sm * 8;
    const bas = op < 0.06 ? haut + 9 : haut + 8 + op * 20;
    const g = f1(200 - hw), d = f1(200 + hw), c = f1(coin);
    s += `<path d="M${f1(200 - hw - 6)} ${f1(coin - 2)}${courbe(hw, coin, haut - 7)} ${f1(200 + hw + 6)} ${f1(coin - 2)}${courbe(hw, coin, bas + 8)} ${f1(200 - hw - 6)} ${f1(coin - 2)}Z" fill="#2F43A8" stroke="var(--contour)" stroke-width="2.2" stroke-linejoin="round"/>` +
      `<path d="M${f1(200 - hw)} ${f1(coin + 3)}${courbe(hw, coin, bas + 6)} ${f1(200 + hw)} ${f1(coin + 3)}" fill="none" stroke="#5C70D6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`;
    s += `<path d="M${g} ${c}${courbe(hw, coin, haut)} ${d} ${c}${courbe(hw, coin, bas)} ${g} ${c}Z" fill="${op < 0.06 ? '#fff' : '#4A0F1E'}"/>`;
    // dents : zigzag le long de la lèvre du haut (pointes vers le bas) et du bas (pointes vers le haut)
    const N = 10;
    const dents = (creux, sens, autre) => {
      let z = '';
      for (let k = 0; k <= 2 * N; k++) {
        const t = k / (2 * N), pt = ptBouche(hw, coin, creux, t);
        const ecart = Math.abs(ptBouche(hw, coin, autre, t)[1] - pt[1]);
        const h = k % 2 ? Math.min(7, ecart * 0.55) * sens : 0;
        z += `${k ? 'L' : 'M'}${f1(pt[0])} ${f1(pt[1] + h)}`;
      }
      return z + `${courbe(hw, coin, creux)} ${g} ${c}Z`;
    };
    if (op < 0.06) {
      // dents serrées : un seul zigzag au milieu
      s += `<path d="${dents(haut, 1, bas)}" fill="none" stroke="var(--contour)" stroke-width="1.3" stroke-linejoin="round"/>`;
    } else {
      s += `<path d="${dents(haut, 1, bas)}${dents(bas, -1, haut)}" fill="#F4F1E6" stroke="var(--contour)" stroke-width="1" stroke-linejoin="round"/>`;
    }
    return s;
  }
  function tenueOni() {
    // grand col de plumes blanches tout autour des épaules, avec des agrafes grises
    let bord = '';
    const n = 18;
    for (let i = 0; i <= n; i++) {
      const a = ((170 - (160 * i) / n) * Math.PI) / 180, r = i % 2 ? 0.84 : 1;
      bord += `${i ? 'L' : 'M'}${f1(200 + 88 * r * Math.cos(a))} ${f1(204 + 50 * r * Math.sin(a))}`;
    }
    let agrafes = '';
    for (const deg of [150, 125, 100, 80, 55, 30]) {
      const a = (deg * Math.PI) / 180;
      agrafes += `M${f1(200 + 80 * Math.cos(a))} ${f1(204 + 44 * Math.sin(a))}L${f1(200 + 96 * Math.cos(a))} ${f1(204 + 56 * Math.sin(a))}`;
    }
    return (
      `<path d="${bord}L246 186L238 194Q200 236 162 194L154 186Z" fill="#F2F2F4" ${TRAIT}/>` +
      `<path d="M140 222Q170 240 200 242Q230 240 260 222" fill="none" stroke="#C3C7D2" stroke-width="5" stroke-linecap="round" opacity=".7"/>` +
      `<path d="M150 200L160 214M170 206L176 222M250 200L240 214M230 206L224 222" stroke="#C3C7D2" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="${agrafes}" stroke="var(--contour)" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="${agrafes}" stroke="#9AA0AE" stroke-width="3" stroke-linecap="round"/>`
    );
  }

  // ---------- Arthur (légendaire) : cheveux roux mi-longs, yeux bleus, uniforme blanc et or, cape de fourrure noire ----------
  const OR = '#E2B24A', OR_SOMBRE = '#A0711C', NOIR = '#1A1820', NOIR_CLAIR = '#3A3544';
  function cheveuxArriereArthur() {
    // masse qui tombe sous la mâchoire jusqu'aux épaules, pointes effilées
    return `<path d="M200 40C162 40 140 64 138 98C136 124 131 150 128 178L136 172L133 206L147 186L151 214L164 186L236 186L249 214L253 186L267 206L264 172L272 178C269 150 264 124 262 98C260 64 238 40 200 40Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M142 120L136 168M150 140L148 196M258 120L264 168M250 140L252 196" fill="none" stroke="var(--cheveux-sombre)" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>`;
  }
  function cheveuxAvantArthur() {
    // frange en mèches pointues, balayée, avec la mèche qui tombe entre les yeux + un épi sur le dessus
    const frange = 'M148 124C142 72 168 44 202 44C236 44 260 72 252 124L246 102L240 120L234 94L226 112L220 90L212 106L207 92L204 129L199 98L192 112L188 92L180 110L174 92L166 112L160 98L154 114Z';
    return (
      `<path d="M158 104L166 116L174 100L180 114L188 98L192 116L199 104L210 104L212 112L220 98L226 116L234 100L240 124L244 112L244 120L234 108L226 122L220 108L212 116L206 110L199 114L192 122L188 106L180 120L174 108L166 122L158 112Z" fill="var(--peau-ombre)" opacity=".45"/>` +
      `<path d="M197 47Q204 24 222 28Q209 34 208 47Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="${frange}" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M170 64Q200 52 232 64" fill="none" stroke="var(--cheveux-reflet)" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 6" opacity=".6"/>` +
      `<path d="M184 64L178 92M206 58L205 88M226 64L232 90M162 84L158 100M242 84L246 100" fill="none" stroke="var(--cheveux-sombre)" stroke-width="2" stroke-linecap="round" opacity=".6"/>`
    );
  }
  function mecheArthur(cote) {
    // longues mèches qui encadrent le visage et descendent sur le col
    return cote === 'g'
      ? `<path d="M152 98C138 124 134 164 138 210L146 194L150 214L156 186C158 156 160 126 164 106Z" fill="var(--cheveux)" ${TRAIT}/>`
      : `<path d="M248 98C262 124 266 164 262 210L254 194L250 214L244 186C242 156 240 126 236 106Z" fill="var(--cheveux)" ${TRAIT}/>`;
  }
  function tenueArthur() {
    const cordon = (d) => `<path d="${d}" fill="none" stroke="var(--contour)" stroke-width="4.6" stroke-linecap="round"/>` +
      `<path d="${d}" fill="none" stroke="${OR}" stroke-width="2.6" stroke-linecap="round"/>` +
      `<path d="${d}" fill="none" stroke="${OR_SOMBRE}" stroke-width="1.2" stroke-dasharray="2.5 2.5" opacity=".8"/>`;
    return (
      // passepoil doré au milieu de la veste
      `<path d="M200 222L200 382" stroke="${OR_SOMBRE}" stroke-width="2.4" opacity=".8"/>` +
      // baudrier noir en diagonale (épaule gauche de l'écran → hanche droite) avec sa boucle dorée
      `<path d="M146 212L166 207L272 460L250 460Z" fill="${NOIR}" ${TRAIT}/>` +
      `<rect x="178" y="281" width="20" height="9" rx="1.5" transform="rotate(-22 188 285.5)" fill="none" stroke="${OR}" stroke-width="2.4"/>` +
      // ceinture noire, grosse boucle dorée
      `<path d="M94 382L306 382L306 406L94 406Z" fill="${NOIR}" ${TRAIT}/>` +
      `<rect x="186" y="377" width="28" height="34" rx="3" fill="none" stroke="var(--contour)" stroke-width="6"/>` +
      `<rect x="186" y="377" width="28" height="34" rx="3" fill="none" stroke="${OR}" stroke-width="3.4"/>` +
      `<path d="M196 394L214 394" stroke="${OR}" stroke-width="2.6" stroke-linecap="round"/>` +
      // cape de fourrure noire sur l'épaule droite de l'écran, bord intérieur doré
      `<path d="M212 196L222 190L230 198L240 191L248 202L258 197L266 208L276 205L284 216L294 215L300 228L310 229L312 246L306 252L314 460L238 460C232 380 226 300 222 248Z" fill="${NOIR}" ${TRAIT}/>` +
      `<path d="M228 206L236 218M246 208L252 222M264 214L268 228M282 222L286 236M298 236L300 250M290 270L294 300M296 330L298 370" fill="none" stroke="${NOIR_CLAIR}" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M238 456C232 380 226 300 223 252" fill="none" stroke="${OR}" stroke-width="3" stroke-linecap="round"/>` +
      // col montant blanc, ouvert en V, bordé d'or
      `<path d="M180 164L220 164L224 200Q200 212 176 200Z" fill="#F6F3EC" ${TRAIT}/>` +
      `<path d="M193 168L200 198L207 168Z" fill="var(--peau-ombre)" opacity=".7"/>` +
      `<path d="M193 168L200 198L207 168M178 199Q200 210 222 199" fill="none" stroke="${OR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
      // bijou rouge serti d'or sous le col
      `<path d="M200 194L210 207L200 222L190 207Z" fill="${OR}" ${TRAIT}/>` +
      `<path d="M200 198.5L206 207L200 216.5L194 207Z" fill="#C8252E"/>` +
      `<path d="M198 201L200 198.5L202 204Z" fill="#fff" opacity=".7"/>` +
      `<path d="M200 222L203.5 229L200 236L196.5 229Z" fill="${OR}" stroke="var(--contour)" stroke-width="1.4" stroke-linejoin="round"/>` +
      // aiguillettes dorées tressées, de l'épaule gauche de l'écran jusqu'à la broche
      cordon('M138 222Q182 292 232 244') + cordon('M140 228Q180 322 234 250') + cordon('M146 234Q178 350 236 256') +
      // broche ronde dorée avec son pompon
      `<path d="M234 250L229 292Q238 299 247 292L243 250Z" fill="${OR}" ${TRAIT}/>` +
      `<path d="M234 262L233 292M238 262L238 295M242 262L243 292" stroke="${OR_SOMBRE}" stroke-width="1.2"/>` +
      `<circle cx="238" cy="242" r="13" fill="${OR}" ${TRAIT}/>` +
      `<circle cx="238" cy="242" r="9" fill="none" stroke="${OR_SOMBRE}" stroke-width="1.6"/>` +
      `<path d="M238 236C235 236 235 241 238 242C241 241 241 236 238 236ZM238 242C236 245 232 247 233 244M238 242C240 245 244 247 243 244M238 242L238 248" fill="none" stroke="${OR_SOMBRE}" stroke-width="1.5" stroke-linecap="round"/>` +
      `<path d="M231 236Q234 232 239 232" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>`
    );
  }
  // galon doré au bout des manches d'Arthur
  function galonManche(R, E, w, col) {
    const p = M.lerp3(R, E, 0.15), q = M.lerp3(R, E, 0.21);
    return `<path d="M${f1(p[0])} ${f1(p[1])}L${f1(q[0])} ${f1(q[1])}" stroke="${col || OR}" stroke-width="${f1(w * 1.04)}"/>`;
  }

  // ---------- grands yeux ronds (Coraline : iris brun sur un blanc bleuté ; Mavis : iris bleu, longs cils) ----------
  function grandsYeux(cx, cy, o, rx, ry, mavis) {
    const h = 9.6 * Math.min(1.2, o), w = mavis ? 9 : 9.6;
    const blanc = mavis ? '#FBF8FA' : '#D8E7F2', iris = mavis ? '#3D78CF' : '#8A5628', irisClair = mavis ? '#9CC4F2' : '#C08A52';
    const ix = f1(cx + rx * 1.4), iy = f1(cy + ry * 0.9 + 0.6), ri = Math.min(6.4, h * 0.68);
    const ext = cx < 200 ? -1 : 1; // côté extérieur du visage
    let s = `<ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="${f1(h)}" fill="${blanc}" stroke="var(--contour)" stroke-width="1.6"/>` +
      `<circle cx="${ix}" cy="${iy}" r="${f1(ri)}" fill="${iris}"/>` +
      `<ellipse cx="${ix}" cy="${f1(+iy + ri * 0.35)}" rx="${f1(ri * 0.62)}" ry="${f1(ri * 0.42)}" fill="${irisClair}" opacity=".7"/>` +
      `<circle cx="${ix}" cy="${iy}" r="${f1(ri * 0.45)}" fill="#14141C"/>` +
      `<circle cx="${f1(+ix + 2)}" cy="${f1(+iy - 2.2)}" r="1.7" fill="#fff"/>` +
      // paupière du haut, épaisse
      `<path d="M${f1(cx - w - 0.5)} ${f1(cy - h * 0.25)}Q${cx} ${f1(cy - h * 1.32)} ${f1(cx + w + 0.5)} ${f1(cy - h * 0.25)}" fill="none" stroke="var(--contour)" stroke-width="${mavis ? 3.4 : 2.6}" stroke-linecap="round"/>`;
    if (mavis) {
      // trois longs cils recourbés vers l'extérieur + petit cil en bas
      const bx = cx + ext * (w - 0.5), byy = cy - h * 0.3;
      s += `<path d="M${f1(bx)} ${f1(byy)}q${ext * 4} -1 ${ext * 6} -5M${f1(bx - ext * 2.5)} ${f1(byy - 3.2)}q${ext * 3} -2 ${ext * 4} -6.5M${f1(bx - ext * 6)} ${f1(byy - 5.6)}q${ext * 1.5} -2.5 ${ext * 1.5} -6" fill="none" stroke="var(--contour)" stroke-width="1.8" stroke-linecap="round"/>` +
        `<path d="M${f1(cx + ext * 4)} ${f1(cy + h * 0.95)}q${ext * 3} 1 ${ext * 5} -1" fill="none" stroke="var(--contour)" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>`;
    }
    return s;
  }

  // ---------- Coraline (épique) : carré bleu vif, raie sur le côté, barrette libellule, ciré jaune, sacoche rouge ----------
  const ARGENT = '#C9CED8';
  function cheveuxArriereCoraline() {
    // carré épais façon fil de laine, les pointes rentrent vers le menton
    return `<path d="M200 42C158 42 136 70 139 112C140 142 134 166 142 182C150 192 168 190 174 178L226 178C232 190 250 192 258 182C266 166 260 142 261 112C264 70 242 42 200 42Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M144 130C143 150 146 168 154 180M150 120C150 146 154 164 162 178M256 130C257 150 254 168 246 180M250 120C250 146 246 164 238 178" fill="none" stroke="var(--cheveux-sombre)" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>`;
  }
  function cheveuxAvantCoraline() {
    // raie à gauche de l'écran : grande mèche balayée vers la droite, petite vers la gauche, le front reste dégagé
    const avant = 'M150 120C144 72 170 46 200 46C232 46 256 72 250 120C246 100 226 82 186 70L180 65C168 76 155 94 150 120Z';
    const libellule = `<g transform="translate(167 80) rotate(-28)">` +
      `<ellipse cx="-5" cy="-2.5" rx="6" ry="2.2" transform="rotate(18 -5 -2.5)" fill="${ARGENT}" stroke="var(--contour)" stroke-width="1.1"/>` +
      `<ellipse cx="5" cy="-2.5" rx="6" ry="2.2" transform="rotate(-18 5 -2.5)" fill="${ARGENT}" stroke="var(--contour)" stroke-width="1.1"/>` +
      `<ellipse cx="-4.2" cy="2" rx="4.8" ry="1.9" transform="rotate(-14 -4.2 2)" fill="${ARGENT}" stroke="var(--contour)" stroke-width="1.1"/>` +
      `<ellipse cx="4.2" cy="2" rx="4.8" ry="1.9" transform="rotate(14 4.2 2)" fill="${ARGENT}" stroke="var(--contour)" stroke-width="1.1"/>` +
      `<path d="M0 -6L0 10" stroke="var(--contour)" stroke-width="3.4" stroke-linecap="round"/><path d="M0 -6L0 10" stroke="#8E95A3" stroke-width="1.8" stroke-linecap="round"/>` +
      `<circle cx="0" cy="-6.5" r="2.1" fill="#8E95A3" stroke="var(--contour)" stroke-width="1"/></g>`;
    return (
      // ombre de la mèche sur le front
      `<path d="M188 74C226 86 244 102 247 122L243 124C238 106 222 92 186 80Z" fill="var(--peau-ombre)" opacity=".4"/>` +
      `<path d="${avant}" fill="var(--cheveux)" ${TRAIT}/>` +
      // brins de cheveux (texture fil)
      `<path d="M190 58Q224 62 244 98M196 52Q234 58 250 90M206 70Q232 80 242 104M178 60Q162 72 156 98M172 58Q158 66 152 88" fill="none" stroke="var(--cheveux-sombre)" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>` +
      `<path d="M170 64Q200 52 230 62" fill="none" stroke="var(--cheveux-reflet)" stroke-width="4" stroke-linecap="round" stroke-dasharray="9 6" opacity=".55"/>` +
      libellule
    );
  }
  function mecheCoraline(cote) {
    // côtés du carré qui encadrent les joues et rentrent sous le menton
    return cote === 'g'
      ? `<path d="M150 100C140 126 140 158 150 182C156 186 165 182 166 174C158 160 156 134 160 108Z" fill="var(--cheveux)" ${TRAIT}/>`
      : `<path d="M250 100C260 126 260 158 250 182C244 186 235 182 234 174C242 160 244 134 240 108Z" fill="var(--cheveux)" ${TRAIT}/>`;
  }
  function tenueCoraline() {
    const sangle = '#7B2B33';
    return (
      // fermeture du ciré + boutons-bâtonnets
      `<path d="M200 222L200 460" stroke="var(--haut-ombre)" stroke-width="2.6" opacity=".9"/>` +
      `<rect x="205" y="258" width="14" height="5" rx="2.5" fill="#6A4A22" stroke="var(--contour)" stroke-width="1.2"/>` +
      `<rect x="205" y="352" width="14" height="5" rx="2.5" fill="#6A4A22" stroke="var(--contour)" stroke-width="1.2"/>` +
      // bandoulière de la sacoche (épaule droite de l'écran → hanche gauche)
      `<path d="M246 210L266 218L130 460L106 460Z" fill="${sangle}" ${TRAIT}/>` +
      `<path d="M254 220L120 458" stroke="#A8474F" stroke-width="1.2" stroke-dasharray="3 3" opacity=".8"/>` +
      // capuche froissée autour du cou
      `<path d="M158 198C162 178 184 184 200 190C216 184 238 178 242 198C248 214 232 224 214 216C206 224 194 224 186 216C168 224 152 214 158 198Z" fill="var(--haut)" ${TRAIT}/>` +
      `<path d="M170 200Q177 210 186 207M230 200Q223 210 214 207M195 202Q200 212 205 202M166 192Q172 186 182 190M234 192Q228 186 218 190" fill="none" stroke="var(--haut-ombre)" stroke-width="2" stroke-linecap="round" opacity=".9"/>` +
      `<path d="M176 196Q186 190 194 196" fill="none" stroke="var(--haut-clair)" stroke-width="2" stroke-linecap="round" opacity=".6"/>`
    );
  }

  // ---------- Mavis (mythique) : carré noir à frange épaisse, peau pâle, yeux bleus, lèvres noires, col montant, broche chauve-souris ----------
  function cheveuxArriereMavis() {
    // carré au niveau de la mâchoire, pointes qui rebiquent vers l'extérieur
    return `<path d="M200 42C158 42 136 70 139 110C140 140 138 160 140 176C134 184 138 192 150 188C160 184 168 178 172 174L228 174C232 178 240 184 250 188C262 192 266 184 260 176C262 160 260 140 261 110C264 70 242 42 200 42Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M146 126C146 148 146 166 148 180M254 126C254 148 254 166 252 180" fill="none" stroke="var(--cheveux-reflet)" stroke-width="2" stroke-linecap="round" opacity=".4"/>`;
  }
  function cheveuxAvantMavis() {
    // frange épaisse et effilée qui descend jusqu'aux sourcils, une mèche un peu plus longue à droite de l'écran
    const frange = 'M149 122C143 72 170 46 200 46C230 46 257 72 251 122L246 108L241 116L237 102L231 118L225 101L218 110L212 99L206 109L200 98L193 108L187 99L180 109L174 100L167 110L161 102L156 113Z';
    return (
      `<path d="M160 104L167 114L174 104L180 113L187 103L193 112L200 102L206 113L212 103L218 114L225 105L231 122L237 106L242 118L242 124L231 128L224 112L218 120L212 110L206 118L200 110L193 118L187 110L180 118L174 110L167 120L160 112Z" fill="var(--peau-ombre)" opacity=".4"/>` +
      `<path d="${frange}" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M168 64Q200 52 232 64" fill="none" stroke="var(--cheveux-reflet)" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 6" opacity=".5"/>` +
      `<path d="M182 70L180 96M200 64L200 92M218 70L222 96" fill="none" stroke="var(--cheveux-reflet)" stroke-width="1.8" stroke-linecap="round" opacity=".3"/>`
    );
  }
  function mecheMavis(cote) {
    return cote === 'g'
      ? `<path d="M150 100C142 126 142 152 145 172L134 184L152 180C157 160 158 134 160 108Z" fill="var(--cheveux)" ${TRAIT}/>`
      : `<path d="M250 100C258 126 258 152 255 172L266 184L248 180C243 160 242 134 240 108Z" fill="var(--cheveux)" ${TRAIT}/>`;
  }
  function tenueMavis() {
    const rose = '#D9346F';
    return (
      // col montant noir
      `<path d="M182 164L218 164L223 202Q200 213 177 202Z" fill="var(--haut)" ${TRAIT}/>` +
      `<path d="M187 172L187 200M200 170L200 206M213 172L213 200" stroke="var(--haut-clair)" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>` +
      // broche chauve-souris rose
      `<path d="M200 233L197 228.5L195.5 234Q189 229 180 232.5Q185.5 236 184.5 242Q190 238.5 193.5 243Q197 239.5 200 244.5Q203 239.5 206.5 243Q210 238.5 215.5 242Q214.5 236 220 232.5Q211 229 204.5 234L203 228.5Z" fill="${rose}" stroke="var(--contour)" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<circle cx="198" cy="234" r=".9" fill="#fff"/><circle cx="202" cy="234" r=".9" fill="#fff"/>`
    );
  }

  // ---------- ZZ (légendaire) : cheveux noirs en bataille, yeux dorés, cicatrice de brûlure, tunique rouge sombre à col croisé doré ----------
  const ZZ_OR = '#D9A23A', ZZ_OR_SOMBRE = '#9A6A1A', ZZ_ROUGE = '#B4382C', ZZ_FONCE = '#3A1210';
  function cheveuxArriereZZ() {
    // masse épaisse qui tombe jusqu'à la mâchoire, pointes irrégulières
    return `<path d="M200 40C160 40 138 66 138 102C137 130 132 154 129 182L141 172L139 198L154 180L160 200L170 182L230 182L240 200L246 180L261 198L259 172L271 182C268 154 263 130 262 102C262 66 240 40 200 40Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M144 126L138 170M152 146L150 190M256 126L262 170M248 146L250 190" fill="none" stroke="var(--cheveux-reflet)" stroke-width="2" stroke-linecap="round" opacity=".35"/>`;
  }
  function cheveuxAvantZZ() {
    // frange en mèches pointues de longueurs différentes, une longue mèche entre les yeux, deux épis sur le dessus
    const frange = 'M148 124C142 70 168 42 202 42C238 42 262 72 252 126L245 100L238 118L232 96L224 112L216 94L210 108L204 96L199 128L194 98L186 112L180 94L172 110L166 98L160 122L155 104Z';
    return (
      `<path d="M158 104L166 112L172 106L180 112L186 106L194 110L199 112L204 108L210 112L216 106L224 114L232 106L238 120L244 112L240 124L232 116L224 120L216 114L210 118L204 114L199 130L194 116L186 120L180 114L172 118L166 114L160 126L156 114Z" fill="var(--peau-ombre)" opacity=".45"/>` +
      `<path d="M182 50L170 38L190 44Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M214 45L232 36L226 52Z" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="${frange}" fill="var(--cheveux)" ${TRAIT}/>` +
      `<path d="M170 62Q200 50 232 62" fill="none" stroke="var(--cheveux-reflet)" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 6" opacity=".55"/>` +
      `<path d="M184 66L180 92M200 60L200 92M218 66L222 92M164 80L160 100M240 80L244 100" fill="none" stroke="var(--cheveux-reflet)" stroke-width="1.8" stroke-linecap="round" opacity=".3"/>`
    );
  }
  function mecheZZ(cote) {
    // mèches en pointes qui encadrent le visage
    return cote === 'g'
      ? `<path d="M150 98L137 132L146 129L136 170L150 148L152 178L162 108Z" fill="var(--cheveux)" ${TRAIT}/>`
      : `<path d="M250 98L263 132L254 129L264 170L250 148L248 178L238 108Z" fill="var(--cheveux)" ${TRAIT}/>`;
  }
  function cicatriceZZ() {
    return `<path d="M203 99C214 91 236 93 242 104C247 115 245 130 238 138C230 146 215 146 207 138C199 130 198 110 203 99Z" fill="#B0573F" opacity=".62"/>` +
      `<path d="M209 107C218 101 233 104 237 113C241 123 235 134 225 136C215 137 208 128 208 120Z" fill="#8A3528" opacity=".42"/>` +
      `<path d="M203 99C214 91 236 93 242 104C247 115 245 130 238 138C230 146 215 146 207 138" fill="none" stroke="#7A2E22" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>` +
      `<path d="M212 132Q220 138 230 133M232 104Q238 110 239 118" fill="none" stroke="#E0907A" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>`;
  }
  function oeilAmande(cx, cy, o, rx, ry, iris, irisClair, ouverture) {
    // œil en amande (ZZ : iris doré, l'œil marqué par la cicatrice reste à moitié fermé ; Lumiere : iris brun-rouge, regard en coin)
    const h = 7.4 * Math.min(1.2, o) * (ouverture || 1), w = 8.2;
    const ix = f1(cx + M.clamp(rx * 1.2, -2.4, 2.4)), iy = f1(cy - h * 0.12 + M.clamp(ry * 0.5, -0.8, 0.8)), ri = h * 0.55;
    const ext = cx < 200 ? -1 : 1;
    return `<path d="M${f1(cx - w)} ${cy}Q${cx} ${f1(cy - h * 1.6)} ${f1(cx + w)} ${cy}Q${cx} ${f1(cy + h * 1.1)} ${f1(cx - w)} ${cy}Z" fill="#FBF5EC"/>` +
      `<circle cx="${ix}" cy="${iy}" r="${f1(ri)}" fill="${iris}"/>` +
      `<ellipse cx="${ix}" cy="${f1(+iy + ri * 0.35)}" rx="${f1(ri * 0.6)}" ry="${f1(ri * 0.4)}" fill="${irisClair}" opacity=".85"/>` +
      `<circle cx="${ix}" cy="${iy}" r="${f1(ri * 0.42)}" fill="#1E1408"/>` +
      `<circle cx="${f1(+ix + ri * 0.4)}" cy="${f1(+iy - ri * 0.4)}" r="1.2" fill="#fff"/>` +
      // paupière du haut épaisse, petit trait au coin extérieur
      `<path d="M${f1(cx - w - 1)} ${f1(cy + 0.5)}Q${cx} ${f1(cy - h * 1.6)} ${f1(cx + w + 1)} ${f1(cy + 0.5)}" fill="none" stroke="var(--contour)" stroke-width="3.2" stroke-linecap="round"/>` +
      `<path d="M${f1(cx + ext * (w + 1))} ${f1(cy + 0.5)}l${ext * 3} -1.5" stroke="var(--contour)" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M${f1(cx - w * 0.6)} ${f1(cy + h * 0.62)}Q${cx} ${f1(cy + h * 0.9)} ${f1(cx + w * 0.6)} ${f1(cy + h * 0.62)}" fill="none" stroke="var(--contour)" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>`;
  }
  function sourcilsZZ(p) {
    // sourcil épais et décidé à gauche de l'écran ; du côté de la cicatrice, il ne reste presque rien
    const by = 104 - p.sourcils * 7, fr = p.froncer * 4.5;
    return `<path d="M168 ${f1(by + 1)}Q180 ${f1(by - 3 + fr * 0.2)} 192 ${f1(by + 4 + fr)}" fill="none" stroke="var(--cheveux)" stroke-width="4.4" stroke-linecap="round"/>` +
      `<path d="M209 ${f1(by + 4 + fr)}Q213 ${f1(by + 2 + fr * 0.6)} 217 ${f1(by + 2 + fr * 0.3)}" fill="none" stroke="var(--cheveux)" stroke-width="3" stroke-linecap="round" opacity=".55"/>`;
  }
  function tenueZZ() {
    const bande = (d) => `<path d="${d}" fill="${ZZ_OR}" ${TRAIT}/>`;
    return (
      // haut rouge vif sous la tunique, dans l'ouverture du col
      `<path d="M178 192L222 192L200 254Z" fill="${ZZ_ROUGE}" ${TRAIT}/>` +
      `<path d="M186 194L200 228L214 194" fill="none" stroke="#7A2018" stroke-width="2" stroke-linejoin="round" opacity=".7"/>` +
      // col croisé doré : le pan droit de l'écran passe dessous, le pan gauche par-dessus
      bande('M218 191L231 194L205 262L196 254Z') +
      bande('M169 194L182 191L211 257L201 266Z') +
      `<path d="M176 196L204 260M224 196L200 254" fill="none" stroke="${ZZ_OR_SOMBRE}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>` +
      // ouverture de la tunique jusqu'en bas, bordée d'or
      `<path d="M206 262L214 460" fill="none" stroke="var(--contour)" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M206 262L214 460" fill="none" stroke="${ZZ_OR}" stroke-width="2.6" stroke-linecap="round"/>` +
      // épaulettes plus sombres
      `<path d="M132 214C150 210 170 205 180 196L184 206C170 216 150 222 128 226Z" fill="var(--haut-ombre)" opacity=".8"/>` +
      `<path d="M268 214C250 210 230 205 220 196L216 206C230 216 250 222 272 226Z" fill="var(--haut-ombre)" opacity=".8"/>` +
      // ceinture sombre bordée d'or, petit emblème flamme au centre
      `<path d="M94 384L306 384L306 406L94 406Z" fill="${ZZ_FONCE}" ${TRAIT}/>` +
      `<path d="M96 388L304 388M96 402L304 402" stroke="${ZZ_OR}" stroke-width="1.6" opacity=".9"/>` +
      `<path d="M210 382C204 388 202 394 206 400C202 398 199 394 201 388C196 392 196 400 202 406C208 410 218 408 220 400C222 392 216 388 210 382Z" fill="${ZZ_OR}" stroke="var(--contour)" stroke-width="1.6" stroke-linejoin="round"/>`
    );
  }

  // ---------- Lumiere (peu commun) : cheveux châtains en mèches effilées, yeux brun-rouge, blazer beige, chemise blanche, cravate rouge ----------
  const LUM_CHEMISE = '#F4F2EE', LUM_CRAVATE = '#B3262A', LUM_CRAVATE_SOMBRE = '#7E1A1E';
  function cheveuxArriereLumiere() {
    // coupe courte : la masse suit la forme de la tête et s'arrête à la nuque (cachée derrière le visage)
    return `<path d="M200 40C162 40 140 66 140 104C140 128 140 146 142 164Q150 158 154 152Q158 164 166 168L234 168Q242 164 246 152Q250 158 258 164C260 146 260 128 260 104C260 66 238 40 200 40Z" fill="var(--cheveux)" ${TRAIT}/>`;
  }
  // frange : une calotte lisse qui suit l'ovale de la tête ; depuis la raie (en haut, à gauche de l'écran)
  // les mèches descendent en diagonale vers la droite : courtes au-dessus de l'œil gauche, longues jusqu'à la joue à droite
  const FRANGE_LUMIERE = 'M148 130C140 76 166 40 202 40C242 40 264 76 256 124Q256 132 255 140' +
    'Q250 126 247 108Q247 124 242 136Q236 124 234 100Q234 114 228 126Q222 116 220 96Q219 110 212 122Q206 112 204 94' +
    'Q203 108 196 118Q190 108 188 92Q187 102 180 110Q174 104 172 92Q171 100 164 108Q160 104 158 98Q156 110 150 122Z';
  function cheveuxAvantLumiere() {
    return (
      // ombre de la frange sur le front et les paupières
      `<path d="${FRANGE_LUMIERE}" transform="translate(2 5)" fill="var(--peau-ombre)" opacity=".35"/>` +
      `<path d="${FRANGE_LUMIERE}" fill="var(--cheveux)" ${TRAIT}/>` +
      // raie + longues séparations qui rayonnent depuis la raie en épousant l'arrondi du crâne
      `<path d="M180 47Q177 52 174 57M180 46Q222 58 241 132M180 47Q212 64 227 122M179 48Q200 70 211 118M177 50Q188 76 195 114M175 50Q172 76 166 104M173 48Q158 70 153 116" fill="none" stroke="var(--cheveux-sombre)" stroke-width="1.7" stroke-linecap="round" opacity=".45"/>` +
      // reflets clairs qui suivent les mèches sur le dessus
      `<path d="M190 50Q216 56 234 76M196 60Q216 70 228 90M170 56Q164 64 160 78" fill="none" stroke="var(--cheveux-reflet)" stroke-width="3.6" stroke-linecap="round" opacity=".55"/>`
    );
  }
  function sourcilsLumiere(p) {
    // sourcils fins et sombres, légèrement inclinés (regard sérieux), un peu plus bas que d'habitude
    const by = 109 - p.sourcils * 7, fr = p.froncer * 4.5;
    return `<path d="M174 ${f1(by)}Q182 ${f1(by - 2.5 + fr * 0.2)} 190 ${f1(by + 2 + fr)}M226 ${f1(by)}Q218 ${f1(by - 2.5 + fr * 0.2)} 210 ${f1(by + 2 + fr)}" fill="none" stroke="#3A1E10" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>`;
  }
  function mecheLumiere(cote) {
    // côtés étroits collés aux joues : couvrent les oreilles et finissent en pointe vers la bouche
    return cote === 'g'
      ? `<path d="M152 96Q142 116 143 140Q144 156 151 170Q152 160 155 156Q157 164 161 166Q159 150 161 134Q162 116 166 104Z" fill="var(--cheveux)" ${TRAIT}/>` +
        `<path d="M153 108Q148 130 151 160" fill="none" stroke="var(--cheveux-sombre)" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>`
      : `<path d="M248 96Q258 116 257 140Q256 156 249 170Q248 160 245 156Q243 164 239 166Q241 150 239 134Q238 116 234 104Z" fill="var(--cheveux)" ${TRAIT}/>` +
        `<path d="M247 108Q252 130 249 160" fill="none" stroke="var(--cheveux-sombre)" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>`;
  }
  function tenueLumiere() {
    return (
      // chemise blanche dans l'ouverture du blazer
      `<path d="M176 192L224 192L200 264Z" fill="${LUM_CHEMISE}" ${TRAIT}/>` +
      // cravate rouge : nœud + pan, rayures sombres
      `<path d="M194 203L206 203L204 214L196 214Z" fill="${LUM_CRAVATE}" ${TRAIT}/>` +
      `<path d="M196 214L204 214L208 250L200 262L192 250Z" fill="${LUM_CRAVATE}" ${TRAIT}/>` +
      `<path d="M195 224L205 220M194 236L206 232M193 248L207 244" stroke="${LUM_CRAVATE_SOMBRE}" stroke-width="2" stroke-linecap="round" opacity=".8"/>` +
      // col de chemise en pointes
      `<path d="M185 184L174 199L193 212L198 202Z" fill="${LUM_CHEMISE}" ${TRAIT}/>` +
      `<path d="M215 184L226 199L207 212L202 202Z" fill="${LUM_CHEMISE}" ${TRAIT}/>` +
      // revers du blazer (encoche) de chaque côté
      `<path d="M168 196L177 193L200 264L190 264L158 226L171 215Z" fill="var(--haut)" ${TRAIT}/>` +
      `<path d="M232 196L223 193L200 264L210 264L242 226L229 215Z" fill="var(--haut)" ${TRAIT}/>` +
      `<path d="M172 214L188 254M228 214L212 254" stroke="var(--haut-ombre)" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>` +
      // fermeture, deux boutons, poche de poitrine
      `<path d="M200 264L200 460" stroke="var(--haut-ombre)" stroke-width="2.6"/>` +
      `<circle cx="207" cy="312" r="4" fill="#7A5A36" stroke="var(--contour)" stroke-width="1.4"/>` +
      `<circle cx="207" cy="364" r="4" fill="#7A5A36" stroke="var(--contour)" stroke-width="1.4"/>` +
      `<path d="M228 290L262 287" stroke="var(--haut-ombre)" stroke-width="2.6" stroke-linecap="round"/>`
    );
  }

  // ---------- Alysa Liu (secret) : cheveux longs blond platine rayés de bandes brunes, raie au milieu, frange rideau,
  // eye-liner, taches de rousseur, lèvres rouges, robe de patinage blanche à strass, médaille d'argent ----------
  const ALY_BRUN = '#4A2E20', ALY_ARGENT = '#D9DDE6', ALY_STRASS = '#9CA3B4';
  // bandes brunes horizontales (légèrement arrondies, comme des anneaux autour de la tête) : racines, yeux, cou
  const ALY_BANDES = [[0, 70], [112, 150], [190, 228]];
  let alyUid = 0;
  // une forme de cheveux blonds + les bandes brunes découpées exactement dans sa silhouette
  function cheveuxRayes(d) {
    const id = 'lsf-aly-' + (++alyUid);
    return `<clipPath id="${id}"><path d="${d}"/></clipPath>` +
      `<path d="${d}" fill="var(--cheveux)"/>` +
      `<g clip-path="url(#${id})">` +
      ALY_BANDES.map(([a, b]) => `<path d="M90 ${a}Q200 ${a + 8} 310 ${a}L310 ${b}Q200 ${b + 8} 90 ${b}Z" fill="${ALY_BRUN}"/>`).join('') +
      `</g>` +
      `<path d="${d}" fill="none" ${TRAIT}/>`;
  }
  function cheveuxArriereAlysa() {
    // longs cheveux raides jusque sous les épaules (le bas est caché par le corps)
    return cheveuxRayes('M200 42C158 42 136 70 136 112C136 160 128 210 122 262L140 256L156 264L170 254L230 254L244 264L260 256L278 262C272 210 264 160 264 112C264 70 242 42 200 42Z');
  }
  function cheveuxAvantAlysa() {
    // calotte avec raie au milieu, frange rideau : s'ouvre en V au centre du front et s'allonge vers les pommettes
    const frange = 'M150 128C144 74 170 44 200 44C230 44 256 74 250 128' +
      'Q252 134 246 140Q242 128 240 120Q238 126 234 128Q228 114 226 106Q224 112 220 112Q214 96 212 88Q206 78 200 70' +
      'Q194 78 188 88Q186 96 180 112Q176 112 174 106Q172 114 166 128Q162 126 160 120Q158 128 154 140Q148 134 150 128Z';
    return (
      `<path d="${frange}" transform="translate(1 5)" fill="var(--peau-ombre)" opacity=".3"/>` +
      cheveuxRayes(frange) +
      // raie au milieu + quelques mèches fines
      `<path d="M200 46L200 70" stroke="var(--contour)" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>` +
      `<path d="M197 56Q188 76 182 104M203 56Q212 76 218 104M194 56Q174 76 166 120M206 56Q226 76 234 120" fill="none" stroke="#B89E78" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>`
    );
  }
  function mecheAlysa(cote) {
    // longues mèches raides qui encadrent le visage et tombent devant les épaules
    const d = cote === 'g'
      ? 'M152 96C140 126 136 170 138 214C139 236 136 252 132 266L144 260L150 270L160 258L167 266C166 236 164 200 164 170C164 140 162 116 166 104Z'
      : 'M248 96C260 126 264 170 262 214C261 236 264 252 268 266L256 260L250 270L240 258L233 266C234 236 236 200 236 170C236 140 238 116 234 104Z';
    const fil = cote === 'g' ? 'M150 120Q144 180 146 250M157 130Q154 190 156 256' : 'M250 120Q256 180 254 250M243 130Q246 190 244 256';
    return cheveuxRayes(d) + `<path d="${fil}" fill="none" stroke="#B89E78" stroke-width="1.3" stroke-linecap="round" opacity=".45"/>`;
  }
  function tenueAlysa() {
    // strass : lignes en losange + petits cristaux, collier de cristaux, médaille d'argent sur ruban bleu et rouge
    let strass = '';
    for (const [x, y] of [[150, 262], [176, 248], [226, 250], [252, 264], [134, 300], [166, 296], [198, 286], [262, 300], [150, 336], [184, 326], [216, 334], [248, 340], [132, 370], [170, 364], [206, 372], [240, 368], [270, 376]]) {
      strass += `<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" stroke="${ALY_STRASS}" stroke-width="1"/>`;
    }
    return (
      `<path d="M110 300L190 240M110 360L230 250M130 420L280 270M190 450L296 330M290 300L210 240M290 360L170 250M270 420L120 270M210 450L104 330" fill="none" stroke="${ALY_STRASS}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round" opacity=".9"/>` +
      strass +
      // collier de cristaux le long de l'encolure
      `<path d="M178 202Q200 226 222 202" fill="none" stroke="${ALY_STRASS}" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/>` +
      // ruban : brin bleu à gauche, brin rouge à droite, qui se rejoignent à la médaille
      `<path d="M176 198L186 194L232 292L222 296Z" fill="#5B7FD6" ${TRAIT}/>` +
      `<path d="M224 196L234 199L236 292L226 292Z" fill="#E0503A" ${TRAIT}/>` +
      // médaille d'argent
      `<circle cx="229" cy="306" r="15" fill="${ALY_ARGENT}" ${TRAIT}/>` +
      `<circle cx="229" cy="306" r="10.5" fill="none" stroke="#9AA1AE" stroke-width="1.6"/>` +
      `<path d="M222 309L236 309M224 309L226 300L232 301L233 309" fill="none" stroke="#7A8090" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M220 299Q223 295 228 294" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`
    );
  }

  /* ---------- caméra « mes yeux » (première personne) ---------- */
  const OEIL = [200, 108, -60];
  const PITCH = 30 * Math.PI / 180;
  const FOCALE = 245;
  const AV = [0, Math.sin(PITCH), Math.cos(PITCH)];     // regard vers l'avant, un peu vers le bas
  const BAS = [0, Math.cos(PITCH), -Math.sin(PITCH)];   // « bas » de l'image
  const DROITE = [-1, 0, 0];                           // la main droite du signeur apparaît à droite
  function camYeux(p) {
    const v = M.sub(p, OEIL);
    const prof = M.dot(v, AV);
    if (prof < 22) return null;
    const k = FOCALE / prof;
    return [200 + M.dot(v, DROITE) * k, 205 + M.dot(v, BAS) * k, -prof, k];
  }
  camYeux.versCamera = (p) => M.norm(M.sub(OEIL, p));

  // projection « Ma main » : mêmes axes que les yeux, mais sans perspective et cadrée sur les mains.
  // On peut tourner autour de la main : lacet (côtés, en degrés) et tangage (dessus / dessous, en degrés).
  function baseMain(lacet, tangage) {
    const p = PITCH + ((tangage || 0) * Math.PI) / 180, y = ((lacet || 0) * Math.PI) / 180;
    const c = Math.cos(y), s = Math.sin(y);
    const rotY = (v) => [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
    return { A: rotY([0, Math.sin(p), Math.cos(p)]), B: rotY([0, Math.cos(p), -Math.sin(p)]), D: rotY(DROITE) };
  }
  const BASE_FACE = baseMain(0, 0);
  function camMain(cx, cy, Z, base) {
    base = base || BASE_FACE;
    const f = (p) => [200 + (M.dot(p, base.D) - cx) * Z, 218 + (M.dot(p, base.B) - cy) * Z, -M.dot(p, base.A), Z];
    f.versCamera = () => M.mul(base.A, -1);
    return f;
  }
  const projMain = (p, base) => { base = base || BASE_FACE; return [M.dot(p, base.D), M.dot(p, base.B)]; };

  /* ---------- décor de la vue « mes yeux » : table, mur, chat noir assis en face ---------- */
  const TABLE_Y = 430;
  function pt(x, z) { const r = camYeux([x, TABLE_Y, z]); return r ? f1(r[0]) + ' ' + f1(r[1]) : '0 0'; }
  // le chat est posé sur la table, en face de toi (c'est « la personne » à qui tu signes)
  const CHAT_BASE = camYeux([200, TABLE_Y, 430]);
  function decorYeux() {
    const zs = [170, 260, 380, 540, 760];
    let lignes = '';
    for (const z of zs) lignes += `M${pt(-300, z)}L${pt(700, z)}`;
    for (const x of [-100, 0, 100, 200, 300, 400, 500]) lignes += `M${pt(x, 150)}L${pt(x, 1100)}`;
    const fond = camYeux([200, TABLE_Y, 1100]);
    const horizon = fond ? f1(fond[1]) : 140;
    return (
      // mur du fond + lueur derrière le chat
      `<rect x="-40" y="-40" width="480" height="${f1(+horizon + 40)}" fill="url(#mur-${'%ID%'})"/>` +
      `<ellipse cx="200" cy="${f1(CHAT_BASE[1] - 40)}" rx="150" ry="95" fill="var(--sakura)" opacity=".13"/>` +
      // table (plateau en perspective)
      `<path d="M${pt(-300, 150)}L${pt(700, 150)}L${pt(700, 1100)}L${pt(-300, 1100)}Z" fill="url(#table-${'%ID%'})"/>` +
      `<path d="${lignes}" fill="none" stroke="var(--sakura)" stroke-width="1" opacity=".16"/>` +
      `<path d="M${pt(-300, 150)}L${pt(700, 150)}" stroke="var(--sakura)" stroke-width="2.5" opacity=".45"/>` +
      // ombre du chat sur la table
      `<ellipse cx="${f1(CHAT_BASE[0])}" cy="${f1(CHAT_BASE[1])}" rx="${f1(62 * CHAT_BASE[3])}" ry="${f1(12 * CHAT_BASE[3])}" fill="#000" opacity=".45"/>` +
      `<g transform="translate(${f1(CHAT_BASE[0])} ${f1(CHAT_BASE[1])}) scale(${(CHAT_BASE[3] * 1.35).toFixed(3)})">${chat()}</g>`
    );
  }
  // chat noir en silhouette : corps tout noir, très grands yeux blancs, longues oreilles, queue fine qui remonte
  function chat() {
    const N = '#000';
    const BORD = 'stroke="rgba(255, 158, 198, .35)" stroke-width="1.4" stroke-linejoin="round"'; // fin liseré rose pour le détacher du fond sombre
    return (
      // queue : longue, fine, qui part du bas et remonte en crosse
      `<g class="chat-queue"><path d="M26 -8C62 -6 84 -30 84 -66C84 -92 96 -110 112 -104" fill="none" stroke="rgba(255, 158, 198, .35)" stroke-width="12.5" stroke-linecap="round"/>` +
        `<path d="M26 -8C62 -6 84 -30 84 -66C84 -92 96 -110 112 -104" fill="none" stroke="${N}" stroke-width="10" stroke-linecap="round"/></g>` +
      // corps : haut et étroit, qui s'évase vers les pattes
      `<path d="M-32 0C-46 -6 -44 -40 -34 -66C-27 -84 -20 -96 -16 -104L16 -104C20 -96 27 -84 34 -66C44 -40 46 -6 32 0Z" fill="${N}" ${BORD}/>` +
      `<ellipse cx="-17" cy="-2" rx="15" ry="6" fill="${N}"/><ellipse cx="17" cy="-2" rx="15" ry="6" fill="${N}"/>` +
      `<g class="chat-tete">` +
        // oreilles hautes et pointues, intérieur juste souligné de blanc
        `<path d="M-30 -134L-24 -194L-4 -150ZM30 -134L24 -194L4 -150Z" fill="${N}" ${BORD}/>` +
        `<path d="M-25 -142L-22 -180L-10 -152M25 -142L22 -180L10 -152" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" opacity=".85"/>` +
        `<ellipse cx="0" cy="-126" rx="36" ry="31" fill="${N}" ${BORD}/>` +
        // très grands yeux ronds, blancs, pupille noire
        `<g class="chat-yeux">` +
          `<ellipse cx="-15" cy="-128" rx="12" ry="14" fill="#fff"/><ellipse cx="15" cy="-128" rx="12" ry="14" fill="#fff"/>` +
          `<ellipse cx="-13" cy="-127" rx="5.2" ry="7" fill="${N}"/><ellipse cx="13" cy="-127" rx="5.2" ry="7" fill="${N}"/>` +
        `</g>` +
        // petit museau blanc
        `<path d="M-3 -110L3 -110L0 -106Z" fill="#fff"/>` +
        // longues moustaches fines
        `<path d="M-20 -112L-64 -120M-20 -108L-66 -106M20 -112L64 -120M20 -108L66 -106" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".85"/>` +
        // ruban rouge autour du cou, gros nœud sous le menton
        `<path d="M-22 -97Q0 -89 22 -97" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round"/>` +
        `<path d="M-22 -97Q0 -89 22 -97" fill="none" stroke="#E0262E" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M0 -93C-6 -104 -22 -106 -20 -94C-19 -86 -7 -87 0 -93ZM0 -93C6 -104 22 -106 20 -94C19 -86 7 -87 0 -93Z" fill="#E0262E" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/>` +
        `<path d="M-2 -92L-9 -78L-3 -81ZM2 -92L9 -78L3 -81Z" fill="#E0262E" stroke="#000" stroke-width="1.2" stroke-linejoin="round"/>` +
        `<ellipse cx="0" cy="-93" rx="4" ry="4.4" fill="#C41C24" stroke="#000" stroke-width="1.2"/>` +
        `<path d="M-15 -99Q-11 -102 -7 -99" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>` +
      `</g>`
    );
  }
  function defsYeux(id) {
    return `<linearGradient id="mur-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0f1c"/><stop offset="1" stop-color="#3a2238"/></linearGradient>` +
      `<linearGradient id="table-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2a3e"/><stop offset="1" stop-color="#20121c"/></linearGradient>`;
  }
  // ta frange, en haut de l'image : on sait qu'on regarde depuis ses propres yeux
  function frangeYeux() {
    if (STYLE.theme === 'lune') return '';
    return `<path d="M-20 -10L420 -10L420 18Q400 34 380 20Q360 40 338 22Q318 36 300 14Q290 10 280 0L120 0Q110 10 100 14Q82 36 62 22Q40 40 20 20Q0 34 -20 18Z" fill="var(--cheveux)" opacity=".92"/>`;
  }

  // ce qu'on voit de soi en regardant ses mains : le haut de la robe, en bas de l'image
  function corpsYeux() {
    return `<path d="M-30 440L-30 392C40 360 120 352 200 352C280 352 360 360 430 392L430 440Z" fill="var(--haut)" stroke="var(--contour)" stroke-width="2.4"/>` +
      `<path d="M-30 404C40 376 120 368 200 368C280 368 360 376 430 404" fill="none" stroke="var(--haut-ombre)" stroke-width="10" opacity=".6"/>` +
      `<path d="M160 352Q200 374 240 352" fill="none" stroke="var(--haut-revers)" stroke-width="6" stroke-linecap="round"/>`;
  }

  window.LSFCorps = {
    REPERES, repere, coude, angleCoude, geneCoude, limiterPoignet, epaule, anglesPoignet, dansBuste, dessinerBras, dessinerCorps, dessinerVisage, dessinerSourcils, paramsVisage, lerpVisage,
    VISAGES, BOUCHES, EPAULES, STYLE, regler, cheveuxArriere, tete, cheveuxAvant, meche, PIVOTS, bandeau, noeud, PIVOT_NOEUD,
    camYeux, corpsYeux, camMain, projMain, baseMain, decorYeux, defsYeux, frangeYeux
  };
})();
