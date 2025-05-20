import React, { useState } from "react";

const departments = ["CSE", "ME", "EE", "ECE", "CIVIL"];
const years = ["1st", "2nd", "3rd", "4th"];

export default function FacultyCreateNotice() {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setFormData((prev) => ({ ...prev, attachments: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const current = prev.target_filters[name];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        ...prev,
        target_filters: { ...prev.target_filters, [name]: updated },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Faculty Notice Submitted:", formData);
    // Post API logic here
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-6">
          Create Faculty Notice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Notice Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your notice description here..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="E.g. Exam, Academic"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Target Department */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Select Departments</label>
            <div className="flex flex-wrap gap-3">
              {departments.map((dept) => (
                <label
                  key={dept}
                  className="flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.target_filters.department.includes(dept)}
                    onChange={() => handleMultiSelect("department", dept)}
                    className="accent-blue-700"
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Years */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Select Years</label>
            <div className="flex flex-wrap gap-3">
              {years.map((yr) => (
                <label
                  key={yr}
                  className="flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.target_filters.year.includes(yr)}
                    onChange={() => handleMultiSelect("year", yr)}
                    className="accent-blue-700"
                  />
                  <span>{yr}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Attachments (Optional)</label>
            <input
              type="file"
              name="attachments"
              multiple
              onChange={handleChange}
              className="w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-transform duration-200 hover:scale-105 shadow-md"
            >
              Publish Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
