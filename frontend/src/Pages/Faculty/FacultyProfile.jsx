// import React, { useEffect, useState } from "react";
// import { Sun, Moon, UserCircle2, Phone, Mail, Briefcase } from "lucide-react";
// import useFacultyStore from "../../Store/useFacultyStore"; // assume this contains getFaculty

// export default function FacultyProfile() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [faculty, setFaculty] = useState(null);
//   const { getFaculty } = useFacultyStore();

//   const toggleDarkMode = () => {
//     document.documentElement.classList.toggle("dark");
//     setDarkMode(!darkMode);
//   };

//   useEffect(() => {
//     const fetchFaculty = async () => {
//       const data = await getFaculty(); // should return faculty info
//       setFaculty(data);
//     };
//     fetchFaculty();
//   }, [getFaculty]);

//   if (!faculty) return <div className="p-6 text-center">Loading profile...</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition duration-300">
//       <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
//         <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">Faculty Profile</h1>
//         <button
//           onClick={toggleDarkMode}
//           className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
//         >
//           {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-900" />}
//         </button>
//       </header>

//       <main className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 mt-6 rounded-lg shadow-lg">
//         <div className="flex items-center gap-4 mb-6">
//           <UserCircle2 className="w-14 h-14 text-blue-900 dark:text-white" />
//           <h2 className="text-xl font-bold">
//             {faculty.first_name} {faculty.last_name}
//           </h2>
//         </div>

//         <div className="space-y-4 text-sm md:text-base">
//           <p><Mail className="inline w-4 h-4 mr-2" /> <strong>Email:</strong> {faculty.email}</p>
//           <p><Phone className="inline w-4 h-4 mr-2" /> <strong>Phone:</strong> {faculty.phone}</p>
//           <p><strong>Gender:</strong> {faculty.gender}</p>
//           <p><Briefcase className="inline w-4 h-4 mr-2" /> <strong>Department:</strong> {faculty.department}</p>
//           <p><strong>Designation:</strong> {faculty.designation}</p>
//         </div>
//       </main>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { UserCircle2, Mail, Phone, Briefcase, Building2, Venus } from "lucide-react";
// import useFacultyStore from "../../Store/useFacultyStore"; // Replace with your actual store path

// export default function FacultyProfile() {
//   const [faculty, setFaculty] = useState(null);
//   const { getFaculty } = useFacultyStore();

//   useEffect(() => {
//     const fetchFaculty = async () => {
//       const data = await getFaculty();
//       setFaculty(data);
//     };
//     fetchFaculty();
//   }, [getFaculty]);

//   if (!faculty) return <div className="text-center py-10 text-gray-600">Loading profile...</div>;

//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
//       <div className="flex items-center gap-4 mb-6">
//         <UserCircle2 size={50} className="text-blue-900 dark:text-blue-400" />
//         <div>
//           <h2 className="text-2xl font-semibold text-blue-900 dark:text-white">
//             {faculty.first_name} {faculty.last_name}
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Faculty Member</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//         <div className="flex items-center gap-2">
//           <Mail className="w-4 h-4 text-gray-500" />
//           <span className="text-gray-700 dark:text-gray-300">{faculty.email}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Phone className="w-4 h-4 text-gray-500" />
//           <span className="text-gray-700 dark:text-gray-300">{faculty.phone}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Venus className="w-4 h-4 text-gray-500" />
//           <span className="text-gray-700 dark:text-gray-300 capitalize">{faculty.gender}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Building2 className="w-4 h-4 text-gray-500" />
//           <span className="text-gray-700 dark:text-gray-300">{faculty.department}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Briefcase className="w-4 h-4 text-gray-500" />
//           <span className="text-gray-700 dark:text-gray-300">{faculty.designation}</span>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import {
  UserCircle2,
  Mail,
  Phone,
  Calendar,
  Building2,
  Briefcase,
  Venus,
  BadgeCheck,
} from "lucide-react";
import useFacultyStore from "../../Store/useFacultyStore"; // Update with correct path

export default function FacultyProfile() {
  const [faculty, setFaculty] = useState(null);
  const { getFaculty } = useFacultyStore();

  useEffect(() => {
    const fetchFaculty = async () => {
      const res = await getFaculty(); // expected to return res.faculty
      if (res ) setFaculty(res);
    };
    fetchFaculty();
  }, [getFaculty]);

  if (!faculty) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center gap-5 mb-6">
        <UserCircle2 className="w-16 h-16 text-blue-900 dark:text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white">
            {faculty.first_name} {faculty.last_name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            {faculty.designation}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 text-sm">
        <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={faculty.email} />
        <InfoItem icon={<Phone className="w-4 h-4" />} label="Phone" value={faculty.phone} />
        <InfoItem icon={<Building2 className="w-4 h-4" />} label="Department" value={faculty.department} />
        <InfoItem icon={<Briefcase className="w-4 h-4" />} label="Role" value={faculty.role} />
        <InfoItem icon={<Venus className="w-4 h-4" />} label="Gender" value={faculty.gender} />
        <InfoItem
          icon={<Calendar className="w-4 h-4" />}
          label="Joined"
          value={new Date(faculty.created_at).toLocaleDateString()}
        />
        <InfoItem
          icon={<BadgeCheck className="w-4 h-4 text-green-600 dark:text-green-400" />}
          label="Faculty ID"
          value={faculty.faculty_id}
        />
      </div>
    </div>
  );
}

// ✅ Reusable sub-component for info rows
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-500 dark:text-gray-300">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

