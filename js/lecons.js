/* Parcours de leçons généré à partir des données : 3 niveaux, leçons de ~6 signes. */
(function () {
  'use strict';
  const ORDRE = ['alphabet', 'nombres', 'salutations', 'politesse', 'personnes', 'famille', 'questions', 'emotions',
    'couleurs', 'verbes', 'adjectifs', 'nourriture', 'boissons', 'animaux', 'ecole', 'maison', 'objets', 'vetements',
    'temps', 'calendrier', 'nature', 'meteo', 'lieux', 'transports', 'loisirs', 'sports', 'corps', 'sante', 'techno'];
  const NIVEAUX = [
    { n: 1, nom: 'Débutant' },
    { n: 2, nom: 'Intermédiaire' },
    { n: 3, nom: 'Avancé' }
  ];
  const TAILLE = 6;
  const SEUIL = 0.6; // part des leçons du niveau précédent à finir pour débloquer

  let cache = null;
  function construire() {
    const LSF = window.LSF;
    const niveaux = NIVEAUX.map((nv) => {
      const lecons = [];
      for (const th of ORDRE) {
        let signes = LSF.signes.filter((s) => s.theme === th && s.niveau === nv.n);
        if (th === 'nombres') signes.sort((a, b) => (parseInt(a.id.split('-')[1], 10) || 0) - (parseInt(b.id.split('-')[1], 10) || 0));
        else if (th === 'alphabet') signes.sort((a, b) => a.id.localeCompare(b.id));
        if (!signes.length) continue;
        const taille = th === 'alphabet' ? 7 : TAILLE;
        const nb = Math.ceil(signes.length / taille);
        // répartir équitablement
        const par = Math.ceil(signes.length / nb);
        for (let i = 0; i < nb; i++) {
          const lot = signes.slice(i * par, (i + 1) * par);
          if (!lot.length) continue;
          let titre = LSF.themes[th].nom;
          if (th === 'alphabet') titre = `L'alphabet de ${lot[0].mot} à ${lot[lot.length - 1].mot}`;
          else if (th === 'nombres') titre = `Les nombres de ${lot[0].mot} à ${lot[lot.length - 1].mot}`;
          else if (nb > 1) titre += ` (partie ${i + 1})`;
          lecons.push({ id: `n${nv.n}-${th}-${i + 1}`, titre, theme: th, niveau: nv.n, signes: lot.map((s) => s.id) });
        }
      }
      return Object.assign({}, nv, { lecons });
    });
    // index global
    const toutes = [];
    niveaux.forEach((nv) => nv.lecons.forEach((l) => toutes.push(l)));
    cache = { niveaux, toutes, parId: Object.fromEntries(toutes.map((l) => [l.id, l])) };
    return cache;
  }
  const parcours = () => cache || construire();

  function etat() {
    const P = parcours(), st = window.LSFStore.etat;
    let precedentFini = 1;
    return P.niveaux.map((nv, i) => {
      const faites = nv.lecons.filter((l) => st.lecons[l.id] && st.lecons[l.id].fini).length;
      const total = nv.lecons.length || 1;
      const ouvert = i === 0 || precedentFini >= SEUIL;
      precedentFini = faites / total;
      let actuelleTrouvee = false;
      const lecons = nv.lecons.map((l, j) => {
        const fini = !!(st.lecons[l.id] && st.lecons[l.id].fini);
        const precFini = j === 0 || !!(st.lecons[nv.lecons[j - 1].id] && st.lecons[nv.lecons[j - 1].id].fini);
        const dispo = ouvert && (fini || precFini);
        let actuelle = false;
        if (dispo && !fini && !actuelleTrouvee) { actuelle = true; actuelleTrouvee = true; }
        return Object.assign({}, l, { fini, dispo, actuelle, etoiles: (st.lecons[l.id] || {}).etoiles || 0 });
      });
      return Object.assign({}, nv, { lecons, faites, total: nv.lecons.length, ouvert });
    });
  }

  function prochaine() {
    for (const nv of etat()) {
      if (!nv.ouvert) continue;
      const l = nv.lecons.find((x) => x.actuelle);
      if (l) return l;
    }
    return null;
  }

  function terminer(id, bonnes, total) {
    const st = window.LSFStore.etat;
    const ratio = total ? bonnes / total : 0;
    if (ratio < 0.5) return 0; // il faut au moins la moitié des bonnes réponses pour valider
    const etoiles = ratio >= 0.95 ? 3 : ratio >= 0.7 ? 2 : 1;
    const avant = st.lecons[id] || { fini: false, score: 0, etoiles: 0 };
    st.lecons[id] = { fini: true, score: Math.max(avant.score, Math.round(ratio * 100)), etoiles: Math.max(avant.etoiles, etoiles) };
    return etoiles;
  }

  function disponible(id) {
    for (const nv of etat()) { const l = nv.lecons.find((x) => x.id === id); if (l) return l.dispo; }
    return false;
  }

  window.LSFLecons = { parcours, etat, prochaine, terminer, disponible, ORDRE, NIVEAUX };
})();
