import React, {useState} from 'react'
import { signInWithEmailAndPassword,
         sendEmailVerification 
        } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../firebase/authContext'

import './Sign.scss'

const Sign = () => {

  const [loginEmail, setLoginEmail ] = useState('')
  const [loginPassword, setLoginPassword ] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/verifyEmail')
        })
        .catch(err => alert(err.message))
      }else{
        navigate('/dashboard')
      } 
    })
    .catch(err => alert(err.message))
  }

  

  return (
    <div className='Sign-container'>
      <form onSubmit={login}  name='login_form'>
        <div className='login-input'>
          <label><b>Username</b></label>
          <input  className='Sign-input'
                  onChange={(e) => {setLoginEmail(e.target.value)}} 
                  autoComplete="off"
                  type="text" 
                  placeholder='Enter Username' 
                  name='uname' 
                  required />
          
          <label><b>Password</b></label>
          <input  className='Sign-input'
                  onChange={(e) => {setLoginPassword(e.target.value)}}
                  autoComplete="off"
                  type='password' 
                  placeholder='Enter Password' 
                  name='psw' 
                  required />

          <button className='Sign-button' type='submit'>login</button>
          

          
        </div>
      </form>
    </div>
  )
}

export default Sign