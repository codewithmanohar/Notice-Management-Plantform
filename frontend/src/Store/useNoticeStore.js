import {create} from "zustand";
import axios from "axios"


const useNoticeStore = create((set) => ({

     getAllNotices : async () => {
        try {
            // getting  notices from backend 
            const response = await axios.get(`http://localhost:8000/api/notice?department=CSE`);
            if(response) return response.data ;
            else alert("No Notice found !");
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error in getAllnotice : ", error );
        }
     },

   

}));

export default useNoticeStore ; 