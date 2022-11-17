import React from 'react'
import { Link } from 'react-router-dom'

import './sidebar.scss'



const Sidebar = () => {
  return (
    <div className='sidebar'>
      <img className='logo' src={require('../../images/icons8-animal-crossing-48.png')} alt='Icon'></img>
        <div className='sidemenu'>
          <Link to={'/'} className='sidelink'>Dashboard</Link>
          <Link to={'/products'} className='sidelink'>Products</Link>
          <Link to={'/reports'} className='sidelink'>Reports</Link>
          <Link to={'/receive'} className='sidelink'>Receivings</Link>
          <Link to={'/employees'} className='sidelink'>Employees</Link>
          <Link  className='sidelink'>Log out</Link>
        </div>
    </div>
    
  )
}

export default Sidebar