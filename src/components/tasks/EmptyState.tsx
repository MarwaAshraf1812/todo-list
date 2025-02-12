"use client";
import Image from "next/image";
import { CategoryList } from "../category/CategoryList";

export function EmptyState() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left py-10 px-16 space-y-6 md:space-y-0 md:space-x-10">
      <div className="flex flex-col items-center md:items-start max-w-lg">
        <div className="relative bg-gray-100 rounded-xl shadow-md p-4">
          <Image 
            src="/write_notes.jpg" 
            width={400} 
            height={400} 
            alt="No Category Selected" 
            className="rounded-lg"
          />
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mt-6">No Category Selected</h3>
        <p className="text-gray-500 text-base mt-2">
          Select a category from the sidebar or create a new one to start managing your tasks.
        </p>
      </div>

      <div className="w-full md:w-80 md:ml-12">
        <CategoryList />
      </div>
    </div>
  );
}
