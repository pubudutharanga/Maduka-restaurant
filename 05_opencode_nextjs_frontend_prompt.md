# OpenCode Master Prompt: Maduka Restaurant & Rooms (Next.js Modern Frontend)

Copy and paste the prompt below directly into **OpenCode** (running inside your `D:\projects web\maduka-restaurent` directory), or save this file as `PROMPT.md` in the project folder and instruct OpenCode to read and execute it.

## Copy-Paste Prompt for OpenCode (DeepSeek V4.1 Flash)

```markdown
You are an expert Senior Frontend Architect and UI/UX Hospitality Designer. Your task is to build **Phase 1 (Modern Frontend)** of the official website for **Maduka Restaurant & Rooms** (located in Ilandaiyadi / Kalpitiya, Sri Lanka) using **Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, and Framer Motion**.

Phase 1 is a standalone, ultra-fast, high-converting, luxury-coastal frontend built with clean, modular data/service layers and interactive booking/inquiry flows (via WhatsApp pre-filled links & mock API handlers) so that **Phase 2 (Backend & Database Integration)** can be plugged in seamlessly without refactoring UI components.

---

### STEP 1: READ LOCAL WORKSPACE CONTEXT & ASSETS FIRST
Before writing code, inspect the current workspace (`D:\projects web\maduka-restaurent`):
1. **Read all 4 knowledge-base Markdown files** in the root directory to extract 100% accurate copy, prices, reviews, dishes, policies, and distances:
   - `01_property_overview_and_facilities.md`
   - `02_pricing_and_nearby_area.md`
   - `03_accommodation_reviews.md`
   - `04_restaurant_reviews.md`
2. **Inspect the two local photo directories**:
   - `./all-images-of-restaurent/` (property, beach, chalets, restaurant, food, boats, coconut palms)
   - `./with-guest-images/` (authentic guest moments, dolphin tours, dining on the sand, family hospitality)
3. **Asset Migration Plan**:
   - Once the Next.js project is initialized, organize and copy/move these photos into `./public/images/property/` and `./public/images/guests/` (keep original filenames or generate a clean manifest in `src/data/images.ts` so every `next/image` component references real local photos from those folders—never broken URLs).

---

### STEP 2: BRAND VIBE, AESTHETIC DIRECTION & DESIGN SYSTEM
Capture the authentic soul of **Maduka Restaurant & Rooms**—**Barefoot Sri Lankan Coastal Luxury meets Warm Fishing-Family Hospitality**:
- **Visual Vibe**: Sun-drenched private beach, rustic sand chalets under coconut palms, open-air tropical bathrooms, freshly landed lagoon crab and clay-pot Sri Lankan curries, sunset fishing boats, and spinner dolphin tours.
- **Color Palette (Tailwind Custom Theme)**:
  - **Sand & Shell Backgrounds**: `#FAF6F0` (Warm Alabaster Sand), `#F2E9DC` (Soft Driftwood Cream)
  - **Ocean & Lagoon Accents**: `#0D4C5C` (Deep Indian Ocean Teal), `#1A7A8C` (Kalpitiya Lagoon Cyan)
  - **Spice & Sunset Highlights**: `#D96B27` (Ceylon Cinnamon / Sunset Terracotta), `#E5A93C` (Turmeric & Pineapple Gold)
  - **Tropical Palm Greens**: `#2C5E43` (Coconut Frond Green)
  - **Typography & Ink**: `#1C2526` (Deep Charcoal), `#5C6667` (Muted Coastal Slate)
- **Typography (`next/font/google`)**:
  - **Headings**: *Playfair Display* or *Cormorant Garamond* (editorial, warm coastal resort feel)
  - **Body & UI**: *Plus Jakarta Sans* or *Inter* (crisp, modern legibility)
  - **Accents/Badges**: *Caveat* or *Instrument Serif* (for handwritten-style host notes from Maduka & Nissansala)
- **UI Polish**:
  - Glassmorphic sticky navigation bar that transitions on scroll.
  - Smooth scroll reveals and micro-interactions using `framer-motion`.
  - Mobile-first responsive layouts with a persistent floating **"Book / Pre-Order via WhatsApp (+94 72 961 4412)"** quick-action button.

---

### STEP 3: ARCHITECTURE FOR FUTURE BACKEND INTEGRATION (BACKEND-READY)
Structure the project under `src/` so Phase 2 backend integration is effortless:
- `src/types/index.ts`: Strict TypeScript interfaces for `Room`, `MenuItem`, `TourExperience`, `Review`, `NearbyPlace`, `BookingInquiry`, and `MealPreOrder`.
- `src/data/`: Centralized strongly-typed data modules populated strictly from the 4 `.md` files:
  - `src/data/property.ts` (Host bios for Maduka, Nissansala, and Maduka's father; check-in 1:00 PM–12:00 AM; check-out 12:00 AM–12:00 PM; house rules; FAQs).
  - `src/data/rooms.ts` (Double Room with Sea View [1 full bed, chalet on sand, LKR 9,468 sample rate] & Double Room with Private Bathroom [1 queen bed, open-air coconut-tree bathroom]).
  - `src/data/menu.ts` (Nissansala's scratch-cooked rice & curry medley: sweet-and-sour pineapple curry, potato, pumpkin, aubergine, daal, green beans, cabbage, popadoms; Puttalam Lagoon crab; fresh fish of the day; grilled prawns; squid; breakfast coconut sambal; buffalo curd & coconut honey; Maduka's dad's homemade fermented fruit cocktails; ginger tea).
  - `src/data/reviews.ts` (All 20 Booking.com 10/10 reviews + category scores [Staff 10.0, Cleanliness 9.9, Comfort 9.9, Facilities 9.9, Value 9.9, Location 9.7] AND all 21 Tripadvisor 5.0/5.0 reviews with language filter tags & original/translated toggles).
  - `src/data/experiences.ts` (On-site Private Spinner Dolphin Boat Tour with Maduka & his father, Traditional Sri Lankan Cooking Class with Nissansala, sunset fishing boat watching,scooter/tuk-tuk parking, plus regional Kalpitiya kitesurfing/Wilpattu/Bar Reef excursions).
- `src/services/api.ts`: Async service layer (`getRooms()`, `submitRoomInquiry()`, `submitMealPreOrder()`, `submitDolphinTourBooking()`) that currently resolves from local data and formats an instant **WhatsApp deep link (`https://wa.me/94729614412?text=...`)**, ready to swap with REST/Prisma/Supabase API calls in Phase 2.

---

### STEP 4: REQUIRED PAGES & INTERACTIVE SECTIONS

1. **Hero Section & Trust Bar**:
   - Full-viewport coastal hero using real photos from `all-images-of-restaurent`, atmospheric gradient overlay, headline (*"A Little Corner of Paradise on the Sands of Ilandaiyadi"*), and dual CTAs: **"Reserve a Beach Chalet"** & **"Pre-Order Fresh Curry & Seafood"**.
   - Live social-proof trust bar: **10/10 Exceptional on Booking.com** (Staff 10.0 · Couples Location 10/10) & **5.0/5.0 #1 Rated on Tripadvisor**.

2. **Interactive Availability & Meal Pre-Order Bar**:
   - Tabs for: (A) **Stay Inquiry** (Check-in/Check-out dates, Room Type, Guests), (B) **Table & Curry Pre-Order** (with a clear callout: *"Nissansala cooks every curry from scratch starting at 2:00 PM—pre-order via WhatsApp so your feast is ready at sunset!"*), and (C) **Sunrise Spinner Dolphin Tour Booking**.
   - Submitting validates inputs and opens a pre-filled WhatsApp message to `+94 72 961 4412` + saves state in a mock booking confirmation modal.

3. **The Family Story ("Hosted by Maduka, Nissansala & Family")**:
   - Storytelling grid highlighting **Maduka** (hospitality & dolphin guide), **Nissansala** (acclaimed chef behind the curries & cooking classes), and **Maduka's Father** (veteran local fisherman who lands the daily catch and crafts homemade fermented fruit cocktails).

4. **Maduka Restaurant & Culinary Showcase**:
   - Interactive category filter: *Catch of the Day & Lagoon Crab*, *Signature Rice & Curry Medley*, *Vegan & Vegetarian*, *Breakfast & Sambal*, *Homemade Cocktails & Ginger Tea*.
   - Highlight dietary inclusivity (100% Vegetarian & Vegan friendly), beachside romantic flower/incense table setup, and shaded hammock waiting area.

5. **Beachfront Rooms ("Rooms at Maduka Restaurant")**:
   - Side-by-side interactive cards for **Double Room with Sea View** and **Double Room with Private Bathroom** with photo carousels, amenity badges (Private Beach, Terrace, Free WiFi, Pet-Friendly Free, Free On-Site Parking), transparent notes (natural sea breeze / fan-cooled, cash payment for rooms, credit cards accepted at restaurant), and starting price indicator (`~LKR 9,468 / night`).

6. **Experiences & Kalpitiya Adventures**:
   - Featured cards for **Private Spinner Dolphin Spotting with Maduka's Dad**, **Sri Lankan Curry Cooking Class**, **Sunset Fishing Fleet Spectacle**, plus a distance guide to Lake Pal Kulam (6 km), Kalpitiya Kitesurfing, Bar Reef Snorkeling, and Wilpattu Safari.

7. **Masonry Photo Gallery ("Real Guests, Real Stays")**:
   - Filterable lightbox gallery dynamically displaying photos from both `all-images-of-restaurent` (Property, Food, Beach) and `with-guest-images` (Guest Memories & Dolphin Tours).

8. **Dual-Platform Verified Reviews Hub**:
   - Switch between **Booking.com (10/10)** and **Tripadvisor (5.0/5.0)** with rating progress bars, country flags (Netherlands, France, Germany, Switzerland, UK, Australia, Iran, Belgium, Denmark, Italy, Sri Lanka), traveler type filters (*All, Couples, Solo, Friends, Family*), and a **"Show Original Language (NL/FR/DE)"** toggle on translated reviews.

9. **Location, House Rules & FAQ Accordion**:
   - Interactive map card (Off Kalpitiya Road, 24235 Ilandaiyadi, 500m from town center, 68 mi from Bandaranaike Airport), check-in/out timeline, pet/child policies, and expandable FAQs.

---

### STEP 5: EXECUTION WORKFLOW (FOLLOW STRICTLY)
Execute this build step-by-step without stopping prematurely:
1. Check if `package.json` exists. If not, initialize Next.js (App Router, TypeScript, Tailwind CSS, ESLint) in the current directory and install `lucide-react`, `framer-motion`, `clsx`, and `tailwind-merge`.
2. Scan `./all-images-of-restaurent` and `./with-guest-images`, copy the images into `./public/images/restaurant/` and `./public/images/guests/`, and generate `src/data/images.ts` with their exact filenames.
3. Create `src/types/index.ts` and all data files in `src/data/` using the exact facts from `01_...md` through `04_...md`.
4. Build all modular UI components in `src/components/` (`Navbar`, `Hero`, `BookingWidget`, `FamilyStory`, `MenuShowcase`, `RoomsSection`, `ExperiencesSection`, `PhotoGallery`, `ReviewsHub`, `HouseRulesFaq`, `Footer`, `WhatsAppFloatingCTA`).
5. Assemble the landing page in `src/app/page.tsx` and configure metadata/SEO in `src/app/layout.tsx`.
6. Run `npm run build` (or typecheck) to verify there are zero TypeScript, Next.js Image, or JSX syntax errors, and fix any issues automatically.
```

## Tips for Running This in OpenCode with DeepSeek V4.1 Flash Free

* **Run in your project folder**: Open your terminal inside `D:\projects web\maduka-restaurent` before starting `opencode` so the agent can directly see `01_...md`–`04_...md` and your two image folders (`all-images-of-restaurent` and `with-guest-images`).
* **If Context Window Limits Hit**: Because DeepSeek V4.1 Flash Free works best when tasks are modular, if it pauses after creating the data layer (`Step 3`), simply reply `"Continue with Step 4 and Step 5"` and it will pick up right where it left off.
* **Image Optimization**: If your raw camera/guest photos in `all-images-of-restaurent` and `with-guest-images` have spaces or special characters in their filenames, Step 2 instructs OpenCode to map their exact filenames into `src/data/images.ts` so `next/image` loads every photo cleanly.
