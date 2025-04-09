"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4 backdrop-blur-md bg-black/20" : "py-8"
        }`}
      >
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="magnetic-element">
                <Image
                  className="hover:rotate-12 transition-transform duration-300"
                  src="/logo.svg"
                  alt="DocShare logo"
                  width={40}
                  height={40}
                  priority
                />
              </div>
              <span className="text-2xl font-light tracking-widest">
                DOCSHARE
              </span>
            </div>

            <nav className="hidden lg:flex space-x-12">
              <div
                onClick={() => router.push("/")}
                className="text-white/70 hover:text-white text-base uppercase tracking-widest transition-colors duration-300 py-2 relative magnetic-link cursor-pointer"
              >
                <span className="split-hover-text">Trang chủ</span>
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </div>
              <div
                onClick={() => router.push("/tai-lieu")}
                className="text-white/70 hover:text-white text-base uppercase tracking-widest transition-colors duration-300 py-2 relative magnetic-link cursor-pointer"
              >
                <span className="split-hover-text">Tài liệu</span>
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </div>
              <div
                onClick={() => router.push("/tinh-nang")}
                className="text-white/70 hover:text-white text-base uppercase tracking-widest transition-colors duration-300 py-2 relative magnetic-link cursor-pointer"
              >
                <span className="split-hover-text">Tính năng</span>
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </div>
              <div
                onClick={() => router.push("/lien-he")}
                className="text-white/70 hover:text-white text-base uppercase tracking-widest transition-colors duration-300 py-2 relative magnetic-link cursor-pointer"
              >
                <span className="split-hover-text">Liên hệ</span>
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </div>
            </nav>

            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-3">
                    {session?.user?.image ? (
                      <Image 
                        src={session.user.image}
                        alt={session.user.name || "Người dùng"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {session?.user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="text-white/90 text-sm">
                      {session?.user?.name || "Người dùng"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/auth/login"
                    className="text-white/70 hover:text-white text-base transition-colors duration-300"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-50 w-10 h-10 flex items-center justify-center"
              >
                <span
                  className={`block w-6 h-0.5 bg-white absolute transform transition-transform duration-300 ${
                    menuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white absolute transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white absolute transform transition-transform duration-300 ${
                    menuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md flex items-center justify-center transition-all duration-700 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="container mx-auto px-8 relative">
          {/* Animated Background Circles */}
          <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4"></div>
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/3"></div>

          <div className="flex flex-col items-center justify-center gap-12">
            {/* User Info (Mobile) */}
            {isAuthenticated && (
              <div className={`md:hidden flex flex-col items-center gap-4 ${
                menuOpen
                  ? "transform translate-y-0 opacity-100"
                  : "transform translate-y-full opacity-0"
              }`}>
                {session?.user?.image ? (
                  <Image 
                    src={session.user.image}
                    alt={session.user.name || "Người dùng"}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="text-white text-xl">
                  {session?.user?.name || "Người dùng"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 text-white py-2 px-6 rounded-lg transition-colors duration-300 mt-2"
                >
                  Đăng xuất
                </button>
              </div>
            )}
            
            {/* Social Links */}
            <div
              className={`flex space-x-8 ${
                menuOpen
                  ? "transform translate-y-0 opacity-100"
                  : "transform translate-y-full opacity-0"
              }`}
            >
              <a
                href="#"
                className="text-white/70 hover:text-blue-400 transition-colors duration-300"
              >
                {/* <FaTwitter className="h-6 w-6" /> */}
                Twitter
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-blue-400 transition-colors duration-300"
              >
                {/* <FaInstagram className="h-6 w-6" /> */}
                Instagram
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-blue-400 transition-colors duration-300"
              >
                {/* <FaLinkedin className="h-6 w-6" /> */}
                LinkedIn
              </a>
            </div>

            {/* Call to Action */}
            <div
              className={`${
                menuOpen
                  ? "transform translate-y-0 opacity-100"
                  : "transform translate-y-full opacity-0"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl text-center">
                <h3 className="text-3xl font-semibold mb-4 text-white">
                  Hướng dẫn sử dụng
                </h3>
                <p className="text-white/70 text-lg mb-4">
                  Chào mừng bạn đến với DocShare! Dưới đây là một vài hướng dẫn
                  nhanh để giúp bạn bắt đầu:
                </p>

                <ul className="text-white/70 space-y-6">
                  <li>
                    <span className="font-semibold text-blue-400">
                      Tìm kiếm:
                    </span>
                    &nbsp;Sử dụng thanh tìm kiếm để nhanh chóng tìm thấy tài
                    liệu bạn cần.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-400">
                      Chia sẻ:
                    </span>
                    &nbsp;Dễ dàng tải lên và chia sẻ tài liệu của bạn với cộng
                    đồng.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-400">
                      Khám phá:
                    </span>
                    &nbsp;Duyệt qua các danh mục hoặc xem các tài liệu được đề
                    xuất để tìm nội dung mới.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
