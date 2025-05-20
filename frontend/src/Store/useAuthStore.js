import {create} from "zustand";
import axios from "axios"
import { toast } from "react-toastify";


const useAuthStore = create((set) => ({
    authUser : null ,
    isLoading : false ,
    isSigningUp : false , 

    studentRegister : async (data) =>{
        // set({isSigningUp : true})
        try {
            // Creating the user 
            const user = await axios.post("http://localhost:8000/api/student/register" , data);
            if(user) alert("User registered Successfully !");
            else alert("User Not Created !");
            // setting the authenticated user 
            set({authUser : user.data});
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in Signup : ", error );
        }finally{
            // set({isSigningUp : false});
        }
    },

    facultyRegister : async (data) =>{
        // set({isSigningUp : true})
        try {
            // Creating the user 
            const user = await axios.post("http://localhost:8000/api/faculty/register" , data);
            if(user) alert("User registered Successfully !");
            else alert("User Not Created !");
            // setting the authenticated user 
            set({authUser : user.data});
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in Signup : ", error );
        }finally{
            // set({isSigningUp : false});
        }
    },

    adminRegister : async (data) =>{
        // set({isSigningUp : true})
        try {
            // Creating the user 
            const user = await axios.post("http://localhost:8000/api/admin/register" , data);
            if(user) alert("User registered Successfully !");
            else alert("User Not Created !");
            // setting the authenticated user 
            set({authUser : user.data});
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in Signup : ", error );
        }finally{
            // set({isSigningUp : false});
        }
    },

    userLogin : async (data) =>{
        set({isSigningUp : true})
        try {
            // Creating the user 
            const user = await axios.post(`http://localhost:8000/api/${data.role}/login` , data , {withCredentials : true});
            if(user) toast.success("User Login Successfully !");
            else alert("Something Went Wrong !");
            // setting the authenticated user 
            set({authUser : user.data});
            return user ; 
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in Signup : ", error );
        }finally{
            set({isSigningUp : false});
        }
    },

    checkAuth: async () => {
    set({ isLoading: true });
    try {
        const res = await axios.get("http://localhost:8000/api/auth/check", { withCredentials: true });
        console.log("verify token",res.data);
        set({ authUser: res.data });
    } catch (error){
        toast.error(error?.response?.data?.message || "Authentication failed");
        set({ authUser: null });
    } finally {
        set({ isLoading: false });
    }
}


}))

export default useAuthStore ; 