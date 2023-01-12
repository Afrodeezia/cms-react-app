import React from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import './modalEdit.scss'

const ModalEdit = ({
                  toggle,
                  action,
                  modalFirstName,
                  modalLastName,
                  setModalFirstName,
                  setModalLastName  }) => {

        

        const editCommSeller = async (id) => {
            const docRef = doc(db, "commSeller", id);
            setDoc(docRef, { fname: modalFirstName, lname: modalLastName})
            .then(() => {
              action();
            })          
        };

  return (
    <div className={`modalAdd-container 
    ${toggle ? `active` : ''}`}>
      
        <form className='modalAdd-form'>
        <div className='modalAdd-close' onClick={action}>
          </div>
          <div className='inputmodalAdd-container'>
          <label className='inputmodalAdd'>Last Name:{" "}
              <input 
              onChange={(event) => {setModalLastName(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>
        <label className='inputmodalAdd'>First Name:{" "}
            <input 
              onChange={(event) => {setModalFirstName(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>
          
          </div>
          <div className='modalAdd-buttons'>
          <button className='modalAdd-but' onClick={editCommSeller}>Enter</button>
          <button className='modalAdd-but' onClick={action}>Cancel</button>
          </div>
        </form>
       
      </div>
  )
}


export default ModalEdit