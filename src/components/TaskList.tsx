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
  onUpdateTask: (taskId: string, status: string) => void;
}

const statusCategories = ['pending', 'in_progress', 'completed'];

const statusLabels: { [key: string]: string } = {
  pending: "Pending Tasks",
  in_progress: "In Progress Tasks",
  completed: "Completed Tasks",
};

export default function TaskList({ tasks, onDeleteTask, onUpdateTask }: TaskListProps) {
  const groupedTasks = statusCategories.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as { [key: string]: Task[] });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {statusCategories.map((status) => (
        <div key={status} className="p-6 rounded-xl shadow-xl flex flex-col bg-gray-100">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-6">
            {statusLabels[status]}
          </h2>
          <div className="space-y-4 flex-grow">
            {groupedTasks[status].length === 0 ? (
              <p className="text-gray-500 text-center">No tasks in this category.</p>
            ) : (
              groupedTasks[status].map((task) => (
                <div
                  key={task._id}
                  className="flex items-start justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex-1 space-y-2">
                    <span className="font-bold text-sm text-white bg-indigo-600 px-2 py-1 rounded-full">
                      {task.category}
                    </span>
                    <p
                      className={`cursor-pointer text-xl font-medium ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <select
                      value={task.status}
                      onChange={(e) => onUpdateTask(task._id, e.target.value)}
                      className="p-2 bg-gray-100 rounded"
                    >
                      {statusCategories.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusLabels[statusOption]}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={() => onDeleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
