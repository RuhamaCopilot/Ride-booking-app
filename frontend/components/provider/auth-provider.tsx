"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useAuth as useAuthHook } from "@/hooks/use-auth";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: Omit<User, "id" | "createdAt">) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authHook = useAuthHook();

  return (
    <AuthContext.Provider value={authHook}>{children}</AuthContext.Provider>
  );
}
