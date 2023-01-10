import React, {useState} from 'react'
import { db } from '../../firebase/firebase'
import { collection,
         
          } from 'firebase/firestore'
import Tablelist from '../../components/tablelist/tablelist'
import Search from '../../components/search/search';
import ModalAdd from '../../components/modalAddEmp/modalAdd';



import './employees.scss'

const Employees = () => {

  const [commSeller, setCommSeller] = useState([]);
  const commSellerCollectionRef = collection(db, "commSeller")
  const [searchValue, setSearchValue] = useState('')
  const [sortedField, setSortedField] = useState('')

  const [modalCreateState, setModalCreateState] = useState(false)
  const [newFirst, setNewFirst] = useState("");
  const [newLast, setNewLast] = useState("");

  function openCreateModal() {
    setModalCreateState(!modalCreateState)
  }

  function closeCreateModal() {
    setModalCreateState(modalCreateState)
  }
  

  

    const requestSort = key => {
      let direction = 'ascending';

      if (sortedField.key === key && sortedField.direction === 'ascending') {
        direction = 'descending';
      }
      setSortedField({key, direction});
    }

    


    //this function sorts the table alphabetically.
  /* let sortedEmp = [commSeller]
  sortedEmp.sort((a, b) => { 

    if (a[sortedField.id] < b[sortedField.id]) {
      return sortedField.direction === 'ascending' ? -1 : 1;
    }

    if (a[sortedField.id] > b[sortedField.id]) {
      return sortedField.direction === 'ascending' ? 1 : -1;
    }
      return 0;
  }); */
 
  
  return (
    <div className='employees'>
      <Search 
          search={searchValue} 
          setSearch={setSearchValue} 
          />
      <button onClick={() => openCreateModal()}>Add Employee</button>
      <Tablelist 
          commSellerTable={commSeller}
          setCommSellerTable={setCommSeller}
          dbTable={commSellerCollectionRef}
          searchFilter={searchValue} 
          handleSort={requestSort}
          />
        <ModalAdd toggle={modalCreateState} 
                  action={openCreateModal}
                  close={closeCreateModal}
                  firstName={newFirst}
                  lastName={newLast}
                  setFirstName={setNewFirst}
                  setLastName={setNewLast}
                  dbTable={commSellerCollectionRef}
                  
                  />
    </div>
  )
}

export default Employees