import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { BookingWidget } from "@/components/BookingWidget";
import { images } from "@/data/images";
import { menuItems } from "@/data/menu";
import { property } from "@/data/property";
import { rooms } from "@/data/rooms";
import { siteName } from "@/lib/site";
import type { InquiryType, RoomId } from "@/types";

const bookDescription =
  "Check room dates, pre-order a table or plan a sunrise dolphin boat directly with Maduka and Nissansala in Ilandaiyadi, Kalpitiya.";

export const metadata: Metadata = {
  title: "Book direct",
  description: bookDescription,
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "/book",
    siteName,
    title: `Book direct | ${siteName}`,
    description: bookDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beachfront dining and rooms at Maduka Restaurant & Rooms, Kalpitiya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Book direct | ${siteName}`,
    description: bookDescription,
    images: ["/og-image.jpg"],
  },
};

type BookSearchParams = Promise<{
  mode?: string | string[];
  room?: string | string[];
  dish?: string | string[];
}>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeMode(value: string | undefined): InquiryType {
  if (value === "table" || value === "dolphin") return value;
  return "stay";
}

function normalizeRoomId(value: string | undefined): RoomId | undefined {
  return rooms.find((room) => room.id === value)?.id;
}

function normalizeDish(value: string | undefined): string | undefined {
  return menuItems.find((item) => item.name === value)?.name;
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: BookSearchParams;
}) {
  const params = await searchParams;
  const initialMode = normalizeMode(firstValue(params.mode));
  const initialRoomId = normalizeRoomId(firstValue(params.room));
  const initialDish = normalizeDish(firstValue(params.dish));

  return (
    <>
      <section className="relative overflow-hidden bg-ocean-deep pb-36 pt-28 text-sand sm:pb-44 sm:pt-32">
        <Image
          src={images.beachDiningSunset.src}
          alt={images.beachDiningSunset.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={images.beachDiningSunset.blurDataURL}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ocean-deep"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ocean-deep/80 via-ocean-deep/35 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-turmeric/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-sand/60 transition hover:text-sand"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the beach
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="eyebrow flex items-center gap-3 text-turmeric">
                <span
                  className="h-px w-8 bg-current opacity-70"
                  aria-hidden="true"
                />
                Book direct with the family
              </p>
              <h1 className="mt-5 max-w-3xl text-[2.8rem] leading-[0.98] tracking-[-0.035em] text-shadow-soft sm:text-[3.8rem] lg:text-[4.5rem]">
                Your room, your table,{" "}
                <em className="font-normal italic text-turmeric">
                  your sunrise boat.
                </em>
              </h1>
              <p className="mt-5 max-w-xl text-[0.94rem] leading-7 text-sand/75 sm:text-base sm:leading-8">
                Tell us what you need. Maduka or Nissansala will reply
                personally on WhatsApp with a live rate, a table by the sand, or
                a calm morning on the water.
              </p>
            </div>

            <aside className="rounded-2xl border border-sand/15 bg-ink/25 p-5 backdrop-blur-md sm:p-6">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-turmeric">
                One family, one beach
              </p>
              <ul className="mt-4 space-y-3 text-[0.78rem] leading-5 text-sand/80">
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  No booking-platform fees
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  No payment now—your request opens in WhatsApp
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric" />
                  Rooms, tables and dolphin boats in one place
                </li>
              </ul>
              <a
                href={property.phoneHref}
                className="mt-5 inline-flex items-center gap-2 border-t border-sand/15 pt-4 text-[0.78rem] font-semibold text-sand transition hover:text-turmeric"
              >
                <Phone className="h-4 w-4 text-turmeric" />
                {property.phoneDisplay}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-20 sm:-mt-24">
        <BookingWidget
          key={`${initialMode}-${initialRoomId ?? "any"}-${initialDish ?? "none"}`}
          initialMode={initialMode}
          initialRoomId={initialRoomId}
          initialDish={initialDish}
        />
      </div>

      <section className="bg-sand pb-20 pt-14 sm:pb-24 sm:pt-16">
        <div className="container-page">
          <div className="grid gap-7 rounded-2xl border border-ink/10 bg-ivory/75 p-6 sm:grid-cols-3 sm:p-8">
            <div>
              <p className="eyebrow text-cinnamon">Arrival</p>
              <p className="mt-2 text-sm leading-6 text-coastal">
                Check-in {property.checkIn}. Check-out {property.checkOut}.
              </p>
            </div>
            <div>
              <p className="eyebrow text-cinnamon">Payment</p>
              <p className="mt-2 text-sm leading-6 text-coastal">
                {property.payment.rooms}. {property.payment.restaurant}.
              </p>
            </div>
            <div>
              <p className="eyebrow text-cinnamon">A real person</p>
              <p className="mt-2 text-sm leading-6 text-coastal">
                Every message is read by the family. No call centre, no scripts,
                no pressure.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-coastal">
            <Link href="/#stay" className="transition hover:text-ocean">
              See the two rooms
            </Link>
            <span
              className="h-1 w-1 rounded-full bg-coastal/30"
              aria-hidden="true"
            />
            <Link href="/#menu" className="transition hover:text-ocean">
              Read the kitchen menu
            </Link>
            <span
              className="h-1 w-1 rounded-full bg-coastal/30"
              aria-hidden="true"
            />
            <Link href="/#location" className="transition hover:text-ocean">
              Find the beach
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
