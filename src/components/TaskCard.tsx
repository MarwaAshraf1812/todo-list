import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: "bg-success text-success-foreground",
  medium: "bg-accent text-accent-foreground",
  high: "bg-destructive text-destructive-foreground"
};

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card className="p-4 mb-4 cursor-move hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm">{task.title}</h3>
        <Badge className={priorityColors[task.priority]}>
          {task.priority}
        </Badge>
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
    </Card>
  );
};