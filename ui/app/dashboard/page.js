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
      headers: { Authorization: `Bearer ${token}` }, // send token
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
        {/* Profile Section */}
        {user && <ProfileCard user={user} />}

        {/* Task Form */}
        <TaskForm fetchTasks={fetchTasks} />

        {/* Task List */}
        <TaskList tasks={tasks} fetchTasks={fetchTasks} loading={loading} />
      </div>
    </div>
  );
}
