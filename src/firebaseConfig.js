import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBvysRcOq0O8XUiUbMcNBDN5Z2qJ4uWpKk",
  authDomain: "photoshare-61cdc.firebaseapp.com",
  databaseURL: "https://photoshare-61cdc.firebaseio.com",
  projectId: "photoshare-61cdc",
  storageBucket: "photoshare-61cdc.appspot.com",
  messagingSenderId: "1059831653167",
  appId: "1:1059831653167:web:62aa0d9b17d4878c7d37da",
  measurementId: "G-4EMN02SLYZ"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage }