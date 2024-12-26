"use client";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useMutation, useQuery, Id } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function TaskManager({ userId }: { userId: string }) {
  const tasks = useQuery(api.functions.tasks.getTasks.getTasks, { userId });
  const addTask = useMutation(api.functions.tasks.addTask.addTask);
  const updateTask = useMutation(api.functions.tasks.updateTask.updateTask);
  const deleteTask = useMutation(api.functions.tasks.deleteTask.deleteTask);

  const handleDelete = async (id: Id<"tasks">) => {
    try {
      await deleteTask({ id });
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleUpdate = async (taskId: Id<"tasks">, status: string) => {
    try {
      await updateTask({ taskId, status });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleAddTask = async (task: { title: string; category: string; status: string }) => {
    try {
      await addTask({ ...task, userId, createdAt: Date.now() });
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="px-6">
      <div className="mt-4 max-w-6xl p-20  mx-auto">
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <h1 className="text-3xl font-extrabold mb-4">Your Tasks</h1>
      <div className="mt-4 mb-20">
        <TaskList
          tasks={tasks || []}
          onDeleteTask={handleDelete}
          onUpdateTask={handleUpdate}
        />
      </div>
    </div>
  );
}
