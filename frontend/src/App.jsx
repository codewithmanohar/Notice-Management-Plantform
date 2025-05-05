import React from 'react'
import Home from './Pages/Home'
import FacultyRegistration from './Pages/FacultyRegistration'
import AdminRegistration from "./Pages/AdminRegistration"
import { Route , Routes } from 'react-router-dom'
import NotFoundPage from './Pages/NotPageFound'
import Login from './Pages/Login'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/faculty/register' element={<FacultyRegistration/>} />
      <Route path='/admin/register' element={<AdminRegistration/>} />
      <Route path='/login' element={<Login/>} />

      {/* 404 fallback */}
      <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App