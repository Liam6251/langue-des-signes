// Signes LSF : temps, calendrier, lieux, transports, loisirs, sports, corps, santé, techno.
// Sources et notes : notes/research/temps-loisirs.md
LSF.ajouter([

  // ======================= TEMPS =======================
  {
    id: "maintenant", mot: "Maintenant", theme: "temps", niveau: 1,
    syn: ["en ce moment", "actuellement", "tout de suite"],
    desc: "Tes deux mains plates devant toi, paumes vers le haut : descends-les d'un petit coup sec, deux fois.",
    astuce: "Comme si tu posais le moment présent sur une table, juste devant toi.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/maintenant",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "plate", at: "neutre", off: [25, 12, 0], paume: "haut", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [25, -12, 0], paume: "haut", doigts: "avant" }, t: 280 }
    ]
  },
  {
    id: "aujourd-hui", mot: "Aujourd'hui", theme: "temps", niveau: 1,
    syn: ["ce jour", "ce jour-là"],
    desc: "C'est le même signe que « maintenant » : tes deux mains plates, paumes vers le haut, descendent deux fois devant toi.",
    astuce: "Aujourd'hui = le « maintenant » de la journée.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "plate", at: "neutre", off: [25, 12, 0], paume: "haut", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [25, -12, 0], paume: "haut", doigts: "avant" }, t: 300 }
    ]
  },
  {
    id: "demain", mot: "Demain", theme: "temps", niveau: 1,
    syn: ["à demain", "lendemain"],
    desc: "Fais un poing avec le pouce levé, pose le pouce près de ta joue, puis avance la main vers l'avant.",
    astuce: "En LSF, le futur est devant toi : demain, on l'envoie en avant.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Demain",
    images: [
      { d: { cfg: "pouce", at: "joue_dom", touch: "pouce", off: [8, 0, 25], paume: "dedans", doigts: "avant" }, contact: true, visage: "neutre" },
      { d: { cfg: "pouce", at: "neutre_dom", off: [10, 30, 45], paume: "dedans", doigts: "avant" }, t: 500, arc: 10 }
    ]
  },
  {
    id: "hier", mot: "Hier", theme: "temps", niveau: 1,
    syn: ["la veille"],
    desc: "Poing fermé, pouce levé, devant toi : ramène la main vers l'arrière, le pouce pointé par-dessus ton épaule.",
    astuce: "Le passé est derrière toi : hier, on le renvoie en arrière.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { d: { cfg: "pouce", at: "neutre_dom", off: [10, 30, 35], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "pouce", at: "epaule_dom", off: [5, 30, -5], paume: "dedans", doigts: "haut" }, t: 500, arc: 10 }
    ]
  },
  {
    id: "apres", mot: "Après", theme: "temps", niveau: 1,
    syn: ["ensuite", "plus tard", "puis"],
    desc: "Ta main plate, paume tournée vers toi, part près de ta poitrine et avance en faisant un petit arc vers l'avant.",
    astuce: "Ce qui vient après est devant toi.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/apres",
    images: [
      { d: { cfg: "plate", at: "poitrine", off: [10, 0, 15], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [10, 0, 55], paume: "arriere", doigts: "haut" }, t: 500, arc: 20 }
    ]
  },
  {
    id: "avant", mot: "Avant", theme: "temps", niveau: 1,
    syn: ["auparavant", "autrefois"],
    desc: "Lève ta main plate près de ton épaule, paume vers toi, et plie plusieurs fois les doigts vers l'arrière. Regarde vers ton épaule.",
    astuce: "Les doigts font « viens, derrière moi » : ce qui était avant est dans ton dos.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/avant",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "epaule_dom", off: [0, 25, 15], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate_pliee", at: "epaule_dom", off: [0, 25, 15], paume: "arriere", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "tout-a-l-heure", mot: "Tout à l'heure", theme: "temps", niveau: 2,
    syn: ["plus tard", "dans un moment", "à tout à l'heure"],
    desc: "Index plié en crochet, tape deux fois ton menton, puis avance la main vers l'avant (pour « tout à l'heure » dans le futur).",
    astuce: "Vers l'avant = plus tard ; vers l'épaule = il y a un moment.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Tout_à_l'heure",
    images: [
      { d: { cfg: "index_crochet", at: "menton", touch: "index", paume: "bas", doigts: "dedans" }, contact: true, visage: "neutre" },
      { d: { cfg: "index_crochet", at: "menton", touch: "index", off: [0, 0, 12], paume: "bas", doigts: "dedans" }, t: 180 },
      { d: { cfg: "index_crochet", at: "menton", touch: "index", paume: "bas", doigts: "dedans" }, t: 180, contact: true },
      { d: { cfg: "index_crochet", at: "neutre_dom", off: [5, 35, 40], paume: "bas", doigts: "avant" }, t: 450, arc: 8 }
    ]
  },
  {
    id: "toujours", mot: "Toujours", theme: "temps", niveau: 1,
    syn: ["tout le temps", "sans arrêt"],
    desc: "Index tendu vers le haut, devant ton épaule : fais tourner la main en petits cercles.",
    astuce: "Un cercle n'a pas de fin, comme « toujours ».",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/toujours",
    images: [
      { d: { cfg: "index", at: "neutre_dom", off: [0, 35, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "index", at: "neutre_dom", off: [15, 22, 0], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "index", at: "neutre_dom", off: [0, 8, 0], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "index", at: "neutre_dom", off: [-15, 22, 0], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "index", at: "neutre_dom", off: [0, 35, 0], paume: "avant", doigts: "haut" }, t: 200 }
    ]
  },
  {
    id: "jamais", mot: "Jamais", theme: "temps", niveau: 1,
    syn: ["plus jamais"],
    desc: "Main en Y (pouce et petit doigt tendus), le pouce contre ton cœur : balaie la main vers l'extérieur en arc, avec une petite moue.",
    astuce: "Le Y ressemble au J de « jamais ». Plus tu vas vite, plus c'est « jamais de la vie ! ».",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Jamais",
    images: [
      { d: { cfg: "Y", at: "coeur", touch: "pouce", paume: "bas", doigts: "dedans" }, contact: true, visage: "moue" },
      { d: { cfg: "Y", at: "cote_dom", off: [10, -15, 25], paume: "bas", doigts: "avant" }, t: 550, arc: 10 }
    ]
  },
  {
    id: "heure", mot: "Heure", theme: "temps", niveau: 1,
    syn: ["heures", "quelle heure", "montre"],
    desc: "Ferme ta main gauche en poing. Avec l'index et le majeur tendus et serrés de l'autre main, tape deux fois le dessus du poignet, là où on porte une montre.",
    astuce: "Tu montres ta montre !",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    rep: 2,
    images: [
      { nd: { cfg: "poing", at: "neutre_non", off: [0, -5, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "U", at: "nd:poignet", touch: "doigts", off: [0, 15, 0], paume: "bas", doigts: "dedans-bas" }, visage: "neutre" },
      { d: { cfg: "U", at: "nd:poignet", touch: "doigts", paume: "bas", doigts: "dedans-bas" }, t: 200, contact: true }
    ]
  },
  {
    id: "minute", mot: "Minute", theme: "temps", niveau: 2,
    syn: ["minutes", "un instant"],
    desc: "Ferme ta main gauche en poing. De l'autre main, fais un rond avec le pouce et l'index (les autres doigts tendus) et tapote ton poignet avec ce rond.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/minute",
    rep: 2,
    images: [
      { nd: { cfg: "poing", at: "neutre_non", off: [0, -5, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "F", at: "nd:poignet", touch: "index", off: [0, 15, 0], paume: "bas", doigts: "dedans-bas" }, visage: "neutre" },
      { d: { cfg: "F", at: "nd:poignet", touch: "index", paume: "bas", doigts: "dedans-bas" }, t: 200, contact: true }
    ]
  },
  {
    id: "matin", mot: "Matin", theme: "temps", niveau: 1,
    syn: ["le matin", "matinée"],
    desc: "Ta main gauche plate, à l'horizontale devant toi, fait l'horizon. Ta main droite plate, doigts vers le haut, monte derrière elle comme le soleil qui se lève.",
    astuce: "Le soleil se lève derrière l'horizon.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Matin",
    images: [
      { nd: { cfg: "plate", at: "neutre", off: [0, -5, 0], paume: "arriere", doigts: "dedans" },
        d: { cfg: "plate", at: "neutre", off: [0, -35, -8], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [0, 35, -8], paume: "arriere", doigts: "haut" }, t: 650 }
    ]
  },
  {
    id: "midi", mot: "Midi", theme: "temps", niveau: 1,
    syn: ["12 heures", "douze heures"],
    desc: "Main plate verticale, pouce replié, le côté de la main devant ton menton et ton nez : tapote ton menton deux fois.",
    astuce: "Ta main coupe ton visage en deux, comme midi coupe la journée en deux.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/midi",
    rep: 2,
    images: [
      { d: { cfg: "B", at: "menton", off: [0, 8, 22], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "B", at: "menton", off: [0, 8, 8], paume: "dedans", doigts: "haut" }, t: 200, contact: true }
    ]
  },
  {
    id: "apres-midi", mot: "Après-midi", theme: "temps", niveau: 2,
    syn: ["aprem"],
    desc: "Fais le signe « midi » (main plate verticale devant le menton et le nez), puis penche les doigts vers le côté deux ou trois fois en pliant le poignet.",
    astuce: "Midi… passé : le soleil commence à pencher.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Après-midi",
    rep: 2,
    images: [
      { d: { cfg: "B", at: "menton", off: [0, 10, 10], paume: "dedans", doigts: "haut" }, contact: true, visage: "neutre" },
      { d: { cfg: "B", at: "menton", off: [4, 10, 10], paume: "dedans-haut", doigts: "haut-dehors" }, t: 220 }
    ]
  },
  {
    id: "soir", mot: "Soir", theme: "temps", niveau: 1,
    syn: ["le soir", "soirée", "bonsoir"],
    desc: "Ta main gauche plate, à l'horizontale devant toi, fait l'horizon. Ta main droite plate descend derrière elle, comme le soleil qui se couche.",
    astuce: "C'est l'inverse du matin : le soleil se couche.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Soir",
    images: [
      { nd: { cfg: "plate", at: "neutre", off: [0, -5, 0], paume: "arriere", doigts: "dedans" },
        d: { cfg: "plate", at: "neutre", off: [0, 35, 5], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [0, -35, 5], paume: "arriere", doigts: "haut" }, t: 650 }
    ]
  },
  {
    id: "nuit", mot: "Nuit", theme: "temps", niveau: 1,
    syn: ["la nuit", "cette nuit"],
    desc: "Tes deux mains plates, debout de chaque côté, paumes vers toi : bascule-les ensemble à l'horizontale devant toi, comme un rideau qui tombe.",
    astuce: "La lumière du jour se ferme devant tes yeux.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Nuit",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre_haut", off: [35, 0, 0], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [20, 0, 0], paume: "arriere", doigts: "dedans" }, t: 600, arc: 10 }
    ]
  },
  {
    id: "jour", mot: "Jour", theme: "temps", niveau: 1,
    syn: ["jours", "journée"],
    desc: "Pose ton index tendu sur ton menton, puis éloigne-le vers le haut et l'avant d'un coup de poignet.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Jour",
    images: [
      { d: { cfg: "index", at: "menton", touch: "index", paume: "arriere", doigts: "haut" }, contact: true, visage: "neutre" },
      { d: { cfg: "index", at: "neutre_haut", off: [15, 15, 30], paume: "haut-arriere", doigts: "haut-avant" }, t: 400 }
    ]
  },
  {
    id: "journee", mot: "Journée", theme: "temps", niveau: 2,
    syn: ["toute la journée"],
    desc: "Ta main gauche fait l'horizon. Ta main droite monte derrière elle (le matin), passe par-dessus puis redescend devant (le soir), en un seul mouvement.",
    astuce: "Le soleil se lève puis se couche : toute la journée.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Journée",
    images: [
      { nd: { cfg: "plate", at: "neutre", off: [0, -5, 0], paume: "arriere", doigts: "dedans" },
        d: { cfg: "plate", at: "neutre", off: [0, -35, -8], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [0, 40, 0], paume: "arriere", doigts: "haut" }, t: 500 },
      { d: { cfg: "plate", at: "neutre", off: [0, -35, 12], paume: "arriere", doigts: "haut" }, t: 500, arc: 25 }
    ]
  },
  {
    id: "minuit", mot: "Minuit", theme: "temps", niveau: 3,
    syn: ["24 heures", "zéro heure"],
    desc: "Main plate verticale, doigts vers le haut, posée contre ton menton : fais-la glisser tout droit vers le haut, jusqu'au-dessus de ta tête.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/minuit",
    images: [
      { d: { cfg: "plate", at: "menton", off: [0, 0, 10], paume: "dedans", doigts: "haut" }, contact: true, visage: "neutre" },
      { d: { cfg: "plate", at: "front", off: [0, 40, 10], paume: "dedans", doigts: "haut" }, t: 550 }
    ]
  },
  {
    id: "semaine", mot: "Semaine", theme: "temps", niveau: 1,
    syn: ["semaines", "hebdomadaire"],
    desc: "Ta main gauche en poing devant toi. Pose le pouce levé de ta main droite sur le dessus de ce poing, puis tourne ta main droite vers le bas en repliant le pouce.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/semaine",
    images: [
      { nd: { cfg: "poing", at: "neutre_non", off: [0, -5, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "pouce", at: "nd:dos", touch: "pouce", off: [0, 4, 0], paume: "arriere", doigts: "dedans" }, contact: true, visage: "neutre" },
      { d: { cfg: "poing", at: "nd:dos", off: [0, 16, 0], paume: "bas", doigts: "dedans" }, t: 400 }
    ]
  },
  {
    id: "mois", mot: "Mois", theme: "temps", niveau: 2,
    syn: ["mensuel"],
    desc: "Ta main gauche plate et verticale, paume vers la droite. Fais glisser le pouce de ta main droite (poing fermé) de haut en bas sur ta paume.",
    astuce: "Comme si tu descendais le long d'une page de calendrier.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Mois",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, 0, 0], paume: "dedans", doigts: "haut" },
        d: { cfg: "pouce", at: "nd:paume", touch: "pouce", off: [0, 22, 0], paume: "bas", doigts: "avant" }, contact: true, visage: "neutre" },
      { d: { cfg: "pouce", at: "nd:paume", touch: "pouce", off: [0, -22, 0], paume: "bas", doigts: "avant" }, t: 500 }
    ]
  },
  {
    id: "annee", mot: "Année", theme: "temps", niveau: 1,
    syn: ["an", "ans", "années"],
    desc: "Deux poings fermés devant toi. Le poing droit fait un tour complet autour du poing gauche, puis se pose dessus.",
    astuce: "La Terre (ton poing droit) fait le tour du Soleil (ton poing gauche) : ça prend un an.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Année",
    images: [
      { nd: { cfg: "poing", at: "neutre", off: [0, -5, 0], paume: "dedans", doigts: "avant" },
        d: { cfg: "poing", at: "neutre", off: [0, 25, 0], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "poing", at: "neutre", off: [0, -5, 30], paume: "dedans", doigts: "avant" }, t: 220 },
      { d: { cfg: "poing", at: "neutre", off: [0, -35, 0], paume: "dedans", doigts: "avant" }, t: 220 },
      { d: { cfg: "poing", at: "neutre", off: [0, -5, -30], paume: "dedans", doigts: "avant" }, t: 220 },
      { d: { cfg: "poing", at: "neutre", off: [0, 22, 0], paume: "dedans", doigts: "avant" }, t: 220, contact: true }
    ]
  },
  {
    id: "passe", mot: "Passé", theme: "temps", niveau: 3,
    syn: ["autrefois", "le passé"],
    desc: "Main plate, tapote plusieurs fois le devant de ton épaule, en regardant vers elle.",
    astuce: "Le passé est derrière toi, sur ton épaule.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/passe",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "epaule_dom", off: [0, 10, 20], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "plate", at: "epaule_dom", off: [0, 10, 0], paume: "arriere", doigts: "haut" }, t: 220, contact: true }
    ]
  },
  {
    id: "temps-duree", mot: "Temps (durée)", theme: "temps", niveau: 3,
    syn: ["temps", "durée", "le temps qui passe"],
    desc: "Tes deux mains font un petit rond avec le pouce et l'index (les autres doigts tendus). Avance-les vers l'avant en ouvrant les ronds.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/temps",
    sym: true,
    images: [
      { d: { cfg: "F", at: "neutre", off: [15, 0, -5], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre", off: [20, 0, 35], paume: "dedans", doigts: "avant" }, t: 550 }
    ]
  },

  // ======================= CALENDRIER =======================
  {
    id: "lundi", mot: "Lundi", theme: "calendrier", niveau: 1,
    desc: "Fais un L (pouce et index tendus) à côté de ton épaule et tourne deux fois le poignet.",
    astuce: "Les jours se font avec leur première lettre qui tourne.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Lundi",
    rep: 2,
    images: [
      { d: { cfg: "L", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "L", at: "cote_epaule_dom", off: [-4, 0, 0], paume: "avant-dedans", doigts: "haut" }, t: 280 }
    ]
  },
  {
    id: "mardi", mot: "Mardi", theme: "calendrier", niveau: 1,
    desc: "Fais un A (poing fermé, pouce contre le côté) à côté de ton épaule et tourne deux fois le poignet.",
    astuce: "Mardi prend le A de mArdi, pour ne pas confondre avec mercredi.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Mardi",
    rep: 2,
    images: [
      { d: { cfg: "A", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "A", at: "cote_epaule_dom", off: [-4, 0, 0], paume: "avant-dedans", doigts: "haut" }, t: 280 }
    ]
  },
  {
    id: "mercredi", mot: "Mercredi", theme: "calendrier", niveau: 1,
    desc: "Fais un E (doigts pliés posés sur le pouce) à côté de ton épaule et tourne deux fois le poignet.",
    astuce: "Mercredi prend le E de mErcredi.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Mercredi",
    rep: 2,
    images: [
      { d: { cfg: "E", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "E", at: "cote_epaule_dom", off: [-4, 0, 0], paume: "avant-dedans", doigts: "haut" }, t: 280 }
    ]
  },
  {
    id: "jeudi", mot: "Jeudi", theme: "calendrier", niveau: 1,
    desc: "Fais un J (main en Y : pouce et petit doigt tendus) à côté de ton épaule et tourne deux fois le poignet.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Jeudi",
    rep: 2,
    images: [
      { d: { cfg: "Y", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "Y", at: "cote_epaule_dom", off: [-4, 0, 0], paume: "avant-dedans", doigts: "haut" }, t: 280 }
    ]
  },
  {
    id: "vendredi", mot: "Vendredi", theme: "calendrier", niveau: 1,
    desc: "Fais un V (index et majeur écartés) à côté de ton épaule et tourne deux fois le poignet.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Vendredi",
    rep: 2,
    images: [
      { d: { cfg: "V", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "V", at: "cote_epaule_dom", off: [-4, 0, 0], paume: "avant-dedans", doigts: "haut" }, t: 280 }
    ]
  },
  {
    id: "samedi", mot: "Samedi", theme: "calendrier", niveau: 1,
    desc: "Fais un S (poing fermé, pouce devant les doigts) à côté de ton épaule et tourne deux fois le poignet.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Samedi",
    rep: 2,
    images: [
      { d: { cfg: "poing", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "poing", at: "cote_epaule_dom", off: [-4, 0, 0], paume: "avant-dedans", doigts: "haut" }, t: 280 }
    ]
  },
  {
    id: "dimanche", mot: "Dimanche", theme: "calendrier", niveau: 1,
    desc: "Fais un D (index tendu, les autres doigts en rond contre le pouce) à côté de ton épaule et tourne deux fois le poignet.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Dimanche",
    rep: 2,
    images: [
      { d: { cfg: "D", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "D", at: "cote_epaule_dom", off: [-4, 0, 0], paume: "avant-dedans", doigts: "haut" }, t: 280 }
    ]
  },
  {
    id: "week-end", mot: "Week-end", theme: "calendrier", niveau: 1,
    syn: ["weekend", "fin de semaine"],
    desc: "Fais un W (trois doigts tendus) à côté de ton épaule, puis glisse la main vers le milieu en la transformant en E.",
    astuce: "W + E = WE, comme on l'écrit en abrégé !",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { d: { cfg: "W", at: "cote_epaule_dom", paume: "avant", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "E", at: "cote_epaule_dom", off: [-35, 0, 0], paume: "avant", doigts: "haut" }, t: 500 }
    ]
  },
  {
    id: "anniversaire", mot: "Anniversaire", theme: "calendrier", niveau: 1,
    syn: ["joyeux anniversaire", "bon anniversaire"],
    desc: "Fais d'abord « année » (le poing droit tourne autour du poing gauche). Puis lève tes deux mains ouvertes devant ton visage, doigts qui bougent comme des bougies, et souffle dessus.",
    astuce: "Une année de plus… et on souffle les bougies du gâteau !",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Anniversaire",
    images: [
      { nd: { cfg: "poing", at: "neutre", off: [0, -10, 0], paume: "dedans", doigts: "avant" },
        d: { cfg: "poing", at: "neutre", off: [0, 20, 0], paume: "dedans", doigts: "avant" }, visage: "sourire" },
      { d: { cfg: "poing", at: "neutre", off: [0, -10, 30], paume: "dedans", doigts: "avant" }, t: 220 },
      { d: { cfg: "poing", at: "neutre", off: [0, -40, 0], paume: "dedans", doigts: "avant" }, t: 220 },
      { d: { cfg: "poing", at: "neutre", off: [0, -10, -30], paume: "dedans", doigts: "avant" }, t: 220 },
      { d: { cfg: "poing", at: "neutre", off: [0, 18, 0], paume: "dedans", doigts: "avant" }, t: 220, contact: true },
      { d: { cfg: "5", at: "neutre_haut", off: [22, -15, 0], paume: "arriere", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_haut", off: [22, -15, 0], paume: "arriere", doigts: "haut" }, t: 500, visage: "joie" },
      { d: { cfg: "5", at: "neutre_haut", off: [22, -12, 0], paume: "arriere", doigts: "haut" },
        nd: { cfg: "5", at: "neutre_haut", off: [22, -12, 0], paume: "arriere", doigts: "haut" }, t: 700, bouche: "souffle", agiter: true }
    ]
  },
  {
    id: "automne", mot: "Automne", theme: "calendrier", niveau: 2,
    syn: ["saison", "feuilles mortes"],
    desc: "Ta main gauche plate et debout, paume vers l'avant. Ta main droite, doigts écartés, descend devant elle en se balançant, comme une feuille qui tombe.",
    astuce: "En automne, les feuilles tombent des arbres.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/automne",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, 10, 0], paume: "avant", doigts: "haut" },
        d: { cfg: "5", at: "nd:paume", off: [0, 35, 20], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "5", at: "nd:paume", off: [10, 5, 32], paume: "bas", doigts: "avant" }, t: 350, arc: 8 },
      { d: { cfg: "5", at: "nd:paume", off: [-5, -25, 18], paume: "bas", doigts: "avant" }, t: 350, arc: 8 }
    ]
  },

  // ======================= LIEUX =======================
  {
    id: "ville", mot: "Ville", theme: "lieux", niveau: 1,
    syn: ["cité", "centre-ville"],
    desc: "Deux V (index et majeur écartés) devant ton cou, paumes vers toi, les majeurs qui se touchent. D'un coup rapide, tourne les poignets pour que les paumes regardent devant, en écartant les mains.",
    astuce: "Le V comme Ville, et les doigts dessinent des toits.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Ville",
    sym: true,
    images: [
      { d: { cfg: "V", at: "neutre_haut", off: [8, -25, 0], paume: "arriere", doigts: "dedans-haut" }, contact: true, visage: "neutre" },
      { d: { cfg: "V", at: "neutre_haut", off: [30, -25, 5], paume: "avant", doigts: "dedans-haut" }, t: 300 }
    ]
  },
  {
    id: "magasin", mot: "Magasin", theme: "lieux", niveau: 2,
    syn: ["boutique", "commerce", "shopping"],
    desc: "Tes deux mains à hauteur de tête, doigts serrés pliés à angle droit et pouce contre eux. Fais de tout petits mouvements vers l'avant.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/magasin",
    sym: true, rep: 2,
    images: [
      { d: { cfg: { doigts: ["b", "b", "b", "b"], ecart: 0, pouce: "touche_tous" }, at: "neutre_haut", off: [25, 0, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: { doigts: ["b", "b", "b", "b"], ecart: 0, pouce: "touche_tous" }, at: "neutre_haut", off: [25, 0, 12], paume: "avant", doigts: "haut" }, t: 200 }
    ]
  },
  {
    id: "restaurant", mot: "Restaurant", theme: "lieux", niveau: 2,
    syn: ["resto", "cantine"],
    desc: "Ta main gauche plate et debout. De l'autre main, fais un arc avec le pouce et l'index, touche ta main gauche, puis éloigne la main sur le côté et descends-la.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/restaurant",
    images: [
      { nd: { cfg: "B", at: "neutre_non", paume: "dedans", doigts: "haut" },
        d: { cfg: { doigts: ["c", "p", "p", "p"], ecart: 0, pouce: "ecarte" }, at: "nd:paume", off: [0, 15, 0], paume: "avant", doigts: "dedans" }, contact: true, visage: "neutre" },
      { d: { cfg: { doigts: ["c", "p", "p", "p"], ecart: 0, pouce: "ecarte" }, at: "neutre_dom", off: [10, 15, 0], paume: "avant", doigts: "dedans" }, t: 400 },
      { d: { cfg: { doigts: ["c", "p", "p", "p"], ecart: 0, pouce: "ecarte" }, at: "neutre_dom", off: [10, -20, 0], paume: "avant", doigts: "dedans" }, t: 350 }
    ]
  },
  {
    id: "cinema", mot: "Cinéma", theme: "lieux", niveau: 2,
    syn: ["ciné", "salle de cinéma"],
    desc: "Tes deux mains plates, pouces vers le haut, à hauteur de poitrine : croise-les deux fois l'une devant l'autre, comme deux trains qui se croisent.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Cinéma",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "neutre", off: [25, 0, 8], paume: "dedans", doigts: "avant" },
        nd: { cfg: "plate", at: "neutre", off: [25, 0, -8], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [-20, 0, 8], paume: "dedans", doigts: "avant" },
        nd: { cfg: "plate", at: "neutre", off: [-20, 0, -8], paume: "dedans", doigts: "avant" }, t: 300 }
    ]
  },
  {
    id: "parc", mot: "Parc", theme: "lieux", niveau: 2,
    syn: ["jardin public", "square"],
    desc: "Deux V (index et majeur écartés), paumes vers toi : rapproche les mains pour qu'elles se tapent, en les faisant un peu tourner vers toi. Recommence.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/parc",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "V", at: "neutre", off: [30, 0, 0], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "V", at: "neutre", off: [8, 0, 0], paume: "arriere-dedans", doigts: "haut" }, t: 250, contact: true }
    ]
  },
  {
    id: "france", mot: "France", theme: "lieux", niveau: 1,
    syn: ["français", "pays"],
    desc: "Fais un F (pouce et index en rond, les trois autres doigts tendus) à côté de ton visage, paume vers toi, puis tourne vite le poignet pour que la paume regarde devant.",
    astuce: "Le F de France.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/France",
    images: [
      { d: { cfg: "F", at: "joue_dom", off: [20, 0, 10], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "F", at: "joue_dom", off: [22, 0, 15], paume: "avant", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "aeroport", mot: "Aéroport", theme: "lieux", niveau: 3,
    syn: ["aérogare"],
    desc: "Ta main gauche plate, paume vers le haut, c'est la piste. Ta main droite en Y (pouce et petit doigt tendus), paume vers le bas, tourne en rond au-dessus.",
    astuce: "L'avion (le Y) tourne au-dessus de la piste avant d'atterrir.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/aeroport",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, -10, 0], paume: "haut", doigts: "avant" },
        d: { cfg: "Y", at: "nd:paume", off: [0, 18, 15], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "Y", at: "nd:paume", off: [-15, 18, 0], paume: "bas", doigts: "avant" }, t: 220 },
      { d: { cfg: "Y", at: "nd:paume", off: [0, 18, -15], paume: "bas", doigts: "avant" }, t: 220 },
      { d: { cfg: "Y", at: "nd:paume", off: [15, 18, 0], paume: "bas", doigts: "avant" }, t: 220 },
      { d: { cfg: "Y", at: "nd:paume", off: [0, 18, 15], paume: "bas", doigts: "avant" }, t: 220 }
    ]
  },

  // ======================= TRANSPORTS =======================
  {
    id: "voiture", mot: "Voiture", theme: "transports", niveau: 1,
    syn: ["auto", "conduire", "rouler en voiture"],
    desc: "Tes deux poings tiennent un volant imaginaire devant toi : tourne-le en montant une main pendant que l'autre descend, deux fois.",
    astuce: "Tu conduis ! C'est aussi le signe de « conduire ».",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/voiture",
    rep: 2,
    images: [
      { d: { cfg: "poing", at: "neutre", off: [28, 10, 0], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [28, -10, 0], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "poing", at: "neutre", off: [28, -10, 0], paume: "dedans", doigts: "haut" },
        nd: { cfg: "poing", at: "neutre", off: [28, 10, 0], paume: "dedans", doigts: "haut" }, t: 350, arc: 5 }
    ]
  },
  {
    id: "bus", mot: "Bus", theme: "transports", niveau: 1,
    syn: ["autobus", "car"],
    desc: "Bras plié, main levée devant toi, index en crochet contre le pouce : tire plusieurs petits coups vers le bas.",
    astuce: "Comme si tu tirais la corde pour demander l'arrêt du bus.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/bus",
    rep: 3,
    images: [
      { d: { cfg: "T", at: "neutre_haut", off: [20, 15, 0], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "T", at: "neutre_haut", off: [20, 0, 0], paume: "dedans", doigts: "avant" }, t: 180 }
    ]
  },
  {
    id: "train", mot: "Train", theme: "transports", niveau: 1,
    syn: ["TGV", "SNCF"],
    desc: "Deux V (index et majeur écartés) devant toi, paumes face à face. La main gauche ne bouge pas ; la main droite, un peu en arrière, fait des petits cercles.",
    astuce: "Comme les bielles qui font tourner les roues d'une locomotive.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/train",
    rep: 2,
    images: [
      { nd: { cfg: "V", at: "neutre_non", paume: "dedans", doigts: "avant" },
        d: { cfg: "V", at: "neutre_dom", off: [0, 12, -10], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "V", at: "neutre_dom", off: [0, 0, 2], paume: "dedans", doigts: "avant" }, t: 160 },
      { d: { cfg: "V", at: "neutre_dom", off: [0, -12, -10], paume: "dedans", doigts: "avant" }, t: 160 },
      { d: { cfg: "V", at: "neutre_dom", off: [0, 0, -22], paume: "dedans", doigts: "avant" }, t: 160 }
    ]
  },
  {
    id: "velo", mot: "Vélo", theme: "transports", niveau: 1,
    syn: ["bicyclette", "VTT", "faire du vélo"],
    desc: "Tes deux mains fermées en rond, face à face devant toi, s'ouvrent d'un coup (doigts écartés) en partant un peu vers l'avant.",
    astuce: "Les doigts qui s'ouvrent, ce sont les rayons des roues.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/velo",
    sym: true,
    images: [
      { d: { cfg: "O", at: "neutre", off: [15, 0, 0], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre", off: [30, 0, 25], paume: "dedans", doigts: "avant" }, t: 300 }
    ]
  },
  {
    id: "avion", mot: "Avion", theme: "transports", niveau: 1,
    syn: ["prendre l'avion", "vol"],
    desc: "Main en Y (pouce et petit doigt tendus), paume vers le bas, à hauteur d'épaule sur le côté : fais-la voler en diagonale vers le haut, vers le milieu.",
    astuce: "Le pouce et le petit doigt sont les ailes de l'avion.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Avion",
    images: [
      { d: { cfg: "Y", at: "cote_dom", paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "Y", at: "neutre_haut", off: [-20, 20, 20], paume: "bas", doigts: "avant" }, t: 650 }
    ]
  },
  {
    id: "metro", mot: "Métro", theme: "transports", niveau: 2,
    syn: ["RER", "souterrain"],
    desc: "Ta main gauche plate, paume vers le bas, c'est le sol. Ta main droite plate, doigts vers l'avant, passe deux fois dessous.",
    astuce: "Le métro roule sous la terre.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Métro",
    rep: 2,
    images: [
      { nd: { cfg: "plate", at: "neutre", off: [0, 0, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "plate", at: "nd:paume", off: [0, -15, -30], paume: "bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "nd:paume", off: [0, -15, 30], paume: "bas", doigts: "avant" }, t: 350 }
    ]
  },
  {
    id: "bateau", mot: "Bateau", theme: "transports", niveau: 2,
    syn: ["navire", "ferry"],
    desc: "Tes deux mains plates se touchent du bout des doigts pour faire la pointe d'un bateau, pouces en haut. Avance-les en faisant des vagues.",
    astuce: "Tes mains sont la coque du bateau qui avance sur les vagues.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/bateau",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre", off: [12, -5, 0], paume: "dedans-arriere", doigts: "avant-dedans" }, contact: true, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [12, 5, 20], paume: "dedans-arriere", doigts: "avant-dedans" }, t: 300 },
      { d: { cfg: "plate", at: "neutre", off: [12, -5, 40], paume: "dedans-arriere", doigts: "avant-dedans" }, t: 300 },
      { d: { cfg: "plate", at: "neutre", off: [12, 5, 60], paume: "dedans-arriere", doigts: "avant-dedans" }, t: 300 }
    ]
  },

  // ======================= LOISIRS =======================
  {
    id: "musique", mot: "Musique", theme: "loisirs", niveau: 1,
    syn: ["jouer de la musique", "chanson", "instrument"],
    desc: "Tes deux index tendus devant toi bougent ensemble en rythme, de haut en bas, comme une baguette de chef d'orchestre.",
    astuce: "Pense au chef d'orchestre.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Musique",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "index", at: "neutre", off: [25, 15, 0], paume: "bas", doigts: "avant-dedans" }, visage: "sourire" },
      { d: { cfg: "index", at: "neutre", off: [32, -5, 5], paume: "bas", doigts: "avant-dedans" }, t: 300, arc: 10 }
    ]
  },
  {
    id: "film", mot: "Film", theme: "loisirs", niveau: 2,
    syn: ["vidéo", "série", "long métrage"],
    desc: "Tes deux index pointent l'un vers l'autre, paumes vers le bas. L'index droit glisse du bout de l'index gauche vers le dos de la main, fait un petit cercle, puis revient vers le bout.",
    astuce: "Comme une bobine de film qui tourne.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Film",
    images: [
      { nd: { cfg: "index", at: "neutre_non", paume: "bas", doigts: "dedans" },
        d: { cfg: "index", at: "nd:index", touch: "index", paume: "bas", doigts: "dedans" }, contact: true, visage: "neutre" },
      { d: { cfg: "index", at: "nd:dos", touch: "index", paume: "bas", doigts: "dedans" }, t: 300 },
      { d: { cfg: "index", at: "nd:dos", touch: "index", off: [0, 12, 10], paume: "bas", doigts: "dedans" }, t: 200 },
      { d: { cfg: "index", at: "nd:dos", touch: "index", off: [0, 12, -10], paume: "bas", doigts: "dedans" }, t: 200 },
      { d: { cfg: "index", at: "nd:index", touch: "index", paume: "bas", doigts: "dedans" }, t: 300, contact: true }
    ]
  },
  {
    id: "jeu", mot: "Jeu", theme: "loisirs", niveau: 1,
    syn: ["jouer", "jouet", "jeux", "jeu vidéo"],
    desc: "Tes deux mains en Y (pouce et petit doigt tendus), paumes face à face, avant-bras levés : fais pivoter les poignets plusieurs fois, d'un côté puis de l'autre.",
    astuce: "On dirait des marionnettes qui s'agitent.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Jouer",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "Y", at: "neutre", off: [25, 0, 0], paume: "dedans-avant", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "Y", at: "neutre", off: [25, 0, 0], paume: "dedans-arriere", doigts: "haut" }, t: 250 }
    ]
  },
  {
    id: "photo", mot: "Photo", theme: "loisirs", niveau: 1,
    syn: ["photographie", "prendre une photo", "selfie"],
    desc: "Fais deux L devant ton visage (pouces qui se font face, paumes vers l'avant), puis plie et redresse les deux index, deux fois.",
    astuce: "Tu cadres la photo et tu appuies sur le déclencheur.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/photo",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "L", at: "neutre_haut", off: [22, 0, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: { doigts: ["x", "p", "p", "p"], ecart: 0, pouce: "ecarte" }, at: "neutre_haut", off: [22, 0, 0], paume: "avant", doigts: "haut" }, t: 200 }
    ]
  },
  {
    id: "dessin", mot: "Dessin", theme: "loisirs", niveau: 2,
    syn: ["dessiner", "art", "illustration"],
    desc: "Ta main gauche plate devant toi, paume vers toi, comme une feuille. Ta main droite en V, doigts vers le bas, descend sur la paume en faisant des vagues.",
    astuce: "Ton V est un crayon qui gribouille sur la feuille.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "arriere", doigts: "haut" },
        d: { cfg: "V", at: "nd:paume", off: [0, 20, -10], paume: "avant", doigts: "bas" }, visage: "concentre" },
      { d: { cfg: "V", at: "nd:paume", off: [8, 5, -10], paume: "avant", doigts: "bas" }, t: 220 },
      { d: { cfg: "V", at: "nd:paume", off: [-8, -10, -10], paume: "avant", doigts: "bas" }, t: 220 },
      { d: { cfg: "V", at: "nd:paume", off: [5, -25, -10], paume: "avant", doigts: "bas" }, t: 220 }
    ]
  },
  {
    id: "voyage", mot: "Voyage", theme: "loisirs", niveau: 2,
    syn: ["voyager", "partir en voyage", "trip"],
    desc: "À hauteur de tête, l'index et le majeur collés contre le pouce s'ouvrent d'un coup en V, plusieurs fois, pendant que ta main fait un grand demi-cercle de ton côté vers l'autre côté.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/voyage",
    images: [
      { d: { cfg: { doigts: ["o", "o", "p", "p"], ecart: 0, pouce: "touche_tous" }, at: "cote_dom", off: [0, 20, 0], paume: "avant", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "3", at: "neutre_haut", off: [20, 10, 30], paume: "avant", doigts: "haut" }, t: 300, arc: 10 },
      { d: { cfg: { doigts: ["o", "o", "p", "p"], ecart: 0, pouce: "touche_tous" }, at: "neutre_haut", off: [-10, 12, 35], paume: "avant", doigts: "haut" }, t: 300, arc: 5 },
      { d: { cfg: "3", at: "neutre_haut", off: [-40, 15, 20], paume: "avant", doigts: "haut" }, t: 300, arc: 5 }
    ]
  },

  // ======================= SPORTS =======================
  {
    id: "sport", mot: "Sport", theme: "sports", niveau: 1,
    syn: ["sports", "faire du sport", "muscle"],
    desc: "Main en bec (doigts serrés qui touchent le pouce) posée sur ton épaule gauche : descends en arc jusqu'au coude, comme si tu dessinais un gros biceps.",
    astuce: "Tu montres ton muscle !",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/sports",
    images: [
      { d: { cfg: "bec", at: "epaule_non", touch: "doigts", paume: "bas", doigts: "dedans" }, contact: true, visage: "neutre" },
      { d: { cfg: "bec", at: "epaule_non", touch: "doigts", off: [-15, -55, 10], paume: "bas", doigts: "dedans" }, t: 500, arc: 15 }
    ]
  },
  {
    id: "football", mot: "Football", theme: "sports", niveau: 1,
    syn: ["foot", "ballon de foot", "jouer au foot"],
    desc: "Ta main gauche plate, paume vers le bas. Ton poing droit sort de dessous et remonte en l'air.",
    astuce: "Le ballon (ton poing) est envoyé en l'air d'un coup de pied.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, -5, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "poing", at: "nd:paume", off: [0, -20, -5], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "poing", at: "neutre_haut", off: [5, 0, 25], paume: "dedans", doigts: "avant" }, t: 400, arc: 15 }
    ]
  },
  {
    id: "basket", mot: "Basket", theme: "sports", niveau: 2,
    syn: ["basketball", "basket-ball", "panier"],
    desc: "Ta main gauche plate, paume vers toi, fait le panier. Ta main droite ouverte part au-dessus et passe dessous en se refermant, comme un ballon qui rentre dans le panier.",
    astuce: "Panier ! Le ballon passe dans le cercle.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/basketball",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "arriere", doigts: "dedans" },
        d: { cfg: "5", at: "nd:paume", off: [0, 25, -15], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "O", at: "nd:paume", off: [0, -30, -12], paume: "arriere", doigts: "bas" }, t: 450 }
    ]
  },
  {
    id: "natation", mot: "Natation", theme: "sports", niveau: 2,
    syn: ["nager", "nage", "piscine"],
    desc: "Tes deux mains plates collées devant toi, doigts vers l'avant : écarte-les en faisant un cercle vers l'extérieur puis ramène-les ensemble, comme en brasse. Recommence.",
    astuce: "Tu nages la brasse.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/nager",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "plate", at: "neutre", off: [4, 0, 10], paume: "dedans", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "plate", at: "neutre", off: [30, 0, 35], paume: "dehors-bas", doigts: "avant" }, t: 300 },
      { d: { cfg: "plate", at: "neutre", off: [30, -10, 0], paume: "bas", doigts: "avant" }, t: 300 },
      { d: { cfg: "plate", at: "neutre", off: [4, 0, 10], paume: "dedans", doigts: "avant" }, t: 300 }
    ]
  },
  {
    id: "tennis", mot: "Tennis", theme: "sports", niveau: 2,
    syn: ["raquette", "ping-pong"],
    desc: "Ferme ta main comme si tu tenais une raquette et balance-la d'un côté puis de l'autre, comme un coup droit puis un revers.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    rep: 2,
    images: [
      { d: { cfg: "poing", at: "cote_dom", off: [10, -10, 30], paume: "avant", doigts: "haut" }, visage: "concentre" },
      { d: { cfg: "poing", at: "neutre_non", off: [0, 0, 45], paume: "arriere", doigts: "haut" }, t: 400, arc: -10 }
    ]
  },
  {
    id: "ballon", mot: "Ballon", theme: "sports", niveau: 1,
    syn: ["balle", "ballon de foot", "ballon de basket"],
    desc: "Tes deux mains un peu courbées font le tour d'un ballon imaginaire devant toi, et tu gonfles les joues.",
    astuce: "Plus le ballon est gros, plus tes mains s'écartent.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    sym: true,
    images: [
      { d: { cfg: "5_courbe", at: "neutre", off: [25, 20, 0], paume: "dedans-bas", doigts: "avant" }, visage: "neutre" },
      { d: { cfg: "5_courbe", at: "neutre", off: [35, 0, 0], paume: "dedans", doigts: "avant" }, t: 250, arc: 8, bouche: "souffle" },
      { d: { cfg: "5_courbe", at: "neutre", off: [25, -20, 0], paume: "dedans-haut", doigts: "avant" }, t: 250, arc: 8 }
    ]
  },

  // ======================= CORPS =======================
  {
    id: "tete", mot: "Tête", theme: "corps", niveau: 1,
    syn: ["crâne"],
    desc: "Avec ton index tendu, fais un grand cercle autour de ton visage.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/tete",
    images: [
      { d: { cfg: "index", at: "front", off: [0, 10, 20], paume: "dedans", doigts: "haut-arriere" }, visage: "neutre" },
      { d: { cfg: "index", at: "joue_non", off: [-10, 0, 20], paume: "dedans", doigts: "haut-arriere" }, t: 250, arc: 10 },
      { d: { cfg: "index", at: "menton", off: [0, -10, 20], paume: "dedans", doigts: "haut-arriere" }, t: 250, arc: 10 },
      { d: { cfg: "index", at: "joue_dom", off: [10, 0, 20], paume: "dedans", doigts: "haut-arriere" }, t: 250, arc: 10 },
      { d: { cfg: "index", at: "front", off: [0, 10, 20], paume: "dedans", doigts: "haut-arriere" }, t: 250, arc: 10 }
    ]
  },
  {
    id: "yeux", mot: "Yeux", theme: "corps", niveau: 1,
    syn: ["œil", "oeil", "regard"],
    desc: "Tes deux index montrent tes deux yeux et les touchent légèrement (en dessous), les lèvres un peu arrondies.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/yeux",
    sym: true,
    images: [
      { d: { cfg: "index", at: "oeil_dom", touch: "index", off: [5, -10, 25], paume: "bas", doigts: "arriere" }, visage: "neutre" },
      { d: { cfg: "index", at: "oeil_dom", touch: "index", off: [0, -8, 0], paume: "bas", doigts: "arriere" }, t: 350, contact: true, bouche: "o" }
    ]
  },
  {
    id: "oreilles", mot: "Oreilles", theme: "corps", niveau: 1,
    syn: ["oreille"],
    desc: "Tes deux index touchent tes deux oreilles en même temps et tapotent plusieurs fois.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/oreilles",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "index", at: "oreille_dom", touch: "index", off: [15, 0, 0], paume: "arriere", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: "index", at: "oreille_dom", touch: "index", paume: "arriere", doigts: "dedans" }, t: 200, contact: true }
    ]
  },
  {
    id: "nez", mot: "Nez", theme: "corps", niveau: 1,
    desc: "Touche légèrement le bout de ton nez avec ton index, plusieurs fois.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/nez",
    rep: 2,
    images: [
      { d: { cfg: "index", at: "nez", touch: "index", off: [0, 0, 15], paume: "dedans", doigts: "arriere" }, visage: "neutre" },
      { d: { cfg: "index", at: "nez", touch: "index", paume: "dedans", doigts: "arriere" }, t: 200, contact: true }
    ]
  },
  {
    id: "cheveux", mot: "Cheveux", theme: "corps", niveau: 1,
    syn: ["cheveu", "coiffure"],
    desc: "À côté de ta tête, pince une mèche imaginaire entre le pouce et l'index (les autres doigts tendus), d'un petit geste rapide.",
    astuce: "Tu attrapes une mèche de cheveux.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/cheveux",
    rep: 2,
    images: [
      { d: { cfg: { doigts: ["c", "t", "t", "t"], ecart: 10, pouce: "ecarte" }, at: "tempe_dom", off: [12, 15, 0], paume: "dedans", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "F", at: "tempe_dom", off: [16, 18, 0], paume: "dedans", doigts: "haut" }, t: 200 }
    ]
  },
  {
    id: "mains", mot: "Mains", theme: "corps", niveau: 1,
    syn: ["main", "doigts"],
    desc: "Lève tes deux mains ouvertes devant toi, doigts écartés, paumes vers toi, et fais bouger tes doigts.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/mains",
    sym: true,
    images: [
      { d: { cfg: "5", at: "neutre", off: [25, 5, 0], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "5", at: "neutre", off: [25, 8, 0], paume: "arriere", doigts: "haut" }, t: 800, agiter: true }
    ]
  },
  {
    id: "bras", mot: "Bras", theme: "corps", niveau: 2,
    syn: ["avant-bras"],
    desc: "Avance un peu ton bras droit. Avec ta main gauche ouverte, tapote plusieurs fois le haut de ton bras droit.",
    fiable: "sur", source: "https://www.pauselsf.fr/signs/bras",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [10, -20, 25], paume: "dedans", doigts: "avant" },
        nd: { cfg: "plate", at: "epaule_dom", off: [-5, -25, 15], paume: "dedans", doigts: "bas" }, visage: "neutre" },
      { nd: { cfg: "plate", at: "epaule_dom", off: [-15, -25, 5], paume: "dedans", doigts: "bas" }, t: 200 }
    ]
  },
  {
    id: "pied", mot: "Pied", theme: "corps", niveau: 2,
    syn: ["pieds", "à pied"],
    desc: "Ta main gauche plate, paume vers le bas, c'est ton pied. Avec le majeur plié de l'autre main, tapote plusieurs fois le bord extérieur de ta main gauche.",
    fiable: "probable", source: "https://www.pauselsf.fr/signs/pied",
    rep: 2,
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, -10, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "5_majeur", at: "nd:tranche", touch: "majeur", off: [0, 12, 0], paume: "bas", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: "5_majeur", at: "nd:tranche", touch: "majeur", paume: "bas", doigts: "dedans" }, t: 200, contact: true }
    ]
  },

  // ======================= SANTÉ =======================
  {
    id: "malade", mot: "Malade", theme: "sante", niveau: 1,
    syn: ["maladie", "pas bien"],
    desc: "Ta main gauche pend, molle, paume vers le bas. Pince le dos de cette main avec le pouce et l'index de l'autre main, et secoue le tout mollement.",
    astuce: "Ta main est toute molle, comme quand tu es malade.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Malade",
    rep: 3,
    images: [
      { nd: { cfg: "5_courbe", at: "neutre_non", off: [0, -5, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "pince_fermee", at: "nd:dos", touch: "index", paume: "bas", doigts: "dedans" }, contact: true, visage: "fatigue" },
      { nd: { cfg: "5_courbe", at: "neutre_non", off: [4, -9, 0], paume: "bas", doigts: "dedans" },
        d: { cfg: "pince_fermee", at: "nd:dos", touch: "index", paume: "bas", doigts: "dedans" }, t: 150 }
    ]
  },
  {
    id: "medecin", mot: "Médecin", theme: "sante", niveau: 1,
    syn: ["docteur", "médecine", "toubib"],
    desc: "Ta main gauche paume vers le haut. Avec l'index et le majeur tendus de l'autre main, tapote deux fois l'intérieur de ton poignet gauche.",
    astuce: "Le médecin prend ton pouls.",
    fiable: "probable", source: "https://lsf.wikisign.org/wiki/Médecine",
    rep: 2,
    images: [
      { nd: { cfg: "plate", at: "neutre_non", off: [0, -10, 0], paume: "haut", doigts: "dedans" },
        d: { cfg: "U", at: "nd:poignet", touch: "doigts", off: [0, 15, 0], paume: "bas", doigts: "dedans-bas" }, visage: "neutre" },
      { d: { cfg: "U", at: "nd:poignet", touch: "doigts", paume: "bas", doigts: "dedans-bas" }, t: 200, contact: true }
    ]
  },
  {
    id: "medicament", mot: "Médicament", theme: "sante", niveau: 2,
    syn: ["cachet", "pilule", "comprimé"],
    desc: "Tiens un petit cachet imaginaire entre le pouce et l'index, un peu devant ta bouche, puis ouvre les doigts en approchant la main de ta bouche.",
    astuce: "Tu avales ton médicament.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Médicament",
    images: [
      { d: { cfg: "pince_fermee", at: "bouche", off: [0, 0, 30], paume: "arriere", doigts: "dedans" }, visage: "neutre" },
      { d: { cfg: { doigts: ["c", "p", "p", "p"], ecart: 0, pouce: "ecarte" }, at: "bouche", off: [0, 0, 14], paume: "arriere", doigts: "dedans" }, t: 350, bouche: "ouverte" }
    ]
  },
  {
    id: "douleur", mot: "Avoir mal", theme: "sante", niveau: 1,
    syn: ["mal", "douleur", "ça fait mal"],
    desc: "Tes deux poings fermés, pouces levés, l'un contre l'autre devant toi : fais tourner les pouces l'un autour de l'autre, avec une grimace.",
    fiable: "probable", source: "https://cypris.fr/solidarite/LSF.pdf",
    rep: 2,
    images: [
      { d: { cfg: "pouce", at: "neutre", off: [6, 8, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "pouce", at: "neutre", off: [6, -8, 0], paume: "dedans", doigts: "avant" }, visage: "moue" },
      { d: { cfg: "pouce", at: "neutre", off: [6, 0, 8], paume: "dedans", doigts: "avant" },
        nd: { cfg: "pouce", at: "neutre", off: [6, 0, -8], paume: "dedans", doigts: "avant" }, t: 180 },
      { d: { cfg: "pouce", at: "neutre", off: [6, -8, 0], paume: "dedans", doigts: "avant" },
        nd: { cfg: "pouce", at: "neutre", off: [6, 8, 0], paume: "dedans", doigts: "avant" }, t: 180 },
      { d: { cfg: "pouce", at: "neutre", off: [6, 0, -8], paume: "dedans", doigts: "avant" },
        nd: { cfg: "pouce", at: "neutre", off: [6, 0, 8], paume: "dedans", doigts: "avant" }, t: 180 }
    ]
  },

  // ======================= TECHNO =======================
  {
    id: "telephone", mot: "Téléphone", theme: "techno", niveau: 1,
    syn: ["téléphoner", "appeler", "appel"],
    desc: "Main en Y (pouce et petit doigt tendus) contre ta joue : le pouce près de l'oreille, le petit doigt vers la bouche.",
    astuce: "Ta main devient un combiné de téléphone.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Téléphone",
    images: [
      { d: { cfg: "Y", at: "joue_dom", off: [30, -15, 30], paume: "dedans", doigts: "haut-avant" }, visage: "neutre" },
      { d: { cfg: "Y", at: "joue_dom", off: [10, 0, 20], paume: "dedans", doigts: "haut-avant" }, t: 350, contact: true }
    ]
  },
  {
    id: "ordinateur", mot: "Ordinateur", theme: "techno", niveau: 1,
    syn: ["ordi", "PC", "informatique"],
    desc: "Tes deux mains en 3 (pouce, index et majeur tendus), paumes vers l'avant, un peu au-dessus des épaules : rapproche-les et écarte-les plusieurs fois en descendant, en zigzag.",
    astuce: "Les doigts tendus, ce sont les lignes de texte qui défilent sur l'écran.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Ordinateur",
    sym: true,
    images: [
      { d: { cfg: "3", at: "neutre_haut", off: [30, 15, 0], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "3", at: "neutre_haut", off: [15, 5, 0], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "3", at: "neutre_haut", off: [30, -5, 0], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "3", at: "neutre_haut", off: [15, -15, 0], paume: "avant", doigts: "haut" }, t: 200 }
    ]
  },
  {
    id: "internet", mot: "Internet", theme: "techno", niveau: 1,
    syn: ["web", "en ligne", "site internet"],
    desc: "Rassemble les doigts de tes deux mains en un point devant toi (doigts en bec). Fais tourner les mains l'une autour de l'autre en ouvrant les doigts : à la fin, elles ont échangé leur place.",
    astuce: "La Terre (une boule) entourée de fils : le réseau mondial.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Internet",
    images: [
      { d: { cfg: "bec", at: "neutre", off: [5, 0, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "bec", at: "neutre", off: [5, 0, 0], paume: "arriere", doigts: "haut" }, contact: true, visage: "neutre" },
      { d: { cfg: "5_courbe", at: "neutre", off: [-5, -22, 15], paume: "avant", doigts: "haut" },
        nd: { cfg: "5_courbe", at: "neutre", off: [-5, 22, -15], paume: "arriere", doigts: "haut" }, t: 300, arc: 10 },
      { d: { cfg: "5", at: "neutre", off: [-28, 0, 0], paume: "avant", doigts: "haut" },
        nd: { cfg: "5", at: "neutre", off: [-28, 0, 0], paume: "arriere", doigts: "haut" }, t: 300, arc: 10 }
    ]
  },
  {
    id: "message", mot: "Message (SMS)", theme: "techno", niveau: 1,
    syn: ["SMS", "texto", "texter", "message"],
    desc: "Ta main gauche plate devant toi, paume vers toi, comme l'écran du téléphone. Les doigts à moitié pliés de ta main droite partent du haut de l'écran, se replient et glissent jusqu'en bas.",
    astuce: "Tes doigts font défiler les lettres du message sur l'écran.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Texto",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "arriere", doigts: "dedans" },
        d: { cfg: { doigts: ["c", "c", "c", "c"], ecart: 6, pouce: "replie" }, at: "nd:paume", touch: "doigts", off: [0, 22, -5], paume: "bas", doigts: "avant" }, contact: true, visage: "neutre" },
      { d: { cfg: { doigts: ["x", "x", "x", "x"], ecart: 6, pouce: "replie" }, at: "nd:paume", touch: "doigts", off: [0, -24, -5], paume: "bas", doigts: "avant" }, t: 450 }
    ]
  },
  {
    id: "email", mot: "E-mail", theme: "techno", niveau: 2,
    syn: ["courriel", "mail", "mél", "arobase"],
    desc: "Ta main gauche plate, paume vers toi. Ta main droite en A (poing, pouce contre l'index) dessine un « @ » devant ta paume gauche : un petit rond, puis un grand tour autour.",
    astuce: "Tu dessines l'arobase de l'adresse mail.",
    fiable: "sur", source: "https://lsf.wikisign.org/wiki/Courriel",
    images: [
      { nd: { cfg: "plate", at: "neutre_non", paume: "arriere", doigts: "dedans" },
        d: { cfg: "A", at: "nd:paume", off: [0, 0, -18], paume: "avant", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "A", at: "nd:paume", off: [8, 8, -18], paume: "avant", doigts: "haut" }, t: 150 },
      { d: { cfg: "A", at: "nd:paume", off: [25, 0, -18], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "A", at: "nd:paume", off: [0, 25, -18], paume: "avant", doigts: "haut" }, t: 200, arc: 8 },
      { d: { cfg: "A", at: "nd:paume", off: [-25, 0, -18], paume: "avant", doigts: "haut" }, t: 200, arc: 8 },
      { d: { cfg: "A", at: "nd:paume", off: [0, -25, -18], paume: "avant", doigts: "haut" }, t: 200, arc: 8 },
      { d: { cfg: "A", at: "nd:paume", off: [22, -8, -18], paume: "avant", doigts: "haut" }, t: 200, arc: 8 }
    ]
  }

]);
