
import { Button } from '../components/ui/button';

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  category: string;
  status: string;
  createdAt: number;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
}

export default function TaskList({ tasks,  onDeleteTask }: TaskListProps) {
  return (
    <div className="space-y-4 mt-8">
      {tasks?.map((task) => (
        <div key={task._id} className="flex items-center justify-between bg-white p-4 shadow-md rounded-md gap-4">
          <span
            className={`cursor-pointer  ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
          >
            {task.title}
          </span>
          <p>{task?.category} - {task?.status}</p>
          <p className="text-gray-500">Created: {new Date(task?.createdAt).toLocaleDateString()}</p>
          <Button
            onClick={() => onDeleteTask(task._id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm w-9 h-9 rounded-full"
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
}
