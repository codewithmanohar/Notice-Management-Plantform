



// src/components/StudentSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Bell, User, Settings } from "lucide-react";

export default function StudentSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: <Home size={18} /> },
    { name: "Notices", path: "/student/notices", icon: <Bell size={18} /> },
    { name: "Profile", path: "/student/profile", icon: <User size={18} /> },
    { name: "Settings", path: "/student/settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-full md:w-64 h-screen bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-blue-900 dark:text-white">
        Student Panel
      </h2>
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded-md transition font-medium ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
