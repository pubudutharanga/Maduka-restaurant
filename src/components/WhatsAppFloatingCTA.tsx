"use client";

import { usePathname } from "next/navigation";
import { useCallback, useSyncExternalStore } from "react";
import { getGeneralWhatsAppUrl } from "@/services/api";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/utils";

function getHeroVisibilitySnapshot() {
  const hero = document.getElementById("top");

  if (!hero) return true;

  const rect = hero.getBoundingClientRect();

  return rect.bottom <= 0 || rect.top >= window.innerHeight;
}

function getServerHeroVisibilitySnapshot() {
  return false;
}

export function WhatsAppFloatingCTA() {
  const pathname = usePathname();
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (pathname.startsWith("/book")) return () => {};

      const hero = document.getElementById("top");
      if (!hero) return () => {};

      if (typeof IntersectionObserver === "undefined") {
        window.addEventListener("scroll", onChange, { passive: true });
        window.addEventListener("resize", onChange);

        return () => {
          window.removeEventListener("scroll", onChange);
          window.removeEventListener("resize", onChange);
        };
      }

      const observer = new IntersectionObserver(onChange, { threshold: 0 });
      observer.observe(hero);

      return () => observer.disconnect();
    },
    [pathname],
  );
  const visible = useSyncExternalStore(
    subscribe,
    getHeroVisibilitySnapshot,
    getServerHeroVisibilitySnapshot,
  );

  if (pathname.startsWith("/book")) return null;

  return (
    <a
      href={getGeneralWhatsAppUrl()}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Maduka on WhatsApp"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      data-visible={visible}
      className={cn(
        "group fixed bottom-4 right-4 z-40 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-whatsapp text-white shadow-lift transition-[opacity,transform,background-color] duration-500 ease-out motion-reduce:transition-none hover:-translate-y-0.5 hover:bg-[#0d7568] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
