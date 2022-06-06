import React, { useContext }from 'react'
import classes from './ProfilePage.module.css'
import AuthContext from '../store/AuthContext'

const ProfilePage = () => {
  const authCtx = useContext(AuthContext)
  console.log(authCtx.userName, authCtx.imgUrl)

  return (
    <section className={classes.container}>
        <img className={classes.profileImg} src={authCtx.imgUrl}/>
        <h2>{authCtx.userName}</h2>
    </section>
  )
}

export default ProfilePage