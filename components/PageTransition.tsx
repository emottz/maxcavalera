"use client";

import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Her zaman preloader kadar bekle (3200ms)
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
}
