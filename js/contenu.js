/* Textes du site : culture sourde, petits textes de l'interface, badges. */
(function () {
  'use strict';
  const CULTURE = [
    {
      id: 'histoire', onglet: 'Histoire', titre: "L'histoire de la LSF",
      chapo: 'La LSF a une longue histoire, faite de belles avancées et de grandes injustices.',
      corps: `Au XVIIIe siècle, l'abbé de l'Épée ouvre à Paris une école pour enfants sourds. Il observe les signes que les Sourds utilisent entre eux et s'en sert pour enseigner. L'école de Paris devient ensuite un lieu important pour la langue des signes.

En 1880, le Congrès de Milan réunit des éducateurs, en grande majorité entendants. Ils décident de privilégier l'oral. Peu après, les langues des signes sont écartées de l'enseignement dans beaucoup de pays, dont la France. Pendant près d'un siècle, des enfants sourds ont été empêchés de signer en classe.

La LSF a pourtant continué à vivre dans la communauté sourde.

Dans les années 1970, le « Réveil sourd » change les choses. Des Sourds reprennent la parole et défendent leur langue et leur culture. La LSF redevient visible.

Le 11 février 2005, une loi reconnaît la LSF comme une langue à part entière.`
    },
    {
      id: 'culture', onglet: 'Communauté', titre: 'La culture sourde',
      chapo: "Pour beaucoup de personnes sourdes, être Sourd, ce n'est pas un manque. C'est une identité.",
      corps: `On écrit « Sourd » avec une majuscule pour parler de cette identité culturelle : une langue (la LSF), une histoire et une communauté. On écrit « sourd » avec une minuscule pour parler de la surdité au sens médical.

- **La communauté** : associations, sorties, événements, amitiés. On s'y retrouve entre Sourds, et les entendants qui signent y sont les bienvenus.
- **L'humour** : il joue souvent avec le visuel, les expressions du visage et les signes.
- **La fierté** : beaucoup de Sourds sont fiers de leur langue et de leur histoire.
- **Les noms-signes** : chaque personne a un signe qui la désigne.

Évite de dire « sourd-muet ». Beaucoup de personnes sourdes peuvent s'exprimer, en signant ou autrement. Le mot est donc inexact, et il est souvent mal perçu. Dis plutôt « sourd », « Sourd » ou « malentendant », selon ce que la personne préfère.`
    },
    {
      id: 'conseils', onglet: 'Conseils', titre: 'Parler avec une personne sourde',
      chapo: "Quelques gestes simples rendent l'échange beaucoup plus facile.",
      corps: `- **Attirer l'attention** : touche doucement l'épaule, fais un signe de la main dans son champ de vision ou tape sur la table. Ne tire pas sur ses vêtements.
- **Te placer** : mets-toi face à elle, avec la lumière sur ton visage et non dans ton dos.
- **Parler** : ne crie pas. Articule normalement, sans exagérer, car cela déforme les lèvres.
- **Ta bouche** : ne la cache pas avec ta main, tes cheveux ou un objet.
- **Être patiente** : répète autrement si besoin, utilise des gestes, écris ou montre sur un téléphone.
- **Avec un interprète** : regarde et parle à la personne sourde, pas à l'interprète.

Si tu n'es pas sûre, demande simplement : « Comment est-ce plus simple pour toi ? » Les personnes sourdes n'ont pas toutes les mêmes préférences.`
    },
    {
      id: 'grammaire', onglet: 'Grammaire', titre: 'La grammaire de la LSF en bref',
      chapo: "La LSF n'est pas du français signé. C'est une langue avec sa propre grammaire.",
      corps: `- **Le visage compte** : les expressions du visage font partie de la grammaire, pas seulement des émotions.
- **L'ordre** : souvent, on donne d'abord le temps, puis le lieu, les personnes et enfin l'action.
- **L'espace** : on place les personnes et les choses devant soi, puis on s'y réfère.
- **Les questions** : elles se marquent notamment avec les sourcils et le regard.
- **La dactylologie** : l'alphabet manuel sert surtout pour les noms propres.

Chaque signe se décrit avec 5 paramètres :

1. la configuration de la main
2. l'emplacement
3. le mouvement
4. l'orientation
5. l'expression du visage

Changer un seul paramètre peut changer le sens du signe.`
    },
    {
      id: 'nom-signe', onglet: 'Nom-signe', titre: 'Le nom-signe',
      chapo: "Le nom-signe est le signe qui désigne une personne dans la communauté sourde. C'est un peu comme un prénom en LSF.",
      corps: `Il ne remplace pas ton prénom, que tu peux toujours épeler avec l'alphabet manuel. Mais dans la communauté, c'est souvent ce signe qu'on utilise pour parler de toi.

Le plus important : on ne se donne pas son nom-signe soi-même. Ce sont des personnes sourdes, ou des personnes de la communauté, qui le donnent.

Il est souvent choisi à partir d'un trait de la personne : un détail physique, un geste habituel, un goût ou une particularité. La lettre de son prénom peut aussi servir. Le choix dépend des habitudes de chaque communauté.

Si tu n'en as pas encore, patience. Cela viendra peut-être au fil de tes rencontres.`
    }
  ];

  const TEXTES = {
    accueil_titre: 'Salut Maëlle !',
    accueil_sous_titre: "Prête à signer un peu aujourd'hui ?",
    signe_du_jour: 'Signe du jour',
    continuer_lecon: 'Continuer la leçon',
    serie_jours: 'Série : {n} jours de suite',
    aucune_serie: "Pas encore de série. Fais une leçon aujourd'hui pour commencer !",
    recherche_placeholder: 'Cherche un signe (ex. : bonjour)',
    recherche_vide: 'Aucun résultat. Essaie un autre mot ou un mot proche.',
    favoris_vide: "Tu n'as pas encore de favoris. Touche le cœur sur un signe pour l'ajouter.",
    difficiles_vide: "Aucun signe difficile pour l'instant. Continue comme ça !",
    lecon_terminee: 'Leçon terminée ! Tu gagnes {xp} XP.',
    quiz_bravo: ['Bravo, bonne réponse !', "Super, tu l'as !", 'Exact, bien joué !'],
    quiz_rate: ["Pas tout à fait, mais tu y es presque !", "Ce n'est pas grave, on apprend en se trompant.", "Raté cette fois, tu l'auras la prochaine fois !"],
    niveau_desc: [
      "Pour commencer : l'alphabet, les nombres et les signes de tous les jours.",
      'Pour aller plus loin : de nouveaux thèmes et des phrases simples.',
      "Pour bien t'entraîner : des signes plus variés et des défis."
    ],
    revision_vide: 'Rien à réviser pour le moment. Reviens plus tard !',
    export_ok: 'Ta progression a bien été exportée.',
    import_ok: 'Ta progression a bien été importée.',
    import_erreur: "Impossible d'importer ce fichier. Vérifie que c'est le bon.",
    reset_confirm: 'Veux-tu vraiment tout effacer ? Ta progression sera perdue.',
    verifier_elix: 'Vérifier ce signe sur Elix',
    avertissement_dessins: 'Les dessins sont une aide pour apprendre : en cas de doute, vérifie le signe sur Elix ou demande à une personne sourde ou à ton professeur.'
  };

  const BADGES = [
    { id: 'premiere_lecon', nom: 'Premier pas', desc: 'Tu as terminé ta première leçon.' },
    { id: 'signes_10', nom: "Dix, c'est parti", desc: 'Tu as appris 10 signes.' },
    { id: 'signes_50', nom: 'Cinquante et ça continue', desc: 'Tu as appris 50 signes.' },
    { id: 'signes_100', nom: 'Centurion des signes', desc: 'Tu as appris 100 signes.' },
    { id: 'signes_250', nom: 'Mains de légende', desc: 'Tu as appris 250 signes.' },
    { id: 'alphabet_maitre', nom: "Reine de l'alphabet", desc: "Tu maîtrises tout l'alphabet manuel." },
    { id: 'nombres_maitre', nom: 'Pro des chiffres', desc: 'Tu maîtrises les nombres.' },
    { id: 'serie_3', nom: 'Trois jours, trois fois bravo', desc: 'Tu as appris 3 jours de suite.' },
    { id: 'serie_7', nom: 'Semaine en feu', desc: 'Tu as appris 7 jours de suite.' },
    { id: 'serie_30', nom: 'Mois de folie', desc: 'Tu as appris 30 jours de suite.' },
    { id: 'quiz_parfaits_10', nom: 'Sans faute', desc: 'Tu as réussi 10 quiz parfaits.' },
    { id: 'defi_chrono_20', nom: 'Mains rapides', desc: 'Tu as fait 20 points ou plus au défi chronométré.' }
  ];

  // Mots pour l'entraînement à la dactylologie
  const MOTS_DACTYLO = ['maelle', 'salut', 'paris', 'lyon', 'chat', 'ecole', 'ami', 'film', 'jeu', 'pizza', 'merci', 'bravo', 'sourd', 'main', 'signe', 'lune', 'soleil', 'mer', 'velo', 'zebre', 'kiwi', 'yaourt', 'jupe', 'quiz', 'hiver', 'lea', 'emma', 'jade', 'louis', 'hugo', 'nina', 'tom', 'zoe', 'noah', 'ines', 'sacha', 'bus', 'gare', 'fete', 'danse'];

  window.LSFContenu = { CULTURE, TEXTES, BADGES, MOTS_DACTYLO };
})();
