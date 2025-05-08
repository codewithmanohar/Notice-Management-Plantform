import {create} from "zustand";
import axios from "axios"


const useAdminStore = create((set) => ({


     getAllFaculty : async () => {
        try {
            // getting all faculties from backend 
            const faculties = await axios.get("http://localhost:8000/api/faculty/getAllFaculty");
            console.log(faculties)
            if(faculties) return faculties.data.faculty;
            else alert("No faculty found !");
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in Signup : ", error );
        }finally{
            // set({isSigningUp : false});
        }
     },

     approveFaculty : async (faculty_id) =>{
        try {
            // approving the faculty in backend 
            const isApproved = await axios.patch(`http://localhost:8000/api/admin/approve/${faculty_id}`);
            if(isApproved) return true ; 
        } catch (error){
            alert(error.response.data.message);
            console.log("Error in faculty approve : ", error );
        }
     }, 

     deleteFaculty : async (faculty_id) => {
        try {
            // getting all faculties from backend 
            const deletedFaculty = await axios.delete(`http://localhost:8000/api/faculty/delete/${faculty_id}`);
            if(deletedFaculty) {
                alert("faculty is deleted");
                return true
            }
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in deleting faculty : ", error );
        }finally{
            // set({isSigningUp : false});
        }
     },

}));

export default useAdminStore ; 