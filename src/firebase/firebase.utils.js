import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDjtcoDyD7wfC5S_TjU83Io4FOsNS9-S5U",
  authDomain: "crown-db-40793.firebaseapp.com",
  databaseURL: "https://crown-db-40793.firebaseio.com",
  projectId: "crown-db-40793",
  storageBucket: "crown-db-40793.appspot.com",
  messagingSenderId: "233756139153",
  appId: "1:233756139153:web:d24658c0cb51e9da61a930",
  measurementId: "G-RKNDN6BKWP"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
