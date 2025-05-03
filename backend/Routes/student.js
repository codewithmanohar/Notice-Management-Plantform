import express from "express";
import { studentRegister , studentSearch } from "../Controllers/studentController.js";
const route = express.Router();


// register a student 
route.post("/register" , studentRegister);

// find a student 
route.get("/search/:prn", studentSearch);


export default route;