const resolveSiteUrl = (): string => {
  const customUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (customUrl) {
    return customUrl.replace(/\/$/, "");
  }

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionUrl) {
    return `https://${vercelProductionUrl}`;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "https://maduka-restaurant.vercel.app";
};

export const siteUrl = resolveSiteUrl();

export const siteName = "Maduka Restaurant & Rooms";

export const siteDescription =
  "A family-run beachfront restaurant and two-room hideaway on the sands of Ilandaiyadi, Kalpitiya. Nissansala's scratch-cooked Sri Lankan curries, Puttalam Lagoon crab, private spinner dolphin tours and a quiet stretch of private beach.";

export const siteKeywords = [
  "Maduka Restaurant",
  "Maduka Restaurant & Rooms",
  "Ilandaiyadi",
  "Kalpitiya",
  "Sri Lanka beach restaurant",
  "Kalpitiya accommodation",
  "Puttalam Lagoon crab",
  "Sri Lankan rice and curry",
  "spinner dolphin tour Kalpitiya",
  "beach chalet Sri Lanka",
  "family homestay Kalpitiya",
  "vegetarian Sri Lanka",
];
