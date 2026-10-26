import { images } from "@/data/images";
import { property } from "@/data/property";
import { siteUrl } from "@/lib/site";

export function JsonLd() {
  const restaurantId = `${siteUrl}/#restaurant`;
  const roomsId = `${siteUrl}/#rooms`;
  const faqId = `${siteUrl}/#faq`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": restaurantId,
        name: property.name,
        description: property.description,
        url: siteUrl,
        telephone: property.phoneDisplay,
        image: [
          `${siteUrl}${images.heroDuskBeach.src}`,
          `${siteUrl}${images.crabCurryFeast.src}`,
          `${siteUrl}${images.beachDiningSunset.src}`,
        ],
        servesCuisine: ["Sri Lankan", "Seafood", "Vegetarian", "Vegan"],
        currenciesAccepted: "LKR",
        paymentAccepted: "Cash, Credit Card",
        acceptsReservations: true,
        hasMap: property.address.mapsUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${property.address.line1}, ${property.address.line2}`,
          addressLocality: property.address.village,
          addressRegion: property.address.region,
          postalCode: property.address.postalCode,
          addressCountry: "LK",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: property.ratings.tripadvisor.score,
          bestRating: property.ratings.tripadvisor.maxScore,
          reviewCount: property.ratings.tripadvisor.count,
        },
        amenityFeature: property.trustPoints.map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
      },
      {
        "@type": "LodgingBusiness",
        "@id": roomsId,
        name: property.name,
        description:
          "Two timber double rooms on a private beach in Ilandaiyadi, Kalpitiya, hosted by the family who owns the land. Private terraces, sea or garden views and direct beach access.",
        url: siteUrl,
        telephone: property.phoneDisplay,
        image: [
          `${siteUrl}${images.roomSeaViewChalet.src}`,
          `${siteUrl}${images.roomGardenBed.src}`,
          `${siteUrl}${images.chaletAtDusk.src}`,
        ],
        numberOfRooms: 2,
        checkinTime: "13:00",
        checkoutTime: "12:00",
        petsAllowed: true,
        currenciesAccepted: "LKR",
        paymentAccepted: "Cash",
        hasMap: property.address.mapsUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${property.address.line1}, ${property.address.line2}`,
          addressLocality: property.address.village,
          addressRegion: property.address.region,
          postalCode: property.address.postalCode,
          addressCountry: "LK",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: property.ratings.booking.score,
          bestRating: property.ratings.booking.maxScore,
          reviewCount: property.ratings.booking.count,
        },
        amenityFeature: [
          "Private beach access",
          "Free WiFi",
          "Free on-site parking",
          "Private terrace",
          "Pets allowed",
        ].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: property.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
