import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZxKx7RE_sGm1GfO_qRDIDgyCPGdF2pJw",
  authDomain: "e-commerce-66f45.firebaseapp.com",
  projectId: "e-commerce-66f45",
  storageBucket: "e-commerce-66f45.appspot.com",
  messagingSenderId: "39654618915",
  appId: "1:39654618915:web:bc98f243a1e4cae79ebe96",
  measurementId: "G-QMT5S3ZZJY",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
export { provider };
