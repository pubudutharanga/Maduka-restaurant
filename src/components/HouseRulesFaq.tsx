"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Baby,
  Banknote,
  Binoculars,
  CalendarX2,
  Car,
  CigaretteOff,
  Clock,
  CookingPot,
  CreditCard,
  Droplets,
  Fish,
  MapPin,
  Minus,
  PawPrint,
  Phone,
  Plus,
  Scooter,
  Ship,
  WavesHorizontal,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { property, contactLinks } from "@/data/property";
import { getGeneralWhatsAppUrl } from "@/services/api";
import type { ExperienceIcon, RuleIcon } from "@/types";
import { cn } from "@/lib/utils";

const ruleIcons: Record<RuleIcon, LucideIcon> = {
  cash: Banknote,
  card: CreditCard,
  children: Baby,
  pets: PawPrint,
  smoking: CigaretteOff,
  cancel: CalendarX2,
  parking: Car,
  clock: Clock,
};

const nearbyIcons: Record<ExperienceIcon, LucideIcon> = {
  dolphin: WavesHorizontal,
  cooking: CookingPot,
  boat: Ship,
  scooter: Scooter,
  lagoon: Droplets,
  kite: Wind,
  reef: Fish,
  safari: Binoculars,
};

const locationFacts = [
  { value: "500 m", label: "Ilandaiyadi town centre" },
  { value: "68 mi", label: "Bandaranaike International Airport" },
  { value: "6 km", label: "Lake Pal Kulam" },
  { value: "18 km", label: "Siebels Sea Foods" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HouseRulesFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="location"
      className="wash-sand relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-32"
    >
      <div className="container-page relative">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <SectionHeading
              eyebrow="Finding the quiet"
              title={
                <>
                  Off the Kalpitiya road,{" "}
                  <em className="font-normal italic text-cinnamon">
                    straight onto the sand.
                  </em>
                </>
              }
              description="Maduka Restaurant & Rooms sits on a private stretch of beach in Ilandaiyadi, a fishing village on the Kalpitiya peninsula. There is no signposting circus and no traffic—just the road, the sand, and the family waiting for you."
            />
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="rounded-2xl border border-ink/10 bg-ivory p-5">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cinnamon">
                Before you set off
              </p>
              <p className="mt-3 text-[0.8rem] leading-6 text-coastal">
                Message Maduka when you are close and he will guide you the last
                few minutes, or arrange a tuk-tuk from town.
              </p>
              <a
                href={getGeneralWhatsAppUrl(
                  "Hello Maduka! We are on our way to Maduka Restaurant & Rooms. Could you share the best route for the last few minutes?",
                )}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-ocean transition hover:text-cinnamon"
              >
                Message the family
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-[1.8rem] border border-ink/10 bg-ivory shadow-soft">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <iframe
                  src={property.address.mapEmbedUrl}
                  title="Map showing Maduka Restaurant & Rooms in Ilandaiyadi, Kalpitiya"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full grayscale-[0.15]"
                />
              </div>
              <div className="flex flex-col gap-4 border-t border-ink/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <address className="flex gap-3 text-sm not-italic leading-6 text-coastal">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-cinnamon" />
                  <span>
                    <span className="block font-semibold text-ink">
                      {property.name}
                    </span>
                    {property.address.line1}
                    <br />
                    {property.address.postalCode} {property.address.village},{" "}
                    {property.address.region}
                    <br />
                    {property.address.country}
                  </span>
                </address>
                <ButtonLink
                  href={contactLinks.maps}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Google Maps
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.08}>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-[1.5rem] border border-ocean/15 bg-ocean p-6 text-sand">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-turmeric">
                  The address
                </p>
                <p className="mt-3 font-display text-[1.55rem] leading-snug">
                  {property.address.line1}
                  <br />
                  {property.address.postalCode} {property.address.village}
                  <br />
                  {property.address.region}, {property.address.country}
                </p>
                <div className="mt-5 flex flex-col gap-2.5 border-t border-sand/15 pt-5 text-[0.8rem]">
                  <a
                    href={property.phoneHref}
                    className="inline-flex items-center gap-2.5 text-sand/75 transition hover:text-sand"
                  >
                    <Phone className="h-4 w-4 text-turmeric" />
                    {property.phoneDisplay}
                  </a>
                  <a
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2.5 text-sand/75 transition hover:text-sand"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-turmeric" />
                    WhatsApp Maduka
                  </a>
                  <p className="flex items-center gap-2.5 text-sand/50">
                    <Clock className="h-4 w-4 text-turmeric" />
                    English spoken
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {locationFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-ink/10 bg-ivory px-4 py-3.5"
                  >
                    <p className="font-display text-[1.35rem] leading-none text-ocean">
                      {fact.value}
                    </p>
                    <p className="mt-1.5 text-[0.62rem] leading-4 text-coastal">
                      {fact.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {property.nearby.map((place) => {
              const Icon = nearbyIcons[place.icon];
              return (
                <div
                  key={place.name}
                  className="flex gap-3 rounded-xl border border-ink/10 bg-ivory px-4 py-4"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ocean/[0.06] text-ocean">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[0.78rem] font-semibold leading-5 text-ink">
                      {place.name}
                    </p>
                    <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.1em] text-cinnamon">
                      {place.distance ?? place.category}
                    </p>
                    <p className="mt-1.5 text-[0.66rem] leading-5 text-coastal/80">
                      {place.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-9 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-cinnamon">Checking in</p>
            <h3 className="mt-4 text-[2rem] leading-[1.05] tracking-[-0.02em] text-ink">
              Arrive slowly. Leave reluctantly.
            </h3>
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-ink/10 bg-ivory p-5">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/60">
                  Check-in
                </p>
                <p className="mt-1.5 font-display text-[1.45rem] leading-tight text-ink">
                  {property.checkIn}
                </p>
              </div>
              <div className="rounded-xl border border-ink/10 bg-ivory p-5">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/60">
                  Check-out
                </p>
                <p className="mt-1.5 font-display text-[1.45rem] leading-tight text-ink">
                  {property.checkOut}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[0.72rem] leading-6 text-coastal">
              Arriving late? Send a message with your estimated time and the
              family will keep the light on.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.08}>
            <p className="eyebrow text-cinnamon">House rules &amp; good sense</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {property.houseRules.map((rule) => {
                const Icon = ruleIcons[rule.icon];
                return (
                  <div
                    key={rule.label}
                    className="flex gap-3 rounded-xl border border-ink/10 bg-ivory p-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-shell text-cinnamon">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-coastal/60">
                        {rule.label}
                      </p>
                      <p className="mt-1 text-[0.76rem] leading-5 text-ink/80">
                        {rule.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-9 border-t border-ink/10 pt-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-cinnamon">Questions, answered</p>
            <h3 className="mt-4 text-[2rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
              The things guests ask before booking.
            </h3>
            <p className="mt-4 text-[0.84rem] leading-7 text-coastal">
              If your question is not here, message the family directly. Maduka
              answers personally, usually between the kitchen and the beach.
            </p>
            <ButtonLink
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noreferrer noopener"
              variant="whatsapp"
              size="md"
              className="mt-5"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ask Maduka
            </ButtonLink>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.08}>
            <div className="border-y border-ink/10">
              {property.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className={cn(
                      "border-b border-ink/10 last:border-b-0",
                      isOpen && "bg-ivory/60",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      className="flex w-full items-center justify-between gap-5 px-1 py-5 text-left sm:px-3"
                    >
                      <span className="font-display text-[1.08rem] leading-snug text-ink sm:text-[1.18rem]">
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                          isOpen
                            ? "border-cinnamon bg-cinnamon text-sand"
                            : "border-ink/15 text-coastal",
                        )}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`faq-panel-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <p className="px-1 pb-5 pr-10 text-[0.82rem] leading-7 text-coastal sm:px-3">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
