"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";
import { Input } from "../ui/input";
import { FaPlus } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useCategory } from "@/context/CategoryContext";
import { useAuth } from "@clerk/clerk-react";

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { setSelectedCategoryId, createCategory, categories } = useCategory();
  const { userId } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (userId) {
        await createCategory(categoryName, userId);
      } else {
        console.error("User ID is not available.");
      }
      setCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    const newSelectedId = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelectedId);
    setSelectedCategoryId(newSelectedId);
  };

  return (
    <div className="h-full relative">
      <div
        className={cn(
          "bg-white text-black p-4 transition-all duration-300 h-full overflow-hidden z-30 border-r border-slate-200",
          isCollapsed ? "w-16" : "w-64",
          isMobile ? "absolute top-0 left-0 h-full" : "relative"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={cn("text-xl font-bold", isCollapsed && "hidden")}>
            Dashboard
          </h2>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RiDashboardHorizontalFill className="text-xl" />
              <span className={cn("ml-2", isCollapsed && "hidden")}>
                Overview
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/history"
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MdHistory className="text-xl" />
              <span className={cn("ml-2", isCollapsed && "hidden")}>
                History
              </span>
            </Link>
            </li>
        </ul>

        <div className={cn("mt-8", isCollapsed && "hidden")}>
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
            <Input
              placeholder="Add new category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="flex-1"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground p-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaPlus />
            </button>
          </form>
          <ul className="space-y-1">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <li 
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  className={cn(
                    "p-2 rounded-lg cursor-pointer transition-colors",
                    "hover:bg-gray-100",
                    selectedCategory === category._id && "bg-accent text-accent-foreground"
                  )}
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No categories available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}