"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Fan,
  House,
  PawPrint,
  TreePalm,
  Trees,
  Users,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { property } from "@/data/property";
import { roomAmenityStrip, rooms } from "@/data/rooms";
import { getRoomWhatsAppUrl } from "@/services/api";
import type { AmenityIcon, Room } from "@/types";
import { cn, formatLkr } from "@/lib/utils";

const amenityIcons: Record<AmenityIcon, LucideIcon> = {
  beach: TreePalm,
  terrace: House,
  wifi: Wifi,
  pet: PawPrint,
  parking: Car,
  bath: Bath,
  fan: Fan,
  garden: Trees,
  view: Eye,
  users: Users,
  bed: BedDouble,
};

const ease = [0.22, 1, 0.36, 1] as const;

function RoomGallery({ room }: { room: Room }) {
  const [index, setIndex] = useState(0);
  const total = room.images.length;
  const image = room.images[index];

  const goTo = (nextIndex: number) =>
    setIndex(((nextIndex % total) + total) % total);

  return (
    <div className="flex h-full flex-col bg-shell">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11] lg:aspect-auto lg:min-h-[30rem] lg:flex-1">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-ink/15"
          aria-hidden="true"
        />

        <span className="absolute left-4 top-4 rounded-full bg-ink/30 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sand backdrop-blur-md sm:left-5 sm:top-5">
          {providerLabel(room)}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-sand/90 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-ink backdrop-blur-md sm:right-5 sm:top-5">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5">
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-sand/65">
              {room.subtitle}
            </p>
            <p className="mt-1 font-hand text-[1.7rem] leading-none text-sand">
              {image.caption}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={`Previous photo of ${room.name}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-sand/30 bg-ink/25 text-sand backdrop-blur-md transition hover:bg-ink/45"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={`Next photo of ${room.name}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-sand/30 bg-ink/25 text-sand backdrop-blur-md transition hover:bg-ink/45"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1.5 border-t border-ink/10 bg-ivory p-2 sm:gap-2 sm:p-3">
        {room.images.map((thumb, thumbIndex) => (
          <button
            key={thumb.src}
            type="button"
            onClick={() => setIndex(thumbIndex)}
            aria-label={`Show photo ${thumbIndex + 1}: ${thumb.caption}`}
            aria-current={thumbIndex === index ? "true" : undefined}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-300",
              thumbIndex === index
                ? "ring-2 ring-cinnamon ring-offset-2 ring-offset-ivory"
                : "opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={thumb.src}
              alt=""
              fill
              sizes="(max-width: 640px) 18vw, 120px"
              placeholder="blur"
              blurDataURL={thumb.blurDataURL}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function providerLabel(room: Room) {
  return room.id === "sea-view" ? "Room 01 · On the sand" : "Room 02 · In the garden";
}

export function RoomsSection() {
  return (
    <section id="stay" className="relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute -left-40 top-40 h-[28rem] w-[28rem] rounded-full bg-lagoon/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <SectionHeading
              eyebrow="Stay a while"
              title={
                <>
                  Two rooms. One beach.{" "}
                  <em className="font-normal italic text-cinnamon">
                    Nothing else.
                  </em>
                </>
              }
              description="There is no lobby, no pool bar and no queue for sunbeds. Just two timber rooms on family land, a private strip of sand, and the sound of the Indian Ocean on three sides of your sleep."
            />
          </Reveal>

          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="rounded-2xl border border-cinnamon/20 bg-cinnamon/[0.06] p-5">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cinnamon-deep">
                Booked directly with the family
              </p>
              <p className="mt-3 text-[0.84rem] leading-6 text-coastal">
                No platform fees, no call centre. Maduka answers every message
                himself, and the rate you are quoted is the rate you pay.
              </p>
              <p className="mt-3 font-hand text-[1.35rem] leading-tight text-cinnamon">
                Only two keys on the ring.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 border-y border-ink/10 py-4">
            {roomAmenityStrip.map((amenity) => {
              const Icon = amenityIcons[amenity.icon as AmenityIcon];
              return (
                <li
                  key={amenity.label}
                  className="flex items-center gap-2 text-[0.72rem] font-medium text-coastal"
                >
                  <Icon className="h-4 w-4 text-cinnamon" strokeWidth={1.7} />
                  {amenity.label}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-10 space-y-8 lg:space-y-10">
          {rooms.map((room, roomIndex) => (
            <Reveal key={room.id} delay={roomIndex * 0.04}>
              <article className="grid overflow-hidden rounded-[2rem] border border-ink/10 bg-ivory shadow-soft lg:grid-cols-12">
                <div
                  className={cn(
                    "lg:col-span-7",
                    roomIndex % 2 === 1 && "lg:order-2",
                  )}
                >
                  <RoomGallery room={room} />
                </div>

                <div
                  className={cn(
                    "flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-9 xl:p-11",
                    roomIndex % 2 === 1 && "lg:order-1",
                  )}
                >
                  <p className="eyebrow text-cinnamon">
                    {providerLabel(room)} · Sleeps {room.sleeps}
                  </p>
                  <h3 className="mt-3 text-[2rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                    {room.name}
                  </h3>
                  <p className="mt-2 font-hand text-[1.45rem] leading-tight text-lagoon">
                    {room.subtitle}
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-coastal">
                    {room.longDescription}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-ink/10 py-5">
                    <div>
                      <dt className="flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/65">
                        <BedDouble className="h-3.5 w-3.5" />
                        Bed
                      </dt>
                      <dd className="mt-1 text-[0.82rem] font-medium text-ink">
                        {room.bed}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/65">
                        <Users className="h-3.5 w-3.5" />
                        Sleeps
                      </dt>
                      <dd className="mt-1 text-[0.82rem] font-medium text-ink">
                        {room.sleeps} guests
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/65">
                        <Eye className="h-3.5 w-3.5" />
                        Outlook
                      </dt>
                      <dd className="mt-1 text-[0.82rem] font-medium text-ink">
                        {room.view}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/65">
                        <Bath className="h-3.5 w-3.5" />
                        Bathroom
                      </dt>
                      <dd className="mt-1 text-[0.82rem] font-medium text-ink">
                        {room.bathroom}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5">
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity.icon];
                      return (
                        <li
                          key={amenity.label}
                          className="flex items-start gap-2 text-[0.74rem] leading-5 text-coastal"
                        >
                          <Icon
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ocean/70"
                            strokeWidth={1.7}
                          />
                          {amenity.label}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                    {room.priceFrom !== null ? (
                      <div>
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/65">
                          Sample rate from
                        </p>
                        <p className="mt-1 flex items-baseline gap-1.5">
                          <span className="font-display text-[1.9rem] leading-none text-ocean">
                            {formatLkr(room.priceFrom)}
                          </span>
                          <span className="text-xs text-coastal">/ night</span>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-coastal/65">
                          Rate
                        </p>
                        <p className="mt-1 font-display text-[1.9rem] leading-none text-ocean">
                          On request
                        </p>
                      </div>
                    )}
                    <span className="rounded-full bg-ink/[0.04] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-coastal">
                      {property.payment.rooms}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.68rem] leading-5 text-coastal/70">
                    {room.priceNote}
                  </p>

                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                    <ButtonLink
                      href={`/book?mode=stay&room=${room.id}#booking`}
                      size="md"
                      className="group flex-1"
                    >
                      Check dates &amp; rate
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </ButtonLink>
                    <ButtonLink
                      href={getRoomWhatsAppUrl(room)}
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="outline"
                      size="md"
                      className="flex-1"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Ask Maduka
                    </ButtonLink>
                  </div>

                  <details className="group mt-5 rounded-xl border border-ink/10 bg-sand/60 px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-coastal">
                      Good to know
                      <ChevronDown className="h-4 w-4 shrink-0 text-coastal/60 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <ul className="mt-3 space-y-2 border-t border-ink/10 pt-3">
                      {room.notes.map((note) => (
                        <li
                          key={note}
                          className="flex gap-2 text-[0.72rem] leading-5 text-coastal"
                        >
                          <span
                            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-cinnamon"
                            aria-hidden="true"
                          />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
