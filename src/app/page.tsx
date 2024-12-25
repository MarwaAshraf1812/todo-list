"use client";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, Id } from "convex/react";
import { api } from "../../convex/_generated/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const { user } = useUser();
  const userId = user?.id;
  const tasks = useQuery(api.functions.tasks.getTasks.getTasks, { userId: userId! });
  const addTask = useMutation(api.functions.tasks.addTask.addTask);
  const deleteTask = useMutation(api.functions.tasks.deleteTask.deleteTask);

  const handleDelete = async (id:  Id<"tasks">) => {
    try {
      await deleteTask({ id });
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleAddTask = async (task: { title: string; category: string; status: string }) => {
    if (!userId) return;
    try {
      await addTask({ ...task, userId, createdAt: Date.now() });
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">{user?.username}</h1>
      <h1 className="text-4xl font-semibold text-gray-900 mb-8">My To-Do List</h1>

      <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks || []} onDeleteTask={handleDelete} />
    </div>
  );
}
