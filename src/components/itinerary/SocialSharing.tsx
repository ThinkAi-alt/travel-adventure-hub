import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2, Copy, Check, Download, Globe2, Heart,
  MapPin, Calendar, Users, Sparkles, ExternalLink, Star
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ItineraryItem } from "./types";
import { toast } from "sonner";

// Mock community trips
const communityTrips = [
  {
    id: "c1",
    title: "European Theme Park Tour",
    author: "Sarah K.",
    avatar: "🧑‍🦰",
    destinations: ["Disneyland Paris", "Europa-Park", "Barcelona"],
    days: 10,
    likes: 234,
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400",
  },
  {
    id: "c2",
    title: "Asian Adventure",
    author: "Mike T.",
    avatar: "👨",
    destinations: ["Tokyo", "Tokyo DisneySea", "Singapore"],
    days: 14,
    likes: 189,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
  },
  {
    id: "c3",
    title: "Ancient Wonders",
    author: "Emma L.",
    avatar: "👩",
    destinations: ["Pyramids of Giza", "Machu Picchu", "Great Wall of China"],
    days: 18,
    likes: 312,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400",
  },
  {
    id: "c4",
    title: "Mediterranean Dream",
    author: "Alex R.",
    avatar: "🧑",
    destinations: ["Santorini", "Barcelona Port", "Paris"],
    days: 12,
    likes: 156,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400",
  },
];

interface SocialSharingProps {
  items: ItineraryItem[];
}

export const SocialSharing = ({ items }: SocialSharingProps) => {
  const [copied, setCopied] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [likedTrips, setLikedTrips] = useState<Set<string>>(new Set());

  const generateShareText = () => {
    if (items.length === 0) return "";
    const destinations = items.map(i => `📍 ${i.name} (${i.country})`).join("\n");
    const countries = [...new Set(items.map(i => i.country))].length;
    const days = items.reduce((s, i) => s + (i.days || 2), 0);
    return `✈️ My Travel Global Trip!\n\n${destinations}\n\n🌍 ${countries} countries • 📅 ${days} days\n\nPlan yours at travelglobal.lovable.app`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateShareText());
    setCopied(true);
    toast.success("Trip copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCard = () => {
    toast.success("Trip card saved! 🎨", {
      description: "Your shareable trip card has been generated.",
    });
  };

  const toggleLike = (tripId: string) => {
    setLikedTrips(prev => {
      const next = new Set(prev);
      if (next.has(tripId)) {
        next.delete(tripId);
      } else {
        next.add(tripId);
        toast.success("Trip saved to inspiration! ❤️");
      }
      return next;
    });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-semibold text-primary mb-4">
            <Share2 className="w-4 h-4" />
            Share & Discover
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Share Your <span className="text-gradient-sunset">Adventure</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Share your trip with friends or get inspired by the community's favorite adventures.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Share Your Trip */}
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Your Trip Card
            </h3>

            {items.length === 0 ? (
              <Card className="p-8 text-center border-0 shadow-card">
                <Globe2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">
                  Add destinations to your trip to create a shareable card!
                </p>
              </Card>
            ) : (
              <>
                {/* Preview Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-0 shadow-hover">
                    <div className="relative h-40">
                      <div className="absolute inset-0 grid grid-cols-3">
                        {items.slice(0, 3).map((item, i) => (
                          <div key={item.id} className="relative overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            {i < 2 && <div className="absolute right-0 top-0 bottom-0 w-px bg-white/30" />}
                          </div>
                        ))}
                        {items.length < 3 &&
                          Array.from({ length: 3 - items.length }).map((_, i) => (
                            <div key={`p-${i}`} className="bg-muted flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-muted-foreground" />
                            </div>
                          ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-4 text-white">
                        <p className="font-display font-bold text-lg">My Dream Trip</p>
                        <div className="flex gap-2 text-xs opacity-80">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {items.length} stops
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe2 className="w-3 h-3" /> {[...new Set(items.map(i => i.country))].length} countries
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {items.reduce((s, i) => s + (i.days || 2), 0)} days
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {items.map(item => (
                          <Badge key={item.id} variant="secondary" className="text-xs">
                            {item.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="hero" className="flex-1" onClick={handleCopyLink}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied ? "Copied!" : "Copy Trip"}
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleDownloadCard}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </>
            )}
          </div>

          {/* Community Trips */}
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              Community Inspiration
            </h3>
            <div className="space-y-3">
              {communityTrips.map((trip, idx) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-3 border-0 shadow-card hover:shadow-hover transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-foreground text-sm truncate">{trip.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          by {trip.avatar} {trip.author} • {trip.days} days
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {trip.destinations.map(d => (
                            <span key={d} className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(trip.id);
                          }}
                          className="transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              likedTrips.has(trip.id) ? "fill-destructive text-destructive" : "text-muted-foreground hover:text-destructive"
                            }`}
                          />
                        </button>
                        <span className="text-xs text-muted-foreground font-semibold">
                          {trip.likes + (likedTrips.has(trip.id) ? 1 : 0)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
