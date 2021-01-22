import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxWCsOfl0O5RWDiqosuTNm3q9-m-iu5O0",
  authDomain: "vue-3-firebase-f6cce.firebaseapp.com",
  databaseURL: "https://vue-3-firebase-f6cce-default-rtdb.firebaseio.com",
  projectId: "vue-3-firebase-f6cce",
  storageBucket: "vue-3-firebase-f6cce.appspot.com",
  messagingSenderId: "987754989496",
  appId: "1:987754989496:web:b7b4f52d27e86a5880314d",
  measurementId: "G-5QVCFJ48NY",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
