import { ExperiencesSection } from "@/components/ExperiencesSection";
import { FamilyStory } from "@/components/FamilyStory";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HouseRulesFaq } from "@/components/HouseRulesFaq";
import { JsonLd } from "@/components/JsonLd";
import { MenuShowcase } from "@/components/MenuShowcase";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ReviewsHub } from "@/components/ReviewsHub";
import { RoomsSection } from "@/components/RoomsSection";
import { TrustBar } from "@/components/TrustBar";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <TrustBar />
      <FamilyStory />
      <RoomsSection />
      <MenuShowcase />
      <ExperiencesSection />
      <PhotoGallery />
      <ReviewsHub />
      <HouseRulesFaq />
      <FinalCta />
    </>
  );
}
