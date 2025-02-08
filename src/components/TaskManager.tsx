"use client";

import { useState } from "react";
import AppSidebar from "./sidebar/sidebar";
import TaskList from "./TaskList";


export default function TaskManager({ userId }: { userId: string }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className="flex h-screen">
      <AppSidebar onCategorySelect={setSelectedCategoryId} />
      <main className="flex-1 p-6 bg-gray-50">
        <TaskList categoryId={selectedCategoryId} userId={userId} />
      </main>
    </div>
  );
}