import {
  ArrowUpRight,
  CreditCard,
  Flame,
  Leaf,
  MessageCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { kitchenMoments, kitchenNotes, kitchenWhatsAppMessage } from "@/data/kitchen";
import { property } from "@/data/property";
import { buildWhatsAppUrl } from "@/services/api";
import type { KitchenNoteIcon } from "@/types";

const noteIcons = {
  flame: Flame,
  leaf: Leaf,
  users: Users,
  card: CreditCard,
} as const satisfies Record<KitchenNoteIcon, typeof Flame>;

export function KitchenJournal() {
  const [featured, ...supporting] = kitchenMoments;

  if (!featured) return null;

  const whatsappUrl = buildWhatsAppUrl(kitchenWhatsAppMessage);

  return (
    <Reveal className="mt-10">
      <div
        data-kitchen-journal
        className="overflow-hidden rounded-[2rem] border border-ink/10 bg-ocean-deep shadow-soft"
      >
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-px bg-sand/10">
              <figure className="relative col-span-3 aspect-[16/10] overflow-hidden lg:aspect-[16/9]">
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  placeholder="blur"
                  blurDataURL={featured.image.blurDataURL}
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/15 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-turmeric">
                    {featured.eyebrow}
                  </span>
                  <p className="mt-1.5 font-display text-xl leading-tight text-sand sm:text-2xl">
                    {featured.title}
                  </p>
                  <p className="mt-1 font-hand text-lg leading-tight text-sand/85 sm:text-xl">
                    {featured.note}
                  </p>
                </figcaption>
              </figure>

              {supporting.map((moment) => (
                <figure
                  key={moment.id}
                  className="group relative aspect-square overflow-hidden lg:aspect-[4/3]"
                >
                  <Image
                    src={moment.image.src}
                    alt={moment.image.alt}
                    fill
                    sizes="(max-width: 1024px) 33vw, 19vw"
                    placeholder="blur"
                    blurDataURL={moment.image.blurDataURL}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/10 to-transparent"
                    aria-hidden="true"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5">
                    <span className="text-[0.45rem] font-semibold uppercase tracking-[0.16em] text-turmeric sm:text-[0.5rem]">
                      {moment.eyebrow}
                    </span>
                    <p className="mt-0.5 font-display text-[0.8rem] leading-tight text-sand sm:text-[0.95rem]">
                      {moment.title}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div
            data-kitchen-panel
            className="relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 lg:col-span-5 lg:p-10"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-turmeric/15"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-lagoon/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-center gap-2 text-turmeric">
                <Flame className="h-4 w-4" strokeWidth={1.6} />
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]">
                  The kitchen journal
                </p>
              </div>
              <h3 className="mt-4 font-display text-[2rem] leading-[1.05] text-sand sm:text-[2.45rem]">
                The kitchen starts{" "}
                <em className="font-normal italic text-turmeric">at two.</em>
              </h3>
              <p className="mt-4 text-[0.82rem] leading-7 text-sand/75">
                Breakfast begins with hoppers and egg curry. By two, the clay
                pots are on the fire. The catch is landed by Maduka&apos;s father
                and the local boats right out front, and Nissansala decides the
                rest. This is slow food, cooked to order.
              </p>

              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {kitchenNotes.map((note) => {
                  const Icon = noteIcons[note.icon];
                  return (
                    <li key={note.label} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-sand/15 bg-sand/[0.06] text-turmeric">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-sand/90">
                          {note.label}
                        </p>
                        <p className="mt-0.5 text-[0.7rem] leading-5 text-sand/65">
                          {note.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-7 hidden border-l border-turmeric/35 pl-4 font-hand text-[1.55rem] leading-tight text-turmeric/90 lg:block">
                Slow food. Hammock hours. Sunset on the sand.
              </p>
            </div>

            <div className="relative mt-8 border-t border-sand/15 pt-5">
              <a
                href={`/book?mode=table&dish=${encodeURIComponent("Puttalam Lagoon Crab Curry")}#booking`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-cinnamon px-5 py-3 text-[0.72rem] font-semibold text-sand shadow-card transition hover:bg-cinnamon-deep"
              >
                Pre-order the crab curry
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-fit items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-sand/70 transition hover:text-sand"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp the kitchen · {property.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
