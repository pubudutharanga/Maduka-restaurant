import {
  ArrowUpRight,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { property, contactLinks } from "@/data/property";
import { rooms } from "@/data/rooms";
import { getGeneralWhatsAppUrl } from "@/services/api";
import { formatLkr } from "@/lib/utils";

const exploreLinks = [
  { href: "/book", label: "Book direct" },
  { href: "/#stay", label: "The rooms" },
  { href: "/#menu", label: "The kitchen" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/#gallery", label: "Photo album" },
  { href: "/#reviews", label: "Guest reviews" },
  { href: "/#location", label: "Find us" },
];

export function Footer() {
  const seaView = rooms.find((room) => room.priceFrom !== null);

  return (
    <footer className="relative overflow-hidden bg-ocean-deep text-sand">
      <div
        className="pointer-events-none absolute inset-0 wash-ocean opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-0 select-none font-display text-[22vw] leading-none tracking-[-0.06em] text-sand/[0.035]"
        aria-hidden="true"
      >
        Maduka
      </div>

      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.7fr_0.9fr_1.05fr]">
          <div>
            <BrandMark tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-sand/65">
              A family-run restaurant and two-room hideaway on the sands of
              Ilandaiyadi, between Puttalam and Kalpitiya. Come for the catch,
              stay for the sunset.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/#reviews"
                className="inline-flex items-center gap-2 rounded-full border border-sand/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-sand/85 transition hover:border-sand/30 hover:bg-white/[0.08]"
              >
                <Star className="h-3.5 w-3.5 fill-turmeric text-turmeric" />
                Booking.com 10/10
              </Link>
              <Link
                href="/#reviews"
                className="inline-flex items-center gap-2 rounded-full border border-sand/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-sand/85 transition hover:border-sand/30 hover:bg-white/[0.08]"
              >
                <Star className="h-3.5 w-3.5 fill-turmeric text-turmeric" />
                Tripadvisor 5.0
              </Link>
            </div>
            <p className="mt-7 font-hand text-2xl text-turmeric">
              From our family table to yours.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-sand/45">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-sand/70 transition hover:text-sand"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-sand/45">
              The useful bits
            </h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-sand/40">
                  Check-in
                </dt>
                <dd className="mt-1 text-sand/75">{property.checkIn}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-sand/40">
                  Check-out
                </dt>
                <dd className="mt-1 text-sand/75">{property.checkOut}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-sand/40">
                  Payment
                </dt>
                <dd className="mt-1 text-sand/75">
                  {property.payment.rooms} · cards at the restaurant
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-sand/40">
                  Languages
                </dt>
                <dd className="mt-1 text-sand/75">
                  {property.languages.join(", ")}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-sand/45">
              Find us
            </h3>
            <address className="mt-5 space-y-2 text-sm not-italic leading-6 text-sand/70">
              <p className="flex gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-turmeric" />
                <span>
                  Off Kalpitiya Road
                  <br />
                  24235 Ilandaiyadi, Kalpitiya
                  <br />
                  Sri Lanka
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-turmeric" />
                <a
                  href={property.phoneHref}
                  className="transition hover:text-sand"
                >
                  {property.phoneDisplay}
                </a>
              </p>
            </address>
            <div className="mt-5 flex flex-col gap-2.5">
              <ButtonLink
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noreferrer noopener"
                variant="whatsapp"
                size="sm"
                className="justify-start"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Message Maduka
              </ButtonLink>
              <a
                href={contactLinks.maps}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-xs font-medium text-sand/55 transition hover:text-sand"
              >
                <MapPin className="h-3.5 w-3.5" />
                Open in Google Maps
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-sand/15 pt-6 text-xs text-sand/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {property.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {seaView?.priceFrom ? (
              <span>Rooms from {formatLkr(seaView.priceFrom)} / night</span>
            ) : null}
            <span className="hidden h-1 w-1 rounded-full bg-sand/30 sm:block" />
            <span>Made with care on the Kalpitiya coast.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
