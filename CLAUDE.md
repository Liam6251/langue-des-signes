# Site LSF pour Maëlle

- The site is published with GitHub Pages from the `main` branch. Maëlle uses the online link.
- **After every change to the site, commit and push to `main`** (the owner asked for every change to go live automatically). Check that the site still loads without console errors before pushing.
- Progress sync: `js/sync.js` (Firebase Auth email/password + Firestore doc `progres/{uid}`), config in `js/firebase-config.js`, security rules in `firestore.rules` (paste into the Firebase console if changed).
- If you change the shape of the saved progress in `js/store.js`, update `valider()` and the merge in `js/sync.js` (`fusionner`) together, and keep old saves loading.
- Test files (root screenshots, `nul`, demo video) are git-ignored; keep it that way.
