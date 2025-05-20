import React, { useEffect, useState } from "react";
import { Menu, Sun, Moon, LogOut, X, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import FacultyViewModal from "../../Components/FacultyViewModal";
import useAdminStore from "../../Store/useAdminStore";

export default function FacultyApprovalDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { getAllFaculty , approveFaculty , deleteFaculty} = useAdminStore();
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  // ✅ Load faculty from Zustand store (API call inside store)
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const faculties = await getAllFaculty();
        // Only keep pending ones
        const pendingFaculties = faculties.filter((f) => !f.isApproved);
        setFacultyList(pendingFaculties);
      } catch (err) {
        console.error("Error loading faculty list:", err);
      }
    };
    fetchFaculties();
  }, [getAllFaculty]);
  

  // ✅ Approve selected faculty
  const handleApprove = async () => {
    if (!selectedFaculty) return;
    try {
      setIsProcessing(true);
  
      const isApproved = await approveFaculty(selectedFaculty.faculty_id);
      if (!isApproved) return;
  
      // ✅ Remove approved faculty from list
      setFacultyList((prev) =>
        prev.filter((f) => f._id !== selectedFaculty._id)
      );
  
      setSelectedFaculty(null);
    } catch (error) {
      console.error("Failed to approve faculty:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  

  // ✅ Reject / Deleted selected faculty
  const handleReject = async () => {
    if (!selectedFaculty) return;
     // ✅ Call backend to deleting faculty by faculty_id
     console.log(selectedFaculty.faculty_id);
    const res = deleteFaculty(selectedFaculty.faculty_id);
    if(!res) return
    setFacultyList((prev) =>
      prev.filter((f) => f._id !== selectedFaculty._id)
    );
    setSelectedFaculty(null);
  };

  const closeModal = () => setSelectedFaculty(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Faculty Table */}
        <main className="flex-1 p-0">
          <h2 className="text-xl font-semibold mb-4">Pending Faculty Approvals</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Faculty ID</th>
                  <th className="text-left py-2 px-4">Department</th>
                  <th className="text-left py-2 px-4">Designation</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty._id} className="border-t border-gray-300 dark:border-gray-700">
                    <td className="py-2 px-4">
                      {faculty.user_id.personal_info.first_name}{" "}
                      {faculty.user_id.personal_info.last_name}
                    </td>
                    <td className="py-2 px-4">{faculty.faculty_id}</td>
                    <td className="py-2 px-4">{faculty.department}</td>
                    <td className="py-2 px-4">{faculty.designation}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        faculty.isApproved ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                      }`}>
                        {faculty.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                        onClick={() => setSelectedFaculty(faculty)}
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </button>
                    </td>
                  </tr>
                ))}
                {facultyList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No faculty pending approval.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* View Modal */}
        {selectedFaculty && (
          <FacultyViewModal
            faculty={selectedFaculty}
            onApprove={handleApprove}
            onReject={handleReject}
            onClose={closeModal}
            isProcessing={isProcessing}
          />
        )}
      </div>
    </div>
  );
}
