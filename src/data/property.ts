import type { Property } from "@/types";
import { images } from "./images";

const mapsQuery =
  "Maduka Restaurant, Ilandaiyadi, Kalpitiya, Sri Lanka";

export const property: Property = {
  name: "Maduka Restaurant & Rooms",
  shortName: "Maduka",
  tagline:
    "A family-run beachfront restaurant and two-room hideaway on the sands of Ilandaiyadi.",
  description:
    "Maduka and Nissansala welcome you to a quiet stretch of private beach between Puttalam and Kalpitiya. Two timber rooms sit on the sand, the restaurant opens straight onto the ocean, and the family's fishing boats land the day's catch a few steps from your table.",
  address: {
    line1: "Off Kalpitiya Road",
    line2: "Maduka Restaurant",
    village: "Ilandaiyadi",
    region: "Kalpitiya",
    postalCode: "24235",
    country: "Sri Lanka",
    full: "Off Kalpitiya Road, 24235 Ilandaiyadi, Kalpitiya, Sri Lanka",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(
      mapsQuery,
    )}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
  },
  phoneDisplay: "+94 72 961 4412",
  phoneHref: "tel:+94729614412",
  whatsappNumber: "94729614412",
  languages: ["English"],
  checkIn: "1:00 PM – 12:00 AM",
  checkOut: "12:00 AM – 12:00 PM",
  payment: {
    rooms: "Cash only for rooms",
    restaurant: "Credit cards accepted at the restaurant",
  },
  ratings: {
    booking: {
      score: 10,
      maxScore: 10,
      label: "Exceptional",
      count: 20,
      couplesLocation: 10,
    },
    tripadvisor: {
      score: 5,
      maxScore: 5,
      label: "Excellent",
      count: 21,
      photos: 43,
    },
  },
  hosts: [
    {
      name: "Maduka",
      role: "Host, dolphin guide & the person to message",
      shortRole: "Your host",
      bio: "Maduka grew up on this stretch of coast and runs the place with an easy, generous kind of hospitality. He arranges private spinner dolphin trips from the family beach, sorts scooters and tuk-tuks, and answers every question personally on WhatsApp.",
      image: images.madukaWithGuests,
      imagePosition: "center 35%",
      quote: "Every guest, a friend of the family.",
    },
    {
      name: "Nissansala",
      role: "Chef, recipe keeper & cooking teacher",
      shortRole: "The kitchen",
      bio: "Nissansala is the reason people write home about the food. Her rice-and-curry table is built from family recipes and cooked from scratch each day—sweet-and-sour pineapple, pumpkin, aubergine, daal, green beans, cabbage and popadoms, with the lagoon's crab and the morning's fish when they arrive.",
      image: images.crabCurryFeast,
      imagePosition: "center",
      quote: "Spices first. Everything else follows.",
    },
    {
      name: "Maduka's father",
      role: "Fisherman, boatman & maker of the house cocktails",
      shortRole: "The sea",
      bio: "A veteran local fisherman, he lands the catch in front of the restaurant and drives the boat on the family's private dolphin tours. He also ferments the fruit and ingredients behind the homemade cocktails that guests remember long after the last glass.",
      image: images.fishermenAtDusk,
      imagePosition: "center",
      quote: "Out with the boats, home with the catch.",
    },
  ],
  houseRules: [
    {
      label: "Payment",
      value:
        "Cash only for the rooms. Credit cards are accepted at the restaurant.",
      icon: "cash",
    },
    {
      label: "Children",
      value:
        "All ages are welcome. Guests aged 11 and above are charged as adults. Cribs and extra beds are not available.",
      icon: "children",
    },
    {
      label: "Pets",
      value: "Pets are allowed on request, free of charge.",
      icon: "pets",
    },
    {
      label: "Smoking",
      value: "Rooms are non-smoking. The restaurant and beach are open-air.",
      icon: "smoking",
    },
    {
      label: "Cancellation",
      value:
        "Cancellation and prepayment terms vary by room type and dates. Message the family for the current policy.",
      icon: "cancel",
    },
    {
      label: "Parking",
      value:
        "Free public on-site parking for cars, bikes and tuk-tuks. No reservation needed.",
      icon: "parking",
    },
    {
      label: "Check-in window",
      value: "From 1:00 PM until 12:00 AM.",
      icon: "clock",
    },
  ],
  faqs: [
    {
      question: "What type of room can I book?",
      answer:
        "There are two double rooms: the Double Room with Sea View, a timber chalet set directly on the sand, and the Double Room with Private Bathroom, a garden room with its open-air bathroom under the coconut trees. Both sleep two guests and have a private bathroom, terrace and outdoor furniture.",
    },
    {
      question: "What are the check-in and check-out times?",
      answer:
        "Check-in is from 1:00 PM to 12:00 AM. Check-out is from 12:00 AM to 12:00 PM. If your train or taxi is running late, message Maduka on WhatsApp and he will guide you.",
    },
    {
      question: "How much does a room cost?",
      answer:
        "The most recently recorded sample rate for the Double Room with Sea View is LKR 9,468 per night. Rates vary with dates and season, and the private-bathroom room is quoted on inquiry. Message the family for a live price—there are no booking-platform fees when you book direct.",
    },
    {
      question: "Is the restaurant open to non-residents?",
      answer:
        "Yes. Maduka Restaurant serves breakfast, brunch, lunch, dinner and drinks to guests and visitors. Vegetarian and vegan options are available across the menu, and the kitchen is happy to adjust the spice level.",
    },
    {
      question: "Do I need to pre-order food?",
      answer:
        "It is strongly recommended. Nissansala cooks every curry from scratch, often starting at 2:00 PM for dinner. Send a WhatsApp message with your time and any crab, fish or curry requests so the table is ready when you arrive.",
    },
    {
      question: "What activities can you arrange?",
      answer:
        "Private spinner dolphin boat tours with Maduka and his father, Sri Lankan cooking classes with Nissansala, fishing trips and scooter rental. Windsurfing and kitesurfing can be arranged off-site, and the family can point you toward Bar Reef snorkelling and Wilpattu safari operators.",
    },
    {
      question: "How far is the property from town and the airport?",
      answer:
        "The centre of Ilandaiyadi is 500 m away. Bandaranaike International Airport is 68 miles from the property. Lake Pal Kulam is 6 km inland. Message the family for the easiest route and a trusted local driver.",
    },
    {
      question: "Is parking available?",
      answer:
        "Yes—free public on-site parking for cars, motorbikes and tuk-tuks, with no reservation required. The beach road is quiet and the family will show you where to leave your vehicle.",
    },
    {
      question: "Are children and pets welcome?",
      answer:
        "Children of all ages are welcome and guests aged 11 and above are charged as adults. Cribs and extra beds are not available. Pets are allowed on request with no extra charge.",
    },
    {
      question: "How do I pay?",
      answer:
        "Rooms are paid in cash. The restaurant accepts credit cards. It is worth carrying some Sri Lankan rupees for smaller local purchases and tips.",
    },
  ],
  nearby: [
    {
      name: "Ilandaiyadi town centre",
      category: "Village",
      distance: "500 m",
      description:
        "The nearest shops and the heart of this traditional fishing village, a short walk or tuk-tuk from the gate.",
      icon: "scooter",
    },
    {
      name: "Lake Pal Kulam",
      category: "Nature",
      distance: "6 km",
      description:
        "A quiet inland lagoon just off the peninsula road—an easy detour for a different view of the landscape.",
      icon: "lagoon",
    },
    {
      name: "Siebels Sea Foods Restaurant",
      category: "Dining",
      distance: "18 km",
      description:
        "A well-known seafood stop further up the coast, if you feel like exploring beyond Ilandaiyadi.",
      icon: "cooking",
    },
    {
      name: "Playground Karamba",
      category: "Recreation",
      distance: "13 km",
      description:
        "A local recreation ground and a useful landmark when you are exploring the peninsula by scooter.",
      icon: "safari",
    },
  ],
  trustPoints: [
    "Private beach on site",
    "Only two rooms",
    "Family-run since 2020",
    "Vegetarian & vegan friendly",
  ],
};

export const contactLinks = {
  whatsapp: `https://wa.me/${property.whatsappNumber}`,
  phone: property.phoneHref,
  maps: property.address.mapsUrl,
} as const;
