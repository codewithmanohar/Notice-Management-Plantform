import React, { useState } from "react";

export default function FacultyNoticeCreatePage() {
const [darkMode, setDarkMode] = useState(false);

const [formData, setFormData] = useState({
title: "",
description: "",
category: "",
priority: "",
attachments: [],
target_filters: {
department: [],
year: [],
},
});

const departments = ["CSE", "ME", "ECE", "EE", "CE"];
const years = ["1st", "2nd", "3rd", "4th"];

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({
...prev,
[name]: value,
}));
};

const handleDropdownSelect = (field, value) => {
if (!formData.target_filters[field].includes(value)) {
setFormData((prev) => ({
...prev,
target_filters: {
...prev.target_filters,
[field]: [...prev.target_filters[field], value],
},
}));
}
};

const removeSelected = (field, value) => {
setFormData((prev) => ({
...prev,
target_filters: {
...prev.target_filters,
[field]: prev.target_filters[field].filter((item) => item !== value),
},
}));
};

const handleFileChange = (e) => {
setFormData({
...formData,
attachments: Array.from(e.target.files),
});
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Submitted Notice:", formData);
};

const toggleDarkMode = () => {
document.documentElement.classList.toggle("dark");
setDarkMode(!darkMode);
};

return (
<div className="min-h-screen px-4 py-10 bg-gradient-to-tr from-white via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white transition duration-300">
<div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
Create Faculty Notice
</h2>
<button onClick={toggleDarkMode} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full" >
{darkMode ? "🌞" : "🌙"}
</button>
</div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        type="text"
        placeholder="Notice Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        required
      />

      <textarea
        name="description"
        placeholder="Notice Description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        required
      ></textarea>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        required
      >
        <option value="">Select Category</option>
        <option value="Exam">Exam</option>
        <option value="Event">Event</option>
        <option value="Academic">Academic</option>
        <option value="General">General</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        required
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
      />

      {/* Department Dropdown */}
      <div className="relative">
        <label className="block mb-1 font-semibold">Select Departments</label>
        <select
          onChange={(e) => handleDropdownSelect("department", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">-- Select Department --</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.target_filters.department.map((d) => (
            <span
              key={d}
              className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-1 rounded-full text-sm flex items-center"
            >
              {d}
              <button
                onClick={() => removeSelected("department", d)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Year Dropdown */}
      <div className="relative">
        <label className="block mb-1 font-semibold mt-4">Select Years</label>
        <select
          onChange={(e) => handleDropdownSelect("year", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">-- Select Year --</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.target_filters.year.map((y) => (
            <span
              key={y}
              className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white px-2 py-1 rounded-full text-sm flex items-center"
            >
              {y}
              <button
                onClick={() => removeSelected("year", y)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-blue-900 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 transition transform hover:scale-105 shadow-md"
        >
          Submit Notice
        </button>
      </div>
    </form>
  </div>
</div>
);
}