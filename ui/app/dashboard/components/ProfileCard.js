"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ProfileCard({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6"
    >
      {/* Avatar */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
        <User className="h-10 w-10 text-blue-600" />
      </div>

      {/* User Info */}
      <div className="flex-1 text-center sm:text-left mt-2.5">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        {/* <p className="mt-2 text-gray-700">
          {user.bio ? user.bio : "No bio added yet ✨"}
        </p> */}
      </div>

      {/* Edit button (optional future feature) */}
      {/* <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
        Edit Profile
      </button> */}
    </motion.div>
  );
}
