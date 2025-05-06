import {create} from "zustand";
import axios from "axios"
import { Navigate } from "react-router-dom";

const useAuthStore = create((set) => ({
    authUser : null ,

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
        // set({isSigningUp : true})
        try {
            // Creating the user 
            const user = await axios.post(`http://localhost:8000/api/${data.role}/login` , data);
            if(user) alert("User Login Successfully !");
            else alert("Something Went Wrong !");
            // setting the authenticated user 
            set({authUser : user.data});
            return user ; 
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in Signup : ", error );
        }finally{
            // set({isSigningUp : false});
        }
    },


}))

export default useAuthStore ; 