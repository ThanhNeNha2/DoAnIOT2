import * as firebase from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBBuB8Ps4eupVk_hR1FW3YYAV8Qmtw5O4",
  authDomain: "cuaiot.firebaseapp.com",
  projectId: "cuaiot",
  storageBucket: "cuaiot.appspot.com",
  messagingSenderId: "188659782721",
  appId: "1:188659782721:web:93bce5db6a4bece4f122c0",
};
const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase();
export { db, ref, onValue, update, app };
