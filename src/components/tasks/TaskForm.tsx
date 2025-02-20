"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, Id } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";

interface TaskFormProps {
  onClose: () => void;
  initialCategoryId?: string | null;
  task?: {
    _id: string;
    title: string;
    description: string;
    categoryId: string;
    priority: string;
    status: string;
  } | null;
}

export function TaskForm({ onClose, initialCategoryId, task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [categoryId, setCategoryId] = useState<Id<"categories"> | null>(
    task?.categoryId
      ? { __tableName: "categories", id: task.categoryId }
      : initialCategoryId
        ? { __tableName: "categories", id: initialCategoryId }
        : null
  );
  const [priority, setPriority] = useState(task?.priority || "Medium");
  const [status, setStatus] = useState(task?.status || "Todo");

  const { userId } = useAuth();
  const categories = useQuery(api.tasks.getCategories, {userId: userId as string});
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategoryId({ __tableName: "categories", id: task.categoryId });
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !categoryId || !userId) return;

    if (task) {
      await updateTask({
        title,
        description,
        categoryId: categoryId._id,
        priority,
        status,
        taskId: task._id as Id<"tasks">,
      });
    } else {
      await createTask({
        title,
        description,
        categoryId: categoryId.id,
        priority,
        status,
        userId,
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        value={categoryId?.id || ""}
        onValueChange={(value) =>
          setCategoryId({ __tableName: "categories", id: value })
        }
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Todo">Todo</SelectItem>
          <SelectItem value="In_Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{task ? "Update Task" : "Create Task"}</Button>
      </div>
    </form>
  );
}
