/* =====================================================================
   Déblocage d'un personnage secret : grande animation plein écran.
   Lancée par app.js (majStatut) dès que l'XP atteint le palier d'un personnage secret.
   Déroulé : la carte verrouillée apparaît → elle se charge d'énergie → le cadenas explose
   → la carte tourne et prend ses couleurs → « Débloqué ! » → boutons « Choisir » / « Plus tard ».
   Les couleurs suivent la rareté du personnage (variables --r, --r-clair, --r-sombre de style.css).
   Si les animations sont coupées dans Réglages : la carte s'affiche directement, sans effets.
   ===================================================================== */
(function () {
  'use strict';
  const S = () => window.LSFStore;
  const U = () => window.LSFUI;
  const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
  const hasard = (a, b) => a + Math.random() * (b - a);
  const choix = (l) => l[Math.random() * l.length | 0];

  // file d'attente : si plusieurs personnages se débloquent en même temps, on les montre l'un après l'autre
  const file = [];
  let enCours = false;
  function annoncer(ids) {
    ids.forEach((id) => { if (S().PERSOS[id] && !file.includes(id)) file.push(id); });
    suivant();
  }
  async function suivant() {
    if (enCours || !file.length) return;
    enCours = true;
    // on attend que l'écran de connexion soit fermé (il passe au-dessus de tout)
    const ec = document.getElementById('ecran-connexion');
    while (ec && !ec.hidden) await attendre(500);
    await attendre(600);
    await jouer(file.shift());
    enCours = false;
    suivant();
  }

  /* ---------- construction de l'écran ---------- */
  function creer(id, P) {
    const esc = U().esc, nomRarete = S().RARETES[P.rarete].nom;
    const o = U().el(`
      <div class="deb r-${P.rarete}" role="dialog" aria-modal="true" aria-labelledby="deb-titre" aria-describedby="deb-sur">
        <div class="deb-voile"></div>
        <div class="deb-scene">
          <header class="deb-entete">
            <p class="deb-sur" id="deb-sur">Personnage secret · ${P.xp} XP atteints</p>
            <h2 class="deb-titre" id="deb-titre"><span class="sr">Personnage débloqué : ${esc(P.nom)}</span></h2>
          </header>
          <div class="deb-zone">
            <div class="deb-rayons"></div>
            <div class="deb-halo"></div>
            <div class="deb-flotte">
              <div class="perso-carte r-${P.rarete} verrouille pret deb-carte">
                <span class="perso-aura" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <span class="perso-portrait" aria-hidden="true"></span>
                <span class="perso-cadenas" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path class="deb-anse" d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>
                <span class="perso-nom" aria-hidden="true">???</span>
                <span class="perso-xp deb-xp"><b>${P.xp}</b> / ${P.xp} XP</span>
                <span class="jauge perso-jauge deb-jauge"><span style="width:100%"></span></span>
                <div class="deb-boutons" hidden>
                  <button type="button" class="deb-choisir"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Choisir ${esc(P.nom)}</button>
                  <button type="button" class="deb-plus-tard">Plus tard</button>
                </div>
                <span class="perso-rarete">${esc(nomRarete)}</span>
                <span class="deb-flash"></span>
                <span class="deb-reflet"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="deb-couche"></div>
        <div class="deb-flash-ecran"></div>
        <canvas class="deb-fx"></canvas>
      </div>`);
    U().portraitPerso(o.querySelector('.perso-portrait'), P);
    return o;
  }

  /* ---------- particules (dessinées sur un canvas plein écran) ---------- */
  function moteurParticules(cv, carte) {
    const cx = cv.getContext('2d');
    let W = 0, H = 0, raf = 0, dernier = 0;
    function taille() { const d = Math.min(2, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); }
    taille(); addEventListener('resize', taille);
    // couleurs prises sur la rareté de la carte
    const st = getComputedStyle(carte), v = (n) => st.getPropertyValue(n).trim();
    const COUL = [v('--r'), v('--r-clair'), '#FFB36B', '#FFE3A0', '#FFFFFF'];
    const CONF = [v('--r'), v('--r-clair'), '#FFFFFF', '#FFC94A', '#FF9AA3', '#C9D3FF'];
    const parts = [];
    const etat = { cible: null, aspirer: false, braises: false };

    function avancer(dessin) {
      if (dessin) cx.clearRect(0, 0, W, H);
      // énergie aspirée vers le cadenas
      if (etat.aspirer && etat.cible) for (let k = 0; k < 4; k++) {
        const a = Math.random() * Math.PI * 2, r = hasard(160, 380);
        parts.push({ t: 'aspire', x: etat.cible.x + Math.cos(a) * r, y: etat.cible.y + Math.sin(a) * r, vx: -Math.sin(a) * 3, vy: Math.cos(a) * 3, vie: 0, max: 140, s: hasard(1.6, 3.2), tr: 3, c: choix(COUL) });
      }
      // braises qui montent sur les côtés de la carte (pas devant le visage)
      if (etat.braises && Math.random() < 0.5) {
        const r = carte.getBoundingClientRect(), gauche = Math.random() < 0.5;
        parts.push({ t: 'braise', x: gauche ? hasard(r.left - 70, r.left + 6) : hasard(r.right - 6, r.right + 70), y: hasard(r.top + r.height * 0.3, r.bottom + 20), vx: hasard(-0.25, 0.25), vy: hasard(-1.7, -0.6), drag: 1, g: -0.006, vie: 0, max: hasard(90, 170), s: hasard(1.8, 3.4), tr: 5, c: choix(COUL.slice(0, 4)) });
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.vie++;
        if (p.t === 'aspire') {
          const dx = etat.cible.x - p.x, dy = etat.cible.y - p.y, d = Math.hypot(dx, dy) || 1;
          p.vx = (p.vx + (dx / d) * 1.3) * 0.92; p.vy = (p.vy + (dy / d) * 1.3) * 0.92;
          if (d < 16) { parts.splice(i, 1); continue; }
        } else { p.vx *= p.drag; p.vy = p.vy * p.drag + p.g; }
        const ox = p.x, oy = p.y; p.x += p.vx; p.y += p.vy;
        const a = 1 - p.vie / p.max;
        if (a <= 0 || p.y > H + 40) { parts.splice(i, 1); continue; }
        if (p.t === 'confetti') p.rot += p.vr;
        if (!dessin) continue;
        if (p.t === 'confetti') {
          // petit rectangle qui tourne et se retourne (le cos donne l'effet « papier qui pivote »)
          cx.save(); cx.globalAlpha = Math.min(1, a * 2); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.scale(1, Math.cos(p.vie * p.fl));
          cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore();
        } else {
          // traînée lumineuse (mode « lighter » : les couleurs s'additionnent et brillent)
          cx.globalCompositeOperation = 'lighter';
          cx.globalAlpha = p.t === 'aspire' ? Math.min(1, p.vie / 10) : a;
          cx.strokeStyle = p.c; cx.lineWidth = p.s; cx.lineCap = 'round';
          cx.beginPath(); cx.moveTo(ox - p.vx * p.tr, oy - p.vy * p.tr); cx.lineTo(p.x, p.y); cx.stroke();
          if (p.t === 'braise') { cx.globalAlpha = a * 0.3; cx.fillStyle = p.c; cx.beginPath(); cx.arc(p.x, p.y, p.s * 1.8, 0, 7); cx.fill(); }
          cx.globalCompositeOperation = 'source-over';
        }
      }
      cx.globalAlpha = 1;
    }
    // la simulation avance par pas de 1/60 s : même vitesse sur un écran 60, 120 ou 144 Hz
    function boucle(t) {
      const n = dernier ? Math.max(1, Math.min(6, Math.round((t - dernier) / 16.667))) : 1;
      if (!dernier || t - dernier >= 8) { for (let k = 0; k < n; k++) avancer(k === n - 1); dernier = t; }
      raf = requestAnimationFrame(boucle);
    }
    raf = requestAnimationFrame(boucle);

    return {
      etat,
      explosion(x, y) {
        for (let k = 0; k < 150; k++) {
          const a = Math.random() * Math.PI * 2, vit = Math.pow(Math.random(), 0.6) * 16 + 3;
          parts.push({ t: 'etincelle', x, y, vx: Math.cos(a) * vit, vy: Math.sin(a) * vit - 2, drag: 0.952, g: 0.14, vie: 0, max: hasard(55, 110), s: hasard(1.8, 4.2), tr: 2.4, c: choix(COUL) });
        }
      },
      confettis(x, y, n, duHaut) {
        for (let k = 0; k < n; k++) {
          parts.push(duHaut
            ? { t: 'confetti', x: hasard(0, W), y: hasard(-60, -10), vx: hasard(-1.5, 1.5), vy: hasard(2, 5), drag: 0.99, g: 0.05, vie: 0, max: hasard(220, 300), s: hasard(9, 15), rot: hasard(0, 6), vr: hasard(-0.2, 0.2), fl: hasard(0.08, 0.25), c: choix(CONF) }
            : { t: 'confetti', x, y, vx: hasard(-9, 9), vy: hasard(-17, -6), drag: 0.975, g: 0.32, vie: 0, max: hasard(150, 220), s: hasard(9, 16), rot: hasard(0, 6), vr: hasard(-0.3, 0.3), fl: hasard(0.08, 0.3), c: choix(CONF) });
        }
      },
      arreter() { cancelAnimationFrame(raf); removeEventListener('resize', taille); parts.length = 0; }
    };
  }

  /* ---------- petits outils d'animation ---------- */
  const centre = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  // replie un élément (hauteur → 0) puis le retire
  function replier(el, d) {
    const h = el.offsetHeight;
    return el.animate([{ height: h + 'px', opacity: 1, transform: 'scale(1)', marginTop: '0px' }, { height: '0px', opacity: 0, transform: 'scale(.6)', marginTop: '-12px' }],
      { duration: d || 360, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }).finished.then(() => el.remove(), () => {});
  }
  // tremblement ; « croissant » = de plus en plus fort (la carte se charge)
  function secousse(el, duree, ampli, croissant) {
    const k = [];
    for (let i = 0; i <= 24; i++) {
      const f = croissant ? i / 24 : 1 - i / 24, a = ampli * f * (i === 24 ? 0 : 1);
      k.push({ transform: `translate(${hasard(-a, a).toFixed(1)}px, ${(hasard(-a, a) - (croissant ? 8 * i / 24 : 0)).toFixed(1)}px) rotate(${hasard(-a / 3, a / 3).toFixed(2)}deg) scale(${croissant ? 1 + 0.06 * i / 24 : 1})` });
    }
    return el.animate(k, { duration: duree, fill: croissant ? 'forwards' : 'none' });
  }
  // le nom apparaît en « décodant » des lettres au hasard
  function decoder(el, final, duree) {
    const signes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@$?!';
    const t0 = performance.now();
    return new Promise((ok) => (function f() {
      const k = Math.min(1, (performance.now() - t0) / duree), n = Math.floor(k * final.length);
      el.textContent = final.split('').map((c, i) => (i < n || c === ' ' ? c : signes[Math.random() * signes.length | 0])).join('');
      if (k < 1) requestAnimationFrame(f); else { el.textContent = final; ok(); }
    })());
  }
  function ecrireTitre(titre, anime) {
    const sr = titre.querySelector('.sr');
    titre.innerHTML = 'Débloqué !'.split('').map((l) => (l === ' ' ? '<span class="esp" aria-hidden="true"> </span>' : `<span aria-hidden="true">${l}</span>`)).join('');
    titre.appendChild(sr);
    if (!anime) return;
    [...titre.querySelectorAll('[aria-hidden]')].forEach((s, i) => s.animate([
      { opacity: 0, transform: 'translateY(40px) scale(.4) rotate(-12deg)', filter: 'blur(6px)' },
      { opacity: 1, transform: 'translateY(-8px) scale(1.12) rotate(3deg)', offset: 0.65, filter: 'blur(0)' },
      { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 650, delay: i * 55, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'both' }));
  }

  /* ---------- l'animation complète ---------- */
  function jouer(id) {
    return new Promise((fini) => {
      const P = S().PERSOS[id];
      const o = creer(id, P);
      const $ = (s) => o.querySelector(s);
      const carte = $('.deb-carte'), cadenas = $('.perso-cadenas'), nom = $('.perso-nom'), boutons = $('.deb-boutons');
      const calme = S().mouvementReduit();
      const avantFocus = document.activeElement;
      document.body.appendChild(o);
      document.documentElement.classList.add('deb-ouvert');
      const fx = calme ? null : moteurParticules($('.deb-fx'), carte);
      let ferme = false;

      // fermeture (bouton, Échap) : fondu puis on retire tout
      function fermer() {
        if (ferme) return; ferme = true;
        removeEventListener('keydown', clavier);
        o.animate([{ opacity: 1 }, { opacity: 0 }], { duration: calme ? 1 : 350, easing: 'ease-in', fill: 'forwards' }).finished.then(() => {
          if (fx) fx.arreter();
          o.remove();
          document.documentElement.classList.remove('deb-ouvert');
          if (avantFocus && avantFocus.focus) avantFocus.focus({ preventScroll: true });
          fini();
        });
      }
      function clavier(e) {
        if (e.key === 'Escape') { e.preventDefault(); fermer(); }
        // on garde le focus dans la fenêtre (Tab boucle entre les deux boutons)
        if (e.key === 'Tab' && !boutons.hidden) {
          const b = [...boutons.querySelectorAll('button')], i = b.indexOf(document.activeElement);
          e.preventDefault(); b[(i + (e.shiftKey ? b.length - 1 : 1)) % b.length].focus();
        }
      }
      addEventListener('keydown', clavier);
      $('.deb-plus-tard').addEventListener('click', fermer);
      $('.deb-choisir').addEventListener('click', () => {
        // même effet que de cliquer sur la carte dans Progrès
        Object.assign(S().etat.reglages, { perso: id, peau: P.peau, cheveux: P.cheveux, haut: P.haut, coiffure: P.coiffure, noeud: P.noeud, cernes: !!P.cernes, theme: P.theme || null });
        S().sauver(); U().appliquerPersonnage(S().etat.reglages);
        U().toast('Personnage choisi : ' + P.nom);
        // on ne redessine que les pages qui montrent les cartes (sinon on casserait un exercice en cours)
        const route = (location.hash.replace(/^#\/?/, '').split('/')[0] || '');
        if (route === 'progres' || route === 'reglages') window.LSFApp.aller();
        fermer();
      });
      function montrerBoutons(anime) {
        boutons.hidden = false;
        if (anime) boutons.animate([{ opacity: 0, transform: 'scale(.4) translateY(14px)' }, { opacity: 1, transform: 'scale(1.06)', offset: 0.65 }, { opacity: 1, transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.9,.3,1.2)' });
        $('.deb-choisir').focus({ preventScroll: true });
      }

      // --- version calme : tout est déjà révélé, simple fondu ---
      if (calme) {
        carte.classList.remove('verrouille', 'pret');
        cadenas.remove(); $('.deb-xp').remove(); $('.deb-jauge').remove();
        nom.textContent = P.nom;
        $('.deb-sur').textContent = 'Nouveau personnage secret';
        ecrireTitre($('.deb-titre'), false);
        o.classList.add('deb-revele');
        montrerBoutons(false);
        return;
      }

      // --- version animée ---
      (async () => {
        // 0. l'écran apparaît, la carte verrouillée « appelle »
        o.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' });
        carte.animate([{ opacity: 0, transform: 'translateY(40px) scale(.85)' }, { opacity: 1, transform: 'none' }], { duration: 650, easing: 'cubic-bezier(.2,.9,.3,1.1)' });
        await attendre(1300);
        if (ferme) return;

        // 1. charge : la carte se soulève et tremble, le cadenas grossit, l'énergie est aspirée vers lui
        carte.classList.remove('pret');
        cadenas.style.animation = 'none';
        const voile = $('.deb-voile');
        voile.animate([{ opacity: 0 }, { opacity: 0.7 }], { duration: 1000, easing: 'ease-in', fill: 'forwards' });
        $('.deb-halo').animate([{ opacity: 0.22, scale: 1 }, { opacity: 0.75, scale: 0.7 }], { duration: 1100, easing: 'ease-in', fill: 'forwards' });
        await attendre(120);
        fx.etat.cible = centre(cadenas); fx.etat.aspirer = true;
        const charge = secousse(carte, 1150, 5, true);
        cadenas.animate([{ scale: 1, boxShadow: '0 0 16px -4px var(--r)' }, { scale: 1.45, boxShadow: '0 0 60px 14px var(--r)' }], { duration: 1150, easing: 'cubic-bezier(.6,0,.9,.6)', fill: 'forwards' });
        await attendre(1000);

        // 2. le cadenas s'ouvre…
        const anse = $('.deb-anse');
        anse.style.transformBox = 'fill-box'; anse.style.transformOrigin = '0% 100%';
        anse.animate([{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-3px) rotate(-32deg)' }], { duration: 160, easing: 'cubic-bezier(.3,1.6,.5,1)', fill: 'forwards' });
        cadenas.animate([{ scale: 1.45 }, { scale: 1.7, filter: 'brightness(2)' }], { duration: 170, fill: 'forwards' });
        await attendre(170);

        // 3. … et vole en éclats : morceaux, ondes de choc, flash, secousse de l'écran
        fx.etat.aspirer = false;
        const c = centre(cadenas);
        cadenas.style.visibility = 'hidden';
        const couche = $('.deb-couche');
        for (let k = 0; k < 14; k++) {
          const s = document.createElement('div'), t = hasard(12, 30), a = (k / 14) * Math.PI * 2 + hasard(-0.2, 0.2), vit = hasard(140, 330);
          s.className = 'deb-eclat'; s.style.width = t + 'px'; s.style.height = t * hasard(0.7, 1.3) + 'px'; s.style.left = c.x + 'px'; s.style.top = c.y + 'px';
          s.style.clipPath = `polygon(${hasard(0, 40)}% 0%, 100% ${hasard(10, 60)}%, ${hasard(40, 100)}% 100%, 0% ${hasard(30, 90)}%)`;
          couche.appendChild(s);
          s.animate([{ transform: 'translate(-50%,-50%) rotate(0) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${Math.cos(a) * vit * 0.75}px), calc(-50% + ${Math.sin(a) * vit * 0.75}px)) rotate(${hasard(-260, 260)}deg) scale(.8)`, opacity: 1, offset: 0.55 },
            { transform: `translate(calc(-50% + ${Math.cos(a) * vit}px), calc(-50% + ${Math.sin(a) * vit + 90}px)) rotate(${hasard(-420, 420)}deg) scale(.3)`, opacity: 0 }],
            { duration: hasard(900, 1300), easing: 'cubic-bezier(.12,.75,.3,1)', fill: 'forwards' }).finished.then(() => s.remove(), () => {});
        }
        for (const [d, ep, del] of [[750, 4, 0], [900, 2, 130]]) {
          const w = document.createElement('div'); w.className = 'deb-onde'; w.style.left = c.x + 'px'; w.style.top = c.y + 'px'; w.style.borderWidth = ep + 'px';
          couche.appendChild(w);
          w.animate([{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(9)', opacity: 0 }], { duration: d, delay: del, easing: 'cubic-bezier(.15,.7,.3,1)', fill: 'both' }).finished.then(() => w.remove(), () => {});
        }
        $('.deb-flash').animate([{ opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 0 }], { duration: 650, easing: 'ease-out' });
        $('.deb-flash-ecran').animate([{ opacity: 0 }, { opacity: 0.6, offset: 0.15 }, { opacity: 0 }], { duration: 600, easing: 'ease-out' });
        $('.deb-scene').animate([0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ transform: i === 8 ? 'none' : `translate(${hasard(-9, 9) * (1 - i / 8)}px, ${hasard(-9, 9) * (1 - i / 8)}px)` })), { duration: 380 });
        fx.explosion(c.x, c.y);
        fx.confettis(c.x, c.y, 80);
        voile.animate([{ opacity: 0.7 }, { opacity: 0 }], { duration: 700, easing: 'ease-out', fill: 'forwards' });

        // 4. révélation : la carte tourne sur elle-même, la silhouette prend ses couleurs, les rayons apparaissent
        charge.cancel();
        carte.classList.remove('verrouille');
        o.classList.add('deb-revele');
        const sc = $('.perso-portrait').firstElementChild;
        if (sc) sc.animate([{ filter: 'brightness(0)' }, { filter: 'brightness(0)', offset: 0.25 }, { filter: 'brightness(1.9)', offset: 0.6 }, { filter: 'brightness(1)' }], { duration: 1200, easing: 'ease-out' });
        carte.animate([{ transform: 'translateY(-8px) rotateY(0deg) scale(1.06)' }, { transform: 'translateY(-14px) rotateY(360deg) scale(1.14)', offset: 0.62 }, { transform: 'translateY(0) rotateY(360deg) scale(1)' }],
          { duration: 1400, easing: 'cubic-bezier(.3,.85,.35,1)' });
        $('.deb-rayons').animate([{ opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1 }], { duration: 900, easing: 'cubic-bezier(.2,.9,.3,1)', fill: 'forwards' });
        $('.deb-halo').animate([{ opacity: 0.75, scale: 0.7 }, { opacity: 0.95, scale: 1.15 }, { opacity: 0.6, scale: 1 }], { duration: 1400, easing: 'ease-out', fill: 'forwards' });
        attendre(650).then(() => $('.deb-reflet').classList.add('go'));
        replier($('.deb-xp'), 360); replier($('.deb-jauge'), 360);

        // 5. le nom se décode, le badge de rareté rebondit
        await attendre(450);
        nom.animate([{ transform: 'scale(.8)', opacity: 0.4 }, { transform: 'scale(1.18)', opacity: 1, offset: 0.7 }, { transform: 'scale(1)', opacity: 1 }], { duration: 900, easing: 'ease-out' });
        decoder(nom, P.nom, 800);
        $('.perso-rarete').animate([{ transform: 'scale(1) rotate(0)' }, { transform: 'scale(1.55) rotate(-10deg)', offset: 0.4 }, { transform: 'scale(.92) rotate(4deg)', offset: 0.7 }, { transform: 'scale(1) rotate(0)' }], { duration: 700, delay: 250, easing: 'ease-out' });

        // 6. titre « Débloqué ! » lettre par lettre + pluie de confettis
        await attendre(380);
        const sur = $('.deb-sur');
        sur.animate([{ opacity: 0.8 }, { opacity: 0 }], { duration: 200, fill: 'forwards' }).finished.then(() => {
          sur.textContent = 'Nouveau personnage secret';
          sur.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'ease-out', fill: 'forwards' });
        }, () => {});
        ecrireTitre($('.deb-titre'), true);
        fx.confettis(0, 0, 100, true);

        // 7. boutons « Choisir » / « Plus tard », la carte flotte, des braises montent
        await attendre(420);
        if (ferme) return;
        montrerBoutons(true);
        await attendre(250);
        $('.deb-flotte').classList.add('vole');
        fx.etat.braises = true;
      })();
    });
  }

  window.LSFDeblocage = { annoncer };
})();
