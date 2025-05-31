import React, { useState } from "react";
import { Sun, Moon, Eye, EyeOff, Text, ToggleLeft, ToggleRight } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const toggleContrast = () => {
    setHighContrast(!highContrast);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 space-y-8">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">Theme & Accessibility Settings</h2>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="text-yellow-400" /> : <Sun className="text-blue-600" />}
            <span>Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-300 dark:bg-gray-700 px-4 py-1.5 rounded-full text-sm"
          >
            {darkMode ? "Disable" : "Enable"}
          </button>
        </div>

        {/* High Contrast Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {highContrast ? <EyeOff className="text-purple-500" /> : <Eye className="text-gray-500" />}
            <span>High Contrast Mode</span>
          </div>
          <button
            onClick={toggleContrast}
            className={`px-4 py-1.5 rounded-full text-sm ${
              highContrast
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {highContrast ? "Enabled" : "Enable"}
          </button>
        </div>

        {/* Font Size Selector */}
        <div>
          <label className="mb-2 flex items-center gap-2">
            <Text className="text-blue-600" />
            Font Size
          </label>
          <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="small">Small</option>
            <option value="medium">Medium (Default)</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
}
