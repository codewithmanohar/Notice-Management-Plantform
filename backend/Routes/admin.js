import express from 'express';
import { 
  registerAdmin, 
  loginAdmin, 
  getAdminDetails, 
  updateAdmin, 
  deleteAdmin, 
  approveFaculty
} from '../Controllers/adminController.js';

const router = express.Router();

// Register a new admin
router.post('/register', registerAdmin);

// Login an admin
router.post('/login', loginAdmin);

// Get admin details by admin_id or email
router.get('/details', getAdminDetails);

// Update admin details
router.put('/update', updateAdmin);

// approve faculty details
router.patch('/approve/:faculty_id', approveFaculty);

// Delete an admin
router.delete('/delete', deleteAdmin);

export default router;