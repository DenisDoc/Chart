import { useRef, useReducer, useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import classes from './LoginPage.module.css'

import Card from '../Utilities/Card'
import AuthContext from '../store/AuthContext'
import Button from '../Utilities/Button'

// import * as firebase from "firebase/app"
import {signInWithPopup, FacebookAuthProvider} from 'firebase/auth'
import { authentification } from '../config/firebaseConfig'

const initState = {
   error: false,
   errorMessage: '',
}

const errorReducer = (state, action) => {
   if (action.type.startsWith('EMAIL_NOT_FOUND')) {
      return { error: true, errorMessage: 'Please enter a valid Email!' }
   }
   if (action.type.startsWith('INVALID_PASSWORD')) {
      return { error: true, errorMessage: 'Please enter a valid Password!' }
   }
   if (action.type.startsWith('TOO_MANY_ATTEMPTS_TRY_LATER')) {
      return {
         error: true,
         errorMessage:
            `Access to this account has been temporarily disabled due to many failed login attempts.
                 You can immediately restore it by resetting your password or you can try again later.`
      }
   }
   if (action.type === 'UNEXPECTED_ERR') {
      return { error: true, errorMessage: 'Unexpected error occurred! Please try again.' }
   }
   if (action.type === 'FOCUS') {
      return { error: false, errorMessage: '' }
   }
   return initState
}

const LoginPage = (props) => {
   const [error, dipatchError] = useReducer(errorReducer, initState)
   const authCtx = useContext(AuthContext)
   const navigate = useNavigate()

   const emailInputRef = useRef()
   const passwordInputRef = useRef()

   const fetchAuthData = async (email, password) => {
      try {
         const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYiT2VTSlwwwkOb0HdmqZXYfJu9YyDiUo', {
            method: 'POST',
            body: JSON.stringify({
               email: email,
               password: password,
               returnSecureToken: true
            }),
            headers: {
               'Content-Type': 'application/json'
            }
         })

         const data = await response.json()

         if (!response.ok) {
            let errorMessage
            // data && data.error && data.error.message ? errorMessage = data.error.message : 'UNEXPETED_ERR'
            data && data.error && data.error.message ? errorMessage = data.error.message : dipatchError({type: 'UNEXPETED_ERR'})
         
            dipatchError({ type: errorMessage })
            throw new Error(errorMessage)
         }

         if (data) {
            authCtx.login(data.idToken)
            navigate('/profile-page')
         }
        

      }
      catch (error) {
         console.log(error)
      }
   }

   const onSubmitHandler = (event) => {
      event.preventDefault()

      const enteredEmail = emailInputRef.current.value
      const enteredPassword = passwordInputRef.current.value

      fetchAuthData(enteredEmail, enteredPassword)
   }

   const onFocusHandler = () => {
      dipatchError({ type: 'FOCUS' })
   }

   const inputClasses = error.error ? `${classes.errorFeedback}` : ""

   const singInWithFacebook = async () => {
     try{
      const provider = new FacebookAuthProvider()
      const data = await signInWithPopup(authentification, provider)
         console.log(data)
         if (data) {
            authCtx.login(data.user.stsTokenManager.accessToken)
            authCtx.userData(data.user.displayName ,data.user.photoURL)
            navigate('/profile-page')
         }
     }
     catch(error) {
        console.log(error)
     }
   }

   return (
      <Card className={classes.container}>
         <div className={classes.form} >
            <h1>Log In</h1>
            {error.error && <p className={classes.errorMessage}>{error.errorMessage}</p>}
            <form onSubmit={onSubmitHandler}>
               <div className={classes.control}>
                  <label htmlFor='email' >Email</label>
                  <input
                     className={inputClasses}
                     onFocus={onFocusHandler}
                     type='email'
                     id='email'
                     ref={emailInputRef}
                     required
                  />
               </div>
               <div className={classes.control}>
                  <label htmlFor='password'>Password</label>
                  <input
                     className={inputClasses}
                     onFocus={onFocusHandler}
                     type='password'
                     id='password'
                     ref={passwordInputRef}
                     required
                  />
               </div>
               <Button className={classes.btn} type='submit'>Login</Button>
               <Button className={classes.btn} onClick={singInWithFacebook}>Login With Facebook</Button>
            </form>
         </div>
      </Card>
   )
}

export default LoginPage

