import mongoose from 'mongoose';
import { UserRole } from './User.js';

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedBy_role: { type: String, enum: UserRole, required: true },
  datePosted: { type: Date, default: Date.now },
  category: { type: String, required: true },
  attachments: { type: Array, default: [] },
  priority: { type: String, required: true },
  target_filters: {
  department: { type: [String], default: [] }, // e.g. ['CSE', 'ME']
  year: { type: [String], default: [] },        // e.g. ['1st', '2nd']
}
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
