import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Modal from '../modal/modal';
import './midmenu.scss';

const Midmenu = () => {

  const [modalState, setmodalState] = useState(false)

  function openModal() {
    setmodalState(!modalState)
  }

  return (
  <div className='mid-container'>
    <div className='midmenu'>
      <Link className='midcard'>Today's Closeout report</Link>
      <Link className='midcard'>Today's Items summary report</Link>
      <Link className='midcard'>Today's Detailed sales report</Link>
      <button className='toggle-modal'
        onClick={() => openModal()}>Receive</button>
      <Link className='midcard'>Add IBE</Link>
      <Link to={'/register'} className='midcard'>Register User</Link>
    </div>
    <Modal toggle={modalState} action={openModal}/>
    </div>
    
  )
}

export default Midmenu