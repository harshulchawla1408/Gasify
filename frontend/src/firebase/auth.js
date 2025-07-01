// src/firebase/auth.js

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { app } from './config'; // ✅ only import app

// ✅ Initialize auth
export const auth = getAuth(app);

// ✅ Auth functions
export async function registerUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();
  return { user: userCredential.user, idToken };
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();
  return { user: userCredential.user, idToken };
}

export async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();
  return { user: result.user, idToken };
}

export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('user');
}

export async function sendPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
}

export const listenToAuth = (callback) => onAuthStateChanged(auth, callback);
