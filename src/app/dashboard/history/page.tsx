"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

type Task = {
  _id: string;
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  archivedAt: number;
};

export default function ArchivedTasks() {
  const {userId} = useAuth();
  const archivedTasks = useQuery(api.tasks.getArchivedTasks, userId ? { userId } : "skip");
  const deleteAllTasks = useMutation(api.tasks.deleteAllTasks);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (!archivedTasks || archivedTasks.length === 0) return;

    const confirmDelete = window.confirm("Are you sure you want to delete all archived tasks?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteAllTasks();
    } catch (error) {
      console.error("Failed to delete tasks:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto  py-10 px-16 space-y-6 md:space-y-0 md:space-x-10 fixed_height">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Archived Tasks
      </h1>

      {!archivedTasks || archivedTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No archived tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {archivedTasks.map((task: Task) => (
            <div
              key={task._id}
              className="p-5 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{task.description || "No description available."}</p>

              <div className="mt-3 text-sm text-gray-500">
                <span className="font-medium">Priority:</span> {task.priority || "Low"} |
                <span className="ml-1 font-medium">Status:</span> {task.status || "Unknown"}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Archived on: {new Date(task.archivedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {archivedTasks && archivedTasks.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleDeleteAll}
            disabled={isDeleting}
            className={`p-3 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
              isDeleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:shadow-lg"
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete All"}
          </Button>
        </div>
      )}
    </div>
  );
}
