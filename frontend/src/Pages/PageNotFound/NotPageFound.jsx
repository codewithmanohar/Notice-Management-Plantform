import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="text-yellow-500 dark:text-yellow-400 w-16 h-16 mb-4" />
      <h1 className="text-5xl font-bold text-blue-900 dark:text-white mb-2">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="inline-block bg-blue-900 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
