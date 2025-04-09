/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setIsLoading(false);
        return { success: false, error: result.error };
      }

      router.push("/dashboard");
      router.refresh();
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: "Đã xảy ra lỗi khi đăng nhập" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Gọi API đăng ký
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        return { success: false, error: data.error || "Đã xảy ra lỗi khi đăng ký" };
      }

      // Đăng nhập tự động sau khi đăng ký thành công
      return await login(email, password);
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: "Đã xảy ra lỗi khi đăng ký" };
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: "Đã xảy ra lỗi khi đăng nhập với Google" };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/auth/login" });
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: "Đã xảy ra lỗi khi đăng xuất" };
    }
  };

  return {
    session,
    isAuthenticated: !!session?.user,
    isLoading,
    user: session?.user,
    login,
    register,
    loginWithGoogle,
    logout,
  };
}
