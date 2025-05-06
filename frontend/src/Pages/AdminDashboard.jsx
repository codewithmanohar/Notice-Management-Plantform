import React, { useState } from "react";
import { Menu, Sun, Moon, LogOut, X } from "lucide-react";

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">

      {/* Sidebar for Desktop */}
      <aside className="hidden md:block md:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-blue-900 dark:text-white">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">Dashboard</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">Manage Users</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">Notices</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">System Settings</a>
        </nav>
      </aside>

      {/* Sidebar Drawer for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <aside
            className="w-64 bg-white dark:bg-gray-800 shadow-md h-full p-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-900 dark:text-white">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-gray-800 dark:text-white" />
              </button>
            </div>
            <nav className="space-y-4">
              <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">Dashboard</a>
              <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">Manage Users</a>
              <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">Notices</a>
              <a href="#" className="block py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700 transition">System Settings</a>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center gap-4">
            {/* Hamburger Icon for mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-900" />
              )}
            </button>
            <button className="flex items-center gap-1 text-red-500 hover:text-red-600 transition">
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, Admin 👋</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p>This is your admin dashboard where you can manage users, post notices, and handle platform settings.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
