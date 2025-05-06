import useAuthStore from "../Store/useAuthStore";
import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function FacultyRegistration() {
  const [darkMode, setDarkMode] = useState(false);
  const {facultyRegister} = useAuthStore(); 

  const [formData, setFormData] = useState({
    department: "",
    designation: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    role: "faculty",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    facultyRegister(formData);
  };

  return (    
    <div className="min-h-screen px-4 py-10 bg-gradient-to-tr from-white via-blue-100 to-blue-200 text-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  dark:text-white transition- duration-100">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-900 dark:text-white">
            Faculty Registration
          </h2>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-900" />
            )}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {[
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["department", "Department"],
            ["designation", "Designation"],
            ["email", "Email", "email"],
            ["phone", "Phone", "tel"],
          ].map(([name, placeholder, type = "text"]) => (
            <input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          ))}

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <div className="col-span-1 md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-900 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Register Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
