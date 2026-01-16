import { motion } from "framer-motion";
import { MapPin, Utensils, Camera, Anchor, Plane, Star } from "lucide-react";
import { Button } from "./ui/button";

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    emoji: "🗼",
    activities: ["Eiffel Tower", "Louvre", "Seine Cruise"],
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    emoji: "🗾",
    activities: ["Shibuya Crossing", "Mt. Fuji", "Sushi Tour"],
    gradient: "from-red-400 to-orange-500",
  },
  {
    id: 3,
    name: "Maldives",
    country: "Indian Ocean",
    emoji: "🏝️",
    activities: ["Overwater Villa", "Diving", "Sunset Cruise"],
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: 4,
    name: "New York",
    country: "USA",
    emoji: "🗽",
    activities: ["Broadway", "Central Park", "Pizza Tour"],
    gradient: "from-yellow-400 to-orange-500",
  },
];

const quickActions = [
  { icon: Plane, label: "Flights", color: "bg-secondary" },
  { icon: Anchor, label: "Cruises", color: "bg-gradient-ocean" },
  { icon: Utensils, label: "Dining", color: "bg-primary" },
  { icon: Camera, label: "Tours", color: "bg-success" },
];

export const DestinationCards = () => {
  return (
    <section id="explore" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full text-sm font-semibold text-success mb-4">
            <Star className="w-4 h-4" />
            Top Destinations
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Where Will You <span className="text-gradient-sunset">Go Next?</span>
          </h2>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`${action.color} px-6 py-3 rounded-2xl flex items-center gap-3 text-primary-foreground font-display font-semibold shadow-playful hover:shadow-hover transition-all duration-300`}
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Destination Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${dest.gradient} rounded-3xl p-6 h-64 flex flex-col justify-between shadow-card hover:shadow-hover transition-all duration-300 relative overflow-hidden`}>
                {/* Background decoration */}
                <motion.div
                  className="absolute -right-4 -top-4 text-8xl opacity-30"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {dest.emoji}
                </motion.div>

                <div className="relative z-10">
                  <span className="text-4xl mb-2 block">{dest.emoji}</span>
                  <h3 className="font-display text-2xl font-bold text-white">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{dest.country}</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {dest.activities.map((activity) => (
                      <span
                        key={activity}
                        className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white font-medium"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                  <Button variant="secondary" size="sm" className="w-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
