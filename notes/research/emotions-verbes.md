# Recherche : émotions, verbes, adjectifs

Fichier de données : `js/data/emotions-verbes.js`. Il contient 63 signes : 16 émotions, 32 verbes et 15 adjectifs.

## Le problème des sources

Presque tous les dictionnaires LSF en ligne (Elix, Sematos, Spread the Sign) ne donnent **que des vidéos**,
sans description écrite. WebFetch ne peut pas regarder une vidéo. J'ai donc cherché des textes qui
**décrivent** les signes (configuration, emplacement, orientation, mouvement). J'en ai trouvé quatre :

1. **Mémoire de Sophie Grindatto** (comparaison LSF / langue des signes irlandaise, avec un tableau par champ
   sémantique : configuration, emplacement, orientation de la paume, mouvement).
   https://dumas.ccsd.cnrs.fr/dumas-00670448/document
   - Sentiments : aimer, content et ne pas aimer = main plate, paume vers soi, au niveau du cœur ou de la poitrine.
     « Aimer » monte, « ne pas aimer » descend et « content » tourne en cercle. « Amour » et « malheureux » = bec
     fermé devant soi, mouvement circulaire, avec la paume vers le bas pour « amour » et vers le haut pour
     « malheureux ». « Triste » et « en colère » = 5 plié : « triste » descend devant le visage, « colère » monte
     sur la poitrine. « Déçu » = 5 au niveau de la bouche ou du menton, vers le bas.
   - Esprit : savoir et connaître = main en « angle droit » au front. « Savoir » a la paume vers le bas et descend.
     « Connaître » a la paume vers soi et tape. « Comprendre » se fait au front : les doigts s'ouvrent et se
     referment. « Apprendre » = bec fermé au front, vers le haut. « Décider » = moufle (main plate), devant le
     torse, sur la tranche, vers le bas. « Rêver » = R au front, en cercle, vers le haut. « Intelligent » = index
     au front, paume vers le bas, en cercle.
   - Vue : regarder = voir = un seul signe. C'est un V, paume vers le bas, avec une rotation du poignet : le bout
     des doigts part face aux yeux et finit face à l'avant. « Lire » = V au-dessus de la main gauche plate (la
     page), de gauche à droite.
   - Physique : beau = bec de canard au menton, les doigts se ferment et la main descend. « Moche » = 5 plié
     devant le visage, en cercle. « Vieux » = S (poing) au menton. « Jeune » = J sur le torse, vers le haut.
     « Mignon » = pince fermée sur la joue.
   - Caractère : timide = « majeur » sur la joue, paume vers soi, geste de caresse vers le haut. Le texte de la
     configuration est en partie illisible dans le PDF.
   - Météo : froid = bec de canard, paume vers soi, mouvement vers la gauche. « Chaud » = 5 plié.
2. **Livret USEP « Signes Sport et Santé »**, avec une description écrite sous chaque photo.
   https://usep94.fr/telechargements/telechargements_generaux/HANDICAP%20ET%20SPORT%20SCOLAIRE/08%20Langue%20des%20signes.pdf
   - Avoir peur : doigts écartés, la main se plaque sur le torse. Être en colère : en remontant le long du torse,
     les mains tournent vers le haut. Être triste : la main descend du haut du visage jusqu'au menton. Être content :
     rotation au niveau du torse. Se sentir bien : pouce relevé. Avoir chaud : main en C, mouvement horizontal de
     droite à gauche. Avoir froid : main fermée qui passe devant le visage, de droite à gauche. Se reposer : R
     croisés qui viennent se plaquer sur le torse. Rêver : R qui part de la tête vers « l'imaginaire ». Décider :
     mains droites qui descendent d'un coup sec, puis les poignets remontent les doigts. S'habiller : comme on
     enfile une veste. Accepter : mains écartées puis plaquées sur le torse. Plaisir : mains plates qui tournent
     sur le torse. Émotion : mains plates près de la tête, les doigts dansent. Être sale : la main part de sous le
     menton et finit ouverte et à plat.
   - Attention : dans le PDF, le texte est extrait **avant** le titre de chaque fiche. Pour certaines fiches
     (fatigué, propre, communiquer, réfléchir), la description manque ou se retrouve sous la fiche voisine. C'est
     pour cela que « sale » est marqué « probable ».
3. **Articles de Christiane Fournier sur le symbolisme des configurations (revue ACFOS)** : des listes de signes
   par configuration, sans description complète.
   - Poing : pouvoir, être capable, travailler (« le marteau »), la force.
     https://www.acfos.org/wp-content/uploads/base_doc/lsf/poing_revue5.pdf
   - Crochet et griffe : réfléchir (crochet), chercher (double crochet, deux mains symétriques), être en colère
     (griffe), vouloir (griffe, paumes vers le haut).
     https://www.acfos.org/wp-content/uploads/base_doc/lsf/pincecrochet_revue6.pdf
   - Main plate : paumes vers le sol avec un mouvement qui descend = apaisement (calme). Paume vers l'avant =
     attendre, c'est fini. Paume vers le haut = aider, donner. La tranche donne les tailles (grand, petit) et
     « j'en ai ras le bol ».
     https://www.acfos.org/wp-content/uploads/base_doc/lsf/mainplate_revue8.pdf
   - Pouce : se rappeler (pouce en contact avec le front). Le pouce exprime l'importance et le « bien », et
     l'auriculaire l'infériorité.
     https://www.acfos.org/wp-content/uploads/base_doc/lsf/configmain_revue4.pdf
4. **Lyla Signes** (bases) : manger = bec ramené vers la bouche ; boire = pouce tendu vers la bouche.
   https://www.lyla-signes.fr/langue-signes-bases/

Les signes qui n'ont **aucune** source écrite renvoient à la page vidéo Elix
(`https://dico.elix-lsf.fr/dictionnaire/<mot>`). Ils sont décrits de mémoire et marqués **« incertain »**.
Il faut les vérifier en regardant la vidéo Elix.

## Fiabilité

- **sur** (une source écrite claire) : content, triste, en-colere, peur, aimer, ne-pas-aimer, amour, malheureux,
  savoir, connaitre, regarder, lire, rever, decider, se-reposer, manger, boire, beau, moche, super, intelligent,
  chaud, froid.
- **probable** (une source partielle, ou une source plus un signe très iconique) : decu, timide, calme, plaisir,
  emotion, vouloir, pouvoir, comprendre, apprendre, reflechir, se-souvenir, travailler, attendre, chercher,
  donner, finir, marcher, s-habiller, accepter, ecrire, grand, petit, nul, vieux, jeune, mignon, sale, fort.
- **incertain** (de mémoire, à vérifier sur Elix) : fatigue, pleurer, en-avoir-marre, aller, venir, penser, oublier,
  parler, dire, signer, prendre, propre.

## Points à vérifier en priorité (vidéo Elix)

- **fatigue** : j'ai mis les deux mains, bouts des doigts sur le haut de la poitrine, qui tombent. Il existe
  peut-être une autre variante.
- **attendre** : j'ai suivi l'ACFOS (paume vers l'avant). Une variante où les doigts pianotent existe peut-être aussi.
- **comprendre** : je n'ai pas trouvé à quel endroit précis du front se fait l'ouverture et la fermeture des doigts.
- **chaud** : l'emplacement (devant la bouche) est une supposition, car le texte de la source est illisible à cet endroit.
- **timide** : la configuration « majeur » a été traduite par `5_majeur`, avec le bout du majeur qui touche la joue.

## Signes écartés (pas de description fiable trouvée)

Surpris, stressé, jaloux, fier, s'ennuyer, rire, détester, amoureux, avoir, être, faire, dormir, jouer, aider,
trouver, acheter, commencer, partir, rester, courir, danser, chanter, écouter (prudence : culture sourde),
gentil, méchant, drôle, facile, difficile, nouveau, rapide, lent, important, vrai, faux, bon.
Il faudrait les ajouter après avoir vérifié chaque signe dans une vidéo (Elix).

## Remarques pour l'intégration

- Les ids `chaud` et `froid` peuvent entrer en conflit avec un groupe « météo » qui les créerait aussi.
- `regarder` contient « voir » dans ses synonymes : d'après la source, c'est le même signe.
