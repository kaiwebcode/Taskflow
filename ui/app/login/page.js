"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/auth";
import API from "../utils/api";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // 👈 track active tab

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "register") {
      router.push("/register");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome</h2>
          <p className="text-gray-500">
            Sign in to your account or create a new one
          </p>

          {/* Toggle Tabs */}
          <div className="flex w-full mt-4 rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => handleTabClick("login")}
              className={`w-1/2 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === "login"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-500 hover:text-indigo-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabClick("register")}
              className={`w-1/2 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === "register"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-500 hover:text-indigo-600"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              placeholder="you@example.com"
              type="email"
              className={`w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              {...register("password")}
              placeholder="••••••••"
              type="password"
              className={`w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-lg font-medium hover:bg-indigo-700 transition duration-200 ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Secure authentication with{" "}
          <span className="text-indigo-600 font-medium">JWT tokens and password hashing</span>
        </p>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
