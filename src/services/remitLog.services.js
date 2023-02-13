import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const remitLogCollectionRef = collection(db, "remitLog");

class remitLogDataService {
  addRemitLog = (newRemitLog) => {
    return addDoc(remitLogCollectionRef, newRemitLog);
  };

  updateRemitLog = (id, updatedRemitLog) => {
    const remitLogDoc = doc(db, "remitLog", id);
    return updateDoc(remitLogDoc, updatedRemitLog)
  };

  deleteRemitLog = (id) => {
    const remitLogDoc = doc(db, "remitLog", id);
    return deleteDoc(remitLogDoc)
  };

  getAllRemitLog = (id) => {
    const remitLogDoc = doc(db, "remitLog", id);
    return getDoc(remitLogDoc)  
  };
  
  
}


export default new remitLogDataService();

