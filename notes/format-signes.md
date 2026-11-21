# Format des signes (données LSF)

Chaque signe est une petite fiche de données. Le moteur (`js/moteur/`) dessine un personnage 2D
(tête, sourcils, bouche, buste, bras, mains détaillées) et l'anime en passant en douceur d'une
image-clé à la suivante (2, 3, 4… images-clés). Les flèches de mouvement, les traînées, les
« contacts » et les répétitions sont dessinés automatiquement à partir des images-clés.

Le signeur est **droitier** : la main dominante `d` est sa main droite, `nd` sa main gauche.
On voit le personnage de face (comme une personne en face de toi). Le moteur gère le miroir pour
les gauchers : n'écris JAMAIS de données « pour gaucher ».

## Fichier de données

Un fichier par groupe : `js/data/<groupe>.js`. Script classique (pas de module, pas d'import) :

```js
LSF.ajouter([
  { id: "bonjour", mot: "Bonjour", theme: "salutations", niveau: 1, /* … */ },
  { /* … */ }
]);
```

Le fichier doit être du JavaScript valide (vérifie avec `node --check js/data/<groupe>.js`).

## Champs d'un signe

| Champ | Obligatoire | Description |
|---|---|---|
| `id` | oui | identifiant unique, minuscules, sans accent, tirets (`"bonne-nuit"`, `"lettre-a"`, `"nombre-3"`) |
| `mot` | oui | le mot affiché, avec accents et majuscule (`"Bonne nuit"`) |
| `theme` | oui | un des thèmes listés plus bas |
| `niveau` | oui | `1` débutant, `2` intermédiaire, `3` avancé (1 = signes essentiels du quotidien) |
| `desc` | oui | comment faire le signe, 1 à 2 phrases simples en français, tutoiement |
| `astuce` | non | moyen mnémotechnique court (« Comme si tu… ») |
| `syn` | non | synonymes / autres mots qui doivent trouver ce signe dans la recherche |
| `sym` | non | `true` = la main `nd` fait exactement la même chose que `d`, en miroir (signe symétrique). Dans ce cas n'écris pas `nd` |
| `rep` | non | nombre de répétitions du cycle complet (défaut 1). Pour un mouvement aller-retour répété, mets les 2 images-clés et `rep: 2` |
| `fiable` | oui | `"sur"` (source claire), `"probable"` (plusieurs indices concordants), `"incertain"` (variante régionale ou description floue) |
| `source` | oui | URL de la page où tu as trouvé / vérifié le signe |
| `images` | oui | liste des images-clés (au moins 2, sauf lettres statiques : 1 suffit) |

## Image-clé

```js
{
  d:  { cfg: "plate", at: "menton", touch: "doigts", paume: "arriere", doigts: "haut" },
  nd: { cfg: "plate", at: "neutre", paume: "haut", doigts: "avant" },
  t: 450,            // durée (ms) pour arriver à cette image depuis la précédente (défaut 450)
  pause: 0,          // temps d'arrêt (ms) sur cette image (défaut 0)
  visage: "sourire", // expression (voir plus bas), reste active tant qu'on ne la change pas
  bouche: "o",       // forme de bouche facultative
  contact: true,     // petite étoile de contact sur la main d quand elle arrive ici ("nd" ou "deux" possibles)
  arc: 20,           // courbe le trajet depuis l'image précédente (px, + = bombe vers le haut)
  agiter: true       // les doigts frétillent pendant cette étape (pluie, neige, attendre…)
}
```

Règles :
- Si `d` ou `nd` manque dans une image-clé, la main **garde la pose précédente**.
- Si `nd` n'apparaît jamais (et pas de `sym`), la main non dominante reste baissée hors champ.
- Pour faire disparaître une main pendant le signe : `nd: { at: "repos" }`.

## Main : `{ cfg, at, off, touch, paume, doigts }`

- `cfg` : configuration (forme de la main), voir la liste plus bas.
- `at` : endroit (repère du corps ou de l'autre main), voir la liste.
- `off` : décalage `[x, y, z]` en pixels depuis le repère. **x = vers le dehors** de cette main
  (vers la droite du signeur pour `d`, vers sa gauche pour `nd`), **y = vers le haut**, **z = vers
  l'avant** (vers la personne en face). Échelle : la tête fait ~100 px de large, une main ~85 px de long.
- `touch` : quel point de la main est posé sur l'endroit `at` (défaut `"paume"` = centre de la paume).
  Valeurs : `paume`, `dos` (dos de la main), `doigts` (bout des doigts du milieu), `index`, `majeur`,
  `annulaire`, `auriculaire`, `pouce` (bouts de doigt), `tranche` (côté auriculaire de la main),
  `poignet`, `jointures` (articulations à la base des doigts, utile pour le poing).
- `paume` : vers où regarde l'intérieur de la main.
- `doigts` : vers où pointe la main, du poignet vers les jointures (même si les doigts sont pliés,
  ex. poing : c'est la direction des jointures).

Directions (pour `paume` et `doigts`) — **toujours du point de vue du signeur, relatives à chaque main** :
`haut`, `bas`, `avant` (vers la personne en face), `arriere` (vers soi), `dedans` (vers le milieu du
corps), `dehors` (vers l'extérieur de cette main). Combinaisons avec un tiret : `"avant-haut"`,
`"dedans-bas"`. Ou un vecteur `[x, y, z]` dans le même repère (x dehors, y haut, z avant).
`paume` et `doigts` doivent être à peu près perpendiculaires.

Exemples :
- Main « stop » devant soi : `paume: "avant", doigts: "haut"`.
- Main plate qui tapote le ventre : `paume: "arriere", doigts: "dedans"`.
- Main qui montre le ciel avec l'index : `cfg: "index", paume: "avant", doigts: "haut"`.
- Main plate « table », paume vers le bas : `paume: "bas", doigts: "avant"` ou `doigts: "dedans"`.
- Les deux mains face à face : `sym: true` avec `paume: "dedans"`.

Comme `dedans`/`dehors` sont relatifs à chaque main, un signe symétrique utilise les mêmes valeurs
pour les deux mains (c'est ce que fait `sym: true`).

## Endroits (`at`)

Tête : `tete` (dessus), `front`, `front_dom`, `front_non`, `tempe_dom`, `tempe_non`, `oeil_dom`,
`oeil_non`, `nez`, `joue_dom`, `joue_non`, `oreille_dom`, `oreille_non`, `bouche`, `menton`, `cou`.

Corps : `epaule_dom`, `epaule_non`, `poitrine` (milieu), `poitrine_dom`, `poitrine_non`, `coeur`,
`ventre`, `ventre_dom`, `ventre_non`.

Espace devant soi (z ≈ 70 px en avant) : `neutre` (devant la poitrine, l'endroit par défaut des
signes), `neutre_haut` (devant le visage), `neutre_bas` (devant le ventre), `neutre_dom`,
`neutre_non`, `cote_dom` (sur le côté, hauteur épaule), `cote_non`, `loin` (bras tendu devant),
`dactylo` (endroit de l'alphabet : à hauteur du menton, côté dominant, un peu en avant),
`cote_epaule_dom` / `cote_epaule_non` (à côté de l'épaule, à hauteur d'épaule : jours de la semaine, etc.).

Autre main (pour les signes où une main agit sur l'autre) : `nd:paume`, `nd:dos`, `nd:doigts`,
`nd:index`, `nd:pouce`, `nd:poignet`, `nd:tranche`, `nd:jointures`. Ces repères n'existent que pour
la main `d` (elle se place par rapport à la main `nd` de la même image-clé).

`repos` : main baissée hors champ.

Les côtés `_dom` / `_non` : `_dom` = côté de la main dominante (droite du signeur), `_non` = l'autre.
Avec `sym: true`, le moteur échange automatiquement `_dom` ↔ `_non` pour la main `nd`.

## Configurations (`cfg`)

| Nom | Forme |
|---|---|
| `plate` | main plate, doigts serrés, pouce collé le long de l'index |
| `B` | main plate, doigts serrés, pouce replié dans la paume |
| `5` | main ouverte, les 5 doigts écartés |
| `5_courbe` | doigts écartés et légèrement courbés |
| `griffe` | doigts écartés et bien pliés en griffe |
| `5_majeur` | main ouverte écartée, majeur plié vers l'avant |
| `C` | main en C (doigts serrés courbés, pouce en face) |
| `O` | tous les doigts arrondis touchent le pouce (rond) |
| `bec` | doigts tendus serrés dont les bouts touchent le bout du pouce (main en bec) |
| `plate_pliee` | doigts tendus serrés pliés à 90° à la base (main en angle) |
| `poing` | poing fermé, pouce devant les doigts |
| `A` | poing fermé, pouce collé contre le côté de l'index |
| `pouce` | poing fermé, pouce tendu (le « 1 » de la LSF, « super ») |
| `index` | index tendu, autres doigts repliés, pouce sur le majeur |
| `index_crochet` | index en crochet, autres repliés (X) |
| `L` | pouce et index tendus en L (aussi le « 2 » LSF) |
| `pince` | pouce et index presque collés (petit écart), autres repliés |
| `pince_fermee` | bout du pouce et de l'index qui se touchent, autres repliés |
| `F` | pouce et index en rond, les 3 autres doigts tendus écartés |
| `D` | index tendu, les autres doigts arrondis touchent le pouce |
| `V` | index et majeur tendus écartés |
| `V_plie` | V aux doigts crochus |
| `U` | index et majeur tendus serrés |
| `R` | index et majeur croisés |
| `K` | index tendu vers le haut, majeur tendu vers l'avant, pouce entre les deux |
| `3` | pouce, index, majeur tendus (le « 3 » LSF) |
| `W` | index, majeur, annulaire tendus écartés |
| `M` | index, majeur, annulaire tendus serrés, pouce replié |
| `4` | 4 doigts tendus écartés, pouce replié |
| `I` | auriculaire tendu, autres repliés |
| `Y` | pouce et auriculaire tendus |
| `corne` | index et auriculaire tendus |
| `ILY` | pouce, index et auriculaire tendus |
| `E` | doigts pliés posés sur le pouce replié |
| `T` | index plié en crochet, pouce dessous qui le touche, autres repliés |

Configuration sur mesure (si aucune ne convient) :

```js
cfg: { doigts: ["t", "p", "p", "p"], ecart: 0, pouce: "devant" }
```
- `doigts` : index, majeur, annulaire, auriculaire. Codes : `t` tendu, `p` plié (poing), `c` courbé,
  `b` plié à la base (doigt droit en angle), `x` crochet, `o` arrondi (pour toucher le pouce).
- `ecart` : écartement des doigts en degrés (0 serré, 12 écarté).
- `pouce` : `cote` (collé le long de l'index), `ecarte` (comme dans L), `replie` (dans la paume),
  `devant` (devant les doigts pliés), `A` (contre le côté du poing), `haut` (tendu, « super »),
  `touche_index`, `touche_majeur`, `touche_tous`, `entre` (entre index et majeur).

## Visage

`visage` : `neutre`, `sourire`, `joie`, `triste`, `surpris`, `question` (question fermée oui/non :
sourcils levés), `interrogatif` (qui, quoi, où… : sourcils froncés), `colere`, `degout`, `peur`,
`fatigue`, `concentre`, `moue`.

`bouche` (facultatif) : `fermee`, `ouverte`, `o`, `serree`, `souffle` (joues gonflées),
`langue`, `dents`.

L'expression du visage fait partie de la LSF : mets la bonne expression pour les émotions et les
questions.

## Thèmes (identifiants)

`alphabet`, `nombres`, `salutations`, `politesse`, `questions`, `personnes`, `famille`, `emotions`,
`verbes`, `adjectifs`, `ecole`, `maison`, `objets`, `vetements`, `couleurs`, `nourriture`,
`boissons`, `animaux`, `nature`, `meteo`, `temps`, `calendrier`, `lieux`, `transports`, `loisirs`,
`sports`, `corps`, `sante`, `techno`.

## Exemple complet

```js
{
  id: "merci", mot: "Merci", theme: "politesse", niveau: 1,
  syn: ["remercier"],
  desc: "Pose le bout des doigts de ta main plate sur ton menton, puis avance la main vers la personne.",
  astuce: "Comme si tu offrais tes mots à l'autre.",
  fiable: "sur", source: "https://…",
  images: [
    { d: { cfg: "plate", at: "menton", touch: "doigts", paume: "arriere", doigts: "haut" }, visage: "sourire" },
    { d: { cfg: "plate", at: "neutre", off: [0, -10, 20], paume: "haut-arriere", doigts: "avant-haut" }, t: 550, arc: 10 }
  ]
}
```

Lettre statique de l'alphabet :

```js
{
  id: "lettre-a", mot: "A", theme: "alphabet", niveau: 1,
  desc: "Poing fermé, pouce collé contre le côté de l'index.",
  fiable: "sur", source: "https://…",
  images: [ { d: { cfg: "A", at: "dactylo", paume: "avant", doigts: "haut" } } ]
}
```
