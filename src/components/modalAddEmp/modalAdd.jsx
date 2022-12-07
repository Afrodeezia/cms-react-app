import React, {useState} from 'react'
import './modalAdd.scss'



const ModalAdd = (props) => {

  const modalState = props.toggle
  const action = props.action
  const first = props.FirstName
  const last = props.LastName
  const add = props.add
  

  return (
    <div className={`modalAdd-container 
    ${modalState ? `active` : ''}`}>
      
        <form className='modalAdd-form'>
        <div className='modalAdd-close' onClick={action}>
          </div>
          <div className='inputmodalAdd-container'>
          <label className='inputmodalAdd'>Last Name:{" "}
              <input 
              onChange={(e) => {last(e.target.value)}}
              type="text"
              size='12'
               />    
          </label>
        <label className='inputmodalAdd'>First Name:{" "}
            <input 
              onChange={(e) => {first(e.target.value)}}
              type="text"
              size='12'
               />    
          </label>
          <label className='inputmodalAdd'>Birthdate:{" "}
            <input 
              type="text"
              size='12'
               />    
          </label>
          <label className='inputmodalAdd'>Address:{" "}
            <input 
              type="text"
              size='12'
               />    
          </label>
          <label className='inputmodalAdd'>Contact Number:{" "}
            <input 
              type="text"
              size='12'
               />    
          </label>
          </div>
          <div className='modalAdd-buttons'>
          <button className='modalAdd-but' onClick={add}>Enter</button>
          <button className='modalAdd-but'>Cancel</button>
          </div>
        </form>
       
      </div>
  )
}

export default ModalAdd