import { db } from '../firebase/firebase'

import { collection, 
         getDoc,  
         addDoc, 
         updateDoc, 
         deleteDoc, 
         doc,
        } from 'firebase/firestore'

export const supervisorCollectionRef = collection(db, "supervisor");

class supervisorDataService {
  addSupervisor = (newSupervisor) => {
    return addDoc(supervisorCollectionRef, newSupervisor);
  };

  updateSupervisor = (id, updatedSupervisor) => {
    const supervisorDoc = doc(db, "supervisor", id);
    return updateDoc(supervisorDoc, updatedSupervisor)
  };

  deleteSupervisor = (id) => {
    const supervisorDoc = doc(db, "supervisor", id);
    return deleteDoc(supervisorDoc)
  };

  getAllSupervisor = (id) => {
    const supervisorDoc = doc(db, "supervisor", id);
    return getDoc(supervisorDoc)  
  };
  
  
}


export default new supervisorDataService();

