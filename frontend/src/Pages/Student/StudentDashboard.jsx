import React from "react";

export default function StudentDashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all">
      <h2 className="text-2xl font-semibold text-blue-900 dark:text-white mb-4">
        Welcome to Your Student Dashboard 🎓
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Notices */}
        <div className="p-5 bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-white rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-medium">Latest Notices</h3>
          <p className="text-sm mt-2">Check all recent notices for your department and year.</p>
        </div>

        {/* Academic Info */}
        <div className="p-5 bg-green-50 dark:bg-green-900 text-green-900 dark:text-white rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-medium">Academic Updates</h3>
          <p className="text-sm mt-2">View exam dates, results, class updates, and more.</p>
        </div>

        {/* Profile Summary */}
        <div className="p-5 bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-white rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-medium">Your Profile</h3>
          <p className="text-sm mt-2">Keep your information up to date to receive relevant notices.</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Recent Activity
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>📅 Joined "Tech Fest 2025" event - May 15</li>
          <li>📝 New notice on "Internal Exams" added - May 12</li>
          <li>✅ Profile updated - May 10</li>
        </ul>
      </div>
    </div>
  );
}
