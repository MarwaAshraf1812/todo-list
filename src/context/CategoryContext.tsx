"use client";
import { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/clerk-react";

// Define context type
type CategoryContextType = {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  categories: { _id: string; name: string; userId: string }[] | null;
  createCategory: (name: string, userId: string) => Promise<void>;
  showNewTaskForm: boolean;
  setShowNewTaskForm: (show: boolean) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const {userId} = useAuth();
  const categories = useQuery(api.tasks.getCategories, { userId: userId as string  });
  const createCategoryMutation = useMutation(api.tasks.createCategory);

  const createCategory = async (name: string, userId: string) => {
    await createCategoryMutation({ name, userId });
    setShowNewTaskForm(true);
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        categories: categories || [],
        createCategory,
        showNewTaskForm,
        setShowNewTaskForm,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
