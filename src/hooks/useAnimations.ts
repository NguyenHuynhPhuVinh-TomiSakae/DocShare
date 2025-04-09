"use client";

import { useEffect, useRef } from "react";

export const useAnimations = () => {
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

  return { featuresRef, statsRef };
};

export default useAnimations;
