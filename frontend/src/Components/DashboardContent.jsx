import React from "react";

export default function DashboardContent() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome, Admin 👋</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p>This is your admin dashboard where you can manage users, post notices, and handle platform settings.</p>
      </div>
    </main>
  );
}
