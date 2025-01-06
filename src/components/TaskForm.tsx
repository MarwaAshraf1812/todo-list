"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface TaskFormProps {
  onAddTask: (task: { title: string; category: string; status: string }) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("new");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task || !category) return;
    onAddTask({ title: task, category, status });
    setTask("");
    setCategory("");
    setStatus("new");
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto"
        />
        <Input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto"
        >
          <option value="new">New</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <Button className="bg-blue-500 text-white p-2 rounded-md w-full md:w-auto">
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
