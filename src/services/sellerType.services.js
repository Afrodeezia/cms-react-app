import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const sellerTypeCollectionRef = collection(db, "sellerType");

class sellerTypeDataService {
  addSellerType = (newSellerType) => {
    return addDoc(sellerTypeCollectionRef, newSellerType);
  };

  updateSellerType = (id, updatedSellerType) => {
    const SellerTypeDoc = doc(db, "sellerType", id);
    return updateDoc(SellerTypeDoc, updatedSellerType)
  };

  deleteSellerType = (id) => {
    const SellerTypeDoc = doc(db, "sellerType", id);
    return deleteDoc(SellerTypeDoc)
  };

  getAllSellerType = (id) => {
    const SellerTypeDoc = doc(db, "sellerType", id);
    return getDoc(SellerTypeDoc)  
  };
  
  
}


export default new sellerTypeDataService();

