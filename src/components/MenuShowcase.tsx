"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Coffee,
  Fish,
  Flame,
  Flower2,
  Leaf,
  MessageCircle,
  Sparkles,
  TreePalm,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { KitchenJournal } from "@/components/KitchenJournal";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { kitchenWhatsAppMessage } from "@/data/kitchen";
import { menuCategories, menuHighlights, menuItems } from "@/data/menu";
import { buildWhatsAppUrl } from "@/services/api";
import type { MenuCategoryId, MenuTag } from "@/types";
import { cn } from "@/lib/utils";

type Filter = MenuCategoryId | "all";

const INITIAL_VISIBLE_ITEMS = 6;
const LOAD_MORE_ITEMS = 6;

const categoryIcons = {
  catch: Fish,
  curry: Flame,
  plant: Leaf,
  breakfast: Coffee,
  drinks: Sparkles,
} as const;

const tagStyles: Record<MenuTag, string> = {
  Signature: "border-cinnamon/20 bg-cinnamon/10 text-cinnamon-deep",
  Vegan: "border-palm/20 bg-palm/10 text-palm",
  Vegetarian: "border-palm/20 bg-palm/10 text-palm",
  "Catch of the day": "border-lagoon/20 bg-lagoon/10 text-lagoon",
  "Made to order": "border-turmeric/30 bg-turmeric/15 text-ink/65",
  "House made": "border-ink/10 bg-ink/[0.04] text-coastal",
  Cooling: "border-lagoon/20 bg-lagoon/10 text-lagoon",
  Sunset: "border-cinnamon/20 bg-cinnamon/10 text-cinnamon-deep",
};

// Tags sit directly over photography, so they need a darker glass base and
// light type to stay readable on both bright plates and dim dinner tables.
const imageTagStyles: Record<MenuTag, string> = {
  Signature: "border-cinnamon/55 bg-ink/60 text-sand",
  Vegan: "border-palm/60 bg-ink/60 text-sand",
  Vegetarian: "border-palm/60 bg-ink/60 text-sand",
  "Catch of the day": "border-lagoon/60 bg-ink/60 text-sand",
  "Made to order": "border-turmeric/60 bg-ink/60 text-sand",
  "House made": "border-sand/30 bg-ink/60 text-sand",
  Cooling: "border-lagoon/60 bg-ink/60 text-sand",
  Sunset: "border-cinnamon/55 bg-ink/60 text-sand",
};

const highlightIcons = {
  leaf: Leaf,
  flower: Flower2,
  hammock: TreePalm,
} as const;

const kitchenWhatsAppUrl = buildWhatsAppUrl(kitchenWhatsAppMessage);

export function MenuShowcase() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);

  const filteredItems = useMemo(
    () =>
      filter === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === filter),
    [filter],
  );
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleItems.length < filteredItems.length;

  const handleFilterChange = (nextFilter: Filter) => {
    setFilter(nextFilter);
    setVisibleCount(INITIAL_VISIBLE_ITEMS);
  };

  const handleLoadMore = () => {
    setVisibleCount((current) => current + LOAD_MORE_ITEMS);
  };

  const counts = useMemo(() => {
    return menuCategories.reduce<Record<string, number>>(
      (accumulator, category) => {
        accumulator[category.id] = menuItems.filter(
          (item) => item.category === category.id,
        ).length;
        return accumulator;
      },
      { all: menuItems.length },
    );
  }, []);

  return (
    <section id="menu" className="relative overflow-hidden bg-shell py-24 sm:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-turmeric/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <SectionHeading
              eyebrow="Nissansala's kitchen"
              title={
                <>
                  The curry is the reason.{" "}
                  <em className="font-normal italic text-cinnamon">
                    The sea is the setting.
                  </em>
                </>
              }
              description="Breakfast starts with hoppers and egg curry. Lunch is whatever the boats bring in. By two, the clay pots are on the fire for dinner. Nissansala and Maduka cook everything from scratch, so the table follows the garden, the lagoon and the tide."
            />
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="rounded-2xl border border-palm/15 bg-ivory/80 p-5">
              <div className="flex items-center gap-2 text-palm">
                <Leaf className="h-4 w-4" />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
                  Everyone at the table
                </p>
              </div>
              <p className="mt-3 text-[0.82rem] leading-6 text-coastal">
                The full rice-and-curry table can be made vegetarian or vegan.
                Every vegetable curry is cooked fresh with coconut milk, local
                herbs and ground spice—tell Nissansala what you need when you
                pre-order.
              </p>
              <p className="mt-3 border-t border-palm/10 pt-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-coastal">
                Open daily · breakfast to dinner · cards &amp; cash
              </p>
            </div>
          </Reveal>
        </div>

        <KitchenJournal />

        <Reveal className="mt-10">
          <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <button
              type="button"
              onClick={() => handleFilterChange("all")}
              aria-pressed={filter === "all"}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold transition-all duration-300",
                filter === "all"
                  ? "border-ocean bg-ocean text-sand shadow-card"
                  : "border-ink/15 bg-transparent text-coastal hover:border-ink/30 hover:text-ink",
              )}
            >
              Everything{" "}
              <span className="ml-1 opacity-55">{counts.all}</span>
            </button>
            {menuCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleFilterChange(category.id)}
                aria-pressed={filter === category.id}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold transition-all duration-300",
                  filter === category.id
                    ? "border-ocean bg-ocean text-sand shadow-card"
                    : "border-ink/15 bg-transparent text-coastal hover:border-ink/30 hover:text-ink",
                )}
              >
                {category.shortLabel}{" "}
                <span className="ml-1 opacity-55">{counts[category.id]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          id="menu-grid"
          layout
          className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => {
              const Icon = categoryIcons[item.category];
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: 0.38,
                    delay: Math.min(index * 0.025, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-ivory transition-shadow duration-500 hover:shadow-soft"
                >
                  {item.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-shell">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={item.image.blurDataURL}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em] backdrop-blur-md",
                              imageTagStyles[tag],
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ocean/[0.05]">
                      <div
                        className="absolute inset-0 opacity-[0.35]"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(13,76,92,0.25) 1px, transparent 0)",
                          backgroundSize: "18px 18px",
                        }}
                        aria-hidden="true"
                      />
                      <Icon
                        className="relative h-14 w-14 text-ocean/25"
                        strokeWidth={1.1}
                      />
                      <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em]",
                              tagStyles[tag],
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.4rem] leading-[1.15] text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.82rem] leading-6 text-coastal">
                      {item.description}
                    </p>
                    {item.note ? (
                      <p className="mt-3 font-hand text-[1.2rem] leading-tight text-cinnamon/85">
                        {item.note}
                      </p>
                    ) : null}
                    <a
                      href={`/book?mode=table&dish=${encodeURIComponent(item.name)}#booking`}
                      className="mt-4 inline-flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-ocean transition hover:text-cinnamon"
                    >
                      Pre-order this
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length > INITIAL_VISIBLE_ITEMS ? (
          <div className="mt-8 flex flex-col items-center gap-2.5">
            <p
              role="status"
              aria-live="polite"
              className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-coastal/65"
            >
              {hasMore
                ? `Showing ${visibleItems.length} of ${filteredItems.length} dishes`
                : `All ${filteredItems.length} dishes shown`}
            </p>
            {hasMore ? (
              <button
                type="button"
                onClick={handleLoadMore}
                aria-controls="menu-grid"
                className={buttonClasses({
                  variant: "outline",
                  size: "md",
                  className: "min-w-40 bg-ivory/80",
                })}
              >
                Load more
                <ChevronDown className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : null}

        <Reveal className="mt-10">
          <div className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-sand px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="flex items-start gap-2.5 text-[0.8rem] leading-6 text-coastal">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cinnamon" />
              <span>
                <strong className="font-semibold text-ink">
                  Dinner is cooked from scratch from 2:00 PM.
                </strong>{" "}
                Pre-order your curries or crab by WhatsApp or through the
                Booking form.
              </span>
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <a
                href={kitchenWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-whatsapp/25 bg-whatsapp/10 px-4 py-2.5 text-[0.7rem] font-semibold text-[#0b665c] transition hover:bg-whatsapp/15"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href="/book?mode=table#booking"
                className="inline-flex items-center gap-2 rounded-full bg-cinnamon px-5 py-2.5 text-[0.72rem] font-semibold text-sand transition hover:bg-cinnamon-deep"
              >
                Pre-order a table
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-3">
          {menuHighlights.map((highlight, index) => {
            const Icon = highlightIcons[highlight.icon];
            return (
              <Reveal key={highlight.title} delay={index * 0.06}>
                <div className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-ivory text-cinnamon">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight text-ink">
                      {highlight.title}
                    </h3>
                    <p className="mt-1.5 text-[0.8rem] leading-6 text-coastal">
                      {highlight.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
