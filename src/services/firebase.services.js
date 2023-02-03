import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const commSellerCollectionRef = collection(db, "commSeller");

class commSellerDataService {
  addCommSeller = (newCommSeller) => {
    return addDoc(commSellerCollectionRef, newCommSeller);
  };

  updateCommSeller = (id, updatedCommSeller) => {
    const commSellerDoc = doc(db, "commSeller", id);
    return updateDoc(commSellerDoc, updatedCommSeller)
  };

  deleteCommSeller = (id) => {
    const commSellerDoc = doc(db, "commSeller", id);
    return deleteDoc(commSellerDoc)
  };

  getAllCommSeller = (id) => {
    const commSellerDoc = doc(db, "commSeller", id);
    return getDoc(commSellerDoc)  
  };
  
  
}


export default new commSellerDataService();

