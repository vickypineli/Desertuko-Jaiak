// src/firebase/config.js
import { initializeApp } from "firebase/app";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7ClJpn1eUT_L5Hk0q5Qszrqd-fgEuELY",
  authDomain: "desertuko-jaiak-d4101.firebaseapp.com",
  projectId: "desertuko-jaiak-d4101",
  storageBucket: "desertuko-jaiak-d4101.firebasestorage.app",
  messagingSenderId: "546576430327",
  appId: "1:546576430327:web:8bb24c5d5472fc140acff2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// ✅ exportación por defecto
export default app;

