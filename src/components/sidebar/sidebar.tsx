"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { Input } from "../ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const { userId } = useAuth();

  const createCategory = useMutation(api.tasks.createCategory);
  const categories = useQuery(api.tasks.getCategories) || [];
  

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

  const handleAddCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (userId) {
        await createCategory({ name: categoryName, userId });
      } else {
        console.error("User ID is not available.");
      }
      setCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="h-full relative">
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-white text-black p-4 transition-all duration-300 h-full overflow-hidden z-30 border border-r-slate-400 ${
          isMobile ? "absolute top-0 left-0 h-full" : "relative"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}
          >
            Dashboard
          </h2>
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center hover:text-gray-400"
            >
              <RiDashboardHorizontalFill className="inline text-xl" />
              <span
                className={`ml-2 transition-opacity ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
              >
                Overview
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/history"
              className="flex items-center hover:text-gray-400"
            >
              <LuHistory className="inline text-xl" />
              <span
                className={`ml-2 transition-opacity ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
              >
                History
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center hover:text-gray-400"
            >
              <CiSettings className="inline text-xl" />
              <span
                className={`ml-2 transition-opacity ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>

        <div
          className={`mt-5 ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
        >
          <h3 className="text-sm font-semibold">Categories</h3>
          <form onSubmit={handleAddCategory} className="mt-2 flex">
            <Input
              placeholder="Add new category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </form>
          <ul className="flex flex-col mt-2">
            {categories?.length > 0 ? (
              categories.map((category) => (
                <li key={category._id} className="flex items-center py-2">
                  {category.name}
                </li>
              ))
            ) : (
              <li>No categories available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
