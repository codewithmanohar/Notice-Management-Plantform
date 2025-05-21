import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  PRN: { type: Number, unique: true, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  session: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;