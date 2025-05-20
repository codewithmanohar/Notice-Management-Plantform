import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  faculty_id: { type: Number, unique: true, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  school: { type: String, required: true },
  isApproved: { type: Boolean, required: true , default : false}
});

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;