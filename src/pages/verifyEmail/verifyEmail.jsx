import React, { useState, useEffect } from 'react'
import { useAuth } from '../../firebase/authContext.js'
import { auth } from '../../firebase/firebase'
import { sendEmailVerification } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import './verifyEmail.scss'

const VerifyEmail = () => {

  const {user} = useAuth();
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [time, setTime] = useState(60)
  const { timeActive, setTimeActive } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      user?.reload()
      .then(() => {
        if(auth.user?.emailVerified){
          clearInterval(interval)
          navigate('/dashboard')
        }
      })
        .catch((err) => {
          alert(err.message)
        })
    }, 1000)
  }, [navigate , user])

  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if(time === 0) {
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time])

  const resendEmailVerification = () => {
      setButtonDisabled(true)
      sendEmailVerification(auth.user)
      .then(() => {
        setButtonDisabled(false)
        setTimeActive(true)
      }).catch((err) => {
        alert(err.message)
        setButtonDisabled(false)
      })
  }

  return (
    <div className='verifyEmail-container'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>
            A Verification email has been sent to:
          </strong><br />
          <span className='dynaEmail'>{user?.email}</span>
        </p>
          <span>
            Follow the instruction in the email to 
            verify your account
          </span>
          <button 
                onClick={resendEmailVerification}
                disabled={timeActive}
              >
              Resend Email
              {timeActive && time}
          </button>
      </div>
    </div>
  )
}

export default VerifyEmail