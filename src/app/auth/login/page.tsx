"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AuthLayout,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthDivider,
  AuthFooter,
  AuthSocialLogin
} from "@/components/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <AuthLayout 
      title="Đăng nhập" 
      subtitle="Tiếp tục với tài khoản của bạn"
      variant="login"
    >
      <AuthForm onSubmit={handleSubmit}>
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

        <AuthButton type="submit" variant="primary">
          Đăng nhập
        </AuthButton>

        <AuthDivider text="hoặc tiếp tục với" />

        <AuthSocialLogin provider="google" label="Đăng nhập với Google" />
      </AuthForm>

      <AuthFooter 
        question="Chưa có tài khoản?" 
        linkText="Đăng ký ngay" 
        linkHref="/auth/register" 
      />
    </AuthLayout>
  );
}
