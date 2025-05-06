// import React, { useState } from "react";
// import { Sun, Moon } from "lucide-react";

// export default function LoginPage() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [formData, setFormData] = useState({
//     role: "",
//     email: "",
//     password: "",
//   });

//   const toggleDarkMode = () => {
//     document.documentElement.classList.toggle("dark");
//     setDarkMode(!darkMode);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login Submitted:", formData);
//   };

//   return (
//     <div className="min-h-screen px-4 py-10 bg-white text-black dark:bg-slate-900 dark:text-white transition duration-300">
//       <div className="max-w-md mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-blue-900 dark:text-white">
//             Login
//           </h2>
//           <button
//             onClick={toggleDarkMode}
//             className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
//           >
//             {darkMode ? (
//               <Sun className="w-5 h-5 text-yellow-400" />
//             ) : (
//               <Moon className="w-5 h-5 text-gray-900" />
//             )}
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
    
//           {/* Email */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
//             required
//           />

//           {/* Password */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
//             required
//           />

//           {/* Role selection */}
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="faculty">Faculty</option>
//             <option value="student">Student</option>
//           </select>

//           <div className="text-center mt-4">
//             <button
//               type="submit"
//               className="bg-blue-900 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Sun, Moon, Mail, Lock, UserCircle2 } from "lucide-react";
import useAuthStore from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const {userLogin , authUser } = useAuthStore();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userLogin(formData); // assumes userLogin returns user data
      console.log(user)
      if (user?.data?.role === "admin") navigate("/dashboard/admin");
      else if (user?.data?.role === "faculty") navigate("/dashboard/faculty");
      else if (user?.data?.role === "student") navigate("/dashboard/student");
      else navigate("/login");
    } catch (err) {
      console.error(err);
    }
    

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-tr from-white via-blue-100 to-blue-200  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-white">
            Welcome Back
          </h2>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-900" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 ">
          {/* Email */}
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>

          {/* Password */}
          <div className="relative ">
            <Lock size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>

          {/* Role selection */}
          <div className="relative">
            <UserCircle2 size={20} className="absolute left-3 top-3 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-900 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </div>

        </form>

      <div className="text-center mt-6">


       {/* Signup Button */}
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        don't have an account?
        <a
      href="/choose-role"
      className="ml-2 text-blue-700 dark:text-blue-400 font-medium hover:underline"
    >
      Create an account
    </a>
  </p>
</div>

      </div>
    </div>
  );
}

