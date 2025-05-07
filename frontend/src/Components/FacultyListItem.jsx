import React from "react";

export default function FacultyListItem({ faculty, onViewDetails }) {
  const { first_name, last_name } = faculty.user_id.personal_info;

  return (
    <tr className="bg-white hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 border-b">{first_name} {last_name}</td>
      <td className="py-4 px-6 border-b">{faculty.faculty_id}</td>
      <td className="py-4 px-6 border-b">{faculty.department}</td>
      <td className="py-4 px-6 border-b">{faculty.designation}</td>
      <td className="py-4 px-6 border-b">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
          faculty.isApproved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {faculty.isApproved ? "Approved" : "Pending"}
        </span>
      </td>
      <td className="py-4 px-6 border-b">
        <button
          onClick={() => onViewDetails(faculty)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          <i className="fas fa-eye mr-1"></i>View
        </button>
      </td>
    </tr>
  );
}
