import React, {useEffect} from 'react'
import './modalEdit.scss'

const ModalEdit = ({
                  toggle,
                  action,
                  modalFirstName,
                  modalLastName,
                  setModalFirstName,
                  setModalLastName,
                  modalCommSellerTable,
                  getCommSellerId,
                  id,
                  setId
                  }) => {
         
        /*
        const editCommSeller = async (e, id) => {
          const docRef = doc(db, "commSeller", id);
          e.preventDefault()
           await setDoc(docRef, { fname: modalFirstName, lname: modalLastName})
            .then(() => {
              action();
            })          
        };
        */

        useEffect(() => {
          console.log('The ID is:', id);
          if(id !== undefined && id !== "") {

          }
        }, [id])
  return (
    <div className={`modalAdd-container 
    ${toggle ? `active` : ''}`}>
      
        <form className='modalAdd-form' >
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
          <button className='modalAdd-but' type='submit' onClick={(e) => e.preventDefault()}>update</button>
          <button className='modalAdd-but' onClick={action}>Cancel</button>
          </div>
        </form>
       
      </div>
  )
}


export default ModalEdit