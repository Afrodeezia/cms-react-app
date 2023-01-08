import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../firebase/authContext.js'
import {sendEmailVerification} from 'firebase/auth'

import  './register.scss'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {setTimeActive, createUser, user} = useAuth()

    const validatePassword = () => {
      let isValid = true
      if (password !== '' && confirmPassword !== ''){
        if (password !== confirmPassword) {
          isValid = false
          setError('Passwords does not match')
        }
      }
      return isValid
    }

    const register = e => {
      e.preventDefault()
      setError('')
      if(validatePassword()) {
        createUser(email, password)
        .then(() => {
          sendEmailVerification(user)
        .then(() => {
          setTimeActive(true)
          navigate('/verifyEmail')
        })
        })
        .catch(err => alert(err.message))
      }
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }

  return (
    <div className='register-container'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
              type='email'
              value={email}
              placeholder='Enter your email'
              required
              onChange={e => setEmail(e.target.value)}
          />

          <input 
              type='password'
              value={password}
              required
              placeholder='Enter your password'
              onChange={e => setPassword(e.target.value)}
          />

          <input 
              type='password'
              value={confirmPassword}
              required
              placeholder='Confirm password'
              onChange={e => setConfirmPassword(e.target.value)}
          />

          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register