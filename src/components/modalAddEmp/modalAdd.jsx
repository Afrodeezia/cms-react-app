import React from 'react'
import commSellerDataService from '../../services/firebase.services'
import './modalAdd.scss'


const ModalAdd = ({
              toggle, 
              action,
              firstName,
              lastName,
              setFirstName,
              setLastName,               
                  }) => {


  const handleAdd = async (e) => {
    e.preventDefault()
    if (firstName === "" || lastName === "") {
      alert("All fields are mandatory!");
      return;
    }
    const newCommSeller ={firstName, lastName}
    console.log(newCommSeller);
    try {
      await commSellerDataService.addCommSeller(
        { fname: firstName, lname: lastName });
      alert("added successfully");
    } catch (err) {
      alert(err.message)
    }
    action();
  }

  return (
    <div className={`modalAdd-container 
    ${toggle ? `active` : ''}`}>
      
        <form className='modalAdd-form' >
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
          <button className='modalAdd-but'onClick={handleAdd}>Enter</button>
          <button className='modalAdd-but' onClick={action}>Cancel</button>
          </div>
        </form>
       
      </div>
  )
}


export default ModalAdd