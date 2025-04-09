"use client";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import StatsSection from "@/components/home/stats-section";
import CursorEffects from "@/components/ui/cursor-effects";
import useAnimations from "@/hooks/useAnimations";

export default function Home() {
  const { featuresRef, statsRef } = useAnimations();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Cursor follow effect */}
      <CursorEffects />

      {/* Hero section */}
      <HeroSection />

      {/* Features section */}
      <FeaturesSection featuresRef={featuresRef as React.RefObject<HTMLElement>} />

      {/* Stats Section with Counter Animation */}
      <StatsSection statsRef={statsRef as React.RefObject<HTMLElement>} />

    </div>
  );
}
