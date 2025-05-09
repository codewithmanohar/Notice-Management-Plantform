import jwt from "jsonwebtoken";
const JWT_SECRET = "mySecret";

export const setUser = (admin) =>{
    const payload = {
        _id : admin._id , 
        admin_id : admin.admin_id ,
    }
    return jwt.sign(payload , JWT_SECRET);
}

export const getUser = (token) => {
    if(!token) return null ; 
    return jwt.verify(token,JWT_SECRET);
}