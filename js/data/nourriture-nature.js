// Signes LSF : nourriture, boissons, animaux, nature, météo.
// Sources et notes : notes/research/nourriture-nature.md
LSF.ajouter([

  // ───────────────────────── NOURRITURE ─────────────────────────

  {
    id: "faim", mot: "Faim", theme: "nourriture", niveau: 1,
    syn: ["avoir faim", "j'ai faim"],
    desc: "Main en C, paume contre toi : fais-la descendre du haut de ta poitrine jusqu'à ton ventre.",
    astuce: "Tu montres le chemin de la nourriture jusqu'à ton estomac vide.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "C", at: "poitrine", off: [0, 10, 0], paume: "arriere", doigts: "dedans" }, contact: true, visage: "moue" },
      { d: { cfg: "C", at: "ventre", paume: "arriere", doigts: "dedans" }, t: 650, contact: true }
    ]
  },
  {
    id: "soif", mot: "Soif", theme: "nourriture", niveau: 1,
    syn: ["avoir soif", "j'ai soif"],
    desc: "Pose ta main ouverte en C contre ton cou, puis avance-la en resserrant les doigts.",
    astuce: "Ta gorge sèche réclame à boire.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "C", at: "cou", paume: "arriere", doigts: "dedans" }, contact: true, visage: "moue" },
      { d: { cfg: "bec", at: "cou", off: [0, -5, 70], paume: "dedans", doigts: "avant-dedans" }, t: 550 }
    ]
  },
  {
    id: "pain", mot: "Pain", theme: "nourriture", niveau: 1,
    syn: ["baguette", "tartine"],
    desc: "Ta main gauche fermée reste immobile devant toi (c'est le pain). Ta main droite arrondie part du bout de la main gauche et descend, deux fois.",
    astuce: "Comme un couteau qui coupe des tranches de baguette.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    rep: 2,
    images: [
      { nd: { cfg: "poing", at: "neutre_non", paume: "bas", doigts: "dedans" },
        d: { cfg: "C", at: "nd:jointures", off: [5, 15, 0], paume: "dedans", doigts: "avant" }, contact: "nd" },
      { d: { cfg: "C", at: "nd:jointures", off: [5, -35, 0], paume: "dedans", doigts: "avant" }, t: 400 }
    ]
  },
  {
    id: "fromage", mot: "Fromage", theme: "nourriture", niveau: 1,
    desc: "Main en F (pouce et index en rond, les autres doigts levés) : pince deux fois le bout de ton nez.",
    astuce: "Le fromage, ça sent fort : tu te pinces le nez !",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/fromage",
    rep: 2,
    images: [
      { d: { cfg: "F", at: "nez", off: [5, 0, 25], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "F", at: "nez", touch: "pouce", paume: "dedans", doigts: "haut" }, t: 280, contact: true }
    ]
  },
  {
    id: "pomme", mot: "Pomme", theme: "nourriture", niveau: 2,
    syn: ["compote"],
    desc: "Plie ton index en crochet et pose-le contre ta joue, puis tourne le poignet vers l'avant, deux fois.",
    astuce: "Comme si tu croquais une joue bien ronde de pomme.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/pomme",
    rep: 2,
    images: [
      { d: { cfg: "index_crochet", at: "joue_dom", touch: "index", paume: "dedans", doigts: "haut" }, contact: true },
      { d: { cfg: "index_crochet", at: "joue_dom", touch: "index", paume: "avant", doigts: "haut" }, t: 300 }
    ]
  },
  {
    id: "banane", mot: "Banane", theme: "nourriture", niveau: 2,
    desc: "Ta main gauche fermée tient la banane debout. Avec le pouce et l'index de ta main droite, « épluche-la » du haut vers le bas, deux fois.",
    astuce: "Tu épluches une vraie banane.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/banane",
    rep: 2,
    images: [
      { nd: { cfg: "A", at: "neutre", paume: "dedans", doigts: "haut" },
        d: { cfg: "pince_fermee", at: "nd:jointures", off: [0, 30, 0], paume: "bas", doigts: "avant" }, contact: "nd" },
      { d: { cfg: "pince_fermee", at: "nd:jointures", off: [25, -45, 10], paume: "bas", doigts: "avant" }, t: 450, arc: 8 }
    ]
  },
  {
    id: "chocolat", mot: "Chocolat", theme: "nourriture", niveau: 2,
    desc: "Tes deux mains en U (index et majeur serrés), paumes vers le bas : les doigts de ta main droite tapotent deux fois ceux de ta main gauche.",
    astuce: "Comme les petits carrés d'une tablette de chocolat.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/chocolat",
    rep: 2,
    images: [
      { nd: { cfg: "U", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "U", at: "nd:doigts", off: [0, 20, 0], paume: "bas", doigts: "dedans" } },
      { d: { cfg: "U", at: "nd:doigts", off: [0, 3, 0], paume: "bas", doigts: "dedans" }, t: 250, contact: "nd" }
    ]
  },
  {
    id: "gateau", mot: "Gâteau", theme: "nourriture", niveau: 1,
    syn: ["gâteaux", "dessert"],
    desc: "Ferme ta main et viens toucher ta joue avec le poing, deux fois.",
    astuce: "Ta joue est bien remplie de gâteau !",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/g%C3%A2teau",
    rep: 2,
    images: [
      { d: { cfg: "poing", at: "joue_dom", off: [10, 0, 15], paume: "dedans", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "poing", at: "joue_dom", paume: "dedans", doigts: "haut" }, t: 250, contact: true }
    ]
  },
  {
    id: "pates", mot: "Pâtes", theme: "nourriture", niveau: 2,
    syn: ["spaghetti", "nouilles"],
    desc: "Tends tes deux index devant toi. Quand une main monte, l'autre descend, en même temps, plusieurs fois.",
    astuce: "Comme des spaghettis qui pendent de ta fourchette.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    rep: 2,
    images: [
      { d: { cfg: "index", at: "neutre_dom", off: [0, 15, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "index", at: "neutre_non", off: [0, -15, 0], paume: "dedans", doigts: "avant" } },
      { d: { cfg: "index", at: "neutre_dom", off: [0, -15, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "index", at: "neutre_non", off: [0, 15, 0], paume: "dedans", doigts: "avant" }, t: 350 }
    ]
  },
  {
    id: "riz", mot: "Riz", theme: "nourriture", niveau: 3,
    desc: "Ta main gauche tend l'index devant toi, sans bouger. Avec le pouce et l'index de ta main droite, pince-le plusieurs fois de suite.",
    astuce: "Tu attrapes les petits grains de riz un par un.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    rep: 3,
    images: [
      { nd: { cfg: "index", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "pince", at: "nd:index", off: [0, 8, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "pince_fermee", at: "nd:index", paume: "bas", doigts: "avant" }, t: 200, contact: "nd" }
    ]
  },
  {
    id: "viande", mot: "Viande", theme: "nourriture", niveau: 2,
    syn: ["steak", "boeuf"],
    desc: "Ta main gauche fait un L (pouce et index écartés). Avec le pouce et l'index de ta main droite, pince la partie charnue entre son pouce et son index.",
    astuce: "Tu pinces ta propre « chair » : c'est de la viande !",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    rep: 2,
    images: [
      { nd: { cfg: "L", at: "neutre", paume: "arriere", doigts: "dedans" },
        d: { cfg: "pince", at: "nd:pouce", off: [0, -15, 10], paume: "bas", doigts: "avant" } },
      { d: { cfg: "pince_fermee", at: "nd:pouce", off: [0, -25, 0], paume: "bas", doigts: "avant" }, t: 250, contact: "nd" }
    ]
  },
  {
    id: "sucre", mot: "Sucre", theme: "nourriture", niveau: 2,
    syn: ["sucré"],
    desc: "Pose ton index plié en crochet sur ta joue, puis tourne-le dans un sens, puis dans l'autre.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "index_crochet", at: "joue_dom", touch: "index", paume: "dedans", doigts: "haut" }, contact: true },
      { d: { cfg: "index_crochet", at: "joue_dom", touch: "index", paume: "avant", doigts: "haut" }, t: 250 },
      { d: { cfg: "index_crochet", at: "joue_dom", touch: "index", paume: "arriere", doigts: "haut" }, t: 350 },
      { d: { cfg: "index_crochet", at: "joue_dom", touch: "index", paume: "dedans", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "fruits", mot: "Fruits", theme: "nourriture", niveau: 2,
    syn: ["fruit"],
    desc: "Fais un F avec ta main (pouce et index en rond, les autres doigts levés) et fais-la pivoter du haut vers le bas, plusieurs fois.",
    astuce: "F comme Fruit.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    rep: 2,
    images: [
      { d: { cfg: "F", at: "neutre_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "F", at: "neutre_dom", off: [0, 10, 10], paume: "bas", doigts: "avant" }, t: 300 }
    ]
  },
  {
    id: "legumes", mot: "Légumes", theme: "nourriture", niveau: 2,
    syn: ["légume"],
    desc: "Lève l'index et le majeur écartés (en V) et fais une petite boucle en t'éloignant vers l'extérieur.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "V", at: "neutre_dom", off: [-10, 0, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "V", at: "neutre_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" }, t: 250 },
      { d: { cfg: "V", at: "neutre_dom", off: [10, 0, 0], paume: "avant", doigts: "haut" }, t: 250 },
      { d: { cfg: "V", at: "neutre_dom", off: [30, 0, 0], paume: "avant", doigts: "haut" }, t: 300, arc: -10 }
    ]
  },

  // ───────────────────────── BOISSONS ─────────────────────────

  {
    id: "eau", mot: "Eau", theme: "boissons", niveau: 1,
    desc: "À côté de ton épaule, lève l'index et plie-le en crochet puis redresse-le, plusieurs fois.",
    astuce: "Ton index fait des « gouttes » comme un robinet.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/eau",
    rep: 3,
    images: [
      { d: { cfg: "index", at: "cote_epaule_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" }, bouche: "o" },
      { d: { cfg: "index_crochet", at: "cote_epaule_dom", off: [0, 12, 0], paume: "avant", doigts: "haut" }, t: 200 }
    ]
  },
  {
    id: "lait", mot: "Lait", theme: "boissons", niveau: 1,
    desc: "Ta main gauche tend l'index devant toi. Ta main droite l'entoure et glisse vers le bout en se fermant, deux fois.",
    astuce: "Comme si tu trayais une vache.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/lait",
    rep: 2,
    images: [
      { nd: { cfg: "index", at: "neutre", paume: "arriere", doigts: "dedans" },
        d: { cfg: "C", at: "nd:index", off: [-30, 5, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "poing", at: "nd:index", off: [5, -5, 0], paume: "bas", doigts: "avant" }, t: 400, contact: "nd" }
    ]
  },
  {
    id: "cafe", mot: "Café", theme: "boissons", niveau: 2,
    desc: "Pose ton poing droit sur ton poing gauche et fais-le tourner en petits cercles.",
    astuce: "Comme un vieux moulin à café qu'on tourne.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/caf%C3%A9",
    rep: 2,
    images: [
      { nd: { cfg: "poing", at: "neutre", paume: "dedans", doigts: "avant" },
        d: { cfg: "poing", at: "nd:pouce", off: [8, 20, 0], paume: "dedans", doigts: "avant" }, contact: "nd" },
      { d: { cfg: "poing", at: "nd:pouce", off: [0, 20, 8], paume: "dedans", doigts: "avant" }, t: 200 },
      { d: { cfg: "poing", at: "nd:pouce", off: [-8, 20, 0], paume: "dedans", doigts: "avant" }, t: 200 },
      { d: { cfg: "poing", at: "nd:pouce", off: [0, 20, -8], paume: "dedans", doigts: "avant" }, t: 200 }
    ]
  },
  {
    id: "the", mot: "Thé", theme: "boissons", niveau: 2,
    syn: ["infusion", "tisane"],
    desc: "Ta main gauche en C forme une tasse. Avec le pouce et l'index de ta main droite, tiens un sachet imaginaire et trempe-le dans la tasse, deux fois.",
    astuce: "Tu fais infuser ton sachet de thé.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/th%C3%A9",
    rep: 2,
    images: [
      { nd: { cfg: "C", at: "neutre", paume: "dedans", doigts: "avant" },
        d: { cfg: "pince_fermee", at: "nd:pouce", off: [0, 35, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "pince_fermee", at: "nd:pouce", off: [0, 10, 0], paume: "bas", doigts: "avant" }, t: 300 }
    ]
  },

  // ───────────────────────── ANIMAUX ─────────────────────────

  {
    id: "animal", mot: "Animal", theme: "animaux", niveau: 1,
    syn: ["animaux", "bête"],
    desc: "Sur le côté de ta tête, fais un petit cercle avec ta main, deux fois.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "5_courbe", at: "tempe_dom", off: [20, 12, 10], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "5_courbe", at: "tempe_dom", off: [20, 0, 22], paume: "dedans", doigts: "haut" }, t: 200 },
      { d: { cfg: "5_courbe", at: "tempe_dom", off: [20, -12, 10], paume: "dedans", doigts: "haut" }, t: 200 },
      { d: { cfg: "5_courbe", at: "tempe_dom", off: [20, 0, -2], paume: "dedans", doigts: "haut" }, t: 200 }
    ]
  },
  {
    id: "chien", mot: "Chien", theme: "animaux", niveau: 1,
    syn: ["chiot", "toutou"],
    desc: "Ton poignet reste collé contre le côté de ton ventre, et ta main aux doigts tendus remue de haut en bas.",
    astuce: "C'est la queue du chien qui remue !",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 3,
    images: [
      { d: { cfg: "plate", at: "ventre_dom", off: [15, -10, 0], touch: "poignet", paume: "arriere", doigts: "dehors-haut" }, contact: true, visage: "sourire" },
      { d: { cfg: "plate", at: "ventre_dom", off: [15, -10, 0], touch: "poignet", paume: "arriere", doigts: "dehors-bas" }, t: 200 }
    ]
  },
  {
    id: "chat", mot: "Chat", theme: "animaux", niveau: 1,
    syn: ["chaton", "minou"],
    sym: true,
    desc: "Place tes deux mains, doigts réunis, de chaque côté de ta bouche, puis écarte-les vers l'extérieur en ouvrant les doigts.",
    astuce: "Tu dessines les moustaches du chat.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { d: { cfg: "bec", at: "bouche", off: [20, 0, 8], paume: "avant", doigts: "dedans" }, visage: "sourire" },
      { d: { cfg: "5", at: "joue_dom", off: [45, -5, 15], paume: "avant", doigts: "dedans" }, t: 450 }
    ]
  },
  {
    id: "oiseau", mot: "Oiseau", theme: "animaux", niveau: 1,
    syn: ["oiseaux"],
    desc: "Devant ta bouche, ton pouce et ton index forment un bec qui s'ouvre et se ferme, deux fois.",
    astuce: "C'est le bec de l'oiseau.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "L", at: "bouche", off: [0, 0, 12], paume: "dedans", doigts: "avant" } },
      { d: { cfg: "pince_fermee", at: "bouche", off: [0, 0, 12], paume: "dedans", doigts: "avant" }, t: 200 }
    ]
  },
  {
    id: "cheval", mot: "Cheval", theme: "animaux", niveau: 2,
    syn: ["poney", "chevaux"],
    sym: true,
    desc: "Au-dessus de ta tête, tes deux mains en V font deux petits cercles.",
    astuce: "Ce sont les oreilles du cheval qui bougent.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "V", at: "tete", off: [30, 13, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "V", at: "tete", off: [30, 5, 8], paume: "avant", doigts: "haut" }, t: 180 },
      { d: { cfg: "V", at: "tete", off: [30, -3, 0], paume: "avant", doigts: "haut" }, t: 180 },
      { d: { cfg: "V", at: "tete", off: [30, 5, -8], paume: "avant", doigts: "haut" }, t: 180 }
    ]
  },
  {
    id: "vache", mot: "Vache", theme: "animaux", niveau: 2,
    syn: ["taureau", "boeuf"],
    desc: "Fais un Y (pouce et auriculaire tendus) et pose le pouce sur ta tempe, l'auriculaire vers le haut, puis tourne un peu la main vers l'avant.",
    astuce: "Ton auriculaire, c'est la corne de la vache.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/vache",
    images: [
      { d: { cfg: "Y", at: "tempe_dom", off: [5, 0, 20], paume: "avant", doigts: "haut" } },
      { d: { cfg: "Y", at: "tempe_dom", touch: "pouce", paume: "avant", doigts: "haut" }, t: 350, contact: true },
      { d: { cfg: "Y", at: "tempe_dom", touch: "pouce", paume: "dehors", doigts: "haut" }, t: 300 }
    ]
  },
  {
    id: "cochon", mot: "Cochon", theme: "animaux", niveau: 2,
    syn: ["porc"],
    sym: true,
    desc: "Tes deux mains à plat près de tes joues se plient vers l'avant, deux fois.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "joue_dom", off: [25, 5, 5], paume: "avant", doigts: "haut" } },
      { d: { cfg: "plate_pliee", at: "joue_dom", off: [25, 5, 5], paume: "avant", doigts: "haut" }, t: 220 }
    ]
  },
  {
    id: "lapin", mot: "Lapin", theme: "animaux", niveau: 2,
    desc: "Au-dessus de ta tempe, lève l'index et le majeur collés, puis plie-les vers l'arrière, deux fois.",
    astuce: "Ce sont les longues oreilles du lapin.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "U", at: "tempe_dom", off: [5, 30, 0], paume: "arriere", doigts: "haut" } },
      { d: { cfg: { doigts: ["b", "b", "p", "p"], ecart: 0, pouce: "devant" }, at: "tempe_dom", off: [5, 30, 0], paume: "arriere", doigts: "haut" }, t: 220 }
    ]
  },
  {
    id: "souris", mot: "Souris", theme: "animaux", niveau: 2,
    syn: ["rat"],
    desc: "Ton bras gauche est posé devant toi. Ta main droite, index et majeur croisés, avance en zigzaguant le long de ton avant-bras gauche.",
    astuce: "La petite souris trottine sur ton bras.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { nd: { cfg: "plate", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "R", at: "nd:poignet", off: [10, 5, 0], paume: "bas", doigts: "dedans" }, contact: "nd" },
      { d: { cfg: "R", at: "nd:poignet", off: [-10, 5, 10], paume: "bas", doigts: "dedans" }, t: 250 },
      { d: { cfg: "R", at: "nd:poignet", off: [-30, 5, -5], paume: "bas", doigts: "dedans" }, t: 250 },
      { d: { cfg: "R", at: "nd:poignet", off: [-50, 5, 8], paume: "bas", doigts: "dedans" }, t: 250 }
    ]
  },
  {
    id: "poisson", mot: "Poisson", theme: "animaux", niveau: 1,
    syn: ["poissons", "poisson à manger"],
    desc: "Main à plat sur le côté, fais-la avancer devant toi en zigzaguant.",
    astuce: "Ta main nage comme un poisson dans l'eau. (Même signe pour le poisson qu'on mange.)",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [0, 0, -20], paume: "dedans-arriere", doigts: "avant-dedans" } },
      { d: { cfg: "plate", at: "neutre", off: [8, 0, 10], paume: "dedans-avant", doigts: "avant-dehors" }, t: 250 },
      { d: { cfg: "plate", at: "neutre", off: [0, 0, 40], paume: "dedans-arriere", doigts: "avant-dedans" }, t: 250 },
      { d: { cfg: "plate", at: "neutre", off: [8, 0, 70], paume: "dedans-avant", doigts: "avant-dehors" }, t: 250 }
    ]
  },
  {
    id: "papillon", mot: "Papillon", theme: "animaux", niveau: 2,
    sym: true,
    desc: "Croise tes mains devant toi, paumes vers toi, et accroche tes pouces. Fais battre doucement tes doigts comme des ailes.",
    astuce: "Tes mains sont les ailes du papillon.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 3,
    images: [
      { d: { cfg: { doigts: ["t", "t", "t", "t"], ecart: 4, pouce: "ecarte" }, at: "neutre", off: [-12, 0, 0], paume: "arriere", doigts: "dehors-haut" } },
      { d: { cfg: { doigts: ["b", "b", "b", "b"], ecart: 4, pouce: "ecarte" }, at: "neutre", off: [-12, 0, 0], paume: "arriere", doigts: "dehors-haut" }, t: 220 }
    ]
  },
  {
    id: "lion", mot: "Lion", theme: "animaux", niveau: 2,
    syn: ["lionne"],
    sym: true,
    desc: "Mains en griffe au-dessus de ta tête, de chaque côté, puis descends-les autour de ta tête jusqu'aux épaules.",
    astuce: "Tu dessines la grosse crinière du lion.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/lion",
    images: [
      { d: { cfg: "griffe", at: "tete", off: [30, 25, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "griffe", at: "tempe_dom", off: [40, 0, 0], paume: "avant", doigts: "haut" }, t: 350, arc: 10 },
      { d: { cfg: "griffe", at: "epaule_dom", off: [0, 25, 10], paume: "avant", doigts: "haut" }, t: 350 }
    ]
  },
  {
    id: "elephant", mot: "Éléphant", theme: "animaux", niveau: 2,
    desc: "Pose ta main arrondie sur ton nez, puis descends-la en avant en faisant une grande courbe.",
    astuce: "Ta main dessine la trompe de l'éléphant.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/%C3%A9l%C3%A9phant",
    images: [
      { d: { cfg: "C", at: "nez", off: [0, 0, 5], paume: "bas", doigts: "avant" }, contact: true },
      { d: { cfg: "C", at: "neutre", off: [0, 5, 25], paume: "bas", doigts: "avant" }, t: 400, arc: 15 },
      { d: { cfg: "C", at: "neutre_bas", off: [0, -5, 35], paume: "bas", doigts: "avant" }, t: 350, arc: -10 }
    ]
  },
  {
    id: "singe", mot: "Singe", theme: "animaux", niveau: 2,
    sym: true,
    desc: "Coudes écartés, gratte-toi les côtés du buste avec tes deux mains en griffe, plusieurs fois.",
    astuce: "Tu te grattes comme un singe.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/singe",
    rep: 3,
    images: [
      { d: { cfg: "griffe", at: "poitrine_dom", off: [40, 0, 0], paume: "dedans", doigts: "haut" }, contact: true, visage: "sourire" },
      { d: { cfg: "griffe", at: "poitrine_dom", off: [40, -20, 0], paume: "dedans", doigts: "haut" }, t: 180 }
    ]
  },
  {
    id: "serpent", mot: "Serpent", theme: "animaux", niveau: 2,
    desc: "Index et majeur pliés comme des crochets, paume vers le bas : fais glisser ta main devant toi en zigzaguant.",
    astuce: "Tes deux doigts sont les crochets du serpent qui ondule.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/serpent",
    images: [
      { d: { cfg: "V_plie", at: "neutre_dom", paume: "bas", doigts: "dedans" } },
      { d: { cfg: "V_plie", at: "neutre", off: [0, 0, 15], paume: "bas", doigts: "dedans" }, t: 280 },
      { d: { cfg: "V_plie", at: "neutre", off: [-25, 0, -5], paume: "bas", doigts: "dedans" }, t: 280 },
      { d: { cfg: "V_plie", at: "neutre_non", off: [0, 0, 12], paume: "bas", doigts: "dedans" }, t: 280 }
    ]
  },
  {
    id: "poule", mot: "Poule", theme: "animaux", niveau: 2,
    syn: ["poulet"],
    desc: "Comme pour « oiseau », ton pouce et ton index font un bec qui se ferme deux fois, mais plus bas, en direction du sol.",
    astuce: "La poule picore par terre.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "L", at: "neutre", off: [0, -10, 0], paume: "dedans", doigts: "avant-bas" } },
      { d: { cfg: "pince_fermee", at: "neutre", off: [0, -18, 5], paume: "dedans", doigts: "avant-bas" }, t: 200 }
    ]
  },
  {
    id: "canard", mot: "Canard", theme: "animaux", niveau: 2,
    desc: "Devant ta bouche, doigts tendus serrés et pouce en dessous : ferme ce bec plat deux fois.",
    astuce: "Le bec plat du canard qui fait coin-coin.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: { doigts: ["t", "t", "t", "t"], ecart: 0, pouce: "ecarte" }, at: "bouche", off: [0, 0, 15], paume: "bas", doigts: "avant" } },
      { d: { cfg: "bec", at: "bouche", off: [0, 0, 15], paume: "bas", doigts: "avant" }, t: 200 }
    ]
  },
  {
    id: "tortue", mot: "Tortue", theme: "animaux", niveau: 2,
    desc: "Ta main gauche à plat recouvre ton poing droit. Ton pouce droit sort et rentre, comme une tête.",
    astuce: "La main du dessus est la carapace, ton pouce est la tête de la tortue.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { nd: { cfg: "C", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "A", at: "nd:paume", off: [0, -25, 0], paume: "dedans", doigts: "bas" } },
      { d: { cfg: "pouce", at: "nd:paume", off: [0, -25, 0], paume: "dedans", doigts: "bas" }, t: 300 }
    ]
  },
  {
    id: "araignee", mot: "Araignée", theme: "animaux", niveau: 3,
    desc: "Ta main gauche à plat est au-dessus. Sous elle, ta main droite en griffe descend puis remonte en bougeant légèrement les doigts.",
    astuce: "L'araignée monte et descend le long de son fil.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { nd: { cfg: "plate", at: "neutre_haut", paume: "bas", doigts: "dedans" },
        d: { cfg: "griffe", at: "nd:paume", off: [0, -25, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "griffe", at: "nd:paume", off: [0, -80, 0], paume: "bas", doigts: "avant" }, t: 600, agiter: true },
      { d: { cfg: "griffe", at: "nd:paume", off: [0, -25, 0], paume: "bas", doigts: "avant" }, t: 600, agiter: true }
    ]
  },
  {
    id: "escargot", mot: "Escargot", theme: "animaux", niveau: 3,
    desc: "Ta main droite, index et auriculaire levés, avance doucement en zigzaguant sur ton avant-bras gauche.",
    astuce: "L'index et l'auriculaire sont les cornes de l'escargot.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { nd: { cfg: "plate", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "corne", at: "nd:poignet", off: [10, 8, 0], paume: "bas-avant", doigts: "avant-haut" }, contact: "nd" },
      { d: { cfg: "corne", at: "nd:poignet", off: [-10, 8, 8], paume: "bas-avant", doigts: "avant-haut" }, t: 500 },
      { d: { cfg: "corne", at: "nd:poignet", off: [-30, 8, -4], paume: "bas-avant", doigts: "avant-haut" }, t: 500 },
      { d: { cfg: "corne", at: "nd:poignet", off: [-50, 8, 6], paume: "bas-avant", doigts: "avant-haut" }, t: 500 }
    ]
  },
  {
    id: "grenouille", mot: "Grenouille", theme: "animaux", niveau: 3,
    desc: "Ta main droite (pouce, index et majeur) saute plusieurs fois sur ton avant-bras gauche en avançant, et s'ouvre en 3 à chaque atterrissage.",
    astuce: "Ta main fait des bonds comme une grenouille.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { nd: { cfg: "plate", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: { doigts: ["o", "o", "p", "p"], ecart: 0, pouce: "touche_tous" }, at: "nd:dos", off: [15, 25, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "3", at: "nd:poignet", off: [0, 5, 0], paume: "bas", doigts: "avant" }, t: 300, arc: 20, contact: "nd" },
      { d: { cfg: { doigts: ["o", "o", "p", "p"], ecart: 0, pouce: "touche_tous" }, at: "nd:poignet", off: [-25, 25, 0], paume: "bas", doigts: "avant" }, t: 200 },
      { d: { cfg: "3", at: "nd:poignet", off: [-45, 5, 0], paume: "bas", doigts: "avant" }, t: 300, arc: 10, contact: "nd" }
    ]
  },
  {
    id: "mouton", mot: "Mouton", theme: "animaux", niveau: 3,
    syn: ["brebis", "agneau"],
    desc: "Avec l'index et le majeur légèrement pliés, gratte sous ton épaule gauche, plusieurs fois.",
    astuce: "Comme si tu tondais la laine du mouton.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 3,
    images: [
      { d: { cfg: "V", at: "epaule_non", off: [0, -35, 5], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "V_plie", at: "epaule_non", off: [0, -25, 0], paume: "arriere", doigts: "dedans" }, t: 200, contact: true }
    ]
  },
  {
    id: "loup", mot: "Loup", theme: "animaux", niveau: 3,
    desc: "Ta main ouverte part de ton nez et avance en se fermant en bec.",
    astuce: "Tu dessines le long museau du loup.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { d: { cfg: "C", at: "nez", off: [0, 0, 5], paume: "dedans", doigts: "avant" }, contact: true },
      { d: { cfg: "bec", at: "nez", off: [0, -5, 50], paume: "dedans", doigts: "avant" }, t: 500 }
    ]
  },
  {
    id: "renard", mot: "Renard", theme: "animaux", niveau: 3,
    desc: "Main en 3 (pouce, index, majeur) sur ton nez : avance-la en refermant ces trois doigts.",
    astuce: "Comme le loup, mais avec trois doigts : le museau fin du renard.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { d: { cfg: "3", at: "nez", off: [0, 0, 5], paume: "dedans", doigts: "avant" }, contact: true },
      { d: { cfg: { doigts: ["o", "o", "p", "p"], ecart: 0, pouce: "touche_tous" }, at: "nez", off: [0, -5, 50], paume: "dedans", doigts: "avant" }, t: 500 }
    ]
  },
  {
    id: "ane", mot: "Âne", theme: "animaux", niveau: 3,
    sym: true,
    desc: "Tes deux mains à plat au-dessus de tes tempes forment de grandes oreilles qui se plient vers l'avant, deux fois.",
    astuce: "Les grandes oreilles de l'âne.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "tempe_dom", off: [10, 30, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "plate_pliee", at: "tempe_dom", off: [10, 30, 0], paume: "avant", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "coccinelle", mot: "Coccinelle", theme: "animaux", niveau: 3,
    desc: "Ton pouce et ton index forment un petit rond que tu poses sur le dos de ta main gauche à plat, à trois endroits différents.",
    astuce: "Tu poses les points noirs de la coccinelle.",
    fiable: "sur", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { nd: { cfg: "plate", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "pince_fermee", at: "nd:dos", off: [-15, 5, 10], paume: "bas", doigts: "avant" }, contact: "nd" },
      { d: { cfg: "pince_fermee", at: "nd:dos", off: [5, 5, -5], paume: "bas", doigts: "avant" }, t: 300, arc: 12, contact: "nd" },
      { d: { cfg: "pince_fermee", at: "nd:dos", off: [20, 5, 8], paume: "bas", doigts: "avant" }, t: 300, arc: 12, contact: "nd" }
    ]
  },
  {
    id: "chevre", mot: "Chèvre", theme: "animaux", niveau: 3,
    syn: ["bouc"],
    desc: "Sous ton menton, tes doigts pincés font des petits allers-retours d'avant en arrière.",
    astuce: "C'est la barbichette (le bouc) de la chèvre.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    rep: 2,
    images: [
      { d: { cfg: "pince", at: "menton", off: [0, -15, 0], paume: "arriere", doigts: "haut" }, contact: true },
      { d: { cfg: "pince", at: "menton", off: [0, -20, 20], paume: "arriere", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "coq", mot: "Coq", theme: "animaux", niveau: 3,
    desc: "Pose tes doigts tendus au-dessus de ta tête et fais-les vibrer légèrement en allant vers l'arrière.",
    astuce: "C'est la crête du coq.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { d: { cfg: "4", at: "front", off: [15, 10, 10], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "4", at: "tete", off: [15, 10, 0], paume: "dedans", doigts: "haut" }, t: 350, agiter: true },
      { d: { cfg: "4", at: "tete", off: [15, 10, -5], paume: "dedans", doigts: "haut" }, t: 350, agiter: true }
    ]
  },
  {
    id: "ecureuil", mot: "Écureuil", theme: "animaux", niveau: 3,
    desc: "Près de ton épaule, ta main arrondie dessine la grosse queue de l'écureuil en allant vers l'extérieur puis vers le bas.",
    astuce: "Il existe plusieurs signes pour « écureuil » : celui-ci dessine sa queue en panache.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { d: { cfg: "C", at: "epaule_dom", off: [0, 20, 40], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "C", at: "cote_dom", off: [20, 15, 30], paume: "dedans", doigts: "haut" }, t: 350, arc: 20 },
      { d: { cfg: "C", at: "cote_dom", off: [25, -40, 40], paume: "dedans", doigts: "haut" }, t: 350, arc: 10 }
    ]
  },
  {
    id: "cerf", mot: "Cerf", theme: "animaux", niveau: 3,
    syn: ["renne", "élan"],
    sym: true,
    desc: "Pose tes deux mains ouvertes, doigts écartés, en haut de ta tête, puis monte-les vers l'avant et le haut.",
    astuce: "Tu dessines les grands bois du cerf.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { d: { cfg: "5", at: "tempe_dom", off: [0, 25, 0], touch: "pouce", paume: "avant", doigts: "haut" }, contact: true },
      { d: { cfg: "5", at: "tempe_dom", off: [20, 52, 30], paume: "avant", doigts: "haut" }, t: 500 }
    ]
  },
  {
    id: "biche", mot: "Biche", theme: "animaux", niveau: 3,
    syn: ["faon"],
    desc: "Index et majeur écartés devant ton œil, puis referme-les en venant te poser sur ta tempe.",
    astuce: "Ce sont les grands yeux doux de la biche.",
    fiable: "probable", source: "https://d1yei2z3i6k35z.cloudfront.net/910208/65fae3b7c665f_ImagierdesAnimauxcommuns-LylaSignes2024.pdf",
    images: [
      { d: { cfg: "V", at: "oeil_dom", off: [0, 0, 20], paume: "arriere", doigts: "haut" } },
      { d: { cfg: "U", at: "tempe_dom", touch: "doigts", paume: "arriere", doigts: "haut" }, t: 450, contact: true }
    ]
  },

  // ───────────────────────── NATURE ─────────────────────────

  {
    id: "arbre", mot: "Arbre", theme: "nature", niveau: 1,
    syn: ["arbres", "forêt"],
    desc: "Ton bras droit est levé, le coude posé sur le dos de ta main gauche à plat. Ta main droite ouverte, doigts écartés, tourne un peu sur elle-même, deux fois.",
    astuce: "Ton avant-bras est le tronc, tes doigts sont les branches qui bougent dans le vent.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00707250/document",
    rep: 2,
    images: [
      { nd: { cfg: "plate", at: "neutre_bas", paume: "bas", doigts: "dedans" },
        d: { cfg: "5", at: "neutre_haut", off: [10, 0, 0], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "5", at: "neutre_haut", off: [10, 0, 0], paume: "avant", doigts: "haut" }, t: 300 }
    ]
  },
  {
    id: "fleur", mot: "Fleur", theme: "nature", niveau: 1,
    syn: ["fleurs", "rose"],
    desc: "Bout des doigts réunis en bec, place ta main sous ton nez et passe d'une narine à l'autre.",
    astuce: "Comme si tu sentais une fleur.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/fleur",
    images: [
      { d: { cfg: "bec", at: "nez", off: [12, -10, 5], touch: "doigts", paume: "dedans", doigts: "haut" }, contact: true, visage: "sourire" },
      { d: { cfg: "bec", at: "nez", off: [-12, -10, 5], touch: "doigts", paume: "dedans", doigts: "haut" }, t: 400, contact: true }
    ]
  },
  {
    id: "mer", mot: "Mer", theme: "nature", niveau: 2,
    syn: ["océan", "vagues", "plage"],
    sym: true,
    desc: "Tes deux mains à plat, paumes vers le bas, partent du centre et s'écartent sur les côtés en ondulant.",
    astuce: "Tu montres la grande surface de l'eau et ses vagues.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/mer",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [-10, 0, 10], paume: "bas", doigts: "avant" } },
      { d: { cfg: "plate", at: "neutre", off: [20, 0, 15], paume: "bas", doigts: "avant" }, t: 350, arc: 10 },
      { d: { cfg: "plate", at: "neutre", off: [45, 0, 15], paume: "bas", doigts: "avant" }, t: 350, arc: 10 }
    ]
  },
  {
    id: "montagne", mot: "Montagne", theme: "nature", niveau: 2,
    syn: ["montagnes", "mont"],
    sym: true,
    desc: "Tes deux mains à plat, inclinées comme un toit, partent du bas et montent l'une vers l'autre pour former un sommet devant ton visage.",
    astuce: "Tes mains dessinent les pentes jusqu'au sommet.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/montagne",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [35, -15, 0], paume: "bas-dedans", doigts: "haut-dedans" } },
      { d: { cfg: "plate", at: "neutre_haut", off: [8, 0, 0], paume: "bas-dedans", doigts: "haut-dedans" }, t: 550, contact: "deux" }
    ]
  },
  {
    id: "soleil", mot: "Soleil", theme: "nature", niveau: 1,
    desc: "Au-dessus de ta tête, ta main fermée en O s'ouvre vers le bas, doigts écartés.",
    astuce: "Le soleil envoie ses rayons sur toi.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "O", at: "tete", off: [45, 30, 45], paume: "bas", doigts: "avant" }, visage: "sourire" },
      { d: { cfg: "5_courbe", at: "tete", off: [45, 20, 50], paume: "bas", doigts: "avant" }, t: 350 }
    ]
  },
  {
    id: "etoile", mot: "Étoile", theme: "nature", niveau: 2,
    syn: ["étoiles"],
    desc: "Lève tes deux index au-dessus de ton visage et fais-les glisser l'un contre l'autre vers le haut, chacun son tour.",
    astuce: "Les étoiles qui scintillent dans le ciel.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/%C3%A9toile",
    rep: 3,
    images: [
      { d: { cfg: "index", at: "neutre_haut", off: [5, 45, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "index", at: "neutre_haut", off: [5, 30, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "index", at: "neutre_haut", off: [5, 30, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "index", at: "neutre_haut", off: [5, 45, 0], paume: "avant", doigts: "haut" }, t: 220 }
    ]
  },
  {
    id: "ciel", mot: "Ciel", theme: "nature", niveau: 2,
    syn: ["en haut"],
    desc: "Main à plat, paume vers le bas, au-dessus de ta tête : fais un mouvement en arc du milieu vers ton côté.",
    astuce: "Tu caresses le grand plafond du ciel.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/ciel",
    images: [
      { d: { cfg: "plate", at: "tete", off: [0, 35, 15], paume: "bas", doigts: "dedans" } },
      { d: { cfg: "plate", at: "tete", off: [45, 30, 10], paume: "bas", doigts: "dedans" }, t: 500, arc: 12 }
    ]
  },

  // ───────────────────────── MÉTÉO ─────────────────────────

  {
    id: "meteo", mot: "Météo", theme: "meteo", niveau: 2,
    syn: ["temps qu'il fait", "quel temps"],
    sym: true,
    desc: "Lève tes deux mains en griffe de chaque côté de ta tête, paumes vers l'avant, et fais-les tourner un peu en remuant les doigts.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/m%C3%A9t%C3%A9o",
    rep: 2,
    images: [
      { d: { cfg: "griffe", at: "tempe_dom", off: [35, 15, 15], paume: "avant", doigts: "haut" } },
      { d: { cfg: "griffe", at: "tempe_dom", off: [35, 15, 15], paume: "dedans", doigts: "haut" }, t: 300, agiter: true }
    ]
  },
  {
    id: "pluie", mot: "Pluie", theme: "meteo", niveau: 1,
    syn: ["pleuvoir", "il pleut"],
    sym: true,
    desc: "Au-dessus de ta tête, tes mains aux doigts écartés et un peu pliés descendent en faisant bouger les doigts.",
    astuce: "Ce sont les gouttes qui tombent du ciel.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    rep: 2,
    images: [
      { d: { cfg: "5_courbe", at: "tete", off: [55, 15, 40], paume: "bas", doigts: "avant" } },
      { d: { cfg: "5_courbe", at: "neutre", off: [30, 0, 10], paume: "bas", doigts: "avant" }, t: 600, agiter: true }
    ]
  },
  {
    id: "neige", mot: "Neige", theme: "meteo", niveau: 1,
    syn: ["neiger", "il neige", "flocon"],
    sym: true,
    desc: "Lève tes deux mains ouvertes en hauteur, puis descends-les doucement en réunissant le bout des doigts, deux fois.",
    astuce: "Les flocons tombent doucement.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/neige",
    rep: 2,
    images: [
      { d: { cfg: "5", at: "neutre_haut", off: [30, 20, 10], paume: "avant", doigts: "haut" } },
      { d: { cfg: "bec", at: "neutre", off: [20, -5, 10], paume: "arriere", doigts: "bas" }, t: 550 }
    ]
  },
  {
    id: "vent", mot: "Vent", theme: "meteo", niveau: 2,
    syn: ["venteux", "il y a du vent"],
    desc: "Tes deux mains en V, paumes vers l'avant, à hauteur du visage, balaient l'espace ensemble d'un côté à l'autre, deux fois.",
    astuce: "V comme Vent : il souffle et emporte tout.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/vent",
    rep: 2,
    images: [
      { d: { cfg: "V", at: "neutre_dom", off: [15, 25, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "V", at: "neutre_non", off: [-25, 15, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "V", at: "neutre", off: [-15, 15, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "V", at: "neutre_non", off: [20, 15, 0], paume: "avant", doigts: "haut" }, t: 450, arc: 15 }
    ]
  },
  {
    id: "nuage", mot: "Nuage", theme: "meteo", niveau: 2,
    syn: ["nuages", "nuageux"],
    sym: true,
    desc: "Au-dessus de ta tête, tes mains arrondies, doigts écartés, s'écartent sur les côtés en faisant des petites bosses.",
    astuce: "Tu dessines la forme toute ronde d'un nuage dans le ciel.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "5_courbe", at: "tete", off: [5, -2, 15], paume: "avant", doigts: "haut" } },
      { d: { cfg: "5_courbe", at: "tete", off: [30, 3, 15], paume: "avant", doigts: "haut" }, t: 350, arc: 15 },
      { d: { cfg: "5_courbe", at: "tete", off: [55, -7, 15], paume: "avant", doigts: "haut" }, t: 350, arc: 15 }
    ]
  },
  {
    id: "orage", mot: "Orage", theme: "meteo", niveau: 2,
    syn: ["éclair", "tonnerre", "tempête"],
    desc: "Lève ta main en hauteur sur le côté, puis fais-la descendre d'un coup sec vers l'avant, index tendu, comme un éclair.",
    astuce: "L'éclair qui frappe d'un coup !",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/orage",
    images: [
      { d: { cfg: "index", at: "tete", off: [40, 14, 10], paume: "avant", doigts: "haut" }, visage: "concentre" },
      { d: { cfg: "index", at: "neutre_haut", off: [25, 0, 25], paume: "bas", doigts: "avant" }, t: 180 },
      { d: { cfg: "index", at: "neutre", off: [10, -10, 40], paume: "bas", doigts: "avant" }, t: 180 }
    ]
  },
  {
    id: "arc-en-ciel", mot: "Arc-en-ciel", theme: "meteo", niveau: 2,
    sym: true,
    desc: "Mains ouvertes, doigts écartés, paumes vers toi, croisées devant ton visage : écarte-les en dessinant un grand arc jusque sur les côtés.",
    astuce: "Tes doigts écartés, ce sont les bandes de couleurs.",
    fiable: "sur", source: "https://dico.elix-lsf.fr/dictionnaire/arc-en-ciel",
    images: [
      { d: { cfg: "5", at: "neutre_haut", off: [-5, 0, 0], paume: "arriere", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "5", at: "neutre_haut", off: [30, 25, 0], paume: "arriere", doigts: "haut" }, t: 350 },
      { d: { cfg: "5", at: "cote_dom", off: [10, 10, 0], paume: "arriere", doigts: "haut" }, t: 400, arc: 15 }
    ]
  }

]);
