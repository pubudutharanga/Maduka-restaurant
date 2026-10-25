"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * A hydration-safe scroll reveal. The hidden state is rendered on the server
 * and the visible state is added after IntersectionObserver runs, so the
 * server and first client render always match. CSS handles the transition and
 * the reduced-motion override.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px -70px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible ? "true" : "false"}
      style={style}
    >
      {children}
    </div>
  );
}
