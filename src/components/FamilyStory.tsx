import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/data/images";
import { property } from "@/data/property";

export function FamilyStory() {
  return (
    <section className="wash-sand relative overflow-hidden bg-sand py-24 sm:py-28 lg:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="The family behind the sand"
              title={
                <>
                  You arrive as a guest.{" "}
                  <em className="font-normal italic text-cinnamon">
                    You leave as family.
                  </em>
                </>
              }
              description="Maduka and Nissansala built this place on family land between Puttalam and Kalpitiya. The fishing boats belong to his father. The recipes are Nissansala's. The welcome belongs to all of them."
            />

            <div className="mt-7 space-y-4 text-[0.92rem] leading-7 text-coastal">
              <p>
                There are only two rooms and one kitchen, so nothing here feels
                performed. Breakfast is cooked when you wake up. The curry is
                started at 2 PM because that is how long the spices need. If the
                boats come in while you are on the beach, dinner may change
                before your eyes.
              </p>
              <p>
                Come for a night before the airport or stay for a week. Either
                way, you are pulled into the family rhythm: long tables, cold
                drinks, dolphin mornings, and the kind of quiet that only a
                fishing beach has.
              </p>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-10 bg-cinnamon/40" aria-hidden="true" />
              <div>
                <p className="font-hand text-[1.9rem] leading-none text-cinnamon">
                  Maduka &amp; Nissansala
                </p>
                <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-coastal/60">
                  Your hosts · Ilandaiyadi
                </p>
              </div>
            </div>

            <figure className="mt-9 max-w-md border-l-2 border-cinnamon/35 pl-5">
              <Quote className="h-5 w-5 text-cinnamon/50" />
              <blockquote className="mt-2 font-display text-[1.35rem] italic leading-snug text-ink/85">
                “We were received like friends.”
              </blockquote>
              <figcaption className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-coastal/70">
                Violaine · France · Booking.com 10/10
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.12}>
            <div className="relative pb-10 pl-4 sm:pl-8 lg:pl-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-shell shadow-lift">
                <Image
                  src={images.hostsTablePortrait.src}
                  alt={images.hostsTablePortrait.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  placeholder="blur"
                  blurDataURL={images.hostsTablePortrait.blurDataURL}
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-5 bottom-5 flex justify-end text-right">
                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-sand/60">
                      Around the table
                    </p>
                    <p className="mt-1 font-hand text-[1.8rem] leading-none text-sand">
                      Pull up a chair.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 left-0 aspect-square w-32 overflow-hidden rounded-[1.4rem] border-4 border-sand bg-white shadow-lift sm:-left-4 sm:w-44">
                <Image
                  src={images.madukaLogo.src}
                  alt={images.madukaLogo.alt}
                  fill
                  sizes="176px"
                  placeholder="blur"
                  blurDataURL={images.madukaLogo.blurDataURL}
                  className="object-cover"
                />
              </div>

              <div className="absolute -right-2 top-6 rounded-2xl border border-ink/10 bg-ivory/95 px-4 py-3 text-center shadow-card backdrop-blur-md sm:-right-4">
                <p className="font-display text-[1.8rem] leading-none text-ocean">
                  10<span className="text-base">/10</span>
                </p>
                <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-coastal">
                  Booking.com
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3 lg:gap-8">
          {property.hosts.map((host, index) => (
            <Reveal key={host.name} delay={index * 0.08}>
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-shell">
                  <Image
                    src={host.image.src}
                    alt={host.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={host.image.blurDataURL}
                    style={{ objectPosition: host.imagePosition ?? "center" }}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/25 px-2.5 py-1 font-display text-xs text-sand backdrop-blur-md">
                    0{index + 1}
                  </span>
                  <p className="absolute bottom-4 left-4 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-sand/85">
                    {host.shortRole}
                  </p>
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight text-ink">
                  {host.name}
                </h3>
                <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cinnamon">
                  {host.role}
                </p>
                <p className="mt-3 text-[0.86rem] leading-7 text-coastal">
                  {host.bio}
                </p>
                <p className="mt-3 font-hand text-[1.4rem] leading-tight text-ocean/70">
                  “{host.quote}”
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
