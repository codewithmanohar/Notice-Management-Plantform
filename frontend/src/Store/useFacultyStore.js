import {create} from "zustand";
import axios from "axios"


const useFacultyStore = create((set) => ({


     getFaculty : async () => {
        try {
            // getting  faculty from backend 
            const faculty = await axios.get(`http://localhost:8000/api/faculty/details?faculty_id=734789`);
            console.log(faculty)
            if(faculty) return faculty.data.faculty;
            else alert("No faculty found !");
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in get faculty : ", error );
        }finally{
            // set({isSigningUp : false});
        }
     },

   

}));

export default useFacultyStore ; 