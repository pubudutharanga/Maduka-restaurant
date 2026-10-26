import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Coffee,
  Heart,
  MapPin,
  Navigation,
  Phone,
  Quote,
  Ship,
  Sparkles,
  Star,
  Sunrise,
  Users,
  UtensilsCrossed,
  WavesHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DolphinTourBookingCard } from "@/components/experience/DolphinTourBookingCard";
import { DolphinTourGallery } from "@/components/experience/DolphinTourGallery";
import { buttonClasses, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  dolphinTourBookingMessage,
  dolphinTourFeatureImage,
  dolphinTourGallery,
  dolphinTourHeroImage,
  dolphinTourMapCopy,
  dolphinTourReasons,
  dolphinTourReviews,
  dolphinTourStats,
  dolphinTourTimeline,
} from "@/data/dolphinTour";
import { experiencesData } from "@/data/experiences";
import { property } from "@/data/property";
import { buildWhatsAppUrl } from "@/services/api";
import { initials } from "@/lib/utils";
import { siteName, siteUrl } from "@/lib/site";

const pageDescription =
  "A private 7:00 AM dolphin & whale watching tour from Ilanthadiya beach, Kalpitiya with Maduka and his fisherman father. One boat, one family, no crowds.";

export const metadata: Metadata = {
  title: "Private Dolphin & Whale Watching Tour",
  description: pageDescription,
  alternates: {
    canonical: "/dolphin-tour",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: `${siteUrl}/dolphin-tour`,
    siteName,
    title: `Private Dolphin & Whale Watching Tour | ${siteName}`,
    description: pageDescription,
    images: [
      {
        url: `${siteUrl}${dolphinTourHeroImage.src}`,
        width: dolphinTourHeroImage.width,
        height: dolphinTourHeroImage.height,
        alt: dolphinTourHeroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Private Dolphin & Whale Watching Tour | ${siteName}`,
    description: pageDescription,
    images: [`${siteUrl}${dolphinTourHeroImage.src}`],
  },
};

const statIcons: LucideIcon[] = [
  Sunrise,
  Users,
  WavesHorizontal,
  Star,
];

const reasonIcons: Record<string, LucideIcon> = {
  navigation: Navigation,
  wildlife: WavesHorizontal,
  hospitality: Heart,
};

const timelineIcons: LucideIcon[] = [
  Coffee,
  Ship,
  WavesHorizontal,
  UtensilsCrossed,
];

const sunriseImage =
  dolphinTourGallery.find((image) =>
    image.src.endsWith("/sunrise-over-sea.jpg"),
  ) ?? dolphinTourHeroImage;

const reserveImage =
  dolphinTourGallery.find((image) =>
    image.src.endsWith("/boat-bow-ocean.jpg"),
  ) ?? dolphinTourFeatureImage;

const tourWhatsAppMessage =
  experiencesData.find((experience) => experience.id === "dolphin-whale-tour")
    ?.whatsappPrefillText ?? dolphinTourBookingMessage;

const tourWhatsAppUrl = buildWhatsAppUrl(tourWhatsAppMessage);

export default function DolphinTourPage() {
  const tour = experiencesData.find(
    (experience) => experience.id === "dolphin-whale-tour",
  );

  if (!tour) return null;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-deep text-sand">
        <Image
          src={dolphinTourHeroImage.src}
          alt={dolphinTourHeroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_55%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ocean-deep"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ocean-deep/85 via-ocean-deep/35 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute -right-28 -top-24 h-[28rem] w-[28rem] rounded-full bg-turmeric/12 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-1/4 h-72 w-72 rounded-full bg-lagoon/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative flex min-h-[100svh] flex-col pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
          <nav aria-label="Breadcrumb">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-sand/65 transition hover:text-sand"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Maduka Restaurant &amp; Rooms
            </Link>
          </nav>

          <div className="mt-auto grid gap-10 pt-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
            <div className="max-w-4xl">
              <p className="eyebrow flex items-center gap-3 text-turmeric">
                <span
                  className="h-px w-8 bg-current opacity-70"
                  aria-hidden="true"
                />
                Private tour · Kalpitiya
              </p>
              <h1 className="mt-5 max-w-4xl text-[2.75rem] leading-[0.96] tracking-[-0.04em] text-shadow-soft sm:text-[4rem] lg:text-[5.15rem]">
                Dreaming of Seeing{" "}
                <em className="font-normal italic text-turmeric">Dolphins?</em>{" "}

                <span className="ml-1 inline-block align-middle text-[0.6em]">

                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-[0.95rem] leading-7 text-sand/78 sm:text-base sm:leading-8">
                {tour.fullDescriptions[1]}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {dolphinTourStats.map((stat, index) => {
                  const Icon = statIcons[index] ?? Star;
                  return (
                    <span
                      key={stat}
                      className="inline-flex items-center gap-2 rounded-full border border-sand/18 bg-ink/22 px-3.5 py-2 text-[0.66rem] font-medium text-sand/85 backdrop-blur-md"
                    >
                      <Icon className="h-3.5 w-3.5 text-turmeric" />
                      {stat}
                    </span>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <a
                  href={tourWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonClasses({
                    variant: "whatsapp",
                    size: "lg",
                    className: "justify-center text-center",
                  })}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Reserve 7:00 AM Boat on WhatsApp
                </a>
                <a
                  href="#dolphin-gallery"
                  className={buttonClasses({
                    variant: "outlineLight",
                    size: "lg",
                    className: "justify-center text-center",
                  })}
                >
                  <Sparkles className="h-4 w-4 text-turmeric" />
                  Explore the full photo gallery
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>

            <aside className="hidden w-full rounded-[1.5rem] border border-sand/18 bg-ink/25 p-5 backdrop-blur-md lg:block">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-turmeric">
                The morning, at a glance
              </p>
              <ul className="mt-4 space-y-3 text-[0.76rem] leading-5 text-sand/80">
                <li className="flex items-start gap-2.5">
                  <Sunrise className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Leaves at 7:00 AM from the beach in front of the restaurant
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Around two to three hours on the water
                </li>
                <li className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Private boat — just your group
                </li>
                <li className="flex items-start gap-2.5">
                  <UtensilsCrossed className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Breakfast by the sea is optional
                </li>
              </ul>
              <p className="mt-5 border-t border-sand/15 pt-4 font-hand text-[1.55rem] leading-tight text-turmeric">
                We leave when the sea is calm.
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-sand/45">
                With Maduka &amp; his father
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="why-sail"
        className="relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-32"
      >
        <div
          className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-turmeric/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why sail with Maduka & his father"
                title={
                  <>
                    Why Sail With Maduka{" "}
                    <em className="font-normal italic text-cinnamon">
                      &amp; His Father
                    </em>
                  </>
                }
                description="This is not a resort excursion. It is a morning on the water with a family who has fished these waters all their lives."
              />
              <p className="mt-5 max-w-xl text-[0.84rem] leading-7 text-coastal">
                Maduka grew up on this beach. His father still reads the
                currents, the wind and the horizon the way other people read a
                clock. When you step onto their boat, you are not joining a
                tour — you are being taken out by the family who knows exactly
                where the spinner dolphins feed.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ocean shadow-lift">
                <Image
                  src={dolphinTourFeatureImage.src}
                  alt={dolphinTourFeatureImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-hand text-[1.75rem] leading-none text-sand">
                    “The sea is our family’s second home.”
                  </p>
                  <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-sand/55">
                    Maduka · Ilanthadiya beach
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {dolphinTourReasons.map((reason, index) => {
              const Icon = reasonIcons[reason.id] ?? Sparkles;
              return (
                <Reveal key={reason.id} delay={0.05 + index * 0.05}>
                  <article className="group h-full rounded-[1.5rem] border border-ink/10 bg-ivory p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-cinnamon/20 hover:shadow-soft">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-ocean/[0.06] text-ocean transition-colors group-hover:bg-cinnamon/10 group-hover:text-cinnamon">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span className="font-display text-[1.4rem] leading-none text-ink/15">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.55rem] leading-[1.08] tracking-[-0.02em] text-ink">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-[0.79rem] leading-6 text-coastal">
                      {reason.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ocean-deep py-24 text-sand sm:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 wash-ocean opacity-80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-turmeric/[0.08] blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <SectionHeading
                tone="light"
                eyebrow="The 7:00 am voyage"
                title={
                  <>
                    Your morning,{" "}
                    <em className="font-normal italic text-turmeric">
                      step by step.
                    </em>
                  </>
                }
                description="A slow, simple start on the sand. Coffee first, then the boat, then the dolphins — and breakfast waiting when you come back in."
              />
            </Reveal>
            <Reveal className="lg:col-span-4" delay={0.08}>
              <div className="rounded-2xl border border-sand/15 bg-white/[0.045] p-5 backdrop-blur-sm">
                <p className="eyebrow text-turmeric">A flexible morning</p>
                <p className="mt-3 text-[0.78rem] leading-6 text-sand/65">
                  The sea decides the weather. If conditions are not right,
                  Maduka will tell you honestly and move your date without any
                  fuss.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ocean sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={sunriseImage.src}
                  alt={sunriseImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-turmeric">
                    Ilanthadiya · first light
                  </p>
                  <p className="mt-2 max-w-sm font-display text-[1.65rem] leading-[1.05] text-sand sm:text-[1.9rem]">
                    The best wildlife window is early, before the wind picks up.
                  </p>
                  <p className="mt-3 text-[0.72rem] leading-5 text-sand/55">
                    That is why every boat leaves at 7:00 AM — not when the
                    crowds arrive.
                  </p>
                </div>
              </div>
            </Reveal>

            <ol className="relative space-y-3 border-l border-sand/15 pl-6 sm:pl-8">
              {dolphinTourTimeline.map((step, index) => {
                const Icon = timelineIcons[index] ?? WavesHorizontal;
                return (
                  <li key={step.time} className="relative">
                    <span
                      className="absolute -left-[2.2rem] top-5 grid h-8 w-8 place-items-center rounded-full border border-sand/20 bg-ocean-deep text-turmeric shadow-[0_0_0_6px_rgba(8,56,68,1)] sm:-left-[2.7rem]"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.7} />
                    </span>
                    <Reveal delay={0.04 + index * 0.06}>
                      <article className="rounded-2xl border border-sand/12 bg-white/[0.045] p-5 backdrop-blur-sm sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="inline-flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-turmeric">
                            <span className="h-px w-5 bg-current opacity-70" />
                            {step.time}
                          </p>
                          <span className="text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-sand/30">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-[1.55rem] leading-[1.06] tracking-[-0.02em] text-sand sm:text-[1.75rem]">
                          {step.title}
                        </h3>
                        <p className="mt-2.5 text-[0.78rem] leading-6 text-sand/62">
                          {step.body}
                        </p>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <DolphinTourGallery />

      <section
        id="dolphin-reviews"
        className="relative overflow-hidden bg-shell py-24 sm:py-28 lg:py-32"
      >
        <div
          className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-lagoon/[0.08] blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <SectionHeading
                eyebrow="Guest stories"
                title={
                  <>
                    What Guests Say About{" "}
                    <em className="font-normal italic text-cinnamon">
                      the Dolphin Tour.
                    </em>
                  </>
                }
                description="The dolphins are the reason people come. The family is the reason they remember it."
              />
            </Reveal>
            <Reveal className="lg:col-span-4" delay={0.08}>
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-ivory p-5 shadow-card">
                <span className="font-display text-[2.6rem] leading-none text-ocean">
                  5.0
                </span>
                <span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className="h-3.5 w-3.5 fill-turmeric text-turmeric"
                      />
                    ))}
                  </span>
                  <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-coastal">
                    Tripadvisor · Booking.com
                  </span>
                </span>
                <span className="ml-auto rounded-full bg-ocean/[0.06] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-ocean">
                  Guest-loved
                </span>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {dolphinTourReviews.map((review, index) => (
              <Reveal key={review.id} delay={0.04 + index * 0.05}>
                <article className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-ivory p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-ocean/8 text-[0.7rem] font-semibold text-ocean">
                        {initials(review.author)}
                      </span>
                      <div>
                        <p className="text-[0.8rem] font-semibold text-ink">
                          {review.author}
                        </p>
                        <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-coastal/70">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <Quote
                      className="h-6 w-6 shrink-0 text-cinnamon/25"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-3 w-3 fill-turmeric text-turmeric"
                        />
                      ))}
                    </span>
                    <span className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-coastal/55">
                      {review.source} · {review.score}
                    </span>
                  </div>

                  <blockquote className="mt-4 flex-1 text-[0.84rem] leading-6 text-coastal">
                    “{review.quote}”
                  </blockquote>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row">
            <p className="text-[0.62rem] uppercase tracking-[0.15em] text-coastal/55">
              Quotes reproduced from Tripadvisor &amp; Booking.com
            </p>
            <ButtonLink href="/#reviews" variant="outline" size="sm">
              Read more guest reviews
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        id="reserve-dolphin-tour"
        className="relative overflow-hidden bg-ocean-deep py-24 text-sand sm:py-28 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 wash-ocean opacity-75"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-28 top-10 h-[30rem] w-[30rem] rounded-full bg-turmeric/[0.09] blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              tone="light"
              eyebrow="Reserve the boat"
              title={
                <>
                  Your 7:00 AM morning{" "}
                  <em className="font-normal italic text-turmeric">
                    starts here.
                  </em>
                </>
              }
              description="Choose your date, tell us how many are coming, and add breakfast if you like. Maduka will confirm availability and the meeting point on WhatsApp."
            />

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-sand/12 bg-ocean">
              <div className="relative aspect-[16/10]">
                <Image
                  src={reserveImage.src}
                  alt={reserveImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-hand text-[1.7rem] leading-none text-sand">
                    One boat. One sunrise. Just your group.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
                <p className="flex items-start gap-2 text-[0.7rem] leading-5 text-sand/65">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Coffee, water and ginger tea before you leave
                </p>
                <p className="flex items-start gap-2 text-[0.7rem] leading-5 text-sand/65">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Maduka &amp; his father on every trip
                </p>
                <p className="flex items-start gap-2 text-[0.7rem] leading-5 text-sand/65">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Breakfast back on the private beach, if you wish
                </p>
                <p className="flex items-start gap-2 text-[0.7rem] leading-5 text-sand/65">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Flexible dates when the weather turns
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={property.phoneHref}
                className="flex items-center gap-3 rounded-2xl border border-sand/15 bg-white/[0.04] p-4 text-sand transition hover:border-sand/30 hover:bg-white/[0.07]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-turmeric/10 text-turmeric">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-sand/45">
                    One-tap call
                  </span>
                  <span className="mt-0.5 block text-[0.78rem] font-semibold">
                    {property.phoneDisplay}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-sand/15 bg-white/[0.04] p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-turmeric/10 text-turmeric">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-sand/45">
                    Meeting point
                  </span>
                  <span className="mt-0.5 block text-[0.72rem] font-medium leading-5 text-sand/75">
                    Ilanthadiya beach, Kalpitiya
                  </span>
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-[0.7rem] leading-5 text-sand/45">
              {dolphinTourMapCopy}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <DolphinTourBookingCard />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ivory">
        <Link
          href="/"
          className="group grid lg:grid-cols-2"
          aria-label="Return to the Maduka Restaurant & Rooms home page"
        >
          <div className="relative min-h-[24rem] overflow-hidden sm:min-h-[30rem] lg:min-h-[38rem]">
            <Image
              src="/images/guests/breakfast-by-the-sea.jpg"
              alt={sunriseImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_62%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
              aria-hidden="true"
            />
            <span className="absolute bottom-5 left-5 rounded-full border border-sand/20 bg-ink/35 px-3.5 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-sand/80 backdrop-blur-md sm:bottom-7 sm:left-7">
              Happy Guest
            </span>
          </div>
          <div className="flex flex-col justify-center bg-ocean-deep px-6 py-14 text-sand sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <p className="eyebrow text-turmeric">Back to the beginning</p>
            <h2 className="mt-4 max-w-md font-display text-[2.5rem] leading-[1.02] tracking-[-0.03em] sm:text-[3rem]">
              Maduka Restaurant &amp; Rooms
            </h2>
            <p className="mt-5 max-w-md text-[0.9rem] leading-7 text-sand/70">
              The beach, the kitchen and the rooms — return to the main page
              and see where the morning began.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-turmeric">
              Visit the main page
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </section>
    </>
  );
}
