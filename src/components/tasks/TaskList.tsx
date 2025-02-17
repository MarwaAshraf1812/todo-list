"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery, Id, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCategory } from "@/context/CategoryContext";
import { TaskForm } from "./TaskForm";
import { TaskColumn } from "./TaskColumn";
import { EmptyState } from "./EmptyState";
import { Priority, Task } from "@/types/task";
import { useAuth } from "@clerk/nextjs"; 
import { useRouter } from "next/navigation";



export default function TaskList() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const { selectedCategoryId } = useCategory();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const tasks = useQuery(
    selectedCategoryId
      ? api.tasks.getTasksByCategory
      : api.tasks.getTasksByUser,
    selectedCategoryId
      ? { categoryId: selectedCategoryId as Id<"categories"> }
      : { userId: userId as string }
  );

  const deleteTask = useMutation(api.tasks.deleteTask);

  const handleDelete = async (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask({ taskId: taskId as Id<"tasks"> });
    }
  };

  const groupedTasks = tasks?.reduce(
    (acc, task) => {
      const mappedTask = {
        ...task,
        priority: task.priority as Priority,
      };
      if (!acc[mappedTask.status]) acc[mappedTask.status] = [];
      acc[mappedTask.status].push(mappedTask);
      return acc;
    },
    {} as Record<string, Task[]>
  );

  const statusConfig = {
    Todo: { color: "bg-blue-100", title: "To Do" },
    In_Progress: { color: "bg-yellow-100", title: "In Progress" },
    Completed: { color: "bg-green-100", title: "Completed" },
  };

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/");
    }
  }, [userId, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {selectedCategoryId && "Tasks in Category"}
        </h2>
        {selectedCategoryId && (
          <Button onClick={() => setShowNewTaskForm(true)} size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        )}
      </div>

      {selectedCategoryId === null ? (
        <EmptyState />
      ) : (
        <>
          {showNewTaskForm && (
            <TaskForm
              onClose={() => setShowNewTaskForm(false)}
              initialCategoryId={selectedCategoryId}
            />
          )}
          {editingTask && (
            <TaskForm task={editingTask} onClose={() => setEditingTask(null)} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(statusConfig).map(([status, config]) => (
              <TaskColumn
                key={status}
                title={config.title}
                color={config.color}
                tasks={groupedTasks?.[status] || []}
                onEdit={setEditingTask}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
