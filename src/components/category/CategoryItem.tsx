"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

interface CategoryItemProps {
  category: { _id: string; name: string };
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CategoryItem({ category, onSelect, onDelete }: CategoryItemProps) {
  return (
    <li
      className="flex justify-between items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
      onClick={() => onSelect(category._id)}
    >
      <span className="text-sm font-medium">{category.name}</span>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:bg-red-100 transition"
        onClick={(e) => {
          e.stopPropagation(); // Prevent selecting when deleting
          onDelete(category._id);
        }}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </li>
  );
}
