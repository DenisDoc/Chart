import { Fragment, useContext} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

// import ChartJS from './Pages/ChartJS'
import Chart from './Pages/AntChart'
import ProfilePage from './Pages/ProfilePage'
import LoginPage from './Pages/LoginPage'

import Navbar from './Components/Navbar'
import AuthContext from './store/AuthContext'

const App = () => {
   const authCtx = useContext(AuthContext)

   return (
      <Fragment>
         <Navbar />
         <Routes>
            <Route path='profile-page' element={<ProfilePage />} />
            {!authCtx.isLoggedIn && <Route path='/' element={<LoginPage />} />}
            {!authCtx.isLoggedIn && <Route path='*' element={<Navigate to='/' />} />}
            {authCtx.isLoggedIn && <Route path='/chart' element={<Chart />} />}
            {authCtx.isLoggedIn && <Route path='*' element={<Navigate to='/chart' />} />}
         </Routes>
      </Fragment>
   )
}

export default App


