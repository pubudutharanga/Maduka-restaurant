import { experienceImages } from "./experienceImages";

export const dolphinTourGallery = experienceImages.dolphinTour;

const byFilename = (filename: string) => {
  const found = dolphinTourGallery.find((image) => image.src.endsWith(filename));
  if (!found) {
    throw new Error(`Missing dolphin tour image: ${filename}`);
  }
  return found;
};

export const dolphinTourHeroImage = byFilename("calm-sea-boat.jpg");
export const dolphinTourFeatureImage = byFilename("dolphins-pod.jpg");

export const dolphinTourStats = [
  "7:00 AM Daily Departure",
  "100% Private Boat",
  "Dolphins & Whales 🐬🐳",
  "Lowest Local Price",
] as const;

export const dolphinTourReasons = [
  {
    id: "navigation",
    title: "Expert Local Navigation",
    body: "Maduka's father is a lifelong Ilanthadiya fisherman who knows the ocean currents and handles the boat with exceptional skill, safety, and care.",
  },
  {
    id: "wildlife",
    title: "Intimate & Respectful Wildlife Spotting",
    body: "Unlike crowded commercial resort boats, you charter your own private fishing boat and Maduka leads you directly to the spinner dolphin super-pods and whale routes.",
  },
  {
    id: "hospitality",
    title: "Warm Family Hospitality",
    body: "Complimentary coffee, water, and fresh ginger tea served at Maduka Restaurant before and after your voyage.",
  },
] as const;

export const dolphinTourTimeline = [
  {
    time: "6:30 AM",
    title: "Meet at Maduka Restaurant",
    body: "Enjoy complimentary morning coffee, ginger tea, and water on the private beach while your boat is readied right in front of the restaurant.",
  },
  {
    time: "7:00 AM",
    title: "Set Sail from Ilanthadiya Beach",
    body: "Board your private fishing boat with Maduka and his father during the calmest morning waters for the highest chance of wildlife sightings.",
  },
  {
    time: "7:30 AM – 9:30 AM",
    title: "Spinner Dolphins & Whale Watching",
    body: "Witness hundreds of wild spinner dolphins leaping and spinning around the boat, plus seasonal whale sightings off the Kalpitiya peninsula.",
  },
  {
    time: "9:30 AM – 10:30 AM",
    title: "Return to Shore & Optional Beachfront Breakfast",
    body: "Step straight back onto Maduka's private beach for crispy Sri Lankan hoppers, egg curry, coconut sambol, fresh tropical fruit platters, and espresso coffee.",
  },
] as const;

export const dolphinTourReviews = [
  {
    id: "chris-h",
    author: "Chris H",
    source: "Tripadvisor",
    score: "5/5",
    location: "Tripadvisor review",
    quote:
      "What an unforgettable experience! Seeing dolphins in the wild has been a bucket list dream for us, and thanks to Maduka and his dad, that dream became a reality... A special shoutout to his dad, too, who drove the boat with such skill and care!",
  },
  {
    id: "andreanna-w",
    author: "Andreanna W",
    source: "Tripadvisor",
    score: "5/5",
    location: "Tripadvisor review",
    quote:
      "Maduka not only runs the most underrated restaurant in Sri Lanka he organises private tours to the spinner dolphins. (Cheapest tour I found)... When we went for the meals and for the tours, he offered us an abundance of coffee, water and ginger tea for free mostly.",
  },
  {
    id: "muriel",
    author: "Muriel",
    source: "Booking.com",
    score: "10/10",
    location: "Germany",
    quote:
      "A special experience for us was the dolphin tour with Maduka’s father, who is a fisherman.",
  },
  {
    id: "leila-b",
    author: "Leila B",
    source: "Tripadvisor",
    score: "5/5",
    location: "France",
    quote:
      "Do not hesitate to go see the dolphins Maduka is master in this matter we have seen from all sides.",
  },
] as const;

export const dolphinTourBreakfastCopy =
  "Include Beachfront Sri Lankan Breakfast & Espresso after the 7:00 AM tour";

export const dolphinTourBookingMessage = `Hello Maduka! 🐬

I would like to reserve your 7:00 AM Private Dolphin & Whale Watching Tour.

Date:
Guests:
Breakfast after the tour:`;

export const dolphinTourMapCopy =
  "Meet on the private beach in front of Maduka Restaurant, Ilanthadiya, Kalpitiya. Maduka will send the exact meeting point on WhatsApp when you book.";
