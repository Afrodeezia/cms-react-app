import {db} from '../firebase/firebase'

import {collection, addDoc, updateDoc, doc} from 'firebase/firestore'

export const dispatchCollectionRef = collection(db, 'dispatch')

class dispatchDataService {

  addDispatch = (newDispatch) => {
    return addDoc(dispatchCollectionRef, newDispatch)
  };

  updateDispatch = (id, updatedDispatch) => {
    const dispatchDoc = doc(db, 'dispatch', id);
    return updateDoc(dispatchDoc, updatedDispatch)
  };
} 

export default new dispatchDataService();