import React from 'react'
import Home from './Pages/Home'
import FacultyRegistration from './Pages/FacultyRegistration'
import AdminRegistration from "./Pages/AdminRegistration"
import { Navigate, Route , Routes } from 'react-router-dom'
import NotFoundPage from './Pages/NotPageFound'
import Login from './Pages/Login'
import ChooseRole from './Pages/ChooseRole'

import useAuthStore from './Store/useAuthStore'
import FacultyDashboard from './Pages/FacultyDashboard'
import AdminDashboard from './Pages/AdminDashboard'

const App = () => {
  const {authUser} = useAuthStore();
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register/faculty' element={<FacultyRegistration/>} />
      <Route path='/register/admin' element={<AdminRegistration/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/choose-role' element={<ChooseRole/>} />
      <Route path='/dashboard/faculty' element={authUser ? <FacultyDashboard/> : <Navigate to="/login" />} />
      <Route path='/dashboard/admin' element={authUser ? <AdminDashboard/> : <Navigate to="/login" />} />

      {/* 404 fallback */}
      <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App