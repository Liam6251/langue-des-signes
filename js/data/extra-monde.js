// Signes LSF supplémentaires : lieux, transports, nature, animaux, météo, calendrier, temps,
// sports, loisirs, techno, métiers, couleurs.
// ATTENTION : les pages sources (Dico Elix) confirment que le mot existe en LSF mais ne décrivent pas
// le geste par écrit (vidéo seulement). Les descriptions ci-dessous sont donc à vérifier sur la vidéo :
// tous les signes sont marqués "incertain". Sources et doutes : notes/research/extra-monde.md
LSF.ajouter([

  // ======================= LIEUX =======================
  {
    id: "gare", mot: "Gare", theme: "lieux", niveau: 2,
    syn: ["station", "quai", "gare SNCF"],
    desc: "Fais d'abord « train » (deux V, la main droite fait de petits cercles), puis dessine un toit avec tes deux mains plates qui se touchent du bout des doigts.",
    astuce: "Train + toit : la maison des trains.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/gare",
    images: [
      { nd: { cfg: "V", at: "neutre_non", paume: "dedans", doigts: "avant" },
        d: { cfg: "V", at: "neutre_dom", off: [0, 12, -10], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "V", at: "neutre_dom", off: [0, -12, -10], paume: "dedans", doigts: "avant" }, t: 250 },
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" }, t: 450 },
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" }, t: 250, contact: "deux" }
    ]
  },
  {
    id: "hopital", mot: "Hôpital", theme: "lieux", niveau: 1,
    syn: ["clinique", "urgences", "CHU"],
    desc: "Avec ton index droit, dessine une petite croix (un trait vertical puis un trait horizontal) sur le haut de ton bras gauche.",
    astuce: "La croix de l'hôpital.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/h%C3%B4pital",
    images: [
      { d: { cfg: "index", at: "epaule_non", touch: "index", off: [-5, -10, 20], paume: "avant", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: "index", at: "epaule_non", touch: "index", off: [-5, -32, 20], paume: "avant", doigts: "dedans" }, t: 300, contact: true },
      { d: { cfg: "index", at: "epaule_non", touch: "index", off: [-15, -21, 20], paume: "avant", doigts: "dedans" }, t: 250 },
      { d: { cfg: "index", at: "epaule_non", touch: "index", off: [5, -21, 20], paume: "avant", doigts: "dedans" }, t: 300, contact: true }
    ]
  },
  {
    id: "mairie", mot: "Mairie", theme: "lieux", niveau: 2,
    syn: ["maire", "hôtel de ville"],
    desc: "Fais glisser ta main plate de ton épaule droite jusqu'à ta hanche gauche, comme l'écharpe tricolore du maire.",
    astuce: "L'écharpe du maire.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/mairie",
    images: [
      { d: { cfg: "plate", at: "epaule_dom", touch: "doigts", off: [0, 0, 12], paume: "arriere", doigts: "haut" }, visage: "neutre", contact: true },
      { d: { cfg: "plate", at: "ventre_non", touch: "doigts", off: [0, 0, 12], paume: "arriere", doigts: "haut" }, t: 600 }
    ]
  },
  {
    id: "eglise", mot: "Église", theme: "lieux", niveau: 2,
    syn: ["cathédrale", "chapelle", "culte"],
    desc: "Fais le signe de croix : avec ton index, touche ton front, ta poitrine, puis ton épaule gauche et ton épaule droite.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/%C3%A9glise",
    images: [
      { d: { cfg: "index", at: "front", touch: "index", off: [0, 0, 10], paume: "arriere", doigts: "haut" }, visage: "neutre", contact: true },
      { d: { cfg: "index", at: "poitrine", touch: "index", off: [0, 0, 10], paume: "arriere", doigts: "haut" }, t: 400, contact: true },
      { d: { cfg: "index", at: "epaule_non", touch: "index", off: [0, 0, 10], paume: "arriere", doigts: "dedans" }, t: 350, contact: true },
      { d: { cfg: "index", at: "epaule_dom", touch: "index", off: [0, 0, 40], paume: "arriere", doigts: "haut" }, t: 400, contact: true }
    ]
  },
  {
    id: "rue", mot: "Rue", theme: "lieux", niveau: 1,
    syn: ["avenue", "chemin", "boulevard"],
    desc: "Tes deux mains plates se font face, un peu écartées, comme deux rangées de maisons : avance-les ensemble vers l'avant, en les gardant à la même distance.",
    astuce: "La rue passe entre deux rangées de maisons.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/rue",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre", off: [28, 0, -5], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [28, 0, 60], paume: "dedans", doigts: "avant" }, t: 650 }
    ]
  },
  {
    id: "hotel", mot: "Hôtel", theme: "lieux", niveau: 2,
    syn: ["auberge", "chambre d'hôtel", "hébergement"],
    desc: "Fais le signe « maison » (deux mains plates qui forment un toit), puis pose ta main plate contre ta joue en penchant la tête : on y dort.",
    astuce: "Maison + dormir.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/h%C3%B4tel",
    images: [
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" }, t: 250, contact: "deux" },
      { d: { cfg: "plate", at: "joue_dom", off: [12, 0, 5], paume: "dedans", doigts: "haut" }, nd: { at: "repos" }, t: 450, visage: "fatigue" },
      { d: { cfg: "plate", at: "joue_dom", touch: "paume", paume: "dedans", doigts: "haut" }, t: 300, contact: true }
    ]
  },
  {
    id: "banque", mot: "Banque", theme: "lieux", niveau: 2,
    syn: ["compte", "guichet"],
    desc: "Fais le signe « argent » (frotte le pouce contre le bout des doigts, paume vers le haut), puis dessine un toit avec tes deux mains plates.",
    astuce: "Argent + bâtiment.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/banque",
    images: [
      { d: { cfg: "bec", at: "neutre_dom", off: [0, -5, 0], paume: "haut", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "bec", at: "neutre_dom", off: [4, -5, 0], paume: "haut", doigts: "avant" }, t: 600, agiter: true },
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" }, t: 450 },
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" }, t: 250, contact: "deux" }
    ]
  },
  {
    id: "pharmacie", mot: "Pharmacie", theme: "lieux", niveau: 2,
    syn: ["pharmacien", "officine"],
    desc: "Ta main gauche est ouverte, paume vers le haut. Avec l'index droit, dessine une croix sur le creux de ta paume (la croix verte des pharmacies).",
    astuce: "La croix verte de la pharmacie.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/pharmacie",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "haut", doigts: "avant" },
        d: { cfg: "index", at: "nd:paume", touch: "index", off: [0, 15, 0], paume: "bas", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [0, -15, 0], paume: "bas", doigts: "dedans" }, t: 300, contact: "nd" },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [-15, 0, 0], paume: "bas", doigts: "dedans" }, t: 250 },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [15, 0, 0], paume: "bas", doigts: "dedans" }, t: 300, contact: "nd" }
    ]
  },

  // ======================= TRANSPORTS =======================
  {
    id: "moto", mot: "Moto", theme: "transports", niveau: 1,
    syn: ["scooter", "motocyclette", "mobylette"],
    desc: "Tes deux poings tiennent le guidon devant toi, paumes vers le bas. Tourne ton poignet droit vers toi, comme pour donner des gaz, deux fois.",
    astuce: "Tu accélères !",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/moto",
    rep: 2,
    images: [
      { d: { cfg: "poing", at: "neutre", off: [28, 0, 0], paume: "bas", doigts: "dedans" },
        nd: { cfg: "poing", at: "neutre", off: [28, 0, 0], paume: "bas", doigts: "dedans" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre", off: [28, 0, 0], paume: "arriere-bas", doigts: "dedans" }, t: 250 }
    ]
  },
  {
    id: "camion", mot: "Camion", theme: "transports", niveau: 1,
    syn: ["poids lourd", "camionnette", "livraison"],
    desc: "Tes deux poings tiennent un grand volant presque à plat, bas devant toi : tourne-le deux fois, en gros mouvements.",
    astuce: "Comme « voiture », mais le volant est grand et couché.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/camion",
    rep: 2,
    images: [
      { d: { cfg: "poing", at: "neutre_bas", off: [32, 0, 12], paume: "bas", doigts: "dedans" },
        nd: { cfg: "poing", at: "neutre_bas", off: [32, 0, -12], paume: "bas", doigts: "dedans" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre_bas", off: [32, 0, -12], paume: "bas", doigts: "dedans" },
        nd: { cfg: "poing", at: "neutre_bas", off: [32, 0, 12], paume: "bas", doigts: "dedans" }, t: 400, arc: 8 }
    ]
  },
  {
    id: "tramway", mot: "Tramway", theme: "transports", niveau: 2,
    syn: ["tram"],
    desc: "Ta main droite en V fait rouler le tram vers l'avant, pendant que ton index gauche, levé au-dessus, dessine le fil électrique.",
    astuce: "Le tram suit son fil au-dessus de lui.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/tramway",
    images: [
      { nd: { cfg: "index", at: "neutre_haut", off: [0, 30, 20], paume: "bas", doigts: "avant" },
        d: { cfg: "V", at: "neutre_dom", off: [0, 0, -10], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "V", at: "neutre_dom", off: [0, 0, 55], paume: "dedans", doigts: "avant" }, t: 650 }
    ]
  },
  {
    id: "route", mot: "Route", theme: "transports", niveau: 1,
    syn: ["autoroute", "trajet"],
    desc: "Ta main plate, paume vers le bas, part près de toi et s'éloigne vers l'avant en suivant une route qui tourne.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/route",
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [0, -10, -15], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre_dom", off: [15, -10, 25], paume: "bas", doigts: "avant" }, t: 400, arc: 6 },
      { d: { cfg: "plate", at: "neutre_dom", off: [-5, -10, 55], paume: "bas", doigts: "avant" }, t: 400, arc: 6 },
      { d: { cfg: "plate", at: "neutre_dom", off: [10, -10, 85], paume: "bas", doigts: "avant" }, t: 400, arc: 6 }
    ]
  },
  {
    id: "taxi", mot: "Taxi", theme: "transports", niveau: 2,
    syn: ["VTC", "faire un taxi"],
    desc: "Fais le signe « voiture » (tes deux poings tournent un volant), puis lève ton bras droit, main ouverte, pour héler un taxi.",
    astuce: "Voiture + bras levé pour l'appeler.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/taxi",
    images: [
      { d: { cfg: "poing", at: "neutre", off: [28, 10, 0], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [28, -10, 0], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "poing", at: "neutre", off: [28, -10, 0], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [28, 10, 0], paume: "dedans", doigts: "haut" }, t: 350 },
      { d: { cfg: "5", at: "cote_dom", off: [0, 45, 0], paume: "avant", doigts: "haut" }, nd: { at: "repos" }, t: 500, arc: 8 }
    ]
  },

  // ======================= NATURE =======================
  {
    id: "lune", mot: "Lune", theme: "nature", niveau: 1,
    syn: ["croissant", "pleine lune"],
    desc: "Forme un C avec ta main (pouce et doigts en croissant) et lève-la en haut, à côté de ta tête, comme la lune dans le ciel.",
    astuce: "Le C dessine le croissant de lune.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/lune",
    images: [
      { d: { cfg: "C", at: "tempe_dom", off: [25, 15, 15], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "C", at: "tempe_dom", off: [30, 45, 15], paume: "dedans", doigts: "haut" }, t: 600, arc: 8 }
    ]
  },
  {
    id: "feu", mot: "Feu", theme: "nature", niveau: 1,
    syn: ["flamme", "incendie", "brûler"],
    desc: "Tes deux mains aux doigts écartés montent devant toi en faisant frétiller les doigts, comme des flammes.",
    astuce: "Tes doigts sont les flammes qui dansent.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/feu",
    sym: true,
    images: [
      { d: { cfg: "5", at: "neutre_bas", off: [15, -5, 0], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre", off: [15, 15, 0], paume: "arriere", doigts: "haut" }, t: 700, agiter: true }
    ]
  },
  {
    id: "riviere", mot: "Rivière", theme: "nature", niveau: 2,
    syn: ["fleuve", "ruisseau", "cours d'eau"],
    desc: "Ta main plate, paume vers le bas, avance devant toi en ondulant et en frétillant doucement des doigts, comme l'eau qui coule.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/rivi%C3%A8re",
    images: [
      { d: { cfg: "5", at: "neutre_dom", off: [0, -5, -10], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre_dom", off: [15, -5, 25], paume: "bas", doigts: "avant" }, t: 450, arc: 6, agiter: true },
      { d: { cfg: "5", at: "neutre_dom", off: [-5, -5, 55], paume: "bas", doigts: "avant" }, t: 450, arc: 6, agiter: true },
      { d: { cfg: "5", at: "neutre_dom", off: [10, -5, 85], paume: "bas", doigts: "avant" }, t: 450, arc: 6, agiter: true }
    ]
  },
  {
    id: "ile", mot: "Île", theme: "nature", niveau: 2,
    syn: ["îlot", "archipel"],
    desc: "Ton poing gauche est l'île. Ta main droite plate, paume vers le bas, fait tout le tour du poing, comme la mer qui l'entoure.",
    astuce: "L'île est entourée d'eau.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/%C3%AEle",
    images: [
      { nd: { cfg: "poing", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "plate", at: "nd:dos", off: [25, 8, 0], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "nd:dos", off: [0, 8, 28], paume: "bas", doigts: "avant" }, t: 280 },
      { d: { cfg: "plate", at: "nd:dos", off: [-25, 8, 0], paume: "bas", doigts: "avant" }, t: 280 },
      { d: { cfg: "plate", at: "nd:dos", off: [0, 8, -28], paume: "bas", doigts: "avant" }, t: 280 },
      { d: { cfg: "plate", at: "nd:dos", off: [25, 8, 0], paume: "bas", doigts: "avant" }, t: 280 }
    ]
  },
  {
    id: "volcan", mot: "Volcan", theme: "nature", niveau: 2,
    syn: ["éruption", "lave"],
    desc: "Tes deux mains plates dessinent une montagne (elles se rejoignent en pointe), puis tes doigts s'ouvrent d'un coup au sommet et jaillissent vers le haut, comme la lave.",
    astuce: "Une montagne qui crache du feu.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/volcan",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre", off: [35, -15, 0], paume: "bas-dedans", doigts: "haut-dedans" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre_haut", off: [8, -5, 0], paume: "bas-dedans", doigts: "haut-dedans" }, t: 500, contact: "deux" },
      { d: { cfg: "5", at: "neutre_haut", off: [0, 30, 0], paume: "arriere", doigts: "haut" }, t: 400, agiter: true, visage: "surpris" }
    ]
  },

  // ======================= ANIMAUX =======================
  {
    id: "ours", mot: "Ours", theme: "animaux", niveau: 2,
    syn: ["nounours", "ourson", "peluche"],
    desc: "Croise tes bras sur ta poitrine, mains en griffe sur tes épaules, et gratte-toi plusieurs fois, comme un ours qui se frotte.",
    astuce: "L'ours se gratte le dos contre un arbre.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/ours",
    sym: true, rep: 3,
    images: [
      { d: { cfg: "griffe", at: "epaule_non", touch: "doigts", off: [0, 5, 20], paume: "arriere", doigts: "haut-dedans" }, visage: "neutre" },
      { d: { cfg: "griffe", at: "epaule_non", touch: "doigts", off: [0, -12, 20], paume: "arriere", doigts: "haut-dedans" }, t: 220, contact: true }
    ]
  },
  {
    id: "girafe", mot: "Girafe", theme: "animaux", niveau: 2,
    desc: "Ta main arrondie part de ton cou et monte tout droit très haut au-dessus de ta tête, comme le long cou de la girafe.",
    astuce: "Un très long cou.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/girafe",
    images: [
      { d: { cfg: "C", at: "cou", off: [0, 0, 12], paume: "dedans", doigts: "haut" }, visage: "neutre", contact: true },
      { d: { cfg: "C", at: "tete", off: [0, 40, 12], paume: "dedans", doigts: "haut" }, t: 750 }
    ]
  },
  {
    id: "tigre", mot: "Tigre", theme: "animaux", niveau: 2,
    syn: ["félin", "panthère"],
    desc: "Tes deux mains en griffe, paumes vers ton visage, glissent sur tes joues pour dessiner les rayures du tigre. Montre les dents.",
    astuce: "Tu dessines les rayures sur ton visage.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/tigre",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "griffe", at: "joue_dom", off: [30, 5, 15], paume: "arriere", doigts: "haut-dedans" }, visage: "colere", bouche: "dents" },
      { d: { cfg: "griffe", at: "joue_dom", off: [8, -10, 15], paume: "arriere", doigts: "haut-dedans" }, t: 300 }
    ]
  },
  {
    id: "requin", mot: "Requin", theme: "animaux", niveau: 2,
    syn: ["aileron"],
    desc: "Ta main gauche à plat est la mer. Ta main droite, debout sur la tranche, glisse dessus vers l'avant : c'est l'aileron du requin.",
    astuce: "On voit l'aileron fendre l'eau.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/requin",
    images: [
      { nd: { cfg: "plate", at: "neutre", paume: "bas", doigts: "dedans" },
        d: { cfg: "plate", at: "nd:dos", touch: "tranche", off: [0, 0, -25], paume: "dedans", doigts: "avant-haut" }, visage: "peur" },
      { d: { cfg: "plate", at: "nd:dos", touch: "tranche", off: [0, 0, 30], paume: "dedans", doigts: "avant-haut" }, t: 700 }
    ]
  },
  {
    id: "abeille", mot: "Abeille", theme: "animaux", niveau: 2,
    syn: ["guêpe", "bourdon", "piqûre d'abeille"],
    desc: "Ton index fait des zigzags en volant et en bourdonnant, puis vient piquer le dos de ta main gauche.",
    astuce: "Bzzz... aïe !",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/abeille",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, -5, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "index", at: "neutre_dom", off: [0, 20, 20], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "index", at: "neutre", off: [-10, 25, 35], paume: "bas", doigts: "avant" }, t: 250, arc: 8 },
      { d: { cfg: "index", at: "neutre", off: [10, 15, 15], paume: "bas", doigts: "avant" }, t: 250, arc: 8 },
      { d: { cfg: "index", at: "nd:dos", touch: "index", paume: "bas", doigts: "dedans" }, t: 250, contact: "nd", visage: "peur" }
    ]
  },
  {
    id: "mouche", mot: "Mouche", theme: "animaux", niveau: 2,
    syn: ["moustique", "insecte", "mouches"],
    desc: "Ton pouce et ton index se rejoignent en petit rond. Fais voler cette main en petits zigzags rapides, comme une mouche agaçante.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/mouche",
    images: [
      { d: { cfg: "pince_fermee", at: "neutre_dom", off: [0, 15, 10], paume: "bas", doigts: "avant" }, visage: "degout" },
      { d: { cfg: "pince_fermee", at: "neutre_dom", off: [18, 5, 25], paume: "bas", doigts: "avant" }, t: 160 },
      { d: { cfg: "pince_fermee", at: "neutre_dom", off: [-10, 20, 15], paume: "bas", doigts: "avant" }, t: 160 },
      { d: { cfg: "pince_fermee", at: "neutre_dom", off: [12, 0, 30], paume: "bas", doigts: "avant" }, t: 160 }
    ]
  },
  {
    id: "crocodile", mot: "Crocodile", theme: "animaux", niveau: 2,
    syn: ["alligator", "caïman"],
    desc: "Tes deux avant-bras sont la gueule : ta main gauche plate, paume vers le haut, en bas, ta main droite plate, paume vers le bas, en haut. Ouvre et referme la gueule deux fois, en claquant.",
    astuce: "Clac ! La grande gueule du crocodile.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/crocodile",
    rep: 2,
    images: [
      { nd: { cfg: "plate", at: "neutre", off: [0, -12, 0], paume: "haut", doigts: "avant" },
        d: { cfg: "plate", at: "nd:paume", off: [0, 30, 0], paume: "bas", doigts: "avant" }, visage: "colere" },
      { d: { cfg: "plate", at: "nd:paume", off: [0, 4, 0], paume: "bas", doigts: "avant" }, t: 220, contact: "nd" }
    ]
  },
  {
    id: "dauphin", mot: "Dauphin", theme: "animaux", niveau: 2,
    syn: ["orque", "baleine"],
    desc: "Ta main plate, doigts vers l'avant, saute en arc de cercle au-dessus de l'eau puis replonge, comme un dauphin qui fait un bond.",
    astuce: "Il saute hors de l'eau.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/dauphin",
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [0, -20, -10], paume: "dedans", doigts: "avant-haut" }, visage: "sourire" },
      { d: { cfg: "plate", at: "neutre_dom", off: [8, 25, 30], paume: "dedans", doigts: "avant" }, t: 400, arc: 15 },
      { d: { cfg: "plate", at: "neutre_dom", off: [15, -20, 65], paume: "dedans", doigts: "avant-bas" }, t: 400, arc: 15 }
    ]
  },

  // ======================= MÉTÉO =======================
  {
    id: "brouillard", mot: "Brouillard", theme: "meteo", niveau: 2,
    syn: ["brume", "il y a du brouillard"],
    desc: "Tes deux mains ouvertes passent lentement devant ton visage en se croisant, comme un voile blanc. Plisse les yeux.",
    astuce: "On n'y voit plus rien !",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/brouillard",
    sym: true,
    images: [
      { d: { cfg: "5", at: "neutre_haut", off: [30, 0, 10], paume: "arriere", doigts: "haut" }, visage: "concentre" },
      { d: { cfg: "5", at: "neutre_haut", off: [-10, 0, 14], paume: "arriere", doigts: "haut" }, t: 800 }
    ]
  },
  {
    id: "glace", mot: "Glace (gel)", theme: "meteo", niveau: 2,
    syn: ["gel", "verglas", "geler", "givre"],
    desc: "Frissonne les poings serrés devant toi (il fait très froid), puis glisse ta main plate, paume vers le bas, sur ta main gauche, comme sur une surface glissante.",
    astuce: "Froid + surface qui glisse.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/glace",
    images: [
      { d: { cfg: "poing", at: "neutre", off: [20, 5, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "poing", at: "neutre", off: [20, 5, 0], paume: "dedans", doigts: "avant" }, visage: "peur", bouche: "serree" },
      { d: { cfg: "poing", at: "neutre", off: [24, 5, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "poing", at: "neutre", off: [24, 5, 0], paume: "dedans", doigts: "avant" }, t: 150, agiter: true },
      { nd: { cfg: "plate", at: "neutre_non", paume: "bas", doigts: "avant" },
        d: { cfg: "plate", at: "nd:dos", off: [-20, 6, -5], paume: "bas", doigts: "avant" }, t: 450, visage: "neutre" },
      { d: { cfg: "plate", at: "nd:dos", off: [25, 6, 5], paume: "bas", doigts: "avant" }, t: 450 }
    ]
  },

  // ======================= CALENDRIER =======================
  {
    id: "printemps", mot: "Printemps", theme: "calendrier", niveau: 2,
    syn: ["au printemps"],
    desc: "Ta main fermée en bec, devant toi, s'ouvre en montant doucement et fait frétiller ses doigts, comme une plante qui pousse.",
    astuce: "La nature se réveille et pousse.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/printemps",
    images: [
      { d: { cfg: "bec", at: "neutre_bas", off: [10, -10, 10], paume: "arriere", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "5", at: "neutre", off: [10, 20, 10], paume: "arriere", doigts: "haut" }, t: 700, agiter: true }
    ]
  },
  {
    id: "hiver", mot: "Hiver", theme: "calendrier", niveau: 2,
    syn: ["en hiver"],
    desc: "Serre tes deux poings contre ta poitrine et tremble de froid, les épaules rentrées.",
    astuce: "Brrr, il fait froid !",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/hiver",
    sym: true, rep: 3,
    images: [
      { d: { cfg: "poing", at: "poitrine_dom", off: [10, 5, 15], paume: "arriere", doigts: "haut" }, visage: "peur", bouche: "serree" },
      { d: { cfg: "poing", at: "poitrine_dom", off: [14, 5, 15], paume: "arriere", doigts: "haut" }, t: 120, agiter: true }
    ]
  },
  {
    id: "noel", mot: "Noël", theme: "calendrier", niveau: 1,
    syn: ["sapin", "père Noël", "fêtes de fin d'année"],
    desc: "Tes deux mains dessinent un sapin : elles partent du haut, en pointe, puis s'écartent en descendant.",
    astuce: "La forme du sapin de Noël.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/no%C3%ABl",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre_haut", off: [3, 25, 0], paume: "avant", doigts: "haut-dedans" }, visage: "joie" },
      { d: { cfg: "plate", at: "neutre", off: [40, -20, 0], paume: "avant", doigts: "haut-dedans" }, t: 650 }
    ]
  },
  {
    id: "date", mot: "Date", theme: "calendrier", niveau: 2,
    syn: ["jour du mois"],
    desc: "Ta main gauche plate, debout, est la page du calendrier. Avec ton index droit, dessine un petit carré sur ta paume, comme pour entourer une case.",
    astuce: "Tu entoures le bon jour du calendrier.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/date",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "dedans", doigts: "haut" },
        d: { cfg: "index", at: "nd:paume", touch: "index", off: [-12, 12, 0], paume: "bas", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [12, 12, 0], paume: "bas", doigts: "dedans" }, t: 250, contact: "nd" },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [12, -12, 0], paume: "bas", doigts: "dedans" }, t: 250 },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [-12, -12, 0], paume: "bas", doigts: "dedans" }, t: 250 },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [-12, 12, 0], paume: "bas", doigts: "dedans" }, t: 250 }
    ]
  },

  // ======================= TEMPS =======================
  {
    id: "longtemps", mot: "Longtemps", theme: "temps", niveau: 2,
    syn: ["longue durée", "depuis longtemps", "très long"],
    desc: "Ta main plate, paume vers le côté, part près de ton visage et s'éloigne très loin devant toi, lentement, avec la bouche en « o ».",
    astuce: "Plus c'est long, plus la main va loin.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/longtemps",
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [10, 10, -10], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "loin", off: [10, 5, 0], paume: "dedans", doigts: "avant" }, t: 1000, bouche: "o" }
    ]
  },
  {
    id: "futur", mot: "Futur", theme: "temps", niveau: 2,
    syn: ["avenir", "dans le futur"],
    desc: "Ta main plate, doigts vers le haut et paume vers le côté, part de ton épaule et avance en arc vers l'avant : le futur est devant toi.",
    astuce: "Le futur est devant, le passé est derrière.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/futur",
    images: [
      { d: { cfg: "plate", at: "epaule_dom", off: [0, 20, 15], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre_dom", off: [10, 35, 60], paume: "dedans", doigts: "haut" }, t: 650, arc: 15 }
    ]
  },

  // ======================= SPORTS =======================
  {
    id: "ski", mot: "Ski", theme: "sports", niveau: 1,
    syn: ["skier", "piste", "snowboard"],
    desc: "Tes deux mains plates, paumes vers le bas, sont tes skis : glisse-les vers l'avant en les gardant côte à côte.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/ski",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre_bas", off: [10, 0, -10], paume: "bas", doigts: "avant" }, visage: "joie" },
      { d: { cfg: "plate", at: "neutre_bas", off: [10, 0, 55], paume: "bas", doigts: "avant" }, t: 600, arc: -6 }
    ]
  },
  {
    id: "rugby", mot: "Rugby", theme: "sports", niveau: 2,
    syn: ["ballon ovale", "mêlée"],
    desc: "Tes deux mains tiennent un ballon ovale contre ta hanche, puis le lancent sur le côté, en une passe.",
    astuce: "Le ballon ovale passe de main en main.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/rugby",
    images: [
      { d: { cfg: "5_courbe", at: "neutre", off: [8, -5, 5], paume: "dedans", doigts: "avant" },
        nd: { cfg: "5_courbe", at: "neutre", off: [8, -5, 5], paume: "dedans", doigts: "avant" }, visage: "concentre" },
      { d: { cfg: "5_courbe", at: "neutre", off: [50, 5, 20], paume: "dedans", doigts: "avant" },
        nd: { cfg: "5_courbe", at: "neutre", off: [-10, 5, 20], paume: "dedans", doigts: "avant" }, t: 400, arc: 8 }
    ]
  },
  {
    id: "course", mot: "Course (courir)", theme: "sports", niveau: 1,
    syn: ["courir", "footing", "sprint", "coureur"],
    desc: "Tes deux poings, bras pliés, bougent d'avant en arrière l'un après l'autre, comme tes bras quand tu cours.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/course",
    rep: 3,
    images: [
      { d: { cfg: "poing", at: "neutre", off: [20, 10, 20], paume: "dedans", doigts: "avant" },
        nd: { cfg: "poing", at: "neutre", off: [20, -5, -15], paume: "dedans", doigts: "avant" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre", off: [20, -5, -15], paume: "dedans", doigts: "avant" },
        nd: { cfg: "poing", at: "neutre", off: [20, 10, 20], paume: "dedans", doigts: "avant" }, t: 200 }
    ]
  },
  {
    id: "judo", mot: "Judo", theme: "sports", niveau: 2,
    syn: ["arts martiaux", "karaté", "kimono"],
    desc: "Tes deux poings attrapent le col d'un kimono devant toi, puis tirent d'un coup sec en tournant, comme pour projeter l'adversaire.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/judo",
    sym: true,
    images: [
      { d: { cfg: "poing", at: "neutre", off: [12, 10, 25], paume: "arriere", doigts: "haut" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre", off: [20, -15, -5], paume: "arriere", doigts: "haut-dedans" }, t: 350, arc: 10 }
    ]
  },
  {
    id: "golf", mot: "Golf", theme: "sports", niveau: 2,
    syn: ["club de golf", "jouer au golf"],
    desc: "Tes deux poings, l'un au-dessus de l'autre, tiennent un club de golf : balance-les en arc de cercle, de bas en haut, derrière ton épaule.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/golf",
    images: [
      { d: { cfg: "poing", at: "neutre_non", off: [0, -25, 10], paume: "dedans", doigts: "bas" },
        nd: { cfg: "poing", at: "neutre_non", off: [0, -15, 10], paume: "dedans", doigts: "bas" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre_dom", off: [20, -10, 25], paume: "dedans", doigts: "bas" },
        nd: { cfg: "poing", at: "neutre_dom", off: [-5, 0, 25], paume: "dedans", doigts: "bas" }, t: 400, arc: -12 },
      { d: { cfg: "poing", at: "epaule_dom", off: [0, 30, -5], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "epaule_dom", off: [-20, 20, -5], paume: "dedans", doigts: "haut" }, t: 400, arc: 12 }
    ]
  },
  {
    id: "equipe", mot: "Équipe", theme: "sports", niveau: 2,
    syn: ["groupe", "team", "joueurs"],
    desc: "Tes deux mains en E, paumes l'une vers l'autre, dessinent un demi-cercle vers l'avant et se rejoignent devant toi : le groupe se rassemble.",
    astuce: "E comme équipe.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/%C3%A9quipe",
    sym: true,
    images: [
      { d: { cfg: "E", at: "neutre", off: [38, 0, 0], paume: "dedans", doigts: "avant" }, visage: "sourire" },
      { d: { cfg: "E", at: "neutre", off: [24, 0, 38], paume: "dedans", doigts: "avant" }, t: 350, arc: 8 },
      { d: { cfg: "E", at: "neutre", off: [5, 0, 5], paume: "dedans", doigts: "avant" }, t: 350, arc: 8, contact: "deux" }
    ]
  },

  // ======================= LOISIRS =======================
  {
    id: "danse", mot: "Danse", theme: "loisirs", niveau: 1,
    syn: ["danser", "bal", "boîte de nuit"],
    desc: "Ta main gauche est ouverte, paume vers le haut. Ton index et ton majeur droits, en V tournés vers le bas, dansent sur ta paume en se balançant d'un côté à l'autre.",
    astuce: "Tes deux doigts sont les jambes d'un danseur.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/danse",
    rep: 2,
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "haut", doigts: "avant" },
        d: { cfg: "V", at: "nd:paume", touch: "doigts", off: [-12, 0, 0], paume: "arriere", doigts: "bas" }, visage: "joie" },
      { d: { cfg: "V", at: "nd:paume", touch: "doigts", off: [12, 0, 0], paume: "arriere", doigts: "bas" }, t: 280 }
    ]
  },
  {
    id: "theatre", mot: "Théâtre", theme: "loisirs", niveau: 2,
    syn: ["pièce de théâtre", "scène", "acteur", "comédien"],
    desc: "Ta main plate passe devant ton visage de haut en bas, deux fois : ton visage change d'expression (joyeux, puis triste), comme les deux masques du théâtre.",
    astuce: "Les masques du théâtre : tantôt content, tantôt triste.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/th%C3%A9%C3%A2tre",
    images: [
      { d: { cfg: "plate", at: "neutre_haut", off: [0, 20, 15], paume: "arriere", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "plate", at: "neutre_haut", off: [0, -25, 15], paume: "arriere", doigts: "haut" }, t: 400, visage: "triste" },
      { d: { cfg: "plate", at: "neutre_haut", off: [0, 20, 15], paume: "arriere", doigts: "haut" }, t: 400, visage: "joie" }
    ]
  },
  {
    id: "fete", mot: "Fête", theme: "loisirs", niveau: 1,
    syn: ["faire la fête", "célébrer", "party"],
    desc: "Tes deux mains ouvertes tournent en l'air, au-dessus de ta tête, doigts écartés, comme des confettis. Souris largement.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/f%C3%AAte",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "5", at: "tete", off: [25, 12, 0], paume: "avant", doigts: "haut" }, visage: "joie" },
      { d: { cfg: "5", at: "tete", off: [25, 12, 0], paume: "dedans", doigts: "haut" }, t: 300, agiter: true }
    ]
  },
  {
    id: "pecher", mot: "Pêcher", theme: "loisirs", niveau: 2,
    syn: ["pêche", "canne à pêche", "pêcheur"],
    desc: "Tes deux poings tiennent une canne à pêche : lance-la vers l'avant, puis ramène-la vers toi en enroulant le moulinet.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/p%C3%AAcher",
    images: [
      { d: { cfg: "poing", at: "neutre", off: [12, 15, 10], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [12, 0, 10], paume: "dedans", doigts: "haut" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre", off: [12, 10, 45], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [12, -5, 35], paume: "dedans", doigts: "haut" }, t: 300, arc: 10 },
      { d: { cfg: "poing", at: "neutre", off: [12, 30, -5], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [12, 0, 10], paume: "dedans", doigts: "haut" }, t: 500, visage: "joie" }
    ]
  },
  {
    id: "camping", mot: "Camping", theme: "loisirs", niveau: 2,
    syn: ["tente", "camper", "colonie"],
    desc: "Dessine une tente avec tes deux mains plates qui se touchent du bout des doigts, puis plante les piquets : ton poing droit tape sur ton poing gauche, deux fois.",
    astuce: "La tente, puis les piquets qu'on enfonce.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/camping",
    images: [
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [14, 22, 0], paume: "dedans-bas", doigts: "haut-dedans" }, visage: "sourire" },
      { d: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" },
        nd: { cfg: "plate", at: "neutre", touch: "doigts", off: [0, 25, 0], paume: "dedans-bas", doigts: "haut-dedans" }, t: 300, contact: "deux" },
      { nd: { cfg: "poing", at: "neutre_non", off: [0, -15, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "poing", at: "nd:dos", off: [0, 25, 0], paume: "dedans", doigts: "avant" }, t: 450 },
      { d: { cfg: "poing", at: "nd:dos", touch: "tranche", paume: "dedans", doigts: "avant" }, t: 200, contact: "nd" },
      { d: { cfg: "poing", at: "nd:dos", off: [0, 25, 0], paume: "dedans", doigts: "avant" }, t: 200 },
      { d: { cfg: "poing", at: "nd:dos", touch: "tranche", paume: "dedans", doigts: "avant" }, t: 200, contact: "nd" }
    ]
  },

  // ======================= TECHNO =======================
  {
    id: "television", mot: "Télévision", theme: "techno", niveau: 1,
    syn: ["télé", "TV", "regarder la télé"],
    desc: "Dessine un écran rectangulaire devant toi avec tes deux mains en L, puis pointe tes doigts en V vers lui comme des yeux qui regardent.",
    astuce: "Un écran + des yeux qui regardent.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/t%C3%A9l%C3%A9vision",
    images: [
      { d: { cfg: "L", at: "neutre_haut", off: [10, 5, 10], paume: "avant", doigts: "haut" },
        nd: { cfg: "L", at: "neutre_haut", off: [10, -10, 10], paume: "avant", doigts: "bas" }, visage: "neutre" },
      { d: { cfg: "L", at: "neutre_haut", off: [38, 10, 10], paume: "avant", doigts: "haut" },
        nd: { cfg: "L", at: "neutre_haut", off: [38, -15, 10], paume: "avant", doigts: "bas" }, t: 450 },
      { d: { cfg: "V", at: "oeil_dom", off: [0, -5, 25], paume: "bas", doigts: "avant" }, nd: { at: "repos" }, t: 450 }
    ]
  },
  {
    id: "ecran", mot: "Écran", theme: "techno", niveau: 1,
    syn: ["moniteur", "écran d'ordinateur", "affichage"],
    desc: "Tes deux mains en L dessinent les quatre coins d'un écran rectangulaire, en s'écartant l'une de l'autre.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/%C3%A9cran",
    images: [
      { d: { cfg: "L", at: "neutre_haut", off: [10, 5, 10], paume: "avant", doigts: "haut" },
        nd: { cfg: "L", at: "neutre_haut", off: [10, -10, 10], paume: "avant", doigts: "bas" }, visage: "neutre" },
      { d: { cfg: "L", at: "neutre_haut", off: [38, 10, 10], paume: "avant", doigts: "haut" },
        nd: { cfg: "L", at: "neutre_haut", off: [38, -15, 10], paume: "avant", doigts: "bas" }, t: 500 }
    ]
  },
  {
    id: "radio", mot: "Radio", theme: "techno", niveau: 2,
    syn: ["poste de radio", "écouter la radio"],
    desc: "Ta main droite en C est collée contre ton oreille, pendant que ta main gauche tourne le bouton de réglage devant toi.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/radio",
    images: [
      { d: { cfg: "C", at: "oreille_dom", off: [10, 0, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "pince_fermee", at: "neutre_non", paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "C", at: "oreille_dom", touch: "paume", paume: "dedans", doigts: "avant" },
        nd: { cfg: "pince_fermee", at: "neutre_non", paume: "haut", doigts: "avant" }, t: 400, contact: true }
    ]
  },
  {
    id: "imprimante", mot: "Imprimante", theme: "techno", niveau: 2,
    syn: ["imprimer", "photocopieuse", "impression"],
    desc: "Ta main gauche plate, paume vers le bas, est l'imprimante. Ta main droite plate sort de dessous et avance vers toi comme la feuille qui sort.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/imprimante",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, 0, 20], paume: "bas", doigts: "avant" },
        d: { cfg: "plate", at: "nd:paume", off: [0, -15, 25], paume: "haut", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "nd:paume", off: [0, -15, -10], paume: "haut", doigts: "avant" }, t: 650 }
    ]
  },
  {
    id: "clavier", mot: "Clavier", theme: "techno", niveau: 1,
    syn: ["taper", "touches"],
    desc: "Tes deux mains aux doigts un peu courbés, paumes vers le bas, bougent leurs doigts comme si tu tapais sur un clavier.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/clavier",
    sym: true,
    images: [
      { d: { cfg: "5_courbe", at: "neutre_bas", off: [18, 0, 0], paume: "bas", doigts: "avant" }, visage: "concentre" },
      { d: { cfg: "5_courbe", at: "neutre_bas", off: [18, -3, 0], paume: "bas", doigts: "avant" }, t: 900, agiter: true }
    ]
  },
  {
    id: "application", mot: "Application", theme: "techno", niveau: 2,
    syn: ["appli", "app", "logiciel"],
    desc: "Ta main gauche, paume vers toi, est l'écran du téléphone. Avec ton index droit, touche l'écran à deux endroits différents.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/application",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, 0, 25], paume: "arriere", doigts: "haut" },
        d: { cfg: "index", at: "nd:paume", touch: "index", off: [-8, 10, -20], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [-8, 10, 0], paume: "bas", doigts: "avant" }, t: 220, contact: "nd" },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [8, -10, -20], paume: "bas", doigts: "avant" }, t: 300 },
      { d: { cfg: "index", at: "nd:paume", touch: "index", off: [8, -10, 0], paume: "bas", doigts: "avant" }, t: 220, contact: "nd" }
    ]
  },

  // ======================= MÉTIERS (personnes) =======================
  {
    id: "pompier", mot: "Pompier", theme: "personnes", niveau: 1,
    syn: ["sapeur-pompier", "caserne", "incendie secours"],
    desc: "Ta main plate suit le haut de ton crâne, de l'avant vers l'arrière, pour dessiner la crête du casque de pompier.",
    astuce: "La crête du casque.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/pompier",
    images: [
      { d: { cfg: "plate", at: "front", off: [0, 12, 8], paume: "dedans", doigts: "arriere-haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "tete", off: [0, 12, -18], paume: "dedans", doigts: "arriere-haut" }, t: 500 }
    ]
  },
  {
    id: "policier", mot: "Policier", theme: "personnes", niveau: 1,
    syn: ["police", "gendarme", "agent de police"],
    desc: "Pose le côté de ta main plate, paume vers le bas, sur ton front, comme la visière d'un képi.",
    astuce: "Le képi du policier.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/policier",
    images: [
      { d: { cfg: "plate", at: "front", off: [0, 8, 20], paume: "bas", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: "plate", at: "front", touch: "tranche", off: [0, 4, 0], paume: "bas", doigts: "dedans" }, t: 350, contact: true }
    ]
  },
  {
    id: "infirmier", mot: "Infirmier(ère)", theme: "personnes", niveau: 2,
    syn: ["infirmière", "infirmier", "soignant", "piqûre"],
    desc: "Ton index droit pique le dessus de ton avant-bras gauche, comme une piqûre ou une prise de sang.",
    astuce: "L'infirmière qui fait la piqûre.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/infirmier",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "haut", doigts: "avant" },
        d: { cfg: "index", at: "nd:poignet", touch: "index", off: [0, 20, 0], paume: "dedans", doigts: "bas" }, visage: "neutre" },
      { d: { cfg: "index", at: "nd:poignet", touch: "index", paume: "dedans", doigts: "bas" }, t: 250, contact: "nd" }
    ]
  },
  {
    id: "boulanger", mot: "Boulanger", theme: "personnes", niveau: 2,
    syn: ["boulangère", "boulangerie", "pâtissier"],
    desc: "Tes deux poings pétrissent la pâte devant toi, en roulant l'un sur l'autre plusieurs fois.",
    astuce: "Tu pétris le pain.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/boulanger",
    rep: 3,
    images: [
      { d: { cfg: "poing", at: "neutre_bas", off: [12, 0, 12], paume: "bas", doigts: "avant" },
        nd: { cfg: "poing", at: "neutre_bas", off: [12, 0, -12], paume: "bas", doigts: "avant" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre_bas", off: [12, 0, -12], paume: "bas", doigts: "avant" },
        nd: { cfg: "poing", at: "neutre_bas", off: [12, 0, 12], paume: "bas", doigts: "avant" }, t: 250 }
    ]
  },
  {
    id: "facteur", mot: "Facteur", theme: "personnes", niveau: 2,
    syn: ["factrice", "courrier", "lettre", "poste"],
    desc: "Dessine une enveloppe devant toi avec tes deux index, puis tends-la en avançant ta main plate vers la personne.",
    astuce: "Une lettre, et on la remet en main propre.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/facteur",
    images: [
      { d: { cfg: "index", at: "neutre", off: [10, 0, 0], paume: "bas", doigts: "avant" },
        nd: { cfg: "index", at: "neutre", off: [10, 0, 0], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "index", at: "neutre", off: [30, 0, 0], paume: "bas", doigts: "avant" },
        nd: { cfg: "index", at: "neutre", off: [30, 0, 0], paume: "bas", doigts: "avant" }, t: 450 },
      { d: { cfg: "plate", at: "neutre", off: [10, -10, 35], paume: "haut", doigts: "avant" }, nd: { at: "repos" }, t: 500, visage: "sourire" }
    ]
  },
  {
    id: "chauffeur", mot: "Chauffeur", theme: "personnes", niveau: 2,
    syn: ["conducteur", "conductrice", "routier"],
    desc: "Fais « voiture » (tes poings tournent un volant), puis fais descendre tes deux mains plates debout le long de ton corps : c'est la personne qui le fait.",
    astuce: "Conduire + personne.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/chauffeur",
    images: [
      { d: { cfg: "poing", at: "neutre", off: [28, 10, 0], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [28, -10, 0], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "poing", at: "neutre", off: [28, -10, 0], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [28, 10, 0], paume: "dedans", doigts: "haut" }, t: 350 },
      { d: { cfg: "plate", at: "neutre", off: [28, 15, -5], paume: "dedans", doigts: "haut" },
        nd: { cfg: "plate", at: "neutre", off: [28, 15, -5], paume: "dedans", doigts: "haut" }, t: 450 },
      { d: { cfg: "plate", at: "neutre", off: [28, -25, -5], paume: "dedans", doigts: "haut" },
        nd: { cfg: "plate", at: "neutre", off: [28, -25, -5], paume: "dedans", doigts: "haut" }, t: 450 }
    ]
  },

  // ======================= COULEURS =======================
  {
    id: "gris", mot: "Gris", theme: "couleurs", niveau: 2,
    syn: ["grise", "gris clair", "gris foncé"],
    desc: "Tes deux mains ouvertes, doigts écartés, se croisent et se mélangent devant toi en frétillant, comme du noir et du blanc qui se mêlent.",
    astuce: "Noir + blanc = gris.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/gris",
    sym: true,
    images: [
      { d: { cfg: "5", at: "neutre", off: [28, 0, 0], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre", off: [-10, 0, 8], paume: "dedans", doigts: "avant" }, t: 600, agiter: true }
    ]
  }

]);
