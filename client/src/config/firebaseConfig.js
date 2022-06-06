import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDKDK3-c5qrmdSe-b3u_SPY3K0-xyzBNIQ",
    authDomain: "loginwithsocialmedia-6a089.firebaseapp.com",
    projectId: "loginwithsocialmedia-6a089",
    storageBucket: "loginwithsocialmedia-6a089.appspot.com",
    messagingSenderId: "657091945886",
    appId: "1:657091945886:web:4cb90ed162301f1ff9228f",
    measurementId: "G-FGNN4LZSYK"
}

const app = initializeApp(firebaseConfig)

export const authentification = getAuth(app)