"use client";

import { useState } from "react";
import API from "../../utils/api";
import { motion } from "framer-motion";

export default function TaskForm({ fetchTasks }) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch {
      alert("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleAddTask}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4 mt-6"
    >
      <h2 className="text-xl font-bold text-gray-700">➕ Add a New Task</h2>
      <input
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task Title"
        className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
        required
      />
      <textarea
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        placeholder="Task Description"
        className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </motion.form>
  );
}
