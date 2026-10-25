import type { Room } from "@/types";
import { roomImages } from "./images";

export const rooms: Room[] = [
  {
    id: "sea-view",
    name: "Double Room with Sea View",
    subtitle: "A timber chalet on the sand",
    bed: "1 full bed",
    sleeps: 2,
    view: "Sea or garden view",
    bathroom: "Private bathroom",
    priceFrom: 9468,
    currency: "LKR",
    priceNote:
      "Sample rate for the Sea View room, per night. Rates vary with dates and season.",
    description:
      "A simple timber chalet set directly on the sand, with a private terrace and the ocean a few steps from your door.",
    longDescription:
      "Wake to fishing boats on the horizon and fall asleep to the surf. This is the room guests describe as the chalet on the sand: white linen, warm timber, a private bathroom and a terrace made for long mornings with ginger tea.",
    amenities: [
      { icon: "view", label: "Sea or garden view" },
      { icon: "terrace", label: "Private terrace" },
      { icon: "bath", label: "Private bathroom" },
      { icon: "beach", label: "Private beach access" },
      { icon: "wifi", label: "Free WiFi" },
      { icon: "fan", label: "Ceiling fan & sea breeze" },
      { icon: "pet", label: "Pets stay free" },
      { icon: "parking", label: "Free on-site parking" },
    ],
    notes: [
      "Cooled by the natural sea breeze and a ceiling fan — there is no air conditioning.",
      "Rooms are paid in cash. Credit cards are accepted at the restaurant.",
      "Cribs and extra beds are not available at this property.",
      "Pets are welcome on request, with no extra charge.",
    ],
    paymentNote: "Cash only for rooms · cards accepted at the restaurant",
    images: roomImages.seaView,
  },
  {
    id: "private-bathroom",
    name: "Double Room with Private Bathroom",
    subtitle: "A garden room under the coconut trees",
    bed: "1 queen bed",
    sleeps: 2,
    view: "Sea or garden view",
    bathroom: "Private open-air bathroom",
    priceFrom: null,
    currency: "LKR",
    priceNote:
      "Rate confirmed on inquiry. Message the family for live availability.",
    description:
      "A quiet garden room with a queen bed and a private open-air bathroom tucked under the coconut palms.",
    longDescription:
      "The garden room is the more tucked-away of the two: a queen bed, warm timber walls, a terrace for the evening breeze and a private bathroom that opens to the coconut trees. Simple, spotless and surrounded by green.",
    amenities: [
      { icon: "bath", label: "Private open-air bathroom" },
      { icon: "bed", label: "Queen bed" },
      { icon: "garden", label: "Garden & sea views" },
      { icon: "terrace", label: "Private terrace" },
      { icon: "beach", label: "Private beach access" },
      { icon: "wifi", label: "Free WiFi" },
      { icon: "pet", label: "Pets stay free" },
      { icon: "parking", label: "Free on-site parking" },
    ],
    notes: [
      "The private bathroom is open-air, set under the coconut trees.",
      "Cooled by the sea breeze and a ceiling fan — there is no air conditioning.",
      "Rooms are paid in cash. Credit cards are accepted at the restaurant.",
      "Cribs and extra beds are not available at this property.",
    ],
    paymentNote: "Cash only for rooms · cards accepted at the restaurant",
    images: roomImages.privateBathroom,
  },
];

export const roomAmenityStrip = [
  { icon: "beach", label: "Private beach" },
  { icon: "terrace", label: "Terrace & outdoor furniture" },
  { icon: "wifi", label: "Free WiFi" },
  { icon: "pet", label: "Pet-friendly · free" },
  { icon: "parking", label: "Free on-site parking" },
] as const;
