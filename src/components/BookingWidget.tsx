"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  Clock3,
  LoaderCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Sun,
  Sunrise,
  Users,
  UtensilsCrossed,
  WavesHorizontal,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { menuItems } from "@/data/menu";
import { property } from "@/data/property";
import { rooms } from "@/data/rooms";
import {
  getDolphinTourUrl,
  getMealPreOrderUrl,
  getStayInquiryUrl,
  submitDolphinTourBooking,
  submitMealPreOrder,
  submitRoomInquiry,
} from "@/services/api";
import type {
  DolphinTourBooking,
  InquiryResult,
  InquiryType,
  MealPreOrder,
  RoomId,
  RoomInquiry,
} from "@/types";
import {
  cn,
  formatDate,
  isFutureDate,
  nightsBetween,
  todayISO,
} from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";

type Mode = InquiryType;
type FormErrors = Record<string, string>;

interface StayForm {
  name: string;
  checkIn: string;
  checkOut: string;
  roomId: RoomId;
  guests: string;
  notes: string;
}

interface TableForm {
  name: string;
  date: string;
  time: string;
  guests: string;
  dishes: string[];
  notes: string;
}

interface TourForm {
  name: string;
  date: string;
  departure: DolphinTourBooking["departure"];
  guests: string;
  notes: string;
}

const tabs: {
  id: Mode;
  label: string;
  mobileLabel: string;
  icon: LucideIcon;
}[] = [
  { id: "stay", label: "Stay inquiry", mobileLabel: "Stay", icon: BedDouble },
  {
    id: "table",
    label: "Table & curry",
    mobileLabel: "Table",
    icon: UtensilsCrossed,
  },
  {
    id: "dolphin",
    label: "Dolphin tour",
    mobileLabel: "Dolphin",
    icon: WavesHorizontal,
  },
];

const timeOptions = [
  "12:30 PM (lunch)",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM (sunset)",
  "7:30 PM",
];

const preorderOptions = menuItems
  .filter((item) =>
    [
      "crab-curry",
      "fish-of-the-day",
      "lagoon-prawns",
      "rice-curry-table",
      "vegan-curry-table",
      "fermented-cocktail",
    ].includes(item.id),
  )
  .map((item) => item.name);

const initialStay: StayForm = {
  name: "",
  checkIn: "",
  checkOut: "",
  roomId: "sea-view",
  guests: "2",
  notes: "",
};

const initialTable: TableForm = {
  name: "",
  date: "",
  time: "6:00 PM (sunset)",
  guests: "2",
  dishes: [],
  notes: "",
};

const initialTour: TourForm = {
  name: "",
  date: "",
  departure: "sunrise",
  guests: "2",
  notes: "",
};

const focusFieldIds: Record<string, string> = {
  stayName: "stay-name",
  checkIn: "stay-check-in",
  checkOut: "stay-check-out",
  tableName: "table-name",
  tableDate: "table-date",
  tableTime: "table-time",
  tourName: "tour-name",
  tourDate: "tour-date",
  tourGuests: "tour-guests",
};

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label className="field-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="mt-1.5 text-[0.7rem] font-medium text-cinnamon-deep"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function validateName(name: string) {
  return name.trim().length < 2 ? "Please tell us your name." : "";
}

const subscribeToDay = () => () => {};

interface BookingWidgetProps {
  initialMode?: InquiryType;
  initialRoomId?: RoomId;
  initialDish?: string;
}

export function BookingWidget({
  initialMode = "stay",
  initialRoomId,
  initialDish,
}: BookingWidgetProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [stay, setStay] = useState<StayForm>(() => ({
    ...initialStay,
    roomId: initialRoomId ?? initialStay.roomId,
  }));
  const [table, setTable] = useState<TableForm>(() => ({
    ...initialTable,
    dishes: initialDish ? [initialDish] : [],
  }));
  const [tour, setTour] = useState<TourForm>(initialTour);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<InquiryResult | null>(null);
  const minDate = useSyncExternalStore(subscribeToDay, todayISO, () => "");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const selectedRoom = rooms.find((room) => room.id === stay.roomId) ?? rooms[0];

  useLockBodyScroll(Boolean(result));

  useEffect(() => {
    if (window.location.hash !== "#booking") return;

    let cancelled = false;
    const scrollToWidget = () => {
      if (cancelled) return;
      document.getElementById("booking")?.scrollIntoView({ block: "start" });
    };

    const timer = window.setTimeout(scrollToWidget, 0);
    void document.fonts?.ready.then(() => {
      window.requestAnimationFrame(scrollToWidget);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!result) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setResult(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [result]);

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setErrors({});
    setSubmitError(null);
  }

  function clearError(key: string) {
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function focusFirstError(nextErrors: FormErrors) {
    const firstKey = Object.keys(nextErrors)[0];
    const id = firstKey ? focusFieldIds[firstKey] : undefined;
    if (!id) return;
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.focus();
    });
  }

  function finishSubmit(nextResult: InquiryResult) {
    setSubmitting(false);
    setResult(nextResult);
  }

  async function handleStaySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const nameError = validateName(stay.name);
    if (nameError) nextErrors.stayName = nameError;
    if (!stay.checkIn) nextErrors.checkIn = "Choose your arrival date.";
    else if (!isFutureDate(stay.checkIn))
      nextErrors.checkIn = "Choose a date from today onwards.";
    if (!stay.checkOut) nextErrors.checkOut = "Choose your departure date.";
    else if (stay.checkIn && nightsBetween(stay.checkIn, stay.checkOut) <= 0)
      nextErrors.checkOut = "Check-out must be after check-in.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    const payload: RoomInquiry = {
      name: stay.name.trim(),
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      roomId: stay.roomId,
      guests: Number(stay.guests),
      notes: stay.notes.trim() || undefined,
    };

    window.open(getStayInquiryUrl(payload), "_blank", "noopener,noreferrer");
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitRoomInquiry(payload);
      finishSubmit(response);
    } catch {
      setSubmitting(false);
      setSubmitError(
        "We couldn't prepare the inquiry. Please message us directly on WhatsApp.",
      );
    }
  }

  async function handleTableSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const nameError = validateName(table.name);
    if (nameError) nextErrors.tableName = nameError;
    if (!table.date) nextErrors.tableDate = "Choose a date.";
    else if (!isFutureDate(table.date))
      nextErrors.tableDate = "Choose a date from today onwards.";
    if (!table.time) nextErrors.tableTime = "Choose a time.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    const payload: MealPreOrder = {
      name: table.name.trim(),
      date: table.date,
      time: table.time,
      guests: Number(table.guests),
      dishes: table.dishes,
      notes: table.notes.trim() || undefined,
    };

    window.open(getMealPreOrderUrl(payload), "_blank", "noopener,noreferrer");
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitMealPreOrder(payload);
      finishSubmit(response);
    } catch {
      setSubmitting(false);
      setSubmitError(
        "We couldn't prepare the pre-order. Please message us directly on WhatsApp.",
      );
    }
  }

  async function handleTourSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const nameError = validateName(tour.name);
    if (nameError) nextErrors.tourName = nameError;
    if (!tour.date) nextErrors.tourDate = "Choose a date.";
    else if (!isFutureDate(tour.date))
      nextErrors.tourDate = "Choose a date from today onwards.";
    if (!tour.guests) nextErrors.tourGuests = "Select the number of guests.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    const payload: DolphinTourBooking = {
      name: tour.name.trim(),
      date: tour.date,
      departure: tour.departure,
      guests: Number(tour.guests),
      notes: tour.notes.trim() || undefined,
    };

    window.open(getDolphinTourUrl(payload), "_blank", "noopener,noreferrer");
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitDolphinTourBooking(payload);
      finishSubmit(response);
    } catch {
      setSubmitting(false);
      setSubmitError(
        "We couldn't prepare the tour request. Please message Maduka directly on WhatsApp.",
      );
    }
  }

  function toggleDish(dish: string) {
    setTable((current) => ({
      ...current,
      dishes: current.dishes.includes(dish)
        ? current.dishes.filter((item) => item !== dish)
        : [...current.dishes, dish],
    }));
  }

  const dishOptions = Array.from(
    new Set([...preorderOptions, ...table.dishes]),
  );

  const successSummary = (() => {
    if (!result) return null;
    if (result.type === "stay") {
      return `${formatDate(stay.checkIn)} → ${formatDate(stay.checkOut)} · ${selectedRoom.name} · ${stay.guests} guest${stay.guests === "1" ? "" : "s"}`;
    }
    if (result.type === "table") {
      const dishCount = table.dishes.length;
      return `${formatDate(table.date)} · ${table.time} · ${table.guests} guest${table.guests === "1" ? "" : "s"}${dishCount ? ` · ${dishCount} dish${dishCount === 1 ? "" : "es"} pre-ordered` : ""}`;
    }
    return `${formatDate(tour.date)} · ${tour.departure === "sunrise" ? "Sunrise departure" : "Later in the morning"} · ${tour.guests} guest${tour.guests === "1" ? "" : "s"}`;
  })();

  return (
    <section id="booking" className="relative z-20 scroll-mt-0">
      <div className="container-page">
        <div className="overflow-hidden rounded-[1.6rem] border border-ink/10 bg-ivory shadow-lift sm:rounded-[1.9rem]">
          <div className="flex flex-col gap-3 border-b border-ink/10 bg-shell/65 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="hide-scrollbar flex gap-1 overflow-x-auto rounded-full bg-ink/[0.045] p-1"
              role="tablist"
              aria-label="What would you like to book?"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`booking-tab-${tab.id}`}
                    aria-selected={active}
                    aria-controls={`booking-panel-${tab.id}`}
                    onClick={() => switchMode(tab.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2.5 text-[0.74rem] font-semibold transition-all duration-300 sm:px-4 sm:text-xs",
                      active
                        ? "bg-ivory text-ink shadow-card"
                        : "text-coastal hover:text-ink",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        active ? "text-cinnamon" : "text-coastal/60",
                      )}
                    />
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="hidden items-center gap-2 text-[0.64rem] font-medium uppercase tracking-[0.12em] text-coastal/75 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-palm opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-palm" />
              </span>
              Book direct with Maduka · {property.phoneDisplay}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_20.5rem]">
            <div className="p-4 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mode}
                  role="tabpanel"
                  id={`booking-panel-${mode}`}
                  aria-labelledby={`booking-tab-${mode}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {mode === "stay" ? (
                    <form onSubmit={handleStaySubmit} noValidate>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                        <Field
                          label="Check-in"
                          htmlFor="stay-check-in"
                          error={errors.checkIn}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <input
                              id="stay-check-in"
                              type="date"
                              min={minDate}
                              value={stay.checkIn}
                              onChange={(event) => {
                                setStay((current) => ({
                                  ...current,
                                  checkIn: event.target.value,
                                }));
                                clearError("checkIn");
                              }}
                              aria-invalid={Boolean(errors.checkIn)}
                              aria-describedby={
                                errors.checkIn ? "stay-check-in-error" : undefined
                              }
                              className="field-input pl-9"
                            />
                          </div>
                        </Field>
                        <Field
                          label="Check-out"
                          htmlFor="stay-check-out"
                          error={errors.checkOut}
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <input
                              id="stay-check-out"
                              type="date"
                              min={stay.checkIn || minDate}
                              value={stay.checkOut}
                              onChange={(event) => {
                                setStay((current) => ({
                                  ...current,
                                  checkOut: event.target.value,
                                }));
                                clearError("checkOut");
                              }}
                              aria-invalid={Boolean(errors.checkOut)}
                              aria-describedby={
                                errors.checkOut
                                  ? "stay-check-out-error"
                                  : undefined
                              }
                              className="field-input pl-9"
                            />
                          </div>
                        </Field>
                        <Field
                          label="Guests"
                          htmlFor="stay-guests"
                          className="lg:col-span-1"
                        >
                          <div className="relative">
                            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <select
                              id="stay-guests"
                              value={stay.guests}
                              onChange={(event) =>
                                setStay((current) => ({
                                  ...current,
                                  guests: event.target.value,
                                }))
                              }
                              className="field-input appearance-none pl-9"
                            >
                              <option value="1">1 guest</option>
                              <option value="2">2 guests</option>
                            </select>
                          </div>
                        </Field>
                        <Field
                          label="Room"
                          htmlFor="stay-room"
                          className="sm:col-span-2 lg:col-span-3"
                        >
                          <select
                            id="stay-room"
                            value={stay.roomId}
                            onChange={(event) =>
                              setStay((current) => ({
                                ...current,
                                roomId: event.target.value as RoomId,
                              }))
                            }
                            className="field-input"
                          >
                            {rooms.map((room) => (
                              <option key={room.id} value={room.id}>
                                {room.name}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field
                          label="Your name"
                          htmlFor="stay-name"
                          error={errors.stayName}
                          className="lg:col-span-2"
                        >
                          <input
                            id="stay-name"
                            type="text"
                            autoComplete="name"
                            value={stay.name}
                            onChange={(event) => {
                              setStay((current) => ({
                                ...current,
                                name: event.target.value,
                              }));
                              clearError("stayName");
                            }}
                            placeholder="Name on the booking"
                            aria-invalid={Boolean(errors.stayName)}
                            aria-describedby={
                              errors.stayName ? "stay-name-error" : undefined
                            }
                            className="field-input"
                          />
                        </Field>
                        <Field
                          label="Anything we should know? (optional)"
                          htmlFor="stay-notes"
                          className="lg:col-span-4"
                        >
                          <textarea
                            id="stay-notes"
                            value={stay.notes}
                            onChange={(event) =>
                              setStay((current) => ({
                                ...current,
                                notes: event.target.value,
                              }))
                            }
                            placeholder="Late arrival, dietary needs, a special occasion…"
                            className="field-textarea"
                            rows={2}
                          />
                        </Field>
                      </div>
                      <SubmitRow
                        submitting={submitting}
                        submitError={submitError}
                        label="Send stay inquiry"
                      />
                    </form>
                  ) : null}

                  {mode === "table" ? (
                    <form onSubmit={handleTableSubmit} noValidate>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                        <Field
                          label="Date"
                          htmlFor="table-date"
                          error={errors.tableDate}
                          className="lg:col-span-2"
                        >
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <input
                              id="table-date"
                              type="date"
                              min={minDate}
                              value={table.date}
                              onChange={(event) => {
                                setTable((current) => ({
                                  ...current,
                                  date: event.target.value,
                                }));
                                clearError("tableDate");
                              }}
                              aria-invalid={Boolean(errors.tableDate)}
                              aria-describedby={
                                errors.tableDate ? "table-date-error" : undefined
                              }
                              className="field-input pl-9"
                            />
                          </div>
                        </Field>
                        <Field
                          label="Time"
                          htmlFor="table-time"
                          error={errors.tableTime}
                          className="lg:col-span-2"
                        >
                          <div className="relative">
                            <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <select
                              id="table-time"
                              value={table.time}
                              onChange={(event) => {
                                setTable((current) => ({
                                  ...current,
                                  time: event.target.value,
                                }));
                                clearError("tableTime");
                              }}
                              className="field-input appearance-none pl-9"
                            >
                              {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Field>
                        <Field
                          label="Guests"
                          htmlFor="table-guests"
                          className="lg:col-span-2"
                        >
                          <div className="relative">
                            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <select
                              id="table-guests"
                              value={table.guests}
                              onChange={(event) =>
                                setTable((current) => ({
                                  ...current,
                                  guests: event.target.value,
                                }))
                              }
                              className="field-input appearance-none pl-9"
                            >
                              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                                (count) => (
                                  <option key={count} value={count}>
                                    {count} guest{count === 1 ? "" : "s"}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                        </Field>
                        <Field
                          label="Your name"
                          htmlFor="table-name"
                          error={errors.tableName}
                          className="lg:col-span-2"
                        >
                          <input
                            id="table-name"
                            type="text"
                            autoComplete="name"
                            value={table.name}
                            onChange={(event) => {
                              setTable((current) => ({
                                ...current,
                                name: event.target.value,
                              }));
                              clearError("tableName");
                            }}
                            placeholder="Name on the table"
                            aria-invalid={Boolean(errors.tableName)}
                            aria-describedby={
                              errors.tableName ? "table-name-error" : undefined
                            }
                            className="field-input"
                          />
                        </Field>
                        <Field
                          label="Notes for the kitchen (optional)"
                          htmlFor="table-notes"
                          className="lg:col-span-4"
                        >
                          <textarea
                            id="table-notes"
                            value={table.notes}
                            onChange={(event) =>
                              setTable((current) => ({
                                ...current,
                                notes: event.target.value,
                              }))
                            }
                            placeholder="Allergies, spice level, a birthday or anniversary…"
                            className="field-textarea"
                            rows={2}
                          />
                        </Field>
                      </div>

                      <fieldset className="mt-5">
                        <legend className="field-label">
                          Pre-order from the curry table (optional)
                        </legend>
                        <div className="mt-1 grid gap-2 sm:grid-cols-2">
                          {dishOptions.map((dish) => {
                            const selected = table.dishes.includes(dish);
                            return (
                              <label
                                key={dish}
                                className={cn(
                                  "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[0.72rem] font-medium leading-5 transition",
                                  selected
                                    ? "border-ocean/35 bg-ocean/[0.055] text-ink"
                                    : "border-ink/10 bg-ivory text-coastal hover:border-ink/20",
                                )}
                              >
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => toggleDish(dish)}
                                  className="sr-only"
                                />
                                <span
                                  className={cn(
                                    "grid h-4 w-4 shrink-0 place-items-center rounded border transition",
                                    selected
                                      ? "border-ocean bg-ocean text-sand"
                                      : "border-ink/25 bg-ivory",
                                  )}
                                  aria-hidden="true"
                                >
                                  {selected ? (
                                    <Check className="h-3 w-3" strokeWidth={3} />
                                  ) : null}
                                </span>
                                {dish}
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>

                      <SubmitRow
                        submitting={submitting}
                        submitError={submitError}
                        label="Send table pre-order"
                      />
                    </form>
                  ) : null}

                  {mode === "dolphin" ? (
                    <form onSubmit={handleTourSubmit} noValidate>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                        <Field
                          label="Preferred date"
                          htmlFor="tour-date"
                          error={errors.tourDate}
                          className="lg:col-span-2"
                        >
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <input
                              id="tour-date"
                              type="date"
                              min={minDate}
                              value={tour.date}
                              onChange={(event) => {
                                setTour((current) => ({
                                  ...current,
                                  date: event.target.value,
                                }));
                                clearError("tourDate");
                              }}
                              aria-invalid={Boolean(errors.tourDate)}
                              aria-describedby={
                                errors.tourDate ? "tour-date-error" : undefined
                              }
                              className="field-input pl-9"
                            />
                          </div>
                        </Field>
                        <Field
                          label="Departure"
                          htmlFor="tour-departure"
                          className="lg:col-span-2"
                        >
                          <div className="relative">
                            <Sunrise className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <select
                              id="tour-departure"
                              value={tour.departure}
                              onChange={(event) =>
                                setTour((current) => ({
                                  ...current,
                                  departure: event.target
                                    .value as DolphinTourBooking["departure"],
                                }))
                              }
                              className="field-input appearance-none pl-9"
                            >
                              <option value="sunrise">Sunrise</option>
                              <option value="later-morning">
                                Later in the morning
                              </option>
                            </select>
                          </div>
                        </Field>
                        <Field
                          label="Guests"
                          htmlFor="tour-guests"
                          error={errors.tourGuests}
                          className="lg:col-span-2"
                        >
                          <div className="relative">
                            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coastal/50" />
                            <select
                              id="tour-guests"
                              value={tour.guests}
                              onChange={(event) => {
                                setTour((current) => ({
                                  ...current,
                                  guests: event.target.value,
                                }));
                                clearError("tourGuests");
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
                        </Field>
                        <Field
                          label="Your name"
                          htmlFor="tour-name"
                          error={errors.tourName}
                          className="lg:col-span-2"
                        >
                          <input
                            id="tour-name"
                            type="text"
                            autoComplete="name"
                            value={tour.name}
                            onChange={(event) => {
                              setTour((current) => ({
                                ...current,
                                name: event.target.value,
                              }));
                              clearError("tourName");
                            }}
                            placeholder="Name of the lead guest"
                            aria-invalid={Boolean(errors.tourName)}
                            aria-describedby={
                              errors.tourName ? "tour-name-error" : undefined
                            }
                            className="field-input"
                          />
                        </Field>
                        <Field
                          label="Anything else? (optional)"
                          htmlFor="tour-notes"
                          className="lg:col-span-4"
                        >
                          <textarea
                            id="tour-notes"
                            value={tour.notes}
                            onChange={(event) =>
                              setTour((current) => ({
                                ...current,
                                notes: event.target.value,
                              }))
                            }
                            placeholder="Children on board, camera gear, seasickness…"
                            className="field-textarea"
                            rows={2}
                          />
                        </Field>
                      </div>
                      <p className="mt-4 flex items-start gap-2 text-[0.7rem] leading-5 text-coastal/80">
                        <Sunrise className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cinnamon" />
                        Dolphin trips are weather-dependent. Maduka will confirm
                        the meeting time on WhatsApp the day before.
                      </p>
                      <SubmitRow
                        submitting={submitting}
                        submitError={submitError}
                        label="Request a boat"
                      />
                    </form>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <aside className="relative overflow-hidden border-t border-ink/10 bg-ocean p-5 text-sand sm:p-6 lg:border-l lg:border-t-0">
              <div
                className="pointer-events-none absolute inset-0 wash-ocean opacity-80"
                aria-hidden="true"
              />
              <div className="relative">
                {mode === "stay" ? (
                  <>
                    <p className="eyebrow text-turmeric">Your stay</p>
                    <h3 className="mt-3 font-display text-[1.65rem] leading-tight">
                      Two rooms. The beach. That&apos;s it.
                    </h3>
                    <div className="mt-5 rounded-2xl border border-sand/15 bg-white/[0.06] p-4">
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-sand/50">
                        Selected room
                      </p>
                      <p className="mt-2 font-display text-[1.35rem] leading-tight text-sand">
                        {selectedRoom.name}
                      </p>
                      <p className="mt-2 text-[0.65rem] leading-5 text-sand/55">
                        Maduka will confirm availability and your rate directly
                        for your dates.
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2.5 text-[0.76rem] text-sand/70">
                      <li className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4 text-turmeric" />
                        {selectedRoom.bed} · sleeps {selectedRoom.sleeps}
                      </li>
                      <li className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-turmeric" />
                        {selectedRoom.view}
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-turmeric" />
                        No payment now · cash for rooms
                      </li>
                    </ul>
                    <p className="mt-5 font-hand text-[1.55rem] leading-tight text-turmeric">
                      The kettle will be on when you arrive.
                    </p>
                  </>
                ) : null}

                {mode === "table" ? (
                  <>
                    <p className="eyebrow text-turmeric">Nissansala&apos;s kitchen</p>
                    <h3 className="mt-3 font-display text-[1.65rem] leading-tight">
                      Cooked from scratch, from 2 PM.
                    </h3>
                    <div className="mt-4 rounded-2xl border border-turmeric/30 bg-turmeric/10 p-4">
                      <p className="text-[0.8rem] leading-6 text-sand/85">
                        Nissansala cooks every curry from scratch starting at
                        2:00 PM—pre-order via WhatsApp so your feast is ready at
                        sunset!
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2.5 text-[0.76rem] text-sand/70">
                      <li className="flex items-center gap-2">
                        <UtensilsCrossed className="h-4 w-4 text-turmeric" />
                        Puttalam Lagoon crab &amp; the day&apos;s catch
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-turmeric" />
                        Flowers &amp; incense available on request
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-turmeric" />
                        Vegetarian &amp; vegan table always available
                      </li>
                    </ul>
                    <p className="mt-5 font-hand text-[1.55rem] leading-tight text-turmeric">
                      The spices are already ground.
                    </p>
                  </>
                ) : null}

                {mode === "dolphin" ? (
                  <>
                    <p className="eyebrow text-turmeric">Sunrise on the water</p>
                    <h3 className="mt-3 font-display text-[1.65rem] leading-tight">
                      The dolphins are just offshore.
                    </h3>
                    <div className="mt-4 rounded-2xl border border-sand/15 bg-white/[0.06] p-4">
                      <p className="text-[0.8rem] leading-6 text-sand/80">
                        A private boat with Maduka and his father, leaving from
                        the beach in front of the restaurant. The local rate is
                        confirmed on WhatsApp.
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2.5 text-[0.76rem] text-sand/70">
                      <li className="flex items-center gap-2">
                        <Sunrise className="h-4 w-4 text-turmeric" />
                        Best light, calmest sea
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-turmeric" />
                        Private boat—just your group
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-turmeric" />
                        Weather-dependent · flexible dates
                      </li>
                    </ul>
                    <p className="mt-5 font-hand text-[1.55rem] leading-tight text-turmeric">
                      We leave when the sea is calm.
                    </p>
                  </>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result ? (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setResult(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-success-title"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-sand shadow-lift"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setResult(null)}
                aria-label="Close confirmation"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sand transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative overflow-hidden bg-ocean px-6 pb-7 pt-8 text-sand">
                <div
                  className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-turmeric/15 blur-2xl"
                  aria-hidden="true"
                />
                <span className="grid h-12 w-12 place-items-center rounded-full border border-sand/20 bg-white/10">
                  <Check className="h-5 w-5 text-turmeric" strokeWidth={2.5} />
                </span>
                <p className="eyebrow mt-5 text-turmeric">Request ready</p>
                <h3
                  id="booking-success-title"
                  className="mt-2 font-display text-[2rem] leading-tight"
                >
                  Over to WhatsApp.
                </h3>
                <p className="mt-3 max-w-sm text-[0.82rem] leading-6 text-sand/70">
                  {result.message}
                </p>
              </div>
              <div className="p-6">
                <dl className="space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-coastal">Reference</dt>
                    <dd className="font-mono text-[0.72rem] font-semibold tracking-wide text-ink">
                      {result.reference}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-ink/10 pt-3">
                    <dt className="text-coastal">Details</dt>
                    <dd className="max-w-[70%] text-right text-[0.8rem] leading-5 text-ink">
                      {successSummary}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 rounded-xl bg-shell/70 px-3.5 py-2.5 text-[0.72rem] leading-5 text-coastal">
                  WhatsApp was opened in a new tab. If it did not open, use the
                  button below—nothing has been charged.
                </p>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <ButtonLink
                    href={result.whatsappUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="whatsapp"
                    size="md"
                    className="w-full sm:flex-1"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Open WhatsApp
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={() => setResult(null)}
                    className={buttonClasses({
                      variant: "outline",
                      size: "md",
                      className: "w-full sm:w-auto",
                    })}
                  >
                    Done
                  </button>
                </div>

                <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.14em] text-coastal/60">
                  <MessageCircle className="mr-1 inline h-3 w-3" />
                  Maduka or Nissansala will reply personally
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function SubmitRow({
  submitting,
  submitError,
  label,
}: {
  submitting: boolean;
  submitError: string | null;
  label: string;
}) {
  return (
    <div className="mt-5 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-2 text-[0.68rem] leading-5 text-coastal/80">
        <ShieldCheck className="h-3.5 w-3.5 text-palm" />
        No payment now. Your message opens in WhatsApp.
      </p>
      {submitError ? (
        <p className="text-[0.72rem] font-medium text-cinnamon-deep">
          {submitError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className={buttonClasses({
          variant: "primary",
          size: "md",
          className: "group w-full shrink-0 sm:w-auto",
        })}
      >
        {submitting ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Preparing…
          </>
        ) : (
          <>
            {label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </div>
  );
}
