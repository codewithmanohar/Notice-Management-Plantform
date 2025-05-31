import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  student_id: { type: String, unique: true, required: true },
  session: { type: String, required: true }, // e.g., "2022-2026"
  semester: { type: String , required: true, }, // Assuming 8 semesters max
  branch: { type: String, required: true }, // e.g., "Computer Science"
  course: { type: String, required: true }, // e.g., "B.Tech"
  academic_year: { type: String, required: true }, // e.g., "2024-2025"
  created_at: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;