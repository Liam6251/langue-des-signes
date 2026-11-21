/* Moteur LSF — maths 3D + modèle de main + dessin des mains.
 * Repère écran : X vers la droite, Y vers le bas, Z vers la personne qui regarde.
 * Repère local de la main (u, v, w) : v = du poignet vers les jointures, w = normale de la paume
 * (côté intérieur), u = côté du pouce. La main droite est le miroir du modèle (u inversé).
 */
(function () {
  'use strict';
  const DEG = Math.PI / 180;

  /* ---------- maths ---------- */
  const M = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
    mul: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
    len: (a) => Math.hypot(a[0], a[1], a[2]),
    norm(a) { const l = M.len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
    lerp: (a, b, t) => a + (b - a) * t,
    lerp3: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t],
    clamp: (x, a, b) => Math.max(a, Math.min(b, x)),
    // R = [T, F, N] (colonnes) ; applique R à un point local
    appliquer: (R, p) => [
      R[0][0] * p[0] + R[1][0] * p[1] + R[2][0] * p[2],
      R[0][1] * p[0] + R[1][1] * p[1] + R[2][1] * p[2],
      R[0][2] * p[0] + R[1][2] * p[1] + R[2][2] * p[2]
    ],
    quatDeMat(R) {
      const m00 = R[0][0], m01 = R[1][0], m02 = R[2][0];
      const m10 = R[0][1], m11 = R[1][1], m12 = R[2][1];
      const m20 = R[0][2], m21 = R[1][2], m22 = R[2][2];
      const tr = m00 + m11 + m22; let x, y, z, w, s;
      if (tr > 0) { s = Math.sqrt(tr + 1) * 2; w = 0.25 * s; x = (m21 - m12) / s; y = (m02 - m20) / s; z = (m10 - m01) / s; }
      else if (m00 > m11 && m00 > m22) { s = Math.sqrt(1 + m00 - m11 - m22) * 2; w = (m21 - m12) / s; x = 0.25 * s; y = (m01 + m10) / s; z = (m02 + m20) / s; }
      else if (m11 > m22) { s = Math.sqrt(1 + m11 - m00 - m22) * 2; w = (m02 - m20) / s; x = (m01 + m10) / s; y = 0.25 * s; z = (m12 + m21) / s; }
      else { s = Math.sqrt(1 + m22 - m00 - m11) * 2; w = (m10 - m01) / s; x = (m02 + m20) / s; y = (m12 + m21) / s; z = 0.25 * s; }
      return [x, y, z, w];
    },
    matDeQuat(q) {
      const [x, y, z, w] = q;
      const m00 = 1 - 2 * (y * y + z * z), m01 = 2 * (x * y - z * w), m02 = 2 * (x * z + y * w);
      const m10 = 2 * (x * y + z * w), m11 = 1 - 2 * (x * x + z * z), m12 = 2 * (y * z - x * w);
      const m20 = 2 * (x * z - y * w), m21 = 2 * (y * z + x * w), m22 = 1 - 2 * (x * x + y * y);
      return [[m00, m10, m20], [m01, m11, m21], [m02, m12, m22]];
    },
    slerp(a, b, t) {
      let [ax, ay, az, aw] = a; let [bx, by, bz, bw] = b;
      let c = ax * bx + ay * by + az * bz + aw * bw;
      if (c < 0) { c = -c; bx = -bx; by = -by; bz = -bz; bw = -bw; }
      let k0, k1;
      if (c > 0.9995) { k0 = 1 - t; k1 = t; }
      else { const o = Math.acos(c), so = Math.sin(o); k0 = Math.sin((1 - t) * o) / so; k1 = Math.sin(t * o) / so; }
      const r = [ax * k0 + bx * k1, ay * k0 + by * k1, az * k0 + bz * k1, aw * k0 + bw * k1];
      const l = Math.hypot(r[0], r[1], r[2], r[3]) || 1;
      return [r[0] / l, r[1] / l, r[2] / l, r[3] / l];
    },
    angleQuat(a, b) {
      const c = Math.abs(a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]);
      return 2 * Math.acos(Math.min(1, c));
    },
    catmull(p0, p1, p2, p3, t) {
      const t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      return [f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1]), f(p0[2], p1[2], p2[2], p3[2])];
    }
  };

  /* ---------- directions (repère du signeur → écran) ---------- */
  const sansAccent = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const DIRS = { haut: [0, 1, 0], bas: [0, -1, 0], avant: [0, 0, 1], arriere: [0, 0, -1], dedans: [-1, 0, 0], dehors: [1, 0, 0] };
  function dirSigneur(val) {
    if (Array.isArray(val) && val.length === 3) return M.len(val) ? M.norm(val) : null;
    if (val == null) return null;
    let v = [0, 0, 0];
    for (const p of sansAccent(val).split(/[-\s+]+/)) { const d = DIRS[p.trim()]; if (d) v = M.add(v, d); }
    return M.len(v) ? M.norm(v) : null;
  }
  // x = dehors (main d : vers la gauche de l'écran), y = haut, z = avant
  const versEcran = (v, cote) => [v[0] * (cote === 'd' ? -1 : 1), -v[1], v[2]];

  // Rotation propre R = [F×N, F, N] ; la main d utilise le modèle miroir (u inversé)
  function rotation(paume, doigts, cote) {
    const F = M.norm(versEcran(dirSigneur(doigts) || [0, 1, 0], cote));
    const N0 = versEcran(dirSigneur(paume) || [0, 0, 1], cote);
    let N = M.sub(N0, M.mul(F, M.dot(N0, F)));
    if (M.len(N) < 0.2) {
      const essais = [[0, 0, 1], [0, -1, 0], [1, 0, 0]];
      for (const e of essais) { N = M.sub(e, M.mul(F, M.dot(e, F))); if (M.len(N) > 0.3) break; }
    }
    N = M.norm(N);
    return [M.cross(F, N), F, N];
  }

  /* ---------- modèle de main ---------- */
  const BASES = [[0.31, 0.96], [0.105, 1.0], [-0.105, 0.97], [-0.3, 0.9]];
  const LONG = [[0.46, 0.27, 0.22], [0.5, 0.3, 0.23], [0.47, 0.28, 0.22], [0.37, 0.22, 0.19]];
  const EPAIS = [0.205, 0.215, 0.2, 0.172];
  const EPAIS_POUCE = 0.235;
  const CMC = [0.28, 0.22, 0.1];
  const LONG_POUCE = 1.18;

  const CODES = {
    t: [3, 4, 2], p: [88, 100, 62], c: [30, 40, 28], c2: [38, 52, 38], b: [85, 4, 3], x: [12, 100, 70],
    o: [44, 56, 40], g: [26, 78, 56], d: [16, 24, 14], v: [18, 82, 60], k: [75, 2, 2], bec: [50, 48, 20]
  };
  const t4 = ['t', 't', 't', 't'];
  const FORMES = {
    plate: { f: t4, e: 0, pouce: 'cote' },
    B: { f: t4, e: 0, pouce: 'replie' },
    '5': { f: t4, e: 13, pouce: 'ecarte' },
    '5_courbe': { f: ['d', 'd', 'd', 'd'], e: 12, pouce: 'ecarte_courbe' },
    griffe: { f: ['g', 'g', 'g', 'g'], e: 13, pouce: 'ecarte_courbe' },
    '5_majeur': { f: ['t', [62, 16, 8], 't', 't'], e: 13, pouce: 'ecarte' },
    C: { f: ['c2', 'c2', 'c2', 'c2'], e: 2, pouce: 'C' },
    O: { f: ['o', 'o', 'o', 'o'], e: 0, pouce: 'touche_tous' },
    bec: { f: ['bec', 'bec', 'bec', 'bec'], e: 0, pouce: 'touche_tous' },
    plate_pliee: { f: ['b', 'b', 'b', 'b'], e: 0, pouce: 'cote' },
    poing: { f: ['p', 'p', 'p', 'p'], pouce: 'devant' },
    A: { f: ['p', 'p', 'p', 'p'], pouce: 'A' },
    pouce: { f: ['p', 'p', 'p', 'p'], pouce: 'haut' },
    index: { f: ['t', 'p', 'p', 'p'], pouce: 'sur_majeur' },
    index_crochet: { f: ['x', 'p', 'p', 'p'], pouce: 'sur_majeur' },
    L: { f: ['t', 'p', 'p', 'p'], pouce: 'ecarte' },
    pince: { f: [[40, 45, 25], 'p', 'p', 'p'], pouce: 'pres_index' },
    pince_fermee: { f: [[42, 55, 35], 'p', 'p', 'p'], pouce: 'touche_index' },
    F: { f: ['o', 't', 't', 't'], sig: [0, 4, -6, -13], pouce: 'touche_index' },
    D: { f: ['t', 'o', 'o', 'o'], pouce: 'touche_majeur' },
    V: { f: ['t', 't', 'p', 'p'], sig: [10, -8, 0, 0], pouce: 'sur_annulaire' },
    V_plie: { f: ['v', 'v', 'p', 'p'], sig: [10, -8, 0, 0], pouce: 'sur_annulaire' },
    U: { f: ['t', 't', 'p', 'p'], sig: [1, -1, 0, 0], pouce: 'sur_annulaire' },
    R: { f: ['t', 't', 'p', 'p'], sig: [-6, 8, 0, 0], dw: [-0.03, 0.09, 0, 0], pouce: 'sur_annulaire' },
    K: { f: ['t', 'k', 'p', 'p'], sig: [3, -4, 0, 0], pouce: 'entre' },
    '3': { f: ['t', 't', 'p', 'p'], sig: [10, -8, 0, 0], pouce: 'ecarte' },
    W: { f: ['t', 't', 't', 'p'], sig: [12, 0, -12, 0], pouce: 'sur_auriculaire' },
    M: { f: ['t', 't', 't', 'p'], sig: [1, 0, -1, 0], pouce: 'sur_auriculaire' },
    '4': { f: t4, e: 12, pouce: 'replie' },
    I: { f: ['p', 'p', 'p', 't'], pouce: 'devant' },
    Y: { f: ['p', 'p', 'p', 't'], sig: [0, 0, 0, -20], pouce: 'ecarte' },
    corne: { f: ['t', 'p', 'p', 't'], sig: [8, 0, 0, -10], pouce: 'sur_majeur' },
    ILY: { f: ['t', 'p', 'p', 't'], sig: [8, 0, 0, -10], pouce: 'ecarte' },
    E: { f: [[75, 95, 45], [75, 95, 45], [75, 95, 45], [75, 95, 45]], pouce: 'replie_bas' },
    T: { f: [[35, 95, 55], 'p', 'p', 'p'], pouce: 'touche_index' }
  };
  // alias pratiques
  FORMES['1'] = FORMES.pouce; FORMES['2'] = FORMES.L; FORMES.S = FORMES.poing; FORMES.X = FORMES.index_crochet;
  FORMES.H = FORMES.U; FORMES.N = FORMES.U;
  FORMES.G = { f: ['t', 'p', 'p', 'p'], pouce: 'cote' };
  FORMES.E_lsf = { f: ['x', 'x', 'x', 'x'], pouce: 'replie' };
  FORMES.bec_ouvert = { f: [[34, 30, 14], [34, 30, 14], [34, 30, 14], [34, 30, 14]], e: 4, pouce: 'C' };

  const POUCES = {
    cote: { tip: [0.52, 1.2, 0.05], hint: [0.6, 0, -0.2] },
    ecarte: { tip: [1.24, 0.8, 0.06], hint: [0.1, -0.15, -0.95] },
    ecarte_courbe: { tip: [1.0, 0.85, 0.4], hint: [0.4, -0.5, -0.2] },
    C: { tip: [0.4, 0.85, 0.8], hint: [0.6, -0.4, 0] },
    replie: { tip: [-0.1, 0.62, 0.24], hint: [0.5, 0.6, 0.25] },
    replie_bas: { tip: [-0.05, 0.55, 0.34], hint: [0.5, 0.5, 0.4] },
    devant: { tip: [-0.05, 0.85, 0.62], hint: [0.4, 0, 0.5] },
    A: { tip: [0.47, 1.1, 0.32], hint: [0.5, 0, -0.2] },
    haut: { tip: [1.24, 0.74, 0.1], hint: [0.1, -0.15, -0.95] },
    sur_majeur: { tip: [0.05, 0.85, 0.55], hint: [0.4, 0, 0.5] },
    sur_annulaire: { tip: [-0.12, 0.82, 0.55], hint: [0.4, 0, 0.5] },
    sur_auriculaire: { tip: [-0.28, 0.78, 0.5], hint: [0.4, 0, 0.5] },
    entre: { tip: [0.2, 1.12, 0.38], hint: [0.5, 0, 0.2] },
    touche_index: { f: (P) => M.add(P[0][3], [0.05, -0.05, 0.02]), hint: [0.6, -0.2, 0.4] },
    touche_majeur: { f: (P) => M.add(P[1][3], [0.05, -0.05, 0.02]), hint: [0.6, -0.2, 0.4] },
    touche_tous: { f: (P) => M.add(M.lerp3(P[0][3], P[1][3], 0.45), [0.04, -0.06, 0.02]), hint: [0.6, -0.2, 0.4] },
    pres_index: { f: (P) => M.add(P[0][3], [0.06, -0.22, 0]), hint: [0.6, -0.2, 0.4] }
  };

  function doigt(i, phi, sig, dw) {
    let p = [BASES[i][0], BASES[i][1], dw || 0];
    const pts = [p];
    const s = Math.sin(sig * DEG), c = Math.cos(sig * DEG);
    let ang = 0;
    for (let k = 0; k < 3; k++) {
      ang += phi[k] * DEG;
      const d = [s * Math.cos(ang), c * Math.cos(ang), Math.sin(ang)];
      p = M.add(p, M.mul(d, LONG[i][k]));
      pts.push(p);
    }
    return pts;
  }

  function pouce(tip, hint) {
    const ch = M.sub(tip, CMC); const c = M.len(ch); const u = M.norm(ch);
    let n = M.sub(hint, M.mul(u, M.dot(hint, u)));
    n = M.len(n) > 1e-3 ? M.norm(n) : [0, 0, 1];
    const h = c < LONG_POUCE ? Math.sqrt(LONG_POUCE * LONG_POUCE - c * c) * 0.42 : 0;
    const pts = [CMC];
    for (const t of [0.4, 0.72]) pts.push(M.add(M.add(CMC, M.mul(ch, t)), M.mul(n, h * Math.sin(Math.PI * t))));
    pts.push(tip);
    return pts;
  }

  let avertis = {};
  function avertir(msg) { if (!avertis[msg]) { avertis[msg] = 1; console.warn('[LSF] ' + msg); } }

  function definitionSurMesure(cfg) {
    const doigts = (cfg.doigts || t4).map((c) => (Array.isArray(c) ? c : c));
    return { f: doigts, e: cfg.ecart || 0, pouce: cfg.pouce || 'cote', sig: cfg.sig, dw: cfg.dw };
  }

  function resoudreForme(cfg) {
    let def = null;
    if (typeof cfg === 'string') { def = FORMES[cfg] || FORMES[cfg.replace(/\s+/g, '_')]; if (!def) avertir('configuration inconnue : ' + cfg); }
    else if (cfg && typeof cfg === 'object') def = definitionSurMesure(cfg);
    if (!def) def = FORMES.plate;
    const E = def.e || 0;
    const phi = def.f.map((code) => (Array.isArray(code) ? code.slice() : (CODES[code] || CODES.t).slice()));
    const sig = def.sig ? def.sig.slice() : [E, E * 0.2, -E * 0.5, -E * 1.05];
    const dw = def.dw ? def.dw.slice() : [0, 0, 0, 0];
    const P = phi.map((p, i) => doigt(i, p, sig[i], dw[i]));
    let pr = def.pouce;
    let tip, hint;
    if (Array.isArray(pr)) { tip = pr; hint = [0.5, 0, 0.3]; }
    else {
      const pd = POUCES[pr] || POUCES.cote;
      if (!POUCES[pr]) avertir('pouce inconnu : ' + pr);
      tip = pd.f ? pd.f(P) : pd.tip.slice(); hint = pd.hint.slice();
    }
    return { phi, sig, dw, tip, hint };
  }

  function lerpForme(a, b, t) {
    return {
      phi: a.phi.map((p, i) => p.map((x, k) => M.lerp(x, b.phi[i][k], t))),
      sig: a.sig.map((x, i) => M.lerp(x, b.sig[i], t)),
      dw: a.dw.map((x, i) => M.lerp(x, b.dw[i], t)),
      tip: M.lerp3(a.tip, b.tip, t),
      hint: M.lerp3(a.hint, b.hint, t)
    };
  }

  // géométrie locale (non miroir)
  function geometrie(forme, agite) {
    let phi = forme.phi;
    if (agite) {
      phi = phi.map((p, i) => {
        const o = Math.sin(agite * 17 + i * 1.7);
        return [p[0] + o * 14, p[1] + Math.max(0, o) * 18, p[2] + Math.max(0, o) * 10];
      });
    }
    const doigts = phi.map((p, i) => doigt(i, p, forme.sig[i], forme.dw[i]));
    return { doigts, pouce: pouce(forme.tip, forme.hint) };
  }

  function pointLocal(forme, nom, geo) {
    geo = geo || geometrie(forme);
    switch (nom) {
      case 'dos': return [0.02, 0.5, -0.11];
      case 'tranche': return [-0.43, 0.55, 0];
      case 'poignet': return [0, 0, 0];
      case 'index': return geo.doigts[0][3];
      case 'majeur': case 'doigts': return geo.doigts[1][3];
      case 'annulaire': return geo.doigts[2][3];
      case 'auriculaire': return geo.doigts[3][3];
      case 'pouce': return geo.pouce[3];
      case 'jointures': {
        let s = [0, 0, 0];
        for (const d of geo.doigts) s = M.add(s, M.lerp3(d[0], d[1], 0.5));
        return M.add(M.mul(s, 0.25), [0, 0, -0.06]);
      }
      case 'centre': return [0, 0.72, 0.12];
      case 'cote_index': return [0.45, 0.55, 0];
      case 'avant-bras': case 'avant_bras': return [0, -1.3, -0.05];
      case 'coude': return [0, -2.6, -0.05];
      case 'paume': default: return [0.02, 0.52, 0.15];
    }
  }

  /* ---------- projection + dessin ---------- */
  const ECHELLE = 38;
  const echelle = (z) => ECHELLE * (1 + z / 900);

  function versMonde(p, R, W, s, mu) {
    const r = M.appliquer(R, [p[0] * mu, p[1], p[2]]);
    return [W[0] + r[0] * s, W[1] + r[1] * s, W[2] + r[2] * s];
  }

  function enveloppe(pts) { // enveloppe convexe 2D (chaîne monotone)
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = [];
    for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
    hi.pop(); lo.pop();
    return lo.concat(hi);
  }

  const f1 = (n) => Math.round(n * 10) / 10;
  const poly = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + f1(p[0]) + ' ' + f1(p[1])).join('');

  const PAUME_2D = [[-0.34, 0.03], [0.33, 0.03], [0.43, 0.55], [0.41, 0.97], [0.105, 1.02], [-0.2, 1.0], [-0.4, 0.9], [-0.43, 0.5]];

  /**
   * Dessine une main. etat = { W, q (ou R), s, forme, cote }, options = { agite, contour }
   * Retourne une chaîne SVG.
   */
  // détails « gros plan » : plis aux articulations, coussinet au bout du doigt, jointure sur le dos
  function plis(w3, ep, paumeVisible, pouce) {
    let s = '';
    const larg = Math.max(1.2, ep * 0.07);
    for (const j of pouce ? [2] : [1, 2]) {
      const a = w3[j - 1], p = w3[j], b = w3[j + 1];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
      if (l < 4) continue;
      const nx = -dy / l, ny = dx / l, h = ep * 0.3, c = ep * 0.08;
      for (const dec of paumeVisible ? [-0.06, 0.06] : [0]) {
        const px = p[0] + (dx / l) * ep * dec, py = p[1] + (dy / l) * ep * dec;
        s += `<path d="M${f1(px - nx * h)} ${f1(py - ny * h)}Q${f1(px + (dx / l) * c)} ${f1(py + (dy / l) * c)} ${f1(px + nx * h)} ${f1(py + ny * h)}" fill="none" stroke="var(--peau-ombre)" stroke-width="${f1(larg)}" stroke-linecap="round" opacity=".6"/>`;
      }
    }
    const bout = w3[w3.length - 1], avant = w3[w3.length - 2];
    const dx = bout[0] - avant[0], dy = bout[1] - avant[1], l = Math.hypot(dx, dy);
    if (paumeVisible && l > 4) {
      const cx = bout[0] - (dx / l) * ep * 0.28, cy = bout[1] - (dy / l) * ep * 0.28;
      s += `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(ep * 0.22)}" ry="${f1(ep * 0.16)}" transform="rotate(${f1(Math.atan2(dy, dx) * 57.3)} ${f1(cx)} ${f1(cy)})" fill="var(--peau-clair)" opacity=".5"/>`;
    }
    if (!paumeVisible && !pouce) {
      const k = w3[0], k2 = w3[1];
      s += `<circle cx="${f1(k[0] * 0.8 + k2[0] * 0.2)}" cy="${f1(k[1] * 0.8 + k2[1] * 0.2)}" r="${f1(ep * 0.2)}" fill="var(--peau-clair)" opacity=".45"/>`;
    }
    return s;
  }

  // segment cylindrique : contour, remplissage, reflet clair en haut à gauche (volume 3D façon anime)
  function cylindre(d, ep, ow, couleur, reflet) {
    const hl = ep * 0.16;
    return `<path d="${d}" fill="none" stroke="var(--contour)" stroke-width="${f1(ep + ow * 2)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${d}" fill="none" stroke="${couleur}" stroke-width="${f1(ep)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      (reflet && ep > 4 ? `<path d="${d}" fill="none" stroke="var(--peau-clair)" stroke-width="${f1(ep * 0.3)}" stroke-linecap="round" stroke-linejoin="round" transform="translate(${f1(-hl)} ${f1(-hl)})" opacity=".55"/>` : '');
  }

  /**
   * Dessine une main. etat = { W, q (ou R), s, forme, cote }
   * options = { agite, cam } — cam : projection 3D → [x, y, profondeur de tri, échelle] (vue « mes yeux »),
   * sans cam : vue de face (orthographique).
   * Retourne une chaîne SVG.
   */
  function dessinerMain(etat, options) {
    options = options || {};
    const R = etat.R || M.matDeQuat(etat.q);
    const mu = etat.cote === 'd' ? -1 : 1;
    const s = etat.s, W = etat.W;
    const geo = geometrie(etat.forme, options.agite);
    const cam = options.cam || null;
    const vw = (p) => versMonde(p, R, W, s, mu);
    const vm = cam ? (p) => cam(vw(p)) : (p) => { const q = vw(p); return [q[0], q[1], q[2], 1]; };
    const versCam = cam && cam.versCamera ? cam.versCamera(W) : [0, 0, 1];
    const N = R[2];
    const face = M.dot(N, versCam);
    const paumeVisible = face > 0.05;
    const ow = 2.1; // épaisseur du contour
    const els = [];
    const kMoy = (l) => l.reduce((a, p) => a + p[3], 0) / l.length;

    // paume (+ base du pouce)
    const pts3 = [];
    for (const [u, v] of PAUME_2D) { pts3.push(vm([u, v, 0.12])); pts3.push(vm([u, v, -0.09])); }
    const base = geo.pouce[1];
    pts3.push(vm([base[0], base[1], base[2] + 0.05])); pts3.push(vm([base[0], base[1], base[2] - 0.1]));
    pts3.push(vm(M.lerp3(CMC, base, 0.5)));
    if (pts3.every(Boolean)) {
      const hull = enveloppe(pts3.map((p) => [p[0], p[1]]));
      const zPaume = pts3.reduce((a, p) => a + p[2], 0) / pts3.length;
      const r = 0.12 * s * kMoy(pts3);
      const dP = poly(hull) + 'Z';
      const coul = paumeVisible ? 'var(--paume)' : 'var(--peau)';
      let paume = `<path d="${dP}" fill="var(--contour)" stroke="var(--contour)" stroke-width="${f1(r + ow * 2)}" stroke-linejoin="round"/>` +
        `<path d="${dP}" fill="${coul}" stroke="${coul}" stroke-width="${f1(r)}" stroke-linejoin="round"/>`;
      // reflet doux sur le dos de la main / ombre sur la paume : donne du volume
      const c1 = vm([0.12, 0.42, paumeVisible ? 0.13 : -0.1]), c2 = vm([-0.18, 0.75, paumeVisible ? 0.13 : -0.1]);
      if (c1 && c2) {
        paume += `<path d="M${f1(c1[0])} ${f1(c1[1])}L${f1(c2[0])} ${f1(c2[1])}" stroke="${paumeVisible ? 'var(--peau-ombre)' : 'var(--peau-clair)'}" stroke-width="${f1(r * 2.6)}" stroke-linecap="round" opacity="${paumeVisible ? 0.18 : 0.35}"/>`;
      }
      if (paumeVisible && face > 0.3) {
        const L = [[0.4, 0.74], [0.1, 0.66], [-0.3, 0.7], [0.36, 0.42], [0.2, 0.25], [0.06, 0.08]].map(([u, v]) => vm([u, v, 0.13]));
        if (L.every(Boolean)) {
          const [a, b, c, d, e, g] = L;
          const op = M.clamp((face - 0.3) * 1.6, 0, 0.55);
          paume += `<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])}M${f1(d[0])} ${f1(d[1])}Q${f1(e[0])} ${f1(e[1])} ${f1(g[0])} ${f1(g[1])}" fill="none" stroke="var(--peau-ombre)" stroke-width="1.6" stroke-linecap="round" opacity="${op.toFixed(2)}"/>`;
        }
      }
      els.push({ z: zPaume, svg: paume });
    }

    // doigts
    geo.doigts.forEach((pts, i) => {
      const w3 = pts.map(vm);
      if (!w3.every(Boolean)) return;
      const z = (w3[0][2] + w3[1][2] + w3[2][2] + w3[3][2]) / 4 + 1;
      const d = poly(w3);
      const ep = EPAIS[i] * s * kMoy(w3);
      let svg = cylindre(d, ep, ow, 'var(--peau)', true);
      if (options.detail) svg += plis(w3, ep, paumeVisible);
      // ongle si le dos du bout du doigt est tourné vers la caméra
      const phi = etat.forme.phi[i];
      const th = (phi[0] + phi[1] + phi[2]) * DEG;
      const sg = Math.sin(etat.forme.sig[i] * DEG), cg = Math.cos(etat.forme.sig[i] * DEG);
      const nLoc = [-sg * Math.sin(th), -cg * Math.sin(th), Math.cos(th)];
      const nW = M.appliquer(R, [nLoc[0] * mu, nLoc[1], nLoc[2]]);
      if (M.dot(nW, versCam) < -0.35) {
        const a = M.lerp3(w3[2], w3[3], 0.5), b = M.lerp3(w3[2], w3[3], 0.86);
        if (Math.hypot(b[0] - a[0], b[1] - a[1]) > 2) {
          svg += `<path d="M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}" stroke="var(--ongle)" stroke-width="${f1(ep * 0.5)}" stroke-linecap="round"/>`;
        }
      }
      els.push({ z, svg });
    });

    // pouce
    {
      const w3 = geo.pouce.slice(1).map(vm);
      if (w3.every(Boolean)) {
        const z = (w3[0][2] + w3[1][2] + w3[2][2]) / 3 + 1.5;
        const ep = EPAIS_POUCE * s * kMoy(w3);
        els.push({ z, svg: cylindre(poly(w3), ep, ow, 'var(--peau)', true) + (options.detail ? plis([w3[0], w3[0], w3[1], w3[2]], ep, paumeVisible, true) : '') });
      }
    }

    els.sort((a, b) => a.z - b.z);
    // chaque partie (paume, doigt, pouce) dans son groupe : en mode transparent, chacune devient à moitié
    // transparente d'un bloc (contour + peau ensemble) et on voit les doigts cachés derrière
    return els.map((e) => `<g class="mp">${e.svg}</g>`).join('');
  }

  function pointMonde(etat, nom) {
    const R = etat.R || M.matDeQuat(etat.q);
    const mu = etat.cote === 'd' ? -1 : 1;
    return versMonde(pointLocal(etat.forme, nom), R, etat.W, etat.s, mu);
  }

  window.LSFMains = {
    M, DEG, sansAccent, dirSigneur, versEcran, rotation, resoudreForme, lerpForme, geometrie,
    pointLocal, pointMonde, versMonde, echelle, dessinerMain, FORMES, POUCES, CODES, avertir
  };
})();
