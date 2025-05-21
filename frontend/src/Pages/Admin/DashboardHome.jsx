import React from "react";
import { Users, FileText, Activity, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-6">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Total Users"
          count="128"
          icon={<Users className="w-6 h-6" />}
          bg="bg-blue-100 dark:bg-blue-800"
        />
        <DashboardCard
          title="Notices Posted"
          count="47"
          icon={<FileText className="w-6 h-6" />}
          bg="bg-green-100 dark:bg-green-800"
        />
        <DashboardCard
          title="Active Faculty"
          count="21"
          icon={<Activity className="w-6 h-6" />}
          bg="bg-yellow-100 dark:bg-yellow-800"
        />
        <DashboardCard
          title="Settings Accessed"
          count="9"
          icon={<Settings className="w-6 h-6" />}
          bg="bg-purple-100 dark:bg-purple-800"
        />
      </div>

      {/* Welcome Message */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">
          Welcome, Admin 👋
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          This is your dashboard where you can manage users, approve faculty, post notices, and configure system settings. Use the side menu to navigate through your administrative tasks.
        </p>
      </div>
    </div>
  );
}

function DashboardCard({ title, count, icon, bg }) {
  return (
    <div className={`${bg} p-4 rounded-lg shadow-md text-blue-900 dark:text-white flex items-center gap-4`}>
      <div className="bg-white dark:bg-gray-900 p-2 rounded-full shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}
