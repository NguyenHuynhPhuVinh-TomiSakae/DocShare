"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Nav from "./components/nav";
import { FaArrowRight } from "react-icons/fa6";
import {
  RiUserSettingsLine,
  RiFileUploadLine,
  RiSearchLine,
} from "react-icons/ri";

export default function Home() {
  const featuresRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
      observer.observe(card);
    });

    const statItems = document.querySelectorAll(".stat-item");
    statItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Cursor follow effect */}
      <div className="cursor-follow fixed w-[50vw] h-[50vh] rounded-full blur-[100px] bg-blue-500/20 pointer-events-none opacity-70 transition-transform duration-[800ms] ease-out -z-10" />

      <Nav />

      {/* Hero section */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden mt-10">
        {/* WebGL Canvas Background */}
        <div className="absolute inset-0 -z-10">
          <div id="canvas-container" className="absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black"></div>
        </div>

        {/* Distortion overlay */}
        <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 gap-16">
            <div className="space-y-8 text-center max-w-5xl mx-auto">
              <div className="relative mb-6">
                <h1 className="text-6xl md:text-8xl xl:text-9xl font-black leading-none uppercase split-text-animation tracking-tighter">
                  <div className="overflow-hidden">
                    <span className="inline-block animate-reveal-text-up">
                      Nền tảng
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="inline-block animate-reveal-text-up animation-delay-100">
                      chia sẻ tài liệu
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block animate-reveal-text-up animation-delay-200">
                      hàng đầu.
                    </span>
                  </div>
                </h1>

                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[120px] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-70"></div>
              </div>

              <p className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
                Truy cập hàng ngàn tài liệu chất lượng, chia sẻ kiến thức và kết
                nối với cộng đồng học tập toàn cầu.
              </p>

              <div className="flex flex-wrap gap-6 justify-center pt-8">
                <a
                  href="#features"
                  className="magnetic-button group relative px-10 py-5 overflow-hidden rounded-full"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle,_white_10%,_transparent_70%)] transition-opacity duration-500"></span>
                  <span className="relative z-10 text-white text-lg uppercase tracking-wider font-medium">
                    Khám phá ngay
                  </span>
                </a>

                <a
                  href="/auth/login"
                  className="magnetic-button group relative px-10 py-5 overflow-hidden rounded-full"
                >
                  <span className="absolute inset-0 border-2 border-white/30 group-hover:border-white/60 rounded-full transition-colors duration-500"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-500"></span>
                  <span className="relative z-10 text-white/90 text-lg uppercase tracking-wider font-medium">
                    Đăng nhập
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-5 right-5">
            <div className="flex flex-col items-center space-y-4">
              <span className="text-white/40 text-xs uppercase tracking-widest">
                Cuộn xuống
              </span>
              <div className="mouse-scroll-indicator">
                <div className="mouse border-2 border-white/30 w-8 h-14 rounded-full flex justify-center p-1">
                  <div className="scroller bg-white/70 w-1 h-3 rounded-full animate-scroll"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" ref={featuresRef} className="py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,65,201,0.15),transparent_70%)] z-0"></div>

        {/* Parallax elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="parallax-element absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"
            data-parallax-speed="-0.2"
          ></div>
          <div
            className="parallax-element absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"
            data-parallax-speed="0.3"
          ></div>
          <div
            className="parallax-element absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-pink-600/10 blur-3xl"
            data-parallax-speed="-0.1"
          ></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="inline-block text-sm uppercase tracking-[0.2em] text-white/50 mb-4">
              Tính năng nổi bật
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 leading-tight max-w-5xl mx-auto">
              Khai phá tiềm năng học tập
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="feature-card group opacity-0 translate-y-8 transition-all duration-700 perspective">
              <div className="relative h-full transform-style-3d hover:rotate-y-10 hover:rotate-x-10 transition-transform duration-700">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 h-full hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 transform-style-3d">
                  <div className="w-20 h-20 mb-8 relative">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 delay-100"></div>
                    <div className="absolute inset-0 bg-black rounded-2xl flex items-center justify-center">
                      {/* Replace SVG with React Icons */}
                      <RiUserSettingsLine className="h-10 w-10 text-purple-400 transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-purple-400 transition-colors duration-300">
                    Giao diện thân thiện, dễ sử dụng
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    Thiết kế tối giản, trực quan giúp bạn dễ dàng tìm kiếm, lưu
                    trữ và chia sẻ tài liệu một cách nhanh chóng.
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      href="#"
                      className="group inline-flex items-center text-purple-400 hover:text-purple-300"
                    >
                      <span>Xem thêm</span>
                      {/* Replace SVG with React Icons */}
                      <FaArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* 3D effect elements */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 transform translate-z-20 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-z-10 pointer-events-none"></div>
              </div>
            </div>

            <div className="feature-card group opacity-0 translate-y-8 transition-all duration-700 perspective">
              <div className="relative h-full transform-style-3d hover:rotate-y-10 hover:rotate-x-10 transition-transform duration-700">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 h-full hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-500 transform-style-3d">
                  <div className="w-20 h-20 mb-8 relative">
                    <div className="absolute inset-0 bg-pink-500/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 delay-100"></div>
                    <div className="absolute inset-0 bg-black rounded-2xl flex items-center justify-center">
                      {/* Replace SVG with React Icons */}
                      <RiFileUploadLine className="h-10 w-10 text-pink-400 transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-pink-400 transition-colors duration-300">
                    Dễ dàng tải lên và chia sẻ
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    Chia sẻ tài liệu của bạn với mọi người một cách nhanh chóng
                    và dễ dàng. Hỗ trợ nhiều định dạng tệp khác nhau.
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      href="#"
                      className="group inline-flex items-center text-pink-400 hover:text-pink-300"
                    >
                      <span>Xem thêm</span>
                      {/* Replace SVG with React Icons */}
                      <FaArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* 3D effect elements */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 transform translate-z-20 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-z-10 pointer-events-none"></div>
              </div>
            </div>

            <div className="feature-card group opacity-0 translate-y-8 transition-all duration-700 perspective">
              <div className="relative h-full transform-style-3d hover:rotate-y-10 hover:rotate-x-10 transition-transform duration-700">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 h-full hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 transform-style-3d">
                  <div className="w-20 h-20 mb-8 relative">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 delay-100"></div>
                    <div className="absolute inset-0 bg-black rounded-2xl flex items-center justify-center">
                      {/* Replace SVG with React Icons */}
                      <RiSearchLine className="h-10 w-10 text-orange-400 transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    Tìm kiếm và khám phá
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    Dễ dàng tìm kiếm tài liệu bạn cần và khám phá những tài liệu
                    mới dựa trên sở thích của bạn.
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      href="#"
                      className="group inline-flex items-center text-orange-400 hover:text-orange-300"
                    >
                      <span>Xem thêm</span>
                      {/* Replace SVG with React Icons */}
                      <FaArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* 3D effect elements */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 transform translate-z-20 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-z-10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section ref={statsRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"></div>
        <div className="container mx-auto px-8 relative">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Số liệu ấn tượng
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16">
              <div className="stat-item opacity-0 scale-90 transition-all duration-700 text-center group">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
                  <div className="relative">
                    <span
                      className="counter-animation text-6xl md:text-7xl xl:text-8xl font-bold text-blue-400 tabular-nums"
                      data-target="10000"
                      data-suffix="+"
                    >
                      20+
                    </span>
                    <div className="text-white/60 text-sm uppercase tracking-widest mt-4 font-medium">
                      Tài liệu
                    </div>
                  </div>
                </div>
              </div>

              <div className="stat-item opacity-0 scale-90 transition-all duration-700 text-center group">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
                  <div className="relative">
                    <span
                      className="counter-animation text-6xl md:text-7xl xl:text-8xl font-bold text-purple-400 tabular-nums"
                      data-target="5000"
                      data-suffix="+"
                    >
                      5+
                    </span>
                    <div className="text-white/60 text-sm uppercase tracking-widest mt-4 font-medium">
                      Thành viên
                    </div>
                  </div>
                </div>
              </div>

              <div className="stat-item opacity-0 scale-90 transition-all duration-700 text-center group">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
                  <div className="relative">
                    <span
                      className="counter-animation text-6xl md:text-7xl xl:text-8xl font-bold text-pink-400 tabular-nums"
                      data-target="200"
                      data-suffix="+"
                    >
                      3+
                    </span>
                    <div className="text-white/60 text-sm uppercase tracking-widest mt-4 font-medium">
                      Lĩnh vực
                    </div>
                  </div>
                </div>
              </div>

              <div className="stat-item opacity-0 scale-90 transition-all duration-700 text-center group">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
                  <div className="relative">
                    <span
                      className="counter-animation text-6xl md:text-7xl xl:text-8xl font-bold text-orange-400 tabular-nums"
                      data-target="4.8"
                      data-suffix=" / 5"
                    >
                      5+
                    </span>
                    <div className="text-white/60 text-sm uppercase tracking-widest mt-4 font-medium">
                      Đánh giá
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.svg"
                  alt="DocShare logo"
                  width={32}
                  height={32}
                  priority
                />
                <span className="text-2xl font-light tracking-wider">
                  DOCSHARE
                </span>
              </div>
              <p className="text-white/60 max-w-xs">
                Nền tảng chia sẻ tài liệu hàng đầu dành cho cộng đồng học tập và
                nghiên cứu toàn cầu.
              </p>
              <div className="flex space-x-4 mt-8">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors duration-300"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors duration-300"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors duration-300"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest mb-6">
                Liên kết nhanh
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Tài liệu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Đăng tải
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Cộng đồng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest mb-6">Hỗ trợ</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest mb-6">
                Đăng ký nhận tin
              </h3>
              <p className="text-white/60 mb-4">
                Nhận thông báo về tài liệu mới và tin tức hàng tuần.
              </p>
              <form className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-3 rounded-lg text-sm uppercase tracking-widest"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40">
            <p>
              &copy; {new Date().getFullYear()} DocShare. Tất cả các quyền được
              bảo lưu.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom cursor */}
      <div className="cursor-outer fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none opacity-0 z-50 transition-transform duration-200 ease-out"></div>
      <div className="cursor-inner fixed w-2 h-2 rounded-full bg-white pointer-events-none opacity-0 z-50 transition-transform duration-150 ease-out"></div>

      {/* Cursor ripple effect */}
      <div className="cursor-ripple fixed pointer-events-none z-40"></div>

      {/* Global styles cho hiệu ứng */}
      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(-40px, -20px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(8px);
            opacity: 0;
          }
        }

        .animate-scroll {
          animation: scroll 1.5s infinite;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
      `}</style>
    </div>
  );
}
