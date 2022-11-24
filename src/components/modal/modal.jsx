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
          <label className='inputmodal'>Enter Product:{" "}
           <select>
              <option>Dutchmill Delight</option>
              <option>Monde Tinapay</option>
           </select>
          </label>
        <label className='inputmodal'>Enter Quantity:{" "}
            <input 
              type="text"
              size='12'
               />    
          </label>
          </div>
          <div className='modal-buttons'>
          <button className='modal-but'>Enter</button>
          <button className='modal-but'>Cancel</button>
          </div>
        </form>
       
      </div>
    
  )
}

export default Modal