import { ArrowRight, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/data/images";
import { property } from "@/data/property";

export function FinalCta() {
  const image = images.beachDiningSunset;

  return (
    <section className="relative overflow-hidden bg-ocean-deep text-sand">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(28,37,38,0.45)_100%)]"
        aria-hidden="true"
      />

      <div className="container-page relative flex min-h-[34rem] flex-col items-center justify-center py-24 text-center sm:min-h-[38rem] sm:py-28">
        <p className="eyebrow flex items-center gap-3 text-turmeric">
          <span className="h-px w-8 bg-current opacity-70" aria-hidden="true" />
          The last night of the trip
          <span className="h-px w-8 bg-current opacity-70" aria-hidden="true" />
        </p>

        <h2 className="mt-6 max-w-3xl text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-sand text-shadow-soft sm:text-[3.4rem] lg:text-[4rem]">
          Save the last night{" "}
          <em className="font-normal italic text-turmeric">for the beach.</em>
        </h2>

        <p className="mt-5 max-w-xl text-[0.92rem] leading-7 text-sand/70 sm:text-base">
          One room, one table, one sunrise boat. Tell Maduka when you are
          coming and he will take care of the rest—no booking fees, no scripts,
          just the family.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <ButtonLink href="/book" size="lg" className="group">
            Book direct
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink
            href={property.phoneHref}
            variant="outlineLight"
            size="lg"
          >
            <Phone className="h-4 w-4" />
            {property.phoneDisplay}
          </ButtonLink>
        </div>

        <p className="mt-5 font-hand text-[1.7rem] leading-none text-sand/80">
          You arrive as a guest. You leave as family.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-sand/45">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-turmeric/80" />
            Ilandaiyadi · Kalpitiya
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-sand/25 sm:block" />
          <span>Check-in {property.checkIn}</span>
          <span className="hidden h-1 w-1 rounded-full bg-sand/25 sm:block" />
          <span>{property.payment.rooms}</span>
        </div>
      </div>
    </section>
  );
}
