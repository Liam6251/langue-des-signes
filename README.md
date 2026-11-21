# Langue des signes pour Maëlle

Site pour apprendre la langue des signes française (LSF) avec un personnage animé en 2D.

## Ouvrir le site

En ligne : **https://liam6251.github.io/langue-des-signes/** (téléphone, tablette, ordinateur).

Sur l'ordinateur, tu peux aussi double-cliquer sur `index.html` (sans compte en ligne dans ce cas).
Pour le développement : `node outils/serveur.js` puis http://localhost:5173.

## Compte et progression

Dans Réglages → Compte, Maëlle crée un compte (e-mail + mot de passe). Sa progression s'enregistre
toute seule en ligne et la suit sur tous ses appareils. Le code est dans `js/sync.js` (Firebase,
projet `lsf-maelle`), les règles de sécurité dans `firestore.rules`.

## Mettre à jour le site en ligne

Toute modification envoyée sur GitHub (branche `main`) met le site à jour en 1 à 2 minutes.
Depuis ce dossier : `.\publier.ps1` (ou `.\publier.ps1 "ce que j'ai changé"`).

## Contenu

- `js/data/*.js` : les signes (un fichier par groupe de thèmes). Le format est expliqué dans `notes/format-signes.md`.
- `js/moteur/` : le moteur qui dessine et anime le personnage (mains en 3D projetées, bras, visage, flèches de mouvement).
- `notes/research/` : les sources trouvées pour chaque signe.
- `outils/test-moteur.html` : page de test du moteur (à ouvrir avec le serveur local).

## Ajouter un signe

Ajoute une entrée dans le bon fichier de `js/data/` en suivant `notes/format-signes.md`, puis recharge la page.
Le signe apparaît automatiquement dans Découvrir, dans les leçons de son niveau et dans les quiz.

## À savoir

Les dessins sont une aide pour apprendre. Chaque fiche a un lien « Vérifier ce signe sur Elix » (dictionnaire vidéo de la LSF) :
en cas de doute, c'est la vidéo ou une personne sourde qui a raison. Les signes marqués « à vérifier » n'ont pas pu être confirmés par une source claire.
