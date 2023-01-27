import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCxFtY9PD56baivRWytdKi4JWaIzy1PLYo",
    authDomain: "blog-app-3411b.firebaseapp.com",
    projectId: "blog-app-3411b",
    storageBucket: "blog-app-3411b.appspot.com",
    messagingSenderId: "150279643409",
    appId: "1:150279643409:web:de8eb665db8eca30eaacb0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProider();

  export default db;
  export { auth, provider };