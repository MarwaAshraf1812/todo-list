"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Id } from "convex/react";

// Define proper types to match your schema
type Priority = "low" | "medium" | "high";
type Status = "pending" | "in_progress" | "completed";

interface Task {
  id: Id<"tasks">;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  categoryId: Id<"categories">;
  userId: string;
  createdAt: number;
  updatedAt?: number;
}

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description?: string;
    priority: Priority;
    categoryId: Id<"categories">;
  }) => void;
  initialTask?: Task;
  onCancel?: () => void;
  categories: { id: Id<"categories">; name: string;}[];
}

export function TaskForm({
  onSubmit,
  initialTask,
  onCancel,
  categories
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );
  const [priority, setPriority] = useState<Priority>(
    initialTask?.priority || "medium"
  );
  const [categoryId, setCategoryId] = useState<Id<"categories"> | null>(
    initialTask?.categoryId || (categories.length > 0 ? categories[0].id : null)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (categories.length === 0) {
      toast.error("No categories available. Please create a category first.");
      return;
    }

    onSubmit({
      title: title.trim(),
      priority,
      description: description.trim() || undefined,
      categoryId,
    });

    // Only reset form if we're not editing
    if (!initialTask) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategoryId(categories.length > 0 ? categories[0].id : null);
    }
  };

  // Show message if no categories are available
  if (categories.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
        Please create a category before adding tasks.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">
        {initialTask ? "Edit Task" : "Add New Task"}
      </h1>

      <div className="space-y-2">
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
        />
      </div>

      <div className="space-y-2">
        <Select
          value={priority}
          onValueChange={(value: Priority) => setPriority(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Select
          value={categoryId || ""}
          onValueChange={(value) => setCategoryId(value as Id<"categories">)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          {initialTask ? "Update Task" : "Add Task"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
