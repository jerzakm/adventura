import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyDEjvvoQbZpiK7yUJZ6caRhg20B3FECApc",
    authDomain: "marketflow-cbe21.firebaseapp.com",
    databaseURL: "https://marketflow-cbe21.firebaseio.com",
    projectId: "marketflow-cbe21",
    storageBucket: "marketflow-cbe21.appspot.com",
    messagingSenderId: "529420253182",
    appId: "1:529420253182:web:fd47d2b9ad11f5cca932af"
  };

  export const firebaseInit = () => {
    firebase.initializeApp(firebaseConfig);
  }