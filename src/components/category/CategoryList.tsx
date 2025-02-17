"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useCategory } from "@/context/CategoryContext";
import { CategoryItem } from "./CategoryItem";
import { CategoryInputForm } from "./CategoryInputForm";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@clerk/clerk-react";
import { redirect } from "next/navigation";

export function CategoryList() {
  const { userId } = useAuth();
  const { categories, createCategory, setSelectedCategoryId } = useCategory();
  const [showInput, setShowInput] = useState(false);
  const deleteCategoryMutation = useMutation(api.tasks.deleteCategory);

  const deleteCategory = (id: string) => {
    deleteCategoryMutation({ categoryId: id });
  };

  const handleCreateCategory = async (name: string) => {
    if (name.trim()) {
      if (userId) {
        await createCategory(name, userId);
      } else {
        redirect("/");
      }
      setShowInput(false);
    }
  };

  return (
    <div className="space-y-4">
      {showInput ? (
        <CategoryInputForm onCreate={handleCreateCategory} onCancel={() => setShowInput(false)} />
      ) : (
        <Button onClick={() => setShowInput(true)} className="w-full">
          <PlusIcon className="h-4 w-4 mr-2" /> Create Category
        </Button>
      )}

      <ul className="space-y-2">
        {categories?.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            onSelect={setSelectedCategoryId}
            onDelete={deleteCategory}
          />
        ))}
      </ul>
    </div>
  );
}
