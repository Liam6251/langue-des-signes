/* Registre des signes : chaque fichier js/data/*.js appelle LSF.ajouter([...]). */
(function () {
  'use strict';
  const THEMES = {
    alphabet: { nom: 'Alphabet', teinte: 330 },
    nombres: { nom: 'Nombres', teinte: 40 },
    salutations: { nom: 'Salutations', teinte: 160 },
    politesse: { nom: 'Politesse', teinte: 175 },
    questions: { nom: 'Questions', teinte: 260 },
    personnes: { nom: 'Personnes', teinte: 200 },
    famille: { nom: 'Famille', teinte: 350 },
    emotions: { nom: 'Émotions', teinte: 300 },
    verbes: { nom: 'Verbes', teinte: 220 },
    adjectifs: { nom: 'Adjectifs', teinte: 250 },
    ecole: { nom: 'École', teinte: 45 },
    maison: { nom: 'Maison', teinte: 25 },
    objets: { nom: 'Objets', teinte: 190 },
    vetements: { nom: 'Vêtements', teinte: 280 },
    couleurs: { nom: 'Couleurs', teinte: 0 },
    nourriture: { nom: 'Nourriture', teinte: 30 },
    boissons: { nom: 'Boissons', teinte: 195 },
    animaux: { nom: 'Animaux', teinte: 90 },
    nature: { nom: 'Nature', teinte: 130 },
    meteo: { nom: 'Météo', teinte: 210 },
    temps: { nom: 'Le temps', teinte: 240 },
    calendrier: { nom: 'Calendrier', teinte: 15 },
    lieux: { nom: 'Lieux', teinte: 150 },
    transports: { nom: 'Transports', teinte: 205 },
    loisirs: { nom: 'Loisirs', teinte: 320 },
    sports: { nom: 'Sports', teinte: 110 },
    corps: { nom: 'Corps', teinte: 10 },
    sante: { nom: 'Santé', teinte: 170 },
    techno: { nom: 'Techno', teinte: 230 }
  };

  // thème sakura : toutes les teintes restent dans la famille des roses (magenta → rose → corail)
  Object.values(THEMES).forEach((t, i) => { t.teinte = 300 + ((i * 23) % 64); });

  const LSF = {
    signes: [],
    parId: {},
    themes: THEMES,
    doublons: [],
    ajouter(liste) {
      if (!Array.isArray(liste)) liste = [liste];
      for (const s of liste) {
        if (!s || !s.id || !s.mot) continue;
        if (this.parId[s.id]) { this.doublons.push(s.id); continue; }
        if (!s.images && s.frames) s.images = s.frames;
        if (!Array.isArray(s.images) || !s.images.length) continue;
        if (!THEMES[s.theme]) s.theme = 'verbes';
        s.niveau = [1, 2, 3].includes(+s.niveau) ? +s.niveau : 2;
        this.signes.push(s);
        this.parId[s.id] = s;
      }
    }
  };
  window.LSF = LSF;
})();
