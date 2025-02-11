import React from 'react';
import { useQuery, Id, useMutation } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Badge } from './ui/badge';
import { twMerge } from "tailwind-merge";

interface TaskListProps {
  categoryId: string | null;
  userId: string | null;
}

export default function TaskList({ categoryId, userId }: TaskListProps) {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<{ 
    _id: string;
    title: string;
    description: string;
    categoryId: string;
    priority: string;
    status: string;
  } | null>(null);
  
  const tasks = useQuery(
    categoryId ? api.tasks.getTasksByCategory : api.tasks.getTasksByUser,
    categoryId
      ? { categoryId: categoryId as Id<"categories"> }
      : { userId: userId as string }
  );

  const deleteTask = useMutation(api.tasks.deleteTask);

  const handleDelete = async (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask({ taskId: taskId as Id<"tasks"> });
    }
  };

  const groupedTasks = tasks?.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const statusConfig = {
    Todo: { color: 'bg-blue-100', title: 'To Do' },
    In_Progress: { color: 'bg-yellow-100', title: 'In Progress' },
    Completed: { color: 'bg-green-100', title: 'Completed' }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {categoryId && "Tasks in Category"}
        </h2>
        {categoryId && (
          <Button onClick={() => setShowNewTaskForm(true)} size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        )}
      </div>

      {categoryId === null ? (
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
        <div className="relative bg-gray-200 flex items-center justify-center">
        <Image 
        src="/write_notes.jpg"
        width={600} 
        height={600} 
        alt="No Category Selected"
      />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          No Category Selected
        </h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Select a category from the sidebar or create a new one to start managing your tasks.
        </p>
        <Button className="mt-2">
          + Create New Category
        </Button>
      </div>
      ) : (
        <>
          {showNewTaskForm && (
            <TaskForm onClose={() => setShowNewTaskForm(false)} initialCategoryId={categoryId} />
          )}
          {editingTask !== null && (
            <TaskForm task={editingTask} onClose={() => setEditingTask(null)} />
          )} 

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(statusConfig).map(([status, config]) => (
              <Card key={status} className={`${config.color} border-none`}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{config.title}</span>
                    <span className="text-sm font-normal">
                      {groupedTasks?.[status]?.length || 0}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupedTasks?.[status]?.map((task) => (
                      <div
                        key={task._id}
                        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold">{task.title}</h3> 
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex justify-between items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10">
                            <Badge className={twMerge(config.color, "text-black")}>{task.priority}</Badge>
                          </span>
                          <Button onClick={() => setEditingTask(task)} variant="ghost">
                              <EditIcon className="h-4 w-4" />
                          </Button> 
                          <Button onClick={() => handleDelete(task._id)} variant="ghost" className="text-red-500">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {(!groupedTasks?.[status] || groupedTasks[status].length === 0) && (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        No tasks in {config.title.toLowerCase()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
