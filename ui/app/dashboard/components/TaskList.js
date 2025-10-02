"use client";

import { motion } from "framer-motion";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, fetchTasks, loading }) {
  if (loading) {
    return (
      <p className="text-center text-gray-500 py-10">Loading tasks ⏳...</p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No tasks available. Start by adding one 🚀
      </p>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TaskCard task={task} fetchTasks={fetchTasks} />
        </motion.div>
      ))}
    </section>
  );
}
