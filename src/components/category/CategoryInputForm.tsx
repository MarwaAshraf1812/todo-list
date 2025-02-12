"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface CategoryInputFormProps {
  onCreate: (name: string) => void;
  onCancel: () => void;
}

export function CategoryInputForm({ onCreate, onCancel }: CategoryInputFormProps) {
  const [newCategoryName, setNewCategoryName] = useState("");

  return (
    <div className="flex items-center gap-2">
      <Input
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="Enter category name"
        className="flex-1"
      />
      <Button onClick={() => onCreate(newCategoryName)} size="sm" disabled={!newCategoryName.trim()}>
        Create
      </Button>
      <Button onClick={onCancel} variant="ghost" size="sm">
        Cancel
      </Button>
    </div>
  );
}
