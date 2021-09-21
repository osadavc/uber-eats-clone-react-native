import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1bj3BWVNArSuPlnEv55EBddZlp7wxGFw",
  authDomain: "uber-eats-react-native.firebaseapp.com",
  projectId: "uber-eats-react-native",
  storageBucket: "uber-eats-react-native.appspot.com",
  messagingSenderId: "667022099483",
  appId: "1:667022099483:web:5c8346e5f4302bdaa1e4be",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
