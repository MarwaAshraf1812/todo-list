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
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-2">
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <Input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="new">New</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <Button className="bg-blue-500 text-white p-2 rounded-md">
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
