/* Routeur + barre de statut + nettoyage entre les pages. */
(function () {
  'use strict';
  const U = window.LSFUI, I = U.I;
  const main = document.getElementById('contenu');
  let nettoyages = [];
  let toucheClavier = null;

  const ROUTES = {
    '': ['accueil', (m, p) => window.LSFPages.accueil(m, p), 'Accueil'],
    decouvrir: ['decouvrir', (m, p) => window.LSFPages.decouvrir(m, p), 'Découvrir'],
    signe: ['decouvrir', (m, p) => window.LSFPages.fiche(m, p), null],
    apprendre: ['apprendre', (m, p) => window.LSFPages.apprendre(m, p), 'Apprendre'],
    lecon: ['apprendre', (m, p) => window.LSFPages.lecon(m, p), 'Leçon'],
    entrainer: ['entrainer', (m, p) => {
      const sous = { quiz: window.LSFPratique.modeQuiz, cartes: window.LSFPratique.cartes, revision: window.LSFPratique.revision, chrono: window.LSFPratique.chrono, dactylo: window.LSFPratique.dactylo };
      (Object.prototype.hasOwnProperty.call(sous, p.id) ? sous[p.id] : window.LSFPratique.entrainer)(m, p);
    }, "S'entraîner"],
    progres: ['progres', (m, p) => window.LSFPages.progres(m, p), 'Progrès'],
    'mes-signes': ['mes-signes', (m, p) => window.LSFPages.mesSignes(m, p), 'Mes signes'],
    culture: ['culture', (m, p) => window.LSFPages.culture(m, p), 'Culture sourde'],
    reglages: ['reglages', (m, p) => window.LSFPages.reglages(m, p), 'Réglages']
  };

  function analyser() {
    const h = location.hash.replace(/^#\/?/, '');
    const [chemin, qs] = h.split('?');
    const morceaux = chemin.split('/').filter(Boolean).map((m) => { try { return decodeURIComponent(m); } catch (e) { return m; } });
    const params = Object.fromEntries(new URLSearchParams(qs || ''));
    if (morceaux[1]) params.id = morceaux[1];
    return { route: morceaux[0] || '', params };
  }

  function nettoyer() {
    nettoyages.forEach((f) => { try { f(); } catch (e) { /* ignore */ } });
    nettoyages = [];
    toucheClavier = null;
  }

  let derniereRoute = null;
  // changement d'onglet : l'ancienne page s'efface doucement, puis la nouvelle arrive (voir .apparait)
  let sortieEnCours = null;
  function aller() {
    const { route, params } = analyser();
    // autre onglet ou autre signe : transition ; simple recherche/filtre sur la même page : pas de transition
    const autrePage = derniereRoute !== null && derniereRoute !== route + '/' + (params.id || '');
    clearTimeout(sortieEnCours);
    if (autrePage && !reduit && !main.classList.contains('sortie')) {
      main.classList.add('sortie');
      sortieEnCours = setTimeout(afficher, 190);
    } else afficher();
  }
  function afficher() {
    main.classList.remove('sortie');
    debutPage = performance.now();
    nettoyer();
    const { route, params } = analyser();
    const r = Object.prototype.hasOwnProperty.call(ROUTES, route) ? ROUTES[route] : ROUTES[''];
    // chaque espace a son propre style (couleur, cartes, cadres) : voir « IDENTITÉ DES PAGES » dans le CSS
    document.body.dataset.page = route === 'signe' ? 'fiche' : route === 'lecon' ? 'lecon' : (route === 'entrainer' && params.id ? 'exercice' : r[0]);
    try { r[1](main, params); }
    catch (e) {
      console.error(e);
      main.innerHTML = `<div class="page"><div class="vide"><strong>Oups, cette page n'a pas pu s'afficher</strong><a href="#/">Revenir à l'accueil</a></div></div>`;
    }
    let titre = r[2];
    if (route === 'signe' && window.LSF.parId[params.id]) titre = window.LSF.parId[params.id].mot + ' en LSF';
    document.title = (titre ? titre + ' · ' : '') + 'Langue des signes pour Maëlle';
    document.querySelectorAll('[data-route]').forEach((a) => {
      if (a.dataset.route === r[0]) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    fermerPlus();
    placerIndicateur();
    const bt = document.getElementById('barre-titre');
    if (bt) bt.textContent = r[2] && route !== '' ? (route === 'signe' ? 'Fiche du signe' : r[2]) : '';
    const memeRoute = derniereRoute === route + '/' + (params.id || '');
    if (!memeRoute) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
    derniereRoute = route + '/' + (params.id || '');
  }

  function majStatut() {
    const st = window.LSFStore.etat;
    // personnage secret débloqué grâce à l'XP : grande animation plein écran, une seule fois (js/deblocage.js)
    const nouveaux = window.LSFStore.nouveauxSkins();
    if (nouveaux.length) window.LSFDeblocage.annoncer(nouveaux);
    const n = window.LSFStore.serieActuelle();
    document.getElementById('pastille-serie').innerHTML = `${I.flamme.replace('<svg', '<svg fill="currentColor"')}<span>${n}</span><span class="sr"> jour${n > 1 ? 's' : ''} de suite</span>`;
    document.getElementById('pastille-xp').innerHTML = `<span>${st.xp}</span><span aria-hidden="true">XP</span><span class="sr"> points</span>`;
  }

  // pastille rose qui glisse sous l'onglet actif
  const indic = document.querySelector('.nav-indic');
  function placerIndicateur() {
    if (!indic) return;
    const a = document.querySelector('.nav a[aria-current="page"]');
    if (!a || !a.offsetWidth) { indic.style.opacity = '0'; return; }
    indic.style.opacity = '1';
    indic.style.left = a.offsetLeft + 'px';
    indic.style.width = a.offsetWidth + 'px';
  }
  window.addEventListener('resize', placerIndicateur);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placerIndicateur);

  // apparitions progressives : les blocs plus bas que l'écran surgissent quand on y arrive
  const reduit = window.LSFStore.mouvementReduit();
  let revelateur = null;
  if (!reduit && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('anim-ok');
    revelateur = new IntersectionObserver((es) => {
      // ceux qui arrivent ensemble surgissent l'un après l'autre (haut → bas, gauche → droite)
      const entrants = es.filter((e) => e.isIntersecting)
        .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left));
      entrants.forEach((e, i) => {
        const el = e.target;
        revelateur.unobserve(el);
        // au chargement d'une page, on laisse d'abord arriver la bannière
        const base = performance.now() - debutPage < 400 ? 140 : 0;
        el.style.animationDelay = base + Math.min(i, 12) * 50 + 'ms';
        el.classList.add('vu');
        // une fois arrivé, on enlève les classes : l'élément retrouve ses propres effets (survol, inclinaison…)
        const fin = (ev) => {
          if (ev.target !== el || ev.animationName !== 'revele') return;
          el.removeEventListener('animationend', fin);
          el.classList.remove('revele', 'vu'); el.style.animationDelay = '';
        };
        el.addEventListener('animationend', fin);
      });
    }, { rootMargin: '0px 0px -3% 0px' });
  }
  const BLOCS = '.section, .panneau, .jour, .objectif, .groupe, .article-carte, .niveau, .deux-col, .resultat';
  // éléments qui surgissent un par un : cartes, leçons, badges, boutons…
  const ELEMENTS = '.grille > *, .chemin > *, .badges > *, .modes > *, .chiffres > *, .persos > *, .themes-ruban > *, .choix > *, .barres > *, .themes-progres > *, .ligne-reglage, .heros-actions > *, .fiche-actions > *, .etape-pied > *, .voisins > *, .plus-resultats > *, .phrases-liste > *, .secrets > *';
  let debutPage = 0;
  function preparerRevelation() {
    if (!revelateur) return;
    const h = window.innerHeight;
    // les gros blocs déjà visibles arrivent avec la page (.apparait) ; les petits éléments montent toujours un par un
    main.querySelectorAll(BLOCS).forEach((el) => {
      if (el.dataset.rev) return;
      el.dataset.rev = '1';
      if (el.getBoundingClientRect().top > h * 0.92) { el.classList.add('revele'); revelateur.observe(el); }
    });
    main.querySelectorAll(ELEMENTS).forEach((el) => {
      if (el.dataset.rev) return;
      el.dataset.rev = '1';
      el.classList.add('revele'); revelateur.observe(el);
    });
  }

  // onde au clic sur tous les boutons
  document.addEventListener('pointerdown', (e) => {
    const b = e.target.closest && e.target.closest('.btn');
    if (!b || reduit) return;
    const r = b.getBoundingClientRect();
    const t = Math.max(r.width, r.height) * 2.2;
    const o = document.createElement('span');
    o.className = 'onde';
    o.style.cssText = `width:${t}px;height:${t}px;left:${e.clientX - r.left - t / 2}px;top:${e.clientY - r.top - t / 2}px`;
    b.appendChild(o);
    setTimeout(() => o.remove(), 650);
  });

  // effets (inclinaison 3D, cascade) appliqués à tout ce qui apparaît dans la page
  let effetsPrevus = false;
  new MutationObserver((muts) => {
    if (effetsPrevus) return;
    // ignorer les mises à jour d'animation à l'intérieur des SVG du personnage, et les vignettes dessinées pendant le défilement
    const dessin = (n) => n instanceof SVGElement || (n.closest && n.closest('.tuile-scene, [data-portrait]'));
    if (muts.every((m) => dessin(m.target))) return;
    effetsPrevus = true;
    requestAnimationFrame(() => { effetsPrevus = false; U.activerInclinaison(main); U.cascade(main); preparerRevelation(); });
  }).observe(main, { childList: true, subtree: true });

  // bouton « remonter » : apparaît dès qu'on a descendu d'un écran
  const remonter = document.createElement('button');
  remonter.type = 'button'; remonter.className = 'remonter'; remonter.setAttribute('aria-label', 'Remonter en haut de la page');
  remonter.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  remonter.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduit ? 'auto' : 'smooth' }));
  document.body.appendChild(remonter);
  let remonterPrevu = false;
  window.addEventListener('scroll', () => {
    if (remonterPrevu) return;
    remonterPrevu = true;
    requestAnimationFrame(() => { remonterPrevu = false; remonter.classList.toggle('visible', window.scrollY > window.innerHeight * 0.9); });
  }, { passive: true });

  // touche « / » : aller à la recherche, depuis n'importe quelle page
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    e.preventDefault();
    const champ = main.querySelector('.recherche input');
    if (champ) champ.focus(); else location.hash = '#/decouvrir';
  });

  // menu « Plus » (mobile)
  const bPlus = document.getElementById('bouton-plus');
  const menuPlus = document.getElementById('menu-plus');
  function fermerPlus() { menuPlus.hidden = true; bPlus.setAttribute('aria-expanded', 'false'); }
  bPlus.addEventListener('click', (e) => {
    e.stopPropagation();
    const ouvrir = menuPlus.hidden;
    menuPlus.hidden = !ouvrir; bPlus.setAttribute('aria-expanded', String(ouvrir));
  });
  document.addEventListener('click', (e) => { if (!menuPlus.hidden && !menuPlus.contains(e.target)) fermerPlus(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermerPlus();
    if (!toucheClavier) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    if (t && t.tagName === 'BUTTON' && e.key === ' ') return;
    if (t && t.closest && t.closest('[role="slider"]')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    toucheClavier(e);
  });

  window.LSFApp = {
    aller, majStatut,
    suivre(L) { nettoyages.push(() => L.detruire()); return L; },
    nettoyer(f) { nettoyages.push(f); },
    clavier(f) { toucheClavier = f; }
  };

  // démarrage
  U.appliquerPersonnage(window.LSFStore.etat.reglages);
  if (window.LSFPetales) { window.LSFPetales.init(); window.LSFPetales.activer(window.LSFStore.etat.reglages.petales !== false); }
  window.LSFStore.surChangement(majStatut);
  majStatut();
  if (window.LSF.doublons.length) console.warn('[LSF] identifiants en double ignorés :', window.LSF.doublons);
  // les ancres internes (#contenu, lien d'évitement) ne sont pas des routes
  window.addEventListener('hashchange', () => { if (!location.hash || location.hash.startsWith('#/')) aller(); });
  document.querySelector('.evitement').addEventListener('click', (e) => { e.preventDefault(); main.focus(); });
  aller();
})();
