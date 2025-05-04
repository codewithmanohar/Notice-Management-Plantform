import Admin from "../Models/Admin.js";

async function generateUniqueAdminId() {
    let adminId;
    let isUnique = false;
    while (!isUnique) {
      adminId = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
      const existingAdmin = await Admin.findOne({ admin_id: adminId });
      if (!existingAdmin) {
        isUnique = true;
      }
    }
    return adminId;
  }

  export default generateUniqueAdminId ;