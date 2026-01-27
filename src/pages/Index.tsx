import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TripCalculator } from "@/components/TripCalculator";
import { ThemeParkExplorer } from "@/components/ThemeParkExplorer";
import { BookingSection } from "@/components/BookingSection";
import { RestaurantsExperiences } from "@/components/RestaurantsExperiences";
import { GamificationBar } from "@/components/GamificationBar";
import { InteractiveGlobe } from "@/components/InteractiveGlobe";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GamificationBar />
      <InteractiveGlobe />
      <BookingSection />
      <TripCalculator />
      <ThemeParkExplorer />
      <RestaurantsExperiences />
      <Footer />
    </div>
  );
};

export default Index;