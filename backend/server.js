import express from "express"
import dotenv from "dotenv";
import connectDB from "./Configs/config.js";
import studentRoute  from "./Routes/student-route.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000 ; 
dotenv.config();

app.use("/api/student", studentRoute);

app.listen(PORT , () => {
    console.log(`Server is running PORT : ${PORT}`);
    connectDB();
});