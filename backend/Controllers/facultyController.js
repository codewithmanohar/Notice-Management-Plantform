import bcrypt from 'bcrypt';
import PersonalDetails from '../Models/personal_details.js';
import User, { UserRole } from '../Models/User.js';
import Faculty from '../Models/Faculty.js';
import generateUniqueFacultyId from '../Helper/generateUniqueFacultyId.js';

// Register a new faculty
export const registerFaculty = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, gender, password, department, designation } = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !phone || !gender || !password || !department || !designation) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if email already exists
    const existingPersonalDetails = await PersonalDetails.findOne({ email });
    if (existingPersonalDetails) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create PersonalDetails document
    const personalDetails = new PersonalDetails({
      first_name,
      last_name,
      email,
      phone,
      gender,
    });
    await personalDetails.save();

    // Create User document with role 'faculty'
    const user = new User({
      role: 'faculty',
      password: hashedPassword,
      personal_info: personalDetails._id,
    });
    await user.save();

    // Generate unique faculty_id
    const facultyId = await generateUniqueFacultyId();

    // Create Faculty document
    const faculty = new Faculty({
      user_id: user._id,
      faculty_id: facultyId,
      department,
      designation,
    });
    await faculty.save();

    return res.status(201).json({
      message: 'Faculty registered successfully',
      faculty: {
        faculty_id: faculty.faculty_id,
        email: personalDetails.email,
        role: user.role,
        department: faculty.department,
        designation: faculty.designation,
      },
    });
  } catch (error) {
    console.error('Faculty registration error:', error);
    return res.status(500).json({ message: 'Server error during faculty registration' });
  }
};

// Login a faculty
export const loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find PersonalDetails by email
    const personalDetails = await PersonalDetails.findOne({ email });
    if (!personalDetails) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Find User by personal_info
    const user = await User.findOne({ personal_info: personalDetails._id });
    if (!user || user.role !== 'faculty') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Find Faculty by user_id
    const faculty = await Faculty.findOne({ user_id: user._id });
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty record not found' });
    }

    return res.status(200).json({
      message: 'Login successful',
      role: user.role,
      faculty: {
        faculty_id: faculty.faculty_id,
        email: personalDetails.email,
        department: faculty.department,
        designation: faculty.designation,
      },
    });
  } catch (error) {
    console.error('Faculty login error:', error);
    return res.status(500).json({ message: 'Server error during faculty login' });
  }
};

// Get faculty details by faculty_id or email
export const getFacultyDetails = async (req, res) => {
  try {
    const { faculty_id, email } = req.query;

    if (!faculty_id && !email) {
      return res.status(400).json({ message: 'Provide either faculty_id or email' });
    }

    let faculty;
    let personalDetails;

    if (faculty_id) {
      faculty = await Faculty.findOne({ faculty_id }).populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    } else if (email) {
      personalDetails = await PersonalDetails.findOne({ email });
      if (!personalDetails) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
      const user = await User.findOne({ personal_info: personalDetails._id });
      if (!user || user.role !== 'faculty') {
        return res.status(404).json({ message: 'Faculty not found' });
      }
      faculty = await Faculty.findOne({ user_id: user._id }).populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    }

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    return res.status(200).json({
      message: 'Faculty details retrieved successfully',
      faculty: {
        faculty_id: faculty.faculty_id,
        first_name: faculty.user_id.personal_info.first_name,
        last_name: faculty.user_id.personal_info.last_name,
        email: faculty.user_id.personal_info.email,
        phone: faculty.user_id.personal_info.phone,
        gender: faculty.user_id.personal_info.gender,
        role: faculty.user_id.role,
        department: faculty.department,
        designation: faculty.designation,
        created_at: faculty.user_id.created_at,
      },
    });
  } catch (error) {
    console.error('Get faculty details error:', error);
    return res.status(500).json({ message: 'Server error while retrieving faculty details' });
  }
};

// Update faculty details
export const updateFaculty = async (req, res) => {
  try {
    const { faculty_id, first_name, last_name, email, phone, gender, password, department, designation } = req.body;

    if (!faculty_id) {
      return res.status(400).json({ message: 'faculty_id is required' });
    }

    // Find Faculty
    const faculty = await Faculty.findOne({ faculty_id }).populate({
      path: 'user_id',
      populate: { path: 'personal_info' },
    });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    // Update PersonalDetails if provided
    const personalDetails = await PersonalDetails.findById(faculty.user_id.personal_info._id);
    if (email && email !== personalDetails.email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      // Check for email uniqueness
      const existingEmail = await PersonalDetails.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      personalDetails.email = email;
    }
    if (first_name) personalDetails.first_name = first_name;
    if (last_name) personalDetails.last_name = last_name;
    if (phone) personalDetails.phone = phone;
    if (gender) personalDetails.gender = gender;

    await personalDetails.save();

    // Update Faculty-specific fields if provided
    if (department) faculty.department = department;
    if (designation) faculty.designation = designation;

    await faculty.save();

    // Update password if provided
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.findById(faculty.user_id._id);
      user.password = hashedPassword;
      await user.save();
    }

    return res.status(200).json({
      message: 'Faculty updated successfully',
      faculty: {
        faculty_id: faculty.faculty_id,
        email: personalDetails.email,
        role: faculty.user_id.role,
        department: faculty.department,
        designation: faculty.designation,
      },
    });
  } catch (error) {
    console.error('Update faculty error:', error);
    return res.status(500).json({ message: 'Server error during faculty update' });
  }
};

// Delete a faculty
export const deleteFaculty = async (req, res) => {
  try {
    const { faculty_id } = req.body;

    if (!faculty_id) {
      return res.status(400).json({ message: 'faculty_id is required' });
    }

    // Find Faculty
    const faculty = await Faculty.findOne({ faculty_id }).populate({
      path: 'user_id',
      populate: { path: 'personal_info' },
    });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    // Delete Faculty, User, and PersonalDetails
    await Faculty.deleteOne({ _id: faculty._id });
    await User.deleteOne({ _id: faculty.user_id._id });
    await PersonalDetails.deleteOne({ _id: faculty.user_id.personal_info._id });

    return res.status(200).json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Delete faculty error:', error);
    return res.status(500).json({ message: 'Server error during faculty deletion' });
  }
};


// Delete a faculty
export const getAllFaculty = async (req, res) => {
  try {

    // Find Faculty
    const faculty = await Faculty.find({}).populate({
      path: 'user_id',
      select: '-password',
      populate: { path: 'personal_info' },
    });
    if(faculty){
      return res.status(200).json({faculty});
    }
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

  } catch (error) {
    console.error('Delete faculty error:', error);
    return res.status(500).json({ message: 'Server error during faculty deletion' });
  }
};