# Recherche : alphabet dactylologique LSF + nombres

Fichier de données : `js/data/alphabet-nombres.js` (56 signes : 26 lettres, 30 nombres).

## Sources

1. **Wikipédia FR, « Alphabet dactylologique »**, section « Alphabet de la Lsf »
   https://fr.wikipedia.org/wiki/Alphabet_dactylologique
   26 photos `LSF_LettreA.jpg` … `LSF_LettreZ.jpg` (Wikimedia Commons). **Le signeur est gaucher** : on a donc appliqué
   le miroir pour un droitier. Les flèches sur J, P et Z indiquent le mouvement.
2. **Wikipédia EN, « French manual alphabet »** : https://en.wikipedia.org/wiki/French_manual_alphabet
   Légendes textuelles des mêmes photos (comparaison avec l'ASL) : A = poing, pouce écarté sur le côté ;
   F = doigts écartés, pouce contre l'extérieur de l'index ; G = G de l'ASL pointé vers le haut ;
   H = main « cornes » ; J = Y qui pivote ; M et N = doigts à plat pointés sur le côté, dos de la main vers
   la personne en face ; P = P de l'ASL qui « hoche » vers le bas ; T = comme le F mais pouce à l'intérieur
   de l'index ; X = V aux deux doigts crochus.
3. **Glossa (article comparatif ASL/LSF)** : 8 lettres très différentes de l'ASL : A, F, G, H, M, N, P, T.
   https://glossa.fr/index.php/glossa/article/download/626/620/604
4. **Dico Elix** (vidéos LSF, une par lettre et par nombre) : `https://dico.elix-lsf.fr/dictionnaire/<mot>`.
   J'ai regardé des images extraites des vidéos (`…/spip_videos/<lettre>_nm_1_1.mp4`, `m_alpha_1_1.mp4`, etc.)
   pour vérifier les lettres et pour **tous** les nombres. C'est l'URL mise dans `source`.

Chaque lettre a donc été vérifiée avec 2 sources indépendantes (photos Wikipédia et vidéo Elix), sauf
quelques détails de mouvement (voir les doutes).

## Lettres : ce qui a été vérifié

| Lettre | Forme retenue (main droite) | Accord des sources |
|---|---|---|
| A | poing, pouce tendu sur le côté vers l'intérieur (`pouce`, paume avant, doigts haut) | Wiki + Elix : sur |
| B | `B` | sur |
| C | `C` de profil | sur |
| D | `D` de profil | sur |
| E | doigts en crochet, pouce replié **sans** contact (cfg sur mesure) | Wiki + Elix ; forme exacte du pouce : probable |
| F | `F` (pouce contre l'extérieur de l'index, 3 doigts écartés) | sur |
| G | index en haut + pouce levé parallèle (cfg sur mesure `pouce: "cote"`) | position exacte du pouce : probable |
| H | `corne` (index + auriculaire) | sur |
| I | `I` | sur |
| J | `Y` qui pivote, petit doigt de « dedans » vers « dedans-bas » | voir doute |
| K | `K` | sur |
| L | `L` | sur |
| M | `M` couché : doigts vers l'intérieur, dos de la main vers l'avant | Wiki + Elix : sur |
| N | `U` couché, même orientation que M | sur |
| O | `O` de profil | sur |
| P | `K` puis le poignet plie vers l'avant-bas | voir doute |
| Q | G pointé vers le bas, de profil | probable |
| R | `R` | sur |
| S | `poing` (pouce devant les doigts) | sur |
| T | 3 doigts écartés, index plié à la base, pouce qui le touche par-dessous (cfg sur mesure) | Wiki + Elix ; probable |
| U, V, W, Y | cfg du même nom | sur |
| X | `V_plie` | sur |
| Z | index qui trace un Z | voir doute |

## Nombres : ce qui a été vérifié (images extraites des vidéos Elix)

- **1 à 5** : 1 = pouce, 2 = pouce + index, 3 = pouce + index + majeur, 4 = quatre doigts sans le pouce, 5 = main ouverte.
- **6 à 9** (deux mains) : main gauche en 5, main droite en 1, 2, 3 ou 4 (vu dans les vidéos Elix six, sept, huit, neuf [vidéo `neuf_adj_3_1`]).
- **10** : les deux mains ouvertes, paumes vers l'avant, petite rotation des poignets (Elix `dix_nm_1_1`).
- **11 à 15** : la forme de 1 à 5 avec une rotation du poignet (vu pour onze, douze, treize, quatorze, quinze).
- **16 à 19** : 10 (deux mains ouvertes) puis 6 à 9 (vu pour seize et dix-sept).
- **20 à 50** : la forme du chiffre, puis les doigts tendus se plient (vers le pouce pour 20 et 30 ; en crochet pour 40, 50).
- **60 à 90** : la forme de 6 à 9 (deux mains), puis les doigts de la main droite se plient. Pour 70, la vidéo Elix
  `soixante-dix_adjetn_1_2` montre bien « 7 qui se plie » ; la variante `_1_1` semble montrer autre chose (peut-être 60 + 10).
- **0** : main en O. **100** : main en C qui monte vers l'extérieur. **1000** : main droite plate qui vient toucher
  la paume de la main gauche verticale.

## Doutes

- **J** : les deux sources montrent un Y qui tourne dans le plan du visage, mais pas dans le même sens
  (photo Wikipédia : le petit doigt part vers l'extérieur et finit en haut ; vidéo Elix : le petit doigt part
  vers l'intérieur et descend). J'ai suivi Elix. → `probable`.
- **P** : forme de K + petit « hochement » vers le bas. La forme exacte (K ou index/majeur serrés) est difficile
  à voir sur les petites images. → `probable`.
- **Z** : la vidéo est très rapide ; j'ai retenu un Z écrit du point de vue du signeur (comme en ASL). → `probable`.
- **E** : pouce replié sous les doigts, sans contact (Wikipédia : « thumb does not touch fingers »). Le cfg
  `E` de la spec (doigts posés sur le pouce) ne convient pas exactement, d'où le cfg sur mesure.
- **Nombres 11-15** : le sens exact de la rotation est estimé (paume vers l'avant → paume vers soi). → `probable`.
- **Dizaines** : une seule flexion des doigts dans les vidéos ; certains signeurs la répètent peut-être. → `probable`.
- **60** : on voit le pouce droit se replier ; image peu nette. → `probable`.
- **100** : mouvement lu sur des images basse résolution (C devant la poitrine qui monte vers l'épaule). → `incertain`.
- **1000** : un seul contact retenu ; peut-être un double tapotement. → `probable`.
- **Endroit de l'alphabet** : dans les vidéos Elix, les lettres sont faites assez haut, à côté du visage
  (hauteur du menton). L'endroit `dactylo` de la spec (à côté de l'épaule) convient à peu près.
