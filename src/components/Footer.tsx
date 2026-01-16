import { motion } from "framer-motion";
import { Globe, Heart, Plane, MapPin, Mail, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-sunset rounded-xl flex items-center justify-center shadow-playful">
                <Globe className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold">Travel Global</span>
            </motion.div>
            <p className="text-background/70 mb-6 max-w-md">
              Making trip planning feel like an adventure! Explore the world, collect rewards, 
              and create unforgettable memories with our playful travel platform.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-xl flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              {["Destinations", "Theme Parks", "Cruises", "Flights", "Hotels"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {["Trip Calculator", "Itinerary Builder", "Travel Guides", "Rewards Program", "Help Center"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2024 Travel Global. All rights reserved.
          </p>
          <p className="text-background/60 text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for adventurers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
