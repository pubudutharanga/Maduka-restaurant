import type { TourExperience } from "@/types";
import { images } from "./images";

export const experiences: TourExperience[] = [
  {
    id: "spinner-dolphin-tour",
    name: "Private Spinner Dolphin Tour",
    category: "onsite",
    icon: "dolphin",
    description:
      "Head out at sunrise with Maduka and his father on a private boat to find the spinner dolphins that feed off Kalpitiya. The boat leaves from the family's own beach, at the lowest local rate.",
    meta: "Sunrise · Private boat · From our beach",
    image: images.dolphinInWaves,
    highlights: [
      "With Maduka and his fisherman father",
      "Private boat, not a group tour",
      "Booked directly with the family",
    ],
    priceNote: "Local rate confirmed on WhatsApp",
    cta: {
      label: "Request a sunrise boat",
      bookingTab: "dolphin",
    },
  },
  {
    id: "cooking-class",
    name: "Nissansala's Cooking Class",
    category: "onsite",
    icon: "cooking",
    description:
      "Grind, temper and simmer your way through a full Sri Lankan rice-and-curry table, then sit down with the family and eat what you have made. The recipes are Nissansala's own.",
    meta: "Hands-on · From market to table",
    image: images.crabCurryFeast,
    highlights: [
      "Family recipes, taught step by step",
      "Vegetarian and vegan menus welcome",
      "Finish with lunch or dinner by the sea",
    ],
    priceNote: "Additional charge · times arranged with Nissansala",
    cta: {
      label: "Ask Nissansala",
      message:
        "Hello Maduka & Nissansala! We would love to ask about a Sri Lankan cooking class with Nissansala. Could you share the details, timings and price?",
    },
  },
  {
    id: "sunset-fishing-fleet",
    name: "The Sunset Fishing Fleet",
    category: "onsite",
    icon: "boat",
    description:
      "The beach is the family's front yard and their workplace. Watch the small boats head out in the early morning and return at dusk with the day's catch—often the fish on your plate that evening.",
    meta: "Every morning & evening · From the beach",
    image: images.fishermenAtDusk,
    highlights: [
      "Free to watch from the sand",
      "The day's catch lands here",
      "Golden-hour photography",
    ],
    priceNote: "No charge · simply come down to the beach",
    cta: {
      label: "Ask the family",
      message:
        "Hello Maduka! We would love to watch the fishing boats come in. What time should we be on the beach?",
    },
  },
];

export const regionalExperiences: TourExperience[] = [
  {
    id: "lake-pal-kulam",
    name: "Lake Pal Kulam",
    category: "regional",
    icon: "lagoon",
    distance: "6 km",
    description:
      "A quiet inland lagoon just off the peninsula road—an easy detour for a different view of the landscape.",
    highlights: ["Close to the property", "A peaceful change of scene"],
    cta: {
      label: "Ask for directions",
      message:
        "Hello Maduka! We would like to visit Lake Pal Kulam. Could you share the easiest directions?",
    },
  },
  {
    id: "kalpitiya-kitesurfing",
    name: "Kalpitiya Kitesurfing",
    category: "regional",
    icon: "kite",
    distance: "Lagoon side",
    description:
      "Kalpitiya's lagoon is one of the island's best-known kitesurfing grounds. Windsurfing and kite sessions can be arranged off-site with trusted local operators.",
    highlights: ["Seasonal wind", "Windsurfing off-site", "Ask us to arrange it"],
    cta: {
      label: "Arrange with Maduka",
      message:
        "Hello Maduka! We would like to arrange kitesurfing or windsurfing during our stay. Could you recommend a local operator?",
    },
  },
  {
    id: "bar-reef-snorkelling",
    name: "Bar Reef Snorkelling",
    category: "regional",
    icon: "reef",
    distance: "Boat trip",
    description:
      "Reef snorkelling and dive excursions leave from Kalpitiya. Ask the family to connect you with a trusted boat and guide for the day.",
    highlights: ["Boat excursion", "Reef and marine life", "Weather dependent"],
    cta: {
      label: "Plan a reef day",
      message:
        "Hello Maduka! We would like to arrange a snorkelling or diving trip to Bar Reef. Could you help us plan it?",
    },
  },
  {
    id: "wilpattu-safari",
    name: "Wilpattu Safari",
    category: "regional",
    icon: "safari",
    distance: "Day trip",
    description:
      "A private full-day safari into Wilpattu National Park can be arranged with local operators. It is a long day, best planned around the light and the season.",
    highlights: ["Full-day excursion", "Private jeep", "Ask for a trusted operator"],
    cta: {
      label: "Ask about a safari",
      message:
        "Hello Maduka! We are interested in a Wilpattu safari day trip. Could you recommend a trusted operator and help us plan it?",
    },
  },
];

export const experienceNotes = [
  "Free parking for cars, bikes & tuk-tuks",
  "Scooters available to rent",
  "Pets welcome, free",
  "English spoken",
];
