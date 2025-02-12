"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface UserContextType {
  userId: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();
  const [user, setUser] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    if (userId !== undefined) {
      setUser(userId || null);
    }
  }, [userId]);

  // Prevent rendering until Clerk initializes
  useEffect(() => {
    if (user === null) {
      redirect("/");
    }
  }, [user]);

  if (user === undefined) return null;

  return (
    <UserContext.Provider value={{ userId: user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
