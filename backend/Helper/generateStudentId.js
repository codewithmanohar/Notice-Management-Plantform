import Student from '../Models/Student.js'; 

export const generateStudentId = async () => {
  let unique = false;
  let studentId;

  while (!unique) {
    studentId = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit number
    const existingStudent = await Student.findOne({ student_id: studentId });
    if (!existingStudent) {
      unique = true;
    }
  }

  return studentId;
};
