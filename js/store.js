/* Sauvegarde de la progression (localStorage) + répétition espacée + badges. */
(function () {
  'use strict';
  const CLE = 'lsf-maelle-v1';
  const INTERVALLES = [0, 1, 2, 4, 8, 16, 32]; // jours par boîte

  // raretés des personnages, de la plus courante à la plus rare.
  // Pour en ajouter une : une ligne ici (nom affiché) + ses couleurs dans css/style.css (« RARETÉS DES PERSONNAGES »).
  const RARETES = {
    commun: { nom: 'Commun', ordre: 0 },
    peu_commun: { nom: 'Peu commun', ordre: 0.5 },
    rare: { nom: 'Rare', ordre: 1 },
    epique: { nom: 'Épique', ordre: 2 },
    legendaire: { nom: 'Légendaire', ordre: 3 },
    mythique: { nom: 'Mythique', ordre: 4 },
    secret: { nom: 'Secret', ordre: 5 }
  };

  // personnages prêts à l'emploi ; « Kiki » est le personnage principal par défaut
  const PERSOS = {
    kiki: { nom: 'Kiki', rarete: 'rare', peau: '#F7D9C4', cheveux: '#3A2420', haut: '#3E3468', coiffure: 'carre', noeud: '#E0262E' },
    sakura: { nom: 'Sakura', rarete: 'commun', peau: '#F3CDB4', cheveux: '#1E1A1D', haut: '#F07AAE', coiffure: 'carre', noeud: '#FFFFFF' },
    nuit: { nom: 'Nuit', rarete: 'commun', peau: '#E7B08A', cheveux: '#1E1A1D', haut: '#26202B', coiffure: 'chignon', noeud: 'aucun' },
    peche: { nom: 'Pêche', rarete: 'commun', peau: '#C98F62', cheveux: '#2B1B17', haut: '#E86FA3', coiffure: 'chignon', noeud: 'aucun' },
    lumiere: { nom: 'Light', rarete: 'peu_commun', peau: '#F4D9C2', cheveux: '#8A4F2A', haut: '#C9AE84', coiffure: 'carre', noeud: 'aucun', theme: 'lumiere' },
    l: { nom: 'L', rarete: 'epique', peau: '#F2E4D8', cheveux: '#15141A', haut: '#ECE9E3', coiffure: 'ebouriffe', noeud: 'aucun', cernes: true },
    // personnages secrets : débloqués avec l'XP (voir Progrès)
    // (ids « lune » et « oni » gardés pour ne pas casser les sauvegardes)
    // ordre de déblocage : Coraline (épique) → Arthur (légendaire) → ZZ (légendaire) → Mavis (mythique) → Alysa Liu → Koro Sensei → Ryuk
    coraline: { nom: 'Coraline', rarete: 'epique', peau: '#F5DCC9', cheveux: '#2E55D4', haut: '#F2BE2A', coiffure: 'carre', noeud: 'aucun', theme: 'coraline', secret: true, xp: 75 },
    arthur: { nom: 'Arthur', rarete: 'legendaire', peau: '#F6D8C4', cheveux: '#C8461E', haut: '#EEEAE2', coiffure: 'carre', noeud: 'aucun', theme: 'arthur', secret: true, xp: 150 },
    zz: { nom: 'Zuko', rarete: 'legendaire', peau: '#F2D3B6', cheveux: '#17141A', haut: '#7E2620', coiffure: 'carre', noeud: 'aucun', theme: 'zz', secret: true, xp: 185 },
    mavis: { nom: 'Mavis', rarete: 'mythique', peau: '#F3E3E6', cheveux: '#16131B', haut: '#1D1A23', coiffure: 'carre', noeud: 'aucun', theme: 'mavis', secret: true, xp: 220 },
    alysa: { nom: 'Alysa Liu', rarete: 'secret', peau: '#F4D8C2', cheveux: '#E8D6B4', haut: '#F3F1F6', coiffure: 'carre', noeud: 'aucun', theme: 'alysa', secret: true, xp: 300 },
    lune: { nom: 'Koro Sensei', rarete: 'secret', peau: '#FFD21F', cheveux: '#5A3A08', haut: '#1C1A22', coiffure: 'carre', noeud: 'aucun', theme: 'lune', secret: true, xp: 500 },
    oni: { nom: 'Ryuk', rarete: 'secret', peau: '#DCDFE6', cheveux: '#14151B', haut: '#17171D', coiffure: 'carre', noeud: 'aucun', theme: 'oni', secret: true, xp: 800 }
  };
  Object.values(PERSOS).forEach((p) => { p.cernes = !!p.cernes; p.theme = p.theme || null; if (!RARETES[p.rarete]) p.rarete = 'commun'; });
  const SECRETS = Object.keys(PERSOS).filter((id) => PERSOS[id].secret).sort((a, b) => PERSOS[a].xp - PERSOS[b].xp);
  const REGLAGES_DEFAUT = Object.assign({
    vitesse: 1, miroir: false, trajectoires: true, fantome: false, petales: true, animations: true, vue: 'face', perso: 'kiki'
  }, (({ peau, cheveux, haut, coiffure, noeud, cernes, theme }) => ({ peau, cheveux, haut, coiffure, noeud, cernes, theme }))(PERSOS.kiki));
  function neuf() {
    return {
      // maj : dernière modification (ms) ; efface : dernier « tout effacer » ou import (sert à la synchro en ligne)
      v: 1, maj: 0, efface: 0, xp: 0, serie: { n: 0, dernier: null, record: 0 }, activite: {}, lecons: {}, signes: {},
      favoris: [], difficiles: [], phrases: [], skins: {}, badges: {}, quizParfaits: 0, chronoRecord: 0, recherches: [], themeSakura: true, persoKiki: true, xpZero: true,
      reglages: Object.assign({}, REGLAGES_DEFAUT)
    };
  }

  const jour = (d) => { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const ajouterJours = (j, n) => { const d = new Date(j + 'T12:00:00'); d.setDate(d.getDate() + n); return jour(d); };

  let etat = neuf();
  let stockageOk = true;
  function charger() {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) etat = valider(JSON.parse(brut)) || neuf();
    } catch (e) { stockageOk = false; }
    // thème sakura × noir : l'ancien sweat par défaut (violet puis rose) devient noir
    if (!etat.themeSakura) {
      const h = (etat.reglages.haut || '').toUpperCase();
      if (h === '#7C6CF0' || h === '#F07AAE') etat.reglages.haut = REGLAGES_DEFAUT.haut;
      if ((etat.reglages.cheveux || '').toUpperCase() === '#3A2630') etat.reglages.cheveux = REGLAGES_DEFAUT.cheveux;
      etat.themeSakura = true;
      try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* ignore */ }
    }
    // une seule fois : l'XP repart de 0 et tous les personnages secrets se reverrouillent
    // (les leçons, signes appris, badges et la série sont gardés)
    if (!etat.xpZero) {
      etat.xp = 0;
      etat.skins = {};
      etat.xpZero = true;
      try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* ignore */ }
    }
    verrouiller();
    // une seule fois : Kiki devient le personnage principal
    if (!etat.persoKiki) {
      Object.assign(etat.reglages, { perso: 'kiki' }, (({ peau, cheveux, haut, coiffure, noeud }) => ({ peau, cheveux, haut, coiffure, noeud }))(PERSOS.kiki));
      etat.persoKiki = true;
      try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* ignore */ }
    }
  }
  /* ---------- personnages secrets ---------- */
  const skinDebloque = (id) => !!(PERSOS[id] && (!PERSOS[id].secret || etat.xp >= PERSOS[id].xp || etat.skins[id]));
  // personnage secret encore verrouillé (ex. après « tout effacer ») : on revient à Kiki
  function verrouiller() {
    const r = etat.reglages;
    const id = r.theme ? SECRETS.find((k) => PERSOS[k].theme === r.theme) : (PERSOS[r.perso] && PERSOS[r.perso].secret ? r.perso : null);
    const style = (p) => (({ peau, cheveux, haut, coiffure, noeud, cernes, theme }) => ({ peau, cheveux, haut, coiffure, noeud, cernes, theme }))(p);
    if (id && !skinDebloque(id)) Object.assign(r, { perso: 'kiki' }, style(PERSOS.kiki));
    // personnage secret déjà choisi : on reprend ses couleurs actuelles (si son dessin a changé depuis la sauvegarde)
    else if (id) Object.assign(r, { perso: id }, style(PERSOS[id]));
  }
  // retourne les personnages qui viennent d'être débloqués (et les note pour ne les annoncer qu'une fois)
  function nouveauxSkins() {
    const nv = SECRETS.filter((id) => !etat.skins[id] && etat.xp >= PERSOS[id].xp);
    nv.forEach((id) => { etat.skins[id] = jour(); });
    if (nv.length) sauver();
    return nv;
  }
  function sauver() {
    etat.maj = Date.now();
    try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { stockageOk = false; }
    ecouteurs.forEach((f) => { try { f(etat); } catch (e) { /* ignore */ } });
  }
  const ecouteurs = [];

  // Validation stricte d'un objet importé (on ne garde que des champs connus et typés)
  function valider(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
    const n = neuf();
    const num = (x, d) => (typeof x === 'number' && isFinite(x) && x >= 0 ? Math.floor(Math.min(x, 1e9)) : d);
    const dateOk = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && jour(new Date(s + 'T12:00:00')) === s;
    const idOk = (s) => typeof s === 'string' && /^[a-z0-9-]{1,60}$/.test(s);
    n.xp = num(o.xp, 0);
    n.maj = typeof o.maj === 'number' && isFinite(o.maj) && o.maj > 0 ? Math.floor(o.maj) : 0;
    n.efface = typeof o.efface === 'number' && isFinite(o.efface) && o.efface > 0 ? Math.floor(o.efface) : 0;
    if (o.serie && typeof o.serie === 'object') {
      n.serie.n = num(o.serie.n, 0); n.serie.record = num(o.serie.record, 0);
      n.serie.dernier = dateOk(o.serie.dernier) ? o.serie.dernier : null;
    }
    if (o.activite && typeof o.activite === 'object') for (const k of Object.keys(o.activite).slice(0, 2000)) if (dateOk(k)) n.activite[k] = num(o.activite[k], 0);
    if (o.lecons && typeof o.lecons === 'object') for (const k of Object.keys(o.lecons).slice(0, 1000)) {
      const l = o.lecons[k];
      if (/^[a-z0-9-]{1,80}$/.test(k) && l && typeof l === 'object') n.lecons[k] = { fini: !!l.fini, score: num(l.score, 0), etoiles: Math.min(3, num(l.etoiles, 0)) };
    }
    if (o.signes && typeof o.signes === 'object') for (const k of Object.keys(o.signes).slice(0, 5000)) {
      const s = o.signes[k];
      if (idOk(k) && s && typeof s === 'object') n.signes[k] = { b: Math.min(6, num(s.b, 0)), vu: num(s.vu, 0), ok: num(s.ok, 0), ko: num(s.ko, 0), proch: dateOk(s.proch) ? s.proch : null };
    }
    if (Array.isArray(o.favoris)) n.favoris = o.favoris.filter(idOk).slice(0, 2000);
    if (Array.isArray(o.difficiles)) n.difficiles = o.difficiles.filter(idOk).slice(0, 2000);
    // mes phrases : listes d'identifiants de signes, dans l'ordre
    if (o.skins && typeof o.skins === 'object') for (const k of SECRETS) if (dateOk(o.skins[k])) n.skins[k] = o.skins[k];
    if (Array.isArray(o.phrases)) n.phrases = o.phrases.filter((p) => Array.isArray(p) && p.length > 0 && p.length <= 20 && p.every(idOk)).slice(0, 200);
    if (o.badges && typeof o.badges === 'object') for (const k of Object.keys(o.badges).slice(0, 100)) if (/^[a-z0-9_]{1,40}$/.test(k) && dateOk(o.badges[k])) n.badges[k] = o.badges[k];
    n.themeSakura = o.themeSakura === true;
    n.persoKiki = o.persoKiki === true;
    n.xpZero = o.xpZero === true;
    n.quizParfaits = num(o.quizParfaits, 0);
    n.chronoRecord = num(o.chronoRecord, 0);
    if (Array.isArray(o.recherches)) n.recherches = o.recherches.filter((x) => typeof x === 'string' && x.length < 40).slice(0, 8);
    if (o.reglages && typeof o.reglages === 'object') {
      const r = o.reglages, c = (x) => typeof x === 'string' && /^#[0-9a-fA-F]{6}$/.test(x);
      if ([0.5, 0.75, 1, 1.25].includes(r.vitesse)) n.reglages.vitesse = r.vitesse;
      for (const b of ['miroir', 'trajectoires', 'fantome', 'petales', 'animations', 'cernes', 'transparent']) if (typeof r[b] === 'boolean') n.reglages[b] = r[b];
      for (const k of ['peau', 'cheveux', 'haut']) if (c(r[k])) n.reglages[k] = r[k];
      if (c(r.noeud) || r.noeud === 'aucun') n.reglages.noeud = r.noeud;
      if (['carre', 'chignon', 'ebouriffe'].includes(r.coiffure)) n.reglages.coiffure = r.coiffure;
      if (['face', 'yeux', 'main'].includes(r.vue)) n.reglages.vue = r.vue;
      if (typeof r.perso === 'string' && (PERSOS[r.perso] || r.perso === 'perso')) n.reglages.perso = r.perso;
      n.reglages.theme = SECRETS.some((k) => PERSOS[k].theme === r.theme) ? r.theme : null;
    }
    return n;
  }

  /* ---------- activité / série ---------- */
  function noterActivite(n) {
    const j = jour();
    etat.activite[j] = (etat.activite[j] || 0) + (n || 1);
    const s = etat.serie;
    if (s.dernier !== j) {
      s.n = s.dernier === ajouterJours(j, -1) ? s.n + 1 : 1;
      s.dernier = j;
      s.record = Math.max(s.record, s.n);
    }
  }
  function serieActuelle() {
    const s = etat.serie, j = jour();
    if (s.dernier === j || s.dernier === ajouterJours(j, -1)) return s.n;
    return 0;
  }

  /* ---------- signes ---------- */
  function fiche(id) { return etat.signes[id] || (etat.signes[id] = { b: 0, vu: 0, ok: 0, ko: 0, proch: null }); }
  function vu(id) { fiche(id).vu++; }
  function reponse(id, juste) {
    const f = fiche(id);
    const du = !f.proch || f.proch <= jour();
    if (juste) {
      f.ok++;
      // on ne monte de boîte que si le signe était à revoir : la maîtrise demande des jours différents
      if (du) { f.b = Math.min(6, f.b + 1); f.proch = ajouterJours(jour(), INTERVALLES[f.b]); }
    } else { f.ko++; f.b = Math.max(0, Math.min(f.b, 2) - 1); f.proch = jour(); }
    noterActivite(1);
  }
  const estAppris = (id) => !!(etat.signes[id] && etat.signes[id].b >= 1);
  const estMaitrise = (id) => !!(etat.signes[id] && etat.signes[id].b >= 3);
  function aReviser() {
    const j = jour();
    return Object.keys(etat.signes).filter((id) => {
      const f = etat.signes[id];
      return window.LSF.parId[id] && (f.ok + f.ko) > 0 && f.proch && f.proch <= j;
    });
  }
  function nbAppris() { return Object.keys(etat.signes).filter((id) => window.LSF.parId[id] && estAppris(id)).length; }

  function basculer(liste, id) {
    const l = etat[liste];
    const i = l.indexOf(id);
    if (i >= 0) l.splice(i, 1); else l.unshift(id);
    sauver();
    return i < 0;
  }

  /* ---------- badges ---------- */
  function verifierBadges() {
    const nouveaux = [];
    const gagner = (id) => { if (!etat.badges[id]) { etat.badges[id] = jour(); nouveaux.push(id); } };
    const appris = nbAppris();
    if (Object.values(etat.lecons).some((l) => l.fini)) gagner('premiere_lecon');
    if (appris >= 10) gagner('signes_10');
    if (appris >= 50) gagner('signes_50');
    if (appris >= 100) gagner('signes_100');
    if (appris >= 250) gagner('signes_250');
    const tous = (theme) => { const l = window.LSF.signes.filter((s) => s.theme === theme); return l.length > 0 && l.every((s) => estMaitrise(s.id)); };
    if (tous('alphabet')) gagner('alphabet_maitre');
    if (tous('nombres')) gagner('nombres_maitre');
    if (etat.serie.record >= 3) gagner('serie_3');
    if (etat.serie.record >= 7) gagner('serie_7');
    if (etat.serie.record >= 30) gagner('serie_30');
    if (etat.quizParfaits >= 10) gagner('quiz_parfaits_10');
    if (etat.chronoRecord >= 20) gagner('defi_chrono_20');
    return nouveaux;
  }

  function ajouterXP(n) { etat.xp += Math.max(0, Math.round(n)); }

  function noterRecherche(q) {
    q = String(q || '').trim().toLowerCase();
    if (q.length < 2) return;
    etat.recherches = [q].concat(etat.recherches.filter((x) => x !== q)).slice(0, 6);
    sauver();
  }

  function exporter() { return JSON.stringify(Object.assign({ app: 'lsf-maelle', exporte: new Date().toISOString() }, etat), null, 1); }
  function importer(texte) {
    let o;
    try { o = JSON.parse(texte); } catch (e) { return false; }
    if (!o || o.app !== 'lsf-maelle') return false;
    const v = valider(o);
    if (!v) return false;
    // une sauvegarde importée garde son XP (pas de remise à 0 au prochain chargement) ;
    // ses personnages sont revérifiés avec cet XP
    v.xpZero = true;
    // en ligne, la sauvegarde importée remplace celle du compte (au lieu d'être mélangée)
    v.efface = Date.now();
    etat = v; verrouiller(); sauver(); return true;
  }
  function reinitialiser() { const r = etat.reglages; etat = neuf(); etat.reglages = r; etat.efface = Date.now(); verrouiller(); sauver(); }
  // progression reçue d'un autre appareil (synchro en ligne) : déjà validée et fusionnée.
  // On garde sa date « maj » telle quelle pour ne pas la faire passer pour une modification d'ici.
  function remplacer(o) {
    const v = valider(o);
    if (!v) return false;
    etat = v; verrouiller();
    try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { stockageOk = false; }
    ecouteurs.forEach((f) => { try { f(etat); } catch (e) { /* ignore */ } });
    return true;
  }

  charger();

  window.LSFStore = {
    get etat() { return etat; }, sauver, jour, ajouterJours, noterActivite, serieActuelle, vu, reponse, estAppris, estMaitrise,
    aReviser, nbAppris, basculer, verifierBadges, ajouterXP, noterRecherche, exporter, importer, reinitialiser, remplacer, valider,
    surChangement: (f) => ecouteurs.push(f), get stockageOk() { return stockageOk; }, REGLAGES_DEFAUT, PERSOS,
    // animations coupées seulement si on le choisit dans Réglages (le réglage Windows « effets d'animation » est souvent coupé sans le vouloir)
    mouvementReduit: () => etat.reglages.animations === false,
    SECRETS, RARETES, skinDebloque, nouveauxSkins
  };
  document.documentElement.classList.toggle('mouvement-reduit', etat.reglages.animations === false);
})();
