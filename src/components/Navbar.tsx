"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { property } from "@/data/property";
import { getGeneralWhatsAppUrl } from "@/services/api";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";

const navLinks = [
  { href: "/#stay", label: "Stay" },
  { href: "/#menu", label: "Kitchen" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#location", label: "Find us" },
];

const menuEase = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const isDolphinTour = pathname === "/dolphin-tour";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dolphinTourWhatsAppUrl = getGeneralWhatsAppUrl(
    "Hello Maduka! 🐬 I would like to book the 7:00 AM Private Dolphin & Whale Watching Tour. Could you share availability and the meeting details?",
  );

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          menuOpen
            ? "bg-sand"
            : scrolled
              ? "border-b border-ink/10 bg-sand/90 shadow-[0_10px_40px_-28px_rgba(28,37,38,0.35)] backdrop-blur-xl"
              : "bg-gradient-to-b from-ink/45 via-ink/10 to-transparent",
        )}
      >
        <div className="container-page">
          <div className="flex h-[4.75rem] items-center justify-between gap-6">
            <Link
              href="/#top"
              aria-label="Maduka Restaurant & Rooms — back to top"
              className="shrink-0"
              onClick={() => setMenuOpen(false)}
            >
              <BrandMark tone={solid ? "dark" : "light"} />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
              {isDolphinTour ? (
                <Link
                  href="/#experiences"
                  className={cn(
                    "inline-flex items-center gap-2 py-2 text-[0.8rem] font-medium tracking-[0.01em] transition-colors",
                    solid
                      ? "text-ink/65 hover:text-ink"
                      : "text-sand/75 hover:text-sand",
                  )}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Maduka Restaurant &amp; Rooms
                </Link>
              ) : (
                navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-2 text-[0.8rem] font-medium tracking-[0.01em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
                      solid
                        ? "text-ink/65 hover:text-ink"
                        : "text-sand/75 hover:text-sand",
                    )}
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              {isDolphinTour ? (
                <>
                  <ButtonLink
                    href={dolphinTourWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="whatsapp"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp Maduka
                  </ButtonLink>
                  <a
                    href={dolphinTourWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="WhatsApp Maduka about the dolphin tour"
                    className="grid h-11 w-11 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_25px_-15px_rgba(18,140,126,0.9)] transition hover:bg-[#0d7568] sm:hidden"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </>
              ) : (
                <ButtonLink
                  href="/book"
                  variant={solid ? "primary" : "light"}
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book direct
                </ButtonLink>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden",
                  solid
                    ? "border-ink/15 text-ink hover:bg-ink/5"
                    : "border-sand/30 text-sand hover:bg-white/10",
                )}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[45] overflow-y-auto bg-sand lg:hidden"
          >
            <div className="flex min-h-full flex-col justify-between px-5 pb-8 pt-28">
              <nav aria-label="Mobile">
                {isDolphinTour ? (
                  <Link
                    href="/#experiences"
                    onClick={() => setMenuOpen(false)}
                    className="mb-4 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ocean"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Maduka Restaurant &amp; Rooms
                  </Link>
                ) : null}
                <motion.ul
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.055, delayChildren: 0.06 },
                    },
                  }}
                >
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      variants={{
                        closed: { opacity: 0, y: 18 },
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.45, ease: menuEase },
                        },
                      }}
                      className="border-b border-ink/10"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between py-4"
                      >
                        <span className="font-display text-[2rem] leading-none tracking-[-0.02em] text-ink">
                          {link.label}
                        </span>
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cinnamon">
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: menuEase }}
                className="mt-8 space-y-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean/8 px-3 py-1.5 text-[0.7rem] font-semibold text-ocean">
                    <Star className="h-3.5 w-3.5 fill-turmeric text-turmeric" />
                    Booking.com 10/10
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean/8 px-3 py-1.5 text-[0.7rem] font-semibold text-ocean">
                    <Star className="h-3.5 w-3.5 fill-turmeric text-turmeric" />
                    Tripadvisor 5.0
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <ButtonLink
                    href={isDolphinTour ? "#reserve-dolphin-tour" : "/book"}
                    onClick={() => setMenuOpen(false)}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    <CalendarDays className="h-5 w-5" />
                    {isDolphinTour ? "Reserve the boat" : "Book direct"}
                  </ButtonLink>
                  <ButtonLink
                    href={
                      isDolphinTour
                        ? dolphinTourWhatsAppUrl
                        : getGeneralWhatsAppUrl()
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="whatsapp"
                    size="md"
                    className="w-full"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {isDolphinTour ? "WhatsApp Maduka" : "Prefer WhatsApp?"}
                  </ButtonLink>
                  <a
                    href={property.phoneHref}
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-coastal"
                  >
                    <Phone className="h-4 w-4" />
                    {property.phoneDisplay}
                  </a>
                </div>
                <p className="text-center text-[0.68rem] uppercase tracking-[0.18em] text-coastal/70">
                  Ilandaiyadi · Kalpitiya · Sri Lanka
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
