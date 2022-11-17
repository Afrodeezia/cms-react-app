import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCE59WE8zB14sQ4A2o3KN050iKkuwAEArc",
  authDomain: "eleveight-project.firebaseapp.com",
  projectId: "eleveight-project",
  storageBucket: "eleveight-project.appspot.com",
  messagingSenderId: "78180843606",
  appId: "1:78180843606:web:aa9348f2d7879b51ae7bf7",
  measurementId: "G-JBTP12Z7SN"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}