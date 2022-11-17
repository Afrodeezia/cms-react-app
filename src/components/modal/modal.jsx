import React from 'react'
import './modal.scss'

const Modal = (props) => {

  const modalState = props.toggle
  const action = props.action
  return (
    <div className={`modal-container 
    ${modalState ? `active` : ''}`}>
      
        <form className='modal-form'>
        <div className='modal-close' onClick={action}>
          </div>
          <div className='inputmodal-container'>
          <label className='inputmodal'>Enter Product: 
            <input 
              type="text"
               />
          </label>
          <label className='inputmodal'>Enter Quantity:
            <input 
              type="text"
               />    
          </label>
          </div>
        </form>
       
      </div>
    
  )
}

export default Modal