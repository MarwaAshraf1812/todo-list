"use client";
import { useState } from "react";

interface TaskFormProps {
  onAddTask: (task: string) => void;
}
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function TaskForm({ onAddTask }: TaskFormProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;
    onAddTask(task);
    setTask("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-2">
        <Input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <Button className="bg-blue-500 text-white p-2 rounded-md">
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
