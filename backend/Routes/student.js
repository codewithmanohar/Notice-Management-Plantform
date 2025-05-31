import express from 'express';
import { createStudent , getAllStudents, getStudentById, updateStudent, deleteStudent, getStudentByPRN, loginStudent } from "../Controllers/studentController.js";

const router = express.Router();

router.post('/register', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/prn/:PRN', getStudentByPRN);
router.post('/login', loginStudent);

export default router;