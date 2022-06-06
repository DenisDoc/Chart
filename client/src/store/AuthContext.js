import { createContext } from 'react'
import { useState } from 'react'

const AuthContext = createContext({
   token: '',
   isLoggedIn: false,
   login: (token) => { },
   logout: () => { } ,
   userName:""
})


const retriveStoredToken = () => {
   const storedToken = localStorage.getItem('token')
   return storedToken
}

export const AuthContextProvider = (props) => {
   let retivedToken = retriveStoredToken()

   const [token, setToken] = useState(retivedToken ? retivedToken : undefined)
   const [userName, setUserName] = useState('')
   const [imgUrl, setImgUrl] = useState('')

   const userIsLoggedIn = !!token

   const logoutHandler = (token) => {
      setToken(null)
      localStorage.removeItem('token', token)
   }

   const loginHandler = (token) => {
      setToken(token)
      localStorage.setItem('token', token)
   }

   const userNameHandler = (userName, imgUrl) =>{
      setUserName(userName)
      setImgUrl(imgUrl)
   }

   const contextValue = {
      token: '',
      login: loginHandler,
      logout: logoutHandler,
      userData: userNameHandler,
      isLoggedIn: userIsLoggedIn,
      userName: userName,
      imgUrl: imgUrl,

   }

   return (
      <AuthContext.Provider value={contextValue}>
         {props.children}
      </AuthContext.Provider>
   )
}

export default AuthContext