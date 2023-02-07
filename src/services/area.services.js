import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const areaCollectionRef = collection(db, "area");

class areaDataService {
  addArea = (newArea) => {
    return addDoc(areaCollectionRef, newArea);
  };

  updateArea = (id, updatedArea) => {
    const areaDoc = doc(db, "area", id);
    return updateDoc(areaDoc, updatedArea)
  };

  deleteArea = (id) => {
    const areaDoc = doc(db, "area", id);
    return deleteDoc(areaDoc)
  };

  getAllArea = (id) => {
    const areaDoc = doc(db, "area", id);
    return getDoc(areaDoc)  
  };
  
  
}


export default new areaDataService();

