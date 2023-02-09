import {db} from '../firebase/firebase'

import {collection, addDoc, updateDoc, doc, deleteDoc, getDoc} from 'firebase/firestore'

export const dispatchCollectionRef = collection(db, 'dispatch')

class dispatchDataService {

  addDispatch = (newDispatch) => {
    return addDoc(dispatchCollectionRef, newDispatch)
  };

  updateDispatch = (id, updatedDispatch) => {
    const dispatchDoc = doc(db, 'dispatch', id);
    return updateDoc(dispatchDoc, updatedDispatch)
  };

  deleteDispatch = (id) => {
    const dispatchDoc = doc(db, "dispatch", id);
    return deleteDoc(dispatchDoc)
  }

  getAllDispatch = (id) => {
    const dispatchDoc = doc(db, 'dispatch', id);
    return getDoc(dispatchDoc)
  }
} 

export default new dispatchDataService();