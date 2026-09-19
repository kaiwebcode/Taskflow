"use client";

import { useMemo, useState } from "react";
import API from "../../utils/api";
import { toast } from "sonner";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  Filter,
  Loader2,
  Search,
  Trash2,
  UserRound,
  Store,
  X,
} from "lucide-react";

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const emptyEditForm = {
  title: "",
  description: "",
  employee: "",
  store: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

function isOverdue(task) {
  if (!task?.dueDate || task.status === "Completed") {
    return false;
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const dueDate = new Date(task.dueDate);
  dueDate.setHours(23, 59, 59, 999);

  return dueDate < today;
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusClasses(status) {
  switch (status) {
    case "Completed":
      return "bg-green-50 text-green-700 border-green-200";

    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

function getPriorityClasses(priority) {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-700 border-red-200";

    case "Low":
      return "bg-gray-50 text-gray-600 border-gray-200";

    default:
      return "bg-purple-50 text-purple-700 border-purple-200";
  }
}

export default function TaskList({ tasks, fetchTasks, loading }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [storeFilter, setStoreFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [actionLoading, setActionLoading] = useState(null);

  // Create unique employee list
  const employees = useMemo(() => {
    return [
      ...new Set(
        tasks
          .map((task) => task.employee)
          .filter(Boolean)
      ),
    ].sort();
  }, [tasks]);

  // Create unique store list
  const stores = useMemo(() => {
    return [
      ...new Set(
        tasks
          .map((task) => task.store)
          .filter(Boolean)
      ),
    ].sort();
  }, [tasks]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.employee?.toLowerCase().includes(query) ||
        task.store?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      const matchesEmployee =
        employeeFilter === "All" || task.employee === employeeFilter;

      const matchesStore =
        storeFilter === "All" || task.store === storeFilter;

      const matchesDate =
        !dateFilter ||
        (task.dueDate &&
          new Date(task.dueDate).toISOString().split("T")[0] === dateFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesEmployee &&
        matchesStore &&
        matchesDate
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    employeeFilter,
    storeFilter,
    dateFilter,
  ]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setEmployeeFilter("All");
    setStoreFilter("All");
    setDateFilter("");
  };

  const hasActiveFilters =
    search ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    employeeFilter !== "All" ||
    storeFilter !== "All" ||
    dateFilter;

  // Delete task
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(`delete-${id}`);

      await API.delete(`/tasks/${id}`);

      toast.success("Task deleted successfully");

      await fetchTasks();
    } catch (error) {
      console.error("Delete task error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete task. Please try again."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // Open edit form
  const handleEdit = (task) => {
    setEditingTask(task._id);

    setEditForm({
      title: task.title || "",
      description: task.description || "",
      employee: task.employee || "",
      store: task.store || "",
      status: task.status || "Pending",
      priority: task.priority || "Medium",
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    });
  };

  // Update task
  const handleUpdate = async (id) => {
    if (!editForm.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (!editForm.employee.trim()) {
      toast.error("Employee is required");
      return;
    }

    if (!editForm.store.trim()) {
      toast.error("Store is required");
      return;
    }

    if (!editForm.dueDate) {
      toast.error("Due date is required");
      return;
    }

    try {
      setActionLoading(`edit-${id}`);

      await API.put(`/tasks/${id}`, {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        employee: editForm.employee.trim(),
        store: editForm.store.trim(),
        status: editForm.status,
        priority: editForm.priority,
        dueDate: editForm.dueDate,
      });

      toast.success("Task updated successfully");

      setEditingTask(null);
      setEditForm(emptyEditForm);

      await fetchTasks();
    } catch (error) {
      console.error("Update task error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // Change status
  const handleStatusChange = async (id, status) => {
    try {
      setActionLoading(`status-${id}`);

      await API.patch(`/tasks/${id}/status`, {
        status,
      });

      toast.success(`Task marked as ${status}`);

      await fetchTasks();
    } catch (error) {
      console.error("Status update error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update task status."
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Task Management
            </h2>

            <p className="text-sm text-gray-500">
              Search, filter and manage your tasks
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredTasks.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {tasks.length}
            </span>{" "}
            tasks
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-100 bg-gray-50/70 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />

            <span className="text-sm font-medium text-gray-700">
              Filters
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <X className="h-4 w-4" />
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Employee */}
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Employees</option>

            {employees.map((employee) => (
              <option key={employee} value={employee}>
                {employee}
              </option>
            ))}
          </select>

          {/* Store */}
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Stores</option>

            {stores.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Statuses</option>

            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Priorities</option>

            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          {/* Date */}
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-64 items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading tasks...
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        /* Empty */
        <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          <h3 className="font-semibold text-gray-900">
            No tasks found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {tasks.length === 0
              ? "Create your first task using the form above."
              : "Try changing your search or filters."}
          </p>

          {tasks.length > 0 && hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Task
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Employee
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Store
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Priority
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Due Date
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTasks.map((task) => {
                  const overdue = isOverdue(task);
                  const statusLoading =
                    actionLoading === `status-${task._id}`;

                  return (
                    <tr
                      key={task._id}
                      className="transition hover:bg-gray-50/70"
                    >
                      <td className="max-w-xs px-5 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {task.title}
                          </p>

                          {task.description && (
                            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <UserRound className="h-4 w-4 text-gray-400" />
                          {task.employee || "N/A"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Store className="h-4 w-4 text-gray-400" />
                          {task.store || "N/A"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={task.status || "Pending"}
                          disabled={statusLoading}
                          onChange={(e) =>
                            handleStatusChange(
                              task._id,
                              e.target.value
                            )
                          }
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium outline-none ${getStatusClasses(
                            task.status
                          )} disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityClasses(
                            task.priority
                          )}`}
                        >
                          {task.priority || "Medium"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div
                          className={`flex items-center gap-1.5 text-sm ${
                            overdue
                              ? "font-medium text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {overdue ? (
                            <Clock3 className="h-4 w-4" />
                          ) : (
                            <CalendarDays className="h-4 w-4" />
                          )}

                          {formatDate(task.dueDate)}

                          {overdue && (
                            <span className="ml-1 text-xs">
                              (Overdue)
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(task)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(task._id)}
                            disabled={
                              actionLoading === `delete-${task._id}`
                            }
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {actionLoading ===
                            `delete-${task._id}` ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}

                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet cards */}
          <div className="divide-y divide-gray-100 lg:hidden">
            {filteredTasks.map((task) => {
              const overdue = isOverdue(task);
              const statusLoading =
                actionLoading === `status-${task._id}`;

              return (
                <div key={task._id} className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Title */}
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {task.title}
                        </h3>

                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityClasses(
                            task.priority
                          )}`}
                        >
                          {task.priority || "Medium"}
                        </span>
                      </div>

                      {task.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {task.description}
                        </p>
                      )}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <UserRound className="h-4 w-4 text-gray-400" />
                        <span>{task.employee || "N/A"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Store className="h-4 w-4 text-gray-400" />
                        <span>{task.store || "N/A"}</span>
                      </div>

                      <div
                        className={`flex items-center gap-2 text-sm ${
                          overdue
                            ? "font-medium text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {overdue ? (
                          <Clock3 className="h-4 w-4" />
                        ) : (
                          <CalendarDays className="h-4 w-4" />
                        )}

                        <span>
                          {formatDate(task.dueDate)}
                          {overdue && " • Overdue"}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">
                          Status:
                        </span>

                        <select
                          value={task.status || "Pending"}
                          disabled={statusLoading}
                          onChange={(e) =>
                            handleStatusChange(
                              task._id,
                              e.target.value
                            )
                          }
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium outline-none ${getStatusClasses(
                            task.status
                          )} disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 border-t border-gray-100 pt-3">
                      <button
                        onClick={() => handleEdit(task)}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        disabled={
                          actionLoading === `delete-${task._id}`
                        }
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {actionLoading ===
                        `delete-${task._id}` ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}

                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Edit modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Edit Task
                </h2>

                <p className="text-sm text-gray-500">
                  Update task details
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTask(null);
                  setEditForm(emptyEditForm);
                }}
                className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Task Title
                </label>

                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      title: e.target.value,
                    })
                  }
                  maxLength={100}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Employee + Store */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Employee
                  </label>

                  <input
                    type="text"
                    value={editForm.employee}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        employee: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Store
                  </label>

                  <input
                    type="text"
                    value={editForm.store}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        store: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  maxLength={500}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Status + Priority + Date */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        status: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Priority
                  </label>

                  <select
                    value={editForm.priority}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        priority: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {PRIORITY_OPTIONS.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Due Date
                  </label>

                  <input
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setEditForm(emptyEditForm);
                  }}
                  className="cursor-pointer rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleUpdate(editingTask)}
                  disabled={actionLoading === `edit-${editingTask}`}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {actionLoading === `edit-${editingTask}` ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}