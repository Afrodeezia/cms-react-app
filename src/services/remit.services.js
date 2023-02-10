import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const remitCollectionRef = collection(db, "remit");

class remitDataService {
  addRemit = (newRemit) => {
    return addDoc(remitCollectionRef, newRemit);
  };

  updateRemit = (id, updatedRemit) => {
    const remitDoc = doc(db, "remit", id);
    return updateDoc(remitDoc, updatedRemit)
  };

  deleteRemit = (id) => {
    const remitDoc = doc(db, "remit", id);
    return deleteDoc(remitDoc)
  };

  getAllRemit = (id) => {
    const remitDoc = doc(db, "remit", id);
    return getDoc(remitDoc)  
  };
  
  
}


export default new remitDataService();

