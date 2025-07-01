// src/firebase/config.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD74v0Gbndu4o7Dre5cVoVOHPtHQ8VK8w8",
  authDomain: "gasagency-720d1.firebaseapp.com",
  projectId: "gasagency-720d1",
  storageBucket: "gasagency-720d1.appspot.com",
  messagingSenderId: "241344527955",
  appId: "1:241344527955:web:a8f8ffe0b0a26a720110a6",
  measurementId: "G-CSW3BTS99H"
};

export const app = initializeApp(firebaseConfig);
