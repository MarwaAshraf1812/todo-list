"use client";
import { useMutation, useQuery, Id } from 'convex/react';
import { api } from '../../convex/_generated/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const tasks = useQuery(api.functions.tasks.getTasks.getTasks);
  const addTask = useMutation(api.functions.tasks.addTask.addTask);
  const deleteTask = useMutation(api.functions.tasks.deleteTask.deleteTask);

  const handleAddTask = async (title: string) => {
    await addTask({ title });
  };

  const handleDelete = async (id: Id<"tasks">) => {
    await deleteTask({ id });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold text-gray-900 mb-8">My To-Do List</h1>
      
      <TaskForm onAddTask={handleAddTask} />
      
      <TaskList
        tasks={tasks || []}
        onDeleteTask={handleDelete}
      />
    </div>
  );
}
