"use client";

import { useState, useEffect } from "react";
import type { User, RegisterData } from "@/types/auth";
import { AuthService } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(() => currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const user = await AuthService.login(email, password);
    setUser(() => user);
    return user;
  };

  const register = async (userData: RegisterData) => {
    const user = await AuthService.register(userData);
    setUser(() => user);
    return user;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
