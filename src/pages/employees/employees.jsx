import React, {useState} from 'react'
import Tablelist from '../../components/tablelist/tablelist'
import ModalAdd from '../../components/modalAddEmp/modalAdd';




import './employees.scss'

const Employees = () => {

  const [commSeller, setCommSeller] = useState([]);
  const [modalCreateState, setModalCreateState] = useState(false)
  const [newFirst, setNewFirst] = useState("");
  const [newLast, setNewLast] = useState("");
  const [dispatch, setDispatch] = useState(0);

  function openCreateModal() {
    setModalCreateState(!modalCreateState)
  }

  
  return (
    <div className='employees'>
      <button onClick={() => openCreateModal()}>Add Employee</button>
      <Tablelist 
          commSellerTable={commSeller}
          setCommSellerTable={setCommSeller}
          firstName={newFirst}
          lastName={newLast}
          setFirstName={setNewFirst}
          setLastName={setNewLast}
          />
        <ModalAdd 
          toggle={modalCreateState} 
          action={openCreateModal}
          firstName={newFirst}
          lastName={newLast}
          setFirstName={setNewFirst}
          setLastName={setNewLast}
          dispatch={dispatch}
          setDispatch={setDispatch}
          
            />
    </div>
  )
}

export default Employees