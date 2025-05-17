import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const setUser = (admin) =>{
    const payload = {
        _id : admin._id , 
        admin_id : admin.admin_id ,
    }
    return jwt.sign(payload , process.env.JWT_KEY , {expiresIn : "2h"});
}

export const getUser = (token) => {
    if(!token) return null ; 
    return jwt.verify(token,JWT_SECRET);
}