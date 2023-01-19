import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const productCollectionRef = collection(db, "products")

class productDataService {


}

export default new productDataService();