// Signes LSF : salutations, politesse, questions, personnes, famille.
// Format : voir notes/format-signes.md. Sources et remarques : notes/research/salutations-famille.md
// Signeur droitier (d = main droite, nd = main gauche), vu de face.
(function () {
  // Configurations sur mesure
  var U_POUCE = { doigts: ["t", "t", "p", "p"], ecart: 0, pouce: "ecarte" };   // « U pouce » de ÇA VA
  var U_POUCE_PLIE = { doigts: ["b", "b", "p", "p"], ecart: 0, pouce: "ecarte" };
  var MOUFLE = { doigts: ["t", "t", "t", "t"], ecart: 0, pouce: "ecarte" };     // main plate, pouce écarté
  var CROCHET = { doigts: ["x", "x", "x", "x"], ecart: 0, pouce: "cote" };      // doigts en crochet (AMI)
  var CLE_POUCE_HAUT = { doigts: ["x", "p", "p", "p"], ecart: 0, pouce: "haut" }; // fin de BIENTÔT

  var WS = "https://lsf.wikisign.org/wiki/";
  var NOTES = "http://stfuscientt.free.fr/LSF/LSF.html";

  LSF.ajouter([

    /* =========================== SALUTATIONS =========================== */

    {
      id: "bonjour", mot: "Bonjour", theme: "salutations", niveau: 1,
      syn: ["bonne journée", "saluer"],
      desc: "Pose le bout des doigts de ta main plate sur le côté de ta bouche, paume vers toi, puis avance la main vers la personne, avec un grand sourire.",
      astuce: "Presque comme « merci », mais la main va droit devant au lieu de descendre.",
      fiable: "probable", source: WS + "Bonjour",
      images: [
        { d: { cfg: "plate", at: "bouche", off: [18, 0, 0], touch: "doigts", paume: "arriere", doigts: "haut" }, visage: "sourire", contact: true },
        { d: { cfg: "plate", at: "neutre_haut", off: [18, -8, 30], paume: "haut-arriere", doigts: "avant-haut" }, t: 500, arc: 8 }
      ]
    },
    {
      id: "salut", mot: "Salut", theme: "salutations", niveau: 1,
      syn: ["coucou", "hello"],
      desc: "Tends l'index et le majeur serrés, pose-les sur ta tempe, puis éloigne la main de ta tête d'un petit geste.",
      astuce: "Comme un petit salut militaire, version cool.",
      fiable: "probable", source: WS + "Salut",
      images: [
        { d: { cfg: "U", at: "tempe_dom", touch: "doigts", paume: "avant", doigts: "dedans-haut" }, visage: "sourire", contact: true },
        { d: { cfg: "U", at: "tempe_dom", off: [35, 8, 30], paume: "avant", doigts: "dedans-haut" }, t: 400 }
      ]
    },
    {
      id: "au-revoir", mot: "Au revoir", theme: "salutations", niveau: 1,
      syn: ["salut", "bye", "à plus"],
      desc: "Lève ta main ouverte, paume vers la personne, et plie puis déplie les doigts plusieurs fois.",
      astuce: "C'est le « coucou » de la main que tout le monde connaît.",
      fiable: "sur", source: WS + "Au_revoir",
      rep: 3,
      images: [
        { d: { cfg: "plate", at: "neutre_dom", off: [5, 45, 0], paume: "avant", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "plate_pliee", at: "neutre_dom", off: [5, 45, 0], paume: "avant", doigts: "haut" }, t: 200 }
      ]
    },
    {
      id: "bonsoir", mot: "Bonsoir", theme: "salutations", niveau: 2,
      syn: ["soir", "bonne soirée"],
      desc: "Fais BON (bout des doigts réunis sur la bouche, puis la main s'éloigne), puis SOIR : ta main gauche à plat fait l'horizon, ta main droite descend derrière elle comme le soleil qui se couche.",
      astuce: "La main droite, c'est le soleil qui passe sous l'horizon.",
      fiable: "probable", source: WS + "Soir",
      images: [
        { d: { cfg: "bec", at: "bouche", touch: "doigts", paume: "dedans", doigts: "arriere" }, visage: "sourire", contact: true },
        { d: { cfg: "bec", at: "bouche", off: [5, -5, 40], paume: "dedans", doigts: "arriere" }, t: 250 },
        { d: { cfg: "plate", at: "nd:paume", off: [0, 22, -12], paume: "arriere", doigts: "bas" },
          nd: { cfg: "plate", at: "neutre", paume: "arriere", doigts: "dedans" }, t: 450 },
        { d: { cfg: "plate", at: "nd:paume", off: [0, -32, -12], paume: "arriere", doigts: "bas" }, t: 650 }
      ]
    },
    {
      id: "bonne-nuit", mot: "Bonne nuit", theme: "salutations", niveau: 2,
      syn: ["nuit", "dormir bien"],
      desc: "Mets tes deux mains à plat devant ton visage, paumes vers toi, doigts vers le haut, puis fais-les basculer vers le bas pour qu'elles se croisent, l'une devant l'autre.",
      astuce: "Comme des volets qui se ferment sur la lumière du jour.",
      fiable: "probable", source: WS + "Nuit",
      images: [
        { d: { cfg: "plate", at: "neutre_haut", off: [18, 0, 0], paume: "arriere", doigts: "haut" },
          nd: { cfg: "plate", at: "neutre_haut", off: [18, 0, 0], paume: "arriere", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "plate", at: "neutre", off: [0, -5, 22], paume: "arriere", doigts: "dedans" },
          nd: { cfg: "plate", at: "neutre", off: [0, -5, 6], paume: "arriere", doigts: "dedans" }, t: 650, arc: 10 }
      ]
    },
    {
      id: "a-demain", mot: "À demain", theme: "salutations", niveau: 2,
      syn: ["demain"],
      desc: "Poing fermé, pouce levé : pose le pouce près de ton oreille, puis tends le bras vers l'avant, le pouce pointé devant toi.",
      astuce: "Le futur est devant toi : le pouce part vers l'avant.",
      fiable: "probable", source: WS + "Demain",
      images: [
        { d: { cfg: "pouce", at: "oreille_dom", touch: "pouce", off: [0, 0, 10], paume: "dedans", doigts: "haut" }, visage: "sourire", contact: true },
        { d: { cfg: "pouce", at: "neutre_dom", off: [0, 25, 40], paume: "dedans", doigts: "avant" }, t: 550, arc: 12 }
      ]
    },
    {
      id: "a-bientot", mot: "À bientôt", theme: "salutations", niveau: 2,
      syn: ["bientôt", "à plus tard"],
      desc: "Plie ton index en crochet avec le pouce dessous, puis fais claquer le pouce vers le haut, comme une pichenette pour lancer une bille.",
      astuce: "Comme si tu jouais aux billes : un petit coup de pouce et c'est bientôt.",
      fiable: "incertain", source: WS + "Bient%C3%B4t",
      rep: 2,
      images: [
        { d: { cfg: "T", at: "neutre_dom", off: [0, 20, 0], paume: "dedans", doigts: "avant" }, visage: "sourire" },
        { d: { cfg: CLE_POUCE_HAUT, at: "neutre_dom", off: [0, 22, 4], paume: "dedans", doigts: "avant" }, t: 200 }
      ]
    },
    {
      id: "ca-va", mot: "Ça va ?", theme: "salutations", niveau: 1,
      syn: ["comment ça va", "comment vas-tu", "tu vas bien"],
      desc: "Tes deux mains devant toi, paumes vers toi : index et majeur tendus serrés vers le haut, pouce sorti. Plie et déplie les deux doigts plusieurs fois, en levant les sourcils.",
      astuce: "Les sourcils levés, c'est le point d'interrogation de la LSF.",
      fiable: "sur", source: WS + "%C3%87a_va",
      sym: true, rep: 2,
      images: [
        { d: { cfg: U_POUCE, at: "neutre", off: [15, 0, 0], paume: "arriere", doigts: "haut" }, visage: "question" },
        { d: { cfg: U_POUCE_PLIE, at: "neutre", off: [15, 0, 0], paume: "arriere", doigts: "haut" }, t: 200 }
      ]
    },
    {
      id: "ca-va-reponse", mot: "Ça va (bien)", theme: "salutations", niveau: 1,
      syn: ["ça va bien", "je vais bien", "bien"],
      desc: "Même signe que « Ça va ? » (index et majeur qui se plient et se déplient, deux mains), mais avec un visage détendu et souriant : c'est une réponse, pas une question.",
      astuce: "Même geste, autre visage : c'est ton visage qui fait la différence.",
      fiable: "sur", source: WS + "%C3%87a_va",
      sym: true, rep: 2,
      images: [
        { d: { cfg: U_POUCE, at: "neutre", off: [15, 0, 0], paume: "arriere", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: U_POUCE_PLIE, at: "neutre", off: [15, 0, 0], paume: "arriere", doigts: "haut" }, t: 220 }
      ]
    },

    /* ============================ POLITESSE ============================ */

    {
      id: "merci", mot: "Merci", theme: "politesse", niveau: 1,
      syn: ["remercier", "merci beaucoup"],
      desc: "Pose le bout des doigts de ta main plate sur le côté de ta bouche, paume vers toi, puis avance la main vers la personne en descendant un peu.",
      astuce: "Comme si tu offrais tes mots à l'autre.",
      fiable: "sur", source: WS + "Merci",
      images: [
        { d: { cfg: "plate", at: "bouche", off: [15, 0, 0], touch: "doigts", paume: "arriere", doigts: "haut" }, visage: "sourire", contact: true },
        { d: { cfg: "plate", at: "neutre", off: [5, -10, 20], paume: "haut-arriere", doigts: "avant-haut" }, t: 550, arc: 10 }
      ]
    },
    {
      id: "s-il-te-plait", mot: "S'il te plaît", theme: "politesse", niveau: 1,
      syn: ["s'il vous plaît", "stp", "svp", "gentil"],
      desc: "Main plate, paume tournée vers l'avant : fais glisser le dos de ta main le long de ta joue, de haut en bas.",
      astuce: "C'est le signe GENTIL : « sois gentil ».",
      fiable: "probable", source: WS + "S%27il_vous_pla%C3%AEt",
      images: [
        { d: { cfg: "plate", at: "joue_dom", off: [0, 10, 0], touch: "dos", paume: "avant", doigts: "haut" }, visage: "sourire", contact: true },
        { d: { cfg: "plate", at: "joue_dom", off: [0, -22, 0], touch: "dos", paume: "avant", doigts: "haut" }, t: 350 }
      ]
    },
    {
      id: "pardon", mot: "Pardon", theme: "politesse", niveau: 1,
      syn: ["désolé", "désolée", "excuse-moi", "excusez-moi", "s'excuser"],
      desc: "Ta main gauche est à plat, paume vers le haut, devant ta poitrine. Frotte-la avec ta main droite à plat en faisant deux petits cercles, avec un air désolé.",
      astuce: "Comme si tu frottais pour effacer la bêtise.",
      fiable: "probable", source: WS + "Pardon",
      rep: 2,
      images: [
        { d: { cfg: "plate", at: "nd:paume", off: [12, 0, 0], paume: "bas", doigts: "avant" },
          nd: { cfg: "plate", at: "neutre", paume: "haut", doigts: "avant" }, visage: "triste", contact: true },
        { d: { cfg: "plate", at: "nd:paume", off: [0, 0, 12], paume: "bas", doigts: "avant" }, t: 150 },
        { d: { cfg: "plate", at: "nd:paume", off: [-12, 0, 0], paume: "bas", doigts: "avant" }, t: 150 },
        { d: { cfg: "plate", at: "nd:paume", off: [0, 0, -12], paume: "bas", doigts: "avant" }, t: 150 },
        { d: { cfg: "plate", at: "nd:paume", off: [12, 0, 0], paume: "bas", doigts: "avant" }, t: 150 }
      ]
    },
    {
      id: "de-rien", mot: "De rien", theme: "politesse", niveau: 2,
      syn: ["rien", "pas de quoi", "je t'en prie"],
      desc: "Poing fermé, pouce tendu : pose le bout du pouce sous tes dents du haut, puis fais-le partir vers l'avant d'un coup sec.",
      astuce: "C'est le signe RIEN : « ce n'est rien ! »",
      fiable: "probable", source: WS + "Rien",
      images: [
        { d: { cfg: "pouce", at: "bouche", touch: "pouce", paume: "dedans", doigts: "haut" }, visage: "sourire", contact: true },
        { d: { cfg: "pouce", at: "bouche", off: [5, -12, 35], paume: "dedans", doigts: "avant-bas" }, t: 260 }
      ]
    },
    {
      id: "oui", mot: "Oui", theme: "politesse", niveau: 1,
      syn: ["ouais", "si"],
      desc: "Fais un rond avec ton pouce et ton index, puis fais pivoter le poignet vers le bas plusieurs fois, vite, comme une tête qui dit oui.",
      astuce: "À l'origine, la main faisait O-U-I en une seule forme.",
      fiable: "probable", source: WS + "Oui",
      rep: 2,
      images: [
        { d: { cfg: "pince_fermee", at: "neutre_dom", off: [0, 10, 0], paume: "dedans", doigts: "avant" }, visage: "neutre" },
        { d: { cfg: "pince_fermee", at: "neutre_dom", off: [0, 4, 4], paume: "dedans", doigts: "avant-bas" }, t: 150 }
      ]
    },
    {
      id: "non", mot: "Non", theme: "politesse", niveau: 1,
      syn: ["pas", "nan"],
      desc: "Index et majeur tendus serrés, paume vers toi, doigts vers le côté. Tourne le poignet pour que les doigts finissent pointés vers le sol.",
      astuce: "Les deux doigts « tombent » : c'est non.",
      fiable: "probable", source: WS + "Non",
      images: [
        { d: { cfg: "U", at: "neutre", off: [5, 5, 0], paume: "arriere", doigts: "dedans" }, visage: "neutre" },
        { d: { cfg: "U", at: "neutre", off: [5, -8, 0], paume: "arriere", doigts: "bas" }, t: 320 }
      ]
    },
    {
      id: "d-accord", mot: "D'accord", theme: "politesse", niveau: 1,
      syn: ["ok", "okay", "accepter", "entendu"],
      desc: "Tes deux poings fermés se font face devant toi. Plie et déplie les poignets deux fois, comme deux têtes qui disent oui.",
      astuce: "Deux têtes qui hochent ensemble : vous êtes d'accord.",
      fiable: "sur", source: WS + "D%27accord",
      sym: true, rep: 2,
      images: [
        { d: { cfg: "poing", at: "neutre", off: [12, 0, 0], paume: "dedans", doigts: "haut" }, visage: "sourire" },
        { d: { cfg: "poing", at: "neutre", off: [12, -4, 6], paume: "dedans", doigts: "avant" }, t: 180 }
      ]
    },
    {
      id: "peut-etre", mot: "Peut-être", theme: "politesse", niveau: 2,
      syn: ["possible", "je ne sais pas trop"],
      desc: "Tes deux mains ouvertes, doigts écartés, paumes vers le sol : rapproche-les en faisant un petit creux, puis écarte-les en faisant un autre creux, comme deux « U » très aplatis.",
      astuce: "Les mains hésitent, elles se balancent comme ta décision.",
      fiable: "probable", source: WS + "Peut-%C3%AAtre",
      sym: true,
      images: [
        { d: { cfg: "5", at: "neutre", off: [35, 0, 0], paume: "bas", doigts: "avant" }, visage: "moue" },
        { d: { cfg: "5", at: "neutre", off: [8, 0, 0], paume: "bas", doigts: "avant" }, t: 400, arc: -12 },
        { d: { cfg: "5", at: "neutre", off: [35, 0, 0], paume: "bas", doigts: "avant" }, t: 400, arc: -12 }
      ]
    },
    {
      id: "bravo", mot: "Bravo", theme: "politesse", niveau: 2,
      syn: ["applaudir", "applaudissements", "félicitations", "génial"],
      desc: "Lève tes deux mains grandes ouvertes, doigts écartés, et fais tourner tes poignets d'un côté puis de l'autre plusieurs fois.",
      astuce: "Les sourds applaudissent avec les yeux : on voit les mains s'agiter !",
      fiable: "sur", source: WS + "Bravo",
      sym: true, rep: 3,
      images: [
        { d: { cfg: "5", at: "neutre_haut", off: [28, 5, 0], paume: "avant", doigts: "haut" }, visage: "joie" },
        { d: { cfg: "5", at: "neutre_haut", off: [28, 5, 0], paume: "dedans", doigts: "haut" }, t: 140 }
      ]
    },
    {
      id: "c-est-bon", mot: "C'est bon", theme: "politesse", niveau: 2,
      syn: ["bon", "ok", "ça marche"],
      desc: "Réunis le bout de tes doigts et pose-les sur ta bouche, puis éloigne vite la main d'une dizaine de centimètres.",
      fiable: "probable", source: WS + "Bon",
      images: [
        { d: { cfg: "bec", at: "bouche", touch: "doigts", paume: "dedans", doigts: "arriere" }, visage: "sourire", contact: true },
        { d: { cfg: "bec", at: "bouche", off: [5, -5, 40], paume: "dedans", doigts: "arriere" }, t: 220 }
      ]
    },

    /* ============================ QUESTIONS ============================ */

    {
      id: "qui", mot: "Qui ?", theme: "questions", niveau: 1,
      syn: ["qui est-ce"],
      desc: "Arrondis les lèvres comme pour dire « qui », pointe ton index vers ta bouche, à quelques centimètres, et fais-lui faire de petits cercles. Fronce les sourcils.",
      fiable: "incertain", source: "https://projects.lib.rochester.edu/lsf-asl/who-2/",
      rep: 2,
      images: [
        { d: { cfg: "index", at: "bouche", off: [5, 0, 22], paume: "dedans", doigts: "arriere" }, visage: "interrogatif", bouche: "o" },
        { d: { cfg: "index", at: "bouche", off: [0, 5, 22], paume: "dedans", doigts: "arriere" }, t: 120 },
        { d: { cfg: "index", at: "bouche", off: [-5, 0, 22], paume: "dedans", doigts: "arriere" }, t: 120 },
        { d: { cfg: "index", at: "bouche", off: [0, -5, 22], paume: "dedans", doigts: "arriere" }, t: 120 },
        { d: { cfg: "index", at: "bouche", off: [5, 0, 22], paume: "dedans", doigts: "arriere" }, t: 120 }
      ]
    },
    {
      id: "quoi", mot: "Quoi ?", theme: "questions", niveau: 1,
      syn: ["quel", "quelle", "qu'est-ce que", "que"],
      desc: "Ouvre tes deux mains devant toi, doigts écartés, paumes vers le haut, et écarte-les un peu vers l'extérieur, en fronçant les sourcils.",
      astuce: "C'est le geste naturel de « Quoi ?! ».",
      fiable: "probable", source: WS + "Quoi",
      sym: true, rep: 2,
      images: [
        { d: { cfg: "5", at: "neutre", off: [8, -5, 0], paume: "haut-dedans", doigts: "avant" }, visage: "interrogatif" },
        { d: { cfg: "5", at: "neutre", off: [28, 0, 10], paume: "haut-dehors", doigts: "avant" }, t: 250 }
      ]
    },
    {
      id: "ou", mot: "Où ?", theme: "questions", niveau: 1,
      syn: ["où est", "c'est où"],
      desc: "Réunis le bout de tes doigts en bec, doigts vers le haut, et balance la main de gauche à droite, en fronçant les sourcils.",
      fiable: "probable", source: WS + "O%C3%B9",
      rep: 2,
      images: [
        { d: { cfg: "bec", at: "neutre_dom", off: [12, 20, 0], paume: "avant", doigts: "haut" }, visage: "interrogatif" },
        { d: { cfg: "bec", at: "neutre_dom", off: [-12, 20, 0], paume: "avant", doigts: "haut" }, t: 200 }
      ]
    },
    {
      id: "quand", mot: "Quand ?", theme: "questions", niveau: 1,
      syn: ["à quel moment", "quelle date"],
      desc: "Ta main gauche est à plat devant toi, paume vers le bas. Tapote deux fois le dos de cette main avec ton index droit, en fronçant les sourcils.",
      fiable: "probable", source: WS + "Quand",
      rep: 2,
      images: [
        { d: { cfg: "index", at: "nd:dos", off: [0, 18, 0], paume: "arriere", doigts: "bas" },
          nd: { cfg: "plate", at: "neutre", paume: "bas", doigts: "dedans" }, visage: "interrogatif" },
        { d: { cfg: "index", at: "nd:dos", touch: "index", paume: "arriere", doigts: "bas" }, t: 180, contact: true }
      ]
    },
    {
      id: "comment", mot: "Comment ?", theme: "questions", niveau: 1,
      syn: ["de quelle façon"],
      desc: "Tes deux mains ouvertes devant toi, paumes vers le sol : retourne-les pour que les paumes regardent le ciel, en fronçant les sourcils.",
      astuce: "Tu retournes le problème dans tous les sens.",
      fiable: "probable", source: WS + "Comment",
      sym: true, rep: 2,
      images: [
        { d: { cfg: "5", at: "neutre", off: [20, 0, 0], paume: "bas", doigts: "avant" }, visage: "interrogatif" },
        { d: { cfg: "5", at: "neutre", off: [22, 0, 0], paume: "haut", doigts: "avant" }, t: 350 }
      ]
    },
    {
      id: "pourquoi", mot: "Pourquoi ?", theme: "questions", niveau: 1,
      syn: ["pour quelle raison"],
      desc: "Touche deux fois ta tempe avec ton index, pouce tourné vers l'avant, en fronçant les sourcils.",
      astuce: "Tu montres ta tête : tu cherches la raison.",
      fiable: "probable", source: WS + "Pourquoi",
      rep: 2,
      images: [
        { d: { cfg: "index", at: "tempe_dom", off: [12, 6, 0], paume: "dedans", doigts: "haut" }, visage: "interrogatif" },
        { d: { cfg: "index", at: "tempe_dom", touch: "index", paume: "dedans", doigts: "haut" }, t: 180, contact: true }
      ]
    },
    {
      id: "combien", mot: "Combien ?", theme: "questions", niveau: 2,
      syn: ["combien de", "quelle quantité", "compter"],
      desc: "Tes deux poings devant toi, paumes vers le haut : ouvre les doigts en les faisant bouger, comme si tu comptais, et monte un peu les mains, en fronçant les sourcils.",
      astuce: "Tes doigts comptent pour toi.",
      fiable: "incertain", source: NOTES,
      sym: true,
      images: [
        { d: { cfg: "poing", at: "neutre", off: [15, -10, 0], paume: "haut", doigts: "avant" }, visage: "interrogatif" },
        { d: { cfg: "5", at: "neutre", off: [22, 8, 0], paume: "haut", doigts: "avant" }, t: 600, agiter: true }
      ]
    },

    /* ============================ PERSONNES ============================ */

    {
      id: "je", mot: "Je / moi", theme: "personnes", niveau: 1,
      syn: ["je", "moi", "me", "j'"],
      desc: "Pointe ton index vers ta poitrine et touche-la.",
      fiable: "sur", source: WS + "Je",
      images: [
        { d: { cfg: "index", at: "poitrine", off: [0, 0, 20], paume: "dedans", doigts: "arriere" }, visage: "neutre" },
        { d: { cfg: "index", at: "poitrine", touch: "index", paume: "dedans", doigts: "arriere" }, t: 300, contact: true }
      ]
    },
    {
      id: "tu", mot: "Tu / toi", theme: "personnes", niveau: 1,
      syn: ["tu", "toi", "te", "t'"],
      desc: "Pointe ton index vers la personne à qui tu parles.",
      fiable: "sur", source: WS + "Tu",
      images: [
        { d: { cfg: "index", at: "neutre", off: [0, 0, -15], paume: "dedans", doigts: "avant" }, visage: "neutre" },
        { d: { cfg: "index", at: "neutre", off: [0, 0, 30], paume: "dedans", doigts: "avant" }, t: 300 }
      ]
    },
    {
      id: "il-elle", mot: "Il / elle", theme: "personnes", niveau: 1,
      syn: ["il", "elle", "lui"],
      desc: "Pointe ton index sur le côté, vers l'endroit où se trouve la personne dont tu parles (ou l'endroit où tu l'as « placée »).",
      astuce: "En LSF, on range les gens dans l'espace, puis on les montre.",
      fiable: "sur", source: WS + "Je",
      images: [
        { d: { cfg: "index", at: "neutre_dom", paume: "bas", doigts: "avant" }, visage: "neutre" },
        { d: { cfg: "index", at: "neutre_dom", off: [22, 0, 15], paume: "bas", doigts: "avant-dehors" }, t: 300 }
      ]
    },
    {
      id: "nous", mot: "Nous", theme: "personnes", niveau: 2,
      syn: ["on", "nous deux"],
      desc: "Touche ta poitrine avec l'index d'un côté, fais un petit arc devant toi, puis touche l'autre côté de ta poitrine.",
      astuce: "Tu fais un cercle qui t'englobe avec les autres.",
      fiable: "probable", source: WS + "Je",
      images: [
        { d: { cfg: "index", at: "poitrine_dom", touch: "index", paume: "dedans", doigts: "arriere" }, visage: "neutre", contact: true },
        { d: { cfg: "index", at: "neutre", off: [0, 0, -35], paume: "dedans", doigts: "arriere" }, t: 300 },
        { d: { cfg: "index", at: "poitrine_non", touch: "index", paume: "dedans", doigts: "arriere" }, t: 300, contact: true }
      ]
    },
    {
      id: "vous", mot: "Vous", theme: "personnes", niveau: 2,
      syn: ["vous tous"],
      desc: "Pointe ton index devant toi et balaie-le de gauche à droite, vers les personnes à qui tu parles.",
      fiable: "probable", source: WS + "Tu",
      images: [
        { d: { cfg: "index", at: "neutre", off: [-25, 0, 20], paume: "bas", doigts: "avant-dedans" }, visage: "neutre" },
        { d: { cfg: "index", at: "neutre", off: [25, 0, 20], paume: "bas", doigts: "avant-dehors" }, t: 450 }
      ]
    },
    {
      id: "ils-elles", mot: "Ils / elles", theme: "personnes", niveau: 2,
      syn: ["ils", "elles", "eux"],
      desc: "Pointe ton index sur le côté et balaie-le de l'avant vers l'extérieur, pour montrer plusieurs personnes.",
      fiable: "probable", source: WS + "Je",
      images: [
        { d: { cfg: "index", at: "neutre_dom", off: [-5, 0, 25], paume: "bas", doigts: "avant" }, visage: "neutre" },
        { d: { cfg: "index", at: "neutre_dom", off: [30, 0, 5], paume: "bas", doigts: "dehors" }, t: 450 }
      ]
    },
    {
      id: "mon", mot: "Mon / ma", theme: "personnes", niveau: 2,
      syn: ["ma", "mes", "à moi", "le mien", "la mienne"],
      desc: "Pose ta main plate sur ta poitrine, paume contre toi.",
      astuce: "Tu poses la main sur toi : c'est à moi !",
      fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/mon",
      images: [
        { d: { cfg: "plate", at: "poitrine", off: [0, 0, 20], paume: "arriere", doigts: "dedans" }, visage: "neutre" },
        { d: { cfg: "plate", at: "poitrine", paume: "arriere", doigts: "dedans" }, t: 300, contact: true }
      ]
    },
    {
      id: "ton", mot: "Ton / ta", theme: "personnes", niveau: 2,
      syn: ["ta", "tes", "à toi", "le tien", "la tienne"],
      desc: "Avance ta main plate vers la personne, paume tournée vers elle.",
      fiable: "probable", source: "https://dico.elix-lsf.fr/dictionnaire/ton",
      images: [
        { d: { cfg: "plate", at: "neutre", off: [0, 0, -10], paume: "avant", doigts: "haut" }, visage: "neutre" },
        { d: { cfg: "plate", at: "neutre", off: [0, 0, 30], paume: "avant", doigts: "haut" }, t: 320 }
      ]
    },
    {
      id: "ami", mot: "Ami(e)", theme: "personnes", niveau: 1,
      syn: ["ami", "amie", "copain", "copine", "pote", "amitié"],
      desc: "Accroche les doigts de tes deux mains l'un dans l'autre et serre fort, puis secoue un peu l'ensemble.",
      astuce: "Deux mains qui se tiennent : un lien solide.",
      fiable: "probable", source: WS + "Ami",
      rep: 2,
      images: [
        { d: { cfg: CROCHET, at: "nd:doigts", touch: "doigts", paume: "bas", doigts: "dedans" },
          nd: { cfg: CROCHET, at: "neutre", off: [0, 4, 0], paume: "haut", doigts: "dedans" }, visage: "sourire", contact: true },
        { d: { cfg: CROCHET, at: "nd:doigts", touch: "doigts", paume: "bas", doigts: "dedans" },
          nd: { cfg: CROCHET, at: "neutre", off: [0, -8, 0], paume: "haut", doigts: "dedans" }, t: 200 }
      ]
    },
    {
      id: "fille", mot: "Fille", theme: "personnes", niveau: 1,
      syn: ["fillette", "jeune fille"],
      desc: "Pose ton index en haut de ta joue et fais-le glisser vers le bas, deux fois.",
      astuce: "Comme une mèche de cheveux longs le long du visage.",
      fiable: "probable", source: WS + "Fille",
      rep: 2,
      images: [
        { d: { cfg: "index", at: "joue_dom", off: [0, 12, 0], touch: "index", paume: "dedans", doigts: "haut" }, visage: "neutre", contact: true },
        { d: { cfg: "index", at: "joue_dom", off: [0, -14, 0], touch: "index", paume: "dedans", doigts: "haut" }, t: 220 }
      ]
    },
    {
      id: "garcon", mot: "Garçon", theme: "personnes", niveau: 1,
      syn: ["gars", "jeune homme"],
      desc: "Poing fermé, pouce tendu : passe le bout du pouce sur ton front, d'un côté à l'autre.",
      astuce: "Les cheveux courts, coupés au ras du front.",
      fiable: "probable", source: WS + "Gar%C3%A7on",
      rep: 2,
      images: [
        { d: { cfg: "pouce", at: "front", off: [-12, 0, 0], touch: "pouce", paume: "dedans", doigts: "haut" }, visage: "neutre", contact: true },
        { d: { cfg: "pouce", at: "front", off: [12, 0, 0], touch: "pouce", paume: "dedans", doigts: "haut" }, t: 250 }
      ]
    },
    {
      id: "homme", mot: "Homme", theme: "personnes", niveau: 1,
      syn: ["monsieur", "masculin"],
      desc: "Pouce et index tendus : pose le bout du pouce sur ta lèvre du haut, puis tourne le poignet en rapprochant l'index du pouce, comme si tu dessinais une moustache.",
      astuce: "La moustache !",
      fiable: "probable", source: WS + "Homme",
      images: [
        { d: { cfg: "L", at: "bouche", off: [0, 10, 0], touch: "pouce", paume: "arriere", doigts: "dehors" }, visage: "neutre", contact: true },
        { d: { cfg: "pince_fermee", at: "bouche", off: [8, 8, 0], touch: "pouce", paume: "arriere", doigts: "dehors-bas" }, t: 380 }
      ]
    },
    {
      id: "femme", mot: "Femme", theme: "personnes", niveau: 1,
      syn: ["dame", "madame", "féminin"],
      desc: "Quatre doigts tendus, pouce replié, dos de la main vers toi : pose le côté de la main sur ta joue et fais-la glisser doucement vers le bas.",
      astuce: "La joue douce. Ne confonds pas avec GENTIL : là les doigts sont serrés.",
      fiable: "probable", source: WS + "Femme",
      images: [
        { d: { cfg: "4", at: "joue_dom", off: [6, 10, 0], touch: "dos", paume: "avant", doigts: "haut" }, visage: "neutre", contact: true },
        { d: { cfg: "4", at: "joue_dom", off: [6, -22, 0], touch: "dos", paume: "avant", doigts: "haut" }, t: 500 }
      ]
    },
    {
      id: "bebe", mot: "Bébé", theme: "personnes", niveau: 1,
      syn: ["nourrisson", "bébé"],
      desc: "Mets ton avant-bras gauche à l'horizontale, paume vers le haut, pose ton avant-bras droit dessus, doigts réunis en bec, et berce le tout de droite à gauche.",
      astuce: "Ton bras droit, c'est le bébé ; ta main en bec, c'est sa tête.",
      fiable: "sur", source: WS + "B%C3%A9b%C3%A9",
      rep: 2,
      images: [
        { d: { cfg: "bec", at: "neutre_non", off: [-12, 6, 5], paume: "bas", doigts: "dedans" },
          nd: { cfg: "plate", at: "neutre_dom", off: [12, -5, 0], paume: "haut", doigts: "dedans" }, visage: "sourire" },
        { d: { cfg: "bec", at: "neutre_non", off: [12, 10, 5], paume: "bas", doigts: "dedans" },
          nd: { cfg: "plate", at: "neutre_dom", off: [-12, -1, 0], paume: "haut", doigts: "dedans" }, t: 400, arc: -8 },
        { d: { cfg: "bec", at: "neutre_non", off: [-12, 6, 5], paume: "bas", doigts: "dedans" },
          nd: { cfg: "plate", at: "neutre_dom", off: [12, -5, 0], paume: "haut", doigts: "dedans" }, t: 400, arc: -8 }
      ]
    },
    {
      id: "sourd", mot: "Sourd(e)", theme: "personnes", niveau: 1,
      syn: ["sourd", "sourde", "sourds"],
      desc: "Touche ton oreille avec ton index, puis va toucher le coin de ta bouche.",
      astuce: "L'oreille, puis la bouche : la personne sourde « parle » avec les mains et le visage.",
      fiable: "sur", source: WS + "Sourd",
      images: [
        { d: { cfg: "index", at: "oreille_dom", touch: "index", paume: "arriere", doigts: "dedans" }, visage: "neutre", contact: true },
        { d: { cfg: "index", at: "bouche", off: [14, 0, 0], touch: "index", paume: "arriere", doigts: "dedans" }, t: 450, arc: 6, contact: true }
      ]
    },
    {
      id: "malentendant", mot: "Malentendant(e)", theme: "personnes", niveau: 3,
      syn: ["malentendante", "entendre à moitié"],
      desc: "Ta main gauche montre un index couché à l'horizontale. Ton index droit part de ton oreille et vient se poser deux fois sur cet index.",
      astuce: "« Oreille » + « moitié » : entendre à moitié.",
      fiable: "probable", source: WS + "Malentendant",
      images: [
        { d: { cfg: "index", at: "oreille_dom", touch: "index", paume: "arriere", doigts: "dedans" },
          nd: { cfg: "index", at: "neutre", paume: "bas", doigts: "dedans" }, visage: "neutre", contact: true },
        { d: { cfg: "index", at: "nd:index", touch: "index", paume: "arriere", doigts: "bas" }, t: 600, contact: true },
        { d: { cfg: "index", at: "nd:index", off: [0, 15, 0], paume: "arriere", doigts: "bas" }, t: 180 },
        { d: { cfg: "index", at: "nd:index", touch: "index", paume: "arriere", doigts: "bas" }, t: 180, contact: true }
      ]
    },
    {
      id: "professeur", mot: "Professeur", theme: "personnes", niveau: 2,
      syn: ["prof", "professeure", "enseignant", "enseignante", "maître", "maîtresse"],
      desc: "Main à plat, pouce écarté, paume vers le sol : avec le bout du pouce, tape deux fois le côté opposé de ta poitrine, près de l'aisselle, avec un petit mouvement vers le haut.",
      fiable: "probable", source: WS + "Professeur",
      rep: 2,
      images: [
        { d: { cfg: MOUFLE, at: "poitrine_non", touch: "pouce", paume: "bas", doigts: "dedans" }, visage: "neutre", contact: true },
        { d: { cfg: MOUFLE, at: "poitrine_non", off: [0, 8, 6], paume: "bas-avant", doigts: "dedans" }, t: 180 }
      ]
    },

    /* ============================= FAMILLE ============================= */

    {
      id: "famille", mot: "Famille", theme: "famille", niveau: 1,
      syn: ["la famille", "les proches"],
      desc: "Main ouverte devant toi, doigts écartés et paume vers le bas : referme les doigts en bec en remontant un peu, comme si tu rassemblais tout le monde.",
      astuce: "Tu rassembles tous les membres de la famille dans ta main.",
      fiable: "incertain", source: WS + "Famille",
      images: [
        { d: { cfg: "5", at: "neutre", off: [5, -10, 5], paume: "bas", doigts: "avant" }, visage: "sourire" },
        { d: { cfg: "bec", at: "neutre", off: [5, 8, 5], paume: "bas", doigts: "avant" }, t: 500 }
      ]
    },
    {
      id: "maman", mot: "Maman", theme: "famille", niveau: 1,
      syn: ["mère", "maman", "mam"],
      desc: "Ferme le poing, pouce collé contre l'index, et tape-le deux fois sur ta joue.",
      fiable: "probable", source: WS + "Maman",
      rep: 2,
      images: [
        { d: { cfg: "A", at: "joue_dom", off: [10, 0, 5], paume: "arriere", doigts: "dedans" }, visage: "sourire" },
        { d: { cfg: "A", at: "joue_dom", touch: "jointures", paume: "arriere", doigts: "dedans" }, t: 150, contact: true }
      ]
    },
    {
      id: "papa", mot: "Papa", theme: "famille", niveau: 1,
      syn: ["père", "papa", "pap"],
      desc: "Pouce et index tendus en bec d'oiseau : pose le pouce au coin de ta bouche, puis ouvre et ferme vite les deux doigts.",
      astuce: "Il vient du signe HOMME (la moustache).",
      fiable: "probable", source: WS + "Papa",
      rep: 2,
      images: [
        { d: { cfg: "pince", at: "bouche", off: [16, 0, 0], touch: "pouce", paume: "arriere", doigts: "dehors" }, visage: "sourire", contact: true },
        { d: { cfg: "pince_fermee", at: "bouche", off: [16, 0, 0], touch: "pouce", paume: "arriere", doigts: "dehors" }, t: 140 }
      ]
    },
    {
      id: "parents", mot: "Parents", theme: "famille", niveau: 2,
      syn: ["les parents", "père et mère"],
      desc: "Fais PAPA (bec d'oiseau au coin de la bouche) puis MAMAN (poing qui tape la joue), une seule fois chacun.",
      astuce: "Papa + maman = les parents.",
      fiable: "probable", source: NOTES,
      images: [
        { d: { cfg: "pince", at: "bouche", off: [16, 0, 0], touch: "pouce", paume: "arriere", doigts: "dehors" }, visage: "sourire", contact: true },
        { d: { cfg: "pince_fermee", at: "bouche", off: [16, 0, 0], touch: "pouce", paume: "arriere", doigts: "dehors" }, t: 160 },
        { d: { cfg: "A", at: "joue_dom", off: [10, 0, 5], paume: "arriere", doigts: "dedans" }, t: 300 },
        { d: { cfg: "A", at: "joue_dom", touch: "jointures", paume: "arriere", doigts: "dedans" }, t: 160, contact: true }
      ]
    },
    {
      id: "frere", mot: "Frère", theme: "famille", niveau: 1,
      syn: ["frangin", "grand frère", "petit frère"],
      desc: "Fais la lettre F avec tes deux mains (pouce et index en rond, les autres doigts tendus) et fais-les se toucher deux fois devant toi.",
      astuce: "F comme Frère.",
      fiable: "probable", source: WS + "Fr%C3%A8re",
      sym: true, rep: 2,
      images: [
        { d: { cfg: "F", at: "neutre", off: [25, 0, 0], paume: "bas", doigts: "avant" }, visage: "neutre" },
        { d: { cfg: "F", at: "neutre", off: [4, 0, 0], paume: "bas", doigts: "avant" }, t: 220, contact: "deux" }
      ]
    },
    {
      id: "soeur", mot: "Sœur", theme: "famille", niveau: 1,
      syn: ["soeur", "frangine", "grande sœur", "petite sœur"],
      desc: "Fais la lettre S avec tes deux mains (poings fermés) et fais-les se toucher deux fois devant toi.",
      astuce: "S comme Sœur ; même geste que FRÈRE avec une autre lettre.",
      fiable: "probable", source: WS + "S%C5%93ur",
      sym: true, rep: 2,
      images: [
        { d: { cfg: "poing", at: "neutre", off: [25, 0, 0], paume: "bas", doigts: "avant" }, visage: "neutre" },
        { d: { cfg: "poing", at: "neutre", off: [5, 0, 0], paume: "bas", doigts: "avant" }, t: 220, contact: "deux" }
      ]
    },
    {
      id: "grand-mere", mot: "Grand-mère", theme: "famille", niveau: 2,
      syn: ["mamie", "mémé", "grand-maman"],
      desc: "Fais MAMAN (poing qui tape la joue), puis VIEUX : ton poing tient une longue barbe sous ton menton et descend.",
      astuce: "« Vieille maman » : maman + vieux.",
      fiable: "probable", source: WS + "Grand-m%C3%A8re",
      images: [
        { d: { cfg: "A", at: "joue_dom", off: [10, 0, 5], paume: "arriere", doigts: "dedans" }, visage: "sourire" },
        { d: { cfg: "A", at: "joue_dom", touch: "jointures", paume: "arriere", doigts: "dedans" }, t: 160, contact: true },
        { d: { cfg: "poing", at: "menton", off: [0, -6, 6], touch: "pouce", paume: "arriere", doigts: "dedans" }, t: 300, contact: true },
        { d: { cfg: "poing", at: "menton", off: [0, -40, 14], paume: "arriere", doigts: "dedans" }, t: 450 }
      ]
    },
    {
      id: "grand-pere", mot: "Grand-père", theme: "famille", niveau: 2,
      syn: ["papi", "pépé", "grand-papa"],
      desc: "Fais PAPA (bec d'oiseau au coin de la bouche), puis VIEUX : ton poing tient une longue barbe sous ton menton et descend.",
      astuce: "« Vieux papa » : papa + vieux.",
      fiable: "probable", source: WS + "Grand-p%C3%A8re",
      images: [
        { d: { cfg: "pince", at: "bouche", off: [16, 0, 0], touch: "pouce", paume: "arriere", doigts: "dehors" }, visage: "sourire", contact: true },
        { d: { cfg: "pince_fermee", at: "bouche", off: [16, 0, 0], touch: "pouce", paume: "arriere", doigts: "dehors" }, t: 160 },
        { d: { cfg: "poing", at: "menton", off: [0, -6, 6], touch: "pouce", paume: "arriere", doigts: "dedans" }, t: 300, contact: true },
        { d: { cfg: "poing", at: "menton", off: [0, -40, 14], paume: "arriere", doigts: "dedans" }, t: 450 }
      ]
    },
    {
      id: "marie", mot: "Marié(e)", theme: "famille", niveau: 2,
      syn: ["marié", "mariée", "mari", "épouse", "mariage", "se marier"],
      desc: "Ta main gauche est ouverte, paume vers le bas. Avec le pouce et l'index de ta main droite, fais bouger un peu l'anneau imaginaire de l'annulaire gauche.",
      astuce: "Tu touches l'alliance.",
      fiable: "probable", source: WS + "Mari%C3%A9",
      rep: 2,
      images: [
        { d: { cfg: "pince_fermee", at: "nd:jointures", off: [0, 6, 0], paume: "dedans", doigts: "bas" },
          nd: { cfg: "5", at: "neutre", paume: "bas", doigts: "dedans" }, visage: "sourire", contact: true },
        { d: { cfg: "pince_fermee", at: "nd:jointures", off: [0, 6, 8], paume: "dedans", doigts: "bas" }, t: 180 }
      ]
    }

  ]);
})();
