import express from 'express';
import { registerStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, getStudentByPRN, loginStudent } from "../Controllers/studentController.js";

const router = express.Router();

router.post('/register', registerStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/prn/:PRN', getStudentByPRN);
router.post('/login', loginStudent);

export default router;