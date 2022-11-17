import React from 'react'

import './burger.scss'


const Burger = (props) => {

   
   const action = props.action;

  return (
    <div className='menuToggle-container'>
    <div className='menuToggle'>
      <input className='check' type='checkbox' onClick={action}/>
      <label className='hamb'>
          <span className='hamb-line'></span>
      </label>  
        </div>
    </div>
  )
}

export default Burger