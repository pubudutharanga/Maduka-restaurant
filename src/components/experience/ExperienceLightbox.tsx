"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ExperienceImage } from "@/data/experienceImages";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";

interface ExperienceLightboxProps {
  images: readonly ExperienceImage[];
  title: string;
  initialIndex?: number;
  onClose: () => void;
}

export function ExperienceLightbox({
  images,
  title,
  initialIndex = 0,
  onClose,
}: ExperienceLightboxProps) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)),
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRailRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(true);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const previous = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      } else if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(
          (element) =>
            element.getClientRects().length > 0 ||
            element === document.activeElement,
        );

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!dialog.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.requestAnimationFrame(() => previousFocus?.focus());
    };
  }, [next, onClose, previous]);

  useEffect(() => {
    const rail = thumbnailRailRef.current;
    if (!rail) return;
    const active = rail.querySelector<HTMLElement>(
      `[data-thumbnail-index="${index}"]`,
    );
    active?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [index]);

  const activeImage = images[index];
  if (!activeImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo gallery, photo ${index + 1} of ${images.length}: ${activeImage.caption}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, y: 14, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-full max-w-7xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3">
          <div className="min-w-0">
            <p className="truncate text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-turmeric">
              {title} · Photo {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
            <p className="mt-1 hidden font-hand text-[1.35rem] leading-none text-sand/85 sm:block">
              {activeImage.caption}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo gallery"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand/20 bg-ink/20 text-sand transition hover:border-sand/40 hover:bg-sand/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-ocean-deep/65">
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
          <button
            type="button"
            onClick={previous}
            aria-label="Previous photograph"
            className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sand/20 bg-ink/45 text-sand backdrop-blur-md transition hover:bg-ink/70 sm:left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photograph"
            className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sand/20 bg-ink/45 text-sand backdrop-blur-md transition hover:bg-ink/70 sm:right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="pt-4">
          <p className="font-hand text-[1.55rem] leading-none text-sand sm:hidden">
            {activeImage.caption}
          </p>
          <div
            ref={thumbnailRailRef}
            className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1"
            aria-label="Choose a photograph"
          >
            {images.map((image, imageIndex) => (
              <button
                key={image.src}
                type="button"
                data-thumbnail-index={imageIndex}
                onClick={() => setIndex(imageIndex)}
                aria-label={`View photo: ${image.caption}`}
                aria-current={imageIndex === index ? "true" : undefined}
                className={cn(
                  "relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border transition sm:h-14 sm:w-14",
                  imageIndex === index
                    ? "border-turmeric opacity-100"
                    : "border-sand/20 opacity-55 hover:opacity-90",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.14em] text-sand/40">
            Use the arrow keys to move through the gallery
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
