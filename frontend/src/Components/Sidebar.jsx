import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `block py-2 px-3 rounded-md transition ${
      isActive(path)
        ? "bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white font-semibold"
        : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200"
    }`;

  return (
    <aside className="hidden md:block md:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
      <h2 className="text-xl font-bold mb-6 text-blue-900 dark:text-white">Admin Panel</h2>
      <nav className="space-y-2">
        <Link to="/admin/dashboard" className={linkClasses("/admin/dashboard")}>
          Dashboard
        </Link>
        <Link to="/admin/users" className={linkClasses("/admin/users")}>
          Approve Faculty
        </Link>
        <Link to="/admin/notices" className={linkClasses("/admin/notices")}>
          Create Notices
        </Link>
        <Link to="/admin/settings" className={linkClasses("/admin/settings")}>
          setting 
        </Link>
      </nav>
    </aside>
  );
}
