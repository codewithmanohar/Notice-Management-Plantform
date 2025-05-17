import Home from './Pages/Home'
import FacultyRegistration from './Pages/Faculty/FacultyRegistration'
import AdminRegistration from "./Pages/Admin/AdminRegistration"
import { Navigate, Route , Routes } from 'react-router-dom' 
import NotFoundPage from './Pages/PageNotFound/NotPageFound'
import Login from './Pages/Login'
import ChooseRole from './Pages/ChooseRole'
import useAuthStore from './Store/useAuthStore'
import FacultyDashboard from './Pages/Faculty/FacultyDashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import FacultyApprovalDashboard from './Pages/Faculty/FacultyApprovalDashboard'

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
      <Route path='/faculty/list' element={<FacultyApprovalDashboard/>} />
      <Route path='/faculty/list' element={<FacultyApprovalDashboard/>} />

      {/* 404 fallback */}
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    </> 
  )
}

export default App