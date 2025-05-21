import React, { useState } from "react";

// Example dummy data
const dummyNotices = [
  {
    _id: "1",
    title: "Semester Exam Schedule",
    description: "Final exams begin from May 25th.",
    category: "Exams",
    datePosted: "2025-05-01",
    priority: "High",
  },
  {
    _id: "2",
    title: "Holiday on Independence Day",
    description: "College will remain closed on August 15th.",
    category: "Holidays",
    datePosted: "2025-04-25",
    priority: "Low",
  },
  {
    _id: "3",
    title: "Tech Fest 2025",
    description: "Join the event on June 10th.",
    category: "Events",
    datePosted: "2025-05-05",
    priority: "Medium",
  },
];

export default function StudentNotices() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredNotices = selectedCategory
    ? dummyNotices.filter((notice) => notice.category === selectedCategory)
    : dummyNotices;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">📢 Student Notices</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Filter by Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">All Categories</option>
          <option value="Exams">Exams</option>
          <option value="Holidays">Holidays</option>
          <option value="Events">Events</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Notices */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No notices found.</p>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-blue-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-white">
                  {notice.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    notice.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : notice.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {notice.priority}
                </span>
              </div>
              <p className="text-sm mb-2">{notice.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Posted on: {new Date(notice.datePosted).toLocaleDateString()}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Category: {notice.category}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
