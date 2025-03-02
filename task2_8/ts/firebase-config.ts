// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZTw84eiEm9keXZ-r3h85eHcD18-Eh-dw",
  authDomain: "ai-wine-shop.firebaseapp.com",
  projectId: "ai-wine-shop",
  storageBucket: "ai-wine-shop.firebasestorage.app",
  messagingSenderId: "749998698771",
  appId: "1:749998698771:web:bb17b6a67d362373b12ae6",
  measurementId: "G-3YNP4VQ4WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

export { storage };