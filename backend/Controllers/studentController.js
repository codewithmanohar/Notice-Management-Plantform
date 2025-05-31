import Student from '../Models/Student.js';
import User from '../Models/User.js';
import PersonalDetails from '../Models/personal_details.js';
import { generateStudentId } from '../Helper/generateStudentId.js'; 
import bcrypt from 'bcrypt';

export const createStudent = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      password,
      session,
      semester,
      branch,
      course,
      academic_year,
    } = req.body;

    // Validate required fields
    if (
      !first_name || !last_name || !email || !phone || !gender || !password ||
      !session || !semester || !branch || !course || !academic_year 
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if email already exists
    const existing = await PersonalDetails.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create PersonalDetails
    const personalDetails = new PersonalDetails({ first_name, last_name, email, phone, gender });
    await personalDetails.save();

    // Create User
    const user = new User({
      role: 'student',
      password: hashedPassword,
      personal_info: personalDetails._id,
    });
    await user.save();

    // Generate unique student ID
    const student_id = await generateStudentId();

    // Create Student
    const student = new Student({
      user_id: user._id,
      student_id,
      session,
      semester,
      branch,
      course,
      academic_year
    });

    await student.save();

    return res.status(201).json({
      message: 'Student registered successfully',
      student: {
        email: personalDetails.email,
        student_id,
        course,
        branch,
        semester,
      },
    });

  } catch (error) {
    console.error('Student creation error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error: error.message });
  }
};

// Get student by PRN
export const getStudentByPRN = async (req, res) => {
  try {
    const { PRN } = req.params;
    const student = await Student.findOne({ PRN })
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    if (!student) {
      return res.status(404).json({ message: 'Student not found with provided PRN' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student by PRN', error: error.message });
  }
};

// Student login
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find personal details by email
    const personalDetails = await PersonalDetails.findOne({ email });
    if (!personalDetails) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Find associated user
    const user = await User.findOne({ personal_info: personalDetails._id, role: 'student' });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Find student details
    const student = await Student.findOne({ user_id: user._id })
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      role : user.role , 
       student: {
        email: personalDetails.email,
        student_id: student.student_id,
        course : student.course,
        branch : student.branch,
        semester : student.semester,
      },
     });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { session, semester, branch, course, academic_year, personal_info, password } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student fields (PRN is not updated as it's unique and serial)
    const updateData = {
      session: session || student.session,
      semester: semester || student.semester,
      branch: branch || student.branch,
      course: course || student.course,
      academic_year: academic_year || student.academic_year,
    };
    await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Update associated user and personal details if provided
    if (personal_info || password) {
      const user = await User.findById(student.user_id);
      if (!user) {
        return res.status(404).json({ message: 'Associated user not found' });
      }
      if (personal_info) {
        await PersonalDetails.findByIdAndUpdate(user.personal_info, personal_info, { new: true });
      }
      if (password) {
        user.password = await bcrypt.hash(password, 10); // Hash new password
        await user.save();
      }
    }

    const updatedStudent = await Student.findById(req.params.id)
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error: error.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete associated user and personal details
    const user = await User.findById(student.user_id);
    if (user) {
      await PersonalDetails.findByIdAndDelete(user.personal_info);
      await User.findByIdAndDelete(student.user_id);
    }

    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
};