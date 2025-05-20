import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Topbar from "../../Components/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="flex-1 p-6">
          <Outlet /> {/* 👈 Renders nested route here */}
        </main>
      </div>
    </div>
  );
}
