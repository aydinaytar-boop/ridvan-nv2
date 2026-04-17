// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // AŞAĞIDAKİ ALANLARI FİREBASE KONSOLUNDAN KOPYALADIĞIN BİLGİLERLE DOLDUR
  apiKey: "AIzaSy...",
  authDomain: "proje-adin.firebaseapp.com",
  databaseURL: "https://proje-adin-default-rtdb.firebaseio.com",
  projectId: "proje-adin",
  storageBucket: "proje-adin.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);