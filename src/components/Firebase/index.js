import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

firebase.initializeApp(config);
const db = firebase.database();
export const auth = firebase.auth();

export const doSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
export const doSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
export const doSignOut = () => auth.signOut();
export const userRef = uid => db.ref(`users/${uid}`);
export const usersRef = () => db.ref('users');
export const bandRef = uid => db.ref(`bands/${uid}`);
export const bandsRef = () => db.ref('bands');
export const chatMembersRef = uid => db.ref(`members/${uid}`);
export const chatRef = uid => db.ref(`chatMessages/${uid}`);
export const activeChatsRef = () => db.ref('chatsActive');
console.log('firebase');