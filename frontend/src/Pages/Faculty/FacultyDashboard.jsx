import React from "react";

export default function FacultyDashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-900 dark:text-white mb-4">
        Welcome, Faculty 👩‍🏫
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        This is your personalized dashboard to manage academic notices, view relevant updates, and access your profile.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="p-5 bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-white rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-2">Total Notices Created</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="p-5 bg-green-50 dark:bg-green-900 text-green-900 dark:text-white rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="p-5 bg-yellow-50 dark:bg-yellow-800 text-yellow-800 dark:text-white rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recent Notices</h3>
        <ul className="divide-y divide-gray-300 dark:divide-gray-600">
          <li className="py-3 flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Mid-Sem Exam Schedule Released</span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">AI Workshop Notice</span>
            <span className="text-sm text-gray-500">4 days ago</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">New Lab Timetable</span>
            <span className="text-sm text-gray-500">1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
