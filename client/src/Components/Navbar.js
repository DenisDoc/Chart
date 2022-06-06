import { useContext, useState } from 'react'
import classes from './Navbar.module.css'

import { useNavigate } from 'react-router-dom'

import AuthContext from '../store/AuthContext'
import Button from '../Utilities/Button'

const Navbar = () => {
   const authCtx = useContext(AuthContext)
   const [linkActive, setLinkActive] = useState(true)

   const navigate = useNavigate()

   const onClickLogout = () => {
      authCtx.logout()
   };   

   const navigateToChart = () => {
      navigate('/chart')
      setLinkActive(true)
   }

   const navigateToProfilePage = () => {
      navigate('/profile-page')
      setLinkActive(false)
   }

   return (
      <nav className={classes.bar}>
         <ul className={classes.list}>
            <li><h1>Chart</h1></li>
            <div className={classes.linksContainer}>
               {authCtx.isLoggedIn && <a onClick={navigateToChart}>Chart</a>}
               {authCtx.isLoggedIn && <a onClick={navigateToProfilePage}>Profile page</a>}
               {authCtx.isLoggedIn && <Button className={classes.btn} onClick={onClickLogout} type={'button'} >Logout</Button>}
            </div>
         </ul>
        
      </nav>
   )
}

export default Navbar