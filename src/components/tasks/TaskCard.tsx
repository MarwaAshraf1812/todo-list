"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description: string;
    priority: string;
  };
  color: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, color, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="p-3 bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg">
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm text-muted-foreground">{task.description}</p>

      <div className="flex justify-between items-center gap-2 mt-2">
        <Badge className={`${color} text-black px-2 py-1 rounded-full`}>
          {task.priority}
        </Badge>
        <Button onClick={onEdit} variant="ghost">
          <EditIcon className="h-4 w-4" />
        </Button>
        <Button onClick={onDelete} variant="ghost" className="text-red-500">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
