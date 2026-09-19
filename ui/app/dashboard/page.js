"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../utils/api";
import DashboardHeader from "./components/DashboardHeader";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProfileCard from "./components/ProfileCard";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Loader2,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

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

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks");
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProfile();
    fetchTasks();
  }, [router]);

  const fetchProfile = async () => {
    try {
      setProfileLoading(true);

      const res = await API.get("/auth/profile");

      setUser(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);

      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      toast.error(
        error?.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tasks");

      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      toast.error(
        error?.response?.data?.message ||
          "Failed to load tasks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const total = tasks.length;

    const pending = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const overdue = tasks.filter((task) => isOverdue(task)).length;

    return {
      total,
      pending,
      completed,
      overdue,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-blue-600">
                TaskFlow Dashboard
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back{user?.name ? `, ${user.name}` : ""}!
              </h1>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Manage your team's tasks, deadlines and progress.
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-blue-50 sm:flex">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`cursor-pointer border-b-2 px-1 pb-3 text-sm font-medium transition ${
                activeTab === "tasks"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Tasks
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer border-b-2 px-1 pb-3 text-sm font-medium transition ${
                activeTab === "profile"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Profile
            </button>
          </div>
        </div>

        {activeTab === "tasks" && (
          <div className="space-y-6 pb-10">
            {/* Summary Cards */}
            <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {/* Total */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Tasks
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {summary.total}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Pending
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {summary.pending}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                    <Clock3 className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Completed
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {summary.completed}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Overdue */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Overdue
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {summary.overdue}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </div>
            </section>

            {/* Create Task */}
            <TaskForm fetchTasks={fetchTasks} />

            {/* Tasks */}
            <TaskList
              tasks={tasks}
              fetchTasks={fetchTasks}
              loading={loading}
            />
          </div>
        )}

        {activeTab === "profile" && (
          <section className="pb-10">
            {profileLoading ? (
              <div className="flex min-h-48 items-center justify-center rounded-2xl border border-gray-200 bg-white">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading profile...
                </div>
              </div>
            ) : user ? (
              <ProfileCard user={user} />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <UserRound className="mx-auto h-8 w-8 text-gray-400" />

                <p className="mt-3 text-sm text-gray-500">
                  Unable to load profile information.
                </p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}