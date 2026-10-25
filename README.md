# Maduka Restaurant & Rooms

The Phase 1 marketing site for **Maduka Restaurant & Rooms**—a family-run beachfront restaurant and two-room hideaway on the sands of Ilandaiyadi, Kalpitiya, Sri Lanka.

Built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons. All copy, prices, reviews, policies and photographs come from the property's own knowledge base and guest archives.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build + type check |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript with no emit |

## What is included

- Glass navbar, editorial hero and dual-platform trust bar
- Interactive three-mode booking widget (stay, table pre-order, dolphin tour)
- Family story, room showcase with photo carousels, filterable menu
- Experiences and regional day trips with WhatsApp enquiry links
- Filterable photo gallery with a keyboard-accessible lightbox
- Booking.com and Tripadvisor reviews with score breakdowns, traveller filters, original-language toggles and load-more
- Google Maps location, check-in details, house rules and animated FAQ accordion
- Floating WhatsApp CTA, structured data (`Restaurant`, `LodgingBusiness`, `FAQPage`), sitemap-ready metadata and a custom 404

## Project structure

```text
src/
├─ app/
│  ├─ layout.tsx          # Fonts, metadata, navbar/footer shell
│  ├─ page.tsx            # Home page composition
│  ├─ not-found.tsx       # Custom 404
│  ├─ globals.css         # Tailwind v4 theme and design tokens
│  ├─ icon.svg            # Favicon
│  └─ manifest.ts         # Web app manifest
├─ components/
│  ├─ BookingWidget.tsx
│  ├─ ExperiencesSection.tsx
│  ├─ FamilyStory.tsx
│  ├─ FinalCta.tsx
│  ├─ Footer.tsx
│  ├─ Hero.tsx
│  ├─ HouseRulesFaq.tsx
│  ├─ JsonLd.tsx
│  ├─ MenuShowcase.tsx
│  ├─ Navbar.tsx
│  ├─ PhotoGallery.tsx
│  ├─ ReviewsHub.tsx
│  ├─ RoomsSection.tsx
│  ├─ ScrollProgress.tsx
│  ├─ TrustBar.tsx
│  ├─ WhatsAppFloatingCTA.tsx
│  └─ ui/                 # Button, Reveal, SectionHeading, icons
├─ data/
│  ├─ property.ts         # Address, hosts, rules, FAQs, nearby places
│  ├─ rooms.ts            # The two rooms and amenities
│  ├─ menu.ts             # Menu categories, dishes and highlights
│  ├─ experiences.ts      # On-site and regional experiences
│  ├─ reviews.ts          # Ratings, reviews and traveller filters
│  └─ images.ts           # 84 local photographs + blur placeholders
├─ services/
│  └─ api.ts              # WhatsApp deep links + mock inquiry service
├─ types/
│  └─ index.ts            # Shared domain types
└─ lib/
   ├─ site.ts             # Site URL, name, description, keywords
   └─ utils.ts            # Formatting and class helpers
```

## Booking flow

Every enquiry is a **WhatsApp deep link** to `+94 72 961 4412` with the guest's name, dates, room, dishes or tour details prefilled. The form also shows a local confirmation modal with a reference, while the message is sent from the guest's own WhatsApp app. This keeps Phase 1 static, fast and free of a booking database.

The enquiry functions live in `src/services/api.ts`:

- `getStayInquiryUrl`
- `getMealPreOrderUrl`
- `getDolphinTourUrl`
- `submitRoomInquiry` / `submitMealPreOrder` / `submitDolphinTourBooking` (mock async wrappers)

For Phase 2, replace the mock resolvers with calls to `/api/inquiries`, `/api/meal-preorders` or `/api/tours`. The WhatsApp link remains a no-friction fallback.

## Content and photography

- Property facts, policies, FAQs and contact details: `src/data/property.ts`
- Sample room rate (LKR 9,468 per night, Sea View) and room details: `src/data/rooms.ts`
- Menu and pre-order dishes: `src/data/menu.ts`
- Reviews and scores: `src/data/reviews.ts`
- Local photography: `public/images/restaurant/`, `public/images/guests/`, `public/images/brand/`

The review section shows a selection of the reviews supplied with the property archive. Scores and total review counts are shown exactly as published on each platform; missing reviews have not been invented.

## Notes

- Rooms are cash only. The restaurant accepts cards.
- Check-in: 1:00 PM – 12:00 AM. Check-out: 12:00 AM – 12:00 PM.
- Pets are welcome on request at no charge.
- The site targets Node.js 20+ and uses `next/font` for Playfair Display, Plus Jakarta Sans and Caveat.

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment to override the canonical domain.
