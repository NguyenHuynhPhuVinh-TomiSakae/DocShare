"use client";

import { useState } from "react";

export default function RegisterForm({
  onToggleForm,
}: {
  onToggleForm: () => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây
    console.log({ username, email, password });
  };

  return (
    <div className="w-full max-w-md border-2 border-black rounded-lg p-4">
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold text-black border-2 border-black rounded-lg py-2 px-4">
          ĐĂNG KÝ
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="inline-block border-2 border-black rounded-lg py-1 px-4 mb-2"
          >
            Tên tài khoản
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-2 border-black rounded-lg p-2"
            placeholder="Nhập tên tài khoản của bạn..."
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="inline-block border-2 border-black rounded-lg py-1 px-4 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-black rounded-lg p-2"
            placeholder="Nhập email của bạn..."
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="inline-block border-2 border-black rounded-lg py-1 px-4 mb-2"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-black rounded-lg p-2"
            placeholder="Nhập mật khẩu của bạn..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border-2 border-blue-600 rounded-lg shadow-sm text-blue-600 focus:outline-none mt-8 hover:opacity-80 cursor-pointer"
        >
          Đăng ký
        </button>

        <button
          type="button"
          onClick={() => console.log("Đăng ký với Google")}
          className="w-full flex justify-center items-center py-2 px-4 rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none mt-4 cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="mr-2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6 10.2274C19.6 9.51801 19.5364 8.83936 19.4182 8.1818H10V12.0501H15.3818C15.15 13.3001 14.4455 14.3592 13.3864 15.0683V17.5774H16.6182C18.5091 15.8364 19.6 13.2728 19.6 10.2274Z"
              fill="#4285F4"
            />
            <path
              d="M10.0001 20C12.7001 20 14.9637 19.1046 16.6182 17.5773L13.3864 15.0682C12.4909 15.6682 11.3455 16.0228 10.0001 16.0228C7.39547 16.0228 5.19088 14.2637 4.40452 11.9H1.06361V14.4909C2.70908 17.7591 6.09088 20 10.0001 20Z"
              fill="#34A853"
            />
            <path
              d="M4.40455 11.9C4.20455 11.3 4.09088 10.6591 4.09088 10C4.09088 9.34091 4.20455 8.70001 4.40455 8.10001V5.50909H1.06364C0.386365 6.85909 0 8.38636 0 10C0 11.6136 0.386365 13.1409 1.06364 14.4909L4.40455 11.9Z"
              fill="#FBBC05"
            />
            <path
              d="M10.0001 3.97727C11.4682 3.97727 12.7864 4.48182 13.8228 5.47273L16.6909 2.60455C14.9592 0.990909 12.6955 0 10.0001 0C6.09088 0 2.70908 2.24091 1.06361 5.50909L4.40452 8.10001C5.19088 5.73636 7.39547 3.97727 10.0001 3.97727Z"
              fill="#EA4335"
            />
          </svg>
          Đăng ký với google
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <button
            onClick={onToggleForm}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}
