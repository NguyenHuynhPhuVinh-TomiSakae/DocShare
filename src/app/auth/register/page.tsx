"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "@/app/components/nav";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    setLoaded(true);

    // Khởi tạo hiệu ứng đặc biệt cho trang đăng ký
    const initRegisterPageEffects = () => {
      const pageWrapper = document.querySelector(".register-page-wrapper");
      const inputFields = document.querySelectorAll(".input-field");

      if (pageWrapper) {
        pageWrapper.classList.add("loaded");
      }

      inputFields.forEach((field) => {
        field.addEventListener("focus", () => {
          field.closest(".field-wrapper")?.classList.add("focused");
        });

        field.addEventListener("blur", (e) => {
          const target = e.target as HTMLInputElement;
          if (!target.value) {
            field.closest(".field-wrapper")?.classList.remove("focused");
          }
        });
      });
    };

    initRegisterPageEffects();
  }, []);

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
    <div className="register-page-wrapper min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0c0c0c]"></div>
        <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-blue-900/20 to-transparent"></div>

        {/* Animated circles */}
        <div className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full bg-purple-600/10 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-slow animation-delay-1000"></div>

        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light pointer-events-none"></div>
      </div>

      <Nav />

      {/* Progress Bar */}
      <div className="relative z-10 mt-24 px-8">
        <div className="container mx-auto max-w-md">
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
              Hoàn tất
            </span>
          </div>
        </div>
      </div>

      {/* Register Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              staggerChildren: 0.1,
            }}
            className="space-y-8"
          >
            <div className="text-center">
              <motion.h1
                className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
              >
                {currentStep === 1 && "Tạo tài khoản"}
                {currentStep === 2 && "Mật khẩu"}
                {currentStep === 3 && "Hoàn tất đăng ký"}
              </motion.h1>
              <motion.p
                className="text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
              >
                {currentStep === 1 && "Nhập thông tin cá nhân của bạn"}
                {currentStep === 2 && "Tạo mật khẩu an toàn"}
                {currentStep === 3 && "Xác nhận hoàn tất đăng ký"}
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
            >
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <>
                  <div className="field-wrapper relative">
                    <div className="group">
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input-field w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="Tên của bạn"
                          required
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-5 top-4 text-white/50 transition-all duration-300 pointer-events-none"
                        >
                          Tên của bạn
                        </label>
                        <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="field-wrapper relative">
                    <div className="group">
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input-field w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="Email"
                          required
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-5 top-4 text-white/50 transition-all duration-300 pointer-events-none"
                        >
                          Email
                        </label>
                        <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Password */}
              {currentStep === 2 && (
                <>
                  <div className="field-wrapper relative">
                    <div className="group">
                      <div className="relative">
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input-field w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="Mật khẩu"
                          required
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-5 top-4 text-white/50 transition-all duration-300 pointer-events-none"
                        >
                          Mật khẩu
                        </label>
                        <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="field-wrapper relative">
                    <div className="group">
                      <div className="relative">
                        <input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="input-field w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="Xác nhận mật khẩu"
                          required
                        />
                        <label
                          htmlFor="confirm-password"
                          className="absolute left-5 top-4 text-white/50 transition-all duration-300 pointer-events-none"
                        >
                          Xác nhận mật khẩu
                        </label>
                        <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Terms & Confirm */}
              {currentStep === 3 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="appearance-none h-5 w-5 border border-white/20 rounded-md bg-white/5 checked:bg-purple-500 checked:border-purple-500 focus:outline-none transition-colors duration-300 cursor-pointer"
                      />
                      <svg
                        className="absolute h-4 w-4 text-white pointer-events-none"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <label
                      htmlFor="terms"
                      className="ml-3 text-sm text-white/70"
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
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-6 py-3 border border-white/10 rounded-xl text-white/80 hover:bg-white/5 transition-colors duration-300"
                  >
                    Quay lại
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    Tiếp theo
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    Hoàn tất đăng ký
                  </button>
                )}
              </div>
            </motion.form>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
            >
              <p className="text-white/60 text-sm">
                Đã có tài khoản?{" "}
                <Link
                  href="/auth/login"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
                >
                  Đăng nhập
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Custom styles */}
      <style jsx>{`
        .field-wrapper.focused label,
        .input-field:not(:placeholder-shown) + label {
          transform: translateY(-20px) scale(0.8);
          color: rgba(255, 255, 255, 0.8);
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
