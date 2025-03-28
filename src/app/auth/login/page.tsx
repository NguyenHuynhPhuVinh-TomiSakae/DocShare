"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "@/app/components/nav";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    // Khởi tạo hiệu ứng đặc biệt cho trang đăng nhập
    const initLoginPageEffects = () => {
      const pageWrapper = document.querySelector(".login-page-wrapper");
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

    initLoginPageEffects();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="login-page-wrapper min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0c0c0c]"></div>
        <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-purple-900/20 to-transparent"></div>

        {/* Animated circles */}
        <div className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-purple-600/10 blur-[100px] animate-pulse-slow animation-delay-1000"></div>

        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light pointer-events-none"></div>
      </div>

      <Nav />

      {/* Login Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 mt-10">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              staggerChildren: 0.1,
            }}
            className="space-y-12"
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
                Đăng nhập
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
                Tiếp tục với tài khoản của bạn
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
              <div className="field-wrapper relative">
                <div className="group">
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="Email"
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-5 top-4 text-white/50 transition-all duration-300 pointer-events-none"
                    >
                      Email
                    </label>
                    <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>

              <div className="field-wrapper relative">
                <div className="group">
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="Mật khẩu"
                      required
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-5 top-4 text-white/50 transition-all duration-300 pointer-events-none"
                    >
                      Mật khẩu
                    </label>
                    <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="relative flex items-center">
                  <div className="relative">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="appearance-none h-5 w-5 border border-white/20 rounded-md bg-white/5 checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition-colors duration-300 cursor-pointer"
                    />
                    <svg
                      className={`absolute top-0.5 left-0.5 h-4 w-4 text-white pointer-events-none ${
                        rememberMe ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300`}
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
                    htmlFor="remember-me"
                    className="ml-3 text-sm text-white/70"
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

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-4 font-medium tracking-wide hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Đăng nhập</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="flex-grow h-px bg-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-white/40 text-sm">
                  hoặc tiếp tục với
                </span>
                <div className="flex-grow h-px bg-white/10"></div>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300"
                  aria-label="Đăng nhập với Google"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Đăng nhập với Google
                </button>
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
                Chưa có tài khoản?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                >
                  Đăng ký ngay
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
