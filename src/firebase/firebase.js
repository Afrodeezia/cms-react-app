import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCE59WE8zB14sQ4A2o3KN050iKkuwAEArc",
  authDomain: "eleveight-project.firebaseapp.com",
  projectId: "eleveight-project",
  storageBucket: "eleveight-project.appspot.com",
  messagingSenderId: "78180843606",
  appId: "1:78180843606:web:06223a966f3094e8ae7bf7",
  measurementId: "G-D24K7KPC6J"
};

export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}

export const db = getFirestore(app);