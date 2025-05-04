import express from "express"
import dotenv from "dotenv";
import connectDB from "./Configs/config.js";
import studentRouter  from "./Routes/student.js";
import adminRouter from "./Routes/admin.js"
import facultyRouter from "./Routes/faculty.js"

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000 ; 
dotenv.config();

app.use("/api/student", studentRouter);

app.use("/api/admin", adminRouter);

app.use("/api/faculty", facultyRouter);

app.listen(PORT , () => {
    console.log(`Server is running PORT : ${PORT}`);
    connectDB();
});