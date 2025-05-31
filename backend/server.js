import express from "express"
import connectDB from "./Configs/config.js";
import cookieParser from "cookie-parser";
import studentRouter  from "./Routes/student.js";
import adminRouter from "./Routes/admin.js"
import facultyRouter from "./Routes/faculty.js"
import checkAuth from "./Routes/checkAuth.js"
import noticeRouter from "./Routes/notice.js"

import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000 ; 

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true , 
}));


app.use("/api/student", studentRouter);

app.use("/api/admin", adminRouter);

app.use("/api/faculty", facultyRouter);

app.use("/api/auth", checkAuth);

app.use("/api/notice", noticeRouter);

app.listen(PORT , () => {
    console.log(`Server is running PORT : ${PORT}`);
    connectDB();
});