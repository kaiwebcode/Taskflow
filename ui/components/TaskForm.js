import API from "@/app/utils/api";
import { useForm } from "react-hook-form";


export default function TaskForm({ fetchTasks, editTask }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: editTask || { title: "", description: "" },
  });

  const onSubmit = async (data) => {
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, data);
      } else {
        await API.post("/tasks", data);
      }
      reset();
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex gap-2">
      <input {...register("title")} placeholder="Title" className="border p-2 flex-1"/>
      <input {...register("description")} placeholder="Description" className="border p-2 flex-1"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editTask ? "Update" : "Add"}
      </button>
    </form>
  );
}
