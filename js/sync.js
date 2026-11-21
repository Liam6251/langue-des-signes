/* Synchro en ligne de la progression (Firebase : compte e-mail + mot de passe, base Firestore).
 * La progression est toujours gardée dans le navigateur (store.js) ; une fois connectée,
 * chaque changement est aussi envoyé dans le compte, et les changements faits sur un autre
 * appareil arrivent ici tout seuls.
 * Sans configuration (js/firebase-config.js vide) ou sans internet, le site marche comme avant. */
(function () {
  'use strict';
  const S = window.LSFStore;
  const cfg = window.LSF_FIREBASE;
  const ecouteurs = [];
  const info = { dispo: false, user: null, statut: 'deconnecte', derniere: null };
  const notifier = () => { afficherStatut(); ecouteurs.forEach((f) => { try { f(info); } catch (e) { /* ignore */ } }); };

  // petit nuage dans la barre du haut + ligne d'état dans Réglages
  const TEXTES = {
    deconnecte: 'Pas connectée : progression gardée sur cet appareil seulement',
    envoi: 'Synchronisation…',
    ok: 'Synchronisé avec ton compte',
    'hors-ligne': 'Hors ligne : la progression sera envoyée au retour d’internet',
    erreur: 'La synchro a échoué : elle réessaiera au prochain changement'
  };
  function afficherStatut() {
    const t = TEXTES[info.statut] || '';
    document.querySelectorAll('[data-sync-statut]').forEach((el) => { el.textContent = t; el.dataset.etat = info.statut; });
    const p = document.getElementById('pastille-sync');
    if (!p) return;
    p.hidden = !info.dispo;
    p.dataset.etat = info.statut;
    p.title = t;
    p.setAttribute('aria-label', t + ' (ouvrir le compte)');
  }
  const statut = (s) => { info.statut = s; if (s === 'ok') info.derniere = Date.now(); notifier(); };

  // messages d'erreur Firebase en français simple
  const ERREURS = {
    'auth/invalid-email': "Cette adresse e-mail n'est pas valide.",
    'auth/missing-email': 'Écris ton adresse e-mail.',
    'auth/missing-password': 'Écris ton mot de passe.',
    'auth/weak-password': 'Le mot de passe doit faire au moins 6 caractères.',
    'auth/email-already-in-use': 'Un compte existe déjà avec cet e-mail : clique sur « Se connecter ».',
    'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
    'auth/invalid-login-credentials': 'E-mail ou mot de passe incorrect.',
    'auth/wrong-password': 'E-mail ou mot de passe incorrect.',
    'auth/user-not-found': 'Aucun compte avec cet e-mail : clique sur « Créer mon compte ».',
    'auth/too-many-requests': 'Trop d’essais. Attends quelques minutes puis réessaie.',
    'auth/network-request-failed': 'Pas de connexion internet.',
    'auth/operation-not-allowed': "La connexion par e-mail n'est pas activée dans Firebase."
  };
  const message = (e) => ERREURS[e && e.code] || 'Une erreur est survenue. Réessaie.';

  const api = {
    get info() { return info; },
    surChangement(f) { ecouteurs.push(f); },
    message,
    afficherStatut
  };
  window.LSFSync = api;

  /* ---------- écran de connexion (index.html) ----------
   * Affiché au premier passage sur un appareil. Une fois connectée, Firebase garde la session
   * dans ce navigateur : l'écran ne revient plus (sauf si elle se déconnecte). */
  const ecran = document.getElementById('ecran-connexion');
  function montrerEcran(oui) {
    if (!ecran) return;
    try { if (oui) localStorage.removeItem('lsf-compte'); else localStorage.setItem('lsf-compte', '1'); } catch (e) { /* ignore */ }
    ecran.hidden = !oui;
    document.documentElement.classList.toggle('ec-ouvert', oui);
    if (oui) {
      document.getElementById('ec-attente').hidden = true;
      document.getElementById('ec-form').hidden = false;
      const champ = document.getElementById('ec-email');
      if (champ && !champ.value && window.matchMedia('(hover: hover)').matches) champ.focus();
    }
  }
  function brancherEcran() {
    if (!ecran) return;
    const form = document.getElementById('ec-form'), err = document.getElementById('ec-erreur');
    const email = document.getElementById('ec-email'), mdp = document.getElementById('ec-mdp');
    const occupe = (b) => form.querySelectorAll('button').forEach((x) => { x.disabled = b; });
    const lancer = (action, ok) => {
      err.textContent = '';
      occupe(true);
      action().then(() => { occupe(false); mdp.value = ''; if (ok && window.LSFUI) window.LSFUI.toast(ok); },
        (e) => { err.textContent = message(e); occupe(false); });
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); lancer(() => api.connecter(email.value, mdp.value), 'Connectée ! Bon apprentissage.'); });
    document.getElementById('ec-creer').addEventListener('click', () => {
      mdp.setAttribute('autocomplete', 'new-password');
      lancer(() => api.creer(email.value, mdp.value), 'Compte créé ! Ta progression est enregistrée en ligne.');
    });
    document.getElementById('ec-voir').addEventListener('change', (e) => { mdp.type = e.target.checked ? 'text' : 'password'; });
    document.getElementById('ec-oubli').addEventListener('click', () => {
      if (!email.value.trim()) { err.textContent = 'Écris ton e-mail, puis clique encore sur « Mot de passe oublié ? ».'; email.focus(); return; }
      err.textContent = ''; occupe(true);
      api.oublie(email.value).then(
        () => { occupe(false); err.textContent = ''; if (window.LSFUI) window.LSFUI.toast('E-mail envoyé : ouvre-le pour choisir un nouveau mot de passe.'); },
        (e) => { occupe(false); err.textContent = message(e); });
    });
  }

  // pas de service de connexion (pas d'internet, fichier local) : on laisse entrer sans compte
  const sansCompte = () => { if (ecran) { ecran.hidden = true; document.documentElement.classList.remove('ec-ouvert'); } };

  if (!cfg || !cfg.apiKey || !window.firebase || !firebase.initializeApp) { sansCompte(); rafraichirPage(); return; }

  let auth, db;
  try {
    firebase.initializeApp(cfg);
    auth = firebase.auth();
    auth.languageCode = 'fr';
    db = firebase.firestore();
  } catch (e) { console.error('[synchro]', e); sansCompte(); rafraichirPage(); return; }
  info.dispo = true;
  afficherStatut();

  /* ---------- fusion de deux progressions (cet appareil + le compte) ----------
   * Rien ne se perd : on garde le meilleur de chaque côté (XP, leçons, signes, badges…).
   * Les listes qu'on peut vider (favoris, phrases, réglages…) viennent du côté le plus récent.
   * Après « Tout effacer » ou un import, ce côté-là remplace tout ce qui est plus ancien. */
  function fusionner(local, distant) {
    const a = S.valider(local), b = S.valider(distant);
    if (!b) return a;
    if (!a || !a.maj) return b;
    if (!b.maj) return a;
    if (a.efface > b.maj) return a;
    if (b.efface > a.maj) return b;
    const recent = a.maj >= b.maj ? a : b;
    const r = JSON.parse(JSON.stringify(recent));
    const max = (k) => Math.max(a[k], b[k]);
    r.maj = max('maj'); r.efface = max('efface');
    r.xp = max('xp'); r.quizParfaits = max('quizParfaits'); r.chronoRecord = max('chronoRecord');
    r.serie = Object.assign({}, (a.serie.dernier || '') >= (b.serie.dernier || '') ? a.serie : b.serie);
    r.serie.record = Math.max(a.serie.record, b.serie.record, r.serie.n);
    r.activite = Object.assign({}, a.activite);
    for (const [j, n] of Object.entries(b.activite)) r.activite[j] = Math.max(r.activite[j] || 0, n);
    r.lecons = Object.assign({}, a.lecons);
    for (const [k, l] of Object.entries(b.lecons)) {
      const x = r.lecons[k];
      r.lecons[k] = x ? { fini: x.fini || l.fini, score: Math.max(x.score, l.score), etoiles: Math.max(x.etoiles, l.etoiles) } : l;
    }
    r.signes = Object.assign({}, a.signes);
    const poids = (f) => f.vu + f.ok + f.ko;
    for (const [k, f] of Object.entries(b.signes)) {
      const x = r.signes[k];
      if (!x || poids(f) > poids(x) || (poids(f) === poids(x) && recent === b)) r.signes[k] = f;
    }
    for (const liste of ['badges', 'skins']) {
      r[liste] = Object.assign({}, b[liste]);
      for (const [k, d] of Object.entries(a[liste])) if (!r[liste][k] || d < r[liste][k]) r[liste][k] = d;
    }
    for (const k of ['themeSakura', 'persoKiki', 'xpZero']) r[k] = a[k] || b[k];
    return r;
  }

  /* ---------- envoi / réception ---------- */
  let doc = null, arreter = null, minuteur = null, recu = false, enCours = false;
  let dernierEnvoi = '';
  // texte qui ne dépend pas de l'ordre des clés : deux appareils avec la même progression
  // obtiennent exactement le même texte (sinon ils se renverraient la progression sans fin)
  const canon = (v) => JSON.stringify(v, (k, x) => (x && typeof x === 'object' && !Array.isArray(x)
    ? Object.keys(x).sort().reduce((o, c) => { o[c] = x[c]; return o; }, {}) : x));

  async function envoyer() {
    clearTimeout(minuteur); minuteur = null;
    if (!doc || !recu) return;
    const texte = canon(S.etat);
    if (texte === dernierEnvoi) { statut('ok'); return; }
    statut('envoi');
    try {
      await doc.set({ etat: texte, maj: S.etat.maj || Date.now(), xp: S.etat.xp });
      dernierEnvoi = texte;
      statut('ok');
    } catch (e) { console.warn('[synchro] envoi', e); statut(navigator.onLine === false ? 'hors-ligne' : 'erreur'); }
  }
  function planifier() {
    if (enCours || !doc || !recu) return;
    clearTimeout(minuteur);
    minuteur = setTimeout(envoyer, 1200);
  }
  S.surChangement(planifier);
  // la page se ferme ou passe en arrière-plan (téléphone) : on envoie tout de suite
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && minuteur) envoyer(); });
  window.addEventListener('online', () => { if (doc) { recu = true; envoyer(); } });

  function recevoir(snap) {
    if (snap.metadata.hasPendingWrites) return;
    const premier = !recu;
    recu = true;
    if (!snap.exists) { envoyer(); return; }
    const d = snap.data() || {};
    if (typeof d.etat !== 'string' || d.etat.length > 2e6) { envoyer(); return; }
    dernierEnvoi = d.etat;
    if (d.etat === canon(S.etat)) { statut('ok'); return; }
    let distant;
    try { distant = JSON.parse(d.etat); } catch (e) { envoyer(); return; }
    const avant = canon(S.etat);
    const fus = fusionner(S.etat, distant);
    if (fus && canon(fus) !== avant) {
      enCours = true;
      try { S.remplacer(fus); } finally { enCours = false; }
      appliquerAffichage(premier);
    }
    if (canon(S.etat) !== d.etat) envoyer(); else statut('ok');
  }

  // la progression a changé depuis un autre appareil : on met l'écran à jour,
  // sauf au milieu d'une leçon ou d'un exercice (pour ne pas couper Maëlle)
  function appliquerAffichage(premier) {
    try {
      if (window.LSFUI) window.LSFUI.appliquerPersonnage(S.etat.reglages);
      if (window.LSFApp) window.LSFApp.majStatut();
      const page = document.body.dataset.page;
      if (window.LSFApp && page !== 'lecon' && page !== 'exercice') window.LSFApp.aller();
      if (premier && window.LSFUI) window.LSFUI.toast('Progression synchronisée avec ton compte.');
    } catch (e) { /* ignore */ }
  }

  auth.onAuthStateChanged((u) => {
    if (arreter) { arreter(); arreter = null; }
    clearTimeout(minuteur); minuteur = null;
    info.user = u ? { email: u.email } : null;
    recu = false; dernierEnvoi = '';
    if (u) {
      doc = db.collection('progres').doc(u.uid);
      statut('envoi');
      arreter = doc.onSnapshot(recevoir, (e) => { console.warn('[synchro] lecture', e); statut('erreur'); });
    } else {
      doc = null;
      statut('deconnecte');
    }
    montrerEcran(!u);
    rafraichirPage(!u);
  });

  api.connecter = (email, mdp) => auth.signInWithEmailAndPassword(String(email).trim(), mdp);
  api.creer = (email, mdp) => auth.createUserWithEmailAndPassword(String(email).trim(), mdp);
  api.oublie = (email) => auth.sendPasswordResetEmail(String(email).trim());
  api.deconnecter = async () => { if (minuteur) await envoyer(); return auth.signOut(); };
  api.synchroniser = () => envoyer();
  brancherEcran();

  // les pages qui montrent le compte se redessinent quand l'état de connexion change
  // (l'accueil seulement s'il doit montrer « Connecte-toi »)
  function rafraichirPage(accueilAussi) {
    const page = document.body.dataset.page;
    if (window.LSFApp && (page === 'reglages' || (accueilAussi && page === 'accueil'))) window.LSFApp.aller();
  }
})();
