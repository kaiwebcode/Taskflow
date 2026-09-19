"use client";

import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid JWT
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status;

      if (status === 400 || status === 401) {
        const message = error?.response?.data?.message;

        if (message === "Invalid token" || message === "No token provided") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default API;