import { property } from "@/data/property";
import { rooms } from "@/data/rooms";
import type {
  DolphinTourBooking,
  InquiryResult,
  MealPreOrder,
  Room,
  RoomInquiry,
} from "@/types";
import { formatDate, formatLkr } from "@/lib/utils";

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${property.whatsappNumber}?text=${encodeURIComponent(
    message.trim(),
  )}`;
}

export function getGeneralWhatsAppUrl(message?: string) {
  return buildWhatsAppUrl(
    message ??
      `Hello Maduka & Nissansala! I found your website and would love to ask about staying at Maduka Restaurant & Rooms.`,
  );
}

export function getRoomWhatsAppUrl(room: Room) {
  const rate =
    room.priceFrom !== null
      ? ` I saw the sample rate of ${formatLkr(room.priceFrom)} per night on your website.`
      : "";
  return buildWhatsAppUrl(
    `Hello Maduka & Nissansala! I would like to check availability for the ${room.name}.${rate} Could you let me know the current rate and available dates? Thank you!`,
  );
}

export function getStayInquiryMessage(input: RoomInquiry) {
  const room = rooms.find((item) => item.id === input.roomId);
  const roomName = room?.name ?? input.roomId;
  return `Hello Maduka & Nissansala! 🌴

I would like to inquire about a stay at Maduka Restaurant & Rooms.

Name: ${input.name}
Check-in: ${formatDate(input.checkIn, "long")}
Check-out: ${formatDate(input.checkOut, "long")}
Room: ${roomName}
Guests: ${input.guests}
${input.notes ? `Notes: ${input.notes}\n` : ""}
Could you let me know availability and the best direct rate? Thank you!`;
}

export function getStayInquiryUrl(input: RoomInquiry) {
  return buildWhatsAppUrl(getStayInquiryMessage(input));
}

export function getMealPreOrderMessage(input: MealPreOrder) {
  const dishes =
    input.dishes.length > 0
      ? input.dishes.join(", ")
      : "Just a table, no specific pre-order.";
  return `Hello Maduka & Nissansala! 🥘

I would like to pre-order a table at the restaurant.

Name: ${input.name}
Date: ${formatDate(input.date, "long")}
Time: ${input.time}
Guests: ${input.guests}
Pre-order: ${dishes}
${input.notes ? `Notes: ${input.notes}\n` : ""}
I understand the curries are cooked from scratch from 2:00 PM—we are happy to take it slow. Thank you!`;
}

export function getMealPreOrderUrl(input: MealPreOrder) {
  return buildWhatsAppUrl(getMealPreOrderMessage(input));
}

export function getDolphinTourMessage(input: DolphinTourBooking) {
  const departure =
    input.departure === "sunrise" ? "Sunrise" : "Later in the morning";
  return `Hello Maduka! 🐬

I would like to book a private spinner dolphin tour with you and your father.

Name: ${input.name}
Date: ${formatDate(input.date, "long")}
Departure: ${departure}
Guests: ${input.guests}
${input.notes ? `Notes: ${input.notes}\n` : ""}
Could you confirm the meeting point and the local rate? Thank you!`;
}

export function getDolphinTourUrl(input: DolphinTourBooking) {
  return buildWhatsAppUrl(getDolphinTourMessage(input));
}

function createReference(prefix: string) {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const token = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MR-${prefix}-${date}-${token}`;
}

/**
 * Phase 2: replace the mock resolution below with a POST to
 * /api/inquiries, /api/meal-preorders or /api/tours. The Facebook/WhatsApp
 * deep link stays as an instant, no-friction fallback.
 */
export async function getRooms(): Promise<Room[]> {
  return Promise.resolve(rooms);
}

export async function submitRoomInquiry(
  input: RoomInquiry,
): Promise<InquiryResult> {
  await wait(650);
  return {
    success: true,
    type: "stay",
    reference: createReference("STAY"),
    whatsappUrl: getStayInquiryUrl(input),
    message:
      "Your stay inquiry is ready. We opened WhatsApp with all the details so Maduka or Nissansala can reply personally.",
  };
}

export async function submitMealPreOrder(
  input: MealPreOrder,
): Promise<InquiryResult> {
  await wait(650);
  return {
    success: true,
    type: "table",
    reference: createReference("TABLE"),
    whatsappUrl: getMealPreOrderUrl(input),
    message:
      "Your table pre-order is ready. We opened WhatsApp with your dishes and time so the kitchen can start planning.",
  };
}

export async function submitDolphinTourBooking(
  input: DolphinTourBooking,
): Promise<InquiryResult> {
  await wait(650);
  return {
    success: true,
    type: "dolphin",
    reference: createReference("TOUR"),
    whatsappUrl: getDolphinTourUrl(input),
    message:
      "Your sunrise boat request is ready. We opened WhatsApp so Maduka can confirm the weather and meeting time.",
  };
}
