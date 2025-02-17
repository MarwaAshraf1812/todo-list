"use client";

import AppSidebar from "@/components/sidebar/sidebar";
import { CategoryProvider } from "@/context/CategoryContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <CategoryProvider>
        <div className="flex h-screen">
          <AppSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </CategoryProvider>
  );
}
