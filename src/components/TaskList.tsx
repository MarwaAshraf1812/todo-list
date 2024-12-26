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

const statusCategories = ['new', 'doing', 'done'];

export default function TaskList({ tasks, onDeleteTask, onUpdateTask }: TaskListProps) {
  const groupedTasks = statusCategories.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as { [key: string]: Task[] });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {statusCategories.map((status) => (
        <div key={status} className="bg-gradient-to-r from-blue-400 to-purple-600 p-6 rounded-xl shadow-xl flex flex-col">
          <h2 className="text-3xl font-semibold text-white mb-6 capitalize">{status} Tasks</h2>
          <div className="space-y-4 flex-grow">
            {groupedTasks[status].length === 0 ? (
              <p className="text-gray-300 text-center">No tasks in this category.</p>
            ) : (
              groupedTasks[status].map((task) => (
                <div
                  key={task._id}
                  className="flex items-start justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="flex-1 space-y-2">
                    <span className="font-bold text-md text-white bg-indigo-600 px-3 py-1 rounded-full shadow-md">
                      {task.category}
                    </span>
                    <p
                      className={`cursor-pointer block text-xl font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-2">
                    <select
                      value={task.status}
                      onChange={(e) => onUpdateTask(task._id, e.target.value)}
                      className="p-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none transition-colors"
                    >
                      {statusCategories.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={() => onDeleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    >
                      <span className="text-xs">X</span>
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
