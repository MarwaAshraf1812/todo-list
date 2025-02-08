import React from 'react';
import { useQuery, Id } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Badge } from './ui/badge';

interface TaskListProps {
  categoryId: string | null;
  userId: string | null;
}

export default function TaskList({ categoryId, userId }: TaskListProps) {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const tasks = useQuery(
    categoryId ? api.tasks.getTasksByCategory : api.tasks.getTasksByUser,
    categoryId ? { categoryId: categoryId as Id<"categories"> } : { userId: userId || "" }
  );

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
          {categoryId ? "Tasks in Category" : "All Tasks"}
        </h2>
        <Button onClick={() => setShowNewTaskForm(true)} size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {showNewTaskForm && (
        <TaskForm onClose={() => setShowNewTaskForm(false)} initialCategoryId={categoryId} />
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
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10">
                        <Badge className={`${config.color} text-black`}>{task.priority}</Badge>
                      </span>
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
    </div>
  );
}