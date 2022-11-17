import React from 'react'

import './Sign.scss'

const Sign = () => {
  return (
    <div className='Sign-container'>
      <form>
        <div className='login-input'>
          <label><b>Username</b></label>
          <input  className='Sign-input' 
                  type="text" 
                  placeholder='Enter Username' 
                  name='uname' 
                  required />
          
          <label><b>Password</b></label>
          <input  className='Sign-input'
                  type='password' 
                  placeholder='Enter Password' 
                  name='psw' 
                  required />

          <button className='Sign-button' type='submit'>login</button>
          <label>
            <input type='checkbox' 
                    name='remember' />
                    Remember me
          </label>

          
        </div>
      </form>
    </div>
  )
}

export default Sign