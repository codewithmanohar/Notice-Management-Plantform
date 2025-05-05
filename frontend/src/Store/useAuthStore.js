import {create} from "zustand";
import axios from "axios"

const useAuthStore = create((set) => ({
    authUser : null ,

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

}))

export default useAuthStore ; 