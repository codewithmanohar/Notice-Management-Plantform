import React from "react";
import { Menu, Sun, Moon, LogOut } from "lucide-react";

export default function FacultyTopbar({ darkMode, toggleDarkMode, setSidebarOpen }) {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center gap-4">
        {/* Hamburger for Mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
          Faculty Dashboard
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
  );
}
