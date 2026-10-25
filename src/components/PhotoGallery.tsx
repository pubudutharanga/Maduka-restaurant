"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/data/images";
import type { ImageCategory } from "@/data/images";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";

type Filter = ImageCategory | "all";

const categoryLabels: Record<ImageCategory, string> = {
  property: "The place",
  beach: "Beach & sunsets",
  dining: "Kitchen & table",
  rooms: "Rooms",
  guests: "Guests",
  dolphins: "Dolphins",
  brand: "Brand",
};

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "beach", label: "Beach & sunsets" },
  { id: "dining", label: "Kitchen & table" },
  { id: "rooms", label: "Rooms" },
  { id: "guests", label: "Guests" },
  { id: "dolphins", label: "Dolphins" },
  { id: "property", label: "The place" },
];

const INITIAL_COUNT = 16;
const STEP = 12;

export function PhotoGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const counts = useMemo(() => {
    return galleryImages.reduce<Record<string, number>>(
      (accumulator, image) => {
        accumulator[image.category] = (accumulator[image.category] ?? 0) + 1;
        return accumulator;
      },
      { all: galleryImages.length },
    );
  }, []);

  const filteredImages = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.category === filter),
    [filter],
  );

  const shownImages = filteredImages.slice(0, visible);
  const activeImage =
    lightboxIndex === null ? null : filteredImages[lightboxIndex];

  useLockBodyScroll(lightboxIndex !== null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    const previous = lastFocusedRef.current;
    if (previous) {
      window.requestAnimationFrame(() => previous.focus());
    }
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? current : (current + 1) % filteredImages.length,
    );
  }, [filteredImages.length]);

  const previousImage = useCallback(() => {
    setLightboxIndex((current) =>
      current === null
        ? current
        : (current - 1 + filteredImages.length) % filteredImages.length,
    );
  }, [filteredImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextImage();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousImage();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, previousImage]);

  const changeFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    setVisible(INITIAL_COUNT);
    setLightboxIndex(null);
  };

  const openLightbox = (index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  };

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-32"
      >
        <div
          className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-turmeric/[0.08] blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <SectionHeading
                eyebrow="The photo album"
                title={
                  <>
                    Not a brochure.{" "}
                    <em className="font-normal italic text-cinnamon">
                      Just the way it looks.
                    </em>
                  </>
                }
                description="Breakfast on the sand, the boats coming home, the crab curry, the two rooms, the hammock. Every photograph here was taken at Maduka Restaurant & Rooms or on the beach directly in front of it."
              />
            </Reveal>
            <Reveal className="lg:col-span-4" delay={0.1}>
              <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-ivory p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ocean/5 text-ocean">
                  <Images className="h-4 w-4" />
                </span>
                <p className="text-[0.78rem] leading-6 text-coastal">
                  Tap any photograph to open it full size. Use the arrow keys to
                  move through the album.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-9">
            <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => changeFilter(item.id)}
                  aria-pressed={filter === item.id}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2.5 text-[0.7rem] font-semibold transition-all duration-300",
                    filter === item.id
                      ? "border-ocean bg-ocean text-sand shadow-card"
                      : "border-ink/15 bg-transparent text-coastal hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {item.label}
                  <span className="ml-1.5 opacity-55">
                    {counts[item.id] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            layout
            className="mt-7 columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4"
          >
            <AnimatePresence mode="popLayout">
              {shownImages.map((image, index) => (
                <motion.button
                  key={image.src}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.02, 0.18),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => openLightbox(index)}
                  aria-label={`Open photo: ${image.caption}`}
                  className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-shell text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnamon focus-visible:ring-offset-2 focus-visible:ring-offset-sand sm:mb-4 sm:rounded-2xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <div>
                      <p className="text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-turmeric">
                        {categoryLabels[image.category]}
                      </p>
                      <p className="mt-0.5 font-hand text-[1.15rem] leading-none text-sand">
                        {image.caption}
                      </p>
                    </div>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sand/20 text-sand backdrop-blur-md">
                      <Maximize2 className="h-3 w-3" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-[0.68rem] uppercase tracking-[0.15em] text-coastal/60">
              Showing {shownImages.length} of {filteredImages.length} photographs
            </p>
            {visible < filteredImages.length ? (
              <button
                type="button"
                onClick={() => setVisible((count) => count + STEP)}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[0.7rem] font-semibold text-ink transition hover:border-ink/35 hover:bg-ink/[0.03]"
              >
                Load more photographs
                <span className="text-coastal/50">
                  +{Math.min(STEP, filteredImages.length - visible)}
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeImage && lightboxIndex !== null ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-3 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${lightboxIndex + 1} of ${filteredImages.length}: ${activeImage.caption}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <div className="relative flex h-full w-full max-w-6xl flex-col">
              <div className="flex items-center justify-between gap-4 pb-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-sand/20 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-sand/80">
                    {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                    {String(filteredImages.length).padStart(2, "0")}
                  </span>
                  <span className="hidden text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-turmeric sm:block">
                    {categoryLabels[activeImage.category]}
                  </span>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close photo viewer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-sand/20 text-sand transition hover:bg-sand/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-xl bg-ocean-deep/60">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeImage.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage.src}
                      alt={activeImage.alt}
                      fill
                      sizes="100vw"
                      placeholder="blur"
                      blurDataURL={activeImage.blurDataURL}
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous photograph"
                  className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sand/20 bg-ink/40 text-sand backdrop-blur-md transition hover:bg-ink/65 sm:left-4"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next photograph"
                  className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sand/20 bg-ink/40 text-sand backdrop-blur-md transition hover:bg-ink/65 sm:right-4"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-hand text-[1.6rem] leading-none text-sand">
                    {activeImage.caption}
                  </p>
                  <p className="mt-1 max-w-xl text-[0.7rem] leading-5 text-sand/55">
                    {activeImage.alt}
                  </p>
                </div>
                <p className="text-[0.58rem] uppercase tracking-[0.16em] text-sand/35">
                  Maduka Restaurant &amp; Rooms · Ilandaiyadi
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
