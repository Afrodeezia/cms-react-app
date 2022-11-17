import React, { useState, useEffect } from 'react'
import { useAuthValue } from '../../firebase/authContext.js'
import { auth } from '../../firebase/firebase'
import { sendEmailVerification } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import './verifyEmail.scss'

const VerifyEmail = () => {

  const {currentUser} = useAuthValue();
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [time, setTime] = useState(60)
  const { timeActive, setTimeActive } = useAuthValue()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          navigate('/dashboard')
        }
      })
        .catch((err) => {
          alert(err.message)
        })
    }, 1000)
  }, [navigate , currentUser])

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
      sendEmailVerification(auth.currentUser)
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
          <span className='dynaEmail'>{currentUser?.email}</span>
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