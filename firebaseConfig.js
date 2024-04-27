import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {getFirestore, collection} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA9iKBZ8f06UEpe5jOExafXIBIHVLg0PQg",
  authDomain: "fir-chat-16d1d.firebaseapp.com",
  projectId: "fir-chat-16d1d",
  storageBucket: "fir-chat-16d1d.appspot.com",
  messagingSenderId: "865337423761",
  appId: "1:865337423761:web:92ec0dc4b5c3dac67fcc30"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)
export const storage = getStorage(app)
export const usersRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')