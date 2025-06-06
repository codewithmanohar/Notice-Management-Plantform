import React from "react";
import { Menu, Sun, Moon, LogOut , User, User2} from "lucide-react";
import useAuthStore from "../../Store/useAuthStore";
import { useState } from "react";
import { useEffect } from "react";


export default function StudentTopbar({ toggleDarkMode, darkMode, setSidebarOpen }) {
  const [user , setUser ] = useState("No User");
  const { authUser, checkAuth, isLoading } = useAuthStore();
  
  useEffect(() => {
    console.log(authUser);
    setUser(authUser.student.first_name);
  },[]);

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
          Student Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <p className="flex gap-1"><User className="size-5"/>{user}</p>
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
