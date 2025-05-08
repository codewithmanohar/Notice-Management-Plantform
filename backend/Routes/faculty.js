import express from 'express';
import { registerFaculty, loginFaculty, getFacultyDetails, updateFaculty, deleteFaculty, getAllFaculty } from '../Controllers/facultyController.js';

const router = express.Router();

// Register a new faculty
router.post('/register', registerFaculty);

// Login a faculty
router.post('/login', loginFaculty);

// Get faculty details by faculty_id or email
router.get('/details', getFacultyDetails);

// Get all faculty details 
router.get('/getAllFaculty', getAllFaculty);

// Update faculty details
router.put('/update', updateFaculty);

// Delete a faculty
router.delete('/delete/:faculty_id', deleteFaculty);

export default router;