"use client";

import { useState } from "react";
import API from "../../utils/api";

export default function TaskForm({ fetchTasks }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", form);
      setForm({ title: "", description: "", status: "Pending", priority: "Medium", dueDate: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Create Task</h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter task title"
        required
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Description */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Enter task description"
        rows="3"
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer" 
      >
        + Create Task
      </button>
    </form>
  );
}
