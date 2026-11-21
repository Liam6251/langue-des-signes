// Signes LSF en plus : vie quotidienne (maison, école, nourriture, corps, santé, émotions, verbes, adjectifs).
// Format : voir notes/format-signes.md. Sources et doutes : notes/research/extra-quotidien.md
// Source principale : descriptions écrites de Pause LSF (https://www.pauselsf.fr/signs/<mot>), traduites en images-clés.
(function () {
  // Configurations sur mesure
  var L_CROCHET = { doigts: ["x", "p", "p", "p"], ecart: 0, pouce: "ecarte" };    // pouce tendu, index en petit crochet
  var CROCHET2 = { doigts: ["x", "x", "p", "p"], ecart: 0, pouce: "ecarte" };     // index et majeur en crochet, pouce tendu
  var P_CFG = { doigts: ["t", "t", "p", "p"], ecart: 0, pouce: "touche_majeur" };  // « P » : index et majeur tendus, pouce sur le majeur
  var MOUFLE = { doigts: ["t", "t", "t", "t"], ecart: 0, pouce: "ecarte" };       // main plate, pouce écarté

  var PS = "https://www.pauselsf.fr/signs/";

  LSF.ajouter([

    // ───────────────────────── VERBES ─────────────────────────

    {
      id: "rire", mot: "Rire", theme: "emotions", niveau: 1,
      syn: ["rigoler", "éclater de rire", "il rit"],
      desc: "Pouce tendu et index en petit crochet, paume vers toi, devant ta bouche : fais de petits mouvements de haut en bas, avec un grand sourire.",
      astuce: "Ta main suit les secousses de ton rire.",
      fiable: "sur", source: PS + "rire",
      rep: 3,
      images: [
        { d: { cfg: L_CROCHET, at: "bouche", off: [16, -6, 22], paume: "arriere", doigts: "haut" }, visage: "joie", bouche: "ouverte" },
        { d: { cfg: L_CROCHET, at: "bouche", off: [16, 8, 22], paume: "arriere", doigts: "haut" }, t: 200 }
      ]
    },
    {
      id: "acheter", mot: "Acheter", theme: "verbes", niveau: 1,
      syn: ["achat", "j'achète", "faire des courses"],
      desc: "Ta main gauche est ouverte, paume vers le haut. Ton poing droit, index en crochet, vient frapper deux fois sur cette paume.",
      astuce: "Tu tapes dans la main du vendeur pour conclure l'achat.",
      fiable: "sur", source: PS + "acheter",
      rep: 2,
      images: [
        { d: { cfg: "T", at: "nd:paume", off: [0, 28, 0], paume: "bas", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", paume: "haut", doigts: "avant" }, visage: "sourire" },
        { d: { cfg: "T", at: "nd:paume", off: [0, 3, 0], paume: "bas", doigts: "avant" }, t: 250, contact: true }
      ]
    },
    {
      id: "payer", mot: "Payer", theme: "verbes", niveau: 1,
      syn: ["paiement", "régler", "je paie"],
      desc: "Ta main gauche est ouverte, paume vers le haut. Ta main droite, poing avec le pouce tendu, glisse le pouce au centre de ta paume en s'éloignant de toi.",
      astuce: "Tu poses l'argent dans la main de l'autre.",
      fiable: "sur", source: PS + "payer",
      images: [
        { d: { cfg: "pouce", at: "nd:paume", touch: "pouce", off: [0, 0, -20], paume: "dedans", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", paume: "haut", doigts: "avant" }, contact: true },
        { d: { cfg: "pouce", at: "nd:paume", touch: "pouce", off: [0, 0, 25], paume: "dedans", doigts: "avant" }, t: 500 }
      ]
    },
    {
      id: "vendre", mot: "Vendre", theme: "verbes", niveau: 1,
      syn: ["vente", "vendeur", "je vends"],
      desc: "Tes deux mains ont les doigts tendus et serrés, pouces contre les doigts, paumes vers toi à hauteur d'épaules. Pousse-les d'un coup bref vers l'avant.",
      astuce: "Tu présentes ta marchandise vers le client.",
      fiable: "sur", source: PS + "vendre",
      sym: true,
      images: [
        { d: { cfg: "plate", at: "neutre_dom", off: [20, 25, -10], paume: "arriere", doigts: "haut" } },
        { d: { cfg: "plate", at: "neutre_dom", off: [20, 25, 35], paume: "arriere", doigts: "haut" }, t: 220 }
      ]
    },
    {
      id: "perdre", mot: "Perdre", theme: "verbes", niveau: 2,
      syn: ["perte", "égarer", "j'ai perdu"],
      desc: "Ta main gauche à plat, paume vers le bas, doigts vers le côté. Ta main droite, paume vers le haut, glisse sous elle en s'éloignant de toi.",
      astuce: "La chose te glisse entre les doigts.",
      fiable: "sur", source: PS + "perdre",
      images: [
        { d: { cfg: "plate", at: "nd:paume", off: [0, -6, -25], paume: "haut", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", off: [0, 10, 0], paume: "bas", doigts: "dehors" }, visage: "moue", contact: true },
        { d: { cfg: "plate", at: "nd:paume", off: [0, -6, 25], paume: "haut", doigts: "avant" }, t: 500 }
      ]
    },
    {
      id: "rencontrer", mot: "Rencontrer", theme: "verbes", niveau: 1,
      syn: ["rencontre", "faire connaissance", "se retrouver"],
      desc: "Tes deux index levés, paumes face à face, sont écartés l'un de l'autre. Avance-les l'un vers l'autre jusqu'à ce qu'ils se touchent.",
      astuce: "Deux personnes qui se croisent et se retrouvent.",
      fiable: "sur", source: PS + "rencontrer",
      sym: true,
      images: [
        { d: { cfg: "index", at: "neutre_dom", off: [40, 0, 0], paume: "dedans", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "index", at: "neutre_dom", off: [4, 0, 0], paume: "dedans", doigts: "haut" }, t: 450, contact: "deux" }
      ]
    },
    {
      id: "partir", mot: "Partir", theme: "verbes", niveau: 1,
      syn: ["départ", "je pars", "s'éloigner"],
      desc: "Pouce et index tendus (un L), paume vers l'avant, près de ton visage. Éloigne la main vers l'avant en rapprochant le pouce et l'index.",
      astuce: "Ta main s'en va et se referme sur le départ.",
      fiable: "sur", source: PS + "partir",
      images: [
        { d: { cfg: "L", at: "joue_dom", off: [14, 0, 25], paume: "avant", doigts: "haut" } },
        { d: { cfg: "pince_fermee", at: "neutre_dom", off: [10, 5, 65], paume: "avant", doigts: "haut" }, t: 550, arc: 8 }
      ]
    },
    {
      id: "arriver", mot: "Arriver", theme: "verbes", niveau: 1,
      syn: ["arrivée", "j'arrive", "parvenir"],
      desc: "Tes deux mains en V, paumes face à face, partent près de tes épaules. Elles descendent vers l'avant en s'éloignant de toi, les coudes se dépliant peu à peu.",
      astuce: "Deux jambes qui avancent jusqu'à destination.",
      fiable: "probable", source: PS + "arriver",
      sym: true,
      images: [
        { d: { cfg: "V", at: "neutre_dom", off: [20, 25, -10], paume: "dedans", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "V", at: "neutre_dom", off: [20, -5, 45], paume: "dedans", doigts: "avant" }, t: 600, arc: -8 }
      ]
    },
    {
      id: "quitter", mot: "Quitter", theme: "verbes", niveau: 2,
      syn: ["abandonner", "laisser", "je quitte"],
      desc: "Tes deux mains ouvertes, majeur plié, touchent ton menton de chaque côté avec le bout du majeur, doigts vers toi. Éloigne-les en tournant les doigts vers l'avant.",
      fiable: "probable", source: PS + "quitter",
      sym: true,
      images: [
        { d: { cfg: "5_majeur", at: "menton", touch: "majeur", off: [28, 0, 4], paume: "dedans", doigts: "arriere" }, contact: true },
        { d: { cfg: "5_majeur", at: "menton", off: [32, -5, 30], paume: "dedans", doigts: "avant" }, t: 450 }
      ]
    },
    {
      id: "obtenir", mot: "Obtenir", theme: "verbes", niveau: 2,
      syn: ["recevoir", "décrocher", "avoir obtenu"],
      desc: "Main plate devant ton torse, paume vers le bas, pouce vers toi. Fais un demi-tour de la main pour que la paume finisse vers le haut, pouce vers l'avant.",
      astuce: "Tu retournes la main pour recevoir.",
      fiable: "incertain", source: PS + "obtenir",
      images: [
        { d: { cfg: "plate", at: "neutre_dom", off: [5, -5, 15], paume: "bas", doigts: "dedans" } },
        { d: { cfg: "plate", at: "neutre_dom", off: [5, -5, 15], paume: "haut", doigts: "dedans" }, t: 500, arc: 12 }
      ]
    },
    {
      id: "vivre", mot: "Vivre", theme: "verbes", niveau: 2,
      syn: ["vie", "exister", "en vie"],
      desc: "Tes deux mains en V, paumes vers toi, partent du bas du ventre et remontent le long du corps jusqu'aux épaules.",
      astuce: "La vie qui monte en toi.",
      fiable: "probable", source: PS + "vivre",
      sym: true,
      images: [
        { d: { cfg: "V", at: "ventre_dom", off: [0, -10, 20], paume: "arriere", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "V", at: "epaule_dom", off: [-10, -25, 20], paume: "arriere", doigts: "haut" }, t: 700 }
      ]
    },
    {
      id: "avoir", mot: "Avoir", theme: "verbes", niveau: 1,
      syn: ["posséder", "j'ai", "tu as"],
      desc: "Main ouverte, paume vers le bas, pouce vers toi : touche plusieurs fois le milieu de ta poitrine avec le pouce.",
      astuce: "Tu poses la main sur toi : c'est à moi, je l'ai.",
      fiable: "sur", source: PS + "avoir",
      rep: 2,
      images: [
        { d: { cfg: "5", at: "poitrine", off: [0, 0, 22], paume: "bas", doigts: "dedans" } },
        { d: { cfg: "5", at: "poitrine", touch: "pouce", paume: "bas", doigts: "dedans" }, t: 200, contact: true }
      ]
    },
    {
      id: "supplier", mot: "Supplier", theme: "verbes", niveau: 3,
      syn: ["prier", "implorer", "je t'en supplie"],
      desc: "Tes deux mains plates, paumes face à face, restent en place devant toi. Seuls les bouts des doigts se touchent puis se séparent un peu, plusieurs fois, avec un visage suppliant.",
      astuce: "Comme les mains jointes de quelqu'un qui prie.",
      fiable: "probable", source: PS + "supplier",
      sym: true, rep: 3,
      images: [
        { d: { cfg: "B", at: "neutre_dom", off: [14, 0, 0], paume: "dedans", doigts: "avant-haut" }, visage: "triste" },
        { d: { cfg: "B", at: "neutre_dom", off: [2, 0, 0], paume: "dedans", doigts: "avant-haut" }, t: 200, contact: "deux" }
      ]
    },
    {
      id: "stop", mot: "Stop", theme: "verbes", niveau: 1,
      syn: ["arrêter", "arrêt", "halte"],
      desc: "Tes deux mains, doigts serrés et pliés à angle droit à la base, paumes vers toi, descendent d'un coup net devant toi.",
      astuce: "Un geste ferme pour tout arrêter.",
      fiable: "sur", source: PS + "stop",
      sym: true,
      images: [
        { d: { cfg: "plate_pliee", at: "neutre_dom", off: [18, 25, 0], paume: "arriere", doigts: "haut" }, visage: "concentre" },
        { d: { cfg: "plate_pliee", at: "neutre_dom", off: [18, -10, 0], paume: "arriere", doigts: "haut" }, t: 200, pause: 300 }
      ]
    },

    // ───────────────────────── ÉMOTIONS ─────────────────────────

    {
      id: "nerveux", mot: "Nerveux", theme: "emotions", niveau: 2,
      syn: ["stressé", "tendu", "anxieux", "crispé"],
      desc: "Tes deux poings fermés, bras pliés tout près du corps, font de petits mouvements de gauche à droite en serrant ton corps, comme si tu te crispais.",
      astuce: "Tout ton corps est crispé.",
      fiable: "sur", source: PS + "nerveux",
      sym: true, rep: 3,
      images: [
        { d: { cfg: "poing", at: "poitrine_dom", off: [6, -15, 20], paume: "arriere", doigts: "dedans" }, visage: "concentre", bouche: "serree" },
        { d: { cfg: "poing", at: "poitrine_dom", off: [20, -15, 20], paume: "arriere", doigts: "dedans" }, t: 120 }
      ]
    },

    // ───────────────────────── ADJECTIFS ─────────────────────────

    {
      id: "paresseux", mot: "Paresseux", theme: "adjectifs", niveau: 2,
      syn: ["flemmard", "paresse", "fainéant"],
      desc: "Ta main gauche à plat, paume sur le côté. Ta main droite fait un rond avec le pouce et l'index, les autres doigts écartés : touche ta paume, puis éloigne les deux mains en soufflant, les joues gonflées.",
      fiable: "probable", source: PS + "paresseux",
      images: [
        { d: { cfg: "F", at: "nd:paume", off: [20, 0, 0], paume: "dedans", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", paume: "dedans", doigts: "avant" }, visage: "moue" },
        { d: { cfg: "F", at: "nd:paume", off: [2, 0, 0], paume: "dedans", doigts: "avant" }, t: 350, contact: true },
        { d: { cfg: "F", at: "nd:paume", off: [40, 0, 5], paume: "dedans", doigts: "avant" }, t: 400, bouche: "souffle" }
      ]
    },
    {
      id: "occupe", mot: "Occupé", theme: "adjectifs", niveau: 2,
      syn: ["occupée", "très pris", "pas disponible"],
      desc: "Tes deux mains ouvertes, doigts écartés, avancent ensemble devant toi et, en avançant, tous les doigts se referment en poings.",
      astuce: "Tes mains sont pleines : plus de place pour autre chose.",
      fiable: "sur", source: PS + "occupe",
      sym: true,
      images: [
        { d: { cfg: "5", at: "neutre_dom", off: [20, 0, 10], paume: "bas", doigts: "avant" }, visage: "concentre" },
        { d: { cfg: "poing", at: "neutre_dom", off: [20, 0, 40], paume: "bas", doigts: "avant" }, t: 450 }
      ]
    },
    {
      id: "lent", mot: "Lent", theme: "adjectifs", niveau: 1,
      syn: ["lentement", "doucement", "tout doucement"],
      desc: "Tes deux mains ouvertes, doigts écartés, paumes vers le bas, font de lents cercles devant toi. Plisse les yeux et gonfle les joues.",
      astuce: "Les mains dessinent le temps qui s'étire.",
      fiable: "sur", source: PS + "lent",
      sym: true,
      images: [
        { d: { cfg: "5", at: "neutre_dom", off: [25, 0, 10], paume: "bas", doigts: "avant" }, visage: "concentre", bouche: "souffle" },
        { d: { cfg: "5", at: "neutre_dom", off: [32, 0, 0], paume: "bas", doigts: "avant" }, t: 450 },
        { d: { cfg: "5", at: "neutre_dom", off: [25, 0, -10], paume: "bas", doigts: "avant" }, t: 450 },
        { d: { cfg: "5", at: "neutre_dom", off: [18, 0, 0], paume: "bas", doigts: "avant" }, t: 450 },
        { d: { cfg: "5", at: "neutre_dom", off: [25, 0, 10], paume: "bas", doigts: "avant" }, t: 450 }
      ]
    },
    {
      id: "rapide", mot: "Rapide", theme: "adjectifs", niveau: 1,
      syn: ["vite", "rapidement", "vitesse"],
      desc: "Main aux doigts serrés, pliés à angle droit à la base, pouce contre l'index, paume vers le bas. Passe-la très vite le long de ton menton, d'un côté à l'autre.",
      astuce: "Un geste vif, comme la chose dont on parle.",
      fiable: "sur", source: PS + "rapide",
      images: [
        { d: { cfg: "plate_pliee", at: "menton", off: [30, -8, 22], paume: "bas", doigts: "dedans" }, visage: "concentre" },
        { d: { cfg: "plate_pliee", at: "menton", off: [-28, -8, 22], paume: "bas", doigts: "dedans" }, t: 180 }
      ]
    },
    {
      id: "long", mot: "Long", theme: "adjectifs", niveau: 1,
      syn: ["longue", "longueur", "interminable"],
      desc: "Main en Y (pouce et auriculaire tendus), pouce posé sur ton épaule, bras plié. Déplie le bras vers l'avant, les yeux plissés.",
      astuce: "Tu mesures la longueur de ton bras.",
      fiable: "probable", source: PS + "long",
      images: [
        { d: { cfg: "Y", at: "epaule_dom", touch: "pouce", paume: "dedans", doigts: "avant" }, visage: "concentre", contact: true },
        { d: { cfg: "Y", at: "neutre_dom", off: [15, 10, 60], paume: "dedans", doigts: "avant" }, t: 700 }
      ]
    },
    {
      id: "mince", mot: "Mince", theme: "adjectifs", niveau: 1,
      syn: ["fin", "maigre", "svelte"],
      desc: "Petit doigt tendu, les autres doigts fermés, paume vers toi : descends la main devant toi, les yeux plissés et les joues rentrées.",
      astuce: "Le petit doigt est tout fin.",
      fiable: "sur", source: PS + "mince",
      images: [
        { d: { cfg: "I", at: "neutre", off: [0, 25, 0], paume: "arriere", doigts: "haut" }, visage: "concentre", bouche: "serree" },
        { d: { cfg: "I", at: "neutre", off: [0, -30, 0], paume: "arriere", doigts: "haut" }, t: 600 }
      ]
    },
    {
      id: "sec", mot: "Sec", theme: "adjectifs", niveau: 2,
      syn: ["sèche", "aride", "séché"],
      desc: "Poing fermé, paume vers toi. Tourne la main vers l'avant en l'ouvrant en forme de C.",
      fiable: "probable", source: PS + "sec",
      images: [
        { d: { cfg: "poing", at: "neutre_dom", off: [10, 0, 10], paume: "arriere", doigts: "dedans" } },
        { d: { cfg: "C", at: "neutre_dom", off: [14, 0, 18], paume: "avant", doigts: "dedans" }, t: 400 }
      ]
    },
    {
      id: "cher", mot: "Cher", theme: "adjectifs", niveau: 1,
      syn: ["coûteux", "coûte cher", "prix élevé"],
      desc: "Ta main gauche est à plat, paume vers le haut. Ton poing droit, index en crochet, repose dessus. Lève-le vers le haut et sur le côté en ouvrant les doigts.",
      astuce: "Le prix s'envole.",
      fiable: "sur", source: PS + "cher",
      images: [
        { d: { cfg: "T", at: "nd:paume", off: [0, 3, 0], paume: "bas", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", paume: "haut", doigts: "avant" }, contact: true },
        { d: { cfg: "5", at: "nd:paume", off: [30, 50, 0], paume: "bas", doigts: "avant" }, t: 450, arc: 10, visage: "surpris" }
      ]
    },
    {
      id: "tordu", mot: "Tordu", theme: "adjectifs", niveau: 3,
      syn: ["bizarre", "tordue", "de travers"],
      desc: "Ton poing droit, bras plié, est soutenu au coude par ta main gauche ouverte. Bascule le poing vers le bas en haussant un peu les épaules.",
      fiable: "incertain", source: PS + "tordu",
      images: [
        { d: { cfg: "poing", at: "neutre_dom", off: [10, 5, 10], paume: "dedans", doigts: "haut" },
          nd: { cfg: "plate", at: "neutre_bas", paume: "haut", doigts: "avant" } },
        { d: { cfg: "poing", at: "neutre_dom", off: [10, 5, 10], paume: "dedans", doigts: "avant-bas" }, t: 400, visage: "degout" }
      ]
    },
    {
      id: "charmant", mot: "Charmant", theme: "adjectifs", niveau: 2,
      syn: ["charmante", "adorable", "attirant"],
      desc: "Tes deux mains ouvertes, paumes vers le haut, doigts tendus, viennent vers ton corps en arrondissant peu à peu les doigts, avec le sourire.",
      astuce: "Tu attires quelqu'un vers toi.",
      fiable: "probable", source: PS + "charmant",
      sym: true,
      images: [
        { d: { cfg: "plate", at: "neutre_dom", off: [18, -5, 35], paume: "haut", doigts: "avant" }, visage: "sourire" },
        { d: { cfg: "5_courbe", at: "neutre_dom", off: [12, -8, -5], paume: "haut", doigts: "avant" }, t: 550 }
      ]
    },
    {
      id: "peu", mot: "Peu", theme: "adjectifs", niveau: 1,
      syn: ["un peu", "petit peu", "pas beaucoup"],
      desc: "Pouce et index tendus et parallèles : rapproche-les lentement sans les faire se toucher, les yeux un peu plissés.",
      astuce: "Juste un tout petit espace entre tes doigts.",
      fiable: "sur", source: PS + "peu",
      images: [
        { d: { cfg: "L", at: "neutre_dom", off: [15, 10, 15], paume: "dedans", doigts: "avant" }, visage: "concentre" },
        { d: { cfg: "pince", at: "neutre_dom", off: [15, 10, 15], paume: "dedans", doigts: "avant" }, t: 600 }
      ]
    },
    {
      id: "plus", mot: "Plus", theme: "adjectifs", niveau: 2,
      syn: ["davantage", "encore plus", "en plus"],
      desc: "Index et majeur tendus, pouce posé sur eux, doigts vers le bas. Relève le poignet pour que les doigts pointent vers le haut, en montant un peu la main.",
      astuce: "Ça monte : il y en a plus.",
      fiable: "probable", source: PS + "plus",
      images: [
        { d: { cfg: P_CFG, at: "neutre_dom", off: [12, -5, 15], paume: "arriere", doigts: "bas" } },
        { d: { cfg: P_CFG, at: "neutre_dom", off: [12, 12, 18], paume: "arriere", doigts: "haut" }, t: 450, arc: 8 }
      ]
    },
    {
      id: "moins", mot: "Moins", theme: "adjectifs", niveau: 2,
      syn: ["moindre", "en moins"],
      desc: "Ta main gauche est à plat, doigts vers le haut, paume sur le côté. Fais glisser le bord de ta main droite à plat le long de ta main gauche, de haut en bas.",
      astuce: "Ça descend : il y en a moins.",
      fiable: "probable", source: PS + "moins",
      images: [
        { d: { cfg: "plate", at: "nd:paume", touch: "tranche", off: [12, 22, 5], paume: "bas", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", paume: "dedans", doigts: "haut" }, visage: "concentre", contact: true },
        { d: { cfg: "plate", at: "nd:paume", touch: "tranche", off: [12, -22, 5], paume: "bas", doigts: "avant" }, t: 450 }
      ]
    },
    {
      id: "parfois", mot: "Parfois", theme: "adjectifs", niveau: 2,
      syn: ["de temps en temps", "quelquefois", "par moments"],
      desc: "Tes deux index tendus devant toi s'abaissent et se relèvent à tour de rôle, tandis que tes mains s'écartent un peu l'une de l'autre.",
      fiable: "sur", source: PS + "parfois",
      rep: 3,
      images: [
        { d: { cfg: "index", at: "neutre_dom", off: [15, 8, 0], paume: "bas", doigts: "avant" },
          nd: { cfg: "index", at: "neutre_non", off: [15, -8, 0], paume: "bas", doigts: "avant" } },
        { d: { cfg: "index", at: "neutre_dom", off: [22, -8, 0], paume: "bas", doigts: "avant" },
          nd: { cfg: "index", at: "neutre_non", off: [22, 8, 0], paume: "bas", doigts: "avant" }, t: 250 }
      ]
    },
    {
      id: "pareil", mot: "Pareil", theme: "adjectifs", niveau: 1,
      syn: ["identique", "même", "égal", "semblable"],
      desc: "Tes deux index pointés vers l'avant, paumes vers le bas. Cogne-les l'un contre l'autre plusieurs fois, côte à côte.",
      astuce: "Deux doigts bien alignés : c'est pareil.",
      fiable: "sur", source: PS + "pareil",
      sym: true, rep: 3,
      images: [
        { d: { cfg: "index", at: "neutre_dom", off: [14, 0, 0], paume: "bas", doigts: "avant" } },
        { d: { cfg: "index", at: "neutre_dom", off: [3, 0, 0], paume: "bas", doigts: "avant" }, t: 200, contact: "deux" }
      ]
    },
    {
      id: "lisse", mot: "Lisse", theme: "adjectifs", niveau: 3,
      syn: ["doux", "soyeux", "sans plis"],
      desc: "Tes deux mains aux doigts tendus et serrés, doigts vers toi, partent des oreilles et glissent vers le bas le long de la tête et du cou, tandis que les pouces viennent se coller aux doigts.",
      fiable: "incertain", source: PS + "lisse",
      sym: true,
      images: [
        { d: { cfg: MOUFLE, at: "oreille_dom", off: [22, -5, 10], paume: "dedans", doigts: "arriere" } },
        { d: { cfg: "plate", at: "cou", off: [22, -15, 15], paume: "dedans", doigts: "arriere" }, t: 600 }
      ]
    },
    {
      id: "libre", mot: "Libre", theme: "adjectifs", niveau: 2,
      syn: ["liberté", "disponible", "pas occupé"],
      desc: "Tes deux mains en L, pouces posés sur le haut de ta poitrine, index vers l'avant. Écarte-les sur les côtés, paumes vers l'avant, les index se redressant vers le haut.",
      astuce: "Tu t'ouvres et tu respires : tu es libre.",
      fiable: "probable", source: PS + "libre",
      sym: true,
      images: [
        { d: { cfg: "L", at: "poitrine_dom", touch: "pouce", off: [12, 10, 8], paume: "dedans", doigts: "avant" }, contact: true },
        { d: { cfg: "L", at: "poitrine_dom", off: [45, 8, 18], paume: "avant", doigts: "haut" }, t: 500, visage: "joie" }
      ]
    },

    // ───────────────────────── MAISON ─────────────────────────

    {
      id: "lit", mot: "Lit", theme: "maison", niveau: 1,
      syn: ["couchette", "se coucher", "matelas"],
      desc: "Tes deux mains ont l'index et le petit doigt levés, les deux autres doigts sur le pouce, paumes face à face. Rapproche-les pour que les pouces et les doigts du milieu se touchent : cela fait une surface plate.",
      astuce: "Tes mains dessinent la surface plate du matelas.",
      fiable: "probable", source: PS + "lit",
      sym: true,
      images: [
        { d: { cfg: "corne", at: "neutre_dom", off: [16, -5, 0], paume: "dedans", doigts: "avant" } },
        { d: { cfg: "corne", at: "neutre_dom", off: [3, -5, 0], paume: "dedans", doigts: "avant" }, t: 400, contact: "deux" }
      ]
    },
    {
      id: "chaise", mot: "Chaise", theme: "maison", niveau: 1,
      syn: ["siège", "s'asseoir", "tabouret"],
      desc: "Tes deux mains en Y (pouce et petit doigt tendus), paumes face à face, pouces vers le haut. Fais pivoter les poignets pour que les petits doigts, d'abord vers le bas, se tournent vers l'extérieur.",
      fiable: "probable", source: PS + "chaise",
      sym: true,
      images: [
        { d: { cfg: "Y", at: "neutre_dom", off: [14, 0, 0], paume: "dedans", doigts: "avant" } },
        { d: { cfg: "Y", at: "neutre_dom", off: [14, 0, 0], paume: "bas", doigts: "avant" }, t: 450 }
      ]
    },
    {
      id: "armoire", mot: "Armoire", theme: "maison", niveau: 2,
      syn: ["placard", "meuble", "commode"],
      desc: "Tes deux poings fermés se touchent devant toi. Écarte-les vers les côtés, puis ramène-les vers l'avant pour qu'ils se rejoignent à nouveau, comme les portes d'une armoire.",
      astuce: "Tes poings sont les deux portes qui s'ouvrent et se ferment.",
      fiable: "probable", source: PS + "armoire",
      sym: true,
      images: [
        { d: { cfg: "poing", at: "neutre_dom", off: [4, 0, 15], paume: "dedans", doigts: "avant" }, contact: "deux" },
        { d: { cfg: "poing", at: "neutre_dom", off: [28, 0, -5], paume: "dedans", doigts: "avant" }, t: 350 },
        { d: { cfg: "poing", at: "neutre_dom", off: [4, 0, 30], paume: "dedans", doigts: "avant" }, t: 400, contact: "deux" }
      ]
    },
    {
      id: "bol", mot: "Bol", theme: "maison", niveau: 2,
      syn: ["saladier", "récipient", "jatte"],
      desc: "Tes deux mains ouvertes, paumes vers le haut, se touchent par les petits doigts devant toi. Écarte-les vers l'extérieur et le haut en dessinant un demi-cercle.",
      astuce: "Tes mains forment le creux d'un bol.",
      fiable: "probable", source: PS + "bol",
      sym: true,
      images: [
        { d: { cfg: "plate", at: "neutre_dom", off: [3, -10, 10], paume: "haut", doigts: "avant" }, contact: "deux" },
        { d: { cfg: "plate", at: "neutre_dom", off: [30, 12, 10], paume: "haut-dehors", doigts: "avant" }, t: 600, arc: 12 }
      ]
    },
    {
      id: "salon", mot: "Salon", theme: "maison", niveau: 2,
      syn: ["séjour", "salle de séjour", "living"],
      desc: "Poing fermé près du coin de ta bouche. Avance la main vers l'avant et un peu vers l'extérieur en l'ouvrant en forme de C.",
      fiable: "probable", source: PS + "salon",
      images: [
        { d: { cfg: "poing", at: "bouche", off: [22, 0, 5], paume: "dedans", doigts: "avant" } },
        { d: { cfg: "C", at: "neutre_dom", off: [30, 5, 45], paume: "dedans", doigts: "avant" }, t: 550, arc: 8 }
      ]
    },

    // ───────────────────────── OBJETS ─────────────────────────

    {
      id: "valise", mot: "Valise", theme: "objets", niveau: 1,
      syn: ["bagage", "bagages", "sac de voyage"],
      desc: "Poing fermé, paume vers le bas, bras plié : fais de petits mouvements de haut en bas, comme si tu tenais la poignée d'une valise.",
      astuce: "Tu portes ta valise.",
      fiable: "sur", source: PS + "valise",
      rep: 3,
      images: [
        { d: { cfg: "poing", at: "neutre_dom", off: [12, -18, 10], paume: "bas", doigts: "avant" } },
        { d: { cfg: "poing", at: "neutre_dom", off: [12, -8, 10], paume: "bas", doigts: "avant" }, t: 200 }
      ]
    },
    {
      id: "tasse", mot: "Tasse", theme: "objets", niveau: 1,
      syn: ["mug", "gobelet", "boire dans une tasse"],
      desc: "Ta main gauche est en B (main plate, pouce replié dans la paume), paume vers le haut. Ta main droite fait un rond avec le pouce et l'index, les autres doigts écartés, et va plusieurs fois vers le coin de ta bouche, comme pour boire.",
      astuce: "Tu tiens l'anse de la tasse entre tes doigts.",
      fiable: "sur", source: PS + "tasse",
      rep: 2,
      images: [
        { d: { cfg: "F", at: "nd:paume", off: [0, 12, 0], paume: "dedans", doigts: "haut" },
          nd: { cfg: "B", at: "neutre_non", off: [0, -5, 0], paume: "haut", doigts: "avant" } },
        { d: { cfg: "F", at: "bouche", off: [15, -3, 15], paume: "arriere", doigts: "haut" }, t: 450, arc: 10, bouche: "ouverte" }
      ]
    },
    {
      id: "marteau", mot: "Marteau", theme: "objets", niveau: 1,
      syn: ["marteler", "maillet", "frapper un clou"],
      desc: "Poing fermé, index courbé par-dessus le pouce, tourné vers l'avant : frappe plusieurs fois vers le bas, d'un coup sec, les joues gonflées.",
      astuce: "Tu tapes sur un clou.",
      fiable: "sur", source: PS + "marteau",
      rep: 3,
      images: [
        { d: { cfg: "T", at: "neutre_dom", off: [12, 25, 10], paume: "dedans", doigts: "avant" }, visage: "concentre", bouche: "souffle" },
        { d: { cfg: "T", at: "neutre_dom", off: [12, 3, 10], paume: "dedans", doigts: "avant" }, t: 160 }
      ]
    },
    {
      id: "cheque", mot: "Chèque", theme: "objets", niveau: 2,
      syn: ["chéquier", "payer par chèque"],
      desc: "Tes deux mains, pouce et index tendus un peu arrondis, paumes vers le bas : les pouces et les index se touchent, puis écarte les mains sur les côtés.",
      astuce: "Tu traces la ligne d'un chèque.",
      fiable: "sur", source: PS + "cheque",
      sym: true,
      images: [
        { d: { cfg: "pince_fermee", at: "neutre_dom", off: [3, 0, 0], paume: "bas", doigts: "avant" }, contact: "deux" },
        { d: { cfg: "pince", at: "neutre_dom", off: [32, 0, 0], paume: "bas", doigts: "avant" }, t: 450 }
      ]
    },

    // ───────────────────────── ÉCOLE ─────────────────────────

    {
      id: "papier", mot: "Papier", theme: "ecole", niveau: 1,
      syn: ["feuille", "page", "feuille de papier"],
      desc: "Tes deux poings fermés : le gauche en dessous, paume vers le haut ; le droit au-dessus, paume vers le bas. Fais glisser plusieurs fois le poing droit sur le gauche.",
      astuce: "Comme si tu frottais une feuille entre tes doigts.",
      fiable: "sur", source: PS + "papier",
      rep: 3,
      images: [
        { d: { cfg: "poing", at: "nd:paume", off: [-15, 8, 0], paume: "bas", doigts: "avant" },
          nd: { cfg: "poing", at: "neutre", paume: "haut", doigts: "avant" }, contact: true },
        { d: { cfg: "poing", at: "nd:paume", off: [15, 8, 0], paume: "bas", doigts: "avant" }, t: 300 }
      ]
    },
    {
      id: "note", mot: "Note", theme: "ecole", niveau: 2,
      syn: ["notes", "bulletin", "résultat"],
      desc: "Ta main gauche est ouverte, doigts vers le haut, paume sur le côté. Frappe cette paume avec ton poing droit, pouce replié contre l'index.",
      fiable: "sur", source: PS + "note",
      rep: 2,
      images: [
        { d: { cfg: "A", at: "nd:paume", off: [28, 0, 0], paume: "dedans", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", paume: "dedans", doigts: "haut" } },
        { d: { cfg: "A", at: "nd:paume", off: [3, 0, 0], paume: "dedans", doigts: "avant" }, t: 200, contact: true }
      ]
    },

    // ───────────────────────── NOURRITURE ─────────────────────────

    {
      id: "oeufs", mot: "Œufs", theme: "nourriture", niveau: 2,
      syn: ["oeuf", "œuf"],
      desc: "Tes deux mains en V (index et majeur écartés). La main gauche est devant toi, paume vers toi ; ta main droite, paume vers l'avant, part de l'extérieur en arc et glisse ses doigts entre ceux de la gauche.",
      fiable: "probable", source: PS + "oeufs",
      images: [
        { d: { cfg: "V", at: "nd:paume", off: [30, 0, 12], paume: "avant", doigts: "haut" },
          nd: { cfg: "V", at: "neutre_non", paume: "arriere", doigts: "haut" } },
        { d: { cfg: "V", at: "nd:paume", off: [6, 0, 12], paume: "avant", doigts: "haut" }, t: 450, arc: 12, contact: true }
      ]
    },
    {
      id: "tomate", mot: "Tomate", theme: "nourriture", niveau: 2,
      syn: ["tomates"],
      desc: "Ta main gauche est à plat, doigts vers le haut, paume sur le côté. Ta main droite, doigts écartés et recourbés, vient toucher cette paume.",
      fiable: "sur", source: PS + "tomate",
      images: [
        { d: { cfg: "5_courbe", at: "nd:paume", off: [35, 0, 0], paume: "dedans", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre_non", paume: "dedans", doigts: "haut" } },
        { d: { cfg: "5_courbe", at: "nd:paume", off: [3, 0, 0], paume: "dedans", doigts: "avant" }, t: 400, contact: true }
      ]
    },
    {
      id: "salade", mot: "Salade", theme: "nourriture", niveau: 1,
      syn: ["laitue", "salade verte"],
      desc: "Tes deux mains en V, paumes vers le haut, font un mouvement circulaire devant toi : elles se rapprochent puis s'écartent, comme pour remuer la salade.",
      astuce: "Tu mélanges la salade avec les couverts.",
      fiable: "sur", source: PS + "salade",
      sym: true, rep: 2,
      images: [
        { d: { cfg: "V", at: "neutre_dom", off: [26, -5, 10], paume: "haut", doigts: "avant" } },
        { d: { cfg: "V", at: "neutre_dom", off: [12, -5, 25], paume: "haut", doigts: "avant" }, t: 250 },
        { d: { cfg: "V", at: "neutre_dom", off: [26, -5, 40], paume: "haut", doigts: "avant" }, t: 250 },
        { d: { cfg: "V", at: "neutre_dom", off: [40, -5, 25], paume: "haut", doigts: "avant" }, t: 250 },
        { d: { cfg: "V", at: "neutre_dom", off: [26, -5, 10], paume: "haut", doigts: "avant" }, t: 250 }
      ]
    },
    {
      id: "miel", mot: "Miel", theme: "nourriture", niveau: 2,
      desc: "Ta main gauche, doigts serrés vers le haut, paume vers l'avant. Ta main droite plate, doigts vers le bas, glisse du bas de ta paume vers le haut comme une petite spatule, puis s'éloigne en redressant les doigts.",
      astuce: "Tu étales du miel avec une spatule.",
      fiable: "probable", source: PS + "miel",
      images: [
        { d: { cfg: "plate", at: "nd:paume", off: [0, -25, 10], paume: "arriere", doigts: "bas" },
          nd: { cfg: "plate", at: "neutre_non", paume: "avant", doigts: "haut" }, contact: true },
        { d: { cfg: "plate", at: "nd:paume", off: [0, 12, 10], paume: "arriere", doigts: "bas" }, t: 450 },
        { d: { cfg: "plate", at: "nd:paume", off: [28, 28, 10], paume: "arriere", doigts: "haut" }, t: 400 }
      ]
    },
    {
      id: "bonbon", mot: "Bonbon", theme: "nourriture", niveau: 1,
      syn: ["bonbons", "sucrerie", "confiserie"],
      desc: "Ton index tendu touche plusieurs fois tes lèvres.",
      astuce: "Tu portes un bonbon à tes lèvres.",
      fiable: "sur", source: PS + "bonbon",
      rep: 3,
      images: [
        { d: { cfg: "index", at: "bouche", off: [0, -3, 16], paume: "arriere", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "index", at: "bouche", touch: "index", off: [0, -3, 0], paume: "arriere", doigts: "haut" }, t: 180, contact: true }
      ]
    },
    {
      id: "tarte", mot: "Tarte", theme: "nourriture", niveau: 2,
      syn: ["tartes", "pâtisserie", "tarte aux pommes"],
      desc: "Tes deux mains en L un peu courbé, paumes face à face, doigts vers le haut. Fais tourner les poignets pour que les paumes regardent vers le bas.",
      astuce: "Tu dessines le plat rond de la tarte.",
      fiable: "probable", source: PS + "tarte",
      sym: true,
      images: [
        { d: { cfg: "L", at: "neutre_dom", off: [18, 0, 0], paume: "dedans", doigts: "haut" } },
        { d: { cfg: "L", at: "neutre_dom", off: [18, 0, 0], paume: "bas", doigts: "avant" }, t: 400 }
      ]
    },
    {
      id: "oignon", mot: "Oignon", theme: "nourriture", niveau: 2,
      syn: ["oignons"],
      desc: "Pouce, index et majeur tendus : pose le pouce sur le côté de ton nez, doigts vers l'avant. Plie puis redresse plusieurs fois l'index et le majeur en crochet.",
      astuce: "Ça pique le nez quand on coupe un oignon.",
      fiable: "sur", source: PS + "oignon",
      rep: 3,
      images: [
        { d: { cfg: "3", at: "nez", touch: "pouce", off: [10, 0, 25], paume: "dedans", doigts: "avant-dedans" }, contact: true },
        { d: { cfg: CROCHET2, at: "nez", touch: "pouce", off: [10, 0, 25], paume: "dedans", doigts: "avant-dedans" }, t: 200 }
      ]
    },
    {
      id: "raisins", mot: "Raisins", theme: "nourriture", niveau: 2,
      syn: ["raisin", "grappe"],
      desc: "Tes deux mains font un rond avec le pouce et l'index, les autres doigts tendus. Ta main droite, au-dessus de la gauche, touche les ronds du bout des doigts, puis va plusieurs fois vers ta bouche.",
      astuce: "Tu cueilles les grains un par un.",
      fiable: "probable", source: PS + "raisins",
      rep: 2,
      images: [
        { d: { cfg: "F", at: "nd:index", off: [0, 14, 0], paume: "dedans", doigts: "avant" },
          nd: { cfg: "F", at: "neutre_non", paume: "dedans", doigts: "avant" }, contact: true },
        { d: { cfg: "F", at: "bouche", off: [14, -4, 20], paume: "dedans", doigts: "avant" }, t: 400, bouche: "ouverte" }
      ]
    },
    {
      id: "limonade", mot: "Limonade", theme: "boissons", niveau: 2,
      syn: ["soda", "boisson gazeuse", "bulles"],
      desc: "Tes deux mains font un rond avec le pouce et l'index, les trois autres doigts tendus. Monte-les de bas en haut à tour de rôle, en tournant légèrement le poignet.",
      astuce: "Ce sont les bulles qui montent.",
      fiable: "sur", source: PS + "limonade",
      rep: 3,
      images: [
        { d: { cfg: "F", at: "neutre_dom", off: [15, -10, 5], paume: "arriere", doigts: "haut" },
          nd: { cfg: "F", at: "neutre_non", off: [15, 10, 5], paume: "arriere", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "F", at: "neutre_dom", off: [15, 10, 5], paume: "arriere", doigts: "haut" },
          nd: { cfg: "F", at: "neutre_non", off: [15, -10, 5], paume: "arriere", doigts: "haut" }, t: 300 }
      ]
    },

    // ───────────────────────── CORPS ─────────────────────────

    {
      id: "bouche", mot: "Bouche", theme: "corps", niveau: 1,
      syn: ["lèvres", "lèvre"],
      desc: "Ton index tendu dessine le contour de tes lèvres, en faisant un cercle devant ta bouche.",
      fiable: "sur", source: PS + "bouche",
      images: [
        { d: { cfg: "index", at: "bouche", off: [12, 0, 12], paume: "arriere", doigts: "haut" }, visage: "neutre" },
        { d: { cfg: "index", at: "bouche", off: [0, 8, 12], paume: "arriere", doigts: "haut" }, t: 200 },
        { d: { cfg: "index", at: "bouche", off: [-12, 0, 12], paume: "arriere", doigts: "haut" }, t: 200 },
        { d: { cfg: "index", at: "bouche", off: [0, -8, 12], paume: "arriere", doigts: "haut" }, t: 200 },
        { d: { cfg: "index", at: "bouche", off: [12, 0, 12], paume: "arriere", doigts: "haut" }, t: 200 }
      ]
    },
    {
      id: "visage", mot: "Visage", theme: "corps", niveau: 1,
      syn: ["figure", "face", "mine"],
      desc: "Ton index tendu fait un grand cercle autour de ton visage, en suivant ses contours.",
      astuce: "Ton doigt fait le tour de ton visage.",
      fiable: "probable", source: PS + "visage",
      images: [
        { d: { cfg: "index", at: "front", off: [0, 12, 22], paume: "dedans", doigts: "haut" } },
        { d: { cfg: "index", at: "joue_non", off: [-8, 0, 22], paume: "dedans", doigts: "haut" }, t: 250, arc: 10 },
        { d: { cfg: "index", at: "menton", off: [0, -10, 22], paume: "dedans", doigts: "haut" }, t: 250, arc: 10 },
        { d: { cfg: "index", at: "joue_dom", off: [8, 0, 22], paume: "dedans", doigts: "haut" }, t: 250, arc: 10 },
        { d: { cfg: "index", at: "front", off: [0, 12, 22], paume: "dedans", doigts: "haut" }, t: 250, arc: 10 }
      ]
    },
    {
      id: "barbe", mot: "Barbe", theme: "corps", niveau: 2,
      syn: ["barbu", "barbiche"],
      desc: "Tes deux mains ouvertes touchent tes joues de chaque côté. Éloigne-les de ton visage puis rapproche-les devant ton menton en refermant les doigts sur le pouce.",
      astuce: "Tu dessines une barbe qui descend du visage.",
      fiable: "probable", source: PS + "barbe",
      sym: true,
      images: [
        { d: { cfg: "5", at: "joue_dom", off: [6, 0, 8], paume: "dedans", doigts: "bas" }, contact: true },
        { d: { cfg: "bec", at: "menton", off: [10, -20, 35], paume: "dedans", doigts: "avant" }, t: 500 }
      ]
    },
    {
      id: "chauve", mot: "Chauve", theme: "corps", niveau: 3,
      syn: ["calvitie", "crâne rasé", "sans cheveux"],
      desc: "Ton poing gauche est devant toi. Ta main droite à plat, paume vers toi, glisse le long de ce poing, du côté extérieur vers le côté proche de toi.",
      astuce: "Le poing est la tête bien ronde et lisse.",
      fiable: "incertain", source: PS + "chauve",
      images: [
        { d: { cfg: "plate", at: "nd:dos", off: [10, 12, 25], paume: "arriere", doigts: "haut" },
          nd: { cfg: "poing", at: "neutre_non", paume: "bas", doigts: "avant" }, contact: true },
        { d: { cfg: "plate", at: "nd:dos", off: [10, 12, -12], paume: "arriere", doigts: "haut" }, t: 500 }
      ]
    },
    {
      id: "moustache", mot: "Moustache", theme: "corps", niveau: 2,
      syn: ["moustachu"],
      desc: "Tes deux mains, pouce et index tendus et parallèles, sont près de tes lèvres. Écarte-les vers l'extérieur comme pour dessiner une moustache, en rapprochant le pouce et l'index à la fin.",
      fiable: "sur", source: PS + "moustache",
      sym: true,
      images: [
        { d: { cfg: "pince", at: "bouche", off: [4, 6, 14], paume: "arriere", doigts: "dedans" } },
        { d: { cfg: "pince_fermee", at: "bouche", off: [32, 10, 10], paume: "arriere", doigts: "dedans" }, t: 450 }
      ]
    },

    // ───────────────────────── SANTÉ ─────────────────────────

    {
      id: "temperature", mot: "Température", theme: "sante", niveau: 2,
      syn: ["thermomètre", "fièvre", "degrés"],
      desc: "Ton index gauche est levé, les autres doigts fermés. Ta main droite en O glisse le long de cet index, vers le bas puis vers le haut, plusieurs fois.",
      astuce: "Ton index est le thermomètre où monte et descend le mercure.",
      fiable: "sur", source: PS + "temperature",
      rep: 2,
      images: [
        { d: { cfg: "O", at: "nd:index", off: [0, 30, 0], paume: "bas", doigts: "avant" },
          nd: { cfg: "index", at: "neutre_non", paume: "dedans", doigts: "haut" } },
        { d: { cfg: "O", at: "nd:index", off: [0, -15, 0], paume: "bas", doigts: "avant" }, t: 400 }
      ]
    }

  ]);
})();
