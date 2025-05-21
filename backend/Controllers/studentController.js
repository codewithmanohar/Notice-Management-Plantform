import Student from "../Models/Student.js";
import User from '../Models/User.js';
import PersonalDetails from "../Models/personal_details.js";
import bcrypt from 'bcrypt';

// Student registration controller
export const registerStudent = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      password,
      PRN,
      course,
      branch,
      semester,
      session
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !phone || !gender || !password || !PRN || !course || !branch || !semester || !session) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingEmail = await PersonalDetails.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if PRN already exists
    const existingPRN = await Student.findOne({ PRN });
    if (existingPRN) {
      return res.status(400).json({ message: 'PRN already registered' });
    }

    // Number of salt rounds for bcrypt
    const SALT_ROUNDS = 10;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create PersonalDetails document
    const personalDetails = new PersonalDetails({
      first_name,
      last_name,
      email,
      phone,
      gender
    });
    const savedPersonalDetails = await personalDetails.save();

    // Create User document with reference to PersonalDetails
    const user = new User({
      role: 'student',
      password: hashedPassword,
      personal_info: savedPersonalDetails._id
    });
    const savedUser = await user.save();

    // Create Student document with reference to User
    const student = new Student({
      user_id: savedUser._id,
      PRN,
      course,
      branch,
      semester,
      session
    });
    await student.save();

    // Respond with success message
    res.status(201).json({
      message: 'Student registered successfully',
      user: {
        id: savedUser._id,
        email,
        role: savedUser.role
      }
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' }
      });

    const formattedStudents = students.map(student => ({
      id: student._id,
      PRN: student.PRN,
      course: student.course,
      branch: student.branch,
      semester: student.semester,
      session: student.session,
      personal_info: student.user_id?.personal_info ? {
        first_name: student.user_id.personal_info.first_name,
        last_name: student.user_id.personal_info.last_name,
        email: student.user_id.personal_info.email,
        phone: student.user_id.personal_info.phone,
        gender: student.user_id.personal_info.gender
      } : null
    }));

    res.status(200).json({
      message: 'Students retrieved successfully',
      students: formattedStudents
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' }
      });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const formattedStudent = {
      id: student._id,
      PRN: student.PRN,
      course: student.course,
      branch: student.branch,
      semester: student.semester,
      session: student.session,
      personal_info: student.user_id?.personal_info ? {
        first_name: student.user_id.personal_info.first_name,
        last_name: student.user_id.personal_info.last_name,
        email: student.user_id.personal_info.email,
        phone: student.user_id.personal_info.phone,
        gender: student.user_id.personal_info.gender
      } : null
    };

    res.status(200).json({
      message: 'Student retrieved successfully',
      student: formattedStudent
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error while fetching student' });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      PRN,
      course,
      branch,
      semester,
      session,
      password
    } = req.body;

    // Find student
    const student = await Student.findById(id).populate({
      path: 'user_id',
      populate: { path: 'personal_info' }
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update personal details
    const personalDetails = await PersonalDetails.findById(student.user_id.personal_info);
    if (!personalDetails) {
      return res.status(404).json({ message: 'Personal details not found' });
    }

    // Check for email uniqueness if email is being updated
    if (email && email !== personalDetails.email) {
      const existingEmail = await PersonalDetails.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }

    // Check for PRN uniqueness if PRN is being updated
    if (PRN && PRN !== student.PRN) {
      const existingPRN = await Student.findOne({ PRN });
      if (existingPRN) {
        return res.status(400).json({ message: 'PRN already registered' });
      }
    }

    // Update personal details
    personalDetails.first_name = first_name || personalDetails.first_name;
    personalDetails.last_name = last_name || personalDetails.last_name;
    personalDetails.email = email || personalDetails.email;
    personalDetails.phone = phone || personalDetails.phone;
    personalDetails.gender = gender || personalDetails.gender;
    await personalDetails.save();

    // Update student details
    student.PRN = PRN || student.PRN;
    student.course = course || student.course;
    student.branch = branch || student.branch;
    student.semester = semester || student.semester;
    student.session = session || student.session;
    await student.save();

    // Update password if provided
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.findById(student.user_id);
      user.password = hashedPassword;
      await user.save();
    }

    const updatedStudent = {
      id: student._id,
      PRN: student.PRN,
      course: student.course,
      branch: student.branch,
      semester: student.semester,
      session: student.session,
      personal_info: {
        first_name: personalDetails.first_name,
        last_name: personalDetails.last_name,
        email: personalDetails.email,
        phone: personalDetails.phone,
        gender: personalDetails.gender
      }
    };

    res.status(200).json({
      message: 'Student updated successfully',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error while updating student' });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).populate('user_id');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete associated personal details and user
    await PersonalDetails.findByIdAndDelete(student.user_id.personal_info);
    await User.findByIdAndDelete(student.user_id);
    await Student.findByIdAndDelete(id);

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error while deleting student' });
  }
};

// Get student by PRN
export const getStudentByPRN = async (req, res) => {
  try {
    const { PRN } = req.params;

    const student = await Student.findOne({ PRN })
      .populate({
        path: 'user_id',
        populate: { path: 'personal_info' }
      });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const formattedStudent = {
      id: student._id,
      PRN: student.PRN,
      course: student.course,
      branch: student.branch,
      semester: student.semester,
      session: student.session,
      personal_info: student.user_id?.personal_info ? {
        first_name: student.user_id.personal_info.first_name,
        last_name: student.user_id.personal_info.last_name,
        email: student.user_id.personal_info.email,
        phone: student.user_id.personal_info.phone,
        gender: student.user_id.personal_info.gender
      } : null
    };

    res.status(200).json({
      message: 'Student retrieved successfully',
      student: formattedStudent
    });
  } catch (error) {
    console.error('Error fetching student by PRN:', error);
    res.status(500).json({ message: 'Server error while fetching student' });
  }
};

// Login student
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find personal details by email
    const personalDetails = await PersonalDetails.findOne({ email });
    if (!personalDetails) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Find user by personal details
    const user = await User.findOne({ personal_info: personalDetails._id });
    if (!user || user.role !== 'student') {
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
        populate: { path: 'personal_info' }
      });

    if (!student) {
      return res.status(404).json({ message: 'Student details not found' });
    }

    const formattedStudent = {
      id: student._id,
      PRN: student.PRN,
      course: student.course,
      branch: student.branch,
      semester: student.semester,
      session: student.session,
      personal_info: {
        first_name: personalDetails.first_name,
        last_name: personalDetails.last_name,
        email: personalDetails.email,
        phone: personalDetails.phone,
        gender: personalDetails.gender
      }
    };

    res.status(200).json({
      message: 'Login successful',
      student: formattedStudent
    });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

