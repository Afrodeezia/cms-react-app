import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const paymentModeCollectionRef = collection(db, "payment");

class paymentModeDataService {

  addPaymentMode = (newPaymentMode) => {
    return addDoc(paymentModeCollectionRef, newPaymentMode);
  };

  updatePaymentMode = (id, updatedPaymentMode) => {
    const paymentModeDoc = doc(db, "payment", id);
    return updateDoc(paymentModeDoc, updatedPaymentMode)
  };

  deletePaymentMode = (id) => {
    const paymentModeDoc = doc(db, "payment", id);
    return deleteDoc(paymentModeDoc)
  };

  getAllPaymentMode = (id) => {
    const paymentModeDoc = doc(db, "payment", id);
    return getDoc(paymentModeDoc)  
  };
  
  
}


export default new paymentModeDataService();

