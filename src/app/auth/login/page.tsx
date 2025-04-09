"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AuthLayout,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthDivider,
  AuthFooter,
  AuthSocialLogin
} from "@/components/auth";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login, loginWithGoogle, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    
    try {
      setError("");
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.error || "Email hoặc mật khẩu không chính xác");
        return;
      }
      
      // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      
      // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công với Google
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
      setError("Đã xảy ra lỗi khi đăng nhập với Google");
    }
  };

  return (
    <AuthLayout 
      title="Đăng nhập" 
      subtitle="Tiếp tục với tài khoản của bạn"
      variant="login"
    >
      <AuthForm onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-100/10 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}
        
        <AuthInput
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
        />

        <AuthInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Mật khẩu"
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-white/60"
            >
              Ghi nhớ đăng nhập
            </label>
          </div>

          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <AuthButton type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </AuthButton>

        <AuthDivider text="hoặc tiếp tục với" />

        <AuthSocialLogin 
          provider="google" 
          label="Đăng nhập với Google" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        />
      </AuthForm>

      <AuthFooter 
        question="Chưa có tài khoản?" 
        linkText="Đăng ký ngay" 
        linkHref="/auth/register" 
      />
    </AuthLayout>
  );
}
