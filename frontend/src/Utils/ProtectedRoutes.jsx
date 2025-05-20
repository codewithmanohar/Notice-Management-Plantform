import useAuthStore from '../Store/useAuthStore'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const ProtectedRoutes = ({children}) => {
    const {authUser} = useAuthStore();

    const navigate = useNavigate();
    
    useEffect(() => {
      if(!authUser) navigate("/login");
    },[]);

  return (
   children
  )
}

export default ProtectedRoutes;