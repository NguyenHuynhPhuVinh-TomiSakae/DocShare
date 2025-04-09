"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <main className="container mx-auto p-6">
        <div className="bg-white/5 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Xin chào, {user?.name}!</h2>
          <p className="text-white/70">
            Bạn đã đăng nhập thành công vào hệ thống DocShare. Đây là trang dashboard của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Thông tin tài khoản</h3>
            <div className="space-y-2 text-white/70">
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

          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Tài liệu gần đây</h3>
            <p className="text-white/70">Chưa có tài liệu nào.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Hoạt động</h3>
            <p className="text-white/70">Chưa có hoạt động nào.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
