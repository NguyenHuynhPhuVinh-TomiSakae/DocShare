import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

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
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => router.push("/auth/login")}
                  className=" cursor-pointer magnetic-element text-white/90 hover:text-white text-base uppercase tracking-widest transition-colors duration-300"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => router.push("/auth/register")}
                  className=" cursor-pointer magnetic-element relative px-6 py-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base uppercase tracking-widest"
                >
                  <span className="relative z-10">Đăng ký</span>
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="menu-toggle-button magnetic-element flex flex-col gap-2 items-end group"
              >
                <span
                  className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-out ${
                    menuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-out ${
                    menuOpen ? "opacity-0" : "group-hover:w-8"
                  }`}
                ></span>
                <span
                  className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-out ${
                    menuOpen ? "-rotate-45 -translate-y-2.5" : ""
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
