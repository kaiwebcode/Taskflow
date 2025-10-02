"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../utils/api";
import DashboardHeader from "./components/DashboardHeader";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProfileCard from "./components/ProfileCard";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks"); // tasks | profile

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchProfile();
      fetchTasks();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile", err);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <DashboardHeader />

      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-500">
            Manage your profile and tasks from this dashboard
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-6 py-2 font-medium ${
              activeTab === "tasks"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700 cursor-pointer"
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-2 font-medium  ${
              activeTab === "profile"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700 cursor-pointer"
            }`}
          >
            Profile
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "tasks" && (
          <div className="space-y-8 pb-10">
            {/* Task Form */}
            <TaskForm fetchTasks={fetchTasks} />

            {/* Task List */}
            <TaskList tasks={tasks} fetchTasks={fetchTasks} loading={loading} />
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            {user ? (
              <ProfileCard user={user} />
            ) : (
              <p className="text-gray-500">Loading profile...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
