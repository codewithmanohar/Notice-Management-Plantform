// import StudentModel from "../Models/Student.js";
// import PersonalDetailsModel from "../Models/personal_details.js";
// import bcrypt from "bcrypt";

// export const studentRegister = async (req , res) => {
//     try {
//         const {prn , course , personal_details , branch , starting_session_year , ending_session_year , password } = req.body ; 
//         if(!prn || !personal_details || !password ) return res.status(400).send("all fields are required ");

//     // checking user 
//     if(prn){
//         const user = await StudentModel.findOne({prn});
//         if(user) return res.status(400).json({message : "user already exists"});
//     }

//     // Hashing the password 
//     const saltRound = 10 ; 
//     const hasedPassword = await bcrypt.hash(password,saltRound);

//     // save personal info 
//     const info = await PersonalDetailsModel.create(personal_details);
//     const savedInfo = await info.save();
//     console.log(savedInfo._id);

//     // create a student 
//     const student = await StudentModel.create({
//         prn, 
//         course, 
//         branch,
//         personal_details : savedInfo._id, 
//         starting_session_year,
//         ending_session_year,
//         password : hasedPassword,
//     });

//     const savedStudent = await student.save();
//     if(savedStudent) res.status(201).json(savedStudent);
//     }catch (error){
//         res.send(error.message);
//         console.log(error);
//     }
// }

// // getting the students 
// export const studentSearch = async (req , res) => {
//     const prn = req.params;
//     console.log(prn); 
//     const student = await StudentModel.find(prn).populate("personal_details");
//     if(student) res.status(200).json(student);
//     if(!student) res.status(400).json({message : "Student not found "});
// };
