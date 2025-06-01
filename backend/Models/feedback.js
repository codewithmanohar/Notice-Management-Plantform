import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
  noticeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notice",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId, // or String, depending on your user model
    ref: "Student", // optional: reference your student collection
    required: true,
  },
  feedback: { type: String, required: true },
  dateSubmitted: { type: Date, default: Date.now },
});

const Feedback  = mongoose.model("Feedback", feedbackSchema);

export default Feedback;