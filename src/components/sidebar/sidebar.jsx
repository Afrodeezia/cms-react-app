import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

import './sidebar.scss'



const Sidebar = () => {

    const navigate = useNavigate()

    const logout = async () => {
      await signOut(auth)
      .then(() => {
        navigate('/')
      })
    }

  return (
    <div className='sidebar'>
      <img className='logo' src={require('../../images/icons8-animal-crossing-48.png')} alt='Icon'></img>
        <div className='sidemenu'>
          <Link to={'/'} className='sidelink'>Dashboard</Link>
          <Link to={'/products'} className='sidelink'>Products</Link>
          <Link to={'/reports'} className='sidelink'>Reports</Link>
          <Link to={'/receive'} className='sidelink'>Receivings</Link>
          <Link to={'/employees'} className='sidelink'>Employees</Link>
          <span onClick={logout} className='sidelink'>Log out</span>
        </div>
    </div>
    
  )
}

export default Sidebar