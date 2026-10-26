"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  dolphinTourFilters,
  experienceImages,
} from "@/data/experienceImages";
import { cn } from "@/lib/utils";
import { ExperienceLightbox } from "./ExperienceLightbox";

type GalleryFilter = (typeof dolphinTourFilters)[number]["id"];

const galleryImages = experienceImages.dolphinTour;

export function DolphinTourGallery() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const counts = useMemo(
    () =>
      galleryImages.reduce<Record<string, number>>(
        (accumulator, image) => {
          accumulator[image.category] =
            (accumulator[image.category] ?? 0) + 1;
          return accumulator;
        },
        { all: galleryImages.length },
      ),
    [],
  );

  const filteredImages = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.category === filter),
    [filter],
  );

  return (
    <>
      <section
        id="dolphin-gallery"
        className="relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-32"
      >
        <div
          className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-turmeric/[0.11] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-lagoon/[0.06] blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <SectionHeading
                eyebrow="The full photo log"
                title={
                  <>
                    Every angle of{" "}
                    <em className="font-normal italic text-cinnamon">
                      the morning.
                    </em>
                  </>
                }
                description="Dolphins in the wild, the family boat, the first light over Ilanthadiya, and the faces of guests who came back grinning. This is the whole morning, uncropped."
              />
            </Reveal>
            <Reveal className="lg:col-span-4" delay={0.08}>
              <div className="rounded-2xl border border-ink/10 bg-ivory p-5 shadow-card">
                <p className="eyebrow text-cinnamon">A note from the beach</p>
                <p className="mt-3 text-[0.82rem] leading-6 text-coastal">
                  Every photograph here was taken around Maduka Restaurant and
                  the Ilanthadiya coastline. Tap a frame to open it full size,
                  then use the arrows or keyboard to keep looking.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-9">
            <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {dolphinTourFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFilter(item.id);
                    setLightboxIndex(null);
                  }}
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

          <div className="mt-7 columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open photo: ${image.caption}`}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-shell text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnamon focus-visible:ring-offset-2 focus-visible:ring-offset-sand sm:mb-4 sm:rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <p className="font-hand text-[1.15rem] leading-none text-sand">
                    {image.caption}
                  </p>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sand/20 text-sand backdrop-blur-md">
                    <Maximize2 className="h-3 w-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-4 text-center text-[0.66rem] uppercase tracking-[0.16em] text-coastal/60">
            Showing {filteredImages.length} of {galleryImages.length}{" "}
            photographs
          </p>
        </div>
      </section>

      {lightboxIndex !== null ? (
        <ExperienceLightbox
          images={filteredImages}
          title="Private Dolphin & Whale Tour"
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </>
  );
}
