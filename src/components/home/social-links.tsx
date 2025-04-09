"use client";

import React from "react";
import { SocialLinkProps } from "@/types";

export const SocialLinks: React.FC<{ links: SocialLinkProps[] }> = ({ links }) => {
  return (
    <div className="flex space-x-4 mt-8">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors duration-300"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
