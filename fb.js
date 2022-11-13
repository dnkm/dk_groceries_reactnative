// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgbuuiRi3vPBG9MHRrf--wTE_awTLfcsk",

  authDomain: "dk-groceries.firebaseapp.com",

  projectId: "dk-groceries",

  storageBucket: "dk-groceries.appspot.com",

  messagingSenderId: "342094882461",

  appId: "1:342094882461:web:0ac1cb02a8cbf2a1bc5674",

  measurementId: "G-R7FWLX1XJJ",
};
// Initialize Firebase
const fApp = initializeApp(firebaseConfig);
const fdb = getFirestore(fApp);
export { fdb };
