"use client";

import { useState } from "react";
import API from "../../utils/api";
import { toast } from "sonner";
import {
  CalendarDays,
  Loader2,
  Plus,
  Store,
  UserRound,
  X,
} from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  employee: "",
  store: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

export default function TaskForm({ fetchTasks }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      toast.error("Task title is required");
      return false;
    }

    if (form.title.trim().length < 2) {
      toast.error("Task title must be at least 2 characters");
      return false;
    }

    if (!form.employee.trim()) {
      toast.error("Employee is required");
      return false;
    }

    if (!form.store.trim()) {
      toast.error("Store is required");
      return false;
    }

    if (!form.dueDate) {
      toast.error("Due date is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await API.post("/tasks", {
        title: form.title.trim(),
        description: form.description.trim(),
        employee: form.employee.trim(),
        store: form.store.trim(),
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate,
      });

      toast.success("Task created successfully");

      setForm(initialForm);

      await fetchTasks();
    } catch (error) {
      console.error("Create task error:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to create task. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Plus className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Create Task
            </h2>

            <p className="text-sm text-gray-500">
              Add a new task to your workspace
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Task Title <span className="text-red-500">*</span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Check inventory"
            maxLength={100}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-xs text-gray-400">
            {form.title.length}/100 characters
          </p>
        </div>

        {/* Employee + Store */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="employee"
              className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700"
            >
              <UserRound className="h-4 w-4 text-gray-400" />
              Employee <span className="text-red-500">*</span>
            </label>

            <input
              id="employee"
              name="employee"
              type="text"
              value={form.employee}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="store"
              className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700"
            >
              <Store className="h-4 w-4 text-gray-400" />
              Store <span className="text-red-500">*</span>
            </label>

            <input
              id="store"
              name="store"
              type="text"
              value={form.store}
              onChange={handleChange}
              placeholder="e.g. Mumbai Central"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add some details about this task..."
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-xs text-gray-400">
            {form.description.length}/500 characters
          </p>
        </div>

        {/* Status + Priority + Due Date */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700"
            >
              <CalendarDays className="h-4 w-4 text-gray-400" />
              Due Date <span className="text-red-500">*</span>
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={() => setForm(initialForm)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            Clear
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}