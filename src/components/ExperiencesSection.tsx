"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Binoculars,
  CalendarDays,
  Check,
  CookingPot,
  Flame,
  Images,
  MapPin,
  Scooter,
  Star,
  Sunrise,
  WavesHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ExperienceLightbox } from "@/components/experience/ExperienceLightbox";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  experienceImages,
  type ExperienceImage,
} from "@/data/experienceImages";
import { experiencesData } from "@/data/experiences";
import { buildWhatsAppUrl, getGeneralWhatsAppUrl } from "@/services/api";
import type { ExperienceItem } from "@/types";
import { cn } from "@/lib/utils";

const experienceIcons: Record<string, LucideIcon> = {
  "beachfront-bbq-parties": Flame,
  "wilpattu-safari-guided-by-maduka": Binoculars,
  "vehicle-scooter-rentals": Scooter,
  "sri-lankan-cooking-class": CookingPot,
};

const imageGroups: Record<string, readonly ExperienceImage[]> = {
  "dolphin-whale-tour": experienceImages.dolphinTour,
  "beachfront-bbq-parties": experienceImages.bbq,
  "wilpattu-safari-guided-by-maduka": experienceImages.wilpattuSafari,
  "vehicle-scooter-rentals": experienceImages.vehicleRental,
  "sri-lankan-cooking-class": experienceImages.cookingClass,
};

const cardSpans = [
  "md:col-span-1 lg:col-span-7",
  "md:col-span-1 lg:col-span-5",
  "md:col-span-1 lg:col-span-5",
  "md:col-span-1 lg:col-span-7",
];

const flagshipHighlights = [
  "Private fishing boat",
  "Maduka & his father as guides",
  "Spinner dolphins & whales",
];

type LightboxState = {
  experienceId: string;
  index: number;
};

function getImages(experienceId: string) {
  return imageGroups[experienceId] ?? [];
}

function getExperience(experienceId: string) {
  return experiencesData.find((experience) => experience.id === experienceId);
}

function ExperienceMedia({
  experience,
  images,
  onOpenGallery,
}: {
  experience: ExperienceItem;
  images: readonly ExperienceImage[];
  onOpenGallery: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const Icon = experienceIcons[experience.id] ?? WavesHorizontal;
  const visibleThumbnails = images.slice(0, 4);
  const hiddenCount = Math.max(images.length - visibleThumbnails.length, 0);

  if (!activeImage) return null;

  return (
    <div className="overflow-hidden rounded-t-[1.75rem] border-b border-sand/10 bg-ocean/50">
      <button
        type="button"
        onClick={() => onOpenGallery(activeIndex)}
        aria-label={`Open ${experience.title} photo gallery`}
        className="group relative block aspect-[4/3] w-full overflow-hidden bg-ocean text-left"
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 42vw"
          className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.035]"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full border border-sand/20 bg-ink/35 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.13em] text-sand/90 backdrop-blur-md">
          <Icon className="h-3 w-3 text-turmeric" strokeWidth={1.8} />
          {experience.badge}
        </span>
        <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-sand/20 bg-ink/40 px-3 py-1.5 text-[0.6rem] font-semibold text-sand/85 backdrop-blur-md">
            <Images className="h-3.5 w-3.5 text-turmeric" />
            View all {images.length} photos
          </span>
          <span className="hidden text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-sand/60 sm:block">
            {experience.imageFolder.split("/").pop()}
          </span>
        </span>
      </button>

      <div className="flex gap-1.5 p-2">
        {visibleThumbnails.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${image.caption}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={cn(
              "relative aspect-[1.45] min-w-0 flex-1 overflow-hidden rounded-lg border transition",
              activeIndex === index
                ? "border-turmeric opacity-100"
                : "border-sand/10 opacity-60 hover:opacity-95",
            )}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(max-width: 768px) 20vw, 10vw"
              className="object-cover"
            />
            {hiddenCount > 0 && index === visibleThumbnails.length - 1 ? (
              <span className="absolute inset-0 grid place-items-center bg-ink/55 text-[0.68rem] font-semibold text-sand backdrop-blur-[1px]">
                +{hiddenCount}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({
  experience,
  onOpenGallery,
}: {
  experience: ExperienceItem;
  onOpenGallery: (experienceId: string, index: number) => void;
}) {
  const images = getImages(experience.id);
  const Icon = experienceIcons[experience.id] ?? WavesHorizontal;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sand/12 bg-white/[0.045] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-sand/25 hover:bg-white/[0.065]">
      <ExperienceMedia
        experience={experience}
        images={images}
        onOpenGallery={(index) => onOpenGallery(experience.id, index)}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-turmeric">
              <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              {experience.badge}
            </p>
            <h4 className="mt-3 font-display text-[1.65rem] leading-[1.08] tracking-[-0.02em] text-sand sm:text-[1.85rem]">
              {experience.title}
            </h4>
          </div>
        </div>

        <p className="mt-3 text-[0.82rem] leading-6 text-sand/65">
          {experience.shortDescription}
        </p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-[0.7rem] leading-5 text-sand/68"
            >
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-turmeric"
                strokeWidth={2.4}
              />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-sand/10 pt-4 text-[0.62rem] leading-5 text-sand/45">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-turmeric/80" />
              {experience.departureOrSchedule}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-sand/20 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-turmeric/80" />
              {experience.location}
            </span>
          </div>
          <a
            href={buildWhatsAppUrl(experience.whatsappPrefillText)}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonClasses({
              variant: "whatsapp",
              size: "sm",
              className:
                "h-auto min-h-11 w-full justify-start gap-2.5 whitespace-normal px-4 py-2.5 text-left text-[0.68rem] leading-4",
            })}
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            <span className="flex-1">Book / Inquire via WhatsApp</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function ExperiencesSection() {
  const [featured, ...secondary] = experiencesData;
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  if (!featured) return null;

  const featuredImages = getImages(featured.id);
  const activeFeatured = featuredImages[featuredIndex] ?? featuredImages[0];
  const lightboxExperience = lightbox
    ? getExperience(lightbox.experienceId)
    : undefined;
  const lightboxImages = lightbox ? getImages(lightbox.experienceId) : [];

  const openLightbox = (experienceId: string, index: number) => {
    setLightbox({ experienceId, index });
  };

  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-ocean-deep py-24 text-sand sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 wash-ocean opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-turmeric/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 select-none font-display text-[18vw] leading-none tracking-[-0.06em] text-sand/[0.025]"
        aria-hidden="true"
      >
        Sea days
      </div>

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-9">
            <SectionHeading
              tone="light"
              eyebrow="AUTHENTIC COASTAL & WILDLIFE ADVENTURES"
              title={
                <>
                  Unforgettable Experiences{" "}
                  <em className="font-normal italic text-turmeric">
                    Hosted by Maduka
                  </em>
                </>
              }
              description="From 7:00 AM private dolphin & whale voyages with Maduka’s father to guided Wilpattu safaris, beachfront BBQ nights, and island vehicle rentals—everything is organized personally by our family."
            />
          </Reveal>
          <Reveal className="lg:col-span-3 lg:justify-self-end" delay={0.08}>
            <div className="rounded-2xl border border-sand/15 bg-white/[0.045] p-5 backdrop-blur-sm">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-turmeric">
                Arranged by the family
              </p>
              <p className="mt-3 text-[0.78rem] leading-6 text-sand/65">
                One WhatsApp to Maduka is all it takes. He will tell you
                honestly what the weather, the season and the sea are doing.
              </p>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-sand transition hover:text-turmeric"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 text-turmeric" />
                Message Maduka on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-11">
          <article className="overflow-hidden rounded-[2rem] border border-sand/12 bg-white/[0.04] shadow-[0_30px_80px_-48px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
              <div className="flex min-h-[25rem] flex-col lg:min-h-[37rem]">
                <button
                  type="button"
                  onClick={() => openLightbox(featured.id, featuredIndex)}
                  aria-label={`Open ${featured.title} photo gallery`}
                  className="group relative min-h-[20rem] flex-1 overflow-hidden bg-ocean text-left sm:min-h-[27rem]"
                >
                  {activeFeatured ? (
                    <Image
                      src={activeFeatured.src}
                      alt={activeFeatured.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 52vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/5"
                    aria-hidden="true"
                  />
                  <span className="absolute left-5 top-5 inline-flex max-w-[calc(100%-2.5rem)] items-center gap-2 rounded-full border border-sand/25 bg-ink/35 px-3.5 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-sand backdrop-blur-md">
                    <Sunrise className="h-3.5 w-3.5 text-turmeric" />
                    Leaves Daily at 7:00 AM • Ilanthadiya Coastline
                  </span>
                  <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <span>
                      <span className="block font-hand text-[1.7rem] leading-none text-sand">
                        {activeFeatured?.caption}
                      </span>
                      <span className="mt-1.5 block text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-sand/55">
                        Private fishing boat · Kalpitiya
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sand/20 bg-ink/40 px-3 py-1.5 text-[0.6rem] font-semibold text-sand/90 backdrop-blur-md">
                      <Images className="h-3.5 w-3.5 text-turmeric" />
                      {featuredIndex + 1} / {featuredImages.length}
                    </span>
                  </span>
                </button>

                <div className="flex gap-1.5 bg-ocean-deep/65 p-2">
                  {featuredImages.slice(0, 5).map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setFeaturedIndex(index)}
                      aria-label={`Show ${image.caption}`}
                      aria-current={
                        featuredIndex === index ? "true" : undefined
                      }
                      className={cn(
                        "relative aspect-[1.55] min-w-0 flex-1 overflow-hidden rounded-lg border transition",
                        featuredIndex === index
                          ? "border-turmeric opacity-100"
                          : "border-sand/10 opacity-55 hover:opacity-90",
                      )}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 18vw, 10vw"
                        className="object-cover"
                      />
                      {index === 4 && featuredImages.length > 5 ? (
                        <span className="absolute inset-0 grid place-items-center bg-ink/55 text-[0.68rem] font-semibold text-sand">
                          +{featuredImages.length - 4}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-turmeric/30 bg-turmeric/10 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-turmeric">
                    <Star className="h-3 w-3 fill-turmeric" />
                    Flagship experience
                  </span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-sand/45">
                    Daily · 7:00 AM
                  </span>
                </div>

                <h3 className="mt-5 max-w-xl font-display text-[2.35rem] leading-[0.98] tracking-[-0.03em] text-sand sm:text-[2.9rem]">
                  Private Dolphin &amp; Whale{" "}
                  <em className="font-normal italic text-turmeric">
                    Watching Tour.
                  </em>
                </h3>
                <p className="mt-3 max-w-xl text-[0.88rem] leading-7 text-sand/70">
                  {featured.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.64rem] text-sand/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Sunrise className="h-3.5 w-3.5 text-turmeric" />
                    Departs 7:00 AM daily
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-turmeric" />
                    Ilanthadiya Beach, Kalpitiya
                  </span>
                </div>

                <blockquote className="mt-5 border-l border-turmeric/40 pl-4 text-[0.8rem] leading-6 text-sand/60">
                  {featured.fullDescriptions[0]}
                </blockquote>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {flagshipHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-[0.73rem] leading-5 text-sand/75"
                    >
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-turmeric/15 text-turmeric">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    href={featured.dedicatedPageUrl ?? "/dolphin-tour"}
                    variant="ocean"
                    size="md"
                    className="group justify-between bg-lagoon hover:bg-ocean sm:justify-center"
                  >
                    Explore Full Tour &amp; Photo Gallery
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </ButtonLink>
                  <a
                    href={buildWhatsAppUrl(featured.whatsappPrefillText)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonClasses({
                      variant: "outlineLight",
                      size: "md",
                      className:
                        "group justify-start border-whatsapp/50 text-[#b9f4e9] hover:border-whatsapp/80 hover:bg-whatsapp/10",
                    })}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Reserve 7:00 AM Boat on WhatsApp
                  </a>
                </div>

                <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6rem] uppercase tracking-[0.12em] text-sand/40">
                  <span>Rates confirmed directly by Maduka</span>
                  <span className="h-1 w-1 rounded-full bg-sand/20" />
                  <span>No booking fees</span>
                  <span className="h-1 w-1 rounded-full bg-sand/20" />
                  <span>Weather dependent</span>
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {featured.hashtags.map((hashtag) => (
                    <span
                      key={hashtag}
                      className="rounded-full border border-sand/10 px-2.5 py-1 text-[0.56rem] text-sand/40"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-sand/15 pt-9">
          <Reveal>
            <p className="eyebrow text-turmeric">More from the family</p>
            <h3 className="mt-3 text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-sand sm:text-[2.25rem]">
              Four more ways to spend a day.
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-md text-[0.8rem] leading-6 text-sand/55">
              Tell Maduka what kind of day you have in mind. He will arrange the
              boat, the jeep, the table or the kitchen around you.
            </p>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {secondary.map((experience, index) => (
            <Reveal
              key={experience.id}
              delay={0.06 + index * 0.05}
              className={cardSpans[index] ?? "md:col-span-1 lg:col-span-6"}
            >
              <ExperienceCard
                experience={experience}
                onOpenGallery={openLightbox}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox && lightboxExperience && lightboxImages.length > 0 ? (
        <ExperienceLightbox
          images={lightboxImages}
          title={lightboxExperience.title}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  );
}
