import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCsoMXKdo9gMAHZUusjO_ST5EKXND2Ht5Q",
  authDomain: "eleveight-app.firebaseapp.com",
  projectId: "eleveight-app",
  storageBucket: "eleveight-app.appspot.com",
  messagingSenderId: "412922294206",
  appId: "1:412922294206:web:a7d4c4997fc082136753ef",
  measurementId: "G-0CLT56V366"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}

export const db = getFirestore();