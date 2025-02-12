"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types/task";


interface TaskColumnProps {
  title: string;
  color: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskColumn({ title, color, tasks, onEdit, onDelete }: TaskColumnProps) {
  return (
    <Card className={`${color} border-none`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <span className="text-sm font-normal">{tasks.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                color={color}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task._id)}
              />
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              No tasks in {title.toLowerCase()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
