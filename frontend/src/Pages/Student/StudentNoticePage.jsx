// import React, { useState } from "react";

// // Example dummy data
// const dummyNotices = [
//   {
//     _id: "1",
//     title: "Semester Exam Schedule",
//     description: "Final exams begin from May 25th.",
//     category: "Exams",
//     datePosted: "2025-05-01",
//     priority: "High",
//   },
//   {
//     _id: "2",
//     title: "Holiday on Independence Day",
//     description: "College will remain closed on August 15th.",
//     category: "Holidays",
//     datePosted: "2025-04-25",
//     priority: "Low",
//   },
//   {
//     _id: "3",
//     title: "Tech Fest 2025",
//     description: "Join the event on June 10th.",
//     category: "Events",
//     datePosted: "2025-05-05",
//     priority: "Medium",
//   },
// ];

// export default function StudentNotices() {
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const filteredNotices = selectedCategory
//     ? dummyNotices.filter((notice) => notice.category === selectedCategory)
//     : dummyNotices;

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//       <h2 className="text-2xl font-bold mb-6">📢 Student Notices</h2>

//       {/* Category Filter */}
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Filter by Category</label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
//         >
//           <option value="">All Categories</option>
//           <option value="Exams">Exams</option>
//           <option value="Holidays">Holidays</option>
//           <option value="Events">Events</option>
//           <option value="General">General</option>
//         </select>
//       </div>

//       {/* Notices */}
//       <div className="space-y-4">
//         {filteredNotices.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">No notices found.</p>
//         ) : (
//           filteredNotices.map((notice) => (
//             <div
//               key={notice._id}
//               className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-blue-200 dark:border-gray-700"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-lg font-semibold text-blue-900 dark:text-white">
//                   {notice.title}
//                 </h3>
//                 <span
//                   className={`text-xs px-2 py-1 rounded-full ${
//                     notice.priority === "High"
//                       ? "bg-red-100 text-red-700"
//                       : notice.priority === "Medium"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-green-100 text-green-800"
//                   }`}
//                 >
//                   {notice.priority}
//                 </span>
//               </div>
//               <p className="text-sm mb-2">{notice.description}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Posted on: {new Date(notice.datePosted).toLocaleDateString()}
//               </p>
//               <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
//                 Category: {notice.category}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Bell, FileText, Calendar, Tag, Star, Filter } from "lucide-react";
import  useNoticeStore  from "../../Store/useNoticeStore";
import { useNavigate } from "react-router-dom";


export default function StudentNoticePage() {
  const [notices, setNotices] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const { getAllNotices } = useNoticeStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching from API
    const fetchNotices = async () => {
      const AllNotices = await getAllNotices();
      console.log(AllNotices);
      setNotices(AllNotices);
    }
    fetchNotices();
  }, []);

  const filteredNotices =
    filterCategory === "All"
      ? notices
      : notices.filter((notice) => notice.category === filterCategory);

  const categories = ["All", "Exams", "Events", "Holiday", "General"];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
            <Bell className="w-6 h-6" /> Notices
          </h1>

          <div className="flex items-center gap-2 ">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-300" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredNotices.length === 0 ? (
          <p className="text-center text-gray-500">No notices found.</p>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice._id}
              onClick={() => navigate(`/student/notices/${notice._id}`)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-blue-900 dark:text-white">
                  {notice.title}
                </h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    notice.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {notice.priority}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {notice.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(notice.datePosted).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={16} />
                  {notice.category}
                </div>
                {notice.target_filters?.department?.length > 0 && (
                  <div className="flex items-center gap-1">
                    🎓 Depts:
                    {notice.target_filters.department.join(", ")}
                  </div>
                )}
                {notice.target_filters?.year?.length > 0 && (
                  <div className="flex items-center gap-1">
                    🗓 Year:
                    {notice.target_filters.year.join(", ")}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}




