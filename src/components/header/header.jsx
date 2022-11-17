import React, { useState } from 'react'
import './header.scss'

import Burger from '../burger/burger'
import Overlay from '../overlay/overlay'

const Header = () => {

  const [overlayState, setOverlayState] = useState(false);

    function openOverlay() {
      setOverlayState(!overlayState);
    }
  
  

  return (
    <div className='header-container'>
    <div className='headermenu'>
      <h1> Dashboard </h1>
      <div></div>
      <Burger action={openOverlay} toggle = {overlayState} />
    </div>
      {overlayState && (<Overlay toggle={overlayState} />)}
    </div>
  )
}

export default Header