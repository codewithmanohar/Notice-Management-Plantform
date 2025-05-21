import Home from './Pages/Home'
import FacultyRegistration from './Pages/Faculty/FacultyRegistration'
import AdminRegistration from "./Pages/Admin/AdminRegistration"
import { Navigate, Route , Routes } from 'react-router-dom' 
import NotFoundPage from './Pages/PageNotFound/NotPageFound'
import Login from './Pages/Login'
import ChooseRole from './Pages/ChooseRole'
import useAuthStore from './Store/useAuthStore'
import FacultyDashboard from './Pages/Faculty/FacultyDashboard'
import AdminLayout from './Pages/Admin/AdminLayout'
import FacultyApprovalDashboard from './Pages/Faculty/FacultyApprovalDashboard'
import { useEffect } from 'react'
import DashboardHome from './Pages/Admin/DashboardHome'
import ManageUsers from './Pages/Admin/ManageUsers'
import Notices from './Pages/Admin/Notices'
import CreateNotice from './Pages/Notice/AdminCreateNotice'
import FacultyCreateNotice from './Pages/Faculty/FacultyCreateNotice'
import FacultyProfile from "./Pages/Faculty/FacultyProfile"
import FacultyLayout from "./Layouts/FacultyLayout"
import StudentDashboard from './Pages/Student/StudentDashboard'
import StudentNoticePage from './Pages/Student/StudentNoticePage'
import StudentLayout from './Layouts/StudentLayout'
import StudentProfile from './Pages/Student/StudentProfile'


const App = () => {
const { authUser, checkAuth, isLoading } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  //   console.log(authUser);
  // },[checkAuth]);

if (isLoading) return <div>Loading...</div>;

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register/faculty' element={<FacultyRegistration/>} />
      <Route path='/register/admin' element={<AdminRegistration/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/choose-role' element={<ChooseRole/>} />


      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="users" element={<FacultyApprovalDashboard />} />
          <Route path="notices" element={<CreateNotice />} />
        </Route>

      <Route path="/faculty" element={<FacultyLayout />}>
        <Route index element={<FacultyDashboard />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="create-notice" element={<FacultyCreateNotice />} />
        <Route path="profile" element={<FacultyProfile />} />
      </Route>

      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="notices" element={<StudentNoticePage />} />
        <Route path="profile" element={<StudentProfile />} />
        {/* <Route path="settings" element={<StudentSettings />} /> */}
      </Route>


      {/* 404 fallback */}
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    </> 
  )
}

export default App