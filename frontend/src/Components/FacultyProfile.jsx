import React, { useEffect, useState } from "react";
import { Sun, Moon, UserCircle2, Phone, Mail, Briefcase } from "lucide-react";
import useFacultyStore from "../Store/useFacultyStore"; // assume this contains getFaculty

export default function FacultyProfile() {
  const [darkMode, setDarkMode] = useState(false);
  const [faculty, setFaculty] = useState(null);
  const { getFaculty } = useFacultyStore();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      const data = await getFaculty(); // should return faculty info
      setFaculty(data);
    };
    fetchFaculty();
  }, [getFaculty]);

  if (!faculty) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">Faculty Profile</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-900" />}
        </button>
      </header>

      <main className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 mt-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <UserCircle2 className="w-14 h-14 text-blue-900 dark:text-white" />
          <h2 className="text-xl font-bold">
            {faculty.first_name} {faculty.last_name}
          </h2>
        </div>

        <div className="space-y-4 text-sm md:text-base">
          <p><Mail className="inline w-4 h-4 mr-2" /> <strong>Email:</strong> {faculty.email}</p>
          <p><Phone className="inline w-4 h-4 mr-2" /> <strong>Phone:</strong> {faculty.phone}</p>
          <p><strong>Gender:</strong> {faculty.gender}</p>
          <p><Briefcase className="inline w-4 h-4 mr-2" /> <strong>Department:</strong> {faculty.department}</p>
          <p><strong>Designation:</strong> {faculty.designation}</p>
        </div>
      </main>
    </div>
  );
}
