import React, {useState} from 'react'
import Tablelist from '../../components/tablelist/tablelist'
import ModalAdd from '../../components/modalAddEmp/modalAdd';


import './employees.scss'

const Employees = () => {

  const [commSeller, setCommSeller] = useState([]);
  const [modalCreateState, setModalCreateState] = useState(false)
  const [newFirst, setNewFirst] = useState("");
  const [newLast, setNewLast] = useState("");
  const [newEfund, setNewEfund] = useState(0);
  const [outBalance, setOutBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [recStartDate , setRecStartDate ] = useState(new Date());

  const [area, setArea] = useState([]);
  const [selectArea, setSelectArea] = useState("");
  
  const [supervisor, setSupervisor] = useState([])
  const [selectSupervisor, setSelectSupervisor] = useState("");
  
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
          newEfund={newEfund}
          setNewEfund={setNewEfund}
          outBalance={outBalance}
          setOutBalance={setOutBalance}
          address={address}
          setAddress={setAddress}
          area={area}
          setArea={setArea}
          contact={contact}
          setContact={setContact}
          supervisor={supervisor}
          setSupervisor={setSupervisor}
          selectArea={selectArea}
          setSelectArea={setSelectArea}
          selectSupervisor={selectSupervisor}
          setSelectSupervisor={setSelectSupervisor}
          />

        <ModalAdd 
          toggle={modalCreateState} 
          action={openCreateModal}
          firstName={newFirst}
          lastName={newLast}
          setFirstName={setNewFirst}
          setLastName={setNewLast}
          newEfund={newEfund}
          setNewEfund={setNewEfund}
          outBalance={outBalance}
          setOutBalance={setOutBalance}
          address={address}
          setAddress={setAddress}
          area={area}
          setArea={setArea}
          contact={contact}
          setContact={setContact}
          supervisor={supervisor}
          setSupervisor={setSupervisor}
          recStartDate={recStartDate}
          setRecStartDate={setRecStartDate}
          selectArea={selectArea}
          setSelectArea={setSelectArea}
          selectSupervisor={selectSupervisor}
          setSelectSupervisor={setSelectSupervisor}
            />
    </div>
  )
}

export default Employees