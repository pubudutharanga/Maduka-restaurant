import type { ExperienceItem } from "@/types";
import { experienceImages } from "./experienceImages";

export const MADUKA_WHATSAPP_NUMBER = "94729614412";
export const MADUKA_DISPLAY_PHONE = "+94 72 961 4412";

const imagePaths = (images: readonly { src: string }[]) =>
  images.map((image) => image.src);

export const experiencesData: ExperienceItem[] = [
  {
    id: "dolphin-whale-tour",
    slug: "dolphin-tour",
    title: "Private Dolphin & Whale Watching Tour",
    subtitle:
      "Set sail off the magical coastline of Ilanthadiya, Kalpitiya onboard your own private fishing boat",
    badge: "Flagship Experience 🐬🐳 • Leaves 7:00 AM Daily",
    hasDedicatedPage: true,
    dedicatedPageUrl: "/dolphin-tour",
    departureOrSchedule: "Every morning at 7:00 AM (Best wildlife window)",
    location: "Ilanthadiya Beach, Kalpitiya, North West Province",
    shortDescription:
      "Dreaming of seeing dolphins in their natural environment? Book your private dolphin & whale tour with Maduka and his father onboard our traditional fishing boat, departing daily at 7:00 AM right from our restaurant beach.",
    fullDescriptions: [
      "Dreaming of seeing dolphins in their natural environment? 🐬✨ Book your private dolphin tour with us and enjoy a magical experience onboard our fishing boat. We leave every morning at 7am for the best chance to spot them in the wild. 🌊 WhatsApp to book or stop by our restaurant to reserve your seat!",
      "Set sail off the magical coastline of Ilanthadiya, Kalpitiya in the North West Province and have a truly intimate experience onboard your very own private fishing boat. Book your Dolphin & Whale Tour today! 🐬 🐳",
    ],
    highlights: [
      "100% private charter onboard our family fishing boat",
      "Departs daily at 7:00 AM directly from the beach in front of Maduka Restaurant",
      "Guided by Maduka & skillfully captained by his father, a lifelong local fisherman",
      "Spot wild spinner dolphin pods and seasonal whales off Kalpitiya",
      "Complimentary coffee, water, and fresh ginger tea before/after your voyage",
      "Optional freshly cooked Sri Lankan beachfront breakfast & espresso upon return",
    ],
    hashtags: [
      "#DolphinWatching",
      "#SriLankaTours",
      "#OceanAdventure",
      "#WildlifeExperience",
      "#BoatTour",
    ],
    whatsappPrefillText:
      "Hello Maduka! 🐬 I would like to book the 7:00 AM Private Dolphin & Whale Watching Boat Tour from Ilanthadiya. Could you share availability and rates?",
    imageFolder: "/images/experiences/dolphin-tour",
    images: imagePaths(experienceImages.dolphinTour),
  },
  {
    id: "beachfront-bbq-parties",
    title: "Private Beachfront BBQ Parties",
    subtitle:
      "Oceanfront night grilling under the stars with fresh daily catch, prawns, lagoon crab & homemade cocktails",
    badge: "Beach Night Experience 🔥🦐",
    hasDedicatedPage: false,
    departureOrSchedule: "Available every evening upon advance request",
    location: "Private Beach at Maduka Restaurant, Ilandaiyadi",
    shortDescription:
      "Celebrate on the sand with a custom beachfront BBQ party! We grill the day’s freshest ocean fish, jumbo tiger prawns, squid, and lagoon crab right by the waves, paired with tropical salads, roast potatoes, cold beers, and homemade fermented fruit cocktails.",
    fullDescriptions: [
      "Experience an unforgettable evening on our private beach with a custom Sri Lankan Seafood BBQ Party. Hosted by Maduka and Nissansala, we set up your private beachside table with fresh flowers, incense, and live grilling right on the sand.",
    ],
    highlights: [
      "Live beachfront grilling of freshly landed reef fish, jumbo prawns, squid & crab",
      "Served with golden roast potatoes, fragrant garlic/yellow rice & vibrant tropical salad",
      "Ice-cold beer buckets & Maduka’s father’s homemade fermented fruit cocktails",
      "Custom romantic or group beach setup with flowers, lanterns & ocean breeze",
    ],
    hashtags: [
      "#BeachBBQ",
      "#SriLankaEats",
      "#FreshCatch",
      "#KalpitiyaNights",
      "#SeafoodBBQ",
    ],
    whatsappPrefillText:
      "Hello Maduka! 🔥 I would like to inquire about organizing a Beachfront BBQ Party at Maduka Restaurant.",
    imageFolder: "/images/experiences/bbq",
    images: imagePaths(experienceImages.bbq),
  },
  {
    id: "wilpattu-safari-guided-by-maduka",
    title: "Wilpattu National Park Safaris Guided by Maduka",
    subtitle:
      "Personal wildlife safari adventures into Sri Lanka’s largest national park with Maduka as your guide",
    badge: "Guided Wildlife Safari 🐆🐘",
    hasDedicatedPage: false,
    departureOrSchedule:
      "Morning Dawn Safaris & Full-Day Safaris available daily",
    location: "Pickup from Maduka Restaurant to Wilpattu National Park",
    shortDescription:
      "Venture into the untamed wilderness of Wilpattu National Park with Maduka personally guiding your journey. Spot elusive Sri Lankan leopards, sloth bears, wild elephants, and painted storks with private transport and homemade safari meals.",
    fullDescriptions: [
      "Combine your peaceful coastal stay in Kalpitiya with an authentic wildlife expedition into nearby Wilpattu National Park. Maduka arranges private transport, 4x4 safari jeeps, and personally accompanies you to track leopards, sloth bears, elephants, and endemic birds around Wilpattu’s natural lakes (villus).",
    ],
    highlights: [
      "Personally guided by Maduka with private door-to-door transport & 4x4 safari jeep",
      "Track Sri Lankan leopards, sloth bears, elephants, crocodiles & exotic birdlife",
      "Half-day morning/afternoon or full-day all-inclusive safari options",
      "Optional home-cooked packed breakfast or lunch prepared fresh by Nissansala",
    ],
    hashtags: [
      "#WilpattuSafari",
      "#SriLankaWildlife",
      "#LeopardSafari",
      "#KalpitiyaToWilpattu",
    ],
    whatsappPrefillText:
      "Hello Maduka! 🐆 I am interested in booking a Wilpattu National Park Safari guided by you. Could you share details and prices?",
    imageFolder: "/images/experiences/wilpattu-safari",
    images: imagePaths(experienceImages.wilpattuSafari),
  },
  {
    id: "vehicle-scooter-rentals",
    title: "Vehicle, Scooter & Tuk-Tuk Rentals",
    subtitle:
      "Explore the Kalpitiya peninsula, lagoons, and hidden fishing villages at your own pace",
    badge: "Island Mobility 🛵🛺",
    hasDedicatedPage: false,
    departureOrSchedule: "Flexible daily & multi-day rentals on-site",
    location: "On-Site at Maduka Restaurant, Ilandaiyadi",
    shortDescription:
      "Need wheels to explore Kalpitiya? Maduka provides hassle-free scooter, motorbike, tuk-tuk, and private vehicle rentals directly from the property, along with reliable airport and regional transfers.",
    fullDescriptions: [
      "Discover the untouched coastal charm between Puttalam and Kalpitiya with complete freedom. Maduka arranges well-maintained scooters, bikes, tuk-tuks, and private vehicles right at the restaurant—complete with free on-site parking and local route tips.",
    ],
    highlights: [
      "Easy on-site scooter, motorbike, tuk-tuk & vehicle rentals arranged by Maduka",
      "Private airport transfers (Bandaranaike International Airport) & regional drop-offs",
      "Free, secure on-site parking for bikes, tuk-tuks, and cars",
      "Local insider route maps to Kalpitiya kitesurfing lagoons, Lake Pal Kulam & sandbars",
    ],
    hashtags: [
      "#SriLankaTravel",
      "#Kalpitiya",
      "#ScooterRental",
      "#ExploreSriLanka",
    ],
    whatsappPrefillText:
      "Hello Maduka! 🛵 I would like to inquire about renting a vehicle/scooter during our visit to Maduka Restaurant.",
    imageFolder: "/images/experiences/vehicle-rental",
    images: imagePaths(experienceImages.vehicleRental),
  },
  {
    id: "sri-lankan-cooking-class",
    title: "Traditional Clay-Pot Sri Lankan Cooking Class",
    subtitle:
      "Learn the secrets of authentic village rice & curry with Nissansala and Maduka",
    badge: "Culinary Experience 🍲🌿",
    hasDedicatedPage: false,
    departureOrSchedule:
      "Afternoon & early evening sessions upon request",
    location: "Maduka Restaurant Kitchen & Beachfront, Ilandaiyadi",
    shortDescription:
      "Join Nissansala and Maduka for a fun, hands-on Sri Lankan cooking class! Learn how to balance freshly ground spices, coconut milk, and local produce in traditional clay pots—and feast on your creations by the sea.",
    fullDescriptions: [
      "Praised by guests as both educational and unforgettable, our family cooking class invites you into our kitchen to master authentic Sri Lankan coastal cuisine—from sweet-and-sour pineapple curry and lagoon crab curry to fresh morning coconut sambol.",
    ],
    highlights: [
      "Hands-on instruction from Nissansala (acclaimed chef) and Maduka",
      "Cook with locally grown vegetables, fresh curry leaves, pandan & roasted spices in clay pots",
      "Learn signature dishes like sweet-and-sour pineapple curry, daal, beetroot & coconut sambol",
      "Dine on the full multi-curry banquet you prepared right on the private beach",
    ],
    hashtags: [
      "#SriLankanCookingClass",
      "#ClayPotCooking",
      "#RiceAndCurry",
      "#FoodTravel",
    ],
    whatsappPrefillText:
      "Hello Maduka & Nissansala! 🍲 I would love to book a Traditional Sri Lankan Cooking Class at Maduka Restaurant.",
    imageFolder: "/images/experiences/cooking-class",
    images: imagePaths(experienceImages.cookingClass),
  },
];

/**
 * The original page used `experiences` from this module. Keep the alias so
 * existing imports outside the experiences section continue to resolve.
 */
export const experiences = experiencesData;
