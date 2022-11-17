import React from 'react'
import { Link } from 'react-router-dom'

import './overlay.scss'

const Overlay = (props) => {

  const toggle = props.toggle

  return (
    <div className={`overlay-container`}>
      <div className='overlay'>
          <Link onClick={toggle} to={'/'} className='overlayLink'>Dashboard</Link>
          <Link onClick={toggle} to={'/products'} className='overlayLink'>Products</Link>
          <Link onClick={toggle} to={'/reports'} className='overlayLink'>Reports</Link>
          <Link onClick={toggle} to={'/receive'} className='overlayLink'>Recevings</Link>
          <Link onClick={toggle} to={'/employees'} className='overlayLink'>Employees</Link>
          <Link  className='overlayLink'>Log out</Link>
      </div>
    </div>
  )
}

export default Overlay