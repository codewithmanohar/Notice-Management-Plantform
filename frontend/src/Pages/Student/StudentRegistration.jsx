import React, { useState } from "react";
import {
  Sun,
  Moon,
  User,
  Mail,
  Phone as PhoneIcon,
  Lock,
  IdCard,
  BookOpen,
  Layers,
  Calendar,
} from "lucide-react";
import useAuthStore from "../../Store/useAuthStore";

export default function StudentRegistration() {
  const { studentRegister } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    PRN: "",
    course: "",
    branch: "",
    semester: "",
    session: "",
    role: "student",
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
    // studentRegister(formData);
    console.log(formData)
  };

  return (
    <div className="min-h-screen px-4 py-10 text-black bg-gradient-to-tr from-white via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white transition duration-100">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-900 dark:text-white">Student Registration</h2>
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Fields */}
          {[
            { name: "first_name", placeholder: "First Name", icon: <User /> },
            { name: "last_name", placeholder: "Last Name", icon: <User /> },
            { name: "email", placeholder: "Email", icon: <Mail />, type: "email" },
            { name: "phone", placeholder: "Phone", icon: <PhoneIcon />, type: "tel" },
            { name: "PRN", placeholder: "PRN", icon: <IdCard /> },
            { name: "course", placeholder: "Course", icon: <BookOpen /> },
            { name: "branch", placeholder: "Branch", icon: <Layers /> },
            { name: "semester", placeholder: "Semester", icon: <BookOpen /> },
            { name: "session", placeholder: "Session (e.g. 2022-2026)", icon: <Calendar /> },
          ].map(({ name, placeholder, icon, type = "text" }) => (
            <div key={name} className="relative">
              <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
              <input
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                type={type}
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          ))}

          {/* Gender */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Submit Button (Full Width) */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-900 dark:bg-blue-600 text-white px-8 py-2 rounded-full hover:opacity-90 transition"
            >
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
