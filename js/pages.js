/* Pages : accueil, découvrir, fiche signe, apprendre, leçon, progrès, mes signes, culture, réglages. */
(function () {
  'use strict';
  const U = window.LSFUI, I = U.I, esc = U.esc, T = window.LSFContenu.TEXTES;
  const S = () => window.LSFStore;
  const app = () => window.LSFApp;

  /* =============== ACCUEIL =============== */
  function accueil(main) {
    const st = S().etat;
    const serie = S().serieActuelle();
    const proch = window.LSFLecons.prochaine();
    const sj = U.signeDuJour();
    const themes = Object.entries(window.LSF.themes).filter(([k]) => window.LSF.signes.some((s) => s.theme === k));
    const OBJECTIF = 15;
    const aujourdhui = st.activite[S().jour()] || 0;
    const ratio = Math.min(1, aujourdhui / OBJECTIF);
    const C = 2 * Math.PI * 62;
    const nbRevision = new Set(S().aReviser().concat(st.difficiles).filter((id) => window.LSF.parId[id])).size;
    main.innerHTML = `
    <div class="page apparait">
      <section class="heros">
        <div class="heros-texte">
          <h1>Salut <span class="accent">Maëlle</span> !</h1>
          <p>${esc(T.accueil_sous_titre)} Le personnage épelle ton prénom en LSF : regarde bien ses mains, lettre par lettre.</p>
          <div class="heros-actions">
            ${proch ? `<a class="btn btn-principal btn-grand" href="#/lecon/${esc(proch.id)}">${I.play}${esc(T.continuer_lecon)}</a>` : `<a class="btn btn-principal btn-grand" href="#/apprendre">Voir les leçons</a>`}
            <a class="btn btn-fantome btn-grand" href="#/decouvrir">${I.loupe}Dictionnaire</a>
          </div>
          ${window.LSFSync && window.LSFSync.info.dispo && !window.LSFSync.info.user ? `<p class="petit texte-doux" style="margin-top:14px"><a href="#/reglages" style="color:var(--sakura-clair);font-weight:700">Connecte-toi</a> pour retrouver ta progression sur ton téléphone et tes autres appareils.</p>` : ''}
          ${proch ? `<p class="petit texte-doux" style="margin-top:14px">Prochaine leçon : <strong style="color:var(--sakura-clair)">${esc(proch.titre)}</strong></p>` : ''}
          <div class="pastilles-jour">
            <div class="pj-serie inclinable incl-doux"><b>${serie}</b><span>${serie > 1 ? 'jours de suite' : 'jour de suite'}</span></div>
            <div class="pj-xp inclinable incl-doux"><b>${st.xp}</b><span>XP</span></div>
            <div class="pj-appris inclinable incl-doux"><b>${S().nbAppris()}</b><span>signes appris</span></div>
            <div class="inclinable incl-doux"><b>${window.LSF.signes.length}</b><span>signes au total</span></div>
          </div>
        </div>
        <div class="heros-scene">
          <div class="scene" id="scene-heros"></div>
          <div class="prenom" id="prenom" aria-label="M A Ë L L E">${'MAËLLE'.split('').map((l) => `<span>${l}</span>`).join('')}</div>
        </div>
      </section>

      <section class="section accueil-grille">
        <div class="jour">
          <span class="onglet">${esc(T.signe_du_jour)}</span>
          <a href="#/signe/${esc(sj.id)}" class="scene" id="scene-jour" aria-label="Voir le signe ${esc(sj.mot)}"></a>
          <div>
            <span class="etiquette">${esc((window.LSF.themes[sj.theme] || {}).nom || '')}</span>
            <h3>${esc(sj.mot)}</h3>
            <p class="texte-doux">${esc(sj.desc || '')}</p>
            <div class="heros-actions" style="margin-top:20px"><a class="btn btn-principal" href="#/signe/${esc(sj.id)}">Voir la fiche</a>
            <button class="btn btn-fantome bascule-fav" id="fav-jour" aria-pressed="${st.favoris.includes(sj.id)}">${st.favoris.includes(sj.id) ? I.coeurPlein : I.coeur}<span>${st.favoris.includes(sj.id) ? 'Favori' : 'Favori'}</span></button></div>
          </div>
        </div>
        <div class="objectif">
          <span class="onglet or">Objectif du jour</span>
          <div class="anneau" role="img" aria-label="${aujourdhui} activités sur ${OBJECTIF} aujourd'hui">
            <svg viewBox="0 0 150 150"><circle class="fond-anneau" cx="75" cy="75" r="62"/><circle class="val-anneau" cx="75" cy="75" r="62" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}" data-cible="${(C * (1 - ratio)).toFixed(1)}"/></svg>
            <div class="anneau-texte"><div><b>${Math.min(aujourdhui, OBJECTIF)}<small style="font-size:16px;color:var(--texte-3)">/${OBJECTIF}</small></b><span>${ratio >= 1 ? 'objectif atteint' : 'activités'}</span></div></div>
          </div>
          <p class="texte-doux petit" style="text-align:center">${ratio >= 1 ? 'Bravo, ta journée est validée !' : serie ? `Ta série de ${serie} jour${serie > 1 ? 's' : ''} continue si tu t'entraînes aujourd'hui.` : esc(T.aucune_serie)}</p>
          <a class="btn btn-menthe" href="#/entrainer/revision">${I.revision}Révision du jour${nbRevision ? ` (${nbRevision})` : ''}</a>
        </div>
      </section>

      <section class="section">
        <div class="panneau">
          <span class="onglet menthe">Explorer par thème</span>
          <form class="recherche-rapide" role="search" id="rr" style="margin:6px 0 20px">
            <label class="sr" for="rr-q">Chercher un signe</label>
            <input class="champ" id="rr-q" type="search" placeholder="${esc(T.recherche_placeholder)}" autocomplete="off">
            <button class="btn btn-principal btn-icone" aria-label="Chercher">${I.loupe}</button>
          </form>
          <div class="themes-ruban cascade">${themes.map(([k, t]) => `<a class="puce" style="--h:${t.teinte}" href="#/decouvrir?theme=${k}"><span class="pt"></span>${esc(t.nom)}</a>`).join('')}</div>
        </div>
      </section>
    </div>`;
    requestAnimationFrame(() => setTimeout(() => { const a = main.querySelector('.val-anneau'); if (a) a.style.strokeDashoffset = a.dataset.cible; }, 200));

    // le personnage épelle MAËLLE en boucle
    const epel = window.LSFMoteur.epeler('maelle');
    const R = st.reglages;
    const L = new window.LSFMoteur.Lecteur(main.querySelector('#scene-heros'), { vitesse: R.vitesse * 0.85, miroir: R.miroir, trajectoire: R.trajectoires });
    app().suivre(L);
    if (epel.images.length) {
      L.charger(epel);
      const spans = main.querySelectorAll('#prenom span');
      // index de la lettre courante : chaque image-clé porte .lettre
      const lettres = epel.images.map((im, i) => ({ i, l: im.lettre }));
      const debutLettre = []; let prec = null, n = -1;
      lettres.forEach((x) => { if (x.i === 0 || epel.images[x.i].pause) { n++; } debutLettre.push(n); prec = x.l; });
      void prec;
      L.surChangement((info) => {
        const k = Math.min(info.k, debutLettre.length - 1);
        const cur = debutLettre[k] == null ? 0 : debutLettre[k];
        spans.forEach((s, i) => { s.classList.toggle('actif', i === cur); s.classList.toggle('fait', i < cur); });
      });
    }
    const L2 = new window.LSFMoteur.Lecteur(main.querySelector('#scene-jour'), { vitesse: R.vitesse, miroir: R.miroir, trajectoire: R.trajectoires });
    L2.charger(sj); app().suivre(L2);

    main.querySelector('#rr').addEventListener('submit', (e) => {
      e.preventDefault();
      const q = main.querySelector('#rr-q').value.trim();
      location.hash = '#/decouvrir' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
    main.querySelector('#fav-jour').addEventListener('click', (e) => {
      const on = S().basculer('favoris', sj.id);
      const b = e.currentTarget;
      b.setAttribute('aria-pressed', String(on));
      b.innerHTML = (on ? I.coeurPlein : I.coeur) + '<span>Favori</span>';
    });
  }

  /* =============== DÉCOUVRIR =============== */
  const PAR_PAGE = 48;
  function decouvrir(main, params) {
    const st = S().etat;
    let q = params.q || '';
    let theme = params.theme || '';
    let niveau = params.niveau || '';
    let cfg = '';
    let mains = '';      // '' toutes, '1' une main, '2' deux mains
    let surs = false;    // seulement les signes vérifiés (pas « à vérifier »)
    let limite = PAR_PAGE;
    const deuxMains = (s) => !!s.sym || (s.images || []).some((im) => im.nd && im.nd.at !== 'repos');
    const themes = Object.entries(window.LSF.themes).filter(([k]) => window.LSF.signes.some((s) => s.theme === k));
    const cfgs = {};
    window.LSF.signes.forEach((s) => { const c = s.images[0] && s.images[0].d && s.images[0].d.cfg; if (typeof c === 'string') cfgs[c] = (cfgs[c] || 0) + 1; });
    const cfgListe = Object.keys(cfgs).sort((a, b) => cfgs[b] - cfgs[a]);

    main.innerHTML = `
    <div class="page apparait">
      ${U.banniere(I.loupe, 'Dictionnaire', 'Découvrir', 'Tous les signes du site. Passe la souris sur un signe pour le voir bouger, ou ouvre sa fiche.', `<button class="btn btn-principal" id="hasard">${I.de}Surprends-moi</button>`, '探')}
      <form class="recherche" role="search" id="f-rech">
        ${I.loupe}
        <label class="sr" for="q">Chercher un signe</label>
        <input id="q" type="search" placeholder="${esc(T.recherche_placeholder)}" value="${esc(q)}" autocomplete="off" spellcheck="false">
        <button type="button" class="effacer" id="effacer" aria-label="Effacer la recherche" ${q ? '' : 'hidden'}>${I.croix}</button>
      </form>
      <div class="recentes" id="recentes"></div>
      <div class="filtres-barre">
        <button type="button" class="btn btn-filtres" id="ouvrir-filtres" aria-expanded="false" aria-controls="panneau-filtres">${I.reglage}<span>Filtres</span><b class="filtres-nb" id="filtres-nb" hidden></b></button>
        <div class="filtres-actifs" id="filtres-actifs" aria-live="polite"></div>
      </div>
      <div class="filtres-fond" id="fond-filtres" hidden></div>
      <div class="filtres-panneau" id="panneau-filtres" role="dialog" aria-modal="true" aria-labelledby="titre-filtres" tabindex="-1" hidden>
        <div class="fp-tete">
          <div><h2 id="titre-filtres">Filtres</h2><p class="texte-doux petit" id="fp-resume"></p></div>
          <button type="button" class="fp-fermer" id="croix-filtres" aria-label="Fermer les filtres">${I.croix}</button>
        </div>
        <div class="fp-corps">
        <div class="fp-bloc"><h3>Thème</h3>
          <div class="fp-puces" role="group" aria-label="Filtrer par thème">
            <button class="puce" data-theme="" aria-pressed="${!theme}">Tous</button>
            ${themes.map(([k, t]) => `<button class="puce" style="--h:${t.teinte}" data-theme="${k}" aria-pressed="${theme === k}"><span class="pt"></span>${esc(t.nom)}</button>`).join('')}
          </div></div>
        <div class="fp-ligne">
          <div class="fp-bloc"><h3>Niveau</h3>
            <div class="onglets-seg" role="group" aria-label="Niveau">
              <button data-niveau="" aria-pressed="${!niveau}">Tous</button>
              <button data-niveau="1" aria-pressed="${niveau === '1'}">Débutant</button>
              <button data-niveau="2" aria-pressed="${niveau === '2'}">Intermédiaire</button>
              <button data-niveau="3" aria-pressed="${niveau === '3'}">Avancé</button>
            </div></div>
          <div class="fp-bloc"><h3>Mains</h3>
            <div class="onglets-seg" role="group" aria-label="Nombre de mains">
              <button data-mains="" aria-pressed="true">Toutes</button>
              <button data-mains="1" aria-pressed="false">Une main</button>
              <button data-mains="2" aria-pressed="false">Deux mains</button>
            </div></div>
          <div class="fp-bloc"><h3>Fiabilité</h3>
            <label class="fp-interrupteur"><span class="interrupteur"><input type="checkbox" id="surs"><span></span></span>Cacher les signes « à vérifier »</label></div>
        </div>
        <div class="fp-bloc"><h3>Forme de la main</h3>
          <div class="fp-puces" role="group" aria-label="Forme de la main">
            <button class="puce" data-cfg="" aria-pressed="true">Toutes</button>
            ${cfgListe.map((c) => `<button class="puce" data-cfg="${esc(c)}" aria-pressed="false">${esc(U.nomCfg(c))} <small>${cfgs[c]}</small></button>`).join('')}
          </div></div>
        </div>
        <div class="fp-pied">
          <button type="button" class="btn btn-fantome" id="reset-filtres">Tout effacer</button>
          <button type="button" class="btn btn-principal" id="fermer-filtres">Voir les signes</button>
        </div>
      </div>
      <p class="compte" id="compte" aria-live="polite"></p>
      <div class="grille cascade" id="grille"></div>
      <div class="plus-resultats" id="plus"></div>
    </div>`;

    const $ = (s) => main.querySelector(s);
    const input = $('#q');
    function recentes() {
      const r = st.recherches;
      $('#recentes').innerHTML = r.length && !input.value ? 'Récemment : ' + r.map((x) => `<button type="button" data-r="${esc(x)}">${esc(x)}</button>`).join('') : '';
    }
    function majUrl() {
      const p = new URLSearchParams();
      if (q) p.set('q', q); if (theme) p.set('theme', theme); if (niveau) p.set('niveau', niveau);
      const h = '#/decouvrir' + (p.toString() ? '?' + p : '');
      if (location.hash !== h) history.replaceState(null, '', h);
    }
    // ajout : nombre de tuiles déjà affichées → on ajoute seulement les nouvelles, sans recréer (ni réanimer) les anciennes
    function rendre(ajout) {
      let liste = window.LSFRecherche.chercher(q);
      if (!q) {
        const rang = (s) => (s.theme === 'alphabet' ? 2 : s.theme === 'nombres' ? 1 : 0);
        liste.sort((a, b) => rang(a) - rang(b) || a.mot.localeCompare(b.mot, 'fr', { numeric: true }));
      }
      if (theme) liste = liste.filter((s) => s.theme === theme);
      if (niveau) liste = liste.filter((s) => String(s.niveau) === niveau);
      if (cfg) liste = liste.filter((s) => s.images.some((im) => im.d && im.d.cfg === cfg));
      if (mains) liste = liste.filter((s) => deuxMains(s) === (mains === '2'));
      if (surs) liste = liste.filter((s) => s.fiable !== 'incertain');
      majFiltres(liste.length);
      $('#compte').textContent = liste.length ? `${liste.length} signe${liste.length > 1 ? 's' : ''}` : '';
      const g = $('#grille');
      if (!liste.length) {
        g.innerHTML = `<div class="vide" style="grid-column:1/-1"><strong>Aucun signe trouvé</strong>${esc(T.recherche_vide)}</div>`;
        $('#plus').innerHTML = '';
        return;
      }
      if (typeof ajout === 'number' && ajout > 0) g.insertAdjacentHTML('beforeend', liste.slice(ajout, limite).map((s) => U.tuile(s)).join(''));
      else g.innerHTML = liste.slice(0, limite).map((s) => U.tuile(s)).join('');
      U.activerTuiles(g);
      $('#plus').innerHTML = liste.length > limite ? `<button class="btn btn-fantome" id="voir-plus">Voir plus de signes (${liste.length - limite})</button>` : '';
      const vp = $('#voir-plus');
      if (vp) vp.addEventListener('click', () => { const deja = g.querySelectorAll('.tuile').length; limite = deja + PAR_PAGE; rendre(deja); });
      majUrl();
    }
    let minuteur;
    app().nettoyer(() => clearTimeout(minuteur));
    input.addEventListener('input', () => {
      q = input.value; limite = PAR_PAGE;
      $('#effacer').hidden = !q;
      recentes();
      clearTimeout(minuteur); minuteur = setTimeout(rendre, 120);
    });
    $('#f-rech').addEventListener('submit', (e) => {
      e.preventDefault();
      S().noterRecherche(input.value);
      const r = window.LSFRecherche.chercher(input.value);
      if (r.length === 1 || (r[0] && window.LSFRecherche.norm(r[0].mot) === window.LSFRecherche.norm(input.value))) location.hash = '#/signe/' + r[0].id;
    });
    input.addEventListener('blur', () => { if (input.value.trim().length > 1 && window.LSFRecherche.chercher(input.value).length) S().noterRecherche(input.value); });
    $('#effacer').addEventListener('click', () => { input.value = ''; q = ''; $('#effacer').hidden = true; recentes(); rendre(); input.focus(); });
    $('#recentes').addEventListener('click', (e) => { const b = e.target.closest('[data-r]'); if (b) { input.value = b.dataset.r; q = b.dataset.r; $('#effacer').hidden = false; recentes(); rendre(); } });
    // ---- panneau de filtres : un bouton « Filtres » ouvre tous les choix ; les filtres actifs restent visibles en étiquettes ----
    const panneau = $('#panneau-filtres'), bFiltres = $('#ouvrir-filtres');
    // le panneau s'ouvre par-dessus la page (fenêtre à droite sur ordinateur, tiroir du bas sur téléphone)
    const fond = $('#fond-filtres');
    let fermeture = null;
    const ouvrirFiltres = (ouvert) => {
      clearTimeout(fermeture);
      bFiltres.setAttribute('aria-expanded', String(ouvert));
      document.documentElement.classList.toggle('filtres-ouverts', ouvert);
      if (ouvert) {
        panneau.hidden = false; fond.hidden = false; panneau.classList.remove('sort'); fond.classList.remove('sort');
        const premier = panneau.querySelector('.fp-corps button[aria-pressed="true"]');
        setTimeout(() => (premier || panneau).focus({ preventScroll: true }), 60);
      } else if (!panneau.hidden) {
        // petite animation de sortie, puis on cache
        panneau.classList.add('sort'); fond.classList.add('sort');
        fermeture = setTimeout(() => { panneau.hidden = true; fond.hidden = true; panneau.classList.remove('sort'); fond.classList.remove('sort'); }, S().mouvementReduit() ? 0 : 220);
      }
    };
    bFiltres.addEventListener('click', () => ouvrirFiltres(bFiltres.getAttribute('aria-expanded') !== 'true'));
    fond.addEventListener('click', () => ouvrirFiltres(false));
    $('#croix-filtres').addEventListener('click', () => { ouvrirFiltres(false); bFiltres.focus(); });
    $('#fermer-filtres').addEventListener('click', () => { ouvrirFiltres(false); $('#compte').scrollIntoView({ behavior: S().mouvementReduit() ? 'auto' : 'smooth', block: 'center' }); });
    app().nettoyer(() => { clearTimeout(fermeture); document.documentElement.classList.remove('filtres-ouverts'); });
    const marquer = (attr, val) => main.querySelectorAll(`[${attr}]`).forEach((x) => x.setAttribute('aria-pressed', String(x.getAttribute(attr) === val)));
    function majFiltres(n) {
      const actifs = [];
      if (theme && window.LSF.themes[theme]) actifs.push(['theme', window.LSF.themes[theme].nom]);
      if (niveau) actifs.push(['niveau', ['', 'Débutant', 'Intermédiaire', 'Avancé'][+niveau] || niveau]);
      if (mains) actifs.push(['mains', mains === '2' ? 'Deux mains' : 'Une main']);
      if (cfg) actifs.push(['cfg', U.nomCfg(cfg)]);
      if (surs) actifs.push(['surs', 'Signes vérifiés']);
      const nb = $('#filtres-nb'); nb.hidden = !actifs.length; nb.textContent = actifs.length;
      $('#filtres-actifs').innerHTML = actifs.map(([k, t]) => `<button type="button" class="filtre-actif" data-retirer="${k}" aria-label="Retirer le filtre ${esc(t)}">${esc(t)}<span aria-hidden="true">×</span></button>`).join('') +
        (actifs.length > 1 ? '<button type="button" class="filtre-effacer" data-retirer="tout">Tout effacer</button>' : '');
      $('#fermer-filtres').textContent = n ? `Voir les ${n} signe${n > 1 ? 's' : ''}` : 'Aucun signe';
      $('#fp-resume').textContent = (n ? n + ' signe' + (n > 1 ? 's' : '') : 'Aucun signe') + (actifs.length ? ' · ' + actifs.length + ' filtre' + (actifs.length > 1 ? 's' : '') + ' actif' + (actifs.length > 1 ? 's' : '') : '');
    }
    function retirer(k) {
      if (k === 'theme' || k === 'tout') { theme = ''; marquer('data-theme', ''); }
      if (k === 'niveau' || k === 'tout') { niveau = ''; marquer('data-niveau', ''); }
      if (k === 'mains' || k === 'tout') { mains = ''; marquer('data-mains', ''); }
      if (k === 'cfg' || k === 'tout') { cfg = ''; marquer('data-cfg', ''); }
      if (k === 'surs' || k === 'tout') { surs = false; $('#surs').checked = false; }
      limite = PAR_PAGE; rendre();
    }
    $('#filtres-actifs').addEventListener('click', (e) => { const b = e.target.closest('[data-retirer]'); if (b) retirer(b.dataset.retirer); });
    $('#reset-filtres').addEventListener('click', () => retirer('tout'));
    panneau.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.theme !== undefined) { theme = b.dataset.theme; marquer('data-theme', theme); }
      else if (b.dataset.niveau !== undefined) { niveau = b.dataset.niveau; marquer('data-niveau', niveau); }
      else if (b.dataset.mains !== undefined) { mains = b.dataset.mains; marquer('data-mains', mains); }
      else if (b.dataset.cfg !== undefined) { cfg = b.dataset.cfg; marquer('data-cfg', cfg); }
      else return;
      limite = PAR_PAGE; rendre();
    });
    $('#surs').addEventListener('change', (e) => { surs = e.target.checked; limite = PAR_PAGE; rendre(); });
    const echap = (e) => { if (e.key === 'Escape' && !panneau.hidden) { ouvrirFiltres(false); bFiltres.focus(); } };
    document.addEventListener('keydown', echap);
    app().nettoyer(() => document.removeEventListener('keydown', echap));
    $('#hasard').addEventListener('click', () => { const s = U.hasard(window.LSF.signes); location.hash = '#/signe/' + s.id; });
    recentes();
    rendre();
    if (!params.theme && window.matchMedia('(hover: hover)').matches) input.focus();
  }

  /* =============== FICHE SIGNE =============== */
  function fiche(main, params) {
    const s = window.LSF.parId[params.id];
    if (!s) { main.innerHTML = `<div class="page apparait"><div class="vide"><strong>Signe introuvable</strong><a href="#/decouvrir">Retourner au dictionnaire</a></div></div>`; return; }
    const st = S().etat;
    S().vu(s.id); S().sauver();
    const th = window.LSF.themes[s.theme] || { nom: s.theme, teinte: 260 };
    const r = U.resumeSigne(s);
    const memes = window.LSF.signes.filter((x) => x.theme === s.theme).sort((a, b) => a.mot.localeCompare(b.mot, 'fr', { numeric: true }));
    const i = memes.indexOf(s);
    const prec = memes[(i - 1 + memes.length) % memes.length], suiv = memes[(i + 1) % memes.length];
    const lies = U.melangerListe(memes.filter((x) => x !== s)).slice(0, 6);
    const fav = st.favoris.includes(s.id), diff = st.difficiles.includes(s.id);
    const niv = ['', 'Débutant', 'Intermédiaire', 'Avancé'][s.niveau] || '';
    main.innerHTML = `
    <div class="page apparait">
      <nav class="fil" aria-label="Fil d'Ariane"><a href="#/decouvrir">Découvrir</a><span aria-hidden="true">/</span><a href="#/decouvrir?theme=${esc(s.theme)}">${esc(th.nom)}</a></nav>
      <div class="fiche">
        <div class="fiche-scene" id="lecteur"></div>
        <div class="panneau fiche-info">
          <span class="onglet">Fiche du signe</span>
          <h1>${esc(s.mot)}</h1>
          <div class="meta" style="--h:${th.teinte}"><span class="m-theme">${esc(th.nom)}</span><span>${niv}</span>${S().estAppris(s.id) ? '<span>Appris</span>' : ''}</div>
          <p class="desc">${esc(s.desc || '')}</p>
          ${s.astuce ? `<p class="astuce"><strong>Astuce : </strong>${esc(s.astuce)}</p>` : ''}
          ${s.fiable === 'incertain' ? `<p class="incertain">Ce dessin n'a pas pu être vérifié avec une source claire. Compare-le avec la vidéo Elix avant de l'apprendre par cœur.</p>` : ''}
          <dl class="params">
            <div><dt>Mains</dt><dd>${esc(r.mains)}</dd></div>
            <div><dt>Configuration</dt><dd>${esc(r.configuration)}</dd></div>
            <div><dt>Emplacement</dt><dd>${esc(r.emplacement)}</dd></div>
            <div><dt>Mouvement</dt><dd>${esc(r.mouvement)}</dd></div>
            ${s.syn && s.syn.length ? `<div><dt>Aussi pour</dt><dd>${s.syn.map(esc).join(', ')}</dd></div>` : ''}
          </dl>
          <div class="fiche-actions">
            <button class="btn bascule-fav" id="fav" aria-pressed="${fav}">${fav ? I.coeurPlein : I.coeur}<span>${fav ? 'Favori' : 'Ajouter aux favoris'}</span></button>
            <button class="btn bascule-diff" id="diff" aria-pressed="${diff}">${I.drapeau}<span>${diff ? 'Marqué difficile' : 'Marquer difficile'}</span></button>
            <a class="btn btn-fantome" href="${esc(U.urlElix(s))}" target="_blank" rel="noopener noreferrer">${I.lien}${esc(T.verifier_elix)}</a>
          </div>
          <p class="avertissement">${I.info}<span>${esc(T.avertissement_dessins)}${s.source && /^https?:\/\//.test(s.source) ? ` <a href="${esc(s.source)}" target="_blank" rel="noopener noreferrer">Source de la description</a>.` : ''}</span></p>
          <p class="raccourcis"><kbd>Espace</kbd> lecture / pause, <kbd>R</kbd> rejouer, <kbd>←</kbd> <kbd>→</kbd> signe précédent / suivant</p>
          <div class="voisins">
            <a class="btn btn-fantome" href="#/signe/${esc(prec.id)}">${I.prec}${esc(prec.mot)}</a>
            <a class="btn btn-fantome" href="#/signe/${esc(suiv.id)}">${esc(suiv.mot)}${I.suiv}</a>
          </div>
        </div>
      </div>
      ${lies.length ? `<section class="section"><div class="section-tete"><h2>Dans le même thème</h2><a href="#/decouvrir?theme=${esc(s.theme)}">Tout le thème</a></div><div class="grille cascade" id="lies">${lies.map((x) => U.tuile(x)).join('')}</div></section>` : ''}
    </div>`;
    const L = U.lecteurComplet(main.querySelector('#lecteur'), s);
    app().suivre(L);
    const lg = main.querySelector('#lies'); if (lg) U.activerTuiles(lg);
    main.querySelector('#fav').addEventListener('click', (e) => {
      const on = S().basculer('favoris', s.id); const b = e.currentTarget;
      b.setAttribute('aria-pressed', String(on)); b.innerHTML = (on ? I.coeurPlein : I.coeur) + `<span>${on ? 'Favori' : 'Ajouter aux favoris'}</span>`;
    });
    main.querySelector('#diff').addEventListener('click', (e) => {
      const on = S().basculer('difficiles', s.id); const b = e.currentTarget;
      b.setAttribute('aria-pressed', String(on)); b.innerHTML = I.drapeau + `<span>${on ? 'Marqué difficile' : 'Marquer difficile'}</span>`;
    });
    app().clavier((e) => {
      if (e.key === ' ') { e.preventDefault(); L.basculer(); }
      else if (e.key === 'r' || e.key === 'R') L.rejouer();
      else if (e.key === 'ArrowLeft') location.hash = '#/signe/' + prec.id;
      else if (e.key === 'ArrowRight') location.hash = '#/signe/' + suiv.id;
    });
  }

  /* =============== APPRENDRE =============== */
  function apprendre(main) {
    const niveaux = window.LSFLecons.etat();
    main.innerHTML = `
    <div class="page apparait">
      ${U.banniere(I.livre, 'Parcours de leçons', 'Apprendre', 'Chaque leçon te montre quelques signes, puis un petit quiz vérifie que tu les as retenus. Finis une leçon pour débloquer la suivante.', (() => {
        const nv = window.LSFLecons.etat(); const faites = nv.reduce((a, n) => a + n.faites, 0), total = nv.reduce((a, n) => a + n.total, 0) || 1;
        const p = window.LSFLecons.prochaine();
        return `<div class="banniere-compteur"><b>${faites}<small>/${total}</small></b><span>leçons finies</span><i style="--p:${(faites / total) * 100}%"></i></div>` +
          (p ? `<a class="btn btn-principal" href="#/lecon/${esc(p.id)}">${I.play}Continuer</a>` : '');
      })(), '学')}
      <div class="niveaux">
      ${niveaux.map((nv, i) => `
        <section class="panneau niveau" aria-labelledby="nv-${nv.n}">
          <span class="onglet ${i === 0 ? '' : i === 1 ? 'menthe' : 'or'}">Niveau ${nv.n}</span>
          <div class="niveau-tete">
            <h2 id="nv-${nv.n}">${esc(nv.nom)}</h2>
            <div class="niveau-jauge" aria-hidden="true"><span style="width:${nv.total ? (nv.faites / nv.total) * 100 : 0}%"></span></div>
            <span class="niveau-chiffre">${nv.faites} / ${nv.total} leçons</span>
            <p>${esc(T.niveau_desc[i] || '')}</p>
          </div>
          ${!nv.ouvert ? `<p class="niveau-verrou">Termine au moins 60 % des leçons du niveau précédent pour ouvrir ce niveau.</p>` : ''}
          ${nv.total ? `<div class="chemin cascade">${nv.lecons.map((l, j) => `
            <a class="lecon inclinable incl-doux ${l.fini ? 'faite' : ''} ${l.actuelle ? 'actuelle' : ''} ${!l.dispo ? 'verrou' : ''}" href="#/lecon/${esc(l.id)}" ${!l.dispo ? 'aria-disabled="true" tabindex="-1"' : ''}>
              <span class="lecon-num">${l.fini ? I.coche : !l.dispo ? I.cadenas : j + 1}</span>
              <span><span class="lecon-titre">${esc(l.titre)}</span>
              <span class="lecon-info">${l.signes.length} signes${l.fini ? U.etoiles(l.etoiles) : l.actuelle ? ', à faire maintenant' : ''}</span></span>
            </a>`).join('')}</div>` : '<p class="texte-doux">Pas encore de leçon à ce niveau.</p>'}
        </section>`).join('')}
      </div>
    </div>`;
  }

  /* =============== LEÇON =============== */
  function lecon(main, params) {
    const P = window.LSFLecons.parcours();
    const l = P.parId[params.id];
    if (!l || !window.LSFLecons.disponible(l.id)) { location.hash = '#/apprendre'; return; }
    const signes = l.signes.map((id) => window.LSF.parId[id]).filter(Boolean);
    let i = 0;
    const total = signes.length * 2; // découverte + quiz
    main.innerHTML = `
    <div class="page apparait"><div class="atelier">
      <div class="atelier-tete">
        <a class="btn btn-icone btn-fantome" href="#/apprendre" aria-label="Quitter la leçon">${I.croix}</a>
        <div class="avance" role="progressbar" aria-label="Progression de la leçon" aria-valuemin="0" aria-valuemax="100"><span style="width:0"></span></div>
      </div>
      <div id="zone"></div>
    </div></div>`;
    const zone = main.querySelector('#zone');
    const barre = main.querySelector('.avance');
    const avancer = (n) => { const pc = Math.round((n / total) * 100); barre.firstElementChild.style.width = pc + '%'; barre.setAttribute('aria-valuenow', pc); };
    let L = null;
    function etape() {
      if (L) { L.detruire(); L = null; }
      if (i >= signes.length) return quiz();
      const s = signes[i];
      avancer(i);
      S().vu(s.id);
      zone.innerHTML = `
        <div class="etape-carte">
          <div id="lect"></div>
          <div class="panneau verre">
            <span class="onglet">Signe ${i + 1} sur ${signes.length}</span>
            <span class="etiquette">${esc((window.LSF.themes[s.theme] || {}).nom || '')}</span>
            <h2>${esc(s.mot)}</h2>
            <p class="desc">${esc(s.desc || '')}</p>
            ${s.astuce ? `<p class="astuce"><strong>Astuce : </strong>${esc(s.astuce)}</p>` : ''}
            <p class="texte-doux petit" style="margin-top:14px">Imite le personnage avec ta main droite (ou gauche si tu es gauchère : active le miroir).</p>
          </div>
        </div>
        <div class="etape-pied">
          ${i > 0 ? `<button class="btn btn-fantome" id="avant">${I.prec}Précédent</button>` : ''}
          <button class="btn btn-principal btn-grand" id="ok">${i === signes.length - 1 ? 'Passer au quiz' : 'Signe suivant'}</button>
        </div>`;
      L = U.lecteurComplet(zone.querySelector('#lect'), s);
      app().suivre(L);
      zone.querySelector('#ok').addEventListener('click', () => { i++; etape(); });
      const av = zone.querySelector('#avant'); if (av) av.addEventListener('click', () => { i--; etape(); });
      zone.querySelector('#ok').focus();
    }
    function quiz() {
      window.LSFPratique.quiz(zone, {
        signes, nb: signes.length, avance: (k) => avancer(signes.length + k),
        fin: (bonnes, nb) => {
          avancer(total);
          const etoiles = window.LSFLecons.terminer(l.id, bonnes, nb);
          const xp = etoiles ? 20 + bonnes * 3 : bonnes * 2;
          S().ajouterXP(xp); S().noterActivite(2);
          if (bonnes === nb) S().etat.quizParfaits++;
          const nouveaux = S().verifierBadges(); S().sauver();
          const suite = window.LSFLecons.prochaine();
          zone.innerHTML = `
            <div class="resultat verre">
              <div class="grosses-etoiles">${[1, 2, 3].map((k) => I.etoile.replace('<svg', `<svg class="${k <= etoiles ? 'on' : ''}"`)).join('')}</div>
              <h2>${!etoiles ? 'Presque !' : bonnes === nb ? 'Sans faute !' : bonnes >= nb * 0.7 ? 'Très bien !' : 'Leçon terminée'}</h2>
              <p class="texte-doux">${bonnes} bonne${bonnes > 1 ? 's' : ''} réponse${bonnes > 1 ? 's' : ''} sur ${nb}.${!etoiles ? ' Il en faut au moins la moitié pour valider la leçon : refais-la tranquillement.' : ''}</p>
              <div class="gain-xp">+${xp} XP</div>
              <div class="heros-actions" style="justify-content:center">
                ${suite && etoiles ? `<a class="btn btn-principal btn-grand" href="#/lecon/${esc(suite.id)}">Leçon suivante</a>` : ''}
                <button class="btn ${etoiles ? 'btn-fantome' : 'btn-principal'} btn-grand" id="refaire">Refaire la leçon</button>
                <a class="btn btn-fantome btn-grand" href="#/apprendre">Retour au parcours</a>
              </div>
            </div>`;
          zone.querySelector('#refaire').addEventListener('click', () => app().aller());
          U.annoncerBadges(nouveaux);
          app().majStatut();
        }
      });
    }
    etape();
  }

  /* =============== PROGRÈS =============== */
  function progres(main) {
    const st = S().etat;
    const niveaux = window.LSFLecons.etat();
    const appris = S().nbAppris();
    const leconsFinies = Object.values(st.lecons).filter((l) => l.fini).length;
    const themes = Object.entries(window.LSF.themes).map(([k, t]) => {
      const l = window.LSF.signes.filter((s) => s.theme === k);
      return { k, t, total: l.length, ok: l.filter((s) => S().estAppris(s.id)).length };
    }).filter((x) => x.total);
    // calendrier : 18 semaines
    const auj = new Date(); auj.setHours(12);
    const debut = new Date(auj); debut.setDate(debut.getDate() - (17 * 7 + ((auj.getDay() + 6) % 7)));
    const cases = [];
    for (let d = new Date(debut); d <= auj; d.setDate(d.getDate() + 1)) {
      const j = S().jour(d); const n = st.activite[j] || 0;
      cases.push(`<i data-n="${n === 0 ? 0 : n < 5 ? 1 : n < 15 ? 2 : 3}" class="${j === S().jour() ? 'auj' : ''}" title="${j} : ${n} activité${n > 1 ? 's' : ''}"></i>`);
    }
    main.innerHTML = `
    <div class="page apparait">
      ${U.banniere(I.graphe, 'Statistiques', 'Tes progrès', "Un signe compte comme appris dès que tu le reconnais dans un quiz. Il est maîtrisé quand tu l'as reconnu plusieurs fois, à quelques jours d'écart.", `<div class="banniere-compteur"><b>${st.xp}</b><span>points d'expérience</span></div>`, '進')}
      <div class="chiffres cascade">
        <div class="inclinable incl-doux chiffre c-signes"><b>${appris}</b><span>signes appris sur ${window.LSF.signes.length}</span></div>
        <div class="inclinable incl-doux chiffre c-serie"><b>${S().serieActuelle()}</b><span>jours de suite (record ${st.serie.record})</span></div>
        <div class="inclinable incl-doux chiffre c-xp"><b>${st.xp}</b><span>points d'expérience</span></div>
        <div class="chiffre inclinable incl-doux"><b>${leconsFinies}</b><span>leçons terminées</span></div>
      </div>
      <div class="deux-col section">
        <section class="panneau">
          <span class="onglet menthe">Parcours</span>
          <h2 style="margin-bottom:16px">Par niveau</h2>
          <div class="barres">${niveaux.map((nv) => `<div class="barre-niveau"><div><strong>${esc(nv.nom)}</strong><span class="texte-doux">${nv.faites} / ${nv.total} leçons</span></div><div class="jauge"><span style="width:${nv.total ? (nv.faites / nv.total) * 100 : 0}%"></span></div></div>`).join('')}</div>
          <h2 style="margin:36px 0 14px">Ton activité</h2>
          <div class="calendrier" aria-label="Calendrier d'activité des 18 dernières semaines">${cases.join('')}</div>
          <div class="legende-cal">Moins <i style="background:rgba(255,255,255,.06)"></i><i style="background:rgba(255,158,198,.35)"></i><i style="background:rgba(255,158,198,.65)"></i><i style="background:var(--sakura)"></i> Plus</div>
        </section>
        <section class="panneau">
          <span class="onglet">Thèmes</span>
          <h2 style="margin-bottom:16px">Par thème</h2>
          <div class="themes-progres">${themes.map((x) => `<a class="theme-ligne" style="--h:${x.t.teinte};color:inherit;text-decoration:none" href="#/decouvrir?theme=${x.k}"><span>${esc(x.t.nom)}</span><span class="jauge"><span style="width:${(x.ok / x.total) * 100}%"></span></span><em>${x.ok}/${x.total}</em></a>`).join('')}</div>
        </section>
      </div>
      <section class="section">
        <div class="section-tete"><h2>Badges</h2><span class="texte-doux">${Object.keys(st.badges).length} sur ${window.LSFContenu.BADGES.length}</span></div>
        <div class="badges cascade">${window.LSFContenu.BADGES.map((b) => `<div class="badge inclinable incl-doux ${st.badges[b.id] ? 'gagne' : ''}"><div class="badge-medaille">${I.medaille}</div><div><strong>${esc(b.nom)}</strong><span>${esc(b.desc)}</span></div></div>`).join('')}</div>
      </section>
      <section class="section">
        <div class="section-tete"><h2>Personnages secrets</h2><span class="texte-doux">${S().SECRETS.filter((id) => S().skinDebloque(id)).length} sur ${S().SECRETS.length}</span></div>
        <div class="secrets">${S().SECRETS.map((id) => {
          const p = S().PERSOS[id], ok = S().skinDebloque(id), choisi = S().etat.reglages.perso === id;
          const pc = Math.min(100, (st.xp / p.xp) * 100);
          return `<div class="secret inclinable incl-doux ${ok ? 'ouvert' : 'ferme'}">
            <span class="secret-portrait" data-secret="${id}" aria-hidden="true"></span>
            <div class="secret-info">
              <strong>${ok ? esc(p.nom) : '??? Personnage secret'}</strong>
              ${ok ? `<span class="texte-doux petit">Débloqué ! Le personnage peut signer à ta place.</span>
                <button class="btn ${choisi ? 'btn-fantome' : 'btn-principal'}" data-choisir="${id}" ${choisi ? 'disabled' : ''}>${choisi ? 'Personnage actuel' : 'Choisir ce personnage'}</button>`
              : `<span class="texte-doux petit">Débloqué à <b>${p.xp} XP</b> : encore ${p.xp - st.xp} XP.</span>
                <div class="jauge" role="progressbar" aria-valuemin="0" aria-valuemax="${p.xp}" aria-valuenow="${st.xp}"><span style="width:${pc}%"></span></div>`}
            </div>
          </div>`;
        }).join('')}</div>
      </section>
    </div>`;
    // portraits : en couleurs si débloqué, en silhouette sinon
    main.querySelectorAll('[data-secret]').forEach((el) => U.portraitPerso(el, S().PERSOS[el.dataset.secret]));
    main.querySelectorAll('[data-choisir]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.choisir, p = S().PERSOS[id];
      if (!S().skinDebloque(id)) return;
      Object.assign(S().etat.reglages, { perso: id, peau: p.peau, cheveux: p.cheveux, haut: p.haut, coiffure: p.coiffure, noeud: p.noeud, cernes: !!p.cernes, theme: p.theme || null });
      S().sauver(); U.appliquerPersonnage(S().etat.reglages);
      U.toast('Personnage choisi : ' + p.nom);
      app().aller();
    }));
  }

  /* =============== MES SIGNES =============== */
  function mesSignes(main, params) {
    let onglet = ['difficiles', 'phrases'].includes(params.onglet) ? params.onglet : 'favoris';
    main.innerHTML = `
    <div class="page apparait">
      ${U.banniere(I.coeur, 'Ta collection', 'Mes signes', 'Tes favoris, les signes difficiles, et tes phrases : assemble des mots et regarde le personnage enchaîner tous les gestes.', '<div class="onglets-seg" role="group" aria-label="Liste"><button data-o="favoris">Favoris</button><button data-o="difficiles">Difficiles</button><button data-o="phrases">Mes phrases</button></div>', '好')}
      <div id="zone"></div>
    </div>`;
    const zone = main.querySelector('#zone');
    let finPhrases = null;
    function rendre() {
      main.querySelectorAll('[data-o]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.o === onglet)));
      if (finPhrases) { finPhrases(); finPhrases = null; }
      if (onglet === 'phrases') { finPhrases = mesPhrases(zone); return; }
      zone.innerHTML = `<div id="actions" class="heros-actions" style="margin:0 0 20px"></div><div class="grille cascade" id="grille"></div>`;
      const ids = S().etat[onglet].filter((id) => window.LSF.parId[id]);
      const g = zone.querySelector('#grille');
      zone.querySelector('#actions').innerHTML = ids.length >= 2 ? `<a class="btn btn-menthe" href="#/entrainer/cartes?liste=${onglet}">${I.cartes}Réviser ces ${ids.length} signes</a>` : '';
      g.innerHTML = ids.length ? ids.map((id) => U.tuile(window.LSF.parId[id])).join('') :
        `<div class="vide" style="grid-column:1/-1"><strong>${onglet === 'favoris' ? 'Aucun favori' : 'Aucun signe difficile'}</strong>${esc(onglet === 'favoris' ? T.favoris_vide : T.difficiles_vide)}<p style="margin-top:14px"><a class="btn btn-fantome" href="#/decouvrir">Parcourir les signes</a></p></div>`;
      U.activerTuiles(g);
    }
    main.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => { onglet = b.dataset.o; history.replaceState(null, '', '#/mes-signes?onglet=' + onglet); rendre(); }));
    app().nettoyer(() => { if (finPhrases) finPhrases(); });
    rendre();
  }

  /* ---------- Mes phrases : assembler des mots, voir toute la phrase signée d'affilée ---------- */
  const IDEES_PHRASES = [['bonjour', 'ca-va'], ['merci', 'au-revoir'], ['demain', 'aller', 'ecole'], ['maman', 'papa', 'famille'], ['aujourd-hui', 'content'], ['vouloir', 'manger']];
  function mesPhrases(zone) {
    const parId = window.LSF.parId;
    const enregistrees = () => (S().etat.phrases || (S().etat.phrases = []));
    let phrase = [];          // identifiants des signes, dans l'ordre
    let L = null, dernier = -1;
    const gestes = (ids) => ids.reduce((n, id) => { const s = parId[id]; return n + (s ? Math.max(1, (s.images || []).length) * Math.max(1, s.rep || 1) : 0); }, 0);
    const texte = (ids) => ids.map((id) => (parId[id] ? parId[id].mot : '')).join(' — ');
    zone.innerHTML = `
      <div class="phrases">
        <section class="panneau compose"><span class="onglet">Composer</span>
          <h2>Construis ta phrase</h2>
          <p class="texte-doux petit">Cherche un mot et ajoute-le. Range les mots avec les flèches : le personnage enchaîne tous les gestes, dans l'ordre.</p>
          <div class="phrase-bande" id="bande"></div>
          <p class="phrase-compte" id="compte"></p>
          <div class="recherche recherche-petite">
            ${I.loupe || ''}<label class="sr" for="ajout">Ajouter un mot</label>
            <input id="ajout" type="search" placeholder="Ajouter un mot… (ex. bonjour)" autocomplete="off" maxlength="40">
          </div>
          <div class="phrase-sugg" id="sugg" aria-live="polite"></div>
          <div class="heros-actions" style="margin-top:16px">
            <button class="btn btn-principal" id="enregistrer">${I.coeur}<span>Enregistrer la phrase</span></button>
            <button class="btn btn-fantome" id="vider"><span>Tout effacer</span></button>
          </div>
        </section>
        <section class="panneau joue"><span class="onglet menthe">La phrase en signes</span>
          <div class="phrase-sous-titre" id="sous-titre" aria-live="polite"></div>
          <div id="lecteur-phrase"></div>
          <div class="vide" id="lecteur-vide"><strong>Ta phrase est vide</strong>Ajoute au moins un mot pour la voir signée.</div>
        </section>
      </div>
      <section class="section"><div class="section-tete"><h2>Mes phrases enregistrées</h2><span id="nb-phrases"></span></div>
        <div class="phrases-liste" id="liste"></div>
      </section>`;
    const $ = (s) => zone.querySelector(s);
    const bande = $('#bande'), compte = $('#compte'), sugg = $('#sugg'), ajout = $('#ajout'), sousTitre = $('#sous-titre');
    const conteneurLecteur = $('#lecteur-phrase'), lecteurVide = $('#lecteur-vide');

    function motActif(i) {
      bande.querySelectorAll('.mot-puce').forEach((x, j) => x.classList.toggle('actif', j === i));
      sousTitre.querySelectorAll('span').forEach((x, j) => x.classList.toggle('actif', j === i));
    }
    function jouer() {
      const ids = phrase.filter((id) => parId[id]);
      conteneurLecteur.hidden = !ids.length; lecteurVide.hidden = !!ids.length;
      sousTitre.innerHTML = ids.map((id) => `<span>${esc(parId[id].mot)}</span>`).join('<i aria-hidden="true">—</i>');
      if (!ids.length) { if (L) { L.detruire(); L = null; conteneurLecteur.innerHTML = ''; } return; }
      const signe = { id: 'phrase', mot: texte(ids), theme: 'phrase', phrase: ids.map((id) => parId[id]) };
      dernier = -1; // le sous-titre vient d'être redessiné : il faut rallumer le mot en cours
      if (!L) {
        L = U.lecteurComplet(conteneurLecteur, null);
        L.surChangement((info) => {
          const mots = L.tl && L.tl.mots;
          if (!mots) return;
          let i = mots.findIndex((m) => info.t >= m.debut && info.t < m.fin);
          if (i < 0) i = info.t >= L.tl.total ? mots.length - 1 : 0;
          if (i !== dernier) { dernier = i; motActif(i); }
        });
      }
      L.charger(signe);
    }
    function rendreBande() {
      bande.innerHTML = phrase.length ? phrase.map((id, i) => `${i ? '<i class="tiret" aria-hidden="true">—</i>' : ''}<span class="mot-puce">
          <button class="mp-fl" data-g="${i}" aria-label="Déplacer « ${esc(parId[id].mot)} » vers la gauche" ${i === 0 ? 'disabled' : ''}>‹</button>
          <button class="mp-mot" data-voir="${i}" title="Revoir ce mot">${esc(parId[id].mot)}</button>
          <button class="mp-fl" data-d="${i}" aria-label="Déplacer « ${esc(parId[id].mot)} » vers la droite" ${i === phrase.length - 1 ? 'disabled' : ''}>›</button>
          <button class="mp-x" data-x="${i}" aria-label="Retirer « ${esc(parId[id].mot)} »">×</button>
        </span>`).join('') : '<span class="texte-doux petit">Aucun mot pour l\'instant.</span>';
      const n = phrase.length, g = gestes(phrase);
      compte.innerHTML = n ? `<b>${n}</b> mot${n > 1 ? 's' : ''} · <b>${g}</b> geste${g > 1 ? 's' : ''} au total` : '';
      $('#enregistrer').disabled = !n; $('#vider').disabled = !n;
      jouer();
    }
    function rendreSuggestions() {
      const q = ajout.value.trim();
      if (!q) {
        const idees = IDEES_PHRASES.filter((p) => p.every((id) => parId[id]));
        sugg.innerHTML = idees.length ? `<span class="texte-doux petit">Idées :</span>` + idees.map((p, i) => `<button class="puce" data-idee="${i}">${esc(texte(p))}</button>`).join('') : '';
        sugg.dataset.idees = JSON.stringify(idees);
        return;
      }
      const res = window.LSFRecherche.chercher(q).slice(0, 8);
      sugg.innerHTML = res.length ? res.map((s) => `<button class="puce" data-ajout="${esc(s.id)}">+ ${esc(s.mot)}</button>`).join('') : '<span class="texte-doux petit">Aucun signe trouvé pour ce mot.</span>';
    }
    function rendreListe() {
      const liste = enregistrees();
      $('#nb-phrases').textContent = liste.length ? liste.length + ' phrase' + (liste.length > 1 ? 's' : '') : '';
      $('#liste').innerHTML = liste.length ? liste.map((p, i) => {
        const ids = p.filter((id) => parId[id]);
        return `<div class="phrase-carte inclinable incl-doux">
          <p class="phrase-texte">${esc(texte(ids))}</p>
          <p class="texte-doux petit">${ids.length} mot${ids.length > 1 ? 's' : ''} · ${gestes(ids)} gestes</p>
          <div class="phrase-carte-actions"><button class="btn btn-menthe" data-charger="${i}">${I.play}<span>Voir</span></button><button class="btn btn-fantome" data-suppr="${i}"><span>Supprimer</span></button></div>
        </div>`;
      }).join('') : `<div class="vide"><strong>Aucune phrase enregistrée</strong>Compose une phrase plus haut, puis clique sur « Enregistrer la phrase ».</div>`;
    }
    const ajouter = (id) => {
      if (!parId[id]) return;
      if (phrase.length >= 20) { U.toast('20 mots maximum par phrase.'); return; }
      phrase.push(id); ajout.value = ''; rendreSuggestions(); rendreBande(); ajout.focus();
    };
    zone.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !zone.contains(b)) return;
      const d = b.dataset;
      if (d.ajout) ajouter(d.ajout);
      else if (d.idee !== undefined) { phrase = JSON.parse(sugg.dataset.idees || '[]')[+d.idee] || []; phrase = phrase.slice(); rendreBande(); }
      else if (d.g !== undefined) { const i = +d.g; [phrase[i - 1], phrase[i]] = [phrase[i], phrase[i - 1]]; rendreBande(); }
      else if (d.d !== undefined) { const i = +d.d; [phrase[i + 1], phrase[i]] = [phrase[i], phrase[i + 1]]; rendreBande(); }
      else if (d.x !== undefined) { phrase.splice(+d.x, 1); rendreBande(); }
      else if (d.voir !== undefined && L && L.tl && L.tl.mots) { const m = L.tl.mots[+d.voir]; if (m) { L.aller(m.debut / L.tl.total); L.jouer(); } }
      else if (b.id === 'vider') { phrase = []; rendreBande(); }
      else if (b.id === 'enregistrer' && phrase.length) {
        const liste = enregistrees(), cle = phrase.join(' ');
        if (liste.some((p) => p.join(' ') === cle)) { U.toast('Cette phrase est déjà enregistrée.'); return; }
        liste.unshift(phrase.slice()); if (liste.length > 200) liste.length = 200;
        S().sauver(); rendreListe(); U.toast('Phrase enregistrée.');
      }
      else if (d.charger !== undefined) { phrase = (enregistrees()[+d.charger] || []).filter((id) => parId[id]); rendreBande(); zone.querySelector('.joue').scrollIntoView({ behavior: S().mouvementReduit() ? 'auto' : 'smooth', block: 'center' }); }
      else if (d.suppr !== undefined) { enregistrees().splice(+d.suppr, 1); S().sauver(); rendreListe(); U.toast('Phrase supprimée.'); }
    });
    ajout.addEventListener('input', rendreSuggestions);
    ajout.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const premier = sugg.querySelector('[data-ajout]');
      if (premier) ajouter(premier.dataset.ajout);
    });
    rendreSuggestions(); rendreBande(); rendreListe();
    return () => { if (L) { L.detruire(); L = null; } };
  }

  /* =============== CULTURE =============== */
  function mdLeger(txt) {
    const blocs = txt.trim().split(/\n\s*\n/);
    return blocs.map((b) => {
      const lignes = b.split('\n');
      const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      if (lignes.every((l) => /^- /.test(l))) return '<ul>' + lignes.map((l) => `<li>${inline(l.slice(2))}</li>`).join('') + '</ul>';
      if (lignes.every((l) => /^\d+\. /.test(l))) return '<ol>' + lignes.map((l) => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('') + '</ol>';
      return `<p>${inline(b.replace(/\n/g, ' '))}</p>`;
    }).join('');
  }
  function culture(main) {
    const A = window.LSFContenu.CULTURE;
    main.innerHTML = `
    <div class="page apparait">
      ${U.banniere(I.torii, 'À lire', 'Culture sourde', "Apprendre une langue, c'est aussi découvrir les personnes qui la parlent. Quelques repères pour comprendre la LSF et la communauté sourde.", '', '文化')}
      <div class="culture">
        <nav class="sommaire" aria-label="Articles">${A.map((a, i) => `<a href="#/culture?article=${a.id}" data-art="${a.id}" class="${i === 0 ? 'actif' : ''}">${esc(a.titre)}</a>`).join('')}</nav>
        <div>${A.map((a) => `<article class="article-carte" id="art-${a.id}"><span class="onglet ${['', 'menthe', 'or'][A.indexOf(a) % 3]}">${esc(a.onglet || 'Article')}</span><h2>${esc(a.titre)}</h2><p class="chapo">${esc(a.chapo)}</p>${mdLeger(a.corps)}</article>`).join('')}</div>
      </div>
    </div>`;
    main.querySelectorAll('[data-art]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      const cible = main.querySelector('#art-' + a.dataset.art);
      if (cible) cible.scrollIntoView({ behavior: S().mouvementReduit() ? 'auto' : 'smooth' });
    }));
    if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) main.querySelectorAll('[data-art]').forEach((a) => a.classList.toggle('actif', 'art-' + a.dataset.art === e.target.id));
      }), { rootMargin: '-30% 0px -60% 0px' });
      main.querySelectorAll('.article-carte').forEach((a) => o.observe(a));
      app().nettoyer(() => o.disconnect());
    }
  }

  /* =============== RÉGLAGES =============== */
  const PEAUX = ['#F7D9C4', '#F3CDB4', '#E7B08A', '#C98F62', '#9C6644', '#6B4430'];
  const CHEVEUX = ['#3A2420', '#1E1A1D', '#7A4A2A', '#C98F4A', '#E6C27A', '#B0466B'];
  const HAUTS = ['#3E3468', '#26202B', '#F07AAE', '#B23A75', '#E86FA3', '#F5F0F3'];
  const NOEUDS = ['#E0262E', '#FF9EC6', '#FFFFFF', '#26202B'];
  function reglages(main) {
    const R = S().etat.reglages;
    const nuancier = (cle, liste, nom) => `<div class="nuancier" role="group" aria-label="${nom}">${liste.map((c) => `<button style="--c:${c}" data-cle="${cle}" data-c="${c}" aria-pressed="${R[cle].toLowerCase() === c.toLowerCase()}" aria-label="${nom} ${c}"></button>`).join('')}</div>`;
    const inter = (cle, titre, desc) => `<div class="ligne-reglage"><div><strong>${titre}</strong><p>${desc}</p></div><label class="interrupteur"><input type="checkbox" data-b="${cle}" ${R[cle] ? 'checked' : ''} aria-label="${titre}"><span></span></label></div>`;
    main.innerHTML = `
    <div class="page apparait">
      ${U.banniere(I.engrenage, 'Personnaliser', 'Réglages', enLigne() ? 'Tout est enregistré dans ton compte : tu le retrouves sur tous tes appareils.' : 'Tout est enregistré sur cet appareil, dans ce navigateur.', '', '設')}
      <div class="reglages">
        <div>
          <section class="groupe"><span class="onglet">Animations</span><h2>Le personnage bouge</h2>
            <div class="ligne-reglage"><div><strong>Vitesse par défaut</strong><p>Ralentis pour bien voir chaque mouvement.</p></div>
              <div class="vitesse" role="group" aria-label="Vitesse par défaut">${[0.5, 0.75, 1, 1.25].map((v) => `<button data-v="${v}" aria-pressed="${R.vitesse === v}">${String(v).replace('.', ',')}×</button>`).join('')}</div></div>
            <div class="ligne-reglage"><div><strong>Vue par défaut</strong><p>« Mes yeux » montre le signe comme si c'étaient tes propres mains.</p></div>
              <div class="onglets-seg" role="group" aria-label="Vue par défaut"><button data-vue-def="face" aria-pressed="${R.vue !== 'yeux'}">De face</button><button data-vue-def="yeux" aria-pressed="${R.vue === 'yeux'}">Mes yeux</button><button data-vue-def="main" aria-pressed="${R.vue === 'main'}">Ma main</button></div></div>
            ${inter('miroir', 'Mode gaucher', 'Le personnage signe avec sa main gauche, comme dans un miroir.')}
            ${inter('trajectoires', 'Trajectoires', 'Affiche les flèches et les traces de mouvement.')}
            ${inter('fantome', 'Pose finale en transparence', "Montre où la main arrive à la fin du signe.")}
            ${inter('petales', 'Pétales de sakura', "Les pétales qui tombent dans le fond de l'écran.")}
            ${inter('animations', "Animations de l'interface", 'Pages qui glissent, cartes qui apparaissent, boutons qui rebondissent. Coupe-les si ça te gêne.')}
          </section>
          <section class="groupe"><span class="onglet menthe">Personnage</span><h2>Choisis ton personnage</h2>
            <div class="persos" role="group" aria-label="Personnages prêts à l'emploi">
              ${Object.entries(S().PERSOS)
                // du plus courant au plus rare
                .sort(([, a], [, b]) => S().RARETES[a.rarete].ordre - S().RARETES[b.rarete].ordre)
                .map(([id, p]) => {
                  // pas encore débloqué : la carte et la rareté se voient, le personnage reste une silhouette noire
                  if (!S().skinDebloque(id)) {
                    const xp = S().etat.xp, pc = Math.min(100, (xp / p.xp) * 100);
                    return `<button class="perso-carte incl-doux r-${p.rarete} verrouille" data-perso="${id}" aria-disabled="true" aria-label="Personnage ${esc(S().RARETES[p.rarete].nom)} pas encore débloqué : encore ${p.xp - xp} XP">
                <span class="perso-portrait" data-portrait="${id}" aria-hidden="true"></span>
                <span class="perso-cadenas" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>
                <span class="perso-nom">???</span>
                <span class="perso-xp"><b>${Math.min(xp, p.xp)}</b> / ${p.xp} XP</span>
                <span class="jauge perso-jauge" role="progressbar" aria-valuemin="0" aria-valuemax="${p.xp}" aria-valuenow="${xp}"><span style="width:${pc}%"></span></span>
                <span class="perso-rarete">${esc(S().RARETES[p.rarete].nom)}</span>
              </button>`;
                  }
                  return `<button class="perso-carte inclinable incl-doux r-${p.rarete}" data-perso="${id}" aria-pressed="${R.perso === id}">
                <span class="perso-aura" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <span class="perso-portrait" data-portrait="${id}" aria-hidden="true"></span>
                <span class="perso-nom">${esc(p.nom)}</span>${id === 'kiki' ? '<span class="perso-sous">Par défaut</span>' : ''}
                <span class="perso-rarete">${esc(S().RARETES[p.rarete].nom)}</span>
              </button>`;
                }).join('')}
            </div>
            <details class="perso-details" ${R.perso === 'perso' ? 'open' : ''}>
              <summary>Personnaliser les couleurs et la coiffure</summary>
              <div><strong>Peau</strong>${nuancier('peau', PEAUX, 'Couleur de peau')}</div>
              <div><strong>Cheveux</strong>${nuancier('cheveux', CHEVEUX, 'Couleur des cheveux')}</div>
              <div><strong>Vêtement</strong>${nuancier('haut', HAUTS, 'Couleur du vêtement')}</div>
              <div class="ligne-reglage"><div><strong>Coiffure</strong></div>
                <div class="onglets-seg" role="group" aria-label="Coiffure"><button data-coiffure="carre" aria-pressed="${!R.coiffure || R.coiffure === 'carre'}">Carré</button><button data-coiffure="chignon" aria-pressed="${R.coiffure === 'chignon'}">Chignon</button><button data-coiffure="ebouriffe" aria-pressed="${R.coiffure === 'ebouriffe'}">Ébouriffé</button></div></div>
              ${inter('cernes', 'Yeux cernés', 'Grands yeux fixes avec des cernes, comme le personnage L.')}
              <div><strong>Nœud</strong><div class="nuancier" role="group" aria-label="Couleur du nœud">
                <button class="sans-noeud" data-cle="noeud" data-c="aucun" aria-pressed="${R.noeud === 'aucun'}" aria-label="Pas de nœud">✕</button>
                ${NOEUDS.map((c) => `<button style="--c:${c}" data-cle="noeud" data-c="${c}" aria-pressed="${String(R.noeud).toLowerCase() === c.toLowerCase()}" aria-label="Nœud ${c}"></button>`).join('')}</div></div>
            </details>
          </section>
          <section class="groupe" id="compte"><span class="onglet">Compte</span><h2>Ta progression partout</h2>
            ${compteHTML()}
          </section>
          <section class="groupe"><span class="onglet or">Sauvegarde</span><h2>Ta progression</h2>
            <p class="texte-doux petit">${enLigne() ? 'Ta progression est aussi enregistrée dans ton compte. Tu peux quand même en garder une copie ici.' : 'Sans compte, ta progression reste dans ce navigateur. Exporte-la de temps en temps pour ne rien perdre, ou pour la copier sur un autre appareil.'}</p>
            ${S().stockageOk ? '' : '<p class="incertain">Ce navigateur bloque la sauvegarde : ta progression sera perdue en fermant la page. Exporte-la avant de partir.</p>'}
            <div class="heros-actions" style="margin:0">
              <button class="btn btn-menthe" id="exporter">Télécharger ma progression</button>
              <button class="btn btn-fantome" id="copier">Copier le code de sauvegarde</button>
              <button type="button" class="btn btn-fantome" id="choisir-fichier">Importer un fichier</button>
              <input type="file" id="importer" accept=".json,application/json" hidden>
            </div>
            <details class="coller">
              <summary>Restaurer en collant un code de sauvegarde</summary>
              <label class="sr" for="code-sauvegarde">Code de sauvegarde</label>
              <textarea class="champ" id="code-sauvegarde" rows="4" placeholder="Colle ici le code copié depuis un autre appareil"></textarea>
              <button class="btn btn-principal" id="restaurer">Restaurer</button>
            </details>
            <div class="ligne-reglage"><div><strong>Tout effacer</strong><p>Remet la progression à zéro (les réglages restent).</p></div>
              <button class="btn btn-danger" id="reset">Tout effacer</button></div>
          </section>
        </div>
        <aside class="apercu"><div class="scene" id="apercu"></div><p class="texte-doux petit" style="margin-top:10px;text-align:center">Aperçu</p></aside>
      </div>
    </div>`;
    const apercu = new window.LSFMoteur.Lecteur(main.querySelector('#apercu'), { vitesse: R.vitesse, miroir: R.miroir, trajectoire: R.trajectoires, fantome: R.fantome, vue: R.vue });
    app().suivre(apercu);
    const demo = window.LSF.parId.bonjour || window.LSF.parId.merci || window.LSF.signes[0];
    if (demo) apercu.charger(demo);
    const rafraichir = () => { apercu.opts.fantome = R.fantome; apercu.vitesse(R.vitesse); apercu.miroir(R.miroir); apercu.trajectoires(R.trajectoires); apercu.charger(demo); };
    // portraits des personnages : chaque carte a ses propres couleurs (variables CSS locales)
    main.querySelectorAll('[data-portrait]').forEach((el) => U.portraitPerso(el, S().PERSOS[el.dataset.portrait]));
    const redessiner = () => { S().sauver(); U.appliquerPersonnage(R); app().aller(); };
    main.querySelectorAll('[data-perso]').forEach((b) => b.addEventListener('click', () => {
      const p = S().PERSOS[b.dataset.perso];
      if (!S().skinDebloque(b.dataset.perso)) return;
      Object.assign(R, { perso: b.dataset.perso, peau: p.peau, cheveux: p.cheveux, haut: p.haut, coiffure: p.coiffure, noeud: p.noeud, cernes: !!p.cernes, theme: p.theme || null });
      redessiner();
      U.toast('Personnage choisi : ' + p.nom);
    }));
    main.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => {
      R[b.dataset.cle] = b.dataset.c; R.perso = 'perso';
      if (b.dataset.cle === 'noeud') { redessiner(); return; }
      S().sauver(); U.appliquerPersonnage(R);
      main.querySelectorAll(`[data-cle="${b.dataset.cle}"]`).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      main.querySelectorAll('[data-perso]').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    }));
    main.querySelectorAll('[data-coiffure]').forEach((b) => b.addEventListener('click', () => { R.coiffure = b.dataset.coiffure; R.perso = 'perso'; R.theme = null; redessiner(); }));
    main.querySelectorAll('[data-vue-def]').forEach((b) => b.addEventListener('click', () => {
      R.vue = b.dataset.vueDef; S().sauver();
      main.querySelectorAll('[data-vue-def]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      apercu.vue(R.vue);
    }));
    main.querySelectorAll('[data-v]').forEach((b) => b.addEventListener('click', () => {
      R.vitesse = +b.dataset.v; S().sauver(); rafraichir();
      main.querySelectorAll('[data-v]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    }));
    main.querySelectorAll('[data-b]').forEach((c) => c.addEventListener('change', () => {
      R[c.dataset.b] = c.checked; S().sauver();
      if (c.dataset.b === 'petales') { if (window.LSFPetales) window.LSFPetales.activer(c.checked); return; }
      if (c.dataset.b === 'animations') { location.reload(); return; } // tout le site se recharge avec le nouveau réglage
      if (c.dataset.b === 'cernes') { R.perso = 'perso'; R.theme = null; redessiner(); return; }
      rafraichir();
    }));
    main.querySelector('#exporter').addEventListener('click', () => {
      const blob = new Blob([S().exporter()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = `progression-lsf-${S().jour()}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      U.toast(T.export_ok);
    });
    // copie : fonctionne aussi là où les téléchargements sont bloqués
    main.querySelector('#copier').addEventListener('click', () => {
      const code = S().exporter();
      const repli = () => { const z = main.querySelector('#code-sauvegarde'); main.querySelector('.coller').open = true; z.value = code; z.focus(); z.select(); U.toast('Code affiché : copie-le avec Ctrl+C.'); };
      try {
        navigator.clipboard.writeText(code).then(() => U.toast('Code de sauvegarde copié.'), repli);
      } catch (e) { repli(); }
    });
    main.querySelector('#restaurer').addEventListener('click', () => {
      const z = main.querySelector('#code-sauvegarde');
      if (z.value.length < 2e6 && S().importer(z.value)) { U.toast(T.import_ok); U.appliquerPersonnage(S().etat.reglages); app().majStatut(); app().aller(); }
      else U.toast(T.import_erreur);
    });
    main.querySelector('#choisir-fichier').addEventListener('click', () => main.querySelector('#importer').click());
    main.querySelector('#importer').addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (!f) return;
      if (f.size > 2e6) { U.toast(T.import_erreur); return; }
      const lr = new FileReader();
      lr.onload = () => {
        if (S().importer(String(lr.result))) { U.toast(T.import_ok); U.appliquerPersonnage(S().etat.reglages); app().majStatut(); app().aller(); }
        else U.toast(T.import_erreur);
      };
      lr.readAsText(f);
    });
    // confirmation dans la page (pas de fenêtre confirm())
    let armee = null;
    main.querySelector('#reset').addEventListener('click', (e) => {
      const b = e.currentTarget;
      if (!armee) {
        b.textContent = 'Clique encore pour confirmer';
        armee = setTimeout(() => { armee = null; if (b.isConnected) b.textContent = 'Tout effacer'; }, 4000);
        U.toast(T.reset_confirm);
        return;
      }
      clearTimeout(armee); armee = null;
      S().reinitialiser(); app().majStatut(); U.toast('Progression effacée.'); app().aller();
    });
    app().nettoyer(() => clearTimeout(armee));
    brancherCompte(main);
  }

  /* ---------- compte en ligne (voir js/sync.js) ---------- */
  const synchro = () => window.LSFSync;
  const enLigne = () => !!(synchro() && synchro().info.user);
  function compteHTML() {
    const Y = synchro();
    if (!Y || !Y.info.dispo) {
      return `<p class="texte-doux petit">La sauvegarde en ligne n'est pas disponible pour l'instant (pas d'internet, ou site ouvert depuis un fichier). Ta progression reste dans ce navigateur.</p>`;
    }
    if (Y.info.user) {
      return `<p class="texte-doux petit">Connectée avec <strong>${esc(Y.info.user.email || '')}</strong>. Ta progression est enregistrée dans ton compte : connecte-toi avec le même e-mail sur ton téléphone ou un autre ordinateur pour la retrouver.</p>
            <p class="petit compte-statut" data-sync-statut></p>
            <div class="heros-actions" style="margin:0">
              <button type="button" class="btn btn-menthe" id="compte-synchro">Synchroniser maintenant</button>
              <button type="button" class="btn btn-fantome" id="compte-sortir">Se déconnecter</button>
            </div>`;
    }
    return `<p class="texte-doux petit">Crée un compte (ou connecte-toi) pour garder ta progression sur ton téléphone, ta tablette et tes ordinateurs. Elle s'enregistre toute seule.</p>
            <form class="compte-form" id="compte-form" novalidate>
              <label><span>E-mail</span><input class="champ" type="email" id="compte-email" autocomplete="email" inputmode="email" required></label>
              <label><span>Mot de passe <small>(6 caractères minimum)</small></span><input class="champ" type="password" id="compte-mdp" autocomplete="current-password" minlength="6" required></label>
              <p class="compte-erreur" id="compte-erreur" role="alert"></p>
              <div class="heros-actions" style="margin:0">
                <button type="submit" class="btn btn-principal" id="compte-entrer">Se connecter</button>
                <button type="button" class="btn btn-fantome" id="compte-creer">Créer mon compte</button>
                <button type="button" class="btn-lien" id="compte-oubli">Mot de passe oublié ?</button>
              </div>
            </form>`;
  }
  function brancherCompte(main) {
    const Y = synchro();
    if (!Y || !Y.info.dispo) return;
    const q = (s) => main.querySelector(s);
    if (Y.info.user) {
      q('#compte-synchro').addEventListener('click', () => { Y.synchroniser(); U.toast('Synchronisation…'); });
      q('#compte-sortir').addEventListener('click', () => Y.deconnecter().then(() => U.toast('Déconnectée. Ta progression reste aussi sur cet appareil.')));
      Y.afficherStatut();
      return;
    }
    const form = q('#compte-form'), err = q('#compte-erreur');
    const email = q('#compte-email'), mdp = q('#compte-mdp');
    const occupe = (b) => form.querySelectorAll('button').forEach((x) => { x.disabled = b; });
    const lancer = (action, ok) => {
      err.textContent = '';
      occupe(true);
      action().then(() => { if (ok) U.toast(ok); }, (e) => { err.textContent = Y.message(e); occupe(false); });
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); lancer(() => Y.connecter(email.value, mdp.value), 'Connectée ! Ta progression se synchronise.'); });
    q('#compte-creer').addEventListener('click', () => {
      mdp.setAttribute('autocomplete', 'new-password');
      lancer(() => Y.creer(email.value, mdp.value), 'Compte créé ! Ta progression est maintenant enregistrée en ligne.');
    });
    q('#compte-oubli').addEventListener('click', () => {
      if (!email.value.trim()) { err.textContent = 'Écris ton e-mail, puis clique encore sur « Mot de passe oublié ? ».'; email.focus(); return; }
      err.textContent = ''; occupe(true);
      Y.oublie(email.value).then(
        () => { occupe(false); U.toast('E-mail envoyé : ouvre-le pour choisir un nouveau mot de passe.'); },
        (e) => { occupe(false); err.textContent = Y.message(e); });
    });
  }

  window.LSFPages = { accueil, decouvrir, fiche, apprendre, lecon, progres, mesSignes, culture, reglages };
})();
