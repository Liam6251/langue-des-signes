// Signes LSF : école, maison, objets, vêtements, couleurs.
// Sources principales : chaîne « Dicoplus LSF » (descriptions écrites : configuration, emplacement,
// mouvement, répétitions), livret de cours LSF de cypris.fr, dictionnaire Anna Sign Language.
// Notes de recherche : notes/research/ecole-maison.md
LSF.ajouter([

  // ───────────────────────────── ÉCOLE ─────────────────────────────

  {
    id: "ecole", mot: "École", theme: "ecole", niveau: 1,
    syn: ["scolaire"],
    desc: "Fais un L avec chaque main (pouce et index tendus), paumes face à face, à hauteur des épaules. Descends les deux mains ensemble.",
    astuce: "Tes deux L dessinent les murs du bâtiment de l'école.",
    sym: true,
    fiable: "probable", source: "https://www.youtube.com/watch?v=n58LVs7fqw0",
    images: [
      { d: { cfg: "L", at: "epaule_dom", off: [0, 25, 45], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "L", at: "epaule_dom", off: [0, -40, 50], paume: "dedans", doigts: "haut" }, t: 550 }
    ]
  },

  {
    id: "livre", mot: "Livre", theme: "ecole", niveau: 1,
    syn: ["bouquin", "lecture"],
    desc: "Colle tes deux mains plates paume contre paume devant toi, puis ouvre-les comme un livre, en gardant le bas des mains collé. Fais-le deux fois.",
    astuce: "Tes mains sont les pages d'un livre qui s'ouvre.",
    sym: true, rep: 2,
    fiable: "sur", source: "https://www.youtube.com/watch?v=-amDBZ2-6Ow",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [3, 0, 0], paume: "dedans", doigts: "avant" }, contact: "deux" },
      { d: { cfg: "plate", at: "neutre", off: [35, -10, 0], paume: "haut", doigts: "avant" }, t: 400 }
    ]
  },

  {
    id: "cahier", mot: "Cahier", theme: "ecole", niveau: 2,
    syn: ["carnet", "cahier de textes"],
    desc: "Colle tes deux mains plates paume contre paume devant toi, puis ouvre-les à moitié en gardant le côté des petits doigts collé, comme un cahier qu'on consulte.",
    astuce: "Presque comme « livre », mais tu ouvres moins grand et une seule fois.",
    sym: true,
    fiable: "probable", source: "https://www.annasignlanguage.com/fr/dictionnaire-lsf/cahier-en-lsf",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [3, 0, 0], paume: "dedans", doigts: "avant" }, contact: "deux" },
      { d: { cfg: "plate", at: "neutre", off: [20, -5, 0], paume: "haut-dedans", doigts: "avant" }, t: 450 }
    ]
  },

  {
    id: "stylo", mot: "Stylo", theme: "ecole", niveau: 1,
    syn: ["bic", "stylo-bille"],
    desc: "Ta main gauche est plate, paume vers le haut : c'est la feuille. Ta main droite tient un stylo imaginaire (pouce et index serrés) et écrit quelques petits traits dessus.",
    astuce: "Tu fais semblant d'écrire sur ta main.",
    fiable: "probable", source: "https://www.annasignlanguage.com/fr/dictionnaire-lsf/stylo-en-lsf",
    images: [
      {
        d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [-12, 3, 10], paume: "dedans", doigts: "avant-bas-dedans" },
        nd: { cfg: "plate", at: "neutre_non", off: [0, 0, 30], paume: "haut", doigts: "avant" },
        contact: true
      },
      { d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [10, 3, 4], paume: "dedans", doigts: "avant-bas-dedans" }, t: 250 },
      { d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [-10, 3, -6], paume: "dedans", doigts: "avant-bas-dedans" }, t: 250 },
      { d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [12, 3, -12], paume: "dedans", doigts: "avant-bas-dedans" }, t: 250 }
    ]
  },

  {
    id: "crayon", mot: "Crayon", theme: "ecole", niveau: 2,
    syn: ["crayon de papier", "tailler"],
    desc: "Fais un V avec ta main gauche. Glisse ton index droit au creux du V et remue-le de gauche à droite.",
    astuce: "Comme si tu taillais ton crayon dans un taille-crayon.",
    rep: 3,
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      {
        d: { cfg: "index", at: "nd:paume", touch: "index", off: [-8, 30, -5], paume: "bas", doigts: "avant" },
        nd: { cfg: "V", at: "neutre_non", paume: "arriere", doigts: "haut" },
        contact: true
      },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [8, 30, -5], paume: "bas", doigts: "avant" }, t: 200 }
    ]
  },

  {
    id: "dessiner", mot: "Dessiner", theme: "ecole", niveau: 2,
    syn: ["dessin", "arts plastiques"],
    desc: "Ta main gauche est ouverte devant toi, paume vers toi, comme une feuille. Ta main droite en V, doigts vers le bas, descend en ondulant le long de ta paume.",
    astuce: "Ton V trace des vagues sur la feuille.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      {
        d: { cfg: "V", at: "nd:paume", touch: "doigts", off: [-8, 25, -12], paume: "avant", doigts: "bas-dedans" },
        nd: { cfg: "plate", at: "neutre_non", paume: "arriere", doigts: "haut" }
      },
      { d: { cfg: "V", at: "nd:paume", touch: "doigts", off: [8, 8, -12], paume: "avant", doigts: "bas-dedans" }, t: 230 },
      { d: { cfg: "V", at: "nd:paume", touch: "doigts", off: [-8, -8, -12], paume: "avant", doigts: "bas-dedans" }, t: 230 },
      { d: { cfg: "V", at: "nd:paume", touch: "doigts", off: [8, -25, -12], paume: "avant", doigts: "bas-dedans" }, t: 230 }
    ]
  },

  {
    id: "bibliotheque", mot: "Bibliothèque", theme: "ecole", niveau: 3,
    syn: ["CDI", "médiathèque", "étagère"],
    desc: "Tes deux mains plates se font face devant toi, assez proches, puis s'écartent l'une de l'autre, comme pour montrer une longue rangée de livres.",
    astuce: "Tu montres toute une étagère remplie de livres.",
    sym: true,
    fiable: "probable", source: "https://www.youtube.com/watch?v=5bdBMYtfto4",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [12, 0, 0], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "plate", at: "neutre", off: [60, 0, 0], paume: "dedans", doigts: "haut" }, t: 700 }
    ]
  },

  {
    id: "vacances", mot: "Vacances", theme: "ecole", niveau: 1,
    syn: ["congés", "être en vacances"],
    desc: "Croise les bras devant toi et tapote deux fois tes épaules avec tes mains en V.",
    astuce: "Tu te serres dans tes bras : enfin du repos !",
    sym: true, rep: 2,
    fiable: "sur", source: "https://www.youtube.com/watch?v=GEHp2w9C7JA",
    images: [
      { d: { cfg: "V", at: "epaule_non", touch: "doigts", off: [0, 0, 25], paume: "arriere", doigts: "haut-dedans" }, visage: "sourire" },
      { d: { cfg: "V", at: "epaule_non", touch: "doigts", off: [0, 0, 2], paume: "arriere", doigts: "haut-dedans" }, t: 220, contact: "deux" }
    ]
  },

  {
    id: "maths", mot: "Maths", theme: "ecole", niveau: 2,
    syn: ["mathématiques", "calcul"],
    desc: "Ferme tes deux poings devant ta poitrine, paumes vers toi, et descends-les ensemble jusqu'au ventre.",
    sym: true,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=6fw_5x_vHwc",
    images: [
      { d: { cfg: "poing", at: "poitrine_dom", off: [0, 10, 20], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "poing", at: "ventre_dom", off: [0, 0, 20], paume: "arriere", doigts: "dedans" }, t: 500 }
    ]
  },

  {
    id: "francais", mot: "Français", theme: "ecole", niveau: 2,
    syn: ["France", "langue française", "cours de français"],
    desc: "Pose ta main ouverte, doigts écartés, sur le haut de ta poitrine, puis écarte-la vers l'avant. Deux fois.",
    rep: 2,
    fiable: "probable", source: "https://www.youtube.com/watch?v=3nV_Wl-voAU",
    images: [
      { d: { cfg: "5", at: "poitrine", touch: "paume", off: [5, 10, 4], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "5", at: "poitrine", touch: "paume", off: [20, 0, 45], paume: "arriere", doigts: "dedans" }, t: 300 }
    ]
  },

  // ───────────────────────────── MAISON ─────────────────────────────

  {
    id: "maison", mot: "Maison", theme: "maison", niveau: 1,
    syn: ["chez moi", "domicile", "foyer"],
    desc: "Penche tes deux mains plates l'une vers l'autre et fais toucher le bout des doigts devant toi, deux fois, pour dessiner un toit.",
    astuce: "Tes mains forment le toit de la maison.",
    sym: true, rep: 2,
    fiable: "sur", source: "https://www.youtube.com/watch?v=htCAeSq5Jaw",
    images: [
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" } },
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" }, t: 220, contact: "deux" }
    ]
  },

  {
    id: "appartement", mot: "Appartement", theme: "maison", niveau: 2,
    syn: ["appart", "immeuble"],
    desc: "Fais un 3 avec ta main (pouce, index et majeur tendus), paume vers le bas, et descends-la deux fois devant toi, comme des étages.",
    astuce: "Tu montres les étages de l'immeuble.",
    rep: 2,
    fiable: "probable", source: "https://www.youtube.com/watch?v=bMXUTv2d_BU",
    images: [
      { d: { cfg: "3", at: "neutre_dom", off: [0, 35, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "3", at: "neutre_dom", off: [0, -10, 0], paume: "bas", doigts: "avant" }, t: 400 }
    ]
  },

  {
    id: "chambre", mot: "Chambre", theme: "maison", niveau: 2,
    syn: ["ma chambre", "chambre à coucher"],
    desc: "Tapote trois fois ta joue avec le dos de ta main ouverte.",
    astuce: "La joue, c'est là où tu poses la tête pour dormir.",
    rep: 3,
    fiable: "probable", source: "https://www.youtube.com/watch?v=zv7VyAPsTVA",
    images: [
      { d: { cfg: "5", at: "joue_dom", touch: "dos", off: [15, 0, 0], paume: "dehors", doigts: "haut" } },
      { d: { cfg: "5", at: "joue_dom", touch: "dos", off: [0, 0, 0], paume: "dehors", doigts: "haut" }, t: 180, contact: true }
    ]
  },

  {
    id: "cuisine", mot: "Cuisine", theme: "maison", niveau: 2,
    syn: ["cuisiner", "faire à manger"],
    desc: "Ta main gauche en C tient une casserole. Avec ta main droite, pouce et index serrés, tourne une cuillère imaginaire au-dessus.",
    astuce: "Tu remues la sauce dans la casserole.",
    rep: 2,
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      {
        d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [20, 30, 12], paume: "arriere", doigts: "bas" },
        nd: { cfg: "C", at: "neutre_non", off: [0, -10, 0], paume: "dedans", doigts: "avant" }
      },
      { d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [32, 30, 0], paume: "arriere", doigts: "bas" }, t: 200 },
      { d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [20, 30, -12], paume: "arriere", doigts: "bas" }, t: 200 },
      { d: { cfg: "pince_fermee", at: "nd:paume", touch: "index", off: [8, 30, 0], paume: "arriere", doigts: "bas" }, t: 200 }
    ]
  },

  {
    id: "douche", mot: "Douche", theme: "maison", niveau: 2,
    syn: ["se doucher", "salle de bain", "prendre une douche"],
    desc: "Lève ta main au-dessus de ta tête, doigts serrés en O vers le bas, puis ouvre grand les doigts, comme l'eau qui sort du pommeau.",
    astuce: "Ta main est le pommeau de douche.",
    rep: 2,
    fiable: "probable", source: "https://www.youtube.com/watch?v=oLc9-9ibfq8",
    images: [
      { d: { cfg: "O", at: "tete", off: [30, 25, 25], paume: "dedans", doigts: "bas-avant" } },
      { d: { cfg: "5", at: "tete", off: [30, 25, 25], paume: "dedans", doigts: "bas-avant" }, t: 250, agiter: true }
    ]
  },

  {
    id: "bain", mot: "Bain", theme: "maison", niveau: 3,
    syn: ["baignoire", "prendre un bain"],
    desc: "Tes deux mains ouvertes, paumes vers le bas, montent devant toi du ventre jusqu'à la poitrine, comme l'eau qui monte dans la baignoire.",
    sym: true,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=JkVjXC0Bb0Q",
    images: [
      { d: { cfg: "5", at: "neutre_bas", off: [25, -10, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "5", at: "neutre", off: [25, 5, 0], paume: "bas", doigts: "avant" }, t: 700 }
    ]
  },

  {
    id: "toilettes", mot: "Toilettes", theme: "maison", niveau: 1,
    syn: ["WC", "toilette", "cabinets", "petit coin"],
    desc: "Fais la lettre W (index, majeur et annulaire tendus) puis la lettre C, sur le côté.",
    astuce: "Ce sont juste les lettres W et C, comme sur les portes des toilettes !",
    fiable: "sur", source: "https://www.youtube.com/watch?v=cxJ-1Vrc7yI",
    images: [
      { d: { cfg: "W", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, pause: 200 },
      { d: { cfg: "C", at: "cote_epaule_dom", paume: "dedans", doigts: "haut" }, t: 300, pause: 200 }
    ]
  },

  {
    id: "table", mot: "Table", theme: "maison", niveau: 1,
    syn: ["bureau", "surface"],
    desc: "Pose tes deux mains plates côte à côte devant toi, paumes vers le bas, puis écarte-les droit sur les côtés.",
    astuce: "Tu caresses le plateau bien plat d'une table.",
    sym: true,
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [24, -5, 0], paume: "bas", doigts: "avant" }, contact: "deux" },
      { d: { cfg: "plate", at: "neutre", off: [70, -5, 0], paume: "bas", doigts: "avant" }, t: 600 }
    ]
  },

  {
    id: "porte", mot: "Porte", theme: "maison", niveau: 2,
    syn: ["ouvrir la porte"],
    desc: "Mets tes deux mains plates côte à côte, paumes vers l'avant. Ta main droite pivote vers toi, comme une porte qui s'ouvre.",
    astuce: "Ta main droite est la porte, son bord extérieur est la charnière.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/porte",
    images: [
      {
        d: { cfg: "plate", at: "neutre", off: [22, 10, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "plate", at: "neutre", off: [22, 10, 0], paume: "avant", doigts: "haut" }
      },
      { d: { cfg: "plate", at: "neutre", off: [40, 10, -20], paume: "dedans", doigts: "haut" }, t: 550 }
    ]
  },

  {
    id: "fenetre", mot: "Fenêtre", theme: "maison", niveau: 2,
    syn: ["ouvrir la fenêtre"],
    desc: "Mets tes deux mains en U (index et majeur serrés) à l'horizontale devant toi, paumes vers toi, bouts des doigts face à face. Ouvre-les vers l'avant comme deux battants. Deux fois.",
    astuce: "Tes mains sont les deux battants de la fenêtre.",
    sym: true, rep: 2,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=pHOjspPJu3U",
    images: [
      { d: { cfg: "U", at: "neutre_haut", off: [30, 0, 0], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "U", at: "neutre_haut", off: [35, 0, 20], paume: "arriere-dedans", doigts: "avant-dedans" }, t: 400 }
    ]
  },

  {
    id: "habiter", mot: "Habiter", theme: "maison", niveau: 1,
    syn: ["vivre à", "j'habite", "résider", "domicile"],
    desc: "Ferme tes deux poings, pouce devant les doigts, paumes vers l'avant, et descends-les ensemble d'un coup devant toi.",
    astuce: "Tu poses tes affaires ici : c'est là que tu habites.",
    sym: true,
    fiable: "probable", source: "https://www.youtube.com/watch?v=XJFl7ff0K0k",
    images: [
      { d: { cfg: "poing", at: "neutre", off: [25, 30, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "poing", at: "neutre", off: [25, -10, 0], paume: "avant", doigts: "haut" }, t: 400 }
    ]
  },

  {
    id: "jardin", mot: "Jardin", theme: "maison", niveau: 3,
    syn: ["potager", "cour"],
    desc: "Fais un V avec chaque main, paumes vers toi, et fais-les se toucher trois fois devant toi.",
    astuce: "Tes doigts croisés forment la petite clôture du jardin.",
    sym: true, rep: 3,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=XQQMqergPio",
    images: [
      { d: { cfg: "V", at: "neutre", off: [22, 0, 0], paume: "arriere", doigts: "haut-dedans" } },
      { d: { cfg: "V", at: "neutre", off: [8, 0, 0], paume: "arriere", doigts: "haut-dedans" }, t: 180, contact: "deux" }
    ]
  },

  {
    id: "ascenseur", mot: "Ascenseur", theme: "maison", niveau: 3,
    syn: ["monter en ascenseur"],
    desc: "Ferme tes deux poings, pouce contre l'index, paumes vers toi, et fais-les monter ensemble lentement devant toi, comme la cabine.",
    sym: true,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=o9HBjE7Oyz4",
    images: [
      { d: { cfg: "A", at: "neutre_bas", off: [20, -10, 0], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "A", at: "neutre_haut", off: [20, -10, 0], paume: "arriere", doigts: "dedans" }, t: 900 }
    ]
  },

  // ───────────────────────────── OBJETS ─────────────────────────────

  {
    id: "argent", mot: "Argent", theme: "objets", niveau: 1,
    syn: ["sous", "fric", "euros", "monnaie"],
    desc: "Main droite paume vers le haut, frotte le bout de ton pouce contre le bout de tes doigts, comme si tu comptais des billets.",
    astuce: "Le geste de frotter des pièces ou des billets.",
    fiable: "sur", source: "https://www.youtube.com/watch?v=Pr-q6wMYJZQ",
    images: [
      { d: { cfg: "bec", at: "neutre_dom", off: [0, -5, 0], paume: "haut", doigts: "avant" } },
      { d: { cfg: "bec", at: "neutre_dom", off: [4, -5, 0], paume: "haut", doigts: "avant" }, t: 800, agiter: true }
    ]
  },

  {
    id: "cadeau", mot: "Cadeau", theme: "objets", niveau: 2,
    syn: ["présent", "paquet cadeau"],
    desc: "Tends tes deux index, paumes vers le bas : l'index droit descend, l'index gauche monte, et ils se croisent au milieu comme le ruban d'un paquet.",
    astuce: "Tes index forment la croix du ruban sur le paquet.",
    fiable: "probable", source: "https://www.youtube.com/watch?v=yrYAo02VwLY",
    images: [
      {
        d: { cfg: "index", at: "neutre", off: [10, 30, 0], paume: "bas", doigts: "avant" },
        nd: { cfg: "index", at: "neutre", off: [30, -25, 0], paume: "bas", doigts: "dedans" },
        visage: "sourire"
      },
      {
        d: { cfg: "index", at: "nd:index", touch: "paume", off: [-13, 8, -15], paume: "bas", doigts: "avant" },
        nd: { cfg: "index", at: "neutre", off: [30, 0, 0], paume: "bas", doigts: "dedans" },
        t: 450, contact: "deux"
      }
    ]
  },

  {
    id: "lunettes", mot: "Lunettes", theme: "objets", niveau: 2,
    syn: ["lunette", "lunettes de vue"],
    desc: "Fais un petit rond avec ton pouce et ton index, de chaque main, et place-les autour de tes yeux, deux fois.",
    astuce: "Tes doigts dessinent les verres de tes lunettes.",
    sym: true, rep: 2,
    fiable: "probable", source: "https://www.youtube.com/watch?v=iS4WWdM99iQ",
    images: [
      { d: { cfg: { doigts: ["c", "p", "p", "p"], ecart: 0, pouce: "ecarte" }, at: "oeil_dom", off: [28, 0, 30], paume: "dedans", doigts: "haut" } },
      { d: { cfg: { doigts: ["c", "p", "p", "p"], ecart: 0, pouce: "ecarte" }, at: "oeil_dom", off: [28, 0, 8], paume: "dedans", doigts: "haut" }, t: 220, contact: "deux" }
    ]
  },

  {
    id: "montre", mot: "Montre", theme: "objets", niveau: 1,
    syn: ["montre-bracelet"],
    desc: "Ferme ta main gauche, paume vers le bas. Tapote deux fois ton poignet gauche avec l'index et le majeur de ta main droite.",
    astuce: "Tu montres l'endroit où l'on porte sa montre.",
    rep: 2,
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      {
        d: { cfg: "U", at: "nd:poignet", touch: "doigts", off: [0, 22, 0], paume: "bas", doigts: "dedans-bas" },
        nd: { cfg: "poing", at: "neutre_non", paume: "bas", doigts: "dedans" }
      },
      { d: { cfg: "U", at: "nd:poignet", touch: "doigts", off: [0, 2, 0], paume: "bas", doigts: "dedans-bas" }, t: 200, contact: "nd" }
    ]
  },

  {
    id: "cle", mot: "Clé", theme: "objets", niveau: 2,
    syn: ["clef", "fermer à clé", "serrure"],
    desc: "Tiens une clé imaginaire entre ton pouce et ton index plié, enfonce-la devant toi, puis tourne le poignet comme pour ouvrir une serrure.",
    astuce: "Tu ouvres la porte avec ta clé.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { d: { cfg: "T", at: "neutre_dom", off: [0, 0, -15], paume: "dedans", doigts: "avant" } },
      { d: { cfg: "T", at: "neutre_dom", off: [0, 0, 8], paume: "dedans", doigts: "avant" }, t: 300 },
      { d: { cfg: "T", at: "neutre_dom", off: [0, 0, 8], paume: "bas", doigts: "avant" }, t: 280 },
      { d: { cfg: "T", at: "neutre_dom", off: [0, 0, 8], paume: "dedans", doigts: "avant" }, t: 250 },
      { d: { cfg: "T", at: "neutre_dom", off: [0, 0, 8], paume: "bas", doigts: "avant" }, t: 250 }
    ]
  },

  {
    id: "assiette", mot: "Assiette", theme: "objets", niveau: 3,
    syn: ["plat", "vaisselle"],
    desc: "Tes deux mains en bec ouvert partent ensemble devant toi et dessinent chacune la moitié d'un grand rond, pour se retrouver près de toi.",
    astuce: "Tu dessines le bord rond de l'assiette.",
    sym: true,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=R1jmM0t0nrU",
    images: [
      { d: { cfg: "bec_ouvert", at: "neutre_bas", off: [4, 0, 30], paume: "arriere", doigts: "haut" } },
      { d: { cfg: "bec_ouvert", at: "neutre_bas", off: [35, 0, 5], paume: "arriere", doigts: "haut" }, t: 350 },
      { d: { cfg: "bec_ouvert", at: "neutre_bas", off: [4, 0, -20], paume: "arriere", doigts: "haut" }, t: 350, contact: "deux" }
    ]
  },

  {
    id: "bougie", mot: "Bougie", theme: "objets", niveau: 3,
    syn: ["chandelle"],
    desc: "Ton poing gauche fermé est la bougie. Au-dessus, ta main droite (index et majeur serrés vers le haut) bouge doucement de gauche à droite, comme une flamme.",
    astuce: "Tes deux doigts sont la flamme qui danse.",
    rep: 2,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=jpAkRMSQ2rg",
    images: [
      {
        d: { cfg: "U", at: "nd:jointures", touch: "poignet", off: [-5, 8, 0], paume: "arriere", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre_non", paume: "arriere", doigts: "haut" }
      },
      { d: { cfg: "U", at: "nd:jointures", touch: "poignet", off: [5, 8, 0], paume: "arriere", doigts: "haut" }, t: 250 }
    ]
  },

  // ───────────────────────────── VÊTEMENTS ─────────────────────────────

  {
    id: "vetements", mot: "Vêtements", theme: "vetements", niveau: 1,
    syn: ["s'habiller", "habits", "fringues", "tenue", "vêtement"],
    desc: "Pose tes deux mains ouvertes sur ta poitrine et fais-les descendre le long de ton torse, deux fois.",
    astuce: "Comme si tu lissais ton tee-shirt sur toi.",
    sym: true, rep: 2,
    fiable: "probable", source: "https://www.youtube.com/watch?v=cCQ5_oQ3ki0",
    images: [
      { d: { cfg: "5", at: "poitrine_dom", touch: "paume", off: [0, 8, 0], paume: "arriere", doigts: "dedans" }, contact: "deux" },
      { d: { cfg: "5", at: "ventre_dom", touch: "paume", off: [0, 0, 0], paume: "arriere", doigts: "dedans" }, t: 400 }
    ]
  },

  {
    id: "chaussures", mot: "Chaussures", theme: "vetements", niveau: 1,
    syn: ["chaussure", "baskets", "godasses", "souliers"],
    desc: "Ferme tes deux poings devant toi, paumes vers le bas, et cogne-les doucement l'un contre l'autre, deux fois.",
    astuce: "Tes poings sont deux chaussures dont les talons se touchent.",
    sym: true, rep: 2,
    fiable: "probable", source: "https://www.youtube.com/watch?v=KOovPvGm9s4",
    images: [
      { d: { cfg: "poing", at: "neutre_bas", off: [28, 0, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "poing", at: "neutre_bas", off: [12, 0, 0], paume: "bas", doigts: "avant" }, t: 200, contact: "deux" }
    ]
  },

  {
    id: "manteau", mot: "Manteau", theme: "vetements", niveau: 2,
    syn: ["mettre son manteau", "veste chaude"],
    desc: "Ferme tes deux poings près de tes épaules, comme si tu tenais le col de ton manteau, puis ramène-les l'un vers l'autre devant ta poitrine.",
    astuce: "Tu fermes ton manteau parce qu'il fait froid.",
    sym: true,
    fiable: "probable", source: "https://www.youtube.com/watch?v=GZNRRQSjc14",
    images: [
      { d: { cfg: "poing", at: "epaule_dom", off: [0, -5, 15], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "poing", at: "poitrine", off: [10, -25, 15], paume: "arriere", doigts: "dedans" }, t: 500, contact: "deux" }
    ]
  },

  {
    id: "bonnet", mot: "Bonnet", theme: "vetements", niveau: 2,
    syn: ["bonnet de laine"],
    desc: "Ferme tes deux poings de chaque côté du haut de ta tête et descends-les jusqu'aux oreilles, comme si tu enfilais un bonnet.",
    astuce: "Tu tires ton bonnet bien sur tes oreilles.",
    sym: true,
    fiable: "probable", source: "https://www.youtube.com/watch?v=p0jXSYsGrdc",
    images: [
      { d: { cfg: "poing", at: "tempe_dom", off: [15, 40, 0], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "poing", at: "oreille_dom", off: [10, -5, 0], paume: "dedans", doigts: "haut" }, t: 500 }
    ]
  },

  {
    id: "chemise", mot: "Chemise", theme: "vetements", niveau: 3,
    syn: ["col", "chemisier"],
    desc: "Fais un L avec chaque main, pouce et index sur le devant de ton cou, puis écarte les mains vers les côtés en suivant le col.",
    astuce: "Tu dessines le col de ta chemise.",
    sym: true,
    fiable: "incertain", source: "https://www.youtube.com/watch?v=10miqRW-CnU",
    images: [
      { d: { cfg: "L", at: "cou", touch: "index", off: [3, -5, 8], paume: "arriere", doigts: "haut-dedans" } },
      { d: { cfg: "L", at: "cou", touch: "index", off: [32, -15, 12], paume: "arriere", doigts: "haut-dedans" }, t: 450 }
    ]
  },

  {
    id: "pyjama", mot: "Pyjama", theme: "vetements", niveau: 3,
    syn: ["vêtement de nuit"],
    desc: "Signe « vêtements » (tes mains ouvertes descendent le long du torse), puis « chambre » (le dos de ta main tapote ta joue).",
    astuce: "Pyjama = vêtement + chambre : le vêtement qu'on porte dans sa chambre.",
    fiable: "probable", source: "https://www.youtube.com/watch?v=R2RWzmOIs9U",
    images: [
      {
        d: { cfg: "5", at: "poitrine_dom", touch: "paume", off: [0, 8, 0], paume: "arriere", doigts: "dedans" },
        nd: { cfg: "5", at: "poitrine_non", touch: "paume", off: [0, 8, 0], paume: "arriere", doigts: "dedans" },
        contact: "deux"
      },
      {
        d: { cfg: "5", at: "ventre_dom", touch: "paume", paume: "arriere", doigts: "dedans" },
        nd: { cfg: "5", at: "ventre_non", touch: "paume", paume: "arriere", doigts: "dedans" },
        t: 400
      },
      { d: { cfg: "5", at: "joue_dom", touch: "dos", off: [15, 0, 0], paume: "dehors", doigts: "haut" }, nd: { at: "repos" }, t: 500 },
      { d: { cfg: "5", at: "joue_dom", touch: "dos", off: [0, 0, 0], paume: "dehors", doigts: "haut" }, t: 180, contact: true },
      { d: { cfg: "5", at: "joue_dom", touch: "dos", off: [12, 0, 0], paume: "dehors", doigts: "haut" }, t: 150 },
      { d: { cfg: "5", at: "joue_dom", touch: "dos", off: [0, 0, 0], paume: "dehors", doigts: "haut" }, t: 150, contact: true }
    ]
  },

  {
    id: "botte", mot: "Botte", theme: "vetements", niveau: 3,
    syn: ["bottes", "bottines"],
    desc: "Ton avant-bras gauche, à plat devant toi, est la jambe. Ta main droite en C glisse de ton poignet jusqu'à ton coude, comme la tige d'une botte.",
    astuce: "Tu enfiles une botte sur ton bras !",
    fiable: "probable", source: "https://www.youtube.com/watch?v=LQA9TpJ0F-4",
    images: [
      {
        d: { cfg: "C", at: "nd:poignet", off: [0, 15, 0], paume: "bas", doigts: "avant" },
        nd: { cfg: "plate", at: "neutre_non", paume: "bas", doigts: "dedans" }
      },
      { d: { cfg: "C", at: "nd:poignet", off: [-55, 15, 0], paume: "bas", doigts: "avant" }, t: 650 }
    ]
  },

  // ───────────────────────────── COULEURS ─────────────────────────────

  {
    id: "violet", mot: "Violet", theme: "couleurs", niveau: 2,
    syn: ["violette", "mauve"],
    desc: "Fais un V et descends-le en diagonale de ton épaule droite jusqu'à ta hanche gauche, en tournant la main une fois.",
    astuce: "Comme si tu mettais ta ceinture de sécurité.",
    fiable: "incertain", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { d: { cfg: "V", at: "epaule_dom", off: [0, 0, 12], paume: "arriere", doigts: "haut" } },
      { d: { cfg: "V", at: "poitrine", off: [0, 0, 15], paume: "avant", doigts: "haut" }, t: 350 },
      { d: { cfg: "V", at: "hanche_non", off: [0, 0, 12], paume: "arriere", doigts: "haut-dedans" }, t: 350 }
    ]
  },

  {
    id: "couleur", mot: "Couleur", theme: "couleurs", niveau: 1,
    syn: ["couleurs", "colorié"],
    desc: "Pose ta main ouverte, doigts écartés, près de ta joue, et fais remuer tes doigts en allant vers ta bouche.",
    fiable: "probable", source: "https://www.youtube.com/watch?v=DQ4Qyv1QIS4",
    images: [
      { d: { cfg: "5", at: "joue_dom", touch: "paume", off: [5, 0, 12], paume: "arriere", doigts: "haut" } },
      { d: { cfg: "5", at: "bouche", touch: "paume", off: [28, 0, 15], paume: "arriere", doigts: "haut" }, t: 700, agiter: true }
    ]
  },

  {
    id: "rouge", mot: "Rouge", theme: "couleurs", niveau: 1,
    syn: ["rouge vif"],
    desc: "Tapote deux fois ta lèvre du bas avec le bout de ton index, paume vers toi.",
    astuce: "Le rouge, c'est la couleur des lèvres.",
    rep: 2,
    fiable: "sur", source: "https://www.youtube.com/watch?v=WR_acVUBF8c",
    images: [
      { d: { cfg: "index", at: "bouche", touch: "index", off: [0, -8, 15], paume: "arriere", doigts: "haut" } },
      { d: { cfg: "index", at: "bouche", touch: "index", off: [0, -8, 2], paume: "arriere", doigts: "haut" }, t: 200, contact: true }
    ]
  },

  {
    id: "bleu", mot: "Bleu", theme: "couleurs", niveau: 1,
    syn: ["bleue"],
    desc: "Lève ta main plate près de ton épaule, paume vers l'avant, et plie deux fois les doigts, comme un petit coucou.",
    astuce: "Tu fais coucou au ciel bleu.",
    rep: 2,
    fiable: "sur", source: "https://www.youtube.com/watch?v=gF_JKS-Yexg",
    images: [
      { d: { cfg: "B", at: "epaule_dom", off: [15, 30, 35], paume: "avant", doigts: "haut" } },
      { d: { cfg: { doigts: ["b", "b", "b", "b"], ecart: 0, pouce: "replie" }, at: "epaule_dom", off: [15, 30, 35], paume: "avant", doigts: "haut" }, t: 200 }
    ]
  },

  {
    id: "vert", mot: "Vert", theme: "couleurs", niveau: 1,
    syn: ["verte"],
    desc: "Fais un V devant toi, paume vers l'avant, et plie deux fois le bout de tes deux doigts.",
    astuce: "V comme Vert.",
    rep: 2,
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { d: { cfg: "V", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "V_plie", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" }, t: 180 }
    ]
  },

  {
    id: "jaune", mot: "Jaune", theme: "couleurs", niveau: 1,
    syn: ["jaunâtre"],
    desc: "Tends ton petit doigt (la lettre J), pose-le au coin de ta bouche, puis éloigne ta main sur le côté.",
    astuce: "J comme Jaune, qui part du coin de ta bouche.",
    fiable: "sur", source: "https://www.youtube.com/watch?v=Yb5hQ7Kul9M",
    images: [
      { d: { cfg: "I", at: "coin_bouche_dom", touch: "auriculaire", off: [0, 0, 3], paume: "arriere", doigts: "haut" }, contact: true },
      { d: { cfg: "I", at: "coin_bouche_dom", touch: "auriculaire", off: [32, -5, 25], paume: "arriere-dedans", doigts: "haut" }, t: 400 }
    ]
  },

  {
    id: "noir", mot: "Noir", theme: "couleurs", niveau: 1,
    syn: ["noire", "sombre"],
    desc: "Index et majeur serrés à l'horizontale, paume vers toi, glisse-les le long de ton front, de gauche à droite.",
    astuce: "Comme si tu soulignais tes sourcils au crayon noir.",
    fiable: "sur", source: "https://www.youtube.com/watch?v=95FuwXxVWrQ",
    images: [
      { d: { cfg: "U", at: "front_non", touch: "doigts", off: [0, -8, 3], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "U", at: "front_dom", touch: "doigts", off: [0, -8, 3], paume: "arriere", doigts: "dedans" }, t: 550, contact: true }
    ]
  },

  {
    id: "blanc", mot: "Blanc", theme: "couleurs", niveau: 1,
    syn: ["blanche", "clair"],
    desc: "Pose ta main fermée en bec sur le côté de ton cou, puis éloigne-la vers l'avant en ouvrant grand les doigts.",
    astuce: "Comme un bouton blanc qui éclate !",
    fiable: "probable", source: "https://www.youtube.com/watch?v=16FpMakLzGY",
    images: [
      { d: { cfg: "bec", at: "cou", touch: "doigts", off: [14, 0, 3], paume: "arriere", doigts: "haut" }, contact: true },
      { d: { cfg: "5", at: "cou", touch: "paume", off: [30, -10, 45], paume: "arriere", doigts: "haut" }, t: 300 }
    ]
  },

  {
    id: "marron", mot: "Marron", theme: "couleurs", niveau: 2,
    syn: ["brun", "chocolat"],
    desc: "Mets ta main en O devant ton menton, paume vers toi, et balance-la de gauche à droite, deux fois.",
    rep: 2,
    fiable: "probable", source: "https://www.youtube.com/watch?v=u2hYTM4vO6M",
    images: [
      { d: { cfg: "O", at: "menton", off: [-12, -10, 18], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "O", at: "menton", off: [12, -10, 18], paume: "arriere", doigts: "dedans" }, t: 300 }
    ]
  },

  {
    id: "orange-couleur", mot: "Orange (couleur)", theme: "couleurs", niveau: 2,
    syn: ["orange", "orangé"],
    desc: "Mets ta main ouverte, doigts un peu pliés, au-dessus de ta tempe et fais frétiller tes doigts, comme un soleil qui brille.",
    astuce: "L'orange du soleil couchant.",
    fiable: "incertain", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { d: { cfg: "5_courbe", at: "tempe_dom", off: [10, 25, 10], paume: "bas", doigts: "dedans" } },
      { d: { cfg: "5_courbe", at: "tempe_dom", off: [14, 28, 10], paume: "bas", doigts: "dedans" }, t: 700, agiter: true }
    ]
  }

]);
