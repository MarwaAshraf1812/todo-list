"use client";

import AppSidebar from "@/components/sidebar/sidebar";
import { CategoryProvider } from "@/context/CategoryContext";
import { UserProvider } from "@/context/UserProvider";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
    <CategoryProvider>
      <div className="flex h-screen">
        <AppSidebar /> 
        <main className="flex-1 p-6">{children}</main>
      </div>
    </CategoryProvider>
    </UserProvider>
  );
}
