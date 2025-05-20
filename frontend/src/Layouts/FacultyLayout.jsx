import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FacultySidebar from "../Components/Faculty/FacultySidebar";
import FacultyTopbar from "../Components/Faculty/FacultyTopbar";

export default function FacultyLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <FacultySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <FacultyTopbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
