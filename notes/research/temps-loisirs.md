# Recherche : temps, calendrier, lieux, transports, loisirs, sports, corps, santé, techno

Fichier de données : `js/data/temps-loisirs.js` (77 signes).

## Sources utilisées

| Source | Type | Fiabilité |
|---|---|---|
| Wikisign LSF — `https://lsf.wikisign.org/wiki/<Mot>` | wiki communautaire : configuration, description écrite, aide mnémotechnique | bonne quand une description écrite existe |
| Pause LSF — `https://www.pauselsf.fr/signs/<mot>` | dictionnaire avec descriptions écrites (configuration, orientation, emplacement, mouvement) | bonne ; certaines pages ont une description vide |
| Livret « Langue des Signes Française » (cypris.fr) — `https://cypris.fr/solidarite/LSF.pdf` | livret d'un apprenant (5 cours), descriptions courtes basées sur Elix | moyenne, amateur : signes marqués « probable » |
| Elix — `https://dico.elix-lsf.fr/` | vidéos seulement (pas de texte lisible par l'agent) | non utilisé comme source unique |
| clic-campus.fr | descriptions qui mélangent souvent l'ASL et la LSF (ex. « oui » = poing qui hoche) | **écarté**, sauf pour confirmer demain/hier |

## Signe par signe (source → choix)

### Temps
- maintenant — Pause LSF : mains plates, paumes vers le haut, descendent avec petites pulsations. **sur**
- aujourd'hui — cypris : même signe que maintenant. **probable**
- demain — Wikisign : pouce touche l'oreille/joue, le bras s'avance (confirmé par cypris). **sur**
- hier — cypris + clic-campus : pouce qui part vers l'arrière, par-dessus l'épaule. **probable**
- après — Pause LSF : main plate paume vers soi, part du torse, arc vers l'avant. **probable**
- avant — Pause LSF : main plate près de l'épaule, doigts qui se plient plusieurs fois. **probable**
- tout à l'heure — Wikisign : index plié tape 2× le menton puis part vers l'avant (futur) ou l'épaule (passé). **sur**
- toujours — Pause LSF + cypris : index tendu, rotation devant l'épaule. **sur**
- jamais — Wikisign : Y, pouce sur le cœur, arc horizontal ; vitesse et visage = intensité. **probable**
- heure — cypris : lettre H (2 doigts) posée sur le poignet comme une montre (clic-campus donne un cercle sur la paume, écarté). **probable**
- minute — Pause LSF : F, le bout pouce-index tapote le poignet du poing gauche. **sur**
- matin / soir / journée — Wikisign (horizon = main gauche, soleil = main droite). **sur**
- midi — Pause LSF : B, côté index contre le menton, tapote. **sur** ; après-midi — Wikisign : idem + poignet qui plie 2-3×. **sur**
- nuit — Wikisign + Pause LSF : deux mains plates verticales qui basculent à l'horizontale. **sur**
- jour — Wikisign : index sur le menton, s'éloigne d'un mouvement du poignet. **sur**
- minuit — Pause LSF : main plate du menton vers le haut, au-delà de la tête. **probable**
- semaine — Pause LSF : pouce sur le poing gauche, rotation paume vers le bas (cypris donne « poing qui tape le coude » : variante). **probable**
- mois — cypris (majeur qui descend la paume) + Wikisign (configurations B et A) → pouce qui glisse sur la paume. **probable**
- année — Wikisign + cypris : poing qui tourne autour de l'autre (Terre/Soleil). **sur**
- passé — Pause LSF : main plate qui tapote l'épaule. **probable**
- temps (durée) — Pause LSF : deux F qui avancent en s'ouvrant. **probable** (id `temps-duree` pour ne pas gêner un éventuel « temps » météo)

### Calendrier
- Jours : Wikisign donne la configuration (L, A, E, Y=J, V, S, D) ; cypris : « 1re lettre + rotation 2 fois », mardi = A et mercredi = E. **probable**
- week-end — cypris : W qui glisse en se transformant en E (variante : majeurs croisés). **probable**
- anniversaire — Wikisign : AN (poing autour du poing) + 10 doigts = bougies, on souffle. **sur**
- automne — Pause LSF : main gauche debout, main 5 qui descend en se balançant. **probable**
- Non faits : printemps, été, hiver (pages Pause LSF vides, pas de description fiable trouvée).

### Lieux
- ville — Wikisign + Pause LSF : deux V, majeurs qui se touchent, rotation rapide paumes vers l'avant. **sur**
- magasin — Pause LSF. **probable** ; restaurant — Pause LSF (forme de main un peu floue : arc pouce-index). **probable**
- cinéma — Wikisign : deux mains plates qui se croisent 2× « comme deux trains ». **probable**
- parc — Pause LSF. **probable** ; France — Wikisign (F, rotation du poignet). **sur** ; aéroport — Pause LSF. **probable**
- Non faits : Paris, hôpital, piscine, plage (aucune description écrite trouvée).

### Transports
- voiture — Wikisign (S, volant) + cypris. **sur**
- bus — Pause LSF (on tire la corde d'arrêt ; Wikisign a une variante U vers l'avant). **probable**
- train — Pause LSF. **probable** ; vélo — Pause LSF + Wikisign + cypris. **sur**
- avion — Wikisign + Pause LSF (Y). **sur** ; métro — Wikisign. **sur** ; bateau — Pause LSF. **sur**

### Loisirs / sports
- musique — Wikisign (index, symétrie, chef d'orchestre). **probable**
- film — Wikisign (index sur index + petit cercle). **probable**
- jeu — Wikisign « Jouer » (deux Y qui pivotent ; homosigne de jeu, jouet). **sur**
- photo — Pause LSF (deux L, index qui se plient). **sur**
- dessin — cypris (V qui ondule sur la paume). **probable** ; voyage — Pause LSF. **probable**
- sport — Pause LSF + cypris (bec de l'épaule au coude = biceps). **sur**
- football — cypris seulement. **probable** ; basket — Pause LSF + cypris. **sur**
- natation — Pause LSF « nager » (brasse). **sur** ; tennis, ballon — cypris. **probable**

### Corps
- tête, yeux, oreilles, nez, mains, bras — Pause LSF. **sur** ; cheveux, pied — Pause LSF (main de départ / config interprétées). **probable**
- Non fait : cœur (rien trouvé de fiable).

### Santé
- malade — Wikisign (main molle, pince sur le dos, secouée ; variante cypris : tenir le poignet). **sur**
- médecin — Wikisign (config K / U ; mouvement non décrit → pris le pouls au poignet). **probable**
- médicament — Wikisign (pince devant la bouche qui s'ouvre). **sur**
- avoir mal — cypris (pouces qui tournent l'un autour de l'autre, moue). **probable**

### Techno
- téléphone — Wikisign (Y = fixe ; portable = D, non fait). **sur**
- ordinateur — Wikisign + Pause LSF (deux 3, zigzag vers le bas). **sur**
- internet — Wikisign. **sur** ; message (SMS) — Wikisign « Texto ». **sur** ; e-mail — Wikisign « Courriel » (A trace un @). **sur**
- Non faits : vidéo, réseaux sociaux, jeu vidéo (rien de fiable ; « jeu vidéo » mis en synonyme de « jeu »).

## Manques dans le format
- Pas d'endroit `coude_non` / `coude_dom` (utile pour « sport », « semaine » variante cypris) : approximé avec `epaule_non` + décalage.
- Pas de config « H » horizontale à part (utilisé `U` pour « heure »).
