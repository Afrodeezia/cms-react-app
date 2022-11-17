import React from 'react'
import './topmenu.scss'


const Topmenu = () => {
  return (
    <div className='top-menu'>
    
    <div className='top-menu-cards'>
      <div className='top-menu-card topm1'>
        <p className='topm1'>Total no.<br/> 
            of IBE's<br /><br />
            24</p>
        </div>
      <div className='top-menu-card topm2'>
        <p className='topm2'>Received<br/>
              Today<br /><br />
              500</p>  
        </div>
      <div className='top-menu-card topm3'>
        <p className='topm3'>Dispatched<br />
              Today<br /><br />
              600</p>  
      </div>
      <div className='top-menu-card topm4'>
        <p className='topm4'>Total<br />
              Earnings<br /><br />
              600</p>  
      </div>
      
      </div>
    </div>
  )
}

export default Topmenu