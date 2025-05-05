import React, { useState, useEffect } from "react";
import { Megaphone, Users, BellRing, ShieldCheck, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Role-Based Access",
    description: "Secure access for Admins, Faculty, and Students with personalized dashboards.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Real-time Notifications",
    description: "Get instant email, in-app, and push alerts for new notices.",
    icon: <BellRing className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Notice Management",
    description: "Post, edit, delete, and categorize notices with attachments easily.",
    icon: <Megaphone className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "User Engagement Insights",
    description: "Track notice views, manage user roles, and see engagement analytics.",
    icon: <Users className="w-8 h-8 text-blue-600" />,
  },
];

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <header className="relative bg-gradient-to-r from-blue-900 to-black py-16 text-center text-white">
        <div className="absolute top-4 right-6 flex gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded-full shadow"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/login" className="bg-white text-blue-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition text-sm">
            Login
          </Link>
          <Link to="/admin/register" className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition text-sm">
            Register
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">University Notice Board</h1>
        <p className="mt-4 text-lg md:text-xl">Efficiently manage and distribute university notices with real-time updates</p>
      </header>

      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10 text-blue-900 dark:text-white">Why Use This Platform?</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-black dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6 border-t dark:border-gray-700">
        &copy; {new Date().getFullYear()} University Notice Board. All rights reserved.
      </footer>
    </div>
  );
}
