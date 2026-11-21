# Recherche : école, maison, objets, vêtements, couleurs

Fichier de données : `js/data/ecole-maison.js` (47 signes).

## Sources utilisées

1. **Chaîne YouTube « Dicoplus LSF »** (@DicoplusLSF, dictionnaire dicoplus.fr, site hors ligne).
   Chaque vidéo « Signer X en LSF… Apprendre la LSF par configuration » a une **description écrite
   structurée** : main dominante (configuration + orientation), main dominée, emplacement,
   mouvement, expression, nombre de répétitions. C'est la source principale. Pour chaque signe, l'URL de
   la vidéo est dans `source`.
2. **Livret de cours LSF, cypris.fr** : https://cypris.fr/solidarite/LSF.pdf (notes d'un apprenant
   après 5 cours, illustrations reprises d'Elix et du Comité Handisport de la Nièvre). Il donne une
   description écrite pour les couleurs, maison, clé, montre, table, cadeau, crayon, dessiner, cuisiner,
   vacances, etc.
3. **Anna Sign Language** (dictionnaire LSF) : stylo, cahier.
   https://www.annasignlanguage.com/fr/dictionnaire-lsf/stylo-en-lsf ,
   https://www.annasignlanguage.com/fr/dictionnaire-lsf/cahier-en-lsf
4. Pour vérifier : clic-campus.fr (maison = toit, argent = frotter les doigts, livre = mains qui
   s'ouvrent), walter-learning.com (maison, cuisine, table).
5. Elix (dico.elix-lsf.fr) : seulement des vidéos, aucune description écrite. Utilisé comme source
   uniquement pour « porte » (signe iconique, non vérifié par écrit).

## Règle de fiabilité appliquée

- `sur` : description écrite claire, confirmée par au moins 2 sources (Dicoplus + cypris/autre).
- `probable` : une source écrite claire, ou deux sources proches mais avec de petites différences.
- `incertain` : la source est floue ou se contredit, ou j'ai dû interpréter beaucoup la description.

## Notes par signe

| id | Source(s) | Remarques |
|---|---|---|
| ecole | Dicoplus (2 vidéos : L / L plié) | 2 mains en L, paumes face à face, aux épaules, de haut en bas. Le sens exact des doigts est déduit. |
| livre | Dicoplus + cypris + clic-campus + Anna (cahier) | Mains jointes qui s'ouvrent. `sur`. |
| cahier | Anna | Elle le décrit comme un livre qu'on ouvre à moitié, avec les petits doigts collés (la reliure). Très proche de « livre ». |
| stylo | Anna + cypris (« écrire ») | Même geste que « écrire » (id `ecrire` déjà dans emotions-verbes.js), donc pas de synonyme « écrire » ici. |
| crayon | cypris | Index qui remue dans le V de l'autre main (taille-crayon). |
| dessiner | cypris | « V retourné » qui ondule le long de la paume. |
| bibliotheque | Dicoplus | Mains plates face à face qui s'écartent. J'ai compris : une rangée de livres. |
| vacances | Dicoplus + cypris | Bras croisés, V qui tapotent les épaules ×2. `sur`. |
| maths | Dicoplus | 2 poings paume vers soi, buste, de haut en bas ×1. Je ne sais pas bien comment les mains se placent l'une par rapport à l'autre : **incertain**. |
| francais | Dicoplus | Main 5 sur la poitrine, vers l'extérieur ×2. |
| maison | Dicoplus + cypris + clic-campus + Walter | Toit, bouts des doigts qui se touchent ×2. `sur`. |
| appartement | Dicoplus | 3 paume en bas, de haut en bas ×2 (les étages). |
| chambre | Dicoplus | 5, paume vers l'extérieur, tape la joue ×3 (j'ai mis le dos de la main contre la joue). |
| cuisine | cypris (« cuisiner ») + Walter | On tourne une cuillère au-dessus de la main en C. |
| douche | Dicoplus | O au-dessus de la tête qui s'ouvre. |
| bain | Dicoplus (2 variantes) | Variante 1 : 5 paumes en bas, de bas en haut. J'ai compris : l'eau qui monte. **incertain**. |
| toilettes | Dicoplus | Lettres W + C. `sur`. |
| table | cypris + Walter | Mains plates qui s'écartent. |
| porte | aucune source écrite | Geste iconique (battant). **incertain**. |
| fenetre | Dicoplus | Mains « H » paume vers soi, de soi vers l'extérieur ×2. Mon idée (deux battants) est une interprétation : **incertain**. |
| habiter | Dicoplus | 2 « pouce devant » paume vers l'extérieur, de haut en bas. |
| jardin | Dicoplus | 2 V paume vers soi qui se tapent ×3 : le sens n'est pas clair. **incertain**. |
| ascenseur | Dicoplus (3 variantes) | Variante choisie : 2 poings A qui montent. **incertain**. |
| argent | Dicoplus (variante 3) + clic-campus + cypris | Frotter le pouce sur les doigts. `sur`. Dicoplus a aussi 2 variantes avec les poings. |
| cadeau | Dicoplus + cypris | Index en croix (un monte, l'autre descend). |
| lunettes | Dicoplus | « Pince ronde » autour des yeux ×2 (config sur mesure : index courbé + pouce écarté). |
| montre | cypris | Index + majeur tapent le poignet. |
| cle | cypris | On tourne une clé imaginaire (config T). |
| assiette | Dicoplus | 2 becs ouverts qui dessinent un cercle. Le plan (à plat ou debout) est deviné : **incertain**. |
| bougie | Dicoplus | U au-dessus d'un poing S, petit va-et-vient. **incertain**. |
| vetements | Dicoplus (« s'habiller ») + clic-campus | Les mains descendent le long du torse. |
| chaussures | Dicoplus (3 variantes) | Variante choisie : 2 poings paume en bas qui se tapent ×2. |
| manteau | Dicoplus | Poings aux épaules qui se rejoignent. |
| bonnet | Dicoplus | Poings de chaque côté de la tête, de haut en bas. |
| chemise | Dicoplus | L au cou vers l'extérieur (le col) : **incertain**. |
| pyjama | Dicoplus | Signe composé VÊTEMENT + CHAMBRE. |
| botte | Dicoplus | C qui glisse du poignet au coude de l'autre main. |
| couleur | Dicoplus | 5 à la joue, doigts qui remuent vers la bouche. |
| rouge | Dicoplus (2 vidéos) + cypris | Index qui tape la lèvre du bas. cypris dit « majeur » ; j'ai gardé l'index (Dicoplus). |
| bleu | Dicoplus (2 vidéos) + cypris | B près de l'épaule, doigts qui se plient ×2. Une 3e vidéo Dicoplus montre une autre variante (L plié à la tempe). |
| vert | cypris (V qui se plie ×2) | Dicoplus dit « X, taper dans le vide ×2 » : même mouvement, configuration différente → `probable`. |
| jaune | Dicoplus + cypris | J (auriculaire) au coin de la bouche, vers l'extérieur. `sur`. |
| noir | Dicoplus + cypris | U/N qui glisse sur le front de gauche à droite. `sur`. |
| blanc | Dicoplus + cypris | La main part du cou et s'ouvre (« bouton qui éclate »). |
| marron | Dicoplus (2 variantes) + cypris | Main au menton qui se balance / tourne. |
| violet | cypris | V de l'épaule à la hanche opposée (ceinture de sécurité). Une autre page (stfuscientt.free.fr, inaccessible) parle d'un V sur le front : **incertain**. |
| orange-couleur | cypris | Main en soleil au-dessus de la tempe. Dicoplus « ORANGE » (2 mains en C, une sphère) semble être le **fruit**. **incertain**. |

## Signes non faits (pas de source fiable)

collège, lycée, classe, professeur (existe déjà dans salutations-famille.js), élève, cours, devoirs,
examen, note, récréation, cantine, anglais, histoire, sport (déjà dans temps-loisirs.js), lit, chaise,
sac, pantalon, robe, t-shirt, chapeau, casquette, rose, gris (cypris donne un poing avec le **majeur**
tendu, ce qui ressemble à un geste grossier, donc je ne l'ai pas mis), chaussettes (ça se fait au genou,
et cet endroit n'existe pas).

Doublons évités : `apprendre`, `lire`, `ecrire` et `travailler` existent déjà dans emotions-verbes.js.
Je les ai retirés de ce fichier.
