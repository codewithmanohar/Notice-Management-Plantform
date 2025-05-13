import React from 'react'
import useAuthStore from '../Store/useAuthStore'
import { Outlet , Navigate } from 'react-router-dom';


const ProtectedRoutes = () => {
    const {authUser} = useAuthStore();


  return (
    <>
        { authUser ? <Outlet /> : <Navigate to="/login" /> }
    </>
  )
}

export default ProtectedRoutes