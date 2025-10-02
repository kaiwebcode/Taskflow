"use client";

import { useState } from "react";
import API from "../../utils/api";
import { toast } from "sonner";

export default function TaskList({ tasks, fetchTasks, loading }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
  });

  // Delete Task
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted!");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  // Edit Task
  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/tasks/${id}`, editForm);
      toast.success("Task updated!");
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
        <p className="text-gray-500">Manage and track all your tasks</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-1">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Task list */}
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500 mt-6">No tasks found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <li key={task._id} className="py-4">
              {editingTask === task._id ? (
                // Edit Form
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>

                    <select
                      value={editForm.priority}
                      onChange={(e) =>
                        setEditForm({ ...editForm, priority: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>

                    <input
                      type="date"
                      value={editForm.dueDate}
                      onChange={(e) =>
                        setEditForm({ ...editForm, dueDate: e.target.value })
                      }
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Task View
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-gray-500">{task.description}</p>
                    <p className="text-sm text-gray-400">
                      Status: {task.status} • Priority: {task.priority} • Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
