import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TripCalculator } from "@/components/TripCalculator";
import { ThemeParkExplorer } from "@/components/ThemeParkExplorer";
import { BookingSection } from "@/components/BookingSection";
import { RestaurantsExperiences } from "@/components/RestaurantsExperiences";
import { GamificationBar } from "@/components/GamificationBar";
import { InteractiveGlobe } from "@/components/InteractiveGlobe";
import { BudgetEstimator } from "@/components/itinerary/BudgetEstimator";
import { TripTimeline } from "@/components/itinerary/TripTimeline";
import { SocialSharing } from "@/components/itinerary/SocialSharing";
import { Footer } from "@/components/Footer";
import { useItinerary } from "@/components/itinerary/useItinerary";

const Index = () => {
  const {
    items: itineraryItems,
    isPanelOpen,
    addLocation,
    removeLocation,
    reorderItems,
    clearAll,
    togglePanel,
  } = useItinerary();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GamificationBar />
      <InteractiveGlobe
        itineraryItems={itineraryItems}
        isPanelOpen={isPanelOpen}
        addLocation={addLocation}
        removeLocation={removeLocation}
        reorderItems={reorderItems}
        clearAll={clearAll}
        togglePanel={togglePanel}
      />
      <BudgetEstimator items={itineraryItems} />
      <TripTimeline items={itineraryItems} />
      <SocialSharing items={itineraryItems} />
      <BookingSection />
      <TripCalculator />
      <ThemeParkExplorer />
      <RestaurantsExperiences />
      <Footer />
    </div>
  );
};

export default Index;
