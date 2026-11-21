/* Pétales de sakura qui tombent en continu.
 * Deux calques : beaucoup de petits pétales derrière le contenu, quelques gros devant (profondeur).
 * S'arrête quand l'onglet est caché ; très réduit si « réduire les animations » est activé ; désactivable dans Réglages.
 */
(function () {
  'use strict';
  const reduit = !!(window.LSFStore && window.LSFStore.mouvementReduit());
  const COULEURS = [['#FFE3EE', '#FF9EC6'], ['#FFD6E6', '#F784B4'], ['#FFF0F6', '#FFB6D3'], ['#FFC9DE', '#E86FA3']];

  function calque(id, options) {
    const c = document.getElementById(id);
    if (!c) return null;
    const ctx = c.getContext('2d');
    const etat = { c, ctx, p: [], opts: options, w: 0, h: 0, dpr: 1 };
    // sprites pré-dessinés (rapide)
    etat.sprites = COULEURS.map(([a, b]) => {
      const s = document.createElement('canvas');
      const T = 64; s.width = T; s.height = T;
      const g = s.getContext('2d');
      g.translate(T / 2, T / 2);
      const grad = g.createLinearGradient(0, -26, 0, 26);
      grad.addColorStop(0, a); grad.addColorStop(1, b);
      g.fillStyle = grad;
      // pétale de cerisier : base arrondie, encoche au bout
      g.beginPath();
      g.moveTo(0, 26);
      g.bezierCurveTo(-20, 14, -22, -14, -8, -26);
      g.lineTo(0, -19);
      g.lineTo(8, -26);
      g.bezierCurveTo(22, -14, 20, 14, 0, 26);
      g.closePath();
      g.fill();
      g.strokeStyle = 'rgba(214, 90, 140, .35)'; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(0, 22); g.quadraticCurveTo(-1, 0, 0, -16); g.stroke();
      return s;
    });
    return etat;
  }

  function nouveau(e, partout) {
    const o = e.opts;
    const taille = o.min + Math.random() * (o.max - o.min);
    return {
      x: partout ? Math.random() * e.w : -40 - Math.random() * e.w * 0.3,
      y: partout ? Math.random() * e.h : Math.random() * e.h * 0.9 - e.h * 0.25,
      t: taille,
      vx: (0.35 + Math.random() * 0.55) * o.vitesse * (taille / o.max + 0.4),
      vy: (0.45 + Math.random() * 0.6) * o.vitesse * (taille / o.max + 0.35),
      rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI * 2, vf: 0.015 + Math.random() * 0.03,
      bal: Math.random() * Math.PI * 2, vb: 0.008 + Math.random() * 0.012,
      a: o.alpha * (0.65 + Math.random() * 0.35),
      s: Math.floor(Math.random() * COULEURS.length)
    };
  }

  function dimensionner(e) {
    e.dpr = Math.min(2, window.devicePixelRatio || 1);
    e.w = window.innerWidth; e.h = window.innerHeight;
    e.c.width = Math.round(e.w * e.dpr); e.c.height = Math.round(e.h * e.dpr);
    const cible = Math.round(Math.min(e.opts.maxN, (e.w * e.h) / e.opts.densite) * (reduit ? 0.5 : 1));
    while (e.p.length < cible) e.p.push(nouveau(e, true));
    e.p.length = cible;
  }

  let calques = [], actif = true, raf = null, dernier = 0, vent = 0;
  function boucle(now) {
    raf = null;
    if (!actif || document.hidden) return;
    const dt = Math.min(48, now - (dernier || now)) / 16.7; dernier = now;
    vent = Math.sin(now * 0.00023) * 0.55 + Math.sin(now * 0.00071) * 0.25;
    for (const e of calques) {
      const { ctx } = e;
      ctx.setTransform(e.dpr, 0, 0, e.dpr, 0, 0);
      ctx.clearRect(0, 0, e.w, e.h);
      for (const p of e.p) {
        p.bal += p.vb * dt; p.flip += p.vf * dt; p.rot += p.vr * dt;
        const v = reduit ? 0.6 : 1;
        p.x += (p.vx + vent * 0.6 + Math.sin(p.bal) * 0.5) * dt * v;
        p.y += (p.vy + Math.cos(p.bal * 0.7) * 0.18) * dt * v;
        if (p.y > e.h + 40 || p.x > e.w + 40) Object.assign(p, nouveau(e, false));
        const sx = Math.cos(p.flip); // retournement 3D
        ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.abs(sx));
        ctx.setTransform(e.dpr, 0, 0, e.dpr, e.dpr * p.x, e.dpr * p.y);
        ctx.rotate(p.rot);
        ctx.scale(Math.max(0.12, Math.abs(sx)), 1);
        const t = p.t;
        ctx.drawImage(e.sprites[p.s], -t / 2, -t / 2, t, t);
      }
      ctx.globalAlpha = 1;
    }
    raf = requestAnimationFrame(boucle);
  }
  function demarrer() { if (!raf && actif && !document.hidden) { dernier = 0; raf = requestAnimationFrame(boucle); } }

  function init() {
    calques = [
      calque('petales-fond', { min: 9, max: 20, vitesse: 1, alpha: 0.85, densite: 16000, maxN: 90 }),
      calque('petales-avant', { min: 22, max: 34, vitesse: 1.7, alpha: 0.9, densite: 260000, maxN: 7 })
    ].filter(Boolean);
    calques.forEach(dimensionner);
    window.addEventListener('resize', () => calques.forEach(dimensionner));
    document.addEventListener('visibilitychange', demarrer);
    demarrer();
  }

  function activer(on) {
    actif = !!on;
    calques.forEach((e) => { e.c.style.display = actif ? '' : 'none'; });
    if (actif) demarrer(); else if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  window.LSFPetales = { init, activer };
})();
