"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  Coffee,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { dolphinTourBreakfastCopy } from "@/data/dolphinTour";
import { property } from "@/data/property";
import { getDolphinTourReservationUrl } from "@/services/api";
import { cn, formatDate, isFutureDate, todayISO } from "@/lib/utils";

const subscribeToDay = () => () => {};

export function DolphinTourBookingCard() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [breakfast, setBreakfast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const minDate = useSyncExternalStore(subscribeToDay, todayISO, () => "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!date) {
      setError("Choose your preferred date.");
      dateRef.current?.focus();
      return;
    }

    if (!isFutureDate(date)) {
      setError("Choose a date from today onwards.");
      dateRef.current?.focus();
      return;
    }

    if (!guests || Number(guests) < 1) {
      setError("Choose the number of guests.");
      return;
    }

    const url = getDolphinTourReservationUrl({
      date,
      guests: Number(guests),
      breakfast,
    });

    setError(null);
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-sand/70 bg-ivory p-5 shadow-lift sm:rounded-[2rem] sm:p-7">
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-turmeric/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-cinnamon">Private boat reservation</p>
            <h3 className="mt-3 font-display text-[2rem] leading-[1.03] tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              Reserve your{" "}
              <em className="font-normal italic text-ocean">7:00 AM</em> boat.
            </h3>
          </div>
          <span className="hidden shrink-0 rounded-full border border-ocean/15 bg-ocean/[0.05] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ocean sm:inline-flex">
            Daily departure
          </span>
        </div>
        <p className="mt-3 max-w-md text-[0.84rem] leading-6 text-coastal">
          Choose your morning, tell us who is coming, and we will prepare the
          boat. Maduka will confirm the weather and meeting time with you
          personally on WhatsApp.
        </p>

        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="dolphin-tour-date">
                Preferred date
              </label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                <input
                  ref={dateRef}
                  id="dolphin-tour-date"
                  name="date"
                  type="date"
                  min={minDate || undefined}
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setError(null);
                    setSentUrl(null);
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "dolphin-tour-date-error" : undefined}
                  className="field-input pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="dolphin-tour-guests">
                Number of guests
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                <select
                  id="dolphin-tour-guests"
                  name="guests"
                  value={guests}
                  onChange={(event) => {
                    setGuests(event.target.value);
                    setSentUrl(null);
                  }}
                  className="field-input appearance-none pl-9"
                >
                  {Array.from({ length: 8 }, (_, index) => index + 1).map(
                    (count) => (
                      <option key={count} value={count}>
                        {count} guest{count === 1 ? "" : "s"}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </div>

          {error ? (
            <p
              id="dolphin-tour-date-error"
              role="alert"
              className="mt-3 rounded-xl border border-cinnamon/20 bg-cinnamon/[0.06] px-3.5 py-2.5 text-[0.74rem] font-medium leading-5 text-cinnamon-deep"
            >
              {error}
            </p>
          ) : null}

          <label
            className={cn(
              "mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
              breakfast
                ? "border-palm/25 bg-palm/[0.06]"
                : "border-ink/10 bg-shell/40 hover:border-ink/20",
            )}
          >
            <input
              type="checkbox"
              name="breakfast"
              checked={breakfast}
              onChange={(event) => {
                setBreakfast(event.target.checked);
                setSentUrl(null);
              }}
              className="peer sr-only"
            />
            <span
              className={cn(
                "mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-cinnamon peer-focus-visible:ring-offset-2",
                breakfast ? "bg-palm" : "bg-ink/15",
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  "h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                  breakfast ? "translate-x-5" : "translate-x-0",
                )}
              />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-[0.8rem] font-semibold leading-5 text-ink">
                <Coffee className="h-4 w-4 shrink-0 text-cinnamon" />
                Add breakfast by the sea
              </span>
              <span className="mt-1 block text-[0.72rem] leading-5 text-coastal">
                {dolphinTourBreakfastCopy}
              </span>
            </span>
            {breakfast ? (
              <Check
                className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-palm"
                aria-hidden="true"
              />
            ) : null}
          </label>

          <button
            type="submit"
            className={buttonClasses({
              variant: "whatsapp",
              size: "lg",
              className:
                "group mt-5 w-full gap-2.5 rounded-2xl text-left sm:rounded-full",
            })}
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            <span className="min-w-0 flex-1">
              Reserve Private Boat via WhatsApp
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="mt-3 flex flex-col gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
            <a
              href={property.phoneHref}
              className="inline-flex items-center justify-center gap-1.5 text-[0.72rem] font-medium text-coastal transition hover:text-ink"
            >
              <Phone className="h-3.5 w-3.5" />
              Prefer to call? {property.phoneDisplay}
            </a>
            <p className="inline-flex items-center justify-center gap-1.5 text-[0.66rem] text-coastal/70">
              <ShieldCheck className="h-3.5 w-3.5 text-palm" />
              No payment now
            </p>
          </div>

          {sentUrl ? (
            <div
              role="status"
              className="mt-4 rounded-2xl border border-palm/20 bg-palm/[0.06] p-4"
            >
              <p className="flex items-center gap-2 text-[0.78rem] font-semibold text-ink">
                <Check className="h-4 w-4 text-palm" />
                Your boat request is ready.
              </p>
              <p className="mt-1 text-[0.72rem] leading-5 text-coastal">
                WhatsApp was opened with your date, guests and breakfast
                choice. If it did not open, use the button below.
              </p>
              <a
                href={sentUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-palm transition hover:text-ocean"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Open WhatsApp again
              </a>
            </div>
          ) : null}

          <p className="mt-4 text-center text-[0.64rem] leading-5 text-coastal/65">
            {date ? (
              <>
                Your request:{" "}
                <span className="font-semibold text-coastal">
                  {formatDate(date, "long")}
                </span>{" "}
                · {guests} guest{guests === "1" ? "" : "s"} ·{" "}
                {breakfast ? "breakfast included" : "boat only"}
              </>
            ) : (
              "The sea decides the weather. Maduka will confirm the final details with you."
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
