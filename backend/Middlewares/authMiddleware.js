import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const protectedRoute = (req , res , next) => {
    try {
        const token = req.cookies.JWT;

        // checking token 
        if(!token) return res.status(401).json({message : "No token : Access denied "});

        // verify token 
        const decode = jwt.verify(token , process.env.JWT_KEY);
        console.log(decode);
        next();

    } catch (error) {
        res.status(400).json({message : "Token invalid"});
    }
}