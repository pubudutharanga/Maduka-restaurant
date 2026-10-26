import type { SiteImage } from "@/data/images";

export type InquiryType = "stay" | "table" | "dolphin";

export type RoomId = "sea-view" | "private-bathroom";

export type AmenityIcon =
  | "beach"
  | "terrace"
  | "wifi"
  | "pet"
  | "parking"
  | "bath"
  | "fan"
  | "garden"
  | "view"
  | "users"
  | "bed";

export interface Amenity {
  icon: AmenityIcon;
  label: string;
}

export interface Room {
  id: RoomId;
  name: string;
  subtitle: string;
  bed: string;
  sleeps: number;
  view: string;
  bathroom: string;
  description: string;
  longDescription: string;
  amenities: Amenity[];
  notes: string[];
  paymentNote: string;
  images: readonly SiteImage[];
}

export type MenuCategoryId =
  | "catch"
  | "curry"
  | "plant"
  | "breakfast"
  | "drinks";

export type MenuTag =
  | "Signature"
  | "Vegan"
  | "Vegetarian"
  | "Catch of the day"
  | "Made to order"
  | "House made"
  | "Cooling"
  | "Sunset";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategoryId;
  tags: MenuTag[];
  image?: SiteImage;
  note?: string;
}

export type KitchenNoteIcon = "flame" | "leaf" | "users" | "card";

export interface KitchenMoment {
  id: string;
  image: SiteImage;
  eyebrow: string;
  title: string;
  note: string;
  dish?: string;
  featured?: boolean;
}

export interface KitchenNote {
  icon: KitchenNoteIcon;
  label: string;
  detail: string;
}

export type ExperienceCategory = "onsite" | "regional";

export type ExperienceIcon =
  | "dolphin"
  | "cooking"
  | "boat"
  | "scooter"
  | "lagoon"
  | "kite"
  | "reef"
  | "safari";

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

export interface TourExperience {
  id: string;
  name: string;
  category: ExperienceCategory;
  icon: ExperienceIcon;
  description: string;
  meta?: string;
  image?: SiteImage;
  highlights: string[];
  priceNote?: string;
  distance?: string;
  cta?: {
    label: string;
    bookingTab?: InquiryType;
    message?: string;
  };
}

export type ReviewPlatform = "booking" | "tripadvisor";

export type TravellerType =
  | "couples"
  | "solo"
  | "friends"
  | "family"
  | "business"
  | "unknown";

export type OriginalLanguage = "NL" | "FR" | "DE" | "IT";

export interface Review {
  id: string;
  platform: ReviewPlatform;
  author: string;
  location: string;
  countryCode?: string;
  flag: string;
  score: number;
  maxScore: number;
  headline: string;
  text: string;
  originalText?: string;
  originalLanguage?: OriginalLanguage;
  originalLanguageName?: string;
  tip?: string;
  tipOriginal?: string;
  date: string;
  stay?: string;
  roomType?: string;
  travelerType: TravellerType;
  contributions?: number;
  featured?: boolean;
}

export interface RatingCategory {
  label: string;
  score: number;
  maxScore: number;
}

export interface RatingSummary {
  platform: ReviewPlatform;
  brand: string;
  score: number;
  maxScore: number;
  label: string;
  count: number;
  countLabel: string;
  categories: RatingCategory[];
  highlight: string;
  keywords?: string[];
}

export interface Host {
  name: string;
  role: string;
  shortRole: string;
  bio: string;
  image: SiteImage;
  quote: string;
  imagePosition?: string;
}

export type RuleIcon =
  | "cash"
  | "card"
  | "children"
  | "pets"
  | "smoking"
  | "cancel"
  | "parking"
  | "clock";

export interface HouseRule {
  label: string;
  value: string;
  icon: RuleIcon;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface NearbyPlace {
  name: string;
  category: string;
  distance?: string;
  description: string;
  icon: ExperienceIcon;
}

export interface PropertyRatings {
  booking: {
    score: number;
    maxScore: number;
    label: string;
    count: number;
    couplesLocation: number;
  };
  tripadvisor: {
    score: number;
    maxScore: number;
    label: string;
    count: number;
    photos: number;
  };
}

export interface Property {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  address: {
    line1: string;
    line2: string;
    village: string;
    region: string;
    postalCode: string;
    country: string;
    full: string;
    mapsUrl: string;
    mapEmbedUrl: string;
  };
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  languages: string[];
  checkIn: string;
  checkOut: string;
  payment: {
    rooms: string;
    restaurant: string;
  };
  ratings: PropertyRatings;
  hosts: Host[];
  houseRules: HouseRule[];
  faqs: Faq[];
  nearby: NearbyPlace[];
  trustPoints: string[];
}

export interface RoomInquiry {
  name: string;
  checkIn: string;
  checkOut: string;
  roomId: RoomId;
  guests: number;
  notes?: string;
}

export interface MealPreOrder {
  name: string;
  date: string;
  time: string;
  guests: number;
  dishes: string[];
  notes?: string;
}

export interface DolphinTourBooking {
  name: string;
  date: string;
  departure: "sunrise" | "later-morning";
  guests: number;
  notes?: string;
}

export interface DolphinTourReservation {
  date: string;
  guests: number;
  breakfast: boolean;
}

export interface BookingInquiry {
  type: InquiryType;
  room?: RoomInquiry;
  meal?: MealPreOrder;
  tour?: DolphinTourBooking;
}

export interface InquiryResult {
  success: boolean;
  type: InquiryType;
  reference: string;
  whatsappUrl: string;
  message: string;
}
