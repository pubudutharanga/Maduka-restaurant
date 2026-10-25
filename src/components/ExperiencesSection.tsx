import {
  ArrowUpRight,
  Binoculars,
  CookingPot,
  Droplets,
  Fish,
  Ship,
  Scooter,
  Wind,
  WavesHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  experienceNotes,
  experiences,
  regionalExperiences,
} from "@/data/experiences";
import { buildWhatsAppUrl } from "@/services/api";
import type { ExperienceIcon, TourExperience } from "@/types";
import { cn } from "@/lib/utils";

const experienceIcons: Record<ExperienceIcon, LucideIcon> = {
  dolphin: WavesHorizontal,
  cooking: CookingPot,
  boat: Ship,
  scooter: Scooter,
  lagoon: Droplets,
  kite: Wind,
  reef: Fish,
  safari: Binoculars,
};

function ExperienceCta({
  experience,
  variant = "light",
}: {
  experience: TourExperience;
  variant?: "light" | "outlineLight";
}) {
  if (!experience.cta) return null;

  if (experience.cta.bookingTab) {
    return (
      <ButtonLink
        href={`/book?mode=${experience.cta.bookingTab}#booking`}
        variant={variant}
        size="sm"
        className="group"
      >
        {experience.cta.label}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </ButtonLink>
    );
  }

  return (
    <ButtonLink
      href={buildWhatsAppUrl(
        experience.cta.message ??
          `Hello Maduka! We would like to ask about ${experience.name}.`,
      )}
      target="_blank"
      rel="noreferrer noopener"
      variant={variant}
      size="sm"
      className="group"
    >
      <WhatsAppIcon className="h-4 w-4" />
      {experience.cta.label}
    </ButtonLink>
  );
}

export function ExperiencesSection() {
  const [featured, ...secondary] = experiences;

  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-ocean-deep py-24 text-sand sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 wash-ocean opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-turmeric/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 select-none font-display text-[18vw] leading-none tracking-[-0.06em] text-sand/[0.025]"
        aria-hidden="true"
      >
        Sea days
      </div>

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <SectionHeading
              tone="light"
              eyebrow="Days on the water"
              title={
                <>
                  The reef, the lagoon,{" "}
                  <em className="font-normal italic text-turmeric">
                    the sunrise boat.
                  </em>
                </>
              }
              description="Maduka's family has fished this coast for generations. That means the best dolphin trips leave from your own beach, the cooking class uses recipes that live here, and every guide they recommend is someone they know by name."
            />
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="rounded-2xl border border-sand/15 bg-white/[0.045] p-5 backdrop-blur-sm">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-turmeric">
                Arranged by the family
              </p>
              <p className="mt-3 text-[0.84rem] leading-6 text-sand/70">
                Tell Maduka what you would like to do and he will tell you
                honestly what the weather, the season and the sea are doing.
              </p>
              <p className="mt-3 font-hand text-[1.35rem] leading-tight text-sand/85">
                Local knowledge, local rates.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="group relative flex min-h-[32rem] overflow-hidden rounded-[2rem] border border-sand/10 bg-ocean">
              {featured.image ? (
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  placeholder="blur"
                  blurDataURL={featured.image.blurDataURL}
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                />
              ) : null}
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10"
                aria-hidden="true"
              />
              <div className="relative mt-auto p-6 sm:p-8 lg:p-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-sand/25 bg-ink/25 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-sand/90 backdrop-blur-md">
                  <WavesHorizontal className="h-3.5 w-3.5 text-turmeric" />
                  From our own beach
                </span>
                <h3 className="mt-4 max-w-lg text-[2.1rem] leading-[1.03] tracking-[-0.02em] text-sand sm:text-[2.6rem]">
                  {featured.name}
                </h3>
                <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-turmeric">
                  {featured.meta}
                </p>
                <p className="mt-4 max-w-xl text-[0.88rem] leading-7 text-sand/75">
                  {featured.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {featured.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full border border-sand/15 bg-white/[0.06] px-3 py-1.5 text-[0.65rem] font-medium text-sand/80 backdrop-blur-sm"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <ExperienceCta experience={featured} />
                  {featured.priceNote ? (
                    <p className="text-[0.66rem] uppercase tracking-[0.13em] text-sand/50">
                      {featured.priceNote}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            {secondary.map((experience, index) => {
              const Icon = experienceIcons[experience.icon];
              return (
                <Reveal key={experience.id} delay={0.08 + index * 0.06}>
                  <article className="group overflow-hidden rounded-2xl border border-sand/12 bg-white/[0.045] backdrop-blur-sm transition-colors duration-500 hover:border-sand/25">
                    <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
                      <div className="relative min-h-[9rem] overflow-hidden bg-ocean sm:min-h-full">
                        {experience.image ? (
                          <Image
                            src={experience.image.src}
                            alt={experience.image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 20vw"
                            placeholder="blur"
                            blurDataURL={experience.image.blurDataURL}
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : null}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent to-ocean-deep/35"
                          aria-hidden="true"
                        />
                        <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-sand/20 bg-ink/30 text-sand backdrop-blur-md">
                          <Icon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                      </div>

                      <div className="flex flex-col p-5">
                        <h3 className="font-display text-[1.45rem] leading-tight text-sand">
                          {experience.name}
                        </h3>
                        <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-turmeric">
                          {experience.meta}
                        </p>
                        <p className="mt-2.5 flex-1 text-[0.78rem] leading-6 text-sand/65">
                          {experience.description}
                        </p>
                        <div className="mt-4">
                          <ExperienceCta
                            experience={experience}
                            variant="outlineLight"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-9 border-t border-sand/15 pt-11 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-turmeric">Further afield</p>
            <h3 className="mt-4 text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-sand sm:text-[2.2rem]">
              The peninsula is worth a day.
            </h3>
            <p className="mt-4 text-[0.86rem] leading-7 text-sand/65">
              Kalpitiya is a long, quiet finger of land between the lagoon and
              the ocean. These are the detours guests ask about most—and the
              family will help you plan them around the weather.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2.5">
              {experienceNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 text-[0.7rem] leading-5 text-sand/55"
                >
                  <span
                    className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-turmeric"
                    aria-hidden="true"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {regionalExperiences.map((experience, index) => {
              const Icon = experienceIcons[experience.icon];
              return (
                <Reveal key={experience.id} delay={index * 0.05}>
                  <article className="flex h-full flex-col rounded-2xl border border-sand/12 bg-white/[0.04] p-5 transition-colors duration-500 hover:border-sand/25 hover:bg-white/[0.06]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-sand/15 bg-ocean/60 text-turmeric">
                        <Icon className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                      {experience.distance ? (
                        <span className="rounded-full border border-sand/15 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-sand/60">
                          {experience.distance}
                        </span>
                      ) : null}
                    </div>
                    <h4 className="mt-4 font-display text-[1.35rem] leading-tight text-sand">
                      {experience.name}
                    </h4>
                    <p className="mt-2 flex-1 text-[0.78rem] leading-6 text-sand/60">
                      {experience.description}
                    </p>
                    {experience.cta ? (
                      <a
                        href={buildWhatsAppUrl(
                          experience.cta.message ??
                            `Hello Maduka! We would like to ask about ${experience.name}.`,
                        )}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cn(
                          "group mt-4 inline-flex items-center gap-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-turmeric transition hover:text-sand",
                        )}
                      >
                        {experience.cta.label}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
