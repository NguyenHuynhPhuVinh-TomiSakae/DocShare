"use client";
import { useState } from "react";
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, loginWithGoogle, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    
    try {
      setError("");
      const result = await register(name, email, password);
      
      if (!result.success) {
        setError(result.error || "Đã xảy ra lỗi khi đăng ký");
        return;
      }
      
      // Chuyển hướng đến trang dashboard sau khi đăng ký thành công
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setError("Đã xảy ra lỗi khi đăng ký");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
      setError("Đã xảy ra lỗi khi đăng nhập với Google");
    }
  };

  return (
    <AuthLayout
      title="Đăng ký tài khoản"
      subtitle="Tạo tài khoản mới để sử dụng DocShare"
      variant="register"
    >
      <AuthForm onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-100/10 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}
        
        <AuthInput
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Họ tên"
          required
        />

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

        <AuthInput
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Xác nhận mật khẩu"
          required
        />

        <AuthButton type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng ký"}
        </AuthButton>

        <AuthDivider text="hoặc tiếp tục với" />

        <AuthSocialLogin 
          provider="google" 
          label="Đăng ký với Google" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        />
      </AuthForm>

      <AuthFooter
        question="Đã có tài khoản?"
        linkText="Đăng nhập ngay"
        linkHref="/auth/login"
      />
    </AuthLayout>
  );
}
