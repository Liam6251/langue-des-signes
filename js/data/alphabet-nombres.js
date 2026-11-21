// Groupe : alphabet dactylologique de la LSF + nombres.
// Sources principales : Wikipédia « Alphabet dactylologique » (photos LSF_LettreX.jpg, signeur gaucher,
// donc miroir appliqué ici pour un droitier) et le Dico Elix (vidéos de chaque lettre / nombre).
// Détails et doutes : notes/research/alphabet-nombres.md
LSF.ajouter([

  // ───────────── ALPHABET ─────────────

  {
    id: "lettre-a", mot: "A", theme: "alphabet", niveau: 1,
    desc: "Ferme le poing, paume vers l'avant, et tends le pouce sur le côté, vers l'intérieur (il ne reste pas collé contre l'index).",
    astuce: "Différent du A américain : en LSF le pouce est bien écarté.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/a",
    images: [ { d: { cfg: "pouce", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-b", mot: "B", theme: "alphabet", niveau: 1,
    desc: "Main plate, doigts serrés tendus vers le haut, pouce replié dans la paume. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/b",
    images: [ { d: { cfg: "B", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-c", mot: "C", theme: "alphabet", niveau: 1,
    desc: "Arrondis la main en forme de C (doigts serrés courbés, pouce en face). On voit la main de profil : la personne en face lit un C.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/c",
    images: [ { d: { cfg: "C", at: "dactylo", paume: "dedans", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-d", mot: "D", theme: "alphabet", niveau: 1,
    desc: "Index tendu vers le haut ; les autres doigts sont arrondis et touchent le bout du pouce (ils forment la boucle du d). Main de profil.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/d",
    images: [ { d: { cfg: "D", at: "dactylo", paume: "dedans", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-e", mot: "E", theme: "alphabet", niveau: 1,
    desc: "Plie les quatre doigts en crochet (le bout des doigts vers le bas) et replie le pouce dans la paume, sous les doigts, sans qu'ils se touchent. Paume vers l'avant.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/e",
    images: [ { d: { cfg: { doigts: ["x", "x", "x", "x"], ecart: 0, pouce: "replie" }, at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-f", mot: "F", theme: "alphabet", niveau: 1,
    desc: "Plie l'index et pose le bout du pouce contre l'extérieur de l'index (au milieu du doigt). Le majeur, l'annulaire et l'auriculaire sont tendus et bien écartés.",
    astuce: "Le T se fait presque pareil, mais avec le pouce de l'autre côté de l'index.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/f",
    images: [ { d: { cfg: "F", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-g", mot: "G", theme: "alphabet", niveau: 1,
    desc: "Poing fermé, index tendu vers le haut et pouce levé à côté de l'index, parallèle à lui. Paume vers l'avant.",
    astuce: "Comme le G américain, mais pointé vers le haut.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/g",
    images: [ { d: { cfg: { doigts: ["t", "p", "p", "p"], ecart: 0, pouce: "cote" }, at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-h", mot: "H", theme: "alphabet", niveau: 1,
    desc: "Index et auriculaire tendus vers le haut (les « cornes »), majeur et annulaire repliés sous le pouce. Paume vers l'avant.",
    astuce: "Très différent du H américain : c'est la main « cornes ».",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/h",
    images: [ { d: { cfg: "corne", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-i", mot: "I", theme: "alphabet", niveau: 1,
    desc: "Poing fermé, seul l'auriculaire (petit doigt) est tendu vers le haut. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/i",
    images: [ { d: { cfg: "I", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-j", mot: "J", theme: "alphabet", niveau: 1,
    desc: "Main en Y (pouce et auriculaire tendus). Pars avec le pouce en haut et le petit doigt pointé vers l'intérieur, puis fais pivoter le poignet en descendant un peu : le petit doigt dessine la courbe du J.",
    astuce: "Ce n'est pas le I qui bouge (comme en ASL) mais le Y qui tourne.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/j",
    images: [
      { d: { cfg: "Y", at: "dactylo", off: [0, 15, 0], paume: "arriere", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: "Y", at: "dactylo", off: [-5, 0, 5], paume: "arriere", doigts: "dedans-bas" }, t: 300 },
      { d: { cfg: "Y", at: "dactylo", off: [-5, -15, 5], paume: "arriere", doigts: [-0.5, -1, 0] }, t: 300, arc: -8 }
    ]
  },
  {
    id: "lettre-k", mot: "K", theme: "alphabet", niveau: 1,
    desc: "Index tendu vers le haut, majeur tendu vers l'avant, le bout du pouce posé entre les deux. Annulaire et auriculaire repliés.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/k",
    images: [ { d: { cfg: "K", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-l", mot: "L", theme: "alphabet", niveau: 1,
    desc: "Pouce et index tendus en forme de L, les autres doigts repliés. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/l",
    images: [ { d: { cfg: "L", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-m", mot: "M", theme: "alphabet", niveau: 1,
    desc: "Index, majeur et annulaire tendus et serrés, pouce et auriculaire repliés. Les doigts pointent sur le côté, vers l'intérieur, et le dos de la main est tourné vers la personne en face.",
    astuce: "Trois doigts couchés = les trois jambages du m.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/m",
    images: [ { d: { cfg: "M", at: "dactylo", paume: "arriere", doigts: "dedans" }, visage: "neutre" } ]
  },
  {
    id: "lettre-n", mot: "N", theme: "alphabet", niveau: 1,
    desc: "Index et majeur tendus et serrés, les autres doigts repliés. Les doigts pointent sur le côté, vers l'intérieur, dos de la main vers la personne en face.",
    astuce: "Deux doigts couchés = les deux jambages du n.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/n",
    images: [ { d: { cfg: "U", at: "dactylo", paume: "arriere", doigts: "dedans" }, visage: "neutre" } ]
  },
  {
    id: "lettre-o", mot: "O", theme: "alphabet", niveau: 1,
    desc: "Arrondis tous les doigts jusqu'à ce qu'ils touchent le pouce : la main forme un rond. Main de profil.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/o",
    images: [ { d: { cfg: "O", at: "dactylo", paume: "dedans", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-p", mot: "P", theme: "alphabet", niveau: 1,
    desc: "Fais la forme du K (index tendu, majeur vers l'avant, pouce entre les deux), puis plie le poignet vers l'avant et le bas, comme un petit hochement de tête.",
    astuce: "Un K qui fait « oui » de la tête.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/p",
    images: [
      { d: { cfg: "K", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "K", at: "dactylo", off: [0, -10, 10], paume: "bas", doigts: "avant" }, t: 350, arc: 10 }
    ]
  },
  {
    id: "lettre-q", mot: "Q", theme: "alphabet", niveau: 1,
    desc: "Index tendu et pouce allongé à côté de lui, les autres doigts repliés, la main pointée vers le bas (vue de profil).",
    astuce: "C'est le G, mais tourné vers le bas.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/q",
    images: [ { d: { cfg: { doigts: ["t", "p", "p", "p"], ecart: 0, pouce: "cote" }, at: "dactylo", off: [0, -10, 0], paume: "arriere", doigts: "bas" }, visage: "neutre" } ]
  },
  {
    id: "lettre-r", mot: "R", theme: "alphabet", niveau: 1,
    desc: "Croise le majeur par-dessus l'index, les deux tendus vers le haut ; les autres doigts sont repliés.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/r",
    images: [ { d: { cfg: "R", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-s", mot: "S", theme: "alphabet", niveau: 1,
    desc: "Poing fermé, le pouce posé devant les doigts repliés. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/s",
    images: [ { d: { cfg: "poing", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-t", mot: "T", theme: "alphabet", niveau: 1,
    desc: "Majeur, annulaire et auriculaire tendus et écartés. L'index est plié à la base et pointe vers l'intérieur ; le bout du pouce le touche par en dessous (côté intérieur de l'index).",
    astuce: "Comme le F, mais le pouce passe de l'autre côté de l'index.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/t",
    images: [ { d: { cfg: { doigts: ["b", "t", "t", "t"], ecart: 12, pouce: "touche_index" }, at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-u", mot: "U", theme: "alphabet", niveau: 1,
    desc: "Index et majeur tendus vers le haut, collés l'un à l'autre ; pouce sur les doigts repliés.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/u",
    images: [ { d: { cfg: "U", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-v", mot: "V", theme: "alphabet", niveau: 1,
    desc: "Index et majeur tendus vers le haut et écartés en V ; pouce sur les doigts repliés.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/v",
    images: [ { d: { cfg: "V", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-w", mot: "W", theme: "alphabet", niveau: 1,
    desc: "Index, majeur et annulaire tendus et écartés ; le pouce tient l'auriculaire replié.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/w",
    images: [ { d: { cfg: "W", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-x", mot: "X", theme: "alphabet", niveau: 1,
    desc: "Fais un V puis plie l'index et le majeur en crochet. Les autres doigts sont repliés sous le pouce.",
    astuce: "En LSF le X se fait avec deux doigts crochus, pas un seul comme en ASL.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/x",
    images: [ { d: { cfg: "V_plie", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-y", mot: "Y", theme: "alphabet", niveau: 1,
    desc: "Pouce et auriculaire tendus et écartés, les trois autres doigts repliés. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/y",
    images: [ { d: { cfg: "Y", at: "dactylo", paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "lettre-z", mot: "Z", theme: "alphabet", niveau: 1,
    desc: "Index tendu, trace un Z dans l'air comme si tu l'écrivais : un trait vers la droite, une diagonale vers le bas à gauche, puis un trait vers la droite.",
    astuce: "Tu écris le Z pour toi : la personne en face le voit à l'envers.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/z",
    images: [
      { d: { cfg: "index", at: "dactylo", off: [-25, 18, 0], paume: "avant", doigts: "haut" }, visage: "concentre" },
      { d: { cfg: "index", at: "dactylo", off: [12, 18, 0], paume: "avant", doigts: "haut" }, t: 300 },
      { d: { cfg: "index", at: "dactylo", off: [-25, -14, 0], paume: "avant", doigts: "haut" }, t: 350 },
      { d: { cfg: "index", at: "dactylo", off: [12, -14, 0], paume: "avant", doigts: "haut" }, t: 300 }
    ]
  },

  // ───────────── NOMBRES 0 à 10 ─────────────

  {
    id: "nombre-0", mot: "0", theme: "nombres", niveau: 1,
    syn: ["zéro", "zero"],
    desc: "Arrondis tous les doigts contre le pouce pour former un rond (comme la lettre O), main de profil.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/zero",
    images: [ { d: { cfg: "O", at: "neutre_dom", off: [0, 25, 0], paume: "dedans", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "nombre-1", mot: "1", theme: "nombres", niveau: 1,
    syn: ["un", "une"],
    desc: "Poing fermé, seul le pouce est levé vers le haut. En LSF, on commence à compter par le pouce.",
    astuce: "Comme le geste « super ».",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/un",
    images: [ { d: { cfg: "pouce", at: "neutre_dom", off: [0, 25, 0], paume: "dedans", doigts: "avant" }, visage: "neutre" } ]
  },
  {
    id: "nombre-2", mot: "2", theme: "nombres", niveau: 1,
    syn: ["deux"],
    desc: "Pouce et index tendus (forme de L), les autres doigts repliés. Paume vers l'avant.",
    astuce: "On ajoute l'index au pouce du 1.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/deux",
    images: [ { d: { cfg: "L", at: "neutre_dom", off: [0, 25, 0], paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "nombre-3", mot: "3", theme: "nombres", niveau: 1,
    syn: ["trois"],
    desc: "Pouce, index et majeur tendus, annulaire et auriculaire repliés. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/trois",
    images: [ { d: { cfg: "3", at: "neutre_dom", off: [0, 25, 0], paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "nombre-4", mot: "4", theme: "nombres", niveau: 1,
    syn: ["quatre"],
    desc: "Les quatre doigts tendus et écartés, le pouce replié dans la paume. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/quatre",
    images: [ { d: { cfg: "4", at: "neutre_dom", off: [0, 25, 0], paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "nombre-5", mot: "5", theme: "nombres", niveau: 1,
    syn: ["cinq"],
    desc: "Main ouverte, les cinq doigts tendus et écartés. Paume vers l'avant.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/cinq",
    images: [ { d: { cfg: "5", at: "neutre_dom", off: [0, 25, 0], paume: "avant", doigts: "haut" }, visage: "neutre" } ]
  },
  {
    id: "nombre-6", mot: "6", theme: "nombres", niveau: 1,
    syn: ["six"],
    desc: "Deux mains : la main gauche montre 5 (main ouverte, paume vers l'avant) et la main droite montre 1 (pouce levé). 5 + 1 = 6.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/six",
    images: [ {
      d:  { cfg: "pouce", at: "neutre_dom", off: [0, 20, 0], paume: "dedans", doigts: "avant" },
      nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
      visage: "neutre"
    } ]
  },
  {
    id: "nombre-7", mot: "7", theme: "nombres", niveau: 1,
    syn: ["sept"],
    desc: "Deux mains : la main gauche montre 5 (main ouverte) et la main droite montre 2 (pouce et index tendus). 5 + 2 = 7.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/sept",
    images: [ {
      d:  { cfg: "L", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" },
      nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
      visage: "neutre"
    } ]
  },
  {
    id: "nombre-8", mot: "8", theme: "nombres", niveau: 1,
    syn: ["huit"],
    desc: "Deux mains : la main gauche montre 5 (main ouverte) et la main droite montre 3 (pouce, index et majeur tendus). 5 + 3 = 8.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/huit",
    images: [ {
      d:  { cfg: "3", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" },
      nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
      visage: "neutre"
    } ]
  },
  {
    id: "nombre-9", mot: "9", theme: "nombres", niveau: 1,
    syn: ["neuf"],
    desc: "Deux mains : la main gauche montre 5 (main ouverte) et la main droite montre 4 (quatre doigts tendus, pouce replié). 5 + 4 = 9.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/neuf",
    images: [ {
      d:  { cfg: "4", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" },
      nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
      visage: "neutre"
    } ]
  },
  {
    id: "nombre-10", mot: "10", theme: "nombres", niveau: 1,
    syn: ["dix"],
    desc: "Les deux mains ouvertes, doigts écartés, paumes vers l'avant à hauteur des épaules ; fais tourner un peu les poignets deux fois.",
    astuce: "Tes dix doigts, bien montrés.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/dix",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "5", at: "neutre_dom", off: [5, 25, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre_dom", off: [5, 25, 0], paume: "avant-dedans", doigts: "haut" }, t: 220 }
    ]
  },

  // ───────────── NOMBRES 11 à 20 ─────────────
  // 11 à 15 : la forme de 1 à 5 avec une rotation du poignet.
  // 16 à 19 : 10 puis 6, 7, 8 ou 9.

  {
    id: "nombre-11", mot: "11", theme: "nombres", niveau: 2,
    syn: ["onze"],
    desc: "Fais le 1 (pouce levé) et tourne le poignet : le pouce part vers le bas et l'intérieur, puis remonte vers le haut.",
    astuce: "De 11 à 15 : la forme de 1 à 5 qui tourne.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/onze",
    images: [
      { d: { cfg: "pouce", at: "neutre_dom", off: [5, 20, 0], paume: "avant", doigts: "dedans-haut" }, visage: "neutre" },
      { d: { cfg: "pouce", at: "neutre_dom", off: [5, 24, 0], paume: "dehors-haut", doigts: "dedans-haut" }, t: 200 },
      { d: { cfg: "pouce", at: "neutre_dom", off: [5, 28, 0], paume: "arriere", doigts: "dedans-haut" }, t: 200 }
    ]
  },
  {
    id: "nombre-12", mot: "12", theme: "nombres", niveau: 2,
    syn: ["douze"],
    desc: "Fais le 2 (pouce et index tendus) et tourne le poignet d'un coup, de la paume vers l'avant à la paume vers toi.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/douze",
    images: [
      { d: { cfg: "L", at: "neutre_dom", off: [5, 20, 0], paume: "avant", doigts: "dedans-haut" }, visage: "neutre" },
      { d: { cfg: "L", at: "neutre_dom", off: [5, 24, 0], paume: "dehors-haut", doigts: "dedans-haut" }, t: 200 },
      { d: { cfg: "L", at: "neutre_dom", off: [5, 28, 0], paume: "arriere", doigts: "dedans-haut" }, t: 200 }
    ]
  },
  {
    id: "nombre-13", mot: "13", theme: "nombres", niveau: 2,
    syn: ["treize"],
    desc: "Fais le 3 (pouce, index et majeur tendus) et tourne le poignet d'un coup, de la paume vers l'avant à la paume vers toi.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/treize",
    images: [
      { d: { cfg: "3", at: "neutre_dom", off: [5, 20, 0], paume: "avant", doigts: "dedans-haut" }, visage: "neutre" },
      { d: { cfg: "3", at: "neutre_dom", off: [5, 24, 0], paume: "dehors-haut", doigts: "dedans-haut" }, t: 200 },
      { d: { cfg: "3", at: "neutre_dom", off: [5, 28, 0], paume: "arriere", doigts: "dedans-haut" }, t: 200 }
    ]
  },
  {
    id: "nombre-14", mot: "14", theme: "nombres", niveau: 2,
    syn: ["quatorze"],
    desc: "Fais le 4 (quatre doigts tendus, pouce replié) et tourne le poignet d'un coup, de la paume vers l'avant à la paume vers toi.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/quatorze",
    images: [
      { d: { cfg: "4", at: "neutre_dom", off: [5, 20, 0], paume: "avant", doigts: "dedans-haut" }, visage: "neutre" },
      { d: { cfg: "4", at: "neutre_dom", off: [5, 24, 0], paume: "dehors-haut", doigts: "dedans-haut" }, t: 200 },
      { d: { cfg: "4", at: "neutre_dom", off: [5, 28, 0], paume: "arriere", doigts: "dedans-haut" }, t: 200 }
    ]
  },
  {
    id: "nombre-15", mot: "15", theme: "nombres", niveau: 2,
    syn: ["quinze"],
    desc: "Fais le 5 (main ouverte, doigts écartés) et tourne le poignet d'un coup, de la paume vers l'avant à la paume vers toi.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/quinze",
    images: [
      { d: { cfg: "5", at: "neutre_dom", off: [5, 20, 0], paume: "avant", doigts: "dedans-haut" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre_dom", off: [5, 24, 0], paume: "dehors-haut", doigts: "dedans-haut" }, t: 200 },
      { d: { cfg: "5", at: "neutre_dom", off: [5, 28, 0], paume: "arriere", doigts: "dedans-haut" }, t: 200 }
    ]
  },
  {
    id: "nombre-16", mot: "16", theme: "nombres", niveau: 2,
    syn: ["seize"],
    desc: "Montre 10 (les deux mains ouvertes), puis 6 : la main gauche reste ouverte et la main droite ne garde que le pouce levé.",
    astuce: "16 = 10 puis 6.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/seize",
    images: [
      {
        d:  { cfg: "5", at: "neutre_dom", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        visage: "neutre", pause: 250
      },
      {
        d:  { cfg: "pouce", at: "neutre_dom", off: [0, 15, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 15, 0], paume: "avant", doigts: "haut" },
        t: 400
      }
    ]
  },
  {
    id: "nombre-17", mot: "17", theme: "nombres", niveau: 2,
    syn: ["dix-sept"],
    desc: "Montre 10 (les deux mains ouvertes), puis 7 : la main gauche reste ouverte et la main droite fait le 2 (pouce et index).",
    astuce: "17 = 10 puis 7.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/dix-sept",
    images: [
      {
        d:  { cfg: "5", at: "neutre_dom", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        visage: "neutre", pause: 250
      },
      {
        d:  { cfg: "L", at: "neutre_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 15, 0], paume: "avant", doigts: "haut" },
        t: 400
      }
    ]
  },
  {
    id: "nombre-18", mot: "18", theme: "nombres", niveau: 2,
    syn: ["dix-huit"],
    desc: "Montre 10 (les deux mains ouvertes), puis 8 : la main gauche reste ouverte et la main droite fait le 3 (pouce, index, majeur).",
    astuce: "18 = 10 puis 8.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/dix-huit",
    images: [
      {
        d:  { cfg: "5", at: "neutre_dom", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        visage: "neutre", pause: 250
      },
      {
        d:  { cfg: "3", at: "neutre_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 15, 0], paume: "avant", doigts: "haut" },
        t: 400
      }
    ]
  },
  {
    id: "nombre-19", mot: "19", theme: "nombres", niveau: 2,
    syn: ["dix-neuf"],
    desc: "Montre 10 (les deux mains ouvertes), puis 9 : la main gauche reste ouverte et la main droite fait le 4 (quatre doigts, pouce replié).",
    astuce: "19 = 10 puis 9.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/dix-neuf",
    images: [
      {
        d:  { cfg: "5", at: "neutre_dom", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [5, 25, 0], paume: "avant", doigts: "haut" },
        visage: "neutre", pause: 250
      },
      {
        d:  { cfg: "4", at: "neutre_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 15, 0], paume: "avant", doigts: "haut" },
        t: 400
      }
    ]
  },

  // ───────────── DIZAINES, 100, 1000 ─────────────
  // Les dizaines : la forme du chiffre, puis les doigts tendus se plient (vers le pouce).

  {
    id: "nombre-20", mot: "20", theme: "nombres", niveau: 2,
    syn: ["vingt"],
    desc: "Fais le 2 (pouce et index tendus) à hauteur d'épaule, puis plie l'index jusqu'à toucher le bout du pouce.",
    astuce: "Les dizaines : le chiffre, puis les doigts se plient.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/vingt",
    images: [
      { d: { cfg: "L", at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: { doigts: ["o", "p", "p", "p"], ecart: 0, pouce: "touche_index" }, at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, t: 250, contact: true }
    ]
  },
  {
    id: "nombre-30", mot: "30", theme: "nombres", niveau: 3,
    syn: ["trente"],
    desc: "Fais le 3 (pouce, index, majeur tendus), puis plie l'index et le majeur jusqu'à toucher le pouce.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/trente",
    images: [
      { d: { cfg: "3", at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: { doigts: ["o", "o", "p", "p"], ecart: 0, pouce: "touche_index" }, at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, t: 250, contact: true }
    ]
  },
  {
    id: "nombre-40", mot: "40", theme: "nombres", niveau: 3,
    syn: ["quarante"],
    desc: "Fais le 4 (quatre doigts tendus, pouce replié), puis plie les quatre doigts en crochet.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/quarante",
    images: [
      { d: { cfg: "4", at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: { doigts: ["x", "x", "x", "x"], ecart: 8, pouce: "replie" }, at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "nombre-50", mot: "50", theme: "nombres", niveau: 3,
    syn: ["cinquante"],
    desc: "Fais le 5 (main ouverte, doigts écartés), puis plie les doigts en crochet, comme une griffe.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/cinquante",
    images: [
      { d: { cfg: "5", at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "griffe", at: "neutre_dom", off: [5, 30, 0], paume: "avant", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "nombre-60", mot: "60", theme: "nombres", niveau: 3,
    syn: ["soixante"],
    desc: "Fais le 6 (main gauche ouverte, pouce droit levé), puis replie le pouce droit sur le poing.",
    astuce: "60 = le 6 qui se plie, comme toutes les dizaines.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/soixante",
    images: [
      {
        d:  { cfg: "pouce", at: "neutre_dom", off: [0, 20, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
        visage: "neutre"
      },
      { d: { cfg: "poing", at: "neutre_dom", off: [0, 20, 0], paume: "dedans", doigts: "avant" }, t: 250 }
    ]
  },
  {
    id: "nombre-70", mot: "70", theme: "nombres", niveau: 3,
    syn: ["soixante-dix", "septante"],
    desc: "Fais le 7 (main gauche ouverte, main droite en 2), puis plie l'index droit jusqu'à toucher le pouce.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/soixante-dix",
    images: [
      {
        d:  { cfg: "L", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
        visage: "neutre"
      },
      { d: { cfg: { doigts: ["o", "p", "p", "p"], ecart: 0, pouce: "touche_index" }, at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" }, t: 250, contact: true }
    ]
  },
  {
    id: "nombre-80", mot: "80", theme: "nombres", niveau: 3,
    syn: ["quatre-vingts", "quatre-vingt", "huitante", "octante"],
    desc: "Fais le 8 (main gauche ouverte, main droite en 3), puis plie l'index et le majeur droits jusqu'à toucher le pouce.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/quatre-vingt",
    images: [
      {
        d:  { cfg: "3", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
        visage: "neutre"
      },
      { d: { cfg: { doigts: ["o", "o", "p", "p"], ecart: 0, pouce: "touche_index" }, at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" }, t: 250, contact: true }
    ]
  },
  {
    id: "nombre-90", mot: "90", theme: "nombres", niveau: 3,
    syn: ["quatre-vingt-dix", "nonante"],
    desc: "Fais le 9 (main gauche ouverte, main droite en 4), puis plie les quatre doigts droits en crochet.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/quatre-vingt-dix",
    images: [
      {
        d:  { cfg: "4", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_non", off: [0, 20, 0], paume: "avant", doigts: "haut" },
        visage: "neutre"
      },
      { d: { cfg: { doigts: ["x", "x", "x", "x"], ecart: 8, pouce: "replie" }, at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "nombre-100", mot: "100", theme: "nombres", niveau: 3,
    syn: ["cent"],
    desc: "Main en C devant la poitrine, puis monte-la vers l'extérieur jusqu'à hauteur d'épaule, du côté de ta main.",
    astuce: "C comme Cent.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/cent",
    images: [
      { d: { cfg: "C", at: "neutre", off: [-5, -10, 0], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "C", at: "neutre_dom", off: [15, 35, 0], paume: "avant-dedans", doigts: "haut" }, t: 450, arc: 15 }
    ]
  },
  {
    id: "nombre-1000", mot: "1000", theme: "nombres", niveau: 3,
    syn: ["mille"],
    desc: "Main gauche plate et verticale, paume vers la droite. Main droite plate, paume vers le bas : viens poser le bout de ses doigts dans la paume gauche.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/mille",
    images: [
      {
        d:  { cfg: "plate", at: "neutre_dom", off: [10, 0, 0], paume: "bas", doigts: "dedans" },
        nd: { cfg: "plate", at: "neutre", off: [-10, 0, 0], paume: "dedans", doigts: "haut" },
        visage: "neutre"
      },
      { d: { cfg: "plate", at: "nd:paume", touch: "doigts", off: [5, 0, 0], paume: "bas", doigts: "dedans" }, t: 350, contact: "nd" }
    ]
  }

]);
