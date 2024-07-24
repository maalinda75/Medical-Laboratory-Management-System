import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBipI0r6S0cPUwDw_Tnaj-xoHbIpOvdhx4",
  authDomain: "cdll-f2ae6.firebaseapp.com",
  projectId: "cdll-f2ae6",
  storageBucket: "cdll-f2ae6.appspot.com",
  messagingSenderId: "513962493625",
  appId: "1:531897123771:web:91b352932c7a161854ba9e"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
