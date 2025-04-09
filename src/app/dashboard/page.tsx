"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-white mx-auto mb-3 sm:mb-4"></div>
          <p className="text-base sm:text-lg">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16 sm:pt-20 md:pt-24">
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-white/5 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Xin chào, {user?.name}!</h2>
              <p className="text-white/70 text-sm sm:text-base">
                Bạn đã đăng nhập thành công vào hệ thống DocShare. Đây là trang dashboard của bạn.
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm sm:text-base font-medium transition-colors duration-300 flex items-center ${
                isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingOut ? (
                <>
                  <span className="inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></span>
                  Đang đăng xuất...
                </>
              ) : (
                "Đăng xuất"
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Thông tin tài khoản</h3>
            <div className="space-y-1 sm:space-y-2 text-white/70 text-sm sm:text-base">
              <p>
                <span className="text-white/50">Tên:</span> {user?.name}
              </p>
              <p>
                <span className="text-white/50">Email:</span> {user?.email}
              </p>
              <p>
                <span className="text-white/50">ID:</span> {user?.id}
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Tài liệu gần đây</h3>
            <p className="text-white/70 text-sm sm:text-base">Chưa có tài liệu nào.</p>
          </div>

          <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Hoạt động</h3>
            <p className="text-white/70 text-sm sm:text-base">Chưa có hoạt động nào.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
