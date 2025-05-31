import Notice from '../Models/notice.js';
import cloudinary from '../Middlewares/uploadMiddleware.js';


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
