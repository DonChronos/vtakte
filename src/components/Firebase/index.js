import * as firebase from "firebase/app";
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
const auth = firebase.auth();

export const doSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
export const doSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
export const doSignOut = () => auth.signOut();
export const user = uid => db.ref(`users/${uid}`);
export const users = () => db.ref('users');
export const group = gid => db.ref(`groups/${gid}`);
export const groups = () => db.ref('groups');
// Implement messages later