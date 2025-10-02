"use client";

import { useState } from "react";
import API from "../../utils/api";

export default function TaskCard({ task, fetchTasks }) {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      fetchTasks();
    } catch {
      alert("Error deleting task");
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/tasks/${task._id}`, updatedTask);
      setEditing(false);
      fetchTasks();
    } catch {
      alert("Error updating task");
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between h-full">
      {editing ? (
        <div className="flex flex-col gap-2">
          <input
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            💾 Save
          </button>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
            >
              🗑 Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
