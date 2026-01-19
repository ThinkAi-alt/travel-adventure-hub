import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, Coffee, IceCream, Pizza, Wine, Salad,
  Camera, Bike, Music, Palette, Trees, Waves,
  MapPin, Star, Clock, DollarSign, ExternalLink, Map, Heart
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface Experience {
  id: number;
  name: string;
  category: string;
  type: "dining" | "experience";
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  priceLevel: number;
  hours: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
}

const experiences: Experience[] = [
  // Dining
  {
    id: 1,
    name: "The Magic Bistro",
    category: "fine-dining",
    type: "dining",
    location: "Orlando, Florida",
    coordinates: { lat: 28.3852, lng: -81.5639 },
    rating: 4.9,
    priceLevel: 4,
    hours: "5:00 PM - 11:00 PM",
    description: "Upscale dining with a magical atmosphere, serving creative cuisine inspired by fairy tales.",
    image: "🍽️",
    color: "from-purple-500 to-pink-500",
    tags: ["Romantic", "Special Occasion", "Award Winning"],
  },
  {
    id: 2,
    name: "Tropical Tiki Bar",
    category: "casual",
    type: "dining",
    location: "Miami Beach, Florida",
    coordinates: { lat: 25.7907, lng: -80.1300 },
    rating: 4.7,
    priceLevel: 2,
    hours: "11:00 AM - 2:00 AM",
    description: "Beachfront vibes with tropical cocktails and fresh seafood in a fun, laid-back setting.",
    image: "🍹",
    color: "from-orange-400 to-pink-500",
    tags: ["Beach View", "Live Music", "Happy Hour"],
  },
  {
    id: 3,
    name: "Gelato Paradiso",
    category: "desserts",
    type: "dining",
    location: "Las Vegas, Nevada",
    coordinates: { lat: 36.1147, lng: -115.1728 },
    rating: 4.8,
    priceLevel: 1,
    hours: "10:00 AM - 12:00 AM",
    description: "Authentic Italian gelato with over 50 flavors made fresh daily. A sweet paradise!",
    image: "🍨",
    color: "from-pink-400 to-purple-400",
    tags: ["Family Friendly", "Vegan Options", "Instagram Worthy"],
  },
  {
    id: 4,
    name: "Pizza Planet",
    category: "casual",
    type: "dining",
    location: "Anaheim, California",
    coordinates: { lat: 33.8121, lng: -117.9190 },
    rating: 4.6,
    priceLevel: 2,
    hours: "11:00 AM - 10:00 PM",
    description: "Out-of-this-world pizza with arcade games and space-themed decor. Kids love it!",
    image: "🍕",
    color: "from-red-500 to-orange-500",
    tags: ["Kid Friendly", "Arcade", "Themed"],
  },
  {
    id: 5,
    name: "Sakura Sushi",
    category: "fine-dining",
    type: "dining",
    location: "San Francisco, California",
    coordinates: { lat: 37.7849, lng: -122.4094 },
    rating: 4.9,
    priceLevel: 3,
    hours: "12:00 PM - 10:00 PM",
    description: "Premium omakase experience with the freshest fish flown in daily from Tokyo.",
    image: "🍣",
    color: "from-rose-400 to-red-500",
    tags: ["Omakase", "Sake Bar", "Chef's Table"],
  },
  {
    id: 6,
    name: "Café Wanderlust",
    category: "cafe",
    type: "dining",
    location: "Seattle, Washington",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    rating: 4.7,
    priceLevel: 2,
    hours: "6:00 AM - 8:00 PM",
    description: "Cozy coffee shop with world map decor, artisan pastries, and travel-inspired drinks.",
    image: "☕",
    color: "from-amber-500 to-orange-500",
    tags: ["WiFi", "Workspace", "Pastries"],
  },
  // Experiences
  {
    id: 7,
    name: "Sunset Kayak Tours",
    category: "adventure",
    type: "experience",
    location: "Key West, Florida",
    coordinates: { lat: 24.5551, lng: -81.7800 },
    rating: 4.9,
    priceLevel: 2,
    hours: "Tours at 5:00 PM",
    description: "Paddle through mangroves and witness the most stunning sunset from the water.",
    image: "🚣",
    color: "from-cyan-500 to-blue-500",
    tags: ["Sunset", "Nature", "Guided Tour"],
  },
  {
    id: 8,
    name: "Street Art Walking Tour",
    category: "culture",
    type: "experience",
    location: "Miami, Florida",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    rating: 4.8,
    priceLevel: 1,
    hours: "10:00 AM & 3:00 PM",
    description: "Explore Wynwood's vibrant murals with a local artist guide. Photo ops galore!",
    image: "🎨",
    color: "from-fuchsia-500 to-purple-500",
    tags: ["Walking", "Art", "Photo Tour"],
  },
  {
    id: 9,
    name: "Bike the Golden Gate",
    category: "adventure",
    type: "experience",
    location: "San Francisco, California",
    coordinates: { lat: 37.8199, lng: -122.4783 },
    rating: 4.8,
    priceLevel: 2,
    hours: "8:00 AM - 6:00 PM",
    description: "Rent a bike and cross the iconic Golden Gate Bridge, then ferry back from Sausalito.",
    image: "🚴",
    color: "from-orange-500 to-red-500",
    tags: ["Scenic", "Exercise", "Iconic"],
  },
  {
    id: 10,
    name: "Jazz & Blues Night",
    category: "entertainment",
    type: "experience",
    location: "New Orleans, Louisiana",
    coordinates: { lat: 29.9511, lng: -90.0715 },
    rating: 4.9,
    priceLevel: 2,
    hours: "8:00 PM - 2:00 AM",
    description: "Live jazz in an intimate venue with craft cocktails and the soul of New Orleans.",
    image: "🎷",
    color: "from-indigo-500 to-purple-600",
    tags: ["Live Music", "Cocktails", "Nightlife"],
  },
  {
    id: 11,
    name: "Rainforest Zip Line",
    category: "adventure",
    type: "experience",
    location: "Maui, Hawaii",
    coordinates: { lat: 20.7984, lng: -156.3319 },
    rating: 4.7,
    priceLevel: 3,
    hours: "8:00 AM - 4:00 PM",
    description: "Soar through lush Hawaiian rainforest on 7 zip lines with breathtaking views.",
    image: "🌴",
    color: "from-green-500 to-emerald-600",
    tags: ["Thrilling", "Nature", "Views"],
  },
  {
    id: 12,
    name: "Snorkel Paradise",
    category: "adventure",
    type: "experience",
    location: "Key Largo, Florida",
    coordinates: { lat: 25.0865, lng: -80.4473 },
    rating: 4.8,
    priceLevel: 2,
    hours: "9:00 AM - 4:00 PM",
    description: "Explore vibrant coral reefs and swim with tropical fish in crystal clear waters.",
    image: "🤿",
    color: "from-teal-500 to-cyan-500",
    tags: ["Marine Life", "Equipment Included", "Beginner Friendly"],
  },
];

const categories = [
  { id: "all", label: "All", emoji: "✨", icon: Star },
  { id: "dining", label: "Dining", emoji: "🍽️", icon: Utensils },
  { id: "experience", label: "Experiences", emoji: "🎯", icon: Camera },
];

const subcategories = {
  dining: [
    { id: "fine-dining", label: "Fine Dining", icon: Wine },
    { id: "casual", label: "Casual", icon: Pizza },
    { id: "cafe", label: "Cafés", icon: Coffee },
    { id: "desserts", label: "Desserts", icon: IceCream },
  ],
  experience: [
    { id: "adventure", label: "Adventure", icon: Waves },
    { id: "culture", label: "Culture", icon: Palette },
    { id: "entertainment", label: "Entertainment", icon: Music },
    { id: "nature", label: "Nature", icon: Trees },
  ],
};

export const RestaurantsExperiences = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<Experience | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredExperiences = experiences.filter((exp) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "dining") return exp.type === "dining";
    if (selectedCategory === "experience") return exp.type === "experience";
    return exp.category === selectedCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const renderPriceLevel = (level: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <DollarSign
        key={i}
        className={`w-3 h-3 ${i < level ? "text-success" : "text-muted-foreground/30"}`}
      />
    ));
  };

  return (
    <section id="experiences" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-semibold text-primary mb-4">
            <Utensils className="w-4 h-4" />
            Eat & Explore
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Delicious <span className="text-gradient-sunset">Dining</span> & Amazing{" "}
            <span className="text-gradient-ocean">Experiences</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the best restaurants, cafés, and unforgettable experiences at your destination
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-2xl font-display font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-playful"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Subcategory Pills */}
        <AnimatePresence mode="wait">
          {selectedCategory !== "all" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {subcategories[selectedCategory as keyof typeof subcategories]?.map((sub) => (
                <motion.button
                  key={sub.id}
                  onClick={() => setSelectedCategory(sub.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
                >
                  <sub.icon className="w-4 h-4" />
                  {sub.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Experience Cards Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 h-full flex flex-col group">
                  <div
                    className={`h-32 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <motion.span
                      className="text-5xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item.image}
                    </motion.span>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur flex items-center justify-center transition-transform hover:scale-110"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          favorites.includes(item.id)
                            ? "text-red-500 fill-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-card/90 backdrop-blur text-xs font-medium">
                      {item.type === "dining" ? "🍽️ Dining" : "🎯 Experience"}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-lg font-bold line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-bold">{item.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{item.location}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {renderPriceLevel(item.priceLevel)}
                    </div>

                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2 flex-1">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Map className="w-3 h-3 mr-1" />
                      View on Map
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mt-8"
        >
          Showing {filteredExperiences.length} of {experiences.length} places
        </motion.p>
      </div>

      {/* Detail Modal with Map */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 font-display text-2xl">
                  <span className="text-3xl">{selectedItem.image}</span>
                  {selectedItem.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Hero Gradient */}
                <div
                  className={`h-32 rounded-2xl bg-gradient-to-br ${selectedItem.color} flex items-center justify-center`}
                >
                  <motion.span
                    className="text-6xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {selectedItem.image}
                  </motion.span>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <Star className="w-5 h-5 text-accent fill-accent mx-auto mb-1" />
                    <p className="font-bold">{selectedItem.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <div className="flex justify-center mb-1">
                      {renderPriceLevel(selectedItem.priceLevel)}
                    </div>
                    <p className="font-bold">
                      {"$".repeat(selectedItem.priceLevel)}
                    </p>
                    <p className="text-xs text-muted-foreground">Price</p>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="font-bold text-xs">{selectedItem.hours.split(" - ")[0]}</p>
                    <p className="text-xs text-muted-foreground">Opens</p>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${selectedItem.color} text-white text-sm font-medium`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interactive Map */}
                <div className="rounded-2xl overflow-hidden border border-border">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      selectedItem.name + " " + selectedItem.location
                    )}&zoom=15`}
                    className="w-full h-64 border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="p-3 bg-muted/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{selectedItem.location}</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selectedItem.name + " " + selectedItem.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Open in Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Save to Trip
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
