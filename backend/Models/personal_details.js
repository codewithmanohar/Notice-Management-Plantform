import mongoose from 'mongoose';

const personalDetailsSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

export default PersonalDetails;
