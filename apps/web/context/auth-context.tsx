"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { id: number; name: string; email: string; profileImage?: string | null } | null;
  login: (id: number, email: string, username?: string, profileImage?: string | null) => void;
  updateUser: (data: { name?: string; email?: string; profileImage?: string | null }) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string; email: string; profileImage?: string | null } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 초기 로드 시 localStorage 확인
    const storedAuth = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");

    if (storedAuth === "true" && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (id: number, email: string, username?: string, profileImage?: string | null) => {
    // 로그인 시 받아온 정보로 유저 상태 설정
    const newUser = { 
      id,
      name: username || "User", 
      email, 
      profileImage: profileImage || null 
    };
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoggedIn(true);
    setUser(newUser);
    router.push("/board");
  };

  const updateUser = (data: { name?: string; email?: string; profileImage?: string | null }) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
