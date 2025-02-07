"use client";

import TaskList from "@/components/TaskList";
import { useMutation, useQuery, Id } from "convex/react";
import { api } from "../../convex/_generated/api";
import { TaskForm } from "./TaskForm";

export default function TaskManager({ userId }: { userId: string }) {
  const tasks = useQuery(api.tasks.getTasksByUser, { userId }) || [];
  const addTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const categories = (useQuery(api.tasks.getCategories, { userId }) || []).map(
    (category: { _id: Id<"categories">; name: string }) => ({
      id: category._id,
      name: category.name,
    })
  );

  const handleDelete = async (taskId: Id<"tasks">) => {
    try {
      await deleteTask({ taskId });
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleUpdate = async (
    taskId: Id<"tasks">,
    updates: {
      title?: string;
      status?: string;
      priority?: string;
      completed?: boolean;
    }
  ) => {
    try {
      await updateTask({
        taskId,
        ...updates,
      });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };
  type Priority = "low" | "medium" | "high";

  const handleAddTask = async (task: {
    title: string;
    priority: Priority;
    description?: string;
    categoryId: Id<"categories">;
  }) => {
    try {
      await addTask({
        ...task,
        userId,
        status: "pending",
        priority: task.priority as Priority,
      });
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  if (tasks === undefined) {
    return <div className="p-4">Loading tasks...</div>;
  }


  const tasksWithCategory = tasks.map((task) => ({
    ...task,
    category: task.categoryId.toString(),
  }));

  return (
    <div className="px-6">
      <div className="mt-4 max-w-6xl p-20 mx-auto">
        <div className="mt-4 max-w-6xl p-20 mx-auto">
          {categories.length > 0 ? (
            <TaskForm onSubmit={handleAddTask} categories={categories} />
          ) : (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
              No categories available. Please create a category first.
            </div>
          )}
        </div>
        <h1 className="text-3xl font-extrabold mb-4">Your Tasks</h1>
        <div className="mt-4 mb-20">
          <TaskList
            tasks={tasksWithCategory}
            onDeleteTask={handleDelete}
            onUpdateTask={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}
