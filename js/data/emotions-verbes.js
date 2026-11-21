// Signes LSF : émotions, verbes, adjectifs.
// Format : voir notes/format-signes.md. Sources et niveau de fiabilité : notes/research/emotions-verbes.md
LSF.ajouter([

  // ===================================================================
  // ÉMOTIONS
  // ===================================================================

  {
    id: "content", mot: "Content", theme: "emotions", niveau: 1,
    syn: ["heureux", "heureuse", "contente", "joie", "joyeux", "être content"],
    desc: "Pose ta main plate sur ta poitrine et fais des petits cercles, avec un grand sourire.",
    astuce: "Comme si ton cœur se réchauffait de bonheur.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "poitrine", off: [12, 0, 0], paume: "arriere", doigts: "dedans" }, visage: "joie", contact: true },
      { d: { cfg: "plate", at: "poitrine", off: [0, 12, 0], paume: "arriere", doigts: "dedans" }, t: 220 },
      { d: { cfg: "plate", at: "poitrine", off: [-12, 0, 0], paume: "arriere", doigts: "dedans" }, t: 220 },
      { d: { cfg: "plate", at: "poitrine", off: [0, -12, 0], paume: "arriere", doigts: "dedans" }, t: 220 },
      { d: { cfg: "plate", at: "poitrine", off: [12, 0, 0], paume: "arriere", doigts: "dedans" }, t: 220 }
    ]
  },

  {
    id: "triste", mot: "Triste", theme: "emotions", niveau: 1,
    syn: ["tristesse", "être triste"],
    desc: "Main ouverte, doigts écartés et un peu pliés devant ton visage : fais-la descendre lentement du front jusqu'au menton. Ton visage est triste.",
    astuce: "Comme un visage qui « tombe ».",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "5_courbe", at: "front", off: [0, 0, 20], paume: "arriere", doigts: "haut" }, visage: "triste" },
      { d: { cfg: "5_courbe", at: "menton", off: [0, -5, 20], paume: "arriere", doigts: "haut" }, t: 900 }
    ]
  },

  {
    id: "en-colere", mot: "En colère", theme: "emotions", niveau: 1,
    syn: ["colère", "fâché", "énervé", "furieux", "être en colère"],
    desc: "Tes deux mains en griffe contre ton ventre remontent le long de ta poitrine en tournant vers le haut. Fronce les sourcils !",
    astuce: "La colère qui bouillonne et monte en toi.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "griffe", at: "ventre_dom", paume: "arriere", doigts: "dedans" }, visage: "colere", bouche: "serree", contact: true },
      { d: { cfg: "griffe", at: "poitrine_dom", off: [0, 15, 10], paume: "arriere", doigts: "haut" }, t: 450 }
    ]
  },

  {
    id: "peur", mot: "Peur", theme: "emotions", niveau: 1,
    syn: ["avoir peur", "effrayé", "j'ai peur", "craindre"],
    desc: "Main ouverte, doigts écartés : plaque-la d'un coup sur ta poitrine, avec un visage qui a peur.",
    astuce: "Ton cœur qui sursaute.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "5", at: "coeur", off: [0, 0, 35], paume: "arriere", doigts: "dedans-haut" }, visage: "peur" },
      { d: { cfg: "5", at: "coeur", paume: "arriere", doigts: "dedans-haut" }, t: 200, pause: 300, contact: true }
    ]
  },

  {
    id: "aimer", mot: "Aimer", theme: "emotions", niveau: 1,
    syn: ["j'aime", "aimer bien", "adorer", "je t'aime"],
    desc: "Pose ta main plate sur ton cœur, puis fais-la glisser vers le haut, avec un sourire.",
    astuce: "L'amour qui monte de ton cœur. Pour « je t'aime », tu peux ensuite avancer la main vers la personne.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "plate", at: "coeur", off: [0, -10, 0], paume: "arriere", doigts: "dedans" }, visage: "sourire", contact: true },
      { d: { cfg: "plate", at: "coeur", off: [0, 20, 0], paume: "arriere", doigts: "dedans" }, t: 500 }
    ]
  },

  {
    id: "ne-pas-aimer", mot: "Ne pas aimer", theme: "emotions", niveau: 2,
    syn: ["je n'aime pas", "pas aimer", "pas aimé"],
    desc: "Pose ta main plate en haut de ton cœur et fais-la glisser vers le bas, avec une petite moue.",
    astuce: "C'est le contraire d'« aimer » : la main descend au lieu de monter.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "plate", at: "coeur", off: [0, 20, 0], paume: "arriere", doigts: "dedans" }, visage: "moue", contact: true },
      { d: { cfg: "plate", at: "coeur", off: [0, -20, 5], paume: "arriere", doigts: "dedans" }, t: 500 }
    ]
  },

  {
    id: "amour", mot: "Amour", theme: "emotions", niveau: 2,
    syn: ["l'amour"],
    desc: "Main en bec (doigts serrés contre le pouce), paume vers le bas devant toi : fais un petit cercle à plat.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "bec", at: "neutre", off: [0, 0, 15], paume: "bas", doigts: "avant" }, visage: "sourire" },
      { d: { cfg: "bec", at: "neutre", off: [15, 0, 0], paume: "bas", doigts: "avant" }, t: 250 },
      { d: { cfg: "bec", at: "neutre", off: [0, 0, -15], paume: "bas", doigts: "avant" }, t: 250 },
      { d: { cfg: "bec", at: "neutre", off: [-15, 0, 0], paume: "bas", doigts: "avant" }, t: 250 },
      { d: { cfg: "bec", at: "neutre", off: [0, 0, 15], paume: "bas", doigts: "avant" }, t: 250 }
    ]
  },

  {
    id: "malheureux", mot: "Malheureux", theme: "emotions", niveau: 3,
    syn: ["malheureuse", "malheur"],
    desc: "Main en bec, paume vers le haut devant toi : fais un petit cercle, avec un visage triste.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "bec", at: "neutre", off: [0, 0, 15], paume: "haut", doigts: "avant" }, visage: "triste" },
      { d: { cfg: "bec", at: "neutre", off: [15, 0, 0], paume: "haut", doigts: "avant" }, t: 250 },
      { d: { cfg: "bec", at: "neutre", off: [0, 0, -15], paume: "haut", doigts: "avant" }, t: 250 },
      { d: { cfg: "bec", at: "neutre", off: [-15, 0, 0], paume: "haut", doigts: "avant" }, t: 250 },
      { d: { cfg: "bec", at: "neutre", off: [0, 0, 15], paume: "haut", doigts: "avant" }, t: 250 }
    ]
  },

  {
    id: "decu", mot: "Déçu", theme: "emotions", niveau: 2,
    syn: ["déception", "déçue", "décevoir"],
    desc: "Main ouverte, doigts écartés, le bout des doigts près du menton : fais-la descendre, l'air déçu.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "5", at: "menton", off: [0, 0, 10], paume: "arriere", doigts: "haut" }, visage: "moue" },
      { d: { cfg: "5", at: "menton", off: [0, -35, 15], paume: "arriere", doigts: "haut" }, t: 600, visage: "triste" }
    ]
  },

  {
    id: "timide", mot: "Timide", theme: "emotions", niveau: 2,
    syn: ["timidité", "gêné", "réservé"],
    desc: "Main ouverte, le majeur plié : caresse ta joue vers le haut avec le bout du majeur, deux fois.",
    astuce: "Les joues qui rougissent quand on est timide.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    rep: 2,
    images: [
      { d: { cfg: "5_majeur", at: "joue_dom", off: [0, -12, 0], touch: "majeur", paume: "arriere", doigts: "haut" }, visage: "moue", contact: true },
      { d: { cfg: "5_majeur", at: "joue_dom", off: [0, 12, 0], touch: "majeur", paume: "arriere", doigts: "haut" }, t: 400 }
    ]
  },

  {
    id: "calme", mot: "Calme", theme: "emotions", niveau: 2,
    syn: ["tranquille", "se calmer", "du calme", "zen", "apaisé"],
    desc: "Tes deux mains plates, paumes vers le bas, descendent doucement devant toi.",
    astuce: "Comme si tu calmais des vagues.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/mainplate_revue8.pdf",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [0, 15, 0], paume: "bas", doigts: "avant" }, visage: "neutre", bouche: "fermee" },
      { d: { cfg: "plate", at: "neutre_dom", off: [0, -25, 0], paume: "bas", doigts: "avant" }, t: 1000 }
    ]
  },

  {
    id: "fatigue", mot: "Fatigué", theme: "emotions", niveau: 1,
    syn: ["fatiguée", "fatigue", "épuisé", "crevé"],
    desc: "Pose le bout des doigts de tes deux mains plates en haut de ta poitrine, puis laisse tomber les mains vers le bas, l'air épuisé.",
    astuce: "Ton corps qui s'affaisse quand tu n'as plus d'énergie.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/fatigu%C3%A9",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "poitrine_dom", off: [0, 10, 0], touch: "doigts", paume: "bas", doigts: "arriere-bas" }, visage: "fatigue", contact: true },
      { d: { cfg: "plate", at: "poitrine_dom", off: [0, -25, 25], paume: "arriere", doigts: "dedans-bas" }, t: 700 }
    ]
  },

  {
    id: "pleurer", mot: "Pleurer", theme: "emotions", niveau: 2,
    syn: ["larmes", "pleurs"],
    desc: "Tes deux index partent sous tes yeux et descendent le long des joues, comme des larmes. Deux fois.",
    astuce: "Tu dessines les larmes qui coulent.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/pleurer",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "index", at: "oeil_dom", off: [0, -12, 0], touch: "index", paume: "arriere", doigts: "haut" }, visage: "triste", contact: true },
      { d: { cfg: "index", at: "joue_dom", off: [0, -25, 0], touch: "index", paume: "arriere", doigts: "haut" }, t: 450 }
    ]
  },

  {
    id: "en-avoir-marre", mot: "En avoir marre", theme: "emotions", niveau: 2,
    syn: ["marre", "ras-le-bol", "j'en ai marre", "assez"],
    desc: "Main plate, paume vers le bas, juste sous ton menton : tape deux petits coups vers le haut, l'air agacé.",
    astuce: "« J'en ai jusque-là ! »",
    fiable: "incertain", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/mainplate_revue8.pdf",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "cou", off: [0, -5, 12], paume: "bas", doigts: "dedans" }, visage: "moue" },
      { d: { cfg: "plate", at: "cou", off: [0, 5, 8], paume: "bas", doigts: "dedans" }, t: 200, contact: true }
    ]
  },

  {
    id: "plaisir", mot: "Plaisir", theme: "emotions", niveau: 3,
    syn: ["faire plaisir", "agréable"],
    desc: "Tes deux mains plates sur ta poitrine tournent en petits cercles, avec le sourire.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "poitrine_dom", off: [10, 0, 0], paume: "arriere", doigts: "dedans" }, visage: "sourire", contact: true },
      { d: { cfg: "plate", at: "poitrine_dom", off: [0, 10, 0], paume: "arriere", doigts: "dedans" }, t: 250 },
      { d: { cfg: "plate", at: "poitrine_dom", off: [-10, 0, 0], paume: "arriere", doigts: "dedans" }, t: 250 },
      { d: { cfg: "plate", at: "poitrine_dom", off: [0, -10, 0], paume: "arriere", doigts: "dedans" }, t: 250 },
      { d: { cfg: "plate", at: "poitrine_dom", off: [10, 0, 0], paume: "arriere", doigts: "dedans" }, t: 250 }
    ]
  },

  {
    id: "emotion", mot: "Émotion", theme: "emotions", niveau: 3,
    syn: ["émotions", "sentiment", "émouvoir"],
    desc: "Tes deux mains ouvertes près de ta tête : fais danser tes doigts l'un après l'autre en montant un peu.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    sym: true,
    images: [
      { d: { cfg: "5", at: "tempe_dom", off: [15, -5, 25], paume: "arriere", doigts: "haut" }, visage: "neutre" },
      { d: { cfg: "5", at: "tempe_dom", off: [15, 10, 25], paume: "arriere", doigts: "haut" }, t: 900, agiter: true }
    ]
  },

  // ===================================================================
  // VERBES
  // ===================================================================

  {
    id: "aller", mot: "Aller", theme: "verbes", niveau: 1,
    syn: ["je vais", "s'en aller", "aller à"],
    desc: "Ton index tendu vers l'avant part de toi et s'éloigne vers l'endroit où tu vas.",
    astuce: "Ton doigt montre le chemin. Change de direction selon l'endroit !",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/aller",
    images: [
      { d: { cfg: "index", at: "neutre", off: [0, 0, -25], paume: "bas", doigts: "avant" } },
      { d: { cfg: "index", at: "loin", off: [0, -5, 0], paume: "bas", doigts: "avant" }, t: 500, arc: 10 }
    ]
  },

  {
    id: "venir", mot: "Venir", theme: "verbes", niveau: 1,
    syn: ["viens", "arriver vers moi", "je viens"],
    desc: "Ton index levé, bras tendu devant toi, revient vers ta poitrine.",
    astuce: "Le contraire d'« aller » : le mouvement vient vers toi.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/venir",
    images: [
      { d: { cfg: "index", at: "loin", paume: "arriere", doigts: "haut" } },
      { d: { cfg: "index", at: "neutre", off: [0, 0, -25], paume: "arriere", doigts: "haut" }, t: 500, arc: 10 }
    ]
  },

  {
    id: "vouloir", mot: "Vouloir", theme: "verbes", niveau: 1,
    syn: ["je veux", "envie", "désirer"],
    desc: "Tes deux mains en griffe, paumes vers le haut devant toi, se rapprochent de toi.",
    astuce: "Comme si tu attrapais ce que tu veux pour le ramener vers toi.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/pincecrochet_revue6.pdf",
    sym: true,
    images: [
      { d: { cfg: "griffe", at: "neutre_dom", off: [0, -5, 20], paume: "haut", doigts: "avant" } },
      { d: { cfg: "griffe", at: "neutre_dom", off: [0, 0, -15], paume: "haut", doigts: "avant" }, t: 450 }
    ]
  },

  {
    id: "pouvoir", mot: "Pouvoir", theme: "verbes", niveau: 1,
    syn: ["je peux", "être capable", "capable", "possible"],
    desc: "Tes deux poings fermés devant toi descendent d'un coup ferme.",
    astuce: "Des poings solides : tu as la force de le faire.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/poing_revue5.pdf",
    sym: true,
    images: [
      { d: { cfg: "poing", at: "neutre_dom", off: [0, 15, 0], paume: "bas", doigts: "avant" } },
      { d: { cfg: "poing", at: "neutre_dom", off: [0, -15, 0], paume: "bas", doigts: "avant" }, t: 250, pause: 150 }
    ]
  },

  {
    id: "savoir", mot: "Savoir", theme: "verbes", niveau: 1,
    syn: ["je sais", "sais"],
    desc: "Main plate pliée en angle, paume vers le bas : pose le bout des doigts sur le côté de ton front, puis descends la main vers l'avant.",
    astuce: "Le savoir est rangé dans ta tête.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "plate_pliee", at: "front_dom", touch: "doigts", paume: "bas", doigts: "dedans" }, contact: true },
      { d: { cfg: "plate_pliee", at: "front_dom", off: [0, -35, 25], paume: "bas", doigts: "dedans" }, t: 450 }
    ]
  },

  {
    id: "connaitre", mot: "Connaître", theme: "verbes", niveau: 2,
    syn: ["je connais", "connaissance"],
    desc: "Main plate pliée en angle, paume vers toi : tapote deux fois ton front avec le bout des doigts.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    rep: 2,
    images: [
      { d: { cfg: "plate_pliee", at: "front_dom", off: [0, 0, 12], paume: "arriere", doigts: "dedans" } },
      { d: { cfg: "plate_pliee", at: "front_dom", touch: "doigts", paume: "arriere", doigts: "dedans" }, t: 200, contact: true }
    ]
  },

  {
    id: "comprendre", mot: "Comprendre", theme: "verbes", niveau: 1,
    syn: ["j'ai compris", "compris", "je comprends"],
    desc: "Main ouverte en griffe devant ton front : referme les doigts en bec contre ton front.",
    astuce: "Tu attrapes l'idée et tu la gardes dans ta tête.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "5_courbe", at: "front_dom", off: [0, 0, 18], paume: "bas", doigts: "arriere" }, visage: "concentre" },
      { d: { cfg: "bec", at: "front_dom", touch: "doigts", paume: "bas", doigts: "arriere" }, t: 400, contact: true, visage: "sourire" }
    ]
  },

  {
    id: "apprendre", mot: "Apprendre", theme: "verbes", niveau: 1,
    syn: ["j'apprends", "étudier", "apprentissage"],
    desc: "Ta main attrape quelque chose dans la paume de ton autre main, se ferme en bec et monte se poser sur ton front.",
    astuce: "Tu prends l'info dans le livre et tu la mets dans ta tête.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "5_courbe", at: "nd:paume", off: [0, 10, 0], paume: "bas", doigts: "avant" }, nd: { cfg: "plate", at: "neutre", paume: "haut", doigts: "dedans" } },
      { d: { cfg: "bec", at: "nd:paume", off: [0, 3, 0], paume: "bas", doigts: "avant" }, t: 300, contact: true },
      { d: { cfg: "bec", at: "front_dom", touch: "doigts", paume: "bas", doigts: "arriere" }, t: 500, arc: 15, contact: true }
    ]
  },

  {
    id: "penser", mot: "Penser", theme: "verbes", niveau: 1,
    syn: ["je pense", "pensée", "croire"],
    desc: "Ton index vient toucher ta tempe, deux fois.",
    astuce: "Tu montres l'endroit où naissent les idées.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/penser",
    rep: 2,
    images: [
      { d: { cfg: "index", at: "tempe_dom", off: [10, 0, 8], paume: "arriere", doigts: "dedans" }, visage: "concentre" },
      { d: { cfg: "index", at: "tempe_dom", touch: "index", paume: "arriere", doigts: "dedans" }, t: 200, contact: true }
    ]
  },

  {
    id: "reflechir", mot: "Réfléchir", theme: "verbes", niveau: 2,
    syn: ["réflexion", "se creuser la tête"],
    desc: "Ton index plié en crochet devant ton front s'éloigne vers le côté, l'air concentré.",
    astuce: "Comme si tu creusais dans ta tête pour trouver une idée.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/pincecrochet_revue6.pdf",
    images: [
      { d: { cfg: "index_crochet", at: "front_dom", off: [0, 0, 12], paume: "arriere", doigts: "haut" }, visage: "concentre" },
      { d: { cfg: "index_crochet", at: "front_dom", off: [35, 10, 20], paume: "arriere", doigts: "haut" }, t: 600, arc: 10 }
    ]
  },

  {
    id: "rever", mot: "Rêver", theme: "verbes", niveau: 2,
    syn: ["rêve", "rêverie", "imaginer"],
    desc: "Index et majeur croisés (le R) près de ta tempe : fais monter la main vers le haut et le côté en petits cercles.",
    astuce: "Le R de « rêve » qui s'envole vers l'imaginaire.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "R", at: "tempe_dom", off: [8, 5, 10], paume: "arriere", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "R", at: "tempe_dom", off: [25, 25, 20], paume: "arriere", doigts: "haut" }, t: 400, arc: 12 },
      { d: { cfg: "R", at: "tempe_dom", off: [35, 40, 10], paume: "arriere", doigts: "haut" }, t: 400, arc: 12 },
      { d: { cfg: "R", at: "tempe_dom", off: [55, 48, 20], paume: "arriere", doigts: "haut" }, t: 400, arc: 12 }
    ]
  },

  {
    id: "decider", mot: "Décider", theme: "verbes", niveau: 2,
    syn: ["décision", "choisir"],
    desc: "Tes deux mains plates, sur la tranche et bien droites, descendent d'un coup sec puis les doigts remontent un peu.",
    astuce: "Comme un couperet qui tranche : c'est décidé !",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [0, 25, 0], paume: "dedans", doigts: "avant" }, visage: "concentre" },
      { d: { cfg: "plate", at: "neutre_dom", off: [0, -15, 0], paume: "dedans", doigts: "avant" }, t: 250 },
      { d: { cfg: "plate", at: "neutre_dom", off: [0, -10, 5], paume: "dedans", doigts: "avant-haut" }, t: 150, pause: 200 }
    ]
  },

  {
    id: "oublier", mot: "Oublier", theme: "verbes", niveau: 2,
    syn: ["j'ai oublié", "oubli"],
    desc: "Main fermée en bec contre ton front : éloigne-la vers le côté en ouvrant les doigts.",
    astuce: "L'idée s'échappe de ta tête et s'envole.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/oublier",
    images: [
      { d: { cfg: "bec", at: "front_dom", touch: "doigts", paume: "bas", doigts: "arriere" }, contact: true },
      { d: { cfg: "5", at: "front_dom", off: [45, 15, 25], paume: "avant", doigts: "haut" }, t: 500, arc: 10, visage: "moue" }
    ]
  },

  {
    id: "se-souvenir", mot: "Se souvenir", theme: "verbes", niveau: 2,
    syn: ["se rappeler", "souvenir", "mémoire", "retenir"],
    desc: "Poing fermé, pouce tendu : appuie le bout du pouce sur ton front et garde-le un instant.",
    astuce: "Tu « graves » le souvenir dans ta tête.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/configmain_revue4.pdf",
    images: [
      { d: { cfg: "pouce", at: "front_dom", off: [0, 0, 15], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "pouce", at: "front_dom", touch: "pouce", paume: "dedans", doigts: "haut" }, t: 350, pause: 300, contact: true }
    ]
  },

  {
    id: "regarder", mot: "Regarder", theme: "verbes", niveau: 1,
    syn: ["voir", "regard", "observer", "je vois"],
    desc: "Index et majeur écartés (V), paume vers le bas, pointés vers tes yeux : tourne le poignet pour qu'ils pointent vers l'avant.",
    astuce: "Tes deux doigts sont tes deux yeux qui partent regarder.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "V", at: "oeil_dom", off: [0, -5, 25], paume: "bas", doigts: "arriere" } },
      { d: { cfg: "V", at: "oeil_dom", off: [0, -8, 35], paume: "bas", doigts: "avant" }, t: 400 }
    ]
  },

  {
    id: "lire", mot: "Lire", theme: "verbes", niveau: 1,
    syn: ["lecture", "je lis"],
    desc: "Ton autre main plate est une page tournée vers toi. Ta main en V la parcourt de gauche à droite, ligne après ligne.",
    astuce: "Tes yeux (le V) suivent les lignes du livre.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "V", at: "nd:paume", off: [-15, 15, -25], paume: "bas", doigts: "avant" }, nd: { cfg: "plate", at: "neutre", paume: "arriere", doigts: "haut" } },
      { d: { cfg: "V", at: "nd:paume", off: [15, 15, -25], paume: "bas", doigts: "avant" }, t: 400 },
      { d: { cfg: "V", at: "nd:paume", off: [-15, 0, -25], paume: "bas", doigts: "avant" }, t: 250 },
      { d: { cfg: "V", at: "nd:paume", off: [15, 0, -25], paume: "bas", doigts: "avant" }, t: 400 }
    ]
  },

  {
    id: "ecrire", mot: "Écrire", theme: "verbes", niveau: 1,
    syn: ["écriture", "noter", "j'écris"],
    desc: "Fais comme si tu tenais un stylo entre le pouce et l'index et écris sur la paume de ton autre main.",
    astuce: "Ton autre main est la feuille.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/%C3%A9crire",
    images: [
      { d: { cfg: "pince_fermee", at: "nd:paume", off: [-15, 3, 0], touch: "index", paume: "bas", doigts: "avant" }, nd: { cfg: "plate", at: "neutre", paume: "haut", doigts: "dedans" }, contact: true },
      { d: { cfg: "pince_fermee", at: "nd:paume", off: [-5, 3, 5], touch: "index", paume: "bas", doigts: "avant" }, t: 200 },
      { d: { cfg: "pince_fermee", at: "nd:paume", off: [5, 3, -3], touch: "index", paume: "bas", doigts: "avant" }, t: 200 },
      { d: { cfg: "pince_fermee", at: "nd:paume", off: [15, 3, 3], touch: "index", paume: "bas", doigts: "avant" }, t: 200 }
    ]
  },

  {
    id: "parler", mot: "Parler", theme: "verbes", niveau: 1,
    syn: ["discuter", "parole", "je parle"],
    desc: "Ton index devant ta bouche fait de petits cercles qui roulent vers l'avant.",
    astuce: "Les mots qui sortent de ta bouche les uns après les autres.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/parler",
    rep: 2,
    images: [
      { d: { cfg: "index", at: "bouche", off: [0, 0, 15], paume: "dedans", doigts: "haut" }, bouche: "ouverte" },
      { d: { cfg: "index", at: "bouche", off: [0, 10, 25], paume: "dedans", doigts: "haut" }, t: 180 },
      { d: { cfg: "index", at: "bouche", off: [0, 0, 35], paume: "dedans", doigts: "haut" }, t: 180 },
      { d: { cfg: "index", at: "bouche", off: [0, -10, 25], paume: "dedans", doigts: "haut" }, t: 180 },
      { d: { cfg: "index", at: "bouche", off: [0, 0, 15], paume: "dedans", doigts: "haut" }, t: 180 }
    ]
  },

  {
    id: "dire", mot: "Dire", theme: "verbes", niveau: 1,
    syn: ["dis", "raconter", "je dis"],
    desc: "Ton index part de ton menton et avance vers la personne à qui tu parles.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/dire",
    images: [
      { d: { cfg: "index", at: "menton", touch: "index", paume: "dedans", doigts: "haut" }, contact: true },
      { d: { cfg: "index", at: "neutre", off: [0, 15, 15], paume: "dedans", doigts: "avant-haut" }, t: 450, arc: 8 }
    ]
  },

  {
    id: "signer", mot: "Signer", theme: "verbes", niveau: 1,
    syn: ["langue des signes", "LSF", "signes", "parler en signes"],
    desc: "Tes deux index devant ta poitrine tournent l'un après l'autre en grands cercles vers l'avant, comme des moulins.",
    astuce: "Des mains qui « parlent » sans s'arrêter.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/langue%20des%20signes",
    rep: 2,
    images: [
      { d: { cfg: "index", at: "neutre_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" }, nd: { cfg: "index", at: "neutre_non", off: [0, -15, 0], paume: "avant", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "index", at: "neutre_dom", off: [0, 0, 15], paume: "avant", doigts: "haut" }, nd: { cfg: "index", at: "neutre_non", off: [0, 0, -15], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "index", at: "neutre_dom", off: [0, -15, 0], paume: "avant", doigts: "haut" }, nd: { cfg: "index", at: "neutre_non", off: [0, 15, 0], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "index", at: "neutre_dom", off: [0, 0, -15], paume: "avant", doigts: "haut" }, nd: { cfg: "index", at: "neutre_non", off: [0, 0, 15], paume: "avant", doigts: "haut" }, t: 200 },
      { d: { cfg: "index", at: "neutre_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" }, nd: { cfg: "index", at: "neutre_non", off: [0, -15, 0], paume: "avant", doigts: "haut" }, t: 200 }
    ]
  },

  {
    id: "manger", mot: "Manger", theme: "verbes", niveau: 1,
    syn: ["repas", "je mange", "bouffer"],
    desc: "Main en bec (doigts serrés contre le pouce) : approche-la de ta bouche deux fois.",
    astuce: "Comme si tu portais de la nourriture à ta bouche.",
    fiable: "sur", source: "https://www.lyla-signes.fr/langue-signes-bases/",
    rep: 2,
    images: [
      { d: { cfg: "bec", at: "bouche", off: [0, -5, 20], paume: "bas", doigts: "arriere" }, bouche: "ouverte" },
      { d: { cfg: "bec", at: "bouche", touch: "doigts", paume: "bas", doigts: "arriere" }, t: 250, contact: true }
    ]
  },

  {
    id: "boire", mot: "Boire", theme: "verbes", niveau: 1,
    syn: ["je bois", "boisson"],
    desc: "Poing fermé, pouce tendu : amène le pouce vers ta bouche, comme le goulot d'une bouteille.",
    astuce: "Ton poing est la bouteille, ton pouce le goulot.",
    fiable: "sur", source: "https://www.lyla-signes.fr/langue-signes-bases/",
    images: [
      { d: { cfg: "pouce", at: "bouche", off: [0, -15, 25], paume: "bas", doigts: "dedans" } },
      { d: { cfg: "pouce", at: "bouche", touch: "pouce", paume: "bas", doigts: "dedans" }, t: 350, arc: 8, contact: true, pause: 200 }
    ]
  },

  {
    id: "se-reposer", mot: "Se reposer", theme: "verbes", niveau: 2,
    syn: ["repos", "pause", "détente", "se détendre"],
    desc: "Index et majeur croisés (le R) sur tes deux mains : elles partent de chaque côté et viennent se croiser à plat sur ta poitrine.",
    astuce: "Le R de « repos », bras croisés pour souffler.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    sym: true,
    images: [
      { d: { cfg: "R", at: "neutre_dom", off: [25, 0, 10], paume: "arriere", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "R", at: "poitrine_non", paume: "arriere", doigts: "haut" }, t: 500, contact: true, pause: 200 }
    ]
  },

  {
    id: "travailler", mot: "Travailler", theme: "verbes", niveau: 1,
    syn: ["travail", "boulot", "bosser", "job"],
    desc: "Tes deux mains en poing : ton poing du dessus tape deux fois sur l'autre poing, comme un marteau.",
    astuce: "Le marteau de l'ouvrier.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/poing_revue5.pdf",
    rep: 2,
    images: [
      { d: { cfg: "poing", at: "nd:dos", off: [0, 25, 0], paume: "dedans", doigts: "avant" }, nd: { cfg: "poing", at: "neutre", paume: "bas", doigts: "dedans" } },
      { d: { cfg: "poing", at: "nd:dos", touch: "tranche", paume: "dedans", doigts: "avant" }, t: 220, contact: true }
    ]
  },

  {
    id: "attendre", mot: "Attendre", theme: "verbes", niveau: 2,
    syn: ["attends", "patienter", "attente"],
    desc: "Main plate devant toi, paume vers l'avant : avance-la un petit peu et garde-la un instant.",
    astuce: "Comme pour dire « stop, une seconde ».",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/mainplate_revue8.pdf",
    images: [
      { d: { cfg: "plate", at: "neutre", off: [0, 5, -10], paume: "avant", doigts: "haut" } },
      { d: { cfg: "plate", at: "neutre", off: [0, 5, 10], paume: "avant", doigts: "haut" }, t: 300, pause: 400 }
    ]
  },

  {
    id: "chercher", mot: "Chercher", theme: "verbes", niveau: 2,
    syn: ["recherche", "fouiller", "je cherche"],
    desc: "Tes deux mains en V aux doigts pliés, paumes vers le bas : fais de petits cercles devant toi, comme si tu fouillais.",
    astuce: "Des doigts crochus qui fouillent partout.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/pincecrochet_revue6.pdf",
    sym: true, rep: 2,
    images: [
      { d: { cfg: "V_plie", at: "neutre_dom", off: [10, 0, 0], paume: "bas", doigts: "avant" }, visage: "interrogatif" },
      { d: { cfg: "V_plie", at: "neutre_dom", off: [0, 0, 10], paume: "bas", doigts: "avant" }, t: 180 },
      { d: { cfg: "V_plie", at: "neutre_dom", off: [-10, 0, 0], paume: "bas", doigts: "avant" }, t: 180 },
      { d: { cfg: "V_plie", at: "neutre_dom", off: [0, 0, -10], paume: "bas", doigts: "avant" }, t: 180 },
      { d: { cfg: "V_plie", at: "neutre_dom", off: [10, 0, 0], paume: "bas", doigts: "avant" }, t: 180 }
    ]
  },

  {
    id: "donner", mot: "Donner", theme: "verbes", niveau: 1,
    syn: ["offrir", "je donne", "passer"],
    desc: "Main plate, paume vers le haut, près de toi : avance-la vers la personne à qui tu donnes.",
    astuce: "Comme si tu tendais un cadeau.",
    fiable: "probable", source: "https://walter-learning.com/blog/soft-skills/langue-des-signes-lsf/verbes-lsf",
    images: [
      { d: { cfg: "plate", at: "poitrine", off: [0, -10, 40], paume: "haut", doigts: "avant" } },
      { d: { cfg: "plate", at: "loin", off: [0, -15, 0], paume: "haut", doigts: "avant" }, t: 500, arc: 10 }
    ]
  },

  {
    id: "prendre", mot: "Prendre", theme: "verbes", niveau: 1,
    syn: ["attraper", "saisir", "je prends"],
    desc: "Main ouverte tendue devant toi : ferme-la en poing en la ramenant vers toi.",
    astuce: "Tu attrapes l'objet et tu le gardes.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/prendre",
    images: [
      { d: { cfg: "5_courbe", at: "loin", paume: "bas", doigts: "avant" } },
      { d: { cfg: "poing", at: "neutre", off: [0, 0, -15], paume: "bas", doigts: "avant" }, t: 450 }
    ]
  },

  {
    id: "finir", mot: "Finir", theme: "verbes", niveau: 1,
    syn: ["fini", "terminé", "terminer", "c'est fini"],
    desc: "Tes deux mains plates levées, paumes vers l'avant, se baissent en s'écartant, paumes vers le bas.",
    astuce: "On pose tout : c'est terminé !",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/mainplate_revue8.pdf",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [0, 15, 0], paume: "avant", doigts: "haut" } },
      { d: { cfg: "plate", at: "neutre_dom", off: [15, -20, 5], paume: "bas", doigts: "avant" }, t: 400 }
    ]
  },

  {
    id: "marcher", mot: "Marcher", theme: "verbes", niveau: 1,
    syn: ["marche", "se promener", "à pied"],
    desc: "Tes deux mains plates, paumes vers le bas, sont tes pieds : avance-les l'une après l'autre.",
    astuce: "Un pied, puis l'autre.",
    fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/marcher",
    rep: 2,
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [0, 5, 10], paume: "bas", doigts: "avant" }, nd: { cfg: "plate", at: "neutre_non", off: [0, 0, -10], paume: "bas", doigts: "avant" } },
      { d: { cfg: "plate", at: "neutre_dom", off: [0, 0, -10], paume: "bas", doigts: "avant" }, nd: { cfg: "plate", at: "neutre_non", off: [0, 5, 10], paume: "bas", doigts: "avant" }, t: 350 }
    ]
  },

  {
    id: "s-habiller", mot: "S'habiller", theme: "verbes", niveau: 2,
    syn: ["habiller", "mettre", "enfiler", "vêtements"],
    desc: "Tes deux poings partent de tes épaules, sur les côtés, et viennent vers le milieu de ta poitrine, comme si tu enfilais une veste.",
    astuce: "Tu fermes ta veste.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    sym: true,
    images: [
      { d: { cfg: "A", at: "epaule_dom", off: [20, 0, 15], paume: "dedans", doigts: "haut" } },
      { d: { cfg: "A", at: "poitrine_dom", off: [0, -5, 8], paume: "dedans", doigts: "haut" }, t: 450 }
    ]
  },

  {
    id: "accepter", mot: "Accepter", theme: "verbes", niveau: 3,
    syn: ["acceptation", "d'accord pour", "admettre"],
    desc: "Tes deux mains plates partent écartées devant toi et viennent se poser à plat sur ta poitrine.",
    astuce: "Tu prends quelque chose et tu le gardes contre toi.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    sym: true,
    images: [
      { d: { cfg: "plate", at: "neutre_dom", off: [30, 0, 25], paume: "dedans", doigts: "avant" } },
      { d: { cfg: "plate", at: "poitrine_dom", paume: "arriere", doigts: "dedans" }, t: 500, contact: true }
    ]
  },

  // ===================================================================
  // ADJECTIFS
  // ===================================================================

  {
    id: "grand", mot: "Grand", theme: "adjectifs", niveau: 1,
    syn: ["grande", "haut", "géant"],
    desc: "Main plate, paume vers le bas, sur le côté : monte-la plus haut que ta tête pour montrer la taille.",
    astuce: "Tu mesures quelqu'un de très grand.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/mainplate_revue8.pdf",
    images: [
      { d: { cfg: "plate", at: "cote_dom", paume: "bas", doigts: "avant" } },
      { d: { cfg: "plate", at: "cote_dom", off: [0, 70, 0], paume: "bas", doigts: "avant" }, t: 500 }
    ]
  },

  {
    id: "petit", mot: "Petit", theme: "adjectifs", niveau: 1,
    syn: ["petite", "court", "minuscule"],
    desc: "Main plate, paume vers le bas, sur le côté : descends-la bas pour montrer une petite taille.",
    astuce: "Pour un petit objet, on peut aussi rapprocher le pouce et l'index.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/mainplate_revue8.pdf",
    images: [
      { d: { cfg: "plate", at: "cote_dom", off: [0, 0, 60], paume: "bas", doigts: "avant" } },
      { d: { cfg: "plate", at: "cote_dom", off: [0, -60, 60], paume: "bas", doigts: "avant" }, t: 500 }
    ]
  },

  {
    id: "beau", mot: "Beau", theme: "adjectifs", niveau: 1,
    syn: ["belle", "joli", "jolie", "magnifique"],
    desc: "Main ouverte devant le bas de ton visage : descends-la en refermant les doigts en bec sous ton menton, avec le sourire.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "5", at: "menton", off: [0, 15, 18], paume: "arriere", doigts: "haut" }, visage: "sourire" },
      { d: { cfg: "bec", at: "menton", off: [0, -10, 18], paume: "arriere", doigts: "haut" }, t: 500 }
    ]
  },

  {
    id: "moche", mot: "Moche", theme: "adjectifs", niveau: 2,
    syn: ["laid", "laide", "pas beau", "affreux"],
    desc: "Main ouverte aux doigts pliés devant ton visage : fais un cercle autour de ton visage, avec une grimace.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "5_courbe", at: "nez", off: [20, 0, 20], paume: "arriere", doigts: "haut" }, visage: "degout" },
      { d: { cfg: "5_courbe", at: "nez", off: [0, 20, 20], paume: "arriere", doigts: "haut" }, t: 220 },
      { d: { cfg: "5_courbe", at: "nez", off: [-20, 0, 20], paume: "arriere", doigts: "haut" }, t: 220 },
      { d: { cfg: "5_courbe", at: "nez", off: [0, -20, 20], paume: "arriere", doigts: "haut" }, t: 220 },
      { d: { cfg: "5_courbe", at: "nez", off: [20, 0, 20], paume: "arriere", doigts: "haut" }, t: 220 }
    ]
  },

  {
    id: "super", mot: "Super", theme: "adjectifs", niveau: 1,
    syn: ["génial", "bien", "top", "trop bien", "cool", "bravo"],
    desc: "Poing fermé, pouce levé : pousse-le un peu vers l'avant avec un grand sourire.",
    astuce: "Le pouce en l'air, comme partout !",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "pouce", at: "neutre", off: [0, 0, -10], paume: "dedans", doigts: "avant" }, visage: "joie" },
      { d: { cfg: "pouce", at: "neutre", off: [0, 5, 10], paume: "dedans", doigts: "avant" }, t: 300, pause: 200 }
    ]
  },

  {
    id: "nul", mot: "Nul", theme: "adjectifs", niveau: 1,
    syn: ["mauvais", "pas bien", "nulle", "raté"],
    desc: "Poing fermé, petit doigt levé : pousse-le un peu vers l'avant et vers le bas, avec une grimace.",
    astuce: "Le contraire du pouce levé : le plus petit doigt pour ce qui est nul.",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/configmain_revue4.pdf",
    images: [
      { d: { cfg: "I", at: "neutre", off: [0, 0, -5], paume: "dedans", doigts: "haut" }, visage: "degout" },
      { d: { cfg: "I", at: "neutre", off: [0, -8, 12], paume: "dedans", doigts: "haut" }, t: 300, pause: 200 }
    ]
  },

  {
    id: "intelligent", mot: "Intelligent", theme: "adjectifs", niveau: 2,
    syn: ["intelligente", "malin", "doué", "intelligence"],
    desc: "Ton index, paume vers le bas, fait de petits cercles contre ton front.",
    astuce: "Ça tourne bien là-dedans !",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "index", at: "front_dom", off: [8, 0, 0], touch: "index", paume: "bas", doigts: "dedans" }, contact: true },
      { d: { cfg: "index", at: "front_dom", off: [0, 8, 0], touch: "index", paume: "bas", doigts: "dedans" }, t: 200 },
      { d: { cfg: "index", at: "front_dom", off: [-8, 0, 0], touch: "index", paume: "bas", doigts: "dedans" }, t: 200 },
      { d: { cfg: "index", at: "front_dom", off: [0, -8, 0], touch: "index", paume: "bas", doigts: "dedans" }, t: 200 },
      { d: { cfg: "index", at: "front_dom", off: [8, 0, 0], touch: "index", paume: "bas", doigts: "dedans" }, t: 200 }
    ]
  },

  {
    id: "vieux", mot: "Vieux", theme: "adjectifs", niveau: 2,
    syn: ["vieille", "âgé", "ancien"],
    desc: "Poing fermé contre ton menton, paume vers toi : descends-le un peu, comme si tu tenais une longue barbe.",
    astuce: "La barbe du vieux sage.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "poing", at: "menton", paume: "arriere", doigts: "dedans" }, contact: true },
      { d: { cfg: "poing", at: "menton", off: [0, -25, 5], paume: "arriere", doigts: "dedans" }, t: 500 }
    ]
  },

  {
    id: "jeune", mot: "Jeune", theme: "adjectifs", niveau: 2,
    syn: ["jeunesse", "ado", "adolescent"],
    desc: "Poing fermé, petit doigt tendu, paume vers le bas : frotte deux fois le haut de ta poitrine vers le haut.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    rep: 2,
    images: [
      { d: { cfg: "I", at: "poitrine_dom", off: [0, -10, 0], paume: "bas", doigts: "dedans" }, contact: true },
      { d: { cfg: "I", at: "poitrine_dom", off: [0, 15, 5], paume: "bas", doigts: "dedans" }, t: 250 }
    ]
  },

  {
    id: "mignon", mot: "Mignon", theme: "adjectifs", niveau: 3,
    syn: ["mignonne", "chou", "trop mignon"],
    desc: "Pouce et index qui se touchent, pose-les sur ta joue et tourne un peu la main, avec un sourire.",
    fiable: "probable", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    rep: 2,
    images: [
      { d: { cfg: "pince_fermee", at: "joue_dom", touch: "index", paume: "arriere", doigts: "haut" }, visage: "sourire", contact: true },
      { d: { cfg: "pince_fermee", at: "joue_dom", touch: "index", paume: "arriere-dehors", doigts: "haut" }, t: 200 }
    ]
  },

  {
    id: "chaud", mot: "Chaud", theme: "adjectifs", niveau: 1,
    syn: ["avoir chaud", "chaleur", "brûlant"],
    desc: "Main ouverte en forme de C devant ta bouche : passe-la de droite à gauche devant ton visage.",
    astuce: "Comme si tu éloignais la chaleur de ton visage.",
    fiable: "sur", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "C", at: "bouche", off: [20, 0, 18], paume: "arriere", doigts: "dedans" }, bouche: "ouverte" },
      { d: { cfg: "C", at: "bouche", off: [-25, 0, 18], paume: "arriere", doigts: "dedans" }, t: 450 }
    ]
  },

  {
    id: "froid", mot: "Froid", theme: "adjectifs", niveau: 1,
    syn: ["avoir froid", "gelé", "glacé"],
    desc: "Main fermée en bec devant ton nez : passe-la de droite à gauche devant ton visage, la bouche serrée.",
    fiable: "sur", source: "https://dumas.ccsd.cnrs.fr/dumas-00670448/document",
    images: [
      { d: { cfg: "bec", at: "nez", off: [20, 0, 18], paume: "arriere", doigts: "dedans" }, bouche: "serree" },
      { d: { cfg: "bec", at: "nez", off: [-25, 0, 18], paume: "arriere", doigts: "dedans" }, t: 450 }
    ]
  },

  {
    id: "propre", mot: "Propre", theme: "adjectifs", niveau: 2,
    syn: ["net", "nettoyé", "nettoyer"],
    desc: "Ta main plate glisse sur la paume de ton autre main, comme pour la nettoyer.",
    astuce: "Un coup d'éponge : c'est tout propre.",
    fiable: "incertain", source: "https://dico.elix-lsf.fr/dictionnaire/propre",
    images: [
      { d: { cfg: "plate", at: "nd:paume", off: [-20, 3, 0], paume: "bas", doigts: "avant" }, nd: { cfg: "plate", at: "neutre", paume: "haut", doigts: "dedans" }, contact: true },
      { d: { cfg: "plate", at: "nd:paume", off: [25, 3, 0], paume: "bas", doigts: "avant" }, t: 400 }
    ]
  },

  {
    id: "sale", mot: "Sale", theme: "adjectifs", niveau: 2,
    syn: ["saleté", "dégoûtant", "crade"],
    desc: "Main fermée en bec sous ton menton : avance-la en faisant une courbe et termine la main ouverte et à plat, avec une grimace.",
    fiable: "probable", source: "https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf",
    images: [
      { d: { cfg: "bec", at: "menton", off: [0, -15, 40], paume: "bas", doigts: "avant-dedans" }, visage: "degout" },
      { d: { cfg: "plate", at: "neutre", off: [0, -5, 20], paume: "bas", doigts: "avant" }, t: 500, arc: 15 }
    ]
  },

  {
    id: "fort", mot: "Fort", theme: "adjectifs", niveau: 2,
    syn: ["force", "costaud", "musclé", "solide"],
    desc: "Tes deux poings montent vers tes épaules, bras pliés, comme si tu montrais tes muscles.",
    astuce: "Montre tes biceps !",
    fiable: "probable", source: "https://www.acfos.org/wp-content/uploads/base_doc/lsf/poing_revue5.pdf",
    sym: true,
    images: [
      { d: { cfg: "poing", at: "neutre_dom", off: [10, -15, 0], paume: "arriere", doigts: "haut" }, bouche: "serree" },
      { d: { cfg: "poing", at: "epaule_dom", off: [15, 15, 15], paume: "arriere", doigts: "haut" }, t: 300, pause: 200 }
    ]
  }

]);
