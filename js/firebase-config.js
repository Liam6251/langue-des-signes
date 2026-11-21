/* Configuration Firebase du site (Console Firebase → Paramètres du projet → Vos applications → Config).
 * Ces valeurs ne sont pas secrètes : c'est la règle de sécurité Firestore (firestore.rules)
 * qui empêche chacun de lire ou modifier la progression des autres.
 * Tant que apiKey est vide, le site marche sans compte (progression dans le navigateur seulement). */
window.LSF_FIREBASE = {
  apiKey: 'AIzaSyBEAeS-rT0xkn9Z7iglUS6mbfL54lLLMMM',
  authDomain: 'lsf-maelle.firebaseapp.com',
  projectId: 'lsf-maelle',
  storageBucket: 'lsf-maelle.firebasestorage.app',
  messagingSenderId: '260858359992',
  appId: '1:260858359992:web:0f602babcc5e9da608044d'
};
