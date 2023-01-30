import { db } from '../firebase/firebase'

import { collection, addDoc  } from 'firebase/firestore'


export const transCollectionRef = collection(db, 'transactions')

class transDataService {
    addTrans = (newTrans) => {
      return addDoc(transCollectionRef, newTrans)
    };
}

export default new transDataService();