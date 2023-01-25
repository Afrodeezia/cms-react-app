import { db } from '../firebase/firebase'

import { collection, 
         getDoc,
         getDocs,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
         docs,
        } from 'firebase/firestore'

export const productCollectionRef = collection(db, 'products')

class productDataService {

 updateProduct = (id, updatedProduct) => {
        const productDoc = doc(db, 'products', id);
        return updateDoc(productDoc, updatedProduct)
 };

 getAllProduct = (id) => {
        const productDoc = doc(db, "products", id);
        return getDoc(productDoc)  
      };

}

export default new productDataService();