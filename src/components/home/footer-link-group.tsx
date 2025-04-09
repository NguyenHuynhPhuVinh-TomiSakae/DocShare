"use client";

import React from "react";
import { FooterLinkGroupProps } from "@/types";

export const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-widest mb-6">{title}</h3>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;
