import { motion } from "framer-motion";
import { Plane, Map, Calculator, Sparkles, Trophy, Globe } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { icon: Globe, label: "Explore", href: "#explore" },
  { icon: Calculator, label: "Calculator", href: "#calculator" },
  { icon: Map, label: "Theme Parks", href: "#parks" },
  { icon: Plane, label: "Book", href: "#book" },
  { icon: Sparkles, label: "Itinerary", href: "#itinerary" },
];

export const Navigation = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-card"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 bg-gradient-sunset rounded-xl flex items-center justify-center shadow-playful">
            <Globe className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-gradient-sunset">
            Travel Global
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-2 rounded-xl font-display font-semibold text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200 flex items-center gap-2"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-xl"
          >
            <Trophy className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-accent">1,250 pts</span>
          </motion.div>
          <Button variant="hero" size="lg">
            Start Adventure
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
