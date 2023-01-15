import React, {useEffect} from 'react'
import './modalEdit.scss'
import commSellerDataService from '../../services/firebase.services'



const ModalEdit = ({
                  toggle,
                  action,
                  modalFirstName,
                  modalLastName,
                  setModalFirstName,
                  setModalLastName,
                  modalCommSellerTable,
                  setModalCommSellerTable,
                  id,
                  setCurrentId
                  }) => {
        
        const handleEdit = async () => {
          try {
            const docSnap = await commSellerDataService.getCommSeller(id);
            console.log(docSnap.data());
            setModalLastName(docSnap.data().lname);
            setModalFirstName(docSnap.data().fname);
          } catch (err) {
            alert(err.message)
          }
        };
        
        
        useEffect(() => {
          console.log(id)
          if(id !== undefined && id !== "") {
            handleEdit()
          }
        }, [id])

       
         
      
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
              value={modalLastName}
              type="text"
              size='12'
              autoFocus
               />    
          </label>
        <label className='inputmodalAdd'>First Name:{" "}
            <input 
              onChange={(event) => {setModalFirstName(event.target.value)}}
              value={modalFirstName}
              type="text"
              size='12'
               />    
          </label>
          
          </div>
          <div className='modalAdd-buttons'>
          <button className='modalAdd-but' type='submit' >update</button>
          <button className='modalAdd-but' onClick={action}>Cancel</button>
          </div>
        
        </form>
       
      </div>
  )
}


export default ModalEdit