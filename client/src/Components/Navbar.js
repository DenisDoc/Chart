import { useContext } from 'react'
import classes from './Navbar.module.css'

import AuthContext from '../store/AuthContext'
import Button from '../UI/Button'

const Navbar = () => {
   const authCtx = useContext(AuthContext)

   const onClickLogout = () => {
      authCtx.logout()
   };

   return (
      <nav className={classes.bar}>
         <ul className={classes.list}>
            <li><h1>Chart</h1></li>
            {authCtx.isLoggedIn && <Button className={classes.btn} onClick={onClickLogout} type={'button'} >Logout</Button>}
         </ul>
      </nav>
   )
}

export default Navbar