import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TripCalculator } from "@/components/TripCalculator";
import { ThemeParkExplorer } from "@/components/ThemeParkExplorer";
import { DestinationCards } from "@/components/DestinationCards";
import { GamificationBar } from "@/components/GamificationBar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GamificationBar />
      <DestinationCards />
      <TripCalculator />
      <ThemeParkExplorer />
      <Footer />
    </div>
  );
};

export default Index;