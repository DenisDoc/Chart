import { createContext } from 'react'
import { useState } from 'react'

const AuthContext = createContext({
   token: '',
   isLoggedIn: false,
   login: (token) => { },
   logout: () => { }
})


const retriveStoredToken = () => {
   const storedToken = localStorage.getItem('token')
   return storedToken
}

export const AuthContextProvider = (props) => {
   let retivedToken = retriveStoredToken()

   const [token, setToken] = useState(retivedToken ? retivedToken : undefined)

   const userIsLoggedIn = !!token

   const logoutHandler = (token) => {
      setToken(null)
      localStorage.removeItem('token', token)
   }

   const loginHandler = (token) => {
      setToken(token)
      localStorage.setItem('token', token)
   }

   const contextValue = {
      token: '',
      login: loginHandler,
      logout: logoutHandler,
      isLoggedIn: userIsLoggedIn
   }

   return (
      <AuthContext.Provider value={contextValue}>
         {props.children}
      </AuthContext.Provider>
   )
}

export default AuthContext