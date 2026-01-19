import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ExternalLink, Sparkles, Ticket, Map, X, Navigation, Clock, DollarSign, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ThemePark {
  id: number;
  name: string;
  location: string;
  region: string;
  rating: number;
  image: string;
  color: string;
  description: string;
  link: string;
  mapImage: string;
  hours: string;
  ticketPrice: string;
  highlights: string[];
}

const themeParks: ThemePark[] = [
  // Orlando, Florida Parks
  {
    id: 1,
    name: "Magic Kingdom",
    location: "Orlando, Florida",
    region: "orlando",
    rating: 4.9,
    image: "🏰",
    color: "from-blue-500 to-purple-600",
    description: "The most magical place on Earth featuring Cinderella Castle and classic Disney attractions.",
    link: "https://disneyworld.disney.go.com/destinations/magic-kingdom/",
    mapImage: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/destinations/magic-kingdom/background/mk-background-cinderella-castle.jpg",
    hours: "9:00 AM - 10:00 PM",
    ticketPrice: "$109+",
    highlights: ["Cinderella Castle", "Space Mountain", "Pirates of the Caribbean", "Haunted Mansion"],
  },
  {
    id: 2,
    name: "EPCOT",
    location: "Orlando, Florida",
    region: "orlando",
    rating: 4.8,
    image: "🌐",
    color: "from-teal-500 to-cyan-500",
    description: "Explore future technologies and world cultures in this unique Disney park.",
    link: "https://disneyworld.disney.go.com/destinations/epcot/",
    mapImage: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/destinations/epcot/background/epcot-background.jpg",
    hours: "9:00 AM - 9:00 PM",
    ticketPrice: "$109+",
    highlights: ["Spaceship Earth", "World Showcase", "Guardians of the Galaxy", "Test Track"],
  },
  {
    id: 3,
    name: "Hollywood Studios",
    location: "Orlando, Florida",
    region: "orlando",
    rating: 4.8,
    image: "🎬",
    color: "from-red-500 to-pink-500",
    description: "Step into the movies with thrilling attractions and live entertainment.",
    link: "https://disneyworld.disney.go.com/destinations/hollywood-studios/",
    mapImage: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/destinations/hollywood-studios/background/hs-background.jpg",
    hours: "8:30 AM - 9:00 PM",
    ticketPrice: "$109+",
    highlights: ["Star Wars: Galaxy's Edge", "Tower of Terror", "Toy Story Land", "Rock 'n' Roller Coaster"],
  },
  {
    id: 4,
    name: "Animal Kingdom",
    location: "Orlando, Florida",
    region: "orlando",
    rating: 4.7,
    image: "🦁",
    color: "from-green-500 to-emerald-600",
    description: "Experience nature and adventure in Disney's largest theme park.",
    link: "https://disneyworld.disney.go.com/destinations/animal-kingdom/",
    mapImage: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/destinations/animal-kingdom/background/ak-background.jpg",
    hours: "8:00 AM - 7:00 PM",
    ticketPrice: "$109+",
    highlights: ["Pandora - Avatar", "Kilimanjaro Safaris", "Expedition Everest", "Tree of Life"],
  },
  {
    id: 5,
    name: "Universal Studios Florida",
    location: "Orlando, Florida",
    region: "orlando",
    rating: 4.8,
    image: "🎥",
    color: "from-yellow-500 to-orange-500",
    description: "Ride the movies at this action-packed theme park featuring iconic franchises.",
    link: "https://www.universalorlando.com/web/en/us/theme-parks/universal-studios-florida/",
    mapImage: "https://www.universalorlando.com/webdata/k2/en/us/files/Images/gds/usf-702x0.jpg",
    hours: "9:00 AM - 10:00 PM",
    ticketPrice: "$119+",
    highlights: ["Hagrid's Motorbike Adventure", "Revenge of the Mummy", "Men in Black", "The Simpsons Ride"],
  },
  {
    id: 6,
    name: "Islands of Adventure",
    location: "Orlando, Florida",
    region: "orlando",
    rating: 4.9,
    image: "🦖",
    color: "from-emerald-500 to-green-600",
    description: "Epic adventures await with world-class thrill rides and immersive lands.",
    link: "https://www.universalorlando.com/web/en/us/theme-parks/islands-of-adventure/",
    mapImage: "https://www.universalorlando.com/webdata/k2/en/us/files/Images/gds/ioa-702x0.jpg",
    hours: "9:00 AM - 9:00 PM",
    ticketPrice: "$119+",
    highlights: ["Hagrid's Magical Creatures", "Velocicoaster", "The Hulk", "Jurassic World"],
  },
  {
    id: 7,
    name: "SeaWorld Orlando",
    location: "Orlando, Florida",
    region: "orlando",
    rating: 4.5,
    image: "🐬",
    color: "from-blue-500 to-sky-500",
    description: "Marine life adventures with world-class coasters and animal encounters.",
    link: "https://seaworld.com/orlando/",
    mapImage: "https://seaworld.com/orlando/-/media/seaworld-orlando/images/hero/swc-hero-mako.ashx",
    hours: "10:00 AM - 6:00 PM",
    ticketPrice: "$99+",
    highlights: ["Mako", "Kraken", "Journey to Atlantis", "Antarctica"],
  },
  {
    id: 8,
    name: "LEGOLAND Florida",
    location: "Winter Haven, Florida",
    region: "orlando",
    rating: 4.6,
    image: "🧱",
    color: "from-red-500 to-yellow-500",
    description: "The ultimate LEGO experience with over 50 rides and attractions.",
    link: "https://www.legoland.com/florida/",
    mapImage: "https://www.legoland.com/florida/-/media/legoland-florida/images/hero/llf-hero.ashx",
    hours: "10:00 AM - 6:00 PM",
    ticketPrice: "$104+",
    highlights: ["The Dragon", "LEGO Movie World", "Miniland USA", "Pirate River Quest"],
  },
  // California Parks
  {
    id: 9,
    name: "Disneyland",
    location: "Anaheim, California",
    region: "california",
    rating: 4.9,
    image: "✨",
    color: "from-purple-500 to-pink-500",
    description: "The original Disneyland where it all started, Walt's dream come true.",
    link: "https://disneyland.disney.go.com/",
    mapImage: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/disneyland/home/destination/dlr-background-sleeping-beauty-castle.jpg",
    hours: "8:00 AM - 12:00 AM",
    ticketPrice: "$104+",
    highlights: ["Sleeping Beauty Castle", "Matterhorn", "Indiana Jones", "Star Wars: Galaxy's Edge"],
  },
  {
    id: 10,
    name: "Universal Studios Hollywood",
    location: "Los Angeles, California",
    region: "california",
    rating: 4.7,
    image: "🎬",
    color: "from-amber-500 to-orange-600",
    description: "Where movies come to life with studio tours and thrilling attractions.",
    link: "https://www.universalstudioshollywood.com/",
    mapImage: "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/Images/gds/ush-702x0.jpg",
    hours: "9:00 AM - 10:00 PM",
    ticketPrice: "$109+",
    highlights: ["Studio Tour", "Super Nintendo World", "Jurassic World", "Harry Potter"],
  },
  {
    id: 11,
    name: "Six Flags Magic Mountain",
    location: "Valencia, California",
    region: "california",
    rating: 4.6,
    image: "🎢",
    color: "from-red-600 to-orange-500",
    description: "The thrill capital of the world with 20 roller coasters!",
    link: "https://www.sixflags.com/magicmountain",
    mapImage: "https://www.sixflags.com/sites/default/files/styles/hero_image_mobile/public/sfmm-x2-hero.jpg",
    hours: "10:30 AM - 10:00 PM",
    ticketPrice: "$89+",
    highlights: ["X2", "Twisted Colossus", "Full Throttle", "Goliath"],
  },
  // International Parks
  {
    id: 12,
    name: "Tokyo DisneySea",
    location: "Tokyo, Japan",
    region: "asia",
    rating: 4.9,
    image: "⛵",
    color: "from-cyan-500 to-blue-600",
    description: "A nautical-themed masterpiece with attractions you won't find anywhere else.",
    link: "https://www.tokyodisneyresort.jp/en/tds/",
    mapImage: "https://www.tokyodisneyresort.jp/en/tds/attraction/images/tds_att_mv.jpg",
    hours: "8:00 AM - 10:00 PM",
    ticketPrice: "¥7,900+",
    highlights: ["Journey to the Center of the Earth", "Tower of Terror", "Soaring", "Fantasy Springs"],
  },
  {
    id: 13,
    name: "Tokyo Disneyland",
    location: "Tokyo, Japan",
    region: "asia",
    rating: 4.9,
    image: "🏯",
    color: "from-pink-500 to-purple-500",
    description: "Classic Disney magic with a Japanese twist and impeccable attention to detail.",
    link: "https://www.tokyodisneyresort.jp/en/tdl/",
    mapImage: "https://www.tokyodisneyresort.jp/en/tdl/attraction/images/tdl_att_mv.jpg",
    hours: "8:00 AM - 10:00 PM",
    ticketPrice: "¥7,900+",
    highlights: ["Enchanted Tale of Beauty and the Beast", "Space Mountain", "Splash Mountain", "Big Thunder Mountain"],
  },
  {
    id: 14,
    name: "Universal Studios Japan",
    location: "Osaka, Japan",
    region: "asia",
    rating: 4.8,
    image: "🎌",
    color: "from-red-500 to-pink-600",
    description: "Experience Super Nintendo World and amazing Japanese-exclusive attractions.",
    link: "https://www.usj.co.jp/web/en/us",
    mapImage: "https://www.usj.co.jp/webdata/svgc/en/us/files/Images/usj-area-mario-world.jpg",
    hours: "9:00 AM - 9:00 PM",
    ticketPrice: "¥8,600+",
    highlights: ["Super Nintendo World", "Harry Potter", "Attack on Titan", "Jaws"],
  },
  {
    id: 15,
    name: "Hong Kong Disneyland",
    location: "Hong Kong",
    region: "asia",
    rating: 4.6,
    image: "🐲",
    color: "from-rose-500 to-red-500",
    description: "Compact Disney magic with unique attractions celebrating Chinese culture.",
    link: "https://www.hongkongdisneyland.com/",
    mapImage: "https://www.hongkongdisneyland.com/content/dam/hkdl/images/backgrounds/castle-of-magical-dreams-bg.jpg",
    hours: "10:30 AM - 8:30 PM",
    ticketPrice: "HK$639+",
    highlights: ["Mystic Manor", "Big Grizzly Mountain", "Iron Man Experience", "Frozen Ever After"],
  },
  {
    id: 16,
    name: "Shanghai Disneyland",
    location: "Shanghai, China",
    region: "asia",
    rating: 4.7,
    image: "🌸",
    color: "from-fuchsia-500 to-purple-600",
    description: "The newest and largest Disney castle with TRON Lightcycle Power Run.",
    link: "https://www.shanghaidisneyresort.com/",
    mapImage: "https://www.shanghaidisneyresort.com/content/dam/shdl/parks-and-tickets/backgrounds/enchanted-storybook-castle-background.jpg",
    hours: "8:30 AM - 8:30 PM",
    ticketPrice: "¥475+",
    highlights: ["TRON Lightcycle", "Pirates of the Caribbean", "Enchanted Storybook Castle", "Toy Story Land"],
  },
  // Europe Parks
  {
    id: 17,
    name: "Disneyland Paris",
    location: "Paris, France",
    region: "europe",
    rating: 4.7,
    image: "🗼",
    color: "from-pink-400 to-rose-500",
    description: "Disney magic with European elegance and the beautiful Sleeping Beauty Castle.",
    link: "https://www.disneylandparis.com/",
    mapImage: "https://www.disneylandparis.com/en-int/-/media/dlp/dlp-website/content/parks-and-experiences/disneyland-park/disneyland-paris-sleeping-beauty-castle.jpg",
    hours: "9:30 AM - 11:00 PM",
    ticketPrice: "€62+",
    highlights: ["Sleeping Beauty Castle", "Big Thunder Mountain", "Phantom Manor", "Hyperspace Mountain"],
  },
  {
    id: 18,
    name: "Europa-Park",
    location: "Rust, Germany",
    region: "europe",
    rating: 4.8,
    image: "🎡",
    color: "from-green-500 to-teal-500",
    description: "Europe's #2 theme park with 15 themed areas representing European countries.",
    link: "https://www.europapark.de/en",
    mapImage: "https://www.europapark.de/sites/default/files/styles/hero/public/2023-03/europapark-silver-star.jpg",
    hours: "9:00 AM - 6:00 PM",
    ticketPrice: "€62+",
    highlights: ["Silver Star", "Blue Fire", "Wodan", "Voletarium"],
  },
  {
    id: 19,
    name: "PortAventura World",
    location: "Salou, Spain",
    region: "europe",
    rating: 4.6,
    image: "🌴",
    color: "from-orange-500 to-red-500",
    description: "Spain's largest theme park with Ferrari Land and water park included.",
    link: "https://www.portaventuraworld.com/en",
    mapImage: "https://www.portaventuraworld.com/sites/default/files/styles/hero/public/2023-03/shambhala.jpg",
    hours: "10:00 AM - 11:00 PM",
    ticketPrice: "€55+",
    highlights: ["Shambhala", "Dragon Khan", "Red Force", "Hurakan Condor"],
  },
  {
    id: 20,
    name: "Alton Towers",
    location: "Staffordshire, UK",
    region: "europe",
    rating: 4.5,
    image: "🎪",
    color: "from-purple-600 to-indigo-600",
    description: "Britain's most iconic theme park set in stunning historic grounds.",
    link: "https://www.altontowers.com/",
    mapImage: "https://www.altontowers.com/media/4578/the-smiler-wide.jpg",
    hours: "10:00 AM - 5:00 PM",
    ticketPrice: "£37+",
    highlights: ["The Smiler", "Nemesis", "Oblivion", "Wicker Man"],
  },
];

const regions = [
  { id: "all", label: "All Parks", emoji: "🌍" },
  { id: "orlando", label: "Orlando", emoji: "🌴" },
  { id: "california", label: "California", emoji: "☀️" },
  { id: "asia", label: "Asia", emoji: "🏯" },
  { id: "europe", label: "Europe", emoji: "🏰" },
];

export const ThemeParkExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPark, setSelectedPark] = useState<ThemePark | null>(null);

  const filteredParks = selectedRegion === "all" 
    ? themeParks 
    : themeParks.filter(park => park.region === selectedRegion);

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
            Discover {themeParks.length} incredible theme parks from around the world and plan your next adventure!
          </p>
        </motion.div>

        {/* Region Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {regions.map((region) => (
            <motion.button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-display font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                selectedRegion === region.id
                  ? "bg-primary text-primary-foreground shadow-playful"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>{region.emoji}</span>
              {region.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Parks Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredParks.map((park, index) => (
              <motion.div
                key={park.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 h-full flex flex-col">
                  <div className={`h-36 bg-gradient-to-br ${park.color} flex items-center justify-center relative`}>
                    <motion.span
                      className="text-6xl"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {park.image}
                    </motion.span>
                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="font-bold text-xs">{park.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold mb-1 line-clamp-1">{park.name}</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{park.location}</span>
                    </div>
                    <p className="text-muted-foreground text-xs mb-4 line-clamp-2 flex-1">{park.description}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => setSelectedPark(park)}
                      >
                        <Map className="w-3 h-3 mr-1" />
                        View Map
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={park.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Showing {filteredParks.length} of {themeParks.length} parks
          </p>
        </motion.div>
      </div>

      {/* Park Details Modal with Interactive Map */}
      <Dialog open={!!selectedPark} onOpenChange={() => setSelectedPark(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPark && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 font-display text-2xl">
                  <span className="text-3xl">{selectedPark.image}</span>
                  {selectedPark.name}
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="map" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="map" className="font-display">
                    <Map className="w-4 h-4 mr-2" />
                    Park Map
                  </TabsTrigger>
                  <TabsTrigger value="info" className="font-display">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Info
                  </TabsTrigger>
                  <TabsTrigger value="highlights" className="font-display">
                    <Star className="w-4 h-4 mr-2" />
                    Highlights
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="map" className="mt-4">
                  <div className="rounded-2xl overflow-hidden border border-border">
                    {/* Interactive Map Placeholder - Google Maps Embed */}
                    <div className="aspect-video bg-muted relative">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(selectedPark.name + " " + selectedPark.location)}&zoom=15&maptype=satellite`}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="p-4 bg-muted/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Navigation className="w-4 h-4 text-primary" />
                        <span>{selectedPark.location}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Click and drag to explore the park area. Use satellite view for best experience.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="info" className="mt-4">
                  <div className={`rounded-2xl bg-gradient-to-br ${selectedPark.color} p-6 text-white mb-4`}>
                    <p className="text-lg">{selectedPark.description}</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Park Hours</p>
                        <p className="font-semibold">{selectedPark.hours}</p>
                      </div>
                    </div>
                    <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ticket Price</p>
                        <p className="font-semibold">{selectedPark.ticketPrice}</p>
                      </div>
                    </div>
                    <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Star className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="font-semibold">{selectedPark.rating} / 5.0</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="highlights" className="mt-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedPark.highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-muted rounded-xl p-4 flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedPark.color} flex items-center justify-center text-white font-bold text-sm`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1" asChild>
                  <a href={selectedPark.link} target="_blank" rel="noopener noreferrer">
                    <Ticket className="w-4 h-4 mr-2" />
                    Buy Tickets
                  </a>
                </Button>
                <Button variant="outline" className="flex-1">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Add to Trip
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
