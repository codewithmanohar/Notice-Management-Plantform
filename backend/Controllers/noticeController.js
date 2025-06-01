import Notice from '../Models/notice.js';
import cloudinary from '../Middlewares/uploadMiddleware.js';
import User from '../Models/User.js';
// import { UserRole } from './User.js';

export const createNoticeController = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      postedBy,
      postedBy_role,
      target_filters,
      attachments, // base64 or array of base64 strings
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !priority || !postedBy || !postedBy_role) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    let uploadedAttachments = [];

    // Optional: Upload each attachment to Cloudinary if exists
    if (attachments && attachments.length > 0) {
      for (const file of attachments) {
        const uploaded = await cloudinary.uploader.upload(file, {
          folder: "notices",
        });
        if (uploaded?.secure_url) {
          uploadedAttachments.push(uploaded.secure_url);
        }
      }
    }

    // Create and save the notice
    const newNotice = new Notice({
      title,
      description,
      category,
      priority,
      postedBy,
      postedBy_role,
      attachments: uploadedAttachments,
      target_filters: target_filters || {}, // Optional targeting
    });

    const savedNotice = await newNotice.save();
    return res.status(201).json({
      message: "Notice created successfully",
      notice: savedNotice,
    });

  } catch (error) {
    console.error("Error creating notice:", error);
    return res.status(500).json({ message: "Server error during notice creation", error });
  }
};


// // Create a new notice
// export const createNotice = async (req, res) => {
//   try {
//     const { title, description, postedBy, postedBy_role, category, attachments, priority, target_filters } = req.body;

//     // Validate role
//     if (!UserRole.includes(postedBy_role)) {
//       return res.status(400).json({ message: 'Invalid role' });
//     }

//     // Verify postedBy user exists and has the correct role
//     const user = await User.findById(postedBy);
//     if (!user || user.role !== postedBy_role) {
//       return res.status(400).json({ message: 'Invalid postedBy user or role mismatch' });
//     }

//     // Validate required fields
//     if (!title || !description || !category || !priority) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create notice
//     const notice = new Notice({
//       title,
//       description,
//       postedBy,
//       postedBy_role,
//       category,
//       attachments: attachments || [],
//       priority,
//       target_filters: {
//         department: target_filters?.department || [],
//         year: target_filters?.year || [],
//       },
//     });

//     await notice.save();

//     // Populate postedBy for response
//     const populatedNotice = await Notice.findById(notice._id)
//       .populate({
//         path: 'postedBy',
//         populate: { path: 'personal_info' },
//       });

//     res.status(201).json({ message: 'Notice created successfully', notice: populatedNotice });
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating notice', error: error.message });
//   }
// };

// Get all notices with optional filtering
export const getAllNotices = async (req, res) => {
  try {
    const { department, year } = req.query;

    // Build filter object
    const filter = {};
    if (department) {
      filter['target_filters.department'] = { $in: department.split(',') };
    }
    if (year) {
      filter['target_filters.year'] = { $in: year.split(',') };
    }

    const notices = await Notice.find(filter)
      .populate({
        path: 'postedBy',
        populate: { path: 'personal_info' },
      })
      .sort({ datePosted: -1 }); // Sort by most recent

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices', error: error.message });
  }
};

// Get notices by category
export const getNoticesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const notices = await Notice.find({ category })
      .populate({
        path: 'postedBy',
        populate: { path: 'personal_info' },
      })
      .sort({ datePosted: -1 }); // Sort by most recent

    if (notices.length === 0) {
      return res.status(404).json({ message: 'No notices found for this category' });
    }

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices by category', error: error.message });
  }
};

// Get notice by ID
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate({
        path: 'postedBy',
        populate: { path: 'personal_info' },
      });

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notice', error: error.message });
  }
};

// Update a notice
export const updateNotice = async (req, res) => {
  try {
    const { title, description, category, attachments, priority, target_filters } = req.body;

    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Update fields
    const updateData = {
      title: title || notice.title,
      description: description || notice.description,
      category: category || notice.category,
      attachments: attachments || notice.attachments,
      priority: priority || notice.priority,
      target_filters: {
        department: target_filters?.department || notice.target_filters.department,
        year: target_filters?.year || notice.target_filters.year,
      },
    };

    await Notice.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Populate updated notice
    const updatedNotice = await Notice.findById(req.params.id)
      .populate({
        path: 'postedBy',
        populate: { path: 'personal_info' },
      });

    res.status(200).json({ message: 'Notice updated successfully', notice: updatedNotice });
  } catch (error) {
    res.status(400).json({ message: 'Error updating notice', error: error.message });
  }
};

// Delete a notice
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notice', error: error.message });
  }
};