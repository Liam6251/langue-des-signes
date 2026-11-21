/* Recherche tolérante : accents, majuscules, petites fautes, synonymes. */
(function () {
  'use strict';
  const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[œ]/g, 'oe').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

  function levenshtein(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let min = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (cur[j] < min) min = cur[j];
      }
      if (min > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }

  let index = null;
  function construire() {
    index = window.LSF.signes.map((s) => ({
      s,
      mot: norm(s.mot),
      syn: (s.syn || []).map(norm),
      theme: norm((window.LSF.themes[s.theme] || {}).nom || s.theme)
    }));
  }

  function score(e, q) {
    if (e.mot === q) return 100;
    if (e.syn.includes(q)) return 90;
    if (e.mot.startsWith(q)) return 80 - Math.min(20, e.mot.length - q.length);
    if (e.syn.some((x) => x.startsWith(q))) return 65;
    if (e.mot.split(' ').some((w) => w.startsWith(q))) return 60;
    if (e.mot.includes(q)) return 50;
    if (e.syn.some((x) => x.includes(q))) return 42;
    if (q.length >= 4) {
      const max = q.length >= 7 ? 2 : 1;
      const cands = [e.mot].concat(e.syn).concat(e.mot.split(' '));
      for (const c of cands) if (levenshtein(q, c, max) <= max) return 35;
    }
    if (e.theme === q || (q.length >= 3 && e.theme.startsWith(q))) return 20;
    return 0;
  }

  function chercher(q) {
    if (!index) construire();
    q = norm(q);
    if (!q) return window.LSF.signes.slice();
    return index.map((e) => ({ s: e.s, n: score(e, q) })).filter((r) => r.n > 0)
      .sort((a, b) => b.n - a.n || a.s.mot.localeCompare(b.s.mot, 'fr')).map((r) => r.s);
  }

  window.LSFRecherche = { chercher, norm };
})();
