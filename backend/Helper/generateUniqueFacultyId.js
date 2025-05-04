import Faculty from "../Models/Faculty.js";

async function generateUniqueFacultyId() {
    let facultyId;
    let isUnique = false;
    while (!isUnique) {
      facultyId = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
      const existingFaculty = await Faculty.findOne({ faculty_id: facultyId });
      if (!existingFaculty) {
        isUnique = true;
      }
    }
    return facultyId;
}

export default generateUniqueFacultyId;