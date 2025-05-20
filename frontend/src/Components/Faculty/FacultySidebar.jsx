import React from "react";
import { NavLink } from "react-router-dom";

export default function FacultySidebar({ sidebarOpen, setSidebarOpen }) {
  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded-md transition font-medium ${
      isActive
        ? "bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white"
        : "hover:bg-blue-100 dark:hover:bg-blue-700"
    }`;

  const links = [
    { path: "/faculty/dashboard", name: "Dashboard" },
    { path: "/faculty/create-notice", name: "Create Notice" },
    { path: "/faculty/profile", name: "Profile" },
    { path: "/faculty/settings", name: "Settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-blue-900 dark:text-white">Faculty Panel</h2>
        <nav className="space-y-4">
          {links.map((link) => (
            <NavLink to={link.path} key={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 bg-white dark:bg-gray-800 shadow-md h-full p-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-900 dark:text-white">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <nav className="space-y-4">
              {links.map((link) => (
                <NavLink to={link.path} key={link.path} className={navLinkClass}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
