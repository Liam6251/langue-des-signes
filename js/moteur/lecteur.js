/* Moteur LSF — résolution des images-clés, ligne de temps, indicateurs de mouvement, lecteur. */
(function () {
  'use strict';
  const H = window.LSFMains, C = window.LSFCorps, M = H.M;
  const f1 = (n) => Math.round(n * 10) / 10;
  const DOIGTS = ['index', 'majeur', 'annulaire', 'auriculaire', 'pouce', 'doigts'];
  const SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------- résolution d'un signe ---------- */
  const MAIN_REPOS = { cfg: 'plate', at: 'repos', paume: 'dedans', doigts: 'bas' };

  function fusion(prec, cur) {
    if (!cur) return prec;
    const r = Object.assign({}, prec, cur);
    if (cur.at !== undefined) {
      if (cur.off === undefined) r.off = null;
      if (cur.touch === undefined) r.touch = null;
    }
    return r;
  }
  function miroir(spec) {
    const r = Object.assign({}, spec);
    if (typeof r.at === 'string') {
      r.at = r.at.replace(/_dom$/, '_TMP').replace(/_non$/, '_dom').replace(/_TMP$/, '_non');
      if (r.at.startsWith('nd:')) r.at = 'neutre';
    }
    return r;
  }

  /* ---------- collisions : une main ne traverse ni la tête, ni le buste, ni l'autre main ----------
   * Si c'est le cas, on la décale juste assez pour qu'elle se pose à la surface (vers l'avant pour le corps,
   * à côté de la paume pour l'autre main). De face on ne voit presque pas la différence, mais le coude
   * et la vue « mes yeux » deviennent justes. */
  const POINTS_COLLISION = ['index', 'majeur', 'annulaire', 'auriculaire', 'pouce', 'paume', 'dos', 'centre', 'jointures', 'tranche', 'cote_index', 'poignet'];
  function degager(m, autre) {
    if (!m || m.repos || m.W[1] > 470) return m;
    let dz = 0;
    for (const nom of POINTS_COLLISION) {
      const p = H.pointMonde(m, nom);
      // tête (ellipsoïde qui passe par les repères du visage) : seulement la moitié avant
      const dx = (p[0] - 200) / 47, dy = (p[1] - 118) / 66, k = 0.92 - dx * dx - dy * dy;
      if (k > 0 && p[2] > -10) dz = Math.max(dz, -10 + 52 * Math.sqrt(k) - p[2]);
      dz = Math.max(dz, C.dansBuste(p, 2));
    }
    let W = dz > 0.5 ? M.add(m.W, [0, 0, dz]) : m.W;
    // l'autre main : les points qui rentrent dans sa paume ressortent du côté qui demande le plus petit décalage
    // (devant ou derrière la paume) ; deux poings qui se touchent ne se traversent donc plus
    if (autre && !autre.repos && autre.W[1] < 470) {
      const Ra = M.matDeQuat(autre.q), mua = autre.cote === 'd' ? -1 : 1, Na = Ra[2];
      let devant = 0, derriere = 0, dedans = false;
      for (const nom of POINTS_COLLISION) {
        const p = M.sub(H.pointMonde(Object.assign({}, m, { W }), nom), autre.W);
        const lx = (M.dot(p, Ra[0]) * mua) / autre.s, ly = M.dot(p, Ra[1]) / autre.s, lz = M.dot(p, Na) / autre.s - 0.02;
        if (Math.abs(lx) < 0.45 && ly > 0.05 && ly < 1.0 && Math.abs(lz) < 0.12) {
          dedans = true;
          devant = Math.max(devant, (0.13 - lz) * autre.s);
          derriere = Math.max(derriere, (0.13 + lz) * autre.s);
        }
      }
      if (dedans) {
        // côté où se trouve le centre de cette main ; s'il est pile dans la paume de l'autre, le plus petit décalage
        const lzc = M.dot(M.sub(H.pointMonde(Object.assign({}, m, { W }), 'centre'), autre.W), Na) / autre.s - 0.02;
        const versDevant = Math.abs(lzc) > 0.1 ? lzc > 0 : devant <= derriere;
        W = M.add(W, versDevant ? M.mul(Na, devant) : M.mul(Na, -derriere));
      }
    }
    return W === m.W ? m : Object.assign({}, m, { W });
  }

  function resoudreMain(spec, cote, ndEtat, prec) {
    const forme = H.resoudreForme(spec.cfg || 'plate');
    const R = H.rotation(spec.paume || 'avant', spec.doigts || 'haut', cote);
    const at = spec.at || 'neutre';
    let cible;
    if (typeof at === 'string' && at.startsWith('nd:')) {
      if (cote === 'd' && ndEtat) { cible = H.pointMonde(ndEtat, at.slice(3)); cible[2] += 5; }
      else cible = C.repere('neutre', cote);
    } else cible = C.repere(at, cote);
    if (Array.isArray(spec.off)) {
      const o = H.versEcran([spec.off[0] || 0, spec.off[1] || 0, spec.off[2] || 0], cote);
      cible = M.add(cible, o);
    }
    const s = H.echelle(cible[2]);
    const touch = spec.touch || 'paume';
    const loc = H.pointLocal(forme, touch);
    const mu = cote === 'd' ? -1 : 1;
    const repos = at === 'repos';
    const placer = (q) => {
      const rel = M.appliquer(M.matDeQuat(q), [loc[0] * mu, loc[1], loc[2]]);
      return degager({ W: M.sub(cible, M.mul(rel, s)), q, s, forme, cote, repos }, cote === 'd' ? ndEtat : null).W;
    };
    let q = M.quatDeMat(R), W = placer(q), th = 0, coude;
    const precCoude = prec && !prec.repos ? { W: prec.W, E: prec.coude } : null;
    // coude choisi pour garder le poignet naturel ; si le poignet dépasse quand même ses butées, la main
    // tourne juste assez (autour du point de contact, qui ne bouge pas) puis on refait le calcul
    for (let essai = 0; essai < 3; essai++) {
      th = repos ? 0 : C.angleCoude(cote, W, q, precCoude);
      const S = C.epaule(cote, W);
      coude = C.coude(cote, W, S, th);
      if (repos) break;
      const q2 = C.limiterPoignet(cote, q, W, coude, S);
      if (q2 === q) break;
      q = q2; W = placer(q);
      coude = C.coude(cote, W, C.epaule(cote, W), th);
    }
    // dernière vérification avec le coude final (même règle que pendant le mouvement : pas de saut entre les deux)
    if (!repos) {
      const q2 = C.limiterPoignet(cote, q, W, coude, C.epaule(cote, W));
      if (q2 !== q) {
        q = q2;
        W = degager({ W, q, s, forme, cote, repos }, cote === 'd' ? ndEtat : null).W;
        coude = C.coude(cote, W, C.epaule(cote, W), th);
      }
    }
    return { W, q, th, coude, s, forme, cote, cible, touch, repos };
  }

  // pendant un mouvement : le poignet reste dans ses butées (la main tourne autour du poignet)
  function limiterEtat(m) {
    if (!m || m.repos || m.W[1] > 470) return m;
    const S = C.epaule(m.cote, m.W), E = C.coude(m.cote, m.W, S, m.th, m.coude);
    const q = C.limiterPoignet(m.cote, m.q, m.W, E, S);
    return q === m.q ? m : Object.assign({}, m, { q });
  }

  function resoudreSigne(signe) {
    const images = signe.images || signe.frames || [];
    let pd = null, pn = null, vis = 'neutre', bouche = null;
    const poses = [];
    images.forEach((img) => {
      const sd = fusion(pd || MAIN_REPOS, img.d);
      const sn = signe.sym ? miroir(sd) : fusion(pn || MAIN_REPOS, img.nd);
      if (img.visage) { vis = img.visage; bouche = null; }
      if (img.bouche !== undefined) bouche = img.bouche;
      let nd, d;
      try { const av = poses[poses.length - 1]; nd = resoudreMain(sn, 'nd', null, av && av.nd); d = resoudreMain(sd, 'd', nd, av && av.d); }
      catch (e) { console.warn('[LSF] erreur dans', signe.id, e); nd = resoudreMain(MAIN_REPOS, 'nd'); d = resoudreMain(MAIN_REPOS, 'd'); }
      poses.push({
        d, nd, visage: C.paramsVisage(vis, bouche), t: img.t == null ? 450 : +img.t, pause: +img.pause || 0,
        contact: img.contact, arc: +img.arc || 0, agiter: !!img.agiter
      });
      pd = sd; pn = sn;
    });
    if (!poses.length) {
      const nd = resoudreMain(MAIN_REPOS, 'nd'), d = resoudreMain(MAIN_REPOS, 'd');
      poses.push({ d, nd, visage: C.paramsVisage('neutre'), t: 450, pause: 0, arc: 0 });
    }
    return poses;
  }

  /* ---------- ligne de temps ---------- */
  function cloneMain(m, extra) { return Object.assign({}, m, extra || {}); }

  /* ---------- phrase : plusieurs signes enchaînés en une seule animation ---------- */
  // { mot: "Bonjour merci", phrase: [signe, signe, …] } → une ligne de temps continue,
  // avec une transition douce entre deux mots et un court arrêt à la fin de chacun.
  const TRANSITION_MOT = 560, ARRET_MOT = 300;
  function construirePhrase(phrase) {
    const morceaux = phrase.phrase.map((s) => construire(s));
    const seq = [], poses = [], fins = new Set();
    morceaux.forEach((tl, i) => {
      tl.seq.forEach((e, k) => {
        const entree = Object.assign({}, e);
        if (k === 0) { entree.dur = i === 0 ? 0 : TRANSITION_MOT; entree.stop = true; entree.mot = i; }
        seq.push(entree);
      });
      fins.add(seq.length - 1);
      poses.push(...tl.poses);
    });
    let t = 0;
    const segs = [], mots = morceaux.map((tl, i) => ({ mot: phrase.phrase[i].mot, id: phrase.phrase[i].id, debut: 0, fin: 0 }));
    let motCourant = 0;
    for (let k = 1; k < seq.length; k++) {
      if (seq[k].mot !== undefined) { mots[motCourant].fin = t; motCourant = seq[k].mot; mots[motCourant].debut = t; }
      segs.push({ k, debut: t, fin: t + seq[k].dur });
      t += seq[k].dur;
      const arret = (seq[k].pose.pause || 0) + (fins.has(k) && k < seq.length - 1 ? ARRET_MOT : 0);
      if (arret) { segs.push({ k, tenue: true, debut: t, fin: t + arret }); t += arret; }
    }
    mots[motCourant].fin = t;
    return { signe: phrase, poses, seq, segs, total: t, nPoses: seq.length, rep: 1, mots };
  }

  function construire(signe) {
    if (signe && Array.isArray(signe.phrase)) return construirePhrase(signe);
    const poses = resoudreSigne(signe);
    const rep = Math.max(1, Math.min(6, (signe.rep | 0) || 1));
    const seq = [];
    if (poses.length === 1) {
      const p = poses[0];
      const forme0 = H.resoudreForme('5_courbe');
      const pre = Object.assign({}, p, {
        d: cloneMain(p.d, { forme: forme0, W: M.add(p.d.W, [0, 10, 0]) }),
        nd: p.nd, visage: C.paramsVisage('neutre'), contact: false
      });
      seq.push({ pose: pre, dur: 0 });
      seq.push({ pose: p, dur: 520 });
    } else {
      for (let r = 0; r < rep; r++) {
        poses.forEach((p, i) => {
          if (r === 0 && i === 0) seq.push({ pose: p, dur: 0 });
          else seq.push({ pose: p, dur: i === 0 ? 420 : Math.max(60, p.t) });
        });
      }
    }
    // arrêts (ralentir) : début, fin, pause, contact, demi-tour
    const n = seq.length;
    seq.forEach((e, k) => {
      let stop = k === 0 || k === n - 1 || e.pose.pause > 0 || !!e.pose.contact;
      if (!stop && k > 0 && k < n - 1) {
        const a = seq[k - 1].pose.d.W, b = e.pose.d.W, c = seq[k + 1].pose.d.W;
        const vi = M.sub(b, a), vo = M.sub(c, b);
        const li = Math.hypot(vi[0], vi[1]), lo = Math.hypot(vo[0], vo[1]);
        if (li < 5 || lo < 5) stop = true;
        else if ((vi[0] * vo[0] + vi[1] * vo[1]) / (li * lo) < -0.25) stop = true;
      }
      e.stop = stop;
    });
    // temps cumulés
    let t = 0;
    const segs = [];
    for (let k = 1; k < n; k++) {
      segs.push({ k, debut: t, fin: t + seq[k].dur });
      t += seq[k].dur;
      if (seq[k].pose.pause) { segs.push({ k, tenue: true, debut: t, fin: t + seq[k].pose.pause }); t += seq[k].pose.pause; }
    }
    return { signe, poses, seq, segs, total: t, nPoses: poses.length, rep: poses.length === 1 ? 1 : rep };
  }

  function ease(p, a, b) {
    if (a && b) return 0.5 - 0.5 * Math.cos(Math.PI * p);
    if (a) return 1 - Math.cos((Math.PI * p) / 2);
    if (b) return Math.sin((Math.PI * p) / 2);
    return p;
  }

  function interpMain(tl, k, p, cote, agite) {
    const seq = tl.seq;
    const A = seq[k - 1], B = seq[k];
    const ma = A.pose[cote], mb = B.pose[cote];
    const p0 = (A.stop || k < 2) ? ma.W : seq[k - 2].pose[cote].W;
    const p3 = (B.stop || k + 1 >= seq.length) ? mb.W : seq[k + 1].pose[cote].W;
    let W = M.catmull(p0, ma.W, mb.W, p3, p);
    const arc = B.pose.arc;
    if (arc) {
      const dx = mb.W[0] - ma.W[0], dy = mb.W[1] - ma.W[1];
      const l = Math.hypot(dx, dy) || 1;
      let px = -dy / l, py = dx / l;
      if (Math.abs(py) < 0.2) { const dehors = cote === 'd' ? -1 : 1; if (px * dehors < 0) { px = -px; py = -py; } }
      else if (py > 0) { px = -px; py = -py; }
      const o = arc * Math.sin(Math.PI * p);
      W = [W[0] + px * o, W[1] + py * o, W[2]];
    }
    return {
      W, q: M.slerp(ma.q, mb.q, p), th: M.lerp(ma.th || 0, mb.th || 0, p), coude: coudeEntre(ma, mb, W, p, cote), s: M.lerp(ma.s, mb.s, p), forme: H.lerpForme(ma.forme, mb.forme, p),
      cote, agite, touch: mb.touch
    };
  }

  // Coude pendant un mouvement : le haut du bras tourne autour de l'épaule (rotation douce de sa direction),
  // au lieu d'aller en ligne droite d'un coude à l'autre (qui pouvait passer par l'axe du bras et faire sauter le coude).
  function coudeEntre(ma, mb, W, p, cote) {
    if (!ma.coude || !mb.coude) return null;
    const a = M.norm(M.sub(ma.coude, C.epaule(cote, ma.W))), b = M.norm(M.sub(mb.coude, C.epaule(cote, mb.W)));
    const c = M.clamp(M.dot(a, b), -1, 1), ang = Math.acos(c);
    let dir;
    if (ang < 1e-3) dir = a;
    else {
      const sa = Math.sin(ang);
      dir = M.add(M.mul(a, Math.sin((1 - p) * ang) / sa), M.mul(b, Math.sin(p * ang) / sa));
    }
    return M.add(C.epaule(cote, W), M.mul(M.norm(dir), 140));
  }

  function echantillon(tl, t) {
    const seq = tl.seq;
    // toutes les images passent par les mêmes règles (butées du poignet puis collisions) : une main arrêtée
    // sur une image-clé est donc exactement la même que juste avant, sans petit saut
    const finir = (d, nd) => { nd = degager(limiterEtat(nd), null); return { d: degager(degager(limiterEtat(d), nd), nd), nd }; };
    if (!tl.segs.length || t <= 0) {
      const P = seq[0].pose;
      return Object.assign(finir(Object.assign({}, P.d), Object.assign({}, P.nd)), { visage: P.visage, k: 0, p: 0 });
    }
    let sg = tl.segs[tl.segs.length - 1];
    for (const s of tl.segs) { if (t < s.fin) { sg = s; break; } }
    const k = sg.k;
    if (sg.tenue || t >= tl.total) {
      const P = seq[k].pose;
      const ag = P.agiter ? t / 1000 : 0;
      return Object.assign(finir(Object.assign({}, P.d, { agite: ag }), Object.assign({}, P.nd, { agite: ag })), { visage: P.visage, k, p: 1 });
    }
    const brut = M.clamp((t - sg.debut) / (sg.fin - sg.debut || 1), 0, 1);
    const p = ease(brut, seq[k - 1].stop, seq[k].stop);
    const ag = seq[k].pose.agiter ? t / 1000 : 0;
    // pendant le mouvement aussi, les mains contournent la tête, le buste et l'autre main
    const nd = degager(limiterEtat(interpMain(tl, k, p, 'nd', ag)), null);
    return {
      d: degager(degager(limiterEtat(interpMain(tl, k, p, 'd', ag)), nd), nd),
      nd,
      visage: C.lerpVisage(seq[k - 1].pose.visage, seq[k].pose.visage, Math.min(1, brut * 1.7)),
      k, p: brut
    };
  }

  // retour à la pose de départ entre deux boucles (f de 0 à 1) : le coude glisse lui aussi (avant il sautait
  // à sa position par défaut au début du retour, puis revenait d'un coup), et les mains contournent le corps.
  function etatRetour(tl, f) {
    const a = echantillon(tl, tl.total), b = echantillon(tl, 0);
    const p = 0.5 - 0.5 * Math.cos(Math.PI * f);
    const mix = (ma, mb) => {
      const W = M.lerp3(ma.W, mb.W, p);
      return {
        W, q: M.slerp(ma.q, mb.q, p), s: M.lerp(ma.s, mb.s, p), forme: H.lerpForme(ma.forme, mb.forme, p), cote: ma.cote,
        th: M.lerp(ma.th || 0, mb.th || 0, p), coude: coudeEntre(ma, mb, W, p, ma.cote), repos: ma.repos && mb.repos
      };
    };
    const nd = degager(limiterEtat(mix(a.nd, b.nd)), null);
    return { d: degager(degager(limiterEtat(mix(a.d, b.d)), nd), nd), nd, visage: C.lerpVisage(a.visage, b.visage, p), k: 0 };
  }

  /* ---------- point suivi (pour les trajectoires) ---------- */
  function pointSuivi(tl, cote) {
    const imgs = tl.signe.images || tl.signe.frames || [];
    for (const img of imgs) {
      const h = cote === 'd' ? img.d : (tl.signe.sym ? img.d : img.nd);
      if (h && DOIGTS.includes(h.touch)) return h.touch === 'doigts' ? 'majeur' : h.touch;
    }
    const f = tl.seq[0].pose[cote].forme;
    const ext = f.phi.map((p) => p[0] + p[1] + p[2] < 60);
    if (ext[0] && !ext[1] && !ext[2] && !ext[3]) return 'index';
    if (!ext[0] && !ext[1] && !ext[2] && ext[3]) return 'auriculaire';
    return 'centre';
  }

  /* ---------- indicateurs de mouvement (statiques) ---------- */
  function fleche(x, y, ang, taille) {
    const a1 = ang + 2.55, a2 = ang - 2.55;
    return `M${f1(x)} ${f1(y)}L${f1(x + Math.cos(a1) * taille)} ${f1(y + Math.sin(a1) * taille)}L${f1(x + Math.cos(a2) * taille)} ${f1(y + Math.sin(a2) * taille)}Z`;
  }

  function trajectoire(tl, cote) {
    const n = tl.nPoses;
    if (n < 2) return null;
    const nom = pointSuivi(tl, cote);
    const pts = [];
    const segs = tl.segs.filter((s) => !s.tenue && s.k <= n - 1);
    for (const sg of segs) {
      for (let i = 0; i <= 18; i++) {
        const t = sg.debut + ((sg.fin - sg.debut) * i) / 18;
        const e = echantillon(tl, Math.min(t, sg.fin - 0.01));
        const m = e[cote];
        pts.push(H.pointMonde(m, nom));
      }
    }
    return pts;
  }

  // projection d'un point 3D vers l'image : vue de face (orthographique) ou caméra « mes yeux »
  function projecteur(cam) {
    if (!cam) return (p) => [p[0], p[1]];
    return (p) => { const r = cam(p); return r ? [r[0], r[1]] : null; };
  }

  function dessinerIndicateurs(tl, cam) {
    const P2 = projecteur(cam);
    let out = '';
    for (const cote of ['d', 'nd']) {
      const p0 = tl.poses[0][cote];
      if (tl.poses.every((p) => p[cote].repos)) continue;
      const brut = trajectoire(tl, cote);
      if (!brut || brut.length < 2) continue;
      const pts = brut.map(P2).filter((p) => p && p[1] < 470 && p[1] > -30);
      if (pts.length < 2) continue;
      let L = 0;
      for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const premier = pts[0], dernier = pts[pts.length - 1];
      if (L >= 16 && !p0.repos) {
        // raccourcir la fin pour la flèche
        let fin = pts.length - 1, acc = 0;
        while (fin > 1 && acc < 7) { acc += Math.hypot(pts[fin][0] - pts[fin - 1][0], pts[fin][1] - pts[fin - 1][1]); fin--; }
        const corps = pts.slice(0, fin + 1);
        out += `<path class="mvt-trace" d="M${corps.map((p) => f1(p[0]) + ' ' + f1(p[1])).join('L')}"/>`;
        let j = pts.length - 2;
        while (j > 0 && Math.hypot(dernier[0] - pts[j][0], dernier[1] - pts[j][1]) < 8) j--;
        const ang = Math.atan2(dernier[1] - pts[j][1], dernier[0] - pts[j][0]);
        out += `<path class="mvt-fleche" d="${fleche(dernier[0], dernier[1], ang, 11)}"/>`;
        if (tl.rep > 1 && tl.nPoses === 2) {
          let i = 1;
          while (i < pts.length - 1 && Math.hypot(pts[i][0] - premier[0], pts[i][1] - premier[1]) < 8) i++;
          const a0 = Math.atan2(premier[1] - pts[i][1], premier[0] - pts[i][0]);
          out += `<path class="mvt-fleche" d="${fleche(premier[0], premier[1], a0, 11)}"/>`;
        }
        if (tl.rep > 1) {
          const mil = pts[Math.floor(pts.length / 2)];
          const off = cote === 'd' ? -22 : 22;
          out += `<g class="mvt-badge" transform="translate(${f1(mil[0] + off)} ${f1(mil[1] - 10)})"><rect x="-13" y="-10" width="26" height="18" rx="9"/><text x="0" y="3.5" text-anchor="middle">×${tl.rep}</text></g>`;
        }
      } else if (!p0.repos) {
        const c = P2(H.pointMonde(tl.poses[0][cote], 'centre'));
        const qa = tl.poses[0][cote].q, qb = tl.poses[tl.nPoses - 1][cote].q;
        if (c && M.angleQuat(qa, qb) > 0.6) {
          // rotation sur place : arc fléché
          const r = 46, a0 = -2.4, a1 = -0.7;
          const sens = (cote === 'd' ? 1 : -1);
          const x0 = c[0] + Math.cos(a0) * r * sens, y0 = c[1] + Math.sin(a0) * r;
          const x1 = c[0] + Math.cos(a1) * r * sens, y1 = c[1] + Math.sin(a1) * r;
          out += `<path class="mvt-trace" d="M${f1(x0)} ${f1(y0)}A${r} ${r} 0 0 ${sens > 0 ? 1 : 0} ${f1(x1)} ${f1(y1)}"/>`;
          const angF = sens > 0 ? Math.atan2(Math.sin(a1 + Math.PI / 2), Math.cos(a1 + Math.PI / 2)) : Math.atan2(Math.sin(a1 + Math.PI / 2), -Math.cos(a1 + Math.PI / 2));
          out += `<path class="mvt-fleche" d="${fleche(x1, y1, angF, 10)}"/>`;
        } else if (c) {
          // changement de forme sur place : petits traits d'ouverture
          const fa = tl.poses[0][cote].forme, fb = tl.poses[tl.nPoses - 1][cote].forme;
          let dphi = 0;
          fa.phi.forEach((p, i) => p.forEach((x, k) => { dphi += Math.abs(x - fb.phi[i][k]); }));
          const tip = P2(H.pointMonde(tl.poses[tl.nPoses - 1][cote], 'doigts'));
          if (dphi > 90 && tip) {
            const base = Math.atan2(tip[1] - c[1], tip[0] - c[0]);
            let traits = '';
            for (const da of [-0.6, 0, 0.6]) {
              const a = base + da;
              traits += `M${f1(tip[0] + Math.cos(a) * 14)} ${f1(tip[1] + Math.sin(a) * 14)}L${f1(tip[0] + Math.cos(a) * 24)} ${f1(tip[1] + Math.sin(a) * 24)}`;
            }
            out += `<path class="mvt-eclat" d="${traits}"/>`;
          }
        }
      }
      // contacts
      tl.poses.forEach((p) => {
        const c = p.contact;
        if (!c) return;
        const qui = c === 'nd' ? 'nd' : c === 'deux' ? 'both' : 'd';
        if ((qui === 'd' && cote !== 'd') || (qui === 'nd' && cote !== 'nd')) return;
        const pt = P2(p[cote].cible);
        if (pt) out += `<g class="mvt-contact" transform="translate(${f1(pt[0])} ${f1(pt[1])})"><path d="M0 -9L2.4 -2.4L9 0L2.4 2.4L0 9L-2.4 2.4L-9 0L-2.4 -2.4Z"/></g>`;
      });
      // frétillement
      if (tl.poses.some((p) => p.agiter)) {
        const P = tl.poses.find((p) => p.agiter)[cote];
        const tip = P.repos ? null : P2(H.pointMonde(P, 'doigts'));
        if (tip) out += `<path class="mvt-eclat" d="M${f1(tip[0] - 14)} ${f1(tip[1] - 16)}q4 -5 8 0t8 0t8 0"/>`;
      }
    }
    return out;
  }

  /* ---------- rendu des bras + mains ---------- */
  function dessinerMains(etat, opts) {
    opts = opts || {};
    const cam = opts.cam || null;
    const items = [];
    for (const cote of ['nd', 'd']) {
      const m = etat[cote];
      if (!m) continue;
      if (m.W[1] > 470) continue; // hors champ (main baissée)
      if (opts.seulement && !opts.seulement.includes(cote)) continue;
      // profondeur d'un point (plus grand = plus près de nous), de face ou par la caméra
      const prof = (p) => { if (!cam) return p[2]; const r = cam(p); return r ? r[2] : -1e6; };
      const zMain = prof(m.W) + (cote === 'd' ? 0.5 : 0);
      const bras = opts.sansBras ? '' : C.dessinerBras(cote, m.W, cam, { avantBrasSeul: opts.avantBrasSeul, th: m.th, coude: m.coude });
      // le bras et la main sont triés séparément : un avant-bras qui passe derrière l'autre main n'est plus dessiné
      // par-dessus elle. La main reste toujours au-dessus de son propre bras (le revers de manche passe sous la main).
      let zBras = zMain - 1;
      if (bras) {
        const E = C.coude(cote, m.W, C.epaule(cote, m.W), m.th, m.coude);
        zBras = Math.min(prof(M.lerp3(E, m.W, 0.6)), zMain - 0.01);
        // groupes séparés : le mode transparent rend la manche très légère et chaque partie de la main à moitié transparente
        items.push({ z: zBras, svg: `<g class="lsf-bras">${bras}</g>` });
      }
      items.push({ z: zMain, svg: `<g class="lsf-main">${H.dessinerMain(m, { agite: m.agite, cam, detail: opts.detail })}</g>` });
    }
    items.sort((a, b) => a.z - b.z);
    return items.map((i) => i.svg).join('');
  }

  /* ---------- structure SVG du personnage ---------- */
  let compteurSVG = 0;
  function creerSVG(classe) {
    const id = 'lsf' + (++compteurSVG);
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 440');
    svg.setAttribute('class', 'lsf-scene ' + (classe || ''));
    svg.setAttribute('role', 'img');
    const [pgx, pgy] = C.PIVOTS.g, [pdx, pdy] = C.PIVOTS.d;
    void pgx; void pgy; void pdx; void pdy;
    svg.innerHTML =
      '<defs><clipPath id="' + id + '-insert"><circle cx="0" cy="0" r="44"/></clipPath>' + C.defsYeux(id) +
        '<radialGradient id="' + id + '-spot" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FF9EC6" stop-opacity=".28"/><stop offset="1" stop-color="#FF9EC6" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="lsf-monde">' +
        '<g class="lsf-perso">' +
          '<g class="lsf-souffle">' +
            '<g class="lsf-tete-arriere">' + C.cheveuxArriere() + '</g>' +
            '<g class="lsf-corps">' + C.dessinerCorps() + '</g>' +
          '</g>' +
          '<g class="lsf-tete">' + C.tete() +
            '<g class="lsf-visage"></g>' +
            '<g class="lsf-meche-g">' + C.meche('g') + '</g><g class="lsf-meche-d">' + C.meche('d') + '</g>' +
            '<g class="lsf-cheveux">' + C.cheveuxAvant() + C.bandeau() + '</g>' +
            '<g class="lsf-sourcils"></g>' +
            '<g class="lsf-noeud">' + C.noeud() + '</g>' +
          '</g>' +
        '</g>' +
        '<g class="lsf-pov" style="display:none"><g class="lsf-decor">' + C.decorYeux().replace(/%ID%/g, id) + '</g>' + C.corpsYeux() + '</g>' +
        '<g class="lsf-main-fond" style="display:none"><rect x="-20" y="-20" width="440" height="480" fill="url(#' + id + '-spot)"/>' +
          '<circle cx="200" cy="218" r="150" fill="none" stroke="var(--sakura)" stroke-width="1" stroke-dasharray="2 8" opacity=".35"/></g>' +
        '<g class="lsf-fantome"></g><g class="lsf-mains"></g><g class="lsf-indic"></g><g class="lsf-fx"></g>' +
        '<g class="lsf-pov-ui" style="display:none">' + C.frangeYeux() +
          '<g class="lsf-legende-yeux"><rect x="12" y="404" width="268" height="26" rx="10" class="hors-vue-fond"/><text x="24" y="421.5" class="legende-texte">Tes yeux : le chat est assis en face de toi</text></g>' +
          '<g class="lsf-insert" transform="translate(344 72)"><circle r="47" class="insert-fond"/>' +
            '<g clip-path="url(#' + id + '-insert)"><g transform="scale(.46) translate(-200 -128)">' +
              C.cheveuxArriere() + C.tete() + '<g class="lsf-insert-visage"></g>' + C.meche('g') + C.meche('d') + C.cheveuxAvant() + C.bandeau() + '<g class="lsf-insert-sourcils"></g>' + C.noeud() +
            '</g></g><circle r="47" class="insert-bord"/></g>' +
          '<g class="lsf-hors-vue" style="display:none"><rect x="12" y="44" width="232" height="30" rx="12" class="hors-vue-fond"/><text x="26" y="64" class="hors-vue-texte">Main près du visage : hors de ta vue</text></g>' +
        '</g>' +
        '<g class="lsf-main-ui" style="display:none"><rect x="12" y="400" width="186" height="28" rx="10" class="hors-vue-fond"/><text x="24" y="419" class="legende-texte">Ta main, vue par tes yeux</text></g>' +
      '</g>';
    const q = (s) => svg.querySelector(s);
    return {
      svg, monde: q('.lsf-monde'), perso: q('.lsf-perso'), souffle: q('.lsf-souffle'), teteArriere: q('.lsf-tete-arriere'),
      tete: q('.lsf-tete'), visage: q('.lsf-visage'), sourcils: q('.lsf-sourcils'), mecheG: q('.lsf-meche-g'), mecheD: q('.lsf-meche-d'),
      noeud: q('.lsf-noeud'), pov: q('.lsf-pov'), povUi: q('.lsf-pov-ui'), insertVisage: q('.lsf-insert-visage'),
      insertSourcils: q('.lsf-insert-sourcils'), horsVue: q('.lsf-hors-vue'), mainFond: q('.lsf-main-fond'), mainUi: q('.lsf-main-ui'),
      chatQueue: q('.lsf-pov .chat-queue'), chatYeux: q('.lsf-pov .chat-yeux'), chatTete: q('.lsf-pov .chat-tete'),
      fantome: q('.lsf-fantome'), mains: q('.lsf-mains'), indic: q('.lsf-indic'), fx: q('.lsf-fx')
    };
  }

  // remplace le contenu seulement s'il a changé (réécrire le SVG à chaque image coûte cher)
  function majHTML(el, html) {
    if (el._html === html) return;
    el._html = html; el.innerHTML = html;
  }

  function appliquerMiroir(parts, miroir) {
    parts.monde.setAttribute('transform', miroir ? 'translate(400 0) scale(-1 1)' : '');
    // les textes (badge ×2, légendes) sont remis à l'endroit par le CSS
    parts.svg.classList.toggle('miroir', !!miroir);
  }

  function appliquerVue(parts, vue) {
    const yeux = vue === 'yeux', main = vue === 'main';
    parts.perso.style.display = yeux || main ? 'none' : '';
    parts.pov.style.display = yeux ? '' : 'none';
    parts.povUi.style.display = yeux ? '' : 'none';
    parts.mainFond.style.display = main ? '' : 'none';
    parts.mainUi.style.display = main ? '' : 'none';
    parts.svg.classList.toggle('vue-yeux', yeux);
    parts.svg.classList.toggle('vue-main', main);
  }

  // cadre fixe pour « Ma main » : englobe tout le trajet des mains visibles pendant le signe
  function cadrerMains(tl, angle) {
    const base = C.baseMain(angle ? angle.lacet : 0, angle ? angle.tangage : 0);
    const cotes = ['d', 'nd'].filter((c) => tl.poses.some((p) => !p[c].repos));
    if (!cotes.length) cotes.push('d');
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const N = 24;
    for (let i = 0; i <= N; i++) {
      const e = echantillon(tl, (tl.total * i) / N);
      for (const c of cotes) {
        if (e[c].W[1] > 470) continue;
        for (const nom of ['poignet', 'index', 'majeur', 'auriculaire', 'pouce', 'tranche', 'cote_index', 'jointures']) {
          const [x, y] = C.projMain(H.pointMonde(e[c], nom), base);
          if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
      }
    }
    if (!isFinite(x0)) { x0 = -40; x1 = 40; y0 = 200; y1 = 300; }
    const Z = M.clamp(Math.min(300 / Math.max(40, x1 - x0), 290 / Math.max(40, y1 - y0)), 1, 3.6);
    return { cam: C.camMain((x0 + x1) / 2, (y0 + y1) / 2, Z, base), cotes };
  }

  /* ---------- vignette statique (toujours de face) ---------- */
  function vignette(conteneur, signe, opts) {
    opts = opts || {};
    const parts = creerSVG('vignette');
    parts.svg.setAttribute('aria-label', 'Signe : ' + (signe.mot || ''));
    let tl;
    try { tl = construire(signe); } catch (e) { console.warn('[LSF]', signe.id, e); return parts.svg; }
    const e0 = echantillon(tl, tl.nPoses === 1 ? tl.total : 0);
    const vis = tl.poses[tl.poses.length - 1].visage;
    parts.visage.innerHTML = C.dessinerVisage(vis, false);
    parts.sourcils.innerHTML = C.dessinerSourcils(vis);
    if (tl.nPoses > 1) {
      const fin = echantillon(tl, tl.segs.filter((s) => s.k <= tl.nPoses - 1).slice(-1)[0].fin);
      parts.fantome.innerHTML = dessinerMains(fin, { sansBras: true });
    }
    parts.mains.innerHTML = dessinerMains(e0);
    parts.indic.innerHTML = dessinerIndicateurs(tl);
    appliquerMiroir(parts, opts.miroir);
    conteneur.innerHTML = '';
    conteneur.appendChild(parts.svg);
    return parts.svg;
  }

  /* ---------- ressort amorti (physique des cheveux, du nœud, de la tête) ---------- */
  function ressort(etat, cible, raideur, amorti, dt) {
    etat.v += (raideur * (cible - etat.x) - amorti * etat.v) * dt;
    etat.x += etat.v * dt;
  }

  /* ---------- lecteur animé ---------- */
  function Lecteur(conteneur, opts) {
    this.opts = Object.assign({ vitesse: 1, miroir: false, trajectoire: true, fantome: false, boucle: true, autoplay: true, vue: 'face' }, opts || {});
    this.parts = creerSVG('lecteur');
    conteneur.innerHTML = '';
    conteneur.appendChild(this.parts.svg);
    this.conteneur = conteneur;
    this.tl = null; this.t = 0; this.phase = 'jeu'; this.phaseT = 0;
    this.enCours = false; this.dernier = 0; this.trail = []; this.bursts = [];
    this.angle = { lacet: 0, tangage: 0 }; // angle de vue de « Ma main »
    this.clin = 0; this.prochainClin = 1800 + Math.random() * 2500; this.horloge = 0;
    this.phys = { tete: { x: 0, v: 0 }, hoche: { x: 0, v: 0 }, meche: { x: 0, v: 0 }, noeud: { x: 0, v: 0 }, rx: { x: 0, v: 0 }, ry: { x: 0, v: 0 } };
    this._dt = 0.016;
    this.ecouteurs = [];
    this._boucle = this._boucle.bind(this);
    appliquerMiroir(this.parts, this.opts.miroir);
    appliquerVue(this.parts, this.opts.vue);
    this._visible = true;
    if ('IntersectionObserver' in window) {
      this._obs = new IntersectionObserver((es) => { this._visible = es[0].isIntersecting; if (this._visible) this._demarrer(); });
      this._obs.observe(conteneur);
    }
  }
  Lecteur.prototype = {
    _cam() {
      if (this.opts.vue === 'yeux') return C.camYeux;
      if (this.opts.vue === 'main') return this._cadre ? this._cadre.cam : null;
      return null;
    },
    _dessinerStatique() {
      if (!this.tl) return;
      this._cleMains = null; // nouveau signe ou nouvelle vue : redessiner les mains
      this._cadre = this.opts.vue === 'main' ? cadrerMains(this.tl, this.angle) : null;
      const cam = this._cam();
      // une phrase entière : pas de flèches fixes (trop chargé), la traînée suffit
      const estPhrase = !!this.tl.mots;
      // mode transparent (« Ma main ») : on montre toujours le trajet et la pose d'arrivée, pour voir où vont les mains
      const transp = this._transparent();
      this.parts.indic.innerHTML = (this.opts.trajectoire || transp) && !estPhrase ? dessinerIndicateurs(this.tl, cam) : '';
      this.parts.indic.style.opacity = '';
      if ((this.opts.fantome || transp) && this.tl.nPoses > 1 && !estPhrase) {
        const segs = this.tl.segs.filter((s) => s.k <= this.tl.nPoses - 1);
        this.parts.fantome.innerHTML = dessinerMains(echantillon(this.tl, segs[segs.length - 1].fin), { sansBras: true, cam });
      } else this.parts.fantome.innerHTML = '';
    },
    charger(signe) {
      try { this.tl = construire(signe); } catch (e) { console.warn('[LSF]', signe && signe.id, e); return; }
      this.t = 0; this.phase = 'jeu'; this.phaseT = 0; this.trail = []; this.bursts = []; this._contactsVus = new Set();
      this._suivi = null;
      this.parts.svg.setAttribute('aria-label', this.opts.etiquette || ('Animation du signe : ' + (signe.mot || '')));
      this._dessinerStatique();
      this._dessiner();
      if (this.opts.autoplay) this.jouer(); else { this._notifier(); this._demarrer(); }
    },
    jouer() {
      if (!this.tl) return;
      if (this.phase === 'fin') { this.t = 0; this.phase = 'jeu'; this.phaseT = 0; this._contactsVus = new Set(); }
      this.enCours = true; this._demarrer(); this._notifier();
    },
    pause() { this.enCours = false; this._notifier(); },
    basculer() { this.enCours ? this.pause() : this.jouer(); },
    rejouer() { this.t = 0; this.phase = 'jeu'; this.phaseT = 0; this.trail = []; this._contactsVus = new Set(); this.jouer(); },
    vitesse(v) { this.opts.vitesse = v; this._notifier(); },
    miroir(m) { this.opts.miroir = m; appliquerMiroir(this.parts, m); },
    trajectoires(on) { this.opts.trajectoire = on; this._dessinerStatique(); },
    // mode transparent de « Ma main » : mains à moitié transparentes (on voit les doigts cachés), trajet + pose d'arrivée
    _transparent() { return !!this.opts.transparent && this.opts.vue === 'main'; },
    transparent(on) {
      this.opts.transparent = !!on;
      this.parts.svg.classList.toggle('mode-transparent', !!on);
      this._dessinerStatique(); this._dessiner(); this._notifier();
    },
    vue(v) {
      this.opts.vue = ['yeux', 'main'].includes(v) ? v : 'face'; appliquerVue(this.parts, this.opts.vue); this.trail = []; this._dessinerStatique(); this._dessiner(); this._notifier();
      // passage en douceur d'une vue à l'autre
      const doux = !(window.LSFStore && window.LSFStore.mouvementReduit());
      if (doux && this.parts.svg.animate) this.parts.svg.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: 'cubic-bezier(.2, 1, .3, 1)' });
    },
    // aller à l'image-clé voisine et mettre en pause
    etape(delta) {
      if (!this.tl) return;
      const n = this.tl.seq.length;
      const temps = [0];
      this.tl.segs.forEach((s) => { if (!s.tenue) temps[s.k] = s.fin; });
      let k = 0;
      for (let i = 0; i < n; i++) if (temps[i] != null && temps[i] <= this.t + 1) k = i;
      k = M.clamp(k + delta, 0, n - 1);
      this.enCours = false; this.phase = 'jeu'; this.t = temps[k] || 0; this.trail = [];
      this._dessiner(); this._notifier(); this._demarrer();
    },
    aller(frac) { if (!this.tl) return; this.phase = 'jeu'; this.t = M.clamp(frac, 0, 1) * this.tl.total; this.trail = []; this._dessiner(); this._notifier(); },
    // « Ma main » : tourner autour de la main (lacet = côtés, tangage = dessus / dessous, en degrés)
    orienter(lacet, tangage) {
      this.angle = { lacet: M.clamp(lacet, -150, 150), tangage: M.clamp(tangage, -110, 60) };
      if (this.opts.vue !== 'main' || !this.tl) return;
      this.trail = [];
      this._dessinerStatique(); this._dessiner();
    },
    // même chose, mais en glissant doucement jusqu'à l'angle voulu
    tourner(lacet, tangage) {
      cancelAnimationFrame(this._rafAngle); clearTimeout(this._finAngle);
      const a0 = Object.assign({}, this.angle), debut = performance.now(), duree = 480;
      const pas = (now) => {
        const k = Math.min(1, (now - debut) / duree), e = 1 - Math.pow(1 - k, 3);
        this.orienter(a0.lacet + (lacet - a0.lacet) * e, a0.tangage + (tangage - a0.tangage) * e);
        if (k < 1 && !this._mort) this._rafAngle = requestAnimationFrame(pas);
      };
      this._rafAngle = requestAnimationFrame(pas);
      // filet de sécurité : si les images sont suspendues (onglet en arrière-plan), l'angle final s'applique quand même
      this._finAngle = setTimeout(() => { if (!this._mort) { cancelAnimationFrame(this._rafAngle); this.orienter(lacet, tangage); } }, duree + 80);
    },
    surChangement(fn) { this.ecouteurs.push(fn); },
    _notifier() {
      const info = { enCours: this.enCours, t: this.t, total: this.tl ? this.tl.total : 0, vitesse: this.opts.vitesse, k: this._k || 0, n: this.tl ? this.tl.seq.length : 0, vue: this.opts.vue };
      this.ecouteurs.forEach((f) => f(info));
    },
    detruire() {
      this._mort = true; this.enCours = false;
      if (this._obs) this._obs.disconnect();
      cancelAnimationFrame(this._raf); this._raf = null; cancelAnimationFrame(this._rafAngle);
      clearTimeout(this._attente); this._attente = null;
      this.conteneur.innerHTML = '';
    },
    _demarrer() {
      if (this._raf || this._mort) return;
      clearTimeout(this._attente); this._attente = null;
      this.dernier = performance.now();
      this._raf = requestAnimationFrame(this._boucle);
    },
    _boucle(now) {
      this._raf = null;
      if (this._mort) return;
      if (!this.conteneur.isConnected) { this.detruire(); return; }
      const dt = Math.min(64, now - this.dernier); this.dernier = now;
      this._dt = Math.max(0.001, dt / 1000);
      this.horloge += dt;
      this.prochainClin -= dt;
      if (this.prochainClin < 0) { this.clin = 140; this.prochainClin = 2400 + Math.random() * 3200; }
      if (this.clin > 0) this.clin -= dt;
      if (this.enCours && this.tl) {
        const v = this.opts.vitesse;
        if (this.phase === 'jeu') {
          this.t += dt * v;
          if (this.t >= this.tl.total) { this.t = this.tl.total; this.phase = 'tenue'; this.phaseT = 0; }
        } else if (this.phase === 'tenue') {
          this.phaseT += dt;
          if (this.phaseT > 1100) {
            if (this.opts.boucle) { this.phase = 'retour'; this.phaseT = 0; }
            else { this.phase = 'fin'; this.enCours = false; this.opts.onFin && this.opts.onFin(); }
          }
        } else if (this.phase === 'retour') {
          this.phaseT += dt * Math.max(0.6, v);
          if (this.phaseT > 520) { this.phase = 'jeu'; this.t = 0; this.phaseT = 0; this.trail = []; this._contactsVus = new Set(); }
        }
        this._notifier();
      }
      this._dessiner();
      if (!this._visible) return;
      const P = this.phys;
      const agite = Math.abs(P.tete.v) + Math.abs(P.meche.v) + Math.abs(P.noeud.v) > 0.05;
      const anime = this.enCours || this.clin > 0 || this.trail.length || this.bursts.length || agite;
      if (anime) this._raf = requestAnimationFrame(this._boucle);
      else this._attente = setTimeout(() => { this._attente = null; this.prochainClin = 0; this._demarrer(); }, Math.max(60, this.prochainClin));
    },
    _etat() {
      const tl = this.tl;
      if (this.phase === 'retour') return etatRetour(tl, M.clamp(this.phaseT / 520, 0, 1));
      return echantillon(tl, this.t);
    },
    // tête qui suit la main, cheveux et nœud qui suivent la tête avec un temps de retard (ressorts)
    _physique(e) {
      const P = this.phys, dt = Math.min(0.05, this._dt);
      const Wd = e.d.W, visible = Wd[1] < 470;
      const cibleTete = visible ? M.clamp((Wd[0] - 200) / 140, -1, 1) * -2.2 : 0;
      const vAvant = P.tete.v;
      ressort(P.tete, cibleTete, 38, 10, dt);
      ressort(P.hoche, e.visage.tete || 0, 60, 12, dt);
      const accel = (P.tete.v - vAvant) / dt;
      const brise = Math.sin(this.horloge / 900) * 1.2;
      ressort(P.meche, -P.tete.x * 1.6 + brise - accel * 0.012, 55, 5, dt);
      ressort(P.noeud, -P.tete.x * 2.4 + brise * 1.5 - accel * 0.02, 70, 4, dt);
      ressort(P.rx, visible ? M.clamp((Wd[0] - 200) / 55, -2, 2) : 0, 120, 18, dt);
      ressort(P.ry, visible ? M.clamp((Wd[1] - 140) / 80, -1.4, 2) : 0, 120, 18, dt);
    },
    _dessiner() {
      if (!this.tl) return;
      const e = this._etat();
      this._k = e.k;
      const P = this.parts, cam = this._cam();
      if (this._visible || !this._dejaDessine) this._physique(e);
      this._dejaDessine = true;
      const ph = this.phys;
      const regard = [ph.rx.x, ph.ry.x];
      const visage = Object.assign({}, e.visage, { tete: 0 });
      // personnage (vue de face)
      if (!cam) {
        majHTML(P.visage, C.dessinerVisage(visage, this.clin > 0, regard));
        majHTML(P.sourcils, C.dessinerSourcils(visage));
        const tr = `translate(0 ${f1(ph.hoche.x)}) rotate(${ph.tete.x.toFixed(2)} 200 185)`;
        P.tete.setAttribute('transform', tr);
        P.teteArriere.setAttribute('transform', tr);
        const [gx, gy] = C.PIVOTS.g, [dx, dy] = C.PIVOTS.d, [nx, ny] = C.PIVOT_NOEUD;
        P.mecheG.setAttribute('transform', `rotate(${ph.meche.x.toFixed(2)} ${gx} ${gy})`);
        P.mecheD.setAttribute('transform', `rotate(${(ph.meche.x * 0.9).toFixed(2)} ${dx} ${dy})`);
        P.noeud.setAttribute('transform', `rotate(${ph.noeud.x.toFixed(2)} ${nx} ${ny})`);
        P.souffle.setAttribute('transform', `translate(0 ${(Math.sin(this.horloge / 560) * 0.8).toFixed(2)})`);
      } else if (this.opts.vue === 'yeux') {
        P.insertVisage.innerHTML = C.dessinerVisage(visage, this.clin > 0, [0, 0]);
        P.insertSourcils.innerHTML = C.dessinerSourcils(visage);
        const r = C.camYeux(e.d.W);
        const hors = e.d.W[1] < 470 && (!r || r[1] < -10);
        P.horsVue.style.display = hors ? '' : 'none';
        // le chat : la queue ondule, il cligne des yeux, penche un peu la tête
        const t = this.horloge / 1000;
        if (P.chatQueue) P.chatQueue.setAttribute('transform', `rotate(${(Math.sin(t * 1.6) * 7).toFixed(2)} 26 -8)`);
        if (P.chatYeux) P.chatYeux.setAttribute('transform', this.clin > 0 ? 'translate(0 -128) scale(1 .12) translate(0 128)' : '');
        if (P.chatTete) P.chatTete.setAttribute('transform', `rotate(${(Math.sin(t * 0.5) * 4).toFixed(2)} 0 -100)`);
      }
      const enMain = this.opts.vue === 'main';
      // les mains ne bougent pas en pause : on ne les redessine que si le temps, la phase ou la vue ont changé
      const cle = this.t + '|' + this.phase + '|' + this.phaseT + '|' + this.opts.vue + '|' + (this._cadre ? 1 : 0);
      if (cle !== this._cleMains || P.mains._html === undefined) {
        this._cleMains = cle;
        majHTML(P.mains, dessinerMains(e, enMain ? { cam, detail: true, avantBrasSeul: true, seulement: this._cadre && this._cadre.cotes } : { cam }));
      }
      P.indic.style.opacity = this.phase === 'retour' ? '0.25' : '';
      // traînée + contacts
      const now = this.horloge;
      const P2 = projecteur(cam);
      // traînée seulement pendant la lecture : en pause, elle remplissait la liste à chaque image
      // et empêchait la boucle de s'arrêter (animation en continu = lenteur)
      if (this.phase === 'jeu' && (this.opts.trajectoire || this._transparent()) && this.enCours) {
        if (!this._suivi) this._suivi = { d: pointSuivi(this.tl, 'd'), nd: pointSuivi(this.tl, 'nd') };
        for (const cote of ['d', 'nd']) {
          if (e[cote].W[1] > 470) continue;
          const pt = P2(H.pointMonde(e[cote], this._suivi[cote]));
          if (pt) this.trail.push({ c: cote, x: pt[0], y: pt[1], t: now });
        }
        this.tl.segs.forEach((s, i) => {
          if (s.tenue) return;
          const P3 = this.tl.seq[s.k].pose;
          if (P3.contact && this.t >= s.fin - 1 && !this._contactsVus.has(i)) {
            this._contactsVus.add(i);
            const cote = P3.contact === 'nd' ? 'nd' : 'd';
            const a = P2(P3[cote].cible); if (a) this.bursts.push({ x: a[0], y: a[1], t: now });
            if (P3.contact === 'deux') { const b = P2(P3.nd.cible); if (b) this.bursts.push({ x: b[0], y: b[1], t: now }); }
          }
        });
      }
      this.trail = this.trail.filter((p) => now - p.t < 380);
      this.bursts = this.bursts.filter((b) => now - b.t < 520);
      let fx = '';
      for (const cote of ['d', 'nd']) {
        const pts = this.trail.filter((p) => p.c === cote);
        for (let i = 1; i < pts.length; i++) {
          const age = (now - pts[i].t) / 380;
          if (Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y) < 0.3) continue;
          fx += `<path class="mvt-trainee" d="M${f1(pts[i - 1].x)} ${f1(pts[i - 1].y)}L${f1(pts[i].x)} ${f1(pts[i].y)}" style="opacity:${(0.9 * (1 - age)).toFixed(2)};stroke-width:${f1(9 * (1 - age) + 1.5)}"/>`;
        }
      }
      for (const b of this.bursts) {
        const a = (now - b.t) / 520;
        const r = 6 + a * 22;
        let rays = '';
        for (let i = 0; i < 8; i++) {
          const an = (i / 8) * Math.PI * 2 + 0.3;
          rays += `M${f1(b.x + Math.cos(an) * r * 0.7)} ${f1(b.y + Math.sin(an) * r * 0.7)}L${f1(b.x + Math.cos(an) * r)} ${f1(b.y + Math.sin(an) * r)}`;
        }
        fx += `<g class="mvt-burst" style="opacity:${(1 - a).toFixed(2)}"><circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(r * 0.55)}"/><path d="${rays}"/></g>`;
      }
      majHTML(P.fx, fx);
    }
  };

  /* ---------- dactylologie ---------- */
  function epeler(texte, base) {
    base = base || (window.LSF && window.LSF.parId) || {};
    const lettres = H.sansAccent(texte).replace(/[^a-z]/g, '').split('');
    const images = [];
    let prec = null;
    lettres.forEach((l, i) => {
      const s = base['lettre-' + l];
      if (!s) return;
      const imgs = (s.images || s.frames || []).map((im) => JSON.parse(JSON.stringify(im)));
      if (!imgs.length) return;
      imgs.forEach((im, j) => {
        if (j === 0) { im.t = i === 0 ? 0 : 430; im.pause = 260; }
        if (l === prec && im.d) { im.d.off = [((im.d.off || [])[0] || 0) + 16, (im.d.off || [])[1] || 0, (im.d.off || [])[2] || 0]; }
        im.visage = im.visage || 'neutre';
        images.push(Object.assign({ lettre: l.toUpperCase() }, im));
      });
      prec = l;
    });
    return { id: 'epeler-' + lettres.join(''), mot: texte, theme: 'alphabet', images, rep: 1 };
  }

  window.LSFMoteur = { construire, echantillon, etatRetour, resoudreSigne, Lecteur, vignette, epeler, dessinerIndicateurs };
})();
