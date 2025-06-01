import Feedback from "../Models/feedback.js";


export const createFeedback =  async (req, res) => {
  const { noticeId, feedback , studentId } = req.body;

  try {
    const newFeedback = new Feedback({ noticeId, feedback , studentId});
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback." });
  }
}