import React from "react";
import {
  User,
  Mail,
  Phone,
  BadgeInfo,
  School,
  Calendar,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

const mockStudentData = {
  student_id: 20251234,
  first_name: "Manohar",
  last_name: "Kumar",
  email: "work.manohar001@gmail.com",
  phone: "9334209975",
  gender: "male",
  role: "student",
  department: "Computer Science",
  program: "B.Tech CSE",
  year: "3rd",
  created_at: "2025-05-20T09:00:00.000Z",
};

export default function StudentProfile() {
  const student = mockStudentData;

  return (
    <div className=" px-4 py-10 bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-400 flex items-center gap-2">
            <User className="w-7 h-7 text-blue-700 dark:text-blue-300" />
            Student Profile
          </h2>
          <span className="bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white px-3 py-1 text-xs rounded-full font-semibold">
            ID: {student.student_id}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
          {/* Name */}
          <ProfileItem icon={<User />} label="Name" value={`${student.first_name} ${student.last_name}`} />

          {/* Email */}
          <ProfileItem icon={<Mail />} label="Email" value={student.email} />

          {/* Phone */}
          <ProfileItem icon={<Phone />} label="Phone" value={student.phone} />

          {/* Gender */}
          <ProfileItem icon={<BadgeInfo />} label="Gender" value={student.gender} />

          {/* Department */}
          <ProfileItem icon={<School />} label="Department" value={student.department} />

          {/* Program */}
          <ProfileItem icon={<GraduationCap />} label="Program" value={student.program} />

          {/* Year */}
          <ProfileItem icon={<BadgeCheck />} label="Year" value={student.year} />

          {/* Joined Date */}
          <ProfileItem
            icon={<Calendar />}
            label="Joined On"
            value={new Date(student.created_at).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
      <div className="mt-1 text-blue-700 dark:text-blue-400">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
          {label}
        </p>
        <p className="text-sm sm:text-base font-medium mt-1">{value}</p>
      </div>
    </div>
  );
}
