"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  Pause,
  Play,
  Sun,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import heroBeachBoats from "../../all-images-of-restaurent/WhatsApp Image 2026-10-24 at 19.4.jpeg";
import heroDiningPavilion from "../../all-images-of-restaurent/812541772.jpg";
import heroBeachHut from "../../all-images-of-restaurent/812541957.jpg";
import heroBonfire from "../../all-images-of-restaurent/812541990.jpg";
import heroHammock from "../../all-images-of-restaurent/825581644.jpg";
import heroGrilledFish from "../../all-images-of-restaurent/WhatsApp Image 2026-10-24 at 19.45.31.jpeg";

const heroSlides = [
  {
    image: heroBeachBoats,
    alt: "Fishing boats on the sand before the lit beach restaurant at dusk",
  },
  {
    image: heroDiningPavilion,
    alt: "The open-air dining pavilion set on the sand",
  },
  {
    image: heroBeachHut,
    alt: "A thatched dining hut framed by coconut palms and the ocean",
  },
  {
    image: heroBonfire,
    alt: "Guests dining by a bonfire under string lights on the beach",
  },
  {
    image: heroHammock,
    alt: "A hammock strung between coconut palms in the garden",
  },
  {
    image: heroGrilledFish,
    alt: "A whole grilled fish with lime, salad and potatoes",
  },
] as const;

const SLIDE_DURATION = 6500;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotion() {
  return false;
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  useEffect(() => {
    if (paused || reducedMotion) return;

    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timeout);
  }, [active, paused, reducedMotion]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ocean-deep text-sand"
    >
      <div
        className="absolute inset-0"
        role="group"
        aria-roledescription="carousel"
        aria-label="Maduka beach and restaurant photos"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none",
              index === active ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
              placeholder="blur"
              quality={85}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-ink/90 via-ink/45 to-ink/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-ink/95 via-ink/10 to-ink/45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-ink/80 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative z-20 flex min-h-[100svh] flex-col justify-end pb-40 pt-32 sm:pb-44 lg:pb-52">
        <div className="max-w-[58rem] text-center sm:text-left">
          <p className="eyebrow flex items-center justify-center gap-3 text-turmeric sm:justify-start">
            <span
              className="hidden h-px w-9 bg-current opacity-70 sm:block"
              aria-hidden="true"
            />
            Kalpitiya · Sri Lanka
          </p>

          <h1 className="mx-auto mt-6 max-w-[55rem] text-[clamp(2.35rem,11vw,2.9rem)] leading-[0.98] tracking-[-0.035em] text-shadow-soft sm:mx-0 sm:text-[4rem] lg:text-[5.1rem] xl:text-[5.7rem]">
            A little corner of{" "}
            <em className="font-normal italic text-turmeric">paradise</em> on
            the sands of Kalpitiya.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[0.98rem] leading-7 text-sand/80 sm:mx-0 sm:text-lg sm:leading-8">
            Two timber chalets on a private strip of beach, Nissansala&apos;s
            scratch-cooked Sri Lankan kitchen, and spinner dolphins just beyond
            the reef. Hosted by the family who has always lived here.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="/book?mode=stay#booking"
              size="lg"
              className="group"
            >
              Reserve a beach chalet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href="/book?mode=table#booking"
              variant="outlineLight"
              size="lg"
              className="group"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Pre-order fresh curry &amp; seafood
            </ButtonLink>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-sand/55 sm:justify-start sm:text-[0.7rem]">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-turmeric" />
              Direct with the family
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-turmeric" />
              No booking fees
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-turmeric" />
              Replies on WhatsApp
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-44 right-8 z-20 hidden h-32 w-32 place-items-center rounded-full border border-sand/30 text-sand/75 xl:grid"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="stamp-ring absolute inset-0 h-full w-full"
        >
          <defs>
            <path
              id="hero-stamp-path"
              d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
            />
          </defs>
          <text className="fill-current text-[6.3px] font-semibold uppercase tracking-[0.26em]">
            <textPath href="#hero-stamp-path">
              Private beach · Family-run · Since 2020 ·
            </textPath>
          </text>
        </svg>
        <Sun className="h-7 w-7 text-turmeric" strokeWidth={1.3} />
      </div>

      <div className="absolute inset-x-0 bottom-20 z-30 flex justify-center sm:bottom-7">
        <div
          className="flex items-center gap-1 rounded-full border border-white/15 bg-ink/30 px-1.5 py-1 shadow-card backdrop-blur-md"
          role="group"
          aria-label="Hero photo controls"
        >
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image.src}
              type="button"
              onClick={() => {
                setActive(index);
                setPaused(true);
              }}
              aria-label={`Show photo ${index + 1} of ${heroSlides.length}`}
              aria-current={index === active ? "true" : undefined}
              className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/10"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  index === active
                    ? "w-6 bg-turmeric"
                    : "w-1.5 bg-sand/45 hover:bg-sand/80",
                )}
              />
            </button>
          ))}

          {!reducedMotion ? (
            <>
              <span
                className="mx-0.5 h-3 w-px bg-sand/20"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={
                  paused ? "Play hero slideshow" : "Pause hero slideshow"
                }
                className="grid h-7 w-7 place-items-center rounded-full text-sand/70 transition hover:bg-white/10 hover:text-sand"
              >
                {paused ? (
                  <Play className="h-3 w-3 fill-current" />
                ) : (
                  <Pause className="h-3 w-3 fill-current" />
                )}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
