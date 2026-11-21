# Recherche : js/data/extra-monde.js (59 signes)

Date : 2026-11-19. Chercheur B.

## Limite principale (à lire d'abord)

Je n'ai trouvé AUCUNE description écrite fiable du geste pour ces mots.
- Dico Elix (https://dico.elix-lsf.fr/dictionnaire/<mot>) : j'ai ouvert chaque page. Elle confirme que le mot existe en LSF et propose une vidéo, mais ne contient aucun texte décrivant le geste. Je n'ai pas pu voir les vidéos.
- Pause LSF (pauselsf.fr/signs/...) : la plupart des pages testées (gare, hôpital, lune, moto, danse, feu) donnent une erreur 404 ; la page télévision a une rubrique "Description" vide ; seule "maintenant" (déjà utilisée par les autres fichiers) a un texte.
- LSF Wikisign : les pages testées (gare : 404 ; hôpital : seulement le nom de la configuration de main).
- PDF (fftir "signes et sports", cypris LSF.pdf, Lyla Signes imagier animaux, serris livret) : illisibles ici (images/flux compressés, ou fichier trop gros). Dumas (HAL) : accès refusé. Walter-learning, sematos.eu, Rochester LSF-ASL : pas de description écrite pour ces mots.

Conséquence : les descriptions (desc / images) ont été composées à partir de gestes iconiques que je connais ou que j'ai reconstitués (forme de l'objet, outil utilisé, etc.), SANS les confronter à une vidéo. Les 59 signes sont donc marqués fiable: "incertain". Il faut les faire relire par une personne qui connaît la LSF, ou comparer à la vidéo Elix de chaque page source. Plusieurs variantes régionales existent probablement.

La champ `source` pointe vers la page Elix du mot (existence de l'entrée vérifiée), pas vers une description textuelle.

## Signes par thème (id : source Elix, remarque)

Toutes les sources sont de la forme https://dico.elix-lsf.fr/dictionnaire/<mot> (accents encodés).

Lieux
- gare : entrée existe, vidéo présente. Geste = train (V) + toit : reconstitué, doute.
- hopital : entrée existe (2 sens). Croix sur le bras : reconstitué.
- mairie : entrée existe (3 sens). Écharpe de maire : reconstitué, doute fort.
- eglise : entrée existe. Signe de croix : reconstitué (le sens Elix cité est "assemblée des chrétiens", pas le bâtiment).
- rue : entrée existe. Deux rangées de maisons : reconstitué.
- hotel : entrée existe. Maison + dormir : reconstitué.
- banque : entrée existe. Argent + toit : reconstitué.
- pharmacie : entrée existe. Croix sur la paume : reconstitué.

Transports
- moto (guidon), camion (grand volant), tramway (V + fil), route, taxi (volant + bras levé) : entrées existent ; gestes reconstitués. Camion/taxi/chauffeur reprennent le volant de "voiture" (déjà dans temps-loisirs.js).

Nature
- lune (C en croissant), feu (flammes ; la vidéo Elix de "feu" est absente), rivière, île (main qui entoure le poing), volcan : entrées existent ; gestes reconstitués.

Animaux
- ours, girafe, tigre, requin, abeille, mouche, crocodile, dauphin : entrées existent ; gestes reconstitués (cou long, rayures, aileron, piqûre, mâchoire...). Tigre et ours sont particulièrement incertains.

Météo
- brouillard, glace (gel), température : entrées existent ; gestes reconstitués.

Calendrier
- printemps, hiver (vidéo Elix absente), noel, date : entrées existent ; gestes reconstitués. Printemps = plante qui pousse (je n'ai rien trouvé de LSF ; le seul texte trouvé décrivait la BSL britannique, non utilisé).

Temps
- longtemps, futur : entrées existent ; gestes reconstitués. (Le mot "été" n'a pas pu être vérifié : la page Elix a renvoyé "être". Je l'ai donc laissé de côté. Idem "tôt" et "tard" : entrées existent mais sans vidéo, laissés de côté.)

Sports
- ski, rugby, course, judo, golf, equipe : entrées existent ; gestes reconstitués.

Loisirs
- danse, theatre, fete, pecher, camping : entrées existent ; gestes reconstitués.

Techno
- television, ecran, radio, imprimante, clavier, application : entrées existent ; gestes reconstitués.

Métiers (thème personnes)
- pompier, policier, infirmier, boulanger, facteur, chauffeur : entrées existent ; gestes reconstitués. (L'entrée "infirmier" n'a pas été distinguée de "infirmière".)

Couleurs
- gris : entrée existe (certains sens sans vidéo). Geste reconstitué. Pas d'autre couleur nouvelle : rose est déjà un synonyme de "fleur" dans nourriture-nature.js.

## Doublons évités

Mots écartés parce qu'ils existent déjà (id, mot ou syn) : forêt (syn de arbre), piscine (syn de natation), plage (syn de mer), tempête/éclair/tonnerre (syn de orage), rose (syn de fleur), chocolat/marron, vidéo (syn de film), conduire (syn de voiture), bientôt (syn de à bientôt), tapotement de montre, etc.
Quelques synonymes de mes signes recoupent des synonymes existants sans être identiques à un mot : "plus tard" (futur, aussi dans après / tout à l'heure), "saison" (printemps, hiver, aussi dans automne), "chemin" (rue, route). Ce n'est pas bloquant pour la recherche, mais le relecteur peut les retirer.

## Points techniques à vérifier par le relecteur

- Pas de node ici : la syntaxe n'a pas été testée automatiquement. Relu à la main (virgules, guillemets doubles pour les apostrophes).
- Les mots non listés dans notes/format-signes.md n'ont pas été utilisés (par ex. pas de "hanche", ni "nd:coude").
- sym: true est utilisé pour : rue, feu, volcan, ours, tigre, brouillard, noel, ski, judo, equipe, fete, clavier, gris, hiver. Dans volcan, la dernière image remet nd à "repos" explicitement.
- Les mains "nd" explicites (visage, etc.) servent quand les deux mains font des gestes différents ou le même geste sans symétrie.
