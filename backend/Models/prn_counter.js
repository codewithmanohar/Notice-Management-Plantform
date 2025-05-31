import mongoose from 'mongoose';

const prnCounterSchema = new mongoose.Schema({
  course: { type: String, required: true },
  academic_year: { type: String, required: true },
  last_serial: { type: Number, default: 1000 }, // Start from 1000 for 4-digit serial
});

const PRNCounter = mongoose.model('PRNCounter', prnCounterSchema);

export default PRNCounter;