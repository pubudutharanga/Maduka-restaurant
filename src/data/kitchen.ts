import type { KitchenMoment, KitchenNote } from "@/types";
import { images } from "./images";

/**
 * The kitchen journal sits at the top of the menu. These are real photographs
 * from the Maduka kitchen and table, with short editorial captions written for
 * the site rather than pasted social copy.
 */
export const kitchenMoments: KitchenMoment[] = [
  {
    id: "daily-catch",
    image: images.grilledCatchPlate,
    eyebrow: "From the boats",
    title: "The catch, grilled simply",
    note: "Landed out front. On the fire by lunch.",
    dish: "Fish of the Day, Grilled",
    featured: true,
  },
  {
    id: "crab-pot",
    image: images.crabCurryClaypot,
    eyebrow: "On the fire",
    title: "The crab pot",
    note: "Lagoon crab, cracked to order.",
    dish: "Puttalam Lagoon Crab Curry",
  },
  {
    id: "green-beans",
    image: images.claypotGreenBeans,
    eyebrow: "From the garden",
    title: "Green beans, before the fire",
    note: "Pandan, curry leaf, garlic, turmeric.",
    dish: "Nissansala's Rice & Curry Table",
  },
  {
    id: "beetroot-spices",
    image: images.claypotBeetrootSpices,
    eyebrow: "The spice box",
    title: "Beetroot and roasted spice",
    note: "Ground fresh. Cooked from scratch.",
    dish: "Nissansala's Rice & Curry Table",
  },
];

export const kitchenNotes: KitchenNote[] = [
  {
    icon: "flame",
    label: "From scratch daily",
    detail: "Curries start at 2 PM",
  },
  {
    icon: "leaf",
    label: "From the garden",
    detail: "Local vegetables, ground spice",
  },
  {
    icon: "users",
    label: "Everyone at the table",
    detail: "Vegan & vegetarian spreads",
  },
  {
    icon: "card",
    label: "Cards & cash",
    detail: "At the restaurant",
  },
];

export const kitchenWhatsAppMessage =
  "Hello Maduka & Nissansala! I would like to pre-order dinner at Maduka Restaurant & Rooms. Could you let me know what is cooking today?";
