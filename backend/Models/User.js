import mongoose from 'mongoose';

export const UserRole = ['student', 'faculty', 'admin'];

const userSchema = new mongoose.Schema({
  role: { type: String, enum: UserRole, required: true },
  password: { type: String, required: true }, // Hashed password
  personal_info: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalDetails', required: true },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
