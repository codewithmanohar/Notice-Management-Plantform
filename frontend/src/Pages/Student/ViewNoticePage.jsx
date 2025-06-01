// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useNoticeStore from "../../Store/useNoticeStore";
// import { Calendar, Tag } from "lucide-react";

// export default function ViewNoticePage() {
//   const { id } = useParams();
//   const { getAllNotices } = useNoticeStore();
//   const [notice, setNotice] = useState(null);

//   useEffect(() => {
//     const fetchNotice = async () => {
//       const notices = await getAllNotices();
//       const foundNotice = notices.find((n) => n._id === id);
//       setNotice(foundNotice);
//     };
//     fetchNotice();
//   }, [id, getAllNotices]);

//   if (!notice) {
//     return <p className="text-center mt-10 text-gray-500">Loading notice...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
//       <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
//         <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-2">
//           {notice.title}
//         </h1>
//         <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex gap-4 flex-wrap">
//           <span className="flex items-center gap-1">
//             <Calendar size={16} />
//             {new Date(notice.datePosted).toLocaleDateString()}
//           </span>
//           <span className="flex items-center gap-1">
//             <Tag size={16} />
//             {notice.category}
//           </span>
//           <span className={`px-3 py-1 rounded-full text-xs ${notice.priority === "High" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
//             {notice.priority}
//           </span>
//         </div>
//         <p className="text-gray-800 dark:text-gray-200 mb-4">{notice.description}</p>

//         {notice.target_filters?.department?.length > 0 && (
//           <p>🎓 Departments: {notice.target_filters.department.join(", ")}</p>
//         )}
//         {notice.target_filters?.year?.length > 0 && (
//           <p>🗓 Years: {notice.target_filters.year.join(", ")}</p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNoticeStore from "../../Store/useNoticeStore";
import { Calendar, Tag } from "lucide-react";
import FeedbackModal from "../../Components/Student/FeedbackModal"; // <-- import modal

export default function ViewNoticePage() {
  const { id } = useParams();
  const { getAllNotices } = useNoticeStore();
  const [notice, setNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      const notices = await getAllNotices();
      const foundNotice = notices.find((n) => n._id === id);
      setNotice(foundNotice);
    };
    fetchNotice();
  }, [id, getAllNotices]);

  const handleFeedbackSubmit = async (feedbackText) => {
    // Replace with actual API call
    console.log("Feedback submitted:", feedbackText, "for Notice ID:", id);
    // e.g. await sendFeedback({ noticeId: id, feedback: feedbackText });
  };

  if (!notice) {
    return <p className="text-center mt-10 text-gray-500">Loading notice...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-2">
          {notice.title}
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(notice.datePosted).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Tag size={16} />
            {notice.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs ${notice.priority === "High" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            {notice.priority}
          </span>
        </div>
        <p className="text-gray-800 dark:text-gray-200 mb-4">{notice.description}</p>

        {notice.target_filters?.department?.length > 0 && (
          <p>🎓 Departments: {notice.target_filters.department.join(", ")}</p>
        )}
        {notice.target_filters?.year?.length > 0 && (
          <p>🗓 Years: {notice.target_filters.year.join(", ")}</p>
        )}

        <div className="mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            Give Feedback
          </button>
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
