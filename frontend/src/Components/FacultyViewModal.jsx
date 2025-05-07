import React from "react";

export default function FacultyViewModal({
  faculty,
  onApprove,
  onReject,
  onClose,
  isProcessing,
}) {
  if (!faculty) return null;

  const info = faculty.user_id.personal_info;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-2xl p-6 animate-fade-in border-t-4 border-blue-900 dark:border-blue-600">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-4">
          Faculty Details
        </h2>
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {info.first_name} {info.last_name}</p>
          <p><strong>Email:</strong> {info.email}</p>
          <p><strong>Phone:</strong> {info.phone}</p>
          <p><strong>Gender:</strong> {info.gender}</p>
          <p><strong>Faculty ID:</strong> {faculty.faculty_id}</p>
          <p><strong>Department:</strong> {faculty.department}</p>
          <p><strong>Designation:</strong> {faculty.designation}</p>
          <p><strong>Status:</strong>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              faculty.isApproved
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {faculty.isApproved ? "Approved" : "Pending"}
            </span>
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {!faculty.isApproved && (
            <>
              <button
                onClick={() => onApprove(faculty._id)}
                disabled={isProcessing}
                className="bg-blue-900 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
              >
                {isProcessing ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={() => onReject(faculty._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Reject
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
