import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protectedRoute = (req , res , next) => {
    try {
        const token = req.cookies.JWT;
        console.log("Cookies : " , req.cookies);
        console.log("Cookies : " , req.cookies.JWT);
        // checking token 
        if(!token) return res.status(401).json({message : "No token : Access denied "});

        // verify token 
        console.log("JWT_KEY:", process.env.JWT_KEY);
        const user = jwt.verify(token , process.env.JWT_KEY);
        console.log(user);
        req.user = user ; 
        next();

    } catch (error) {
        res.status(400).json({message : "Token invalid"});
    }
}