# Recherche : js/data/extra-quotidien.js (58 signes)

## Méthode
- Doublons : lecture des 6 fichiers de js/data/ (ids, mots, syn). Aucun id ni mot repris. Mots écartés car déjà présents en `syn` : dormir (= chambre, selon lsf.wikisign.org/wiki/Dormir), gentil (s'il te plaît), bien / bon (ça va, c'est bon), sentiment (émotion), court (petit), vite non couvert donc ajouté comme syn de « rapide ».
- Source unique des descriptions : Pause LSF, une page par signe, `https://www.pauselsf.fr/signs/<mot>`. Chaque page a été ouverte ; seules celles qui avaient un texte « Description » (configuration, emplacement, mouvement) ont été utilisées. Les descriptions ont été traduites à la main en images-clés ; je n'ai pas vu les vidéos.
- Pages sans texte de description (donc écartées) : ouvrir, fermer, courir, aider, facile, difficile, gagner, emprunter, jaloux, fière, choqué, contrarié, ennuyeux, excité, énervé, curieux, drôle, gros, humide, faux, correct, canapé, escaliers, frigo, couteau, fourchette, cuillère, citron, fraise, glace, jus, jambes, classe, devoir, exercice, histoire, heureux, différents, épais, faire, décrire, économiser, conseil, hamburger, dessert, déjeuner, dîner, évier, four, étagère, feutre, mal, mais (renvoie à « maïs »), encore, ici, perruque, cuisinière, innocent, gêne, étage, euro, bacon.
- dico.elix-lsf.fr : pages ouvertes (dormir), aucune description écrite, seulement des vidéos. Non utilisé comme source.
- lsf.wikisign.org : page Dormir ouverte, renvoie à « chambre » sans description. Non utilisé comme source.

## Fiabilité
- "sur" (description claire et complète sur Pause LSF) : rire, acheter, payer, vendre, perdre, rencontrer, partir, avoir, stop, nerveux, occupé, lent, rapide, mince, cher, peu, parfois, pareil, valise, tasse, marteau, chèque, papier, note, tomate, salade, bonbon, oignon, limonade, bouche, moustache, température.
- "probable" (description lisible mais la traduction en orientations demande une interprétation) : arriver, quitter, obtenir, vivre, supplier, paresseux, long, sec, charmant, plus, moins, libre, lit, chaise, armoire, bol, salon, œufs, miel, tarte, raisins, visage, barbe.
- "incertain" : tordu (le coude soutenu par la main gauche n'est pas représentable, position du poing devinée), lisse (orientations de paumes vagues dans le texte), chauve (côté « externe / interne » du poing ambigu).

## Doutes à signaler
- Interprétation de « vers l'extérieur » : lu comme « vers l'avant, loin du corps » (comme dans maintenant, déjà dans le projet).
- « bonbon » (index qui touche les lèvres) a le même geste que « rouge » du fichier ecole-maison.js : c'est bien ce que dit Pause LSF, le contexte distingue.
- « visage » ressemble beaucoup à « tête » du fichier temps-loisirs.js (même description Pause LSF).
- « vivre » : le fichier ecole-maison.js a « habiter » avec le synonyme « vivre à » ; pas un doublon mais proche.
- « température » (santé) : peut croiser un mot de météo dans extra-monde.js. À vérifier par le relecteur. De même « partir » / « arriver » (verbes) avec d'éventuels signes de transport.
- cfg « sur mesure » utilisées : L_CROCHET, CROCHET2, P_CFG, MOUFLE (toutes avec des codes et pouce valides du format).
- Textes à corriger à la relecture : dans « tasse », l'astuce contient « la anse » (à écrire « l'anse ») et la description parle d'une « soucoupe » alors que Pause LSF dit seulement « main non dominante en B, paume vers le haut » (retirer le mot « soucoupe »).
- Le fichier n'a pas pu être vérifié par `node --check` (pas d'outil d'exécution) : relu à la main pour virgules et guillemets. Tous les textes sont entre guillemets doubles.
