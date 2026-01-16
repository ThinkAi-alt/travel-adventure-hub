import { motion } from "framer-motion";
import { MapPin, Star, ExternalLink, Sparkles, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const themeParks = [
  {
    id: 1,
    name: "Walt Disney World",
    location: "Orlando, Florida",
    rating: 4.9,
    image: "🏰",
    color: "from-blue-500 to-purple-500",
    description: "The most magical place on Earth with 4 incredible theme parks.",
    link: "https://disneyworld.disney.go.com/",
  },
  {
    id: 2,
    name: "Universal Studios",
    location: "Hollywood, California",
    rating: 4.8,
    image: "🎬",
    color: "from-yellow-500 to-orange-500",
    description: "Where movies come to life with thrilling rides and attractions.",
    link: "https://www.universalstudioshollywood.com/",
  },
  {
    id: 3,
    name: "Tokyo DisneySea",
    location: "Tokyo, Japan",
    rating: 4.9,
    image: "⛵",
    color: "from-cyan-500 to-blue-500",
    description: "A nautical-themed park with unique attractions you won't find anywhere else.",
    link: "https://www.tokyodisneyresort.jp/",
  },
  {
    id: 4,
    name: "Europa-Park",
    location: "Rust, Germany",
    rating: 4.7,
    image: "🎢",
    color: "from-green-500 to-teal-500",
    description: "Europe's second most popular resort with themed areas from 15 countries.",
    link: "https://www.europapark.de/",
  },
  {
    id: 5,
    name: "Disneyland Paris",
    location: "Paris, France",
    rating: 4.6,
    image: "✨",
    color: "from-pink-500 to-rose-500",
    description: "Disney magic with a touch of European elegance and charm.",
    link: "https://www.disneylandparis.com/",
  },
  {
    id: 6,
    name: "Universal Beijing",
    location: "Beijing, China",
    rating: 4.8,
    image: "🐉",
    color: "from-red-500 to-orange-500",
    description: "The newest Universal park featuring Kung Fu Panda land.",
    link: "https://www.universalbeijingresort.com/",
  },
];

export const ThemeParkExplorer = () => {
  return (
    <section id="parks" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full text-sm font-semibold text-secondary mb-4">
            <Ticket className="w-4 h-4" />
            Theme Park Explorer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Magical <span className="text-gradient-sunset">Theme Parks</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover the world's most incredible theme parks and plan your next adventure!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themeParks.map((park, index) => (
            <motion.div
              key={park.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 h-full">
                <div className={`h-40 bg-gradient-to-br ${park.color} flex items-center justify-center relative`}>
                  <motion.span
                    className="text-7xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {park.image}
                  </motion.span>
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-bold text-sm">{park.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-2">{park.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{park.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{park.description}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1">
                      <Sparkles className="w-4 h-4" />
                      Add to Trip
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={park.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="xl">
            <MapPin className="w-5 h-5" />
            Explore All Parks
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
