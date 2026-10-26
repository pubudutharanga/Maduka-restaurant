# README: Experiences Section Redesign & Dedicated Dolphin Tour Page Specification

This document analyzes the updated business requirements for **Maduka Restaurant & Rooms** and provides the complete architectural plan, verbatim content, asset routing rules, TypeScript data layer, and **OpenCode execution prompt** to redesign the **Experiences Section** and build the standalone **Dolphin & Whale Tour Page**.

---

## 1. Requirement Analysis & Routing Architecture

| Experience Name | Routing Behavior | Primary CTA Action | Key Highlights to Display |
| :--- | :--- | :--- | :--- |
| **1. Private Dolphin & Whale Watching Tour** *(Flagship)* | **Dedicated Page** (`/dolphin-tour`) + Featured Hero Banner in Homepage `#experiences` | **Primary**: Navigate to `/dolphin-tour` (for full details, timeline, reviews & gallery)<br>**Secondary**: Instant WhatsApp booking (`+94 72 961 4412`) | • Departs **every morning at 7:00 AM** from Ilanthadiya beach, Kalpitiya (North West Province)<br>• 100% private experience onboard the family's own fishing boat<br>• Guided by **Maduka** & captained by **his father** (veteran local fisherman)<br>• Spot wild spinner dolphin pods & whales at the best local rate<br>• Free coffee, water & ginger tea before/after the trip |
| **2. Beachfront BBQ Parties** *(New)* | **Homepage Only** (Interactive card + photo lightbox modal in `#experiences`; **no separate page**) | Pre-filled WhatsApp inquiry (`+94 72 961 4412`) to book a private/group beach BBQ night | • Evening bonfire & grill setups directly on the private sand beach<br>• Freshly landed reef fish, jumbo tiger prawns, squid & lagoon crab grilled live<br>• Served with tropical salads, golden roast potatoes, garlic/yellow rice, cold beers & Maduka's father's homemade fermented fruit cocktails |
| **3. Wilpattu National Park Safaris (Guided by Maduka)** *(New)* | **Homepage Only** (Interactive card + photo lightbox modal in `#experiences`; **no separate page**) | Pre-filled WhatsApp inquiry (`+94 72 961 4412`) to reserve a guided safari with Maduka | • Personally guided by **Maduka** with private transport & safari jeep arrangement<br>• Explore Sri Lanka's largest national park (leopards, sloth bears, elephants, spotted deer, exotic birds)<br>• Half-day (morning or afternoon) & full-day packages with optional homemade packed breakfast/lunch from Maduka Restaurant |
| **4. Vehicle, Scooter & Tuk-Tuk Rentals** *(New)* | **Homepage Only** (Interactive card + photo lightbox modal in `#experiences`; **no separate page**) | Pre-filled WhatsApp inquiry (`+94 72 961 4412`) to reserve a vehicle or scooter | • On-site scooter, motorbike, tuk-tuk & private vehicle rentals arranged directly by Maduka<br>• Ideal for exploring Kalpitiya lagoon, kitesurfing spots, Alankuda & Ilandaiyadi at your own pace<br>• Includes free on-site parking for bikes, tuk-tuks & cars, plus optional airport/local transfers |
| **5. Traditional Sri Lankan Clay-Pot Cooking Class** | **Homepage Only** (Interactive card + photo lightbox modal in `#experiences`; **no separate page**) | Pre-filled WhatsApp inquiry (`+94 72 961 4412`) to join a cooking session | • Fun, hands-on cooking class with **Nissansala & Maduka**<br>• Learn to prepare authentic Sri Lankan rice & curry from scratch in clay pots (pineapple curry, daal, green beans, beetroot, coconut sambol)<br>• Enjoy the feast you cooked right on the private beach |

---

## 2. Verbatim Copy & Social Captions for the Dolphin & Whale Tour

Use these exact descriptions provided by the restaurant across the homepage feature card and the `/dolphin-tour` page:

### Caption 1 — Morning 7:00 AM Private Fishing Boat Experience
> Dreaming of seeing dolphins in their natural environment? 🐬✨
>
> Book your private dolphin tour with us and enjoy a magical experience onboard our fishing boat. We leave every morning at 7am for the best chance to spot them in the wild. 🌊
>
> WhatsApp to book or stop by our restaurant to reserve your seat!
>
> `#DolphinWatching #SriLankaTours #OceanAdventure #WildlifeExperience #BoatTour`

### Caption 2 — Ilanthadiya, Kalpitiya Dolphin & Whale Tour
> Set sail off the magical coastline of Ilanthadiya, Kalpitiya in the North West Province and have a truly intimate experience onboard your very own private fishing boat.
>
> Book your Dolphin & Whale Tour today! 🐬 🐳
> Call or WhatsApp to book: **+94729614412**

---

## 3. Project Root Photo Discovery & Organization Rule

All photos for each experience are located in the **project root** (`D:\projects web\maduka-restaurent` or its immediate image folders). When implementing the redesign:

1. **Scan the Project Root (`./`)**:
   - Inspect all image files (`.jpg`, `.jpeg`, `.png`, `.webp`) and folders in the project root.
   - Classify and copy them into structured public directories so Next.js `<Image />` can serve them cleanly:
     - `./public/images/experiences/dolphin-tour/` → All dolphin, whale, boat, ocean sunrise, and guest boat tour photos (used on both the homepage feature card and the full `/dolphin-tour` page gallery).
     - `./public/images/experiences/bbq/` → All beachfront BBQ grill, night beach dining, and grilled seafood party photos.
     - `./public/images/experiences/wilpattu-safari/` → All Wilpattu National Park safari jeep, wildlife (leopard, elephant, bear, peacock), and Maduka guiding photos.
     - `./public/images/experiences/vehicle-rental/` → All scooter, motorbike, tuk-tuk, and vehicle rental photos.
     - `./public/images/experiences/cooking-class/` → All clay-pot cooking class and spice preparation photos.
2. **Dynamic Fallback & Manifest**:
   - Generate `src/data/experienceImages.ts` mapping the exact discovered filenames from the project root so zero broken image paths occur.

---

## 4. Detailed UI/UX Specification

### A. Homepage `#experiences` Section (`src/components/ExperiencesSection.tsx`)
1. **Section Header**:
   - Badge: `AUTHENTIC COASTAL & WILDLIFE ADVENTURES`
   - Title: `Unforgettable Experiences Hosted by Maduka`
   - Subtitle: `From 7:00 AM private dolphin & whale voyages with Maduka’s father to guided Wilpattu safaris, beachfront BBQ nights, and island vehicle rentals—everything is organized personally by our family.`
2. **Featured Flagship Banner (Top Full-Width Card)**:
   - **Private Dolphin & Whale Watching Tour (7:00 AM Daily Departure)**
   - Split layout: Left side displays an interactive multi-photo preview from the project root's dolphin tour images with a floating badge (`Leaves Daily at 7:00 AM • Ilanthadiya Coastline`); Right side displays the verbatim copy, key highlights (Private Fishing Boat, Maduka & His Father as Guides, Spinner Dolphins & Whales), and two prominent buttons:
     - **Button 1 (Primary Solid Ocean Teal)**: `Explore Full Tour & Photo Gallery →` (links to `/dolphin-tour`)
     - **Button 2 (Outline WhatsApp Green)**: `Reserve 7:00 AM Boat on WhatsApp`
3. **4-Card Bento Grid Below (On-Page Experiences — No Separate Pages)**:
   - Displays **Beachfront BBQ Parties**, **Wilpattu Safaris Guided by Maduka**, **Vehicle & Scooter Rentals**, and **Sri Lankan Clay-Pot Cooking Class**.
   - Each card includes:
     - Photo carousel or click-to-expand **Lightbox Gallery Modal** showing all root photos for that specific experience.
     - Category badge, title, rich description, and bulleted inclusions.
     - Direct **"Book / Inquire via WhatsApp (+94 72 961 4412)"** button that opens `https://wa.me/94729614412?text=...` pre-filled with that specific experience's inquiry text.

---

### B. Dedicated Dolphin & Whale Tour Page (`src/app/dolphin-tour/page.tsx`)
Because only the Dolphin Tour requires a separate page, build `src/app/dolphin-tour/page.tsx` with the following 6 sections:

1. **Hero Banner with Breadcrumb (`← Back to Maduka Restaurant & Rooms`)**:
   - Full-bleed ocean/dolphin background photo from the project root.
   - Headline: *"Dreaming of Seeing Dolphins in Their Natural Environment? 🐬✨"*
   - Subheadline: *"Set sail off the magical coastline of Ilanthadiya, Kalpitiya in the North West Province onboard your very own private fishing boat."*
   - Quick-stats pills: `7:00 AM Daily Departure` · `100% Private Boat` · `Dolphins & Whales 🐬🐳` · `Lowest Local Price` · `+94 72 961 4412`.

2. **Why Sail With Maduka & His Father (The Local Fisherman Advantage)**:
   - Highlights why guests rate this tour 5.0/5.0:
     - **Expert Local Navigation**: Maduka's father is a lifelong Ilanthadiya fisherman who knows the ocean currents and handles the boat with exceptional skill, safety, and care.
     - **Intimate & Respectful Wildlife Spotting**: Unlike crowded commercial resort boats, you charter your own private fishing boat and Maduka leads you directly to the spinner dolphin super-pods and whale routes.
     - **Warm Family Hospitality**: Complimentary coffee, water, and fresh ginger tea served at Maduka Restaurant before and after your voyage.

3. **Morning Voyage Itinerary Timeline**:
   - **6:30 AM — Meet at Maduka Restaurant**: Enjoy complimentary morning coffee, ginger tea, and water on the private beach while your boat is readied right in front of the restaurant.
   - **7:00 AM — Set Sail from Ilanthadiya Beach**: Board your private fishing boat with Maduka and his father during the calmest morning waters for the highest chance of wildlife sightings.
   - **7:30 AM – 9:30 AM — Spinner Dolphins & Whale Watching**: Witness hundreds of wild spinner dolphins leaping and spinning around the boat, plus seasonal whale sightings off the Kalpitiya peninsula.
   - **9:30 AM – 10:30 AM — Return to Shore & Optional Beachfront Breakfast**: Step straight back onto Maduka's private beach for crispy Sri Lankan hoppers, egg curry, coconut sambol, fresh tropical fruit platters, and espresso coffee.

4. **Full Dolphin & Whale Tour Photo Gallery**:
   - Responsive masonry gallery + fullscreen lightbox showcasing all dolphin, whale, boat, and guest tour photos found in the project root.

5. **Verified Guest Reviews for Maduka's Dolphin Tour**:
   - Dedicated cards quoting real guests:
     - **Chris H (Tripadvisor — 5/5)**: *"What an unforgettable experience! Seeing dolphins in the wild has been a bucket list dream for us, and thanks to Maduka and his dad, that dream became a reality... A special shoutout to his dad, too, who drove the boat with such skill and care!"*
     - **Andreanna W (Tripadvisor — 5/5)**: *"Maduka not only runs the most underrated restaurant in Sri Lanka he organises private tours to the spinner dolphins. (Cheapest tour I found)... When we went for the meals and for the tours, he offered us an abundance of coffee, water and ginger tea for free mostly."*
     - **Muriel, Germany (Booking.com — 10/10)**: *"A special experience for us was the dolphin tour with Maduka’s father, who is a fisherman."*
     - **Leila B, France (Tripadvisor — 5/5)**: *"Do not hesitate to go see the dolphins Maduka is master in this matter we have seen from all sides."*

6. **Interactive Dolphin Tour Booking & WhatsApp Reservation Card**:
   - Interactive form on `/dolphin-tour` where guests pick:
     - Preferred Date
     - Number of Guests
     - Add-on toggle: *"Include Beachfront Sri Lankan Breakfast & Espresso after the 7:00 AM tour"*
   - Clicking **"Reserve Private Boat via WhatsApp"** opens `https://wa.me/94729614412?text=...` with all details pre-formatted, or allows one-tap calling to `tel:+94729614412`.

---

## 5. Ready-to-Use Next.js Data Layer (`src/data/experiences.ts`)

```typescript
export interface ExperienceItem {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  badge: string;
  hasDedicatedPage: boolean;
  dedicatedPageUrl?: string;
  departureOrSchedule: string;
  location: string;
  shortDescription: string;
  fullDescriptions: string[];
  highlights: string[];
  hashtags: string[];
  whatsappPrefillText: string;
  imageFolder: string;
  images: string[];
}

export const MADUKA_WHATSAPP_NUMBER = '94729614412';
export const MADUKA_DISPLAY_PHONE = '+94 72 961 4412';

export const experiencesData: ExperienceItem[] = [
  {
    id: 'dolphin-whale-tour',
    slug: 'dolphin-tour',
    title: 'Private Dolphin & Whale Watching Tour',
    subtitle: 'Set sail off the magical coastline of Ilanthadiya, Kalpitiya onboard your own private fishing boat',
    badge: 'Flagship Experience 🐬🐳 • Leaves 7:00 AM Daily',
    hasDedicatedPage: true,
    dedicatedPageUrl: '/dolphin-tour',
    departureOrSchedule: 'Every morning at 7:00 AM (Best wildlife window)',
    location: 'Ilanthadiya Beach, Kalpitiya, North West Province',
    shortDescription:
      'Dreaming of seeing dolphins in their natural environment? Book your private dolphin & whale tour with Maduka and his father onboard our traditional fishing boat, departing daily at 7:00 AM right from our restaurant beach.',
    fullDescriptions: [
      'Dreaming of seeing dolphins in their natural environment? 🐬✨ Book your private dolphin tour with us and enjoy a magical experience onboard our fishing boat. We leave every morning at 7am for the best chance to spot them in the wild. 🌊 WhatsApp to book or stop by our restaurant to reserve your seat!',
      'Set sail off the magical coastline of Ilanthadiya, Kalpitiya in the North West Province and have a truly intimate experience onboard your very own private fishing boat. Book your Dolphin & Whale Tour today! 🐬 🐳 Call or WhatsApp to book: +94729614412',
    ],
    highlights: [
      '100% private charter onboard our family fishing boat',
      'Departs daily at 7:00 AM directly from the beach in front of Maduka Restaurant',
      'Guided by Maduka & skillfully captained by his father, a lifelong local fisherman',
      'Spot wild spinner dolphin pods and seasonal whales off Kalpitiya',
      'Complimentary coffee, water, and fresh ginger tea before/after your voyage',
      'Optional freshly cooked Sri Lankan beachfront breakfast & espresso upon return',
    ],
    hashtags: [
      '#DolphinWatching',
      '#SriLankaTours',
      '#OceanAdventure',
      '#WildlifeExperience',
      '#BoatTour',
    ],
    whatsappPrefillText:
      'Hello Maduka! 🐬 I would like to book the 7:00 AM Private Dolphin & Whale Watching Boat Tour from Ilanthadiya. Could you share availability and rates?',
    imageFolder: '/images/experiences/dolphin-tour',
    images: [], // Populated from project root dolphin tour photos
  },
  {
    id: 'beachfront-bbq-parties',
    title: 'Private Beachfront BBQ Parties',
    subtitle: 'Oceanfront night grilling under the stars with fresh daily catch, prawns, lagoon crab & homemade cocktails',
    badge: 'Beach Night Experience 🔥🦐',
    hasDedicatedPage: false,
    departureOrSchedule: 'Available every evening upon advance request',
    location: 'Private Beach at Maduka Restaurant, Ilandaiyadi',
    shortDescription:
      'Celebrate on the sand with a custom beachfront BBQ party! We grill the day’s freshest ocean fish, jumbo tiger prawns, squid, and lagoon crab right by the waves, paired with tropical salads, roast potatoes, cold beers, and homemade fermented fruit cocktails.',
    fullDescriptions: [
      'Experience an unforgettable evening on our private beach with a custom Sri Lankan Seafood BBQ Party. Hosted by Maduka and Nissansala, we set up your private beachside table with fresh flowers, incense, and live grilling right on the sand.',
    ],
    highlights: [
      'Live beachfront grilling of freshly landed reef fish, jumbo prawns, squid & crab',
      'Served with golden roast potatoes, fragrant garlic/yellow rice & vibrant tropical salad',
      'Ice-cold beer buckets & Maduka’s father’s homemade fermented fruit cocktails',
      'Custom romantic or group beach setup with flowers, lanterns & ocean breeze',
    ],
    hashtags: ['#BeachBBQ', '#SriLankaEats', '#FreshCatch', '#KalpitiyaNights', '#SeafoodBBQ'],
    whatsappPrefillText:
      'Hello Maduka! 🔥 I would like to inquire about organizing a Beachfront BBQ Party at Maduka Restaurant.',
    imageFolder: '/images/experiences/bbq',
    images: [], // Populated from project root BBQ photos
  },
  {
    id: 'wilpattu-safari-guided-by-maduka',
    title: 'Wilpattu National Park Safaris Guided by Maduka',
    subtitle: 'Personal wildlife safari adventures into Sri Lanka’s largest national park with Maduka as your guide',
    badge: 'Guided Wildlife Safari 🐆🐘',
    hasDedicatedPage: false,
    departureOrSchedule: 'Morning Dawn Safaris & Full-Day Safaris available daily',
    location: 'Pickup from Maduka Restaurant to Wilpattu National Park',
    shortDescription:
      'Venture into the untamed wilderness of Wilpattu National Park with Maduka personally guiding your journey. Spot elusive Sri Lankan leopards, sloth bears, wild elephants, and painted storks with private transport and homemade safari meals.',
    fullDescriptions: [
      'Combine your peaceful coastal stay in Kalpitiya with an authentic wildlife expedition into nearby Wilpattu National Park. Maduka arranges private transport, 4x4 safari jeeps, and personally accompanies you to track leopards, sloth bears, elephants, and endemic birds around Wilpattu’s natural lakes (villus).',
    ],
    highlights: [
      'Personally guided by Maduka with private door-to-door transport & 4x4 safari jeep',
      'Track Sri Lankan leopards, sloth bears, elephants, crocodiles & exotic birdlife',
      'Half-day morning/afternoon or full-day all-inclusive safari options',
      'Optional home-cooked packed breakfast or lunch prepared fresh by Nissansala',
    ],
    hashtags: ['#WilpattuSafari', '#SriLankaWildlife', '#LeopardSafari', '#KalpitiyaToWilpattu'],
    whatsappPrefillText:
      'Hello Maduka! 🐆 I am interested in booking a Wilpattu National Park Safari guided by you. Could you share details and prices?',
    imageFolder: '/images/experiences/wilpattu-safari',
    images: [], // Populated from project root Wilpattu safari photos
  },
  {
    id: 'vehicle-scooter-rentals',
    title: 'Vehicle, Scooter & Tuk-Tuk Rentals',
    subtitle: 'Explore the Kalpitiya peninsula, lagoons, and hidden fishing villages at your own pace',
    badge: 'Island Mobility 🛵🛺',
    hasDedicatedPage: false,
    departureOrSchedule: 'Flexible daily & multi-day rentals on-site',
    location: 'On-Site at Maduka Restaurant, Ilandaiyadi',
    shortDescription:
      'Need wheels to explore Kalpitiya? Maduka provides hassle-free scooter, motorbike, tuk-tuk, and private vehicle rentals directly from the property, along with reliable airport and regional transfers.',
    fullDescriptions: [
      'Discover the untouched coastal charm between Puttalam and Kalpitiya with complete freedom. Maduka arranges well-maintained scooters, bikes, tuk-tuks, and private vehicles right at the restaurant—complete with free on-site parking and local route tips.',
    ],
    highlights: [
      'Easy on-site scooter, motorbike, tuk-tuk & vehicle rentals arranged by Maduka',
      'Private airport transfers (Bandaranaike International Airport) & regional drop-offs',
      'Free, secure on-site parking for bikes, tuk-tuks, and cars',
      'Local insider route maps to Kalpitiya kitesurfing lagoons, Lake Pal Kulam & sandbars',
    ],
    hashtags: ['#SriLankaTravel', '#Kalpitiya', '#ScooterRental', '#ExploreSriLanka'],
    whatsappPrefillText:
      'Hello Maduka! 🛵 I would like to inquire about renting a vehicle/scooter during our visit to Maduka Restaurant.',
    imageFolder: '/images/experiences/vehicle-rental',
    images: [], // Populated from project root vehicle rental photos
  },
  {
    id: 'sri-lankan-cooking-class',
    title: 'Traditional Clay-Pot Sri Lankan Cooking Class',
    subtitle: 'Learn the secrets of authentic village rice & curry with Nissansala and Maduka',
    badge: 'Culinary Experience 🍲🌿',
    hasDedicatedPage: false,
    departureOrSchedule: 'Afternoon & early evening sessions upon request',
    location: 'Maduka Restaurant Kitchen & Beachfront, Ilandaiyadi',
    shortDescription:
      'Join Nissansala and Maduka for a fun, hands-on Sri Lankan cooking class! Learn how to balance freshly ground spices, coconut milk, and local produce in traditional clay pots—and feast on your creations by the sea.',
    fullDescriptions: [
      'Praised by guests as both educational and unforgettable, our family cooking class invites you into our kitchen to master authentic Sri Lankan coastal cuisine—from sweet-and-sour pineapple curry and lagoon crab curry to fresh morning coconut sambol.',
    ],
    highlights: [
      'Hands-on instruction from Nissansala (acclaimed chef) and Maduka',
      'Cook with locally grown vegetables, fresh curry leaves, pandan & roasted spices in clay pots',
      'Learn signature dishes like sweet-and-sour pineapple curry, daal, beetroot & coconut sambol',
      'Dine on the full multi-curry banquet you prepared right on the private beach',
    ],
    hashtags: ['#SriLankanCookingClass', '#ClayPotCooking', '#RiceAndCurry', '#FoodTravel'],
    whatsappPrefillText:
      'Hello Maduka & Nissansala! 🍲 I would love to book a Traditional Sri Lankan Cooking Class at Maduka Restaurant.',
    imageFolder: '/images/experiences/cooking-class',
    images: [], // Populated from project root cooking class photos
  },
];
```

---

## 6. Copy-Paste Prompt for OpenCode (DeepSeek V4.1 Flash)

Copy and paste the prompt below into **OpenCode** inside your project directory (`D:\projects web\maduka-restaurent`) to execute the Experiences redesign and create the dedicated Dolphin Tour page:

```markdown
Read `07_experiences_redesign_README.md` in the project root and implement the complete **Experiences Section Redesign** and the standalone **Dolphin & Whale Tour Page (`/dolphin-tour`)** in our Next.js codebase:

1. **Inspect Project Root Photos**:
   - Scan the project root (`./`) and existing image folders for all photos related to:
     (a) Dolphin & Whale Watching Boat Tour
     (b) Beachfront BBQ Parties
     (c) Wilpattu National Park Safaris Guided by Maduka
     (d) Vehicle / Scooter / Tuk-Tuk Rentals
     (e) Traditional Sri Lankan Cooking Class
   - Copy/organize these images into `./public/images/experiences/{dolphin-tour,bbq,wilpattu-safari,vehicle-rental,cooking-class}/` and populate their exact filenames in `src/data/experiences.ts`.

2. **Create/Update `src/data/experiences.ts`**:
   - Include all 5 experiences from `07_experiences_redesign_README.md` with the exact WhatsApp descriptions (`7am daily departure`, `Ilanthadiya, Kalpitiya in the North West Province`, `+94729614412`, hashtags) and pre-filled WhatsApp booking links (`https://wa.me/94729614412?text=...`).
   - Enforce the routing rule: **ONLY the Dolphin & Whale Watching Tour has a separate page (`/dolphin-tour`)**. All other experiences (BBQ Parties, Wilpattu Safaris, Vehicle Rentals, Cooking Class) must NOT have separate pages—they display their full details and photo gallery modal directly inside the homepage `#experiences` section.

3. **Redesign Homepage `src/components/ExperiencesSection.tsx`**:
   - Render a prominent **Featured Flagship Banner** at the top for the **Private Dolphin & Whale Watching Tour (7:00 AM Daily)** with a multi-photo preview, key highlights, a primary CTA button linking to `/dolphin-tour` (`Explore Full Tour & Gallery →`), and a secondary CTA button to book directly via WhatsApp.
   - Below the flagship banner, render a responsive **4-Card Bento Grid** for **Beachfront BBQ Parties**, **Wilpattu Safaris Guided by Maduka**, **Vehicle & Scooter Rentals**, and **Sri Lankan Clay-Pot Cooking Class**. Each card must include an interactive photo carousel/lightbox modal (showing the root photos for that experience), bulleted highlights, and a pre-filled WhatsApp booking button (`+94 72 961 4412`).

4. **Build Dedicated Page `src/app/dolphin-tour/page.tsx`**:
   - Create a full standalone page at `/dolphin-tour` featuring:
     - Sticky top navigation back to `/` and quick WhatsApp CTA.
     - Full-viewport Hero with the verbatim captions from `07_experiences_redesign_README.md`.
     - "Why Sail With Maduka & His Father" feature cards.
     - 4-step Morning Voyage Timeline (6:30 AM Coffee/Ginger Tea → 7:00 AM Set Sail from Ilanthadiya → 7:30–9:30 AM Dolphin & Whale Spotting → 9:30 AM Optional Beachfront Breakfast).
     - Filterable/Lightbox Photo Gallery displaying all dolphin & boat tour photos from `./public/images/experiences/dolphin-tour/`.
     - Verified Dolphin Tour Guest Reviews (Chris H, Andreanna W, Muriel, Leila B).
     - Interactive Dolphin Tour WhatsApp Booking Widget (Date, Guests, Post-Tour Breakfast toggle) that opens a formatted message to `+94 72 961 4412`.

5. **Verify Build**:
   - Run `npm run build` (or typecheck) to confirm `/dolphin-tour` and `/` compile cleanly with zero TypeScript or broken image errors.
```
