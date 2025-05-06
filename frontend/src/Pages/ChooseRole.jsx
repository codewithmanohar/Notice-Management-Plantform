// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Shield, GraduationCap } from "lucide-react";

// export default function ChooseRole() {
//   const navigate = useNavigate();

//   const handleSelect = (role) => {
//     navigate(`/register/${role}`);
//   };

//   const roles = [
//     {
//       label: "Student",
//       value: "student",
//       icon: <GraduationCap className="w-8 h-8 text-blue-900 dark:text-blue-400" />,
//     },
//     {
//       label: "Faculty",
//       value: "faculty",
//       icon: <User className="w-8 h-8 text-blue-900 dark:text-blue-400" />,
//     },
//     {
//       label: "Admin",
//       value: "admin",
//       icon: <Shield className="w-8 h-8 text-blue-900 dark:text-blue-400" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-black dark:text-white px-4 transition duration-300">
//       <div className="max-w-4xl w-full bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-10">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-900 dark:text-white">
//           Select Your Role
//         </h1>

//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
//           {roles.map((role) => (
//             <div
//               key={role.value}
//               onClick={() => handleSelect(role.value)}
//               className="cursor-pointer group bg-gray-100 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition transform hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-800"
//             >
//               <div className="flex justify-center mb-4">{role.icon}</div>
//               <h2 className="text-xl font-semibold text-blue-900 dark:text-white group-hover:underline">
//                 {role.label}
//               </h2>
//               <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
//                 Register as a {role.label.toLowerCase()} to access your dashboard.
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, GraduationCap } from "lucide-react";

export default function ChooseRole() {
  const navigate = useNavigate();

  const roles = [
    {
      name: "Student",
      route: "/register/student",
      icon: <GraduationCap className="w-6 h-6 mr-2" />,
    },
    {
      name: "Faculty",
      route: "/register/faculty",
      icon: <User className="w-6 h-6 mr-2" />,
    },
    {
      name: "Admin",
      route: "/register/admin",
      icon: <ShieldCheck className="w-6 h-6 mr-2" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-white text-center mb-8">
          Select Your Role
        </h1>
        <div className="space-y-4">
          {roles.map(({ name, route, icon }) => (
            <button
              key={name}
              onClick={() => navigate(route)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-900 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition duration-300 hover:scale-105"
            >
              {icon}
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
