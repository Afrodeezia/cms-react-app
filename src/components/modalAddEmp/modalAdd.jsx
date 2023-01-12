import React from 'react'
import { addDoc } from 'firebase/firestore'
import './modalAdd.scss'


const ModalAdd = ({
              toggle, 
              action,
              firstName,
              lastName,
              setFirstName,
              setLastName,
              dbTable,                
                  }) => {
                    

  const addCommSeller = async (e) => {
    e.preventDefault()
    await addDoc(dbTable, { fname: firstName, lname: lastName })
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
              onChange={(event) => {setLastName(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>
        <label className='inputmodalAdd'>First Name:{" "}
            <input 
              onChange={(event) => {setFirstName(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>
          
          </div>
          <div className='modalAdd-buttons'>
          <button className='modalAdd-but' onClick={addCommSeller}>Enter</button>
          <button className='modalAdd-but' onClick={action}>Cancel</button>
          </div>
        </form>
       
      </div>
  )
}



export default ModalAdd