import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnjaqHH5ik8XOY1p3KhmmzvrfG2sFRO8M",
    authDomain: "gepetaai.firebaseapp.com",
    projectId: "gepetaai",
    storageBucket: "gepetaai.appspot.com",
    messagingSenderId: "974075166140",
    appId: "1:974075166140:web:28a9e39b93996fa8233fb9",
    measurementId: "G-3B2N8DN3YR"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
// const analytics = getAnalytics(app);

export { db }