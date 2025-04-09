"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AuthLayout,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthFooter
} from "@/components/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password, confirmPassword });
  };

  const goToNextStep = () => {
    if (currentStep === 1 && name && email) {
      setCurrentStep(2);
      setProgress(66);
    } else if (
      currentStep === 2 &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setCurrentStep(3);
      setProgress(100);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setProgress(33);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setProgress(66);
    }
  };

  return (
    <AuthLayout 
      title="Đăng ký" 
      subtitle="Tạo tài khoản mới"
      variant="register"
    >
      {/* Progress Bar */}
      <div className="relative z-10 mb-8">
        <div className="w-full bg-white/5 rounded-full h-2 mb-4">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ width: "33%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
        </div>

        <div className="flex justify-between text-xs text-white/50 uppercase tracking-wider">
          <span className={currentStep >= 1 ? "text-purple-400" : ""}>
            Thông tin
          </span>
          <span className={currentStep >= 2 ? "text-purple-400" : ""}>
            Mật khẩu
          </span>
          <span className={currentStep >= 3 ? "text-purple-400" : ""}>
            Xác nhận
          </span>
        </div>
      </div>

      <AuthForm onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="space-y-6">
            <AuthInput
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Họ và tên"
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
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
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
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-white/70"
              >
                Tôi đồng ý với{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Chính sách bảo mật
                </a>
              </label>
            </div>

            <div className="text-white/70 text-sm">
              <p className="mb-4">
                Xin chào <strong>{name}</strong>,
              </p>
              <p>
                Bạn đang đăng ký tài khoản DocShare với email{" "}
                <strong>{email}</strong>. Sau khi đăng ký, một email xác
                nhận sẽ được gửi đến địa chỉ email này.
              </p>
            </div>
          </div>
        )}

        <div
          className={`flex ${
            currentStep === 1 ? "justify-end" : "justify-between"
          }`}
        >
          {currentStep > 1 && (
            <AuthButton
              type="button"
              onClick={goToPreviousStep}
              variant="outline"
              fullWidth={false}
              className="px-6"
            >
              Quay lại
            </AuthButton>
          )}

          {currentStep < 3 ? (
            <AuthButton
              type="button"
              onClick={goToNextStep}
              variant="secondary"
              fullWidth={false}
              className="px-6"
            >
              Tiếp theo
            </AuthButton>
          ) : (
            <AuthButton
              type="submit"
              variant="secondary"
              fullWidth={false}
              className="px-6"
            >
              Hoàn tất đăng ký
            </AuthButton>
          )}
        </div>
      </AuthForm>

      <AuthFooter 
        question="Đã có tài khoản?" 
        linkText="Đăng nhập" 
        linkHref="/auth/login" 
      />
    </AuthLayout>
  );
}
