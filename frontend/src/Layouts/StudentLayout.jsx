import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentTopbar from "../Components/Student/StudentTopbar";
import StudentSidebar from "../Components/Student/StudentSidebar";

export default function StudentLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      {/* Sidebar */}
      <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <StudentTopbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
