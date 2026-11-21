/* Composants d'interface partagés : icônes, lecteur avec contrôles, tuiles, toasts, réglages du personnage. */
(function () {
  'use strict';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const I = {
    play: '<svg viewBox="0 0 24 24"><path d="M7 5v14l11-7z" fill="currentColor" stroke="none"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" stroke-width="3"/></svg>',
    rejouer: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v5h5"/></svg>',
    prec: '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
    suiv: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
    miroir: '<svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M8 7 3 12l5 5zM16 7l5 5-5 5z"/></svg>',
    trace: '<svg viewBox="0 0 24 24"><path d="M4 18c4 0 4-12 8-12s4 12 8 12" stroke-dasharray="1 3.5"/><path d="m17 15 3 3 1-4"/></svg>',
    coeur: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9Z"/></svg>',
    coeurPlein: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9Z" fill="currentColor"/></svg>',
    drapeau: '<svg viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
    lien: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    flamme: '<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9Z"/></svg>',
    eclair: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    loupe: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    croix: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    de: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/></svg>',
    cartes: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/></svg>',
    quiz: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.6M12 17v.5"/></svg>',
    chrono: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></svg>',
    revision: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>',
    main: '<svg viewBox="0 0 64 64"><path d="M22 46V22a3 3 0 0 1 6 0v12V16a3 3 0 0 1 6 0v18V18a3 3 0 0 1 6 0v18-10a3 3 0 0 1 6 0v14c0 8-6 14-14 14h-2c-5 0-8-3-11-7l-6-8a3 3 0 0 1 5-3z"/></svg>',
    etoile: '<svg viewBox="0 0 24 24"><path d="m12 2.5 2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>',
    cadenas: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    coche: '<svg viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></svg>',
    medaille: '<svg viewBox="0 0 24 24"><path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9L9.5 8z"/></svg>',
    retour: '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
    oeilFace: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
    mains: '<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    paume: '<svg viewBox="0 0 24 24"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11V4a1.5 1.5 0 0 1 3 0v7V5.5a1.5 1.5 0 0 1 3 0V13c0 4-2.5 7-6 7-2.5 0-4-1.5-5.5-3.5L4 13.5a1.4 1.4 0 0 1 2.2-1.7L8 14"/></svg>',
    tortue: '<svg viewBox="0 0 24 24"><path d="M3 15c0-4 3-7 8-7s8 3 8 7H3Z"/><path d="M19 13h2a1.5 1.5 0 0 0 0-3h-1M6 15l-1 3M15 15l1 3"/></svg>',
    reglage: '<svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
    livre: '<svg viewBox="0 0 24 24"><path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/></svg>',
    graphe: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    torii: '<svg viewBox="0 0 24 24"><path d="M3 6h18M5 6v14M19 6v14M4 10h16M8 10v10M16 10v10M2 4c4 1.5 16 1.5 20 0"/></svg>',
    engrenage: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>'
  };

  /* ---------- bannière de page (icône 3D + titre + texte + actions) ---------- */
  function banniere(icone, chemin, titre, texte, actions, deco) {
    return `<header class="banniere">
      ${deco ? `<span class="banniere-deco" aria-hidden="true">${esc(deco)}</span>` : ''}
      <div class="banniere-icone" aria-hidden="true">${icone}</div>
      <div class="banniere-titre"><span class="banniere-chemin">${esc(chemin)}</span><h1>${esc(titre)}</h1></div>
      ${texte ? `<p class="banniere-texte">${esc(texte)}</p>` : ''}
      ${actions ? `<div class="banniere-actions">${actions}</div>` : ''}
    </header>`;
  }

  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  /* ---------- toasts ---------- */
  function toast(msg, classe) {
    const z = document.getElementById('toasts');
    const t = el(`<div class="toast ${classe || ''}">${esc(msg)}</div>`);
    z.appendChild(t);
    setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 320); }, 2600);
  }
  function annoncerBadges(ids) {
    const B = window.LSFContenu.BADGES;
    ids.forEach((id, i) => { const b = B.find((x) => x.id === id); if (b) setTimeout(() => toast('Nouveau badge : ' + b.nom, 'badge-toast'), 400 + i * 900); });
  }

  /* ---------- couleurs du personnage ---------- */
  function hexVersRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function melanger(h, cible, t) {
    const a = hexVersRgb(h), b = hexVersRgb(cible);
    return '#' + a.map((x, i) => Math.round(x + (b[i] - x) * t).toString(16).padStart(2, '0')).join('');
  }
  // toutes les couleurs du personnage, calculées à partir de 4 choix (peau, cheveux, vêtement, nœud)
  function couleursPerso(r) {
    const noeud = r.noeud && r.noeud !== 'aucun' ? r.noeud : '#E0262E';
    return {
      '--peau': r.peau, '--peau-ombre': melanger(r.peau, '#7a3a40', 0.24), '--peau-clair': melanger(r.peau, '#ffffff', 0.55),
      '--paume': melanger(r.peau, '#ffffff', 0.25), '--ongle': melanger(r.peau, '#ffffff', 0.5),
      '--cheveux': r.cheveux, '--cheveux-sombre': melanger(r.cheveux, '#000000', 0.35), '--cheveux-reflet': melanger(r.cheveux, '#ffffff', 0.28),
      '--haut': r.haut, '--haut-ombre': melanger(r.haut, '#120c30', 0.3), '--haut-clair': melanger(r.haut, '#ffffff', 0.3),
      '--haut-revers': melanger(r.haut, '#ffffff', 0.12), '--noeud': noeud, '--noeud-ombre': melanger(noeud, '#000000', 0.3),
      '--cerne': melanger(r.peau, '#4a2d4a', 0.42), '--cerne-trait': melanger(r.peau, '#3a1e36', 0.6)
    };
  }
  function varsPerso(r) { return Object.entries(couleursPerso(r)).map(([k, v]) => `${k}:${v}`).join(';'); }
  function appliquerPersonnage(r) {
    const s = document.documentElement.style;
    Object.entries(couleursPerso(r)).forEach(([k, v]) => s.setProperty(k, v));
    if (window.LSFCorps) window.LSFCorps.regler({ coiffure: r.coiffure || 'carre', noeud: !!r.noeud && r.noeud !== 'aucun', cernes: !!r.cernes, theme: r.theme || null });
  }
  // portrait d'un personnage (tête et épaules), avec ses propres couleurs et son style, sans toucher au personnage actuel
  function portraitPerso(el, p) {
    el.setAttribute('style', varsPerso(p));
    const avant = Object.assign({}, window.LSFCorps.STYLE);
    window.LSFCorps.regler({ coiffure: p.coiffure, noeud: !!p.noeud && p.noeud !== 'aucun', cernes: !!p.cernes, theme: p.theme || null });
    window.LSFMoteur.vignette(el, { id: 'portrait', mot: p.nom, images: [{ d: { at: 'repos' }, visage: (p.cernes || p.theme) && p.theme !== 'alysa' ? 'neutre' : 'sourire' }] });
    window.LSFCorps.regler(avant);
    const svg = el.querySelector('svg'); if (svg) svg.setAttribute('viewBox', p.theme === 'lune' ? '110 20 180 214' : p.theme === 'arthur' ? '110 16 180 214' : p.theme === 'oni' ? '100 0 200 238' : '120 22 160 190');
  }

  /* ---------- noms lisibles ---------- */
  const NOMS_CFG = {
    plate: 'main plate, doigts serrés', B: 'main plate, pouce replié', '5': 'main ouverte, doigts écartés', '5_courbe': 'main ouverte, doigts courbés',
    griffe: 'main en griffe', '5_majeur': 'main ouverte, majeur plié', C: 'main en C', O: 'main en O', bec: 'main en bec', bec_ouvert: 'bec ouvert',
    plate_pliee: 'main plate pliée en angle', poing: 'poing fermé', A: 'poing, pouce sur le côté', pouce: 'pouce levé', index: 'index tendu',
    index_crochet: 'index en crochet', L: 'pouce et index en L', pince: 'pince (pouce et index)', pince_fermee: 'pince fermée', F: 'pouce et index en rond',
    D: 'index tendu, autres doigts en rond', V: 'index et majeur en V', V_plie: 'V crochu', U: 'index et majeur serrés', R: 'doigts croisés', K: 'configuration K',
    '3': 'pouce, index et majeur', W: 'trois doigts écartés', M: 'trois doigts serrés', '4': 'quatre doigts', I: 'auriculaire tendu', Y: 'pouce et auriculaire',
    corne: 'index et auriculaire', ILY: 'pouce, index et auriculaire', E: 'doigts pliés sur le pouce', T: 'configuration T', G: 'index et pouce levés', E_lsf: 'doigts en crochet'
  };
  const NOMS_LIEUX = {
    tete: 'le dessus de la tête', front: 'le front', front_dom: 'le front', front_non: 'le front', tempe_dom: 'la tempe', tempe_non: 'la tempe',
    oeil_dom: "l'œil", oeil_non: "l'œil", nez: 'le nez', joue_dom: 'la joue', joue_non: 'la joue', oreille_dom: "l'oreille", oreille_non: "l'oreille",
    bouche: 'la bouche', menton: 'le menton', sous_menton: 'sous le menton', cou: 'le cou', epaule_dom: "l'épaule", epaule_non: "l'épaule",
    poitrine: 'la poitrine', poitrine_dom: 'la poitrine', poitrine_non: 'la poitrine', coeur: 'le cœur', ventre: 'le ventre', ventre_dom: 'le ventre', ventre_non: 'le ventre',
    neutre: "l'espace devant toi", neutre_haut: 'devant ton visage', neutre_bas: 'devant ton ventre', neutre_dom: "l'espace devant toi", neutre_non: "l'espace devant toi",
    cote_dom: 'sur le côté', cote_non: 'sur le côté', cote_epaule_dom: "à côté de l'épaule", cote_epaule_non: "à côté de l'épaule", loin: 'bras tendu devant toi', dactylo: "à côté de l'épaule", dactylo_haut: 'à hauteur du menton',
    au_dessus_tete: 'au-dessus de la tête', levre_haut: 'au-dessus de la lèvre', coin_bouche_dom: 'le coin de la bouche', hanche_dom: 'la hanche'
  };
  function nomCfg(c) { return typeof c === 'string' ? (NOMS_CFG[c] || c) : 'configuration particulière'; }
  function nomLieu(a) {
    if (!a) return "l'espace devant toi";
    if (a.startsWith('nd:')) return "l'autre main";
    return NOMS_LIEUX[a] || a.replace(/_/g, ' ');
  }

  function resumeSigne(s) {
    const imgs = s.images || [];
    const d0 = (imgs[0] && imgs[0].d) || {};
    const cfgs = [];
    imgs.forEach((im) => { if (im.d && im.d.cfg) { const n = nomCfg(im.d.cfg); if (!cfgs.includes(n)) cfgs.push(n); } });
    const lieux = [];
    imgs.forEach((im) => { if (im.d && im.d.at && im.d.at !== 'repos') { const n = nomLieu(im.d.at); if (!lieux.includes(n)) lieux.push(n); } });
    const deuxMains = s.sym || imgs.some((im) => im.nd && im.nd.at !== 'repos');
    const mvt = [];
    if (imgs.length <= 1) mvt.push('aucun : la main reste immobile');
    else {
      if (imgs.some((im) => im.contact)) mvt.push('avec contact');
      if (imgs.some((im) => im.agiter)) mvt.push('les doigts bougent');
      if (s.rep > 1) mvt.push(`répété ${s.rep} fois`);
      if (imgs.length >= 4) mvt.push('trajet en plusieurs étapes');
      if (!mvt.length) mvt.push(imgs.length === 2 ? 'un seul mouvement' : `${imgs.length - 1} mouvements enchaînés`);
    }
    return {
      mains: s.sym ? 'deux mains, en miroir' : deuxMains ? 'deux mains' : 'une main (ta main dominante)',
      configuration: cfgs.join(' → ') || nomCfg(d0.cfg || 'plate'),
      emplacement: lieux.join(' → ') || "l'espace devant toi",
      mouvement: mvt.join(', ')
    };
  }

  const urlElix = (s) => 'https://dico.elix-lsf.fr/dictionnaire/' + encodeURIComponent(String(s.mot).toLowerCase().replace(/\s*\?\s*$/, '').replace(/\s*\(.*\)\s*$/, '').trim());
  const teinte = (s) => ((window.LSF.themes[s.theme] || {}).teinte || 260);

  /* ---------- lecteur avec contrôles ---------- */
  function lecteurComplet(conteneur, signe, opts) {
    opts = opts || {};
    const R = window.LSFStore.etat.reglages;
    const vueDepart = opts.vue || R.vue || 'face';
    conteneur.innerHTML = `
      <div class="lecteur">
        <div class="vue-choix" role="group" aria-label="Point de vue">
          <button data-vue="face" aria-pressed="${vueDepart === 'face'}">${I.oeilFace}De face</button>
          <button data-vue="yeux" aria-pressed="${vueDepart === 'yeux'}">${I.mains}Mes yeux</button>
          <button data-vue="main" aria-pressed="${vueDepart === 'main'}">${I.paume}Ma main</button>
        </div>
        <div class="scene"></div>
        <div class="angles" role="group" aria-label="Tourner autour de la main" ${vueDepart === 'main' ? '' : 'hidden'}>
          <button data-angle="0,0" aria-pressed="true">Face</button>
          <button data-angle="0,55" aria-pressed="false">Dessus</button>
          <button data-angle="0,-85" aria-pressed="false">Dessous</button>
          <button data-angle="-80,0" aria-pressed="false">Côté gauche</button>
          <button data-angle="80,0" aria-pressed="false">Côté droit</button>
          <span class="angles-aide">ou glisse sur la main pour la tourner</span>
        </div>
        <p class="forme-legende" aria-live="polite" ${vueDepart === 'main' ? '' : 'hidden'}></p>
        <div class="controles">
          <div class="ctrl-ligne">
            <button class="btn btn-principal ctrl-jouer" data-a="jouer">${I.pause}<span>Pause</span></button>
            <button class="btn" data-a="rejouer">${I.rejouer}<span>Rejouer</span></button>
            <button class="btn ctrl-bascule" data-a="lent" aria-pressed="false" title="Joue le signe deux fois plus lentement">${I.tortue}<span>Lent</span></button>
            <button class="btn ctrl-bascule" data-a="options" aria-expanded="false">${I.reglage}<span>Plus</span></button>
          </div>
          <div class="ctrl-temps">
            <span class="ctrl-etape" aria-live="polite"></span>
            <div class="barre-temps" role="slider" aria-label="Position dans l'animation" aria-valuemin="0" aria-valuemax="100" tabindex="0"><span></span><div class="etapes" aria-hidden="true"></div></div>
          </div>
          <div class="ctrl-options" hidden>
            <button class="btn" data-a="prec">${I.prec}<span>Étape précédente</span></button>
            <button class="btn" data-a="suiv"><span>Étape suivante</span>${I.suiv}</button>
            <button class="btn ctrl-bascule" data-a="miroir" aria-pressed="false">${I.miroir}<span>Gauchère (miroir)</span></button>
            <button class="btn ctrl-bascule" data-a="trace" aria-pressed="true">${I.trace}<span>Flèches de mouvement</span></button>
          </div>
        </div>
      </div>`;
    const scene = conteneur.querySelector('.scene');
    const vitesseNormale = R.vitesse || 1;
    const L = new window.LSFMoteur.Lecteur(scene, { vitesse: vitesseNormale, miroir: R.miroir, trajectoire: R.trajectoires, fantome: R.fantome, vue: vueDepart, transparent: !!R.transparent });
    // « Ma main » : petit bouton dans le coin pour voir les mains en transparence (doigts cachés, trajet, pose d'arrivée)
    const bTransp = document.createElement('button');
    bTransp.type = 'button'; bTransp.className = 'bouton-transparent';
    bTransp.setAttribute('aria-pressed', String(!!R.transparent));
    bTransp.title = 'Voir les mains en transparence : les doigts cachés, le trajet et où la main arrive';
    bTransp.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="12" height="12" rx="3"/><rect x="9" y="9" width="12" height="12" rx="3"/></svg><span>Transparent</span>';
    bTransp.hidden = vueDepart !== 'main';
    scene.appendChild(bTransp);
    if (R.transparent) L.transparent(true);
    bTransp.addEventListener('pointerdown', (e) => e.stopPropagation()); // ne pas faire tourner la main en cliquant le bouton
    bTransp.addEventListener('click', () => {
      const on = bTransp.getAttribute('aria-pressed') !== 'true';
      bTransp.setAttribute('aria-pressed', String(on));
      L.transparent(on);
      R.transparent = on; window.LSFStore.sauver(); // on se souvient du choix
    });
    const bJouer = conteneur.querySelector('[data-a="jouer"]');
    const etapes = conteneur.querySelector('.etapes');
    const barre = conteneur.querySelector('.barre-temps');
    const remplissage = barre.querySelector('span');
    const etiquetteEtape = conteneur.querySelector('.ctrl-etape');
    const legende = conteneur.querySelector('.forme-legende');
    let signeCourant = signe || null;
    const chargerOrig = L.charger.bind(L);
    L.charger = (s) => { signeCourant = s; chargerOrig(s); };
    let nEtapes = 0, enCoursAvant = null;
    L.surChangement((info) => {
      if (enCoursAvant !== info.enCours) {
        enCoursAvant = info.enCours;
        bJouer.innerHTML = (info.enCours ? I.pause : I.play) + `<span>${info.enCours ? 'Pause' : 'Lecture'}</span>`;
      }
      const pc = info.total ? Math.min(100, (info.t / info.total) * 100) : 0;
      remplissage.style.width = pc + '%';
      barre.setAttribute('aria-valuenow', Math.round(pc));
      if (nEtapes !== info.n) {
        nEtapes = info.n;
        etapes.innerHTML = nEtapes > 1 && nEtapes <= 14 ? Array.from({ length: nEtapes }, (_, i) => `<i style="left:${(i / (nEtapes - 1)) * 100}%"></i>`).join('') : '';
      }
      etapes.querySelectorAll('i').forEach((x, i) => x.classList.toggle('actif', i <= info.k));
      etiquetteEtape.textContent = nEtapes > 1 ? `Étape ${Math.min(info.k + 1, nEtapes)} / ${nEtapes}` : 'Pose fixe';
      // vue « Ma main » : nom de la forme de main en cours
      legende.hidden = info.vue !== 'main';
      if (info.vue === 'main' && signeCourant) {
        const imgs = signeCourant.images || [];
        const n = imgs.length || 1;
        let cfgD = null, cfgN = null;
        const kk = n === 1 ? 0 : Math.min(info.k, info.n - 1) % n;
        for (let i = 0; i <= kk; i++) { const im = imgs[i] || {}; if (im.d && im.d.cfg) cfgD = im.d.cfg; if (im.nd && im.nd.cfg) cfgN = im.nd.cfg; }
        if (signeCourant.sym) cfgN = null;
        const txt = 'Forme de la main : ' + nomCfg(cfgD || 'plate') + (cfgN ? ' · autre main : ' + nomCfg(cfgN) : '');
        if (legende.textContent !== txt) legende.textContent = txt;
      }
    });
    const basculerBouton = (b) => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); return on; };
    conteneur.querySelector('.controles').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const a = b.dataset.a;
      if (a === 'jouer') L.basculer();
      else if (a === 'rejouer') L.rejouer();
      else if (a === 'lent') { const on = basculerBouton(b); L.vitesse(on ? 0.5 : vitesseNormale); }
      else if (a === 'options') {
        const ouvert = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(ouvert));
        conteneur.querySelector('.ctrl-options').hidden = !ouvert;
      }
      else if (a === 'prec') L.etape(-1);
      else if (a === 'suiv') L.etape(1);
      else if (a === 'miroir') L.miroir(basculerBouton(b));
      else if (a === 'trace') L.trajectoires(basculerBouton(b));
    });
    conteneur.querySelector('.vue-choix').addEventListener('click', (e) => {
      const b = e.target.closest('[data-vue]');
      if (!b) return;
      conteneur.querySelectorAll('[data-vue]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      L.vue(b.dataset.vue);
      angles.hidden = b.dataset.vue !== 'main';
      bTransp.hidden = b.dataset.vue !== 'main';
      R.vue = b.dataset.vue; window.LSFStore.sauver(); // on se souvient du choix
    });
    // « Ma main » : boutons d'angle + glisser pour tourner autour de la main
    const angles = conteneur.querySelector('.angles');
    const marquerAngle = (b) => angles.querySelectorAll('[data-angle]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    angles.addEventListener('click', (e) => {
      const b = e.target.closest('[data-angle]');
      if (!b) return;
      const [la, ta] = b.dataset.angle.split(',').map(Number);
      marquerAngle(b); L.tourner(la, ta);
    });
    let glisse = null;
    scene.addEventListener('pointerdown', (e) => {
      if (L.opts.vue !== 'main') return;
      glisse = { x: e.clientX, y: e.clientY, a: Object.assign({}, L.angle) };
      scene.setPointerCapture(e.pointerId); scene.classList.add('tourne');
    });
    scene.addEventListener('pointermove', (e) => {
      if (!glisse) return;
      L.orienter(glisse.a.lacet + (e.clientX - glisse.x) * 0.5, glisse.a.tangage + (e.clientY - glisse.y) * 0.45);
      marquerAngle(null);
    });
    const finGlisse = () => { glisse = null; scene.classList.remove('tourne'); };
    scene.addEventListener('pointerup', finGlisse); scene.addEventListener('pointercancel', finGlisse);
    const mb = conteneur.querySelector('[data-a="miroir"]'); if (mb) mb.setAttribute('aria-pressed', String(!!R.miroir));
    const tb = conteneur.querySelector('[data-a="trace"]'); if (tb) tb.setAttribute('aria-pressed', String(!!R.trajectoires));
    const viser = (x) => { const r = barre.getBoundingClientRect(); L.pause(); L.aller((x - r.left) / r.width); };
    barre.addEventListener('pointerdown', (e) => { viser(e.clientX); barre.setPointerCapture(e.pointerId); });
    barre.addEventListener('pointermove', (e) => { if (e.buttons) viser(e.clientX); });
    barre.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); L.etape(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); L.etape(-1); }
    });
    if (signe) L.charger(signe);
    return L;
  }

  /* ---------- tuiles (vignettes paresseuses + animation au survol) ---------- */
  let obs = null;
  const peutSurvoler = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  function observer() {
    if (obs || !('IntersectionObserver' in window)) return obs;
    obs = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        const t = e.target; obs.unobserve(t);
        const s = window.LSF.parId[t.dataset.id];
        if (s) window.LSFMoteur.vignette(t, s, { miroir: window.LSFStore.etat.reglages.miroir });
      });
    }, { rootMargin: '300px' });
    return obs;
  }
  function tuile(s, opts) {
    opts = opts || {};
    const st = window.LSFStore.etat;
    const fav = st.favoris.includes(s.id);
    return `<a class="tuile inclinable" href="#/signe/${esc(s.id)}" data-id="${esc(s.id)}" style="--h:${teinte(s)}">
      <div class="tuile-scene" data-id="${esc(s.id)}" aria-hidden="true"></div>
      ${fav ? `<span class="coeur-mini" title="Favori">${I.coeurPlein}</span>` : ''}
      ${s.fiable === 'incertain' ? '<span class="verif">à vérifier</span>' : ''}
      <div class="tuile-pied"><div><div class="tuile-mot">${esc(s.mot)}</div>
      <div class="tuile-theme"><i></i>${esc((window.LSF.themes[s.theme] || {}).nom || '')}${window.LSFStore.estAppris(s.id) ? ' · appris' : ''}</div></div></div>
    </a>`;
  }
  function activerTuiles(racine) {
    const o = observer();
    racine.querySelectorAll('.tuile-scene:not([data-pret])').forEach((t) => {
      t.dataset.pret = '1';
      if (o) o.observe(t); else window.LSFMoteur.vignette(t, window.LSF.parId[t.dataset.id]);
    });
    if (!peutSurvoler) return;
    racine.querySelectorAll('.tuile:not([data-survol])').forEach((a) => {
      a.dataset.survol = '1';
      let L = null;
      a.addEventListener('pointerenter', () => {
        const s = window.LSF.parId[a.dataset.id]; const sc = a.querySelector('.tuile-scene');
        if (!s || !sc) return;
        const R = window.LSFStore.etat.reglages;
        L = new window.LSFMoteur.Lecteur(sc, { vitesse: R.vitesse, miroir: R.miroir, trajectoire: true });
        L.charger(s);
      });
      a.addEventListener('pointerleave', () => {
        if (!L) return;
        L.detruire(); L = null;
        const s = window.LSF.parId[a.dataset.id]; const sc = a.querySelector('.tuile-scene');
        if (s && sc) window.LSFMoteur.vignette(sc, s, { miroir: window.LSFStore.etat.reglages.miroir });
      });
    });
  }

  /* ---------- inclinaison 3D + reflet qui suit la souris ---------- */
  const mouvementReduit = window.LSFStore.mouvementReduit();
  function activerInclinaison(racine) {
    if (mouvementReduit || !peutSurvoler) return;
    racine.querySelectorAll('.inclinable:not([data-incl])').forEach((el) => {
      el.dataset.incl = '1';
      const force = el.classList.contains('incl-doux') ? 3 : 7;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((x - 0.5) * force).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * force).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
  }
  // entrée en cascade des éléments d'une grille
  function cascade(racine) {
    racine.querySelectorAll('.cascade, .heros-actions, .fiche-actions, .banniere-actions, .etape-pied, .ctrl-ligne, .recherche-rapide').forEach((g) => { Array.from(g.children).forEach((c, i) => c.style.setProperty('--i', i)); });
  }

  function etoiles(n) { return `<span class="etoiles" aria-label="${n} étoile${n > 1 ? 's' : ''} sur 3">${[1, 2, 3].map((i) => I.etoile.replace('<svg', `<svg class="${i <= n ? 'on' : ''}"`)).join('')}</span>`; }

  // signe du jour : déterministe selon la date
  function signeDuJour() {
    const l = window.LSF.signes.filter((s) => s.theme !== 'alphabet' && s.theme !== 'nombres' && s.fiable !== 'incertain');
    if (!l.length) return window.LSF.signes[0];
    const j = window.LSFStore.jour();
    let h = 0; for (const c of j) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return l[h % l.length];
  }

  function melangerListe(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const hasard = (a) => a[Math.floor(Math.random() * a.length)];

  window.LSFUI = { varsPerso, portraitPerso, banniere, activerInclinaison, cascade, esc, I, el, toast, annoncerBadges, appliquerPersonnage, nomCfg, nomLieu, resumeSigne, urlElix, teinte, lecteurComplet, tuile, activerTuiles, etoiles, signeDuJour, melangerListe, hasard, melanger };
})();
