/* S'entraîner : moteur de quiz (partagé avec les leçons), cartes, défi chrono, révision, dactylologie. */
(function () {
  'use strict';
  const U = window.LSFUI, I = U.I, esc = U.esc, T = window.LSFContenu.TEXTES;
  const S = () => window.LSFStore;
  const app = () => window.LSFApp;
  const R = () => S().etat.reglages;

  function intrus(s, n, pool) {
    pool = pool || window.LSF.signes;
    const memeTheme = U.melangerListe(pool.filter((x) => x.id !== s.id && x.theme === s.theme && x.mot !== s.mot));
    const autres = U.melangerListe(window.LSF.signes.filter((x) => x.id !== s.id && x.theme !== s.theme && x.mot !== s.mot));
    const r = [];
    for (const x of memeTheme.concat(autres)) { if (r.length >= n) break; if (!r.some((y) => y.mot === x.mot)) r.push(x); }
    return r;
  }

  /**
   * Quiz : opts = { signes, nb, avance(k), fin(bonnes, nb), chrono (bool), surReponse(juste) }
   * Alterne « regarde le signe → choisis le mot » et « lis le mot → choisis le signe ».
   */
  function quiz(zone, opts) {
    const liste = U.melangerListe(opts.signes).slice(0, opts.nb || 10);
    let k = 0, bonnes = 0, L = null, verrou = false;
    function question() {
      if (L) { L.detruire(); L = null; }
      if (k >= liste.length && !opts.chrono) return opts.fin(bonnes, liste.length);
      const s = opts.chrono ? U.hasard(opts.signes) : liste[k];
      opts.avance && opts.avance(k);
      const type = opts.chrono || window.LSF.signes.length < 8 ? 'voir' : (k % 2 === 0 ? 'voir' : 'choisir');
      const choix = U.melangerListe([s].concat(intrus(s, 3, opts.signes)));
      verrou = false;
      if (type === 'voir') {
        zone.innerHTML = `
          <div class="question"><h2>Quel est ce signe ?</h2></div>
          <div class="scene quiz-scene" id="qs"></div>
          <div class="choix">${choix.map((c) => `<button data-id="${esc(c.id)}">${esc(c.mot)}</button>`).join('')}</div>
          <p class="retour-quiz" aria-live="assertive" tabindex="-1"></p>`;
        L = new window.LSFMoteur.Lecteur(zone.querySelector('#qs'), { vitesse: R().vitesse, miroir: R().miroir, trajectoire: R().trajectoires, etiquette: 'Signe à deviner' });
        L.charger(s); app().suivre(L);
      } else {
        zone.innerHTML = `
          <div class="question"><p class="texte-doux">Choisis le bon signe pour</p><h2 style="font-size:clamp(36px,6vw,56px)">${esc(s.mot)}</h2></div>
          <div class="choix choix-vignettes">${choix.map((c, i) => `<button data-id="${esc(c.id)}" aria-label="Choix ${i + 1}"><div class="tuile-scene" data-v="${esc(c.id)}"></div></button>`).join('')}</div>
          <p class="retour-quiz" aria-live="assertive" tabindex="-1"></p>
          <p class="texte-doux petit" style="text-align:center">Les flèches montrent le mouvement de chaque signe.</p>`;
        zone.querySelectorAll('[data-v]').forEach((d) => window.LSFMoteur.vignette(d, window.LSF.parId[d.dataset.v], { miroir: R().miroir }));
      }
      zone.querySelector('.choix').addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b || verrou) return;
        verrou = true;
        const juste = b.dataset.id === s.id;
        S().reponse(s.id, juste);
        if (juste) bonnes++;
        b.classList.add(juste ? 'bon' : 'faux');
        if (!juste) zone.querySelector(`.choix [data-id="${CSS.escape(s.id)}"]`).classList.add('bon');
        zone.querySelectorAll('.choix button').forEach((x) => { x.disabled = true; });
        const r = zone.querySelector('.retour-quiz');
        r.className = 'retour-quiz ' + (juste ? 'bon' : 'faux');
        r.textContent = juste ? U.hasard(T.quiz_bravo) : `${U.hasard(T.quiz_rate)} C'était « ${s.mot} ».`;
        r.focus({ preventScroll: true });
        S().sauver();
        opts.surReponse && opts.surReponse(juste);
        k++;
        const tm = setTimeout(() => { if (zone.isConnected && !opts.arrete) question(); }, opts.chrono ? (juste ? 450 : 1200) : (juste ? 900 : 2000));
        app().nettoyer(() => clearTimeout(tm));
      });
      const premier = zone.querySelector('.choix button'); if (premier) premier.focus({ preventScroll: true });
    }
    question();
    return { arreter() { opts.arrete = true; if (L) L.detruire(); }, get bonnes() { return bonnes; } };
  }

  function poolAppris() { return window.LSF.signes.filter((s) => S().estAppris(s.id) || (S().etat.signes[s.id] && S().etat.signes[s.id].vu)); }

  /* =============== ACCUEIL S'ENTRAÎNER =============== */
  function entrainer(main) {
    const rev = new Set(S().aReviser().concat(S().etat.difficiles).filter((id) => window.LSF.parId[id])).size;
    main.innerHTML = `
    <div class="page apparait">
      ${U.banniere(I.eclair, "Modes d'entraînement", "S'entraîner", 'Choisis un mode. Tout ce que tu réussis ou rates ici met à jour tes révisions.', '', '練')}
      <div class="modes cascade">
        <a class="mode mode-vedette inclinable incl-doux" href="#/entrainer/revision"><span class="mode-icone">${I.revision}</span><h3>Révision du jour</h3>
          <p>Les signes à revoir aujourd'hui, choisis selon tes réponses des jours précédents, plus tes signes difficiles.</p>
          <span class="compteur">${rev ? rev + ' signe' + (rev > 1 ? 's' : '') + ' à revoir' : 'Rien à revoir pour le moment'}</span></a>
        <a class="mode inclinable" href="#/entrainer/quiz"><span class="mode-icone">${I.quiz}</span><h3>Quiz</h3><p>10 questions sur un thème ou sur tous les signes.</p></a>
        <a class="mode inclinable" href="#/entrainer/cartes"><span class="mode-icone">${I.cartes}</span><h3>Cartes</h3><p>Regarde le signe, devine le mot, retourne la carte. Dis-toi honnêtement si tu savais.</p></a>
        <a class="mode inclinable" href="#/entrainer/chrono"><span class="mode-icone">${I.chrono}</span><h3>Défi chrono</h3><p>60 secondes pour reconnaître un maximum de signes.</p><span class="compteur">Record : ${S().etat.chronoRecord}</span></a>
        <a class="mode inclinable" href="#/entrainer/dactylo"><span class="mode-icone">${I.main.replace('viewBox="0 0 64 64"', 'viewBox="0 0 64 64" style="fill:var(--sakura-encre);stroke:none"')}</span><h3>Dactylologie</h3><p>Fais épeler n'importe quel mot, ou devine le mot épelé par le personnage.</p></a>
      </div>
    </div>`;
  }

  function cadre(main, titre, contenuTete) {
    main.innerHTML = `<div class="page apparait"><div class="atelier">
      <div class="atelier-tete"><a class="btn btn-icone btn-fantome" href="#/entrainer" aria-label="Retour">${I.croix}</a>
      <h1 style="font-size:clamp(26px,4vw,36px);flex:1">${esc(titre)}</h1>${contenuTete || ''}</div>
      <div id="zone"></div></div></div>`;
    return main.querySelector('#zone');
  }

  /* =============== QUIZ =============== */
  function modeQuiz(main) {
    const zone = cadre(main, 'Quiz');
    const themes = Object.entries(window.LSF.themes).filter(([k]) => window.LSF.signes.filter((s) => s.theme === k).length >= 4);
    const appris = poolAppris();
    zone.innerHTML = `
      <div class="groupe" style="max-width:640px;margin:0 auto">
        <h2>Sur quels signes ?</h2>
        <div class="themes-ruban">
          <button class="puce" data-t="__appris" ${appris.length < 4 ? 'disabled' : ''}>Mes signes appris (${appris.length})</button>
          <button class="puce" data-t="">Tous les signes</button>
          ${themes.map(([k, t]) => `<button class="puce" style="--h:${t.teinte}" data-t="${k}"><span class="pt"></span>${esc(t.nom)}</button>`).join('')}
        </div>
      </div>`;
    zone.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => {
      const t = b.dataset.t;
      const pool = t === '__appris' ? appris : t ? window.LSF.signes.filter((s) => s.theme === t) : window.LSF.signes;
      quiz(zone, {
        signes: pool, nb: Math.min(10, pool.length),
        fin: (bonnes, nb) => {
          S().ajouterXP(bonnes * 2); if (bonnes === nb) S().etat.quizParfaits++;
          const nv = S().verifierBadges(); S().sauver(); app().majStatut(); U.annoncerBadges(nv);
          zone.innerHTML = `<div class="resultat verre"><h2>${bonnes} / ${nb}</h2><p class="texte-doux">${bonnes === nb ? 'Sans faute, bravo !' : 'Les signes ratés reviendront dans ta révision du jour.'}</p>
            <div class="gain-xp">+${bonnes * 2} XP</div>
            <div class="heros-actions" style="justify-content:center"><button class="btn btn-principal btn-grand" id="encore">Nouveau quiz</button><a class="btn btn-fantome btn-grand" href="#/entrainer">Autres modes</a></div></div>`;
          zone.querySelector('#encore').addEventListener('click', () => app().aller());
        }
      });
    }));
  }

  /* =============== CARTES =============== */
  function cartes(main, params, revision) {
    let pool;
    if (revision) {
      const ids = Array.from(new Set(S().aReviser().concat(S().etat.difficiles))).filter((id) => window.LSF.parId[id]);
      pool = ids.map((id) => window.LSF.parId[id]);
    } else if (params.liste === 'favoris' || params.liste === 'difficiles') {
      pool = S().etat[params.liste].map((id) => window.LSF.parId[id]).filter(Boolean);
    } else {
      const a = poolAppris();
      pool = a.length >= 6 ? a : window.LSF.signes.filter((s) => s.niveau === 1);
    }
    pool = U.melangerListe(pool).slice(0, 20);
    const zone = cadre(main, revision ? 'Révision du jour' : 'Cartes', `<span class="texte-doux" id="cpt"></span>`);
    if (!pool.length) {
      zone.innerHTML = `<div class="vide"><strong>Tout est à jour</strong>${esc(T.revision_vide)}<p style="margin-top:14px"><a class="btn btn-principal" href="#/apprendre">Faire une leçon</a></p></div>`;
      return;
    }
    let i = 0, sus = 0, L = null;
    function carte() {
      if (L) { L.detruire(); L = null; }
      if (i >= pool.length) {
        S().ajouterXP(sus * 2); const nv = S().verifierBadges(); S().sauver(); app().majStatut(); U.annoncerBadges(nv);
        zone.innerHTML = `<div class="resultat verre"><h2>Fini !</h2><p class="texte-doux">Tu connaissais ${sus} signe${sus > 1 ? 's' : ''} sur ${pool.length}.</p><div class="gain-xp">+${sus * 2} XP</div>
          <div class="heros-actions" style="justify-content:center"><button class="btn btn-principal btn-grand" id="encore">Recommencer</button><a class="btn btn-fantome btn-grand" href="#/entrainer">Autres modes</a></div></div>`;
        zone.querySelector('#encore').addEventListener('click', () => app().aller());
        return;
      }
      const s = pool[i];
      main.querySelector('#cpt').textContent = `${i + 1} / ${pool.length}`;
      zone.innerHTML = `
        <div class="carte-flash" id="cf">
          <div class="carte-flash-inner">
            <div class="face scene" id="sc"></div>
            <div class="face face-dos" aria-hidden="true"><div><span class="etiquette">${esc((window.LSF.themes[s.theme] || {}).nom || '')}</span><h2>${esc(s.mot)}</h2><p class="texte-doux" style="margin-top:10px">${esc(s.desc || '')}</p></div></div>
          </div>
        </div>
        <div class="etape-pied" style="justify-content:center" id="pied">
          <button class="btn btn-principal btn-grand" id="retourner">Voir la réponse</button>
        </div>`;
      L = new window.LSFMoteur.Lecteur(zone.querySelector('#sc'), { vitesse: R().vitesse, miroir: R().miroir, trajectoire: R().trajectoires, etiquette: 'Signe à deviner' });
      L.charger(s); app().suivre(L);
      zone.querySelector('#retourner').addEventListener('click', () => {
        zone.querySelector('#cf').classList.add('retournee');
        zone.querySelector('.face-dos').removeAttribute('aria-hidden');
        zone.querySelector('#pied').innerHTML = `<button class="btn btn-fantome btn-grand" id="non">À revoir</button><button class="btn btn-menthe btn-grand" id="oui">Je savais</button>`;
        zone.querySelector('#oui').addEventListener('click', () => { S().reponse(s.id, true); sus++; S().sauver(); i++; carte(); });
        zone.querySelector('#non').addEventListener('click', () => { S().reponse(s.id, false); S().sauver(); i++; carte(); });
        zone.querySelector('#oui').focus();
      });
      zone.querySelector('#retourner').focus({ preventScroll: true });
    }
    carte();
  }

  /* =============== DÉFI CHRONO =============== */
  function chrono(main) {
    const zone = cadre(main, 'Défi chrono', `<span class="chrono" id="ch" aria-live="off">60</span>`);
    const pool = window.LSF.signes.filter((s) => s.fiable !== 'incertain' && s.theme !== 'alphabet');
    zone.innerHTML = `<div class="resultat verre"><h2>60 secondes</h2><p class="texte-doux">Reconnais un maximum de signes. Une erreur ne fait pas perdre de points, mais elle fait perdre du temps.</p>
      <p class="texte-doux">Ton record : <strong style="color:var(--soleil)">${S().etat.chronoRecord}</strong></p>
      <button class="btn btn-principal btn-grand" id="go">C'est parti</button></div>`;
    zone.querySelector('#go').addEventListener('click', () => {
      let reste = 60, score = 0;
      const ch = main.querySelector('#ch');
      const q = quiz(zone, { signes: pool, chrono: true, surReponse: (j) => { if (j) score++; } });
      const it = setInterval(() => {
        reste--; ch.textContent = reste; ch.classList.toggle('urgent', reste <= 10);
        if (reste <= 0 || !zone.isConnected) {
          clearInterval(it); q.arreter();
          if (!zone.isConnected) return;
          const record = score > S().etat.chronoRecord;
          if (record) S().etat.chronoRecord = score;
          S().ajouterXP(score * 2); S().noterActivite(1);
          const nv = S().verifierBadges(); S().sauver(); app().majStatut(); U.annoncerBadges(nv);
          zone.innerHTML = `<div class="resultat verre"><h2>${score} point${score > 1 ? 's' : ''}</h2><p class="texte-doux">${record ? 'Nouveau record !' : `Record : ${S().etat.chronoRecord}`}</p><div class="gain-xp">+${score * 2} XP</div>
            <div class="heros-actions" style="justify-content:center"><button class="btn btn-principal btn-grand" id="encore">Rejouer</button><a class="btn btn-fantome btn-grand" href="#/entrainer">Autres modes</a></div></div>`;
          zone.querySelector('#encore').addEventListener('click', () => app().aller());
        }
      }, 1000);
      app().nettoyer(() => { clearInterval(it); q.arreter(); });
    });
  }

  /* =============== DACTYLOLOGIE =============== */
  function dactylo(main) {
    const zone = cadre(main, 'Dactylologie', `<div class="onglets-seg" role="group" aria-label="Mode"><button data-m="regarder" aria-pressed="true">Regarder</button><button data-m="deviner" aria-pressed="false">Deviner</button></div>`);
    let L = null, mode = 'regarder', mot = '';
    const lettresDispo = window.LSF.signes.some((s) => s.theme === 'alphabet');
    function epeler(texte, sortie, cache) {
      const sign = window.LSFMoteur.epeler(texte);
      if (!sign.images.length) return;
      const lettres = window.LSFRecherche.norm(texte).replace(/[^a-z]/g, '').split('');
      sortie.innerHTML = lettres.map((l) => `<span>${cache ? '•' : l.toUpperCase()}</span>`).join('');
      const spans = sortie.querySelectorAll('span');
      const debut = []; let n = -1;
      sign.images.forEach((im, i) => { if (i === 0 || im.pause) n++; debut.push(n); });
      if (L) L.detruire();
      L = new window.LSFMoteur.Lecteur(zone.querySelector('#sc'), { vitesse: vit, miroir: R().miroir, trajectoire: R().trajectoires, boucle: false });
      app().suivre(L);
      L.surChangement((info) => {
        const cur = info.t >= info.total ? lettres.length : (debut[Math.min(info.k, debut.length - 1)] || 0);
        spans.forEach((s, i) => { s.classList.toggle('actif', i === cur); s.classList.toggle('fait', i < cur); });
      });
      L.charger(sign);
    }
    let vit = R().vitesse;
    function rendre() {
      main.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mode)));
      if (!lettresDispo) { zone.innerHTML = '<div class="vide"><strong>Alphabet indisponible</strong>Les lettres ne sont pas encore chargées.</div>'; return; }
      zone.innerHTML = `
        <div class="scene quiz-scene" id="sc"></div>
        <div class="dactylo-sortie" id="sortie" aria-hidden="true"></div>
        <div class="controles" style="justify-content:center;margin:10px 0 18px">
          <div class="vitesse" role="group" aria-label="Vitesse">${[0.5, 0.75, 1, 1.25].map((v) => `<button data-v="${v}" aria-pressed="${v === vit}">${String(v).replace('.', ',')}×</button>`).join('')}</div>
          <button class="btn" id="rejouer">${I.rejouer}Rejouer</button>
        </div>
        ${mode === 'regarder' ? `
          <form class="ligne-champ" id="f"><label class="sr" for="mot">Mot à épeler</label><input class="champ" id="mot" placeholder="Tape un mot ou un prénom" maxlength="24" autocomplete="off" value="${esc(mot || 'Maëlle')}"><button class="btn btn-principal">Épeler</button></form>`
        : `
          <form class="ligne-champ" id="f"><label class="sr" for="mot">Ta réponse</label><input class="champ" id="mot" placeholder="Quel mot as-tu vu ?" maxlength="24" autocomplete="off"><button class="btn btn-principal">Valider</button></form>
          <p class="retour-quiz" id="rq" aria-live="assertive"></p>
          <div class="etape-pied" style="justify-content:center"><button class="btn btn-fantome" id="autre">Autre mot</button></div>`}`;
      const sortie = zone.querySelector('#sortie');
      zone.querySelectorAll('[data-v]').forEach((b) => b.addEventListener('click', () => {
        vit = +b.dataset.v; zone.querySelectorAll('[data-v]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        if (L) { L.vitesse(vit); L.rejouer(); }
      }));
      zone.querySelector('#rejouer').addEventListener('click', () => L && L.rejouer());
      const input = zone.querySelector('#mot');
      if (mode === 'regarder') {
        zone.querySelector('#f').addEventListener('submit', (e) => { e.preventDefault(); mot = input.value; epeler(mot, sortie, false); });
        epeler(input.value, sortie, false);
      } else {
        const nouveau = () => { mot = U.hasard(window.LSFContenu.MOTS_DACTYLO); input.value = ''; zone.querySelector('#rq').textContent = ''; epeler(mot, sortie, true); input.focus(); };
        zone.querySelector('#f').addEventListener('submit', (e) => {
          e.preventDefault();
          const ok = window.LSFRecherche.norm(input.value).replace(/ /g, '') === mot;
          const rq = zone.querySelector('#rq');
          rq.className = 'retour-quiz ' + (ok ? 'bon' : 'faux');
          rq.textContent = ok ? U.hasard(T.quiz_bravo) : 'Pas tout à fait. Regarde encore, ou passe à un autre mot.';
          if (ok) {
            S().ajouterXP(3); S().noterActivite(1); S().sauver(); app().majStatut();
            sortie.querySelectorAll('span').forEach((s, i) => { s.textContent = mot[i].toUpperCase(); s.classList.add('fait'); });
            setTimeout(() => { if (zone.isConnected && mode === 'deviner') nouveau(); }, 1600);
          }
        });
        zone.querySelector('#autre').addEventListener('click', nouveau);
        nouveau();
      }
    }
    main.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.m; rendre(); }));
    rendre();
  }

  window.LSFPratique = { quiz, entrainer, modeQuiz, cartes, revision: (m, p) => cartes(m, p, true), chrono, dactylo };
})();
