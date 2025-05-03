import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import PersonalDetails from '../Models/personal_details.js';
import User, { UserRole } from '../Models/User.js';
import Admin from '../Models/Admin.js';
import generateUniqueAdminId from '../Helper/generateUniqueAdminId.js';


// Register a new admin
export const registerAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { first_name, last_name, email, phone, gender, password } = req.body;

    // Validate input
    if (!first_name || !last_name || !email || !phone || !gender || !password) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if email already exists
    const existingPersonalDetails = await PersonalDetails.findOne({ email }).session(session);
    if (existingPersonalDetails) {
      await session.abortTransaction();
      session.endSession();
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
    await personalDetails.save({ session });

    // Create User document with role 'admin'
    const user = new User({
      role: 'admin',
      password: hashedPassword,
      personal_info: personalDetails._id,
    });
    await user.save({ session });

    // Generate unique admin_id
    const adminId = await generateUniqueAdminId();

    // Create Admin document
    const admin = new Admin({
      user_id: user._id,
      admin_id: adminId,
    });
    await admin.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        admin_id: admin.admin_id,
        email: personalDetails.email,
        role: user.role,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Admin registration error:', error);
    return res.status(500).json({ message: 'Server error during admin registration' });
  }
};

// Login an admin
export const loginAdmin = async (req, res) => {
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
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Find Admin by user_id
    const admin = await Admin.findOne({ user_id: user._id });
    if (!admin) {
      return res.status(404).json({ message: 'Admin record not found' });
    }

    return res.status(200).json({
      message: 'Login successful',
      admin: {
        admin_id: admin.admin_id,
        email: personalDetails.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ message: 'Server error during admin login' });
  }
};

// Get admin details by admin_id or email
export const getAdminDetails = async (req, res) => {
  try {
    const { admin_id, email } = req.query;

    if (!admin_id && !email) {
      return res.status(400).json({ message: 'Provide either admin_id or email' });
    }

    let admin;
    let personalDetails;

    if (admin_id) {
      admin = await Admin.findOne({ admin_id }).populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    } else if (email) {
      personalDetails = await PersonalDetails.findOne({ email });
      if (!personalDetails) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      const user = await User.findOne({ personal_info: personalDetails._id });
      if (!user || user.role !== 'admin') {
        return res.status(404).json({ message: 'Admin not found' });
      }
      admin = await Admin.findOne({ user_id: user._id }).populate({
        path: 'user_id',
        populate: { path: 'personal_info' },
      });
    }

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    return res.status(200).json({
      message: 'Admin details retrieved successfully',
      admin: {
        admin_id: admin.admin_id,
        first_name: admin.user_id.personal_info.first_name,
        last_name: admin.user_id.personal_info.last_name,
        email: admin.user_id.personal_info.email,
        phone: admin.user_id.personal_info.phone,
        gender: admin.user_id.personal_info.gender,
        role: admin.user_id.role,
        created_at: admin.user_id.created_at,
      },
    });
  } catch (error) {
    console.error('Get admin details error:', error);
    return res.status(500).json({ message: 'Server error while retrieving admin details' });
  }
};

// Update admin details
export const updateAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { admin_id, first_name, last_name, email, phone, gender, password } = req.body;

    if (!admin_id) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'admin_id is required' });
    }

    // Find Admin
    const admin = await Admin.findOne({ admin_id }).populate({
      path: 'user_id',
      populate: { path: 'personal_info' },
    }).session(session);

    if (!admin) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update PersonalDetails if provided
    const personalDetails = await PersonalDetails.findById(admin.user_id.personal_info._id).session(session);
    if (email && email !== personalDetails.email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Invalid email format' });
      }
      // Check for email uniqueness
      const existingEmail = await PersonalDetails.findOne({ email }).session(session);
      if (existingEmail) {
        await session.abortTransaction();
        session.endSession();
        return res.status(409).json({ message: 'Email already in use' });
      }
      personalDetails.email = email;
    }
    if (first_name) personalDetails.first_name = first_name;
    if (last_name) personalDetails.last_name = last_name;
    if (phone) personalDetails.phone = phone;
    if (gender) personalDetails.gender = gender;

    await personalDetails.save({ session });

    // Update password if provided
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.findById(admin.user_id._id).session(session);
      user.password = hashedPassword;
      await user.save({ session });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: 'Admin updated successfully',
      admin: {
        admin_id: admin.admin_id,
        email: personalDetails.email,
        role: admin.user_id.role,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Update admin error:', error);
    return res.status(500).json({ message: 'Server error during admin update' });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { admin_id } = req.body;

    if (!admin_id) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'admin_id is required' });
    }

    // Find Admin
    const admin = await Admin.findOne({ admin_id }).populate({
      path: 'user_id',
      populate: { path: 'personal_info' },
    }).session(session);

    if (!admin) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Delete Admin, User, and PersonalDetails
    await Admin.deleteOne({ _id: admin._id }).session(session);
    await User.deleteOne({ _id: admin.user_id._id }).session(session);
    await PersonalDetails.deleteOne({ _id: admin.user_id.personal_info._id }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Delete admin error:', error);
    return res.status(500).json({ message: 'Server error during admin deletion' });
  }
};