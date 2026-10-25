"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Languages,
  Quote,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews, ratingSummaries } from "@/data/reviews";
import type { Review, ReviewPlatform } from "@/types";
import { cn, initials } from "@/lib/utils";

const platformTabs: { id: ReviewPlatform; label: string; sublabel: string }[] = [
  { id: "booking", label: "Booking.com", sublabel: "20 stays" },
  { id: "tripadvisor", label: "Tripadvisor", sublabel: "21 reviews" },
];

const travellerOptions = [
  { id: "all", label: "All travellers" },
  { id: "couples", label: "Couples" },
  { id: "solo", label: "Solo" },
  { id: "friends", label: "Friends" },
  { id: "family", label: "Family" },
] as const;

type TravellerFilter = (typeof travellerOptions)[number]["id"];

const ease = [0.22, 1, 0.36, 1] as const;

function ScoreBadge({ review }: { review: Review }) {
  if (review.platform === "tripadvisor") {
    return (
      <div
        className="flex shrink-0 items-center gap-1"
        aria-label={`${review.score} out of ${review.maxScore}`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "h-3 w-3",
              index < review.score
                ? "fill-turmeric text-turmeric"
                : "text-ink/15",
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ocean text-sand"
      aria-label={`${review.score} out of ${review.maxScore}`}
    >
      <span className="font-display text-[1.15rem] leading-none">
        {review.score}
      </span>
    </span>
  );
}

function ReviewCard({
  review,
  expanded,
  onToggleOriginal,
}: {
  review: Review;
  expanded: boolean;
  onToggleOriginal: () => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-ivory p-5 transition-shadow duration-500 hover:shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ocean/[0.07] font-display text-sm text-ocean">
            {initials(review.author)}
            <span
              className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-ivory text-[0.62rem] shadow-sm"
              aria-hidden="true"
            >
              {review.flag}
            </span>
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.84rem] font-semibold text-ink">
              {review.author}
            </p>
            <p className="mt-0.5 truncate text-[0.66rem] text-coastal">
              {review.location} · {review.date}
            </p>
          </div>
        </div>
        <ScoreBadge review={review} />
      </div>

      <h3 className="mt-5 font-display text-[1.35rem] leading-[1.15] text-ink">
        &ldquo;{review.headline}&rdquo;
      </h3>

      <div className="mt-3 flex-1">
        <p className="text-[0.83rem] leading-6 text-coastal">{review.text}</p>

        {review.originalText ? (
          <>
            <button
              type="button"
              onClick={onToggleOriginal}
              aria-expanded={expanded}
              className="mt-3 inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-lagoon transition hover:text-cinnamon"
            >
              <Languages className="h-3.5 w-3.5" />
              {expanded
                ? "Hide original"
                : `Read in ${review.originalLanguageName ?? "original language"}`}
            </button>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 rounded-xl border border-lagoon/15 bg-lagoon/[0.045] px-3.5 py-3 text-[0.78rem] italic leading-6 text-coastal">
                    {review.originalText}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </>
        ) : null}

        {review.tip ? (
          <div className="mt-4 border-l-2 border-turmeric/60 pl-3">
            <p className="flex items-center gap-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-coastal/55">
              <ThumbsUp className="h-3 w-3" />
              Guest tip
            </p>
            <p className="mt-1 text-[0.76rem] leading-5 text-coastal">
              {review.tip}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-ink/10 pt-4 text-[0.62rem] text-coastal/70">
        {review.stay ? <span>{review.stay}</span> : null}
        {review.roomType ? (
          <>
            <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
            <span>{review.roomType}</span>
          </>
        ) : null}
        {review.contributions ? (
          <>
            <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
            <span>
              {new Intl.NumberFormat("en-GB").format(review.contributions)}{" "}
              contributions
            </span>
          </>
        ) : null}
        {review.featured ? (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-turmeric/15 px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-cinnamon-deep">
            <BadgeCheck className="h-3 w-3" />
            Featured
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function ReviewsHub() {
  const [platform, setPlatform] = useState<ReviewPlatform>("booking");
  const [traveller, setTraveller] = useState<TravellerFilter>("all");
  const [visible, setVisible] = useState(6);
  const [expandedOriginals, setExpandedOriginals] = useState<
    Record<string, boolean>
  >({});

  const summary = ratingSummaries[platform];

  const platformReviews = useMemo(
    () => reviews.filter((review) => review.platform === platform),
    [platform],
  );

  const filteredReviews = useMemo(
    () =>
      traveller === "all"
        ? platformReviews
        : platformReviews.filter(
            (review) => review.travelerType === traveller,
          ),
    [platformReviews, traveller],
  );

  const shownReviews = filteredReviews.slice(0, visible);

  const changePlatform = (nextPlatform: ReviewPlatform) => {
    setPlatform(nextPlatform);
    setTraveller("all");
    setVisible(6);
    setExpandedOriginals({});
  };

  const selectTraveller = (nextTraveller: TravellerFilter) => {
    setTraveller(nextTraveller);
    setVisible(6);
  };

  const toggleOriginal = (id: string) => {
    setExpandedOriginals((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const countNoun = platform === "booking" ? "stays" : "reviews";

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-shell py-24 sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -left-32 bottom-24 h-96 w-96 rounded-full bg-lagoon/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <SectionHeading
              eyebrow="What guests write home about"
              title={
                <>
                  Ten out of ten.{" "}
                  <em className="font-normal italic text-cinnamon">
                    Every single stay.
                  </em>
                </>
              }
              description="Two platforms, one verdict. Whether guests came for a single night before the airport or stayed for a week of dolphin mornings, they write about the same things: the welcome, the food, and the quiet."
            />
          </Reveal>

          <Reveal className="lg:col-span-4 lg:justify-self-end" delay={0.1}>
            <div
              className="inline-flex rounded-full border border-ink/10 bg-ivory p-1.5 shadow-card"
              role="tablist"
              aria-label="Review platform"
            >
              {platformTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={platform === tab.id}
                  onClick={() => changePlatform(tab.id)}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-left transition-all duration-300",
                    platform === tab.id
                      ? "bg-ocean text-sand shadow-card"
                      : "text-coastal hover:text-ink",
                  )}
                >
                  <span className="block text-[0.72rem] font-semibold">
                    {tab.label}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[0.55rem] uppercase tracking-[0.1em]",
                      platform === tab.id ? "text-sand/55" : "text-coastal/55",
                    )}
                  >
                    {tab.sublabel}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-ivory shadow-card">
            <div className="grid lg:grid-cols-12">
              <div className="relative overflow-hidden bg-ocean p-7 text-sand sm:p-9 lg:col-span-5">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-sand/10"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border border-sand/10"
                  aria-hidden="true"
                />

                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-turmeric">
                      {summary.brand}
                    </p>
                    <p className="mt-1 text-[0.72rem] text-sand/55">
                      {summary.countLabel}
                    </p>
                  </div>
                  <span className="rounded-full border border-sand/20 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-sand/70">
                    {platform === "booking" ? "Guest score" : "Traveller score"}
                  </span>
                </div>

                <div className="relative mt-7 flex items-end gap-3">
                  <p className="font-display text-[5rem] leading-[0.85] tracking-[-0.04em] text-sand sm:text-[5.8rem]">
                    {summary.score.toFixed(1)}
                  </p>
                  <div className="pb-2">
                    <p className="font-display text-2xl leading-none text-sand/45">
                      / {summary.maxScore.toFixed(1)}
                    </p>
                    <div className="mt-2 flex gap-1" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="h-3.5 w-3.5 fill-turmeric text-turmeric"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="relative mt-5 font-display text-2xl italic text-turmeric">
                  {summary.label}
                </p>

                <div className="relative mt-6 inline-flex items-start gap-2 rounded-xl border border-sand/15 bg-white/[0.05] px-3.5 py-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  <p className="text-[0.72rem] leading-5 text-sand/75">
                    {summary.highlight}
                  </p>
                </div>

                <p className="relative mt-6 text-[0.6rem] uppercase leading-5 tracking-[0.12em] text-sand/35">
                  Scores shown as published on {summary.brand}
                </p>
              </div>

              <div className="p-7 sm:p-9 lg:col-span-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow text-cinnamon">What guests scored</p>
                  <span className="text-[0.62rem] text-coastal/60">
                    {summary.brand} · {summary.count} {countNoun}
                  </span>
                </div>

                <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {summary.categories.map((category) => (
                    <div key={category.label}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[0.74rem] font-medium text-ink">
                          {category.label}
                        </p>
                        <p className="text-[0.7rem] font-semibold text-ocean">
                          {category.score.toFixed(1)}
                          <span className="text-coastal/45">
                            /{category.maxScore}
                          </span>
                        </p>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(category.score / category.maxScore) * 100}%`,
                          }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.9, ease }}
                          className="h-full rounded-full bg-gradient-to-r from-lagoon to-ocean"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {summary.keywords ? (
                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/60">
                      Guests keep mentioning
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {summary.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-ink/10 bg-sand px-2.5 py-1 text-[0.62rem] text-coastal"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-palm/15 bg-palm/[0.05] px-4 py-3.5">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-palm" />
                    <p className="text-[0.72rem] leading-5 text-coastal">
                      Every stay is booked directly or through Booking.com—and
                      every score above is from a verified stay.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {travellerOptions.map((option) => {
                const disabled =
                  option.id !== "all" &&
                  !platformReviews.some(
                    (review) => review.travelerType === option.id,
                  );
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectTraveller(option.id)}
                    aria-pressed={traveller === option.id}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-2 text-[0.66rem] font-semibold transition-all duration-300",
                      traveller === option.id
                        ? "border-cinnamon bg-cinnamon text-sand"
                        : "border-ink/15 text-coastal hover:border-ink/30 hover:text-ink",
                      disabled && "opacity-40",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p className="shrink-0 text-[0.65rem] uppercase tracking-[0.13em] text-coastal/60">
              {filteredReviews.length} {countNoun} in this view
            </p>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shownReviews.map((review, index) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.03, 0.18),
                  ease,
                }}
              >
                <ReviewCard
                  review={review}
                  expanded={Boolean(expandedOriginals[review.id])}
                  onToggleOriginal={() => toggleOriginal(review.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredReviews.length === 0 ? (
          <Reveal className="mt-5">
            <div className="rounded-2xl border border-dashed border-ink/15 bg-ivory/60 px-6 py-12 text-center">
              <Quote className="mx-auto h-6 w-6 text-cinnamon/50" />
              <p className="mt-3 font-display text-xl text-ink">
                No reviews from this traveller type yet.
              </p>
              <p className="mt-1.5 text-[0.78rem] text-coastal">
                Try another filter, or read every review on this platform.
              </p>
              <button
                type="button"
                onClick={() => selectTraveller("all")}
                className="mt-4 text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-cinnamon hover:text-cinnamon-deep"
              >
                Show all travellers
              </button>
            </div>
          </Reveal>
        ) : null}

        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-[0.66rem] uppercase tracking-[0.13em] text-coastal/55">
            Showing {shownReviews.length} of {filteredReviews.length} selected{" "}
            {countNoun}
          </p>
          {visible < filteredReviews.length ? (
            <button
              type="button"
              onClick={() => setVisible((count) => count + 6)}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[0.7rem] font-semibold text-ink transition hover:border-ink/35 hover:bg-ink/[0.03]"
            >
              Read more reviews
              <span className="text-coastal/50">
                +{Math.min(6, filteredReviews.length - visible)}
              </span>
            </button>
          ) : null}
        </div>

        <Reveal className="mt-8">
          <p className="mx-auto max-w-3xl text-center text-[0.68rem] leading-5 text-coastal/65">
            Reviews appear as guests wrote them, with English translations where
            the original was in another language. This page shows a selection of{" "}
            {platformReviews.length} from {summary.count} total {countNoun} on{" "}
            {summary.brand}. All scores and review counts are as published on the
            platform.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-ivory px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-[1.4rem] leading-tight text-ink">
                The best rate is the one Maduka sends you.
              </p>
              <p className="mt-1.5 text-[0.78rem] leading-6 text-coastal">
                Ask about the two rooms, or pre-order the crab curry before you
                arrive.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="/book?mode=stay#booking"
                className="inline-flex items-center gap-2 rounded-full bg-cinnamon px-4 py-2.5 text-[0.68rem] font-semibold text-sand transition hover:bg-cinnamon-deep"
              >
                Ask about a stay
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/book?mode=table#booking"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-[0.68rem] font-semibold text-ink transition hover:border-ink/35"
              >
                Pre-order a table
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
