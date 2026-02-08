import { motion } from "framer-motion";
import { Plane, MapPin, Palmtree, Ship, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
const floatingElements = [{
  icon: Plane,
  delay: 0,
  x: "10%",
  y: "20%",
  rotation: -15
}, {
  icon: MapPin,
  delay: 0.2,
  x: "85%",
  y: "15%",
  rotation: 10
}, {
  icon: Palmtree,
  delay: 0.4,
  x: "5%",
  y: "70%",
  rotation: -5
}, {
  icon: Ship,
  delay: 0.6,
  x: "90%",
  y: "65%",
  rotation: 15
}, {
  icon: Sparkles,
  delay: 0.8,
  x: "75%",
  y: "40%",
  rotation: 0
}];
export const HeroSection = () => {
  return <section className="relative min-h-screen bg-gradient-hero overflow-hidden pt-20">
      {/* Floating decorative elements */}
      {floatingElements.map((element, index) => <motion.div key={index} className="absolute text-primary/30" style={{
      left: element.x,
      top: element.y
    }} initial={{
      opacity: 0,
      scale: 0
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      delay: element.delay,
      duration: 0.5,
      type: "spring"
    }}>
          <motion.div animate={{
        y: [0, -20, 0],
        rotate: [element.rotation, element.rotation + 5, element.rotation]
      }} transition={{
        duration: 4 + index,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
            <element.icon className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
        </motion.div>)}

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] text-center relative z-10 text-secondary-foreground">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="mb-6">
          <span className="inline-flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-foreground shadow-card">
            <Sparkles className="w-4 h-4 text-accent" />
            Your Adventure Awaits
            <Sparkles className="w-4 h-4 text-accent" />
          </span>
        </motion.div>

        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Explore the</span>
          <br />
          <span className="text-gradient-sunset">World Together</span>
        </motion.h1>

        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-body">
          Plan epic adventures, discover theme parks worldwide, calculate trip costs,
          and earn rewards while exploring the globe!
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="flex flex-col sm:flex-row gap-4">
          <Button variant="hero" size="xl">
            <MapPin className="w-5 h-5" />
            Plan Your Trip
          </Button>
          <Button variant="outline" size="xl">
            <Plane className="w-5 h-5" />
            Explore Destinations
          </Button>
        </motion.div>

        {/* Interactive Globe Preview */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.8,
        delay: 0.5
      }} className="mt-16 relative">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-ocean shadow-playful flex items-center justify-center animate-pulse-glow">
            <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }} className="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-dashed border-primary-foreground/30 flex items-center justify-center">
              <span className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">🌍</span>
            </motion.div>
          </div>
          
          {/* Orbiting pins */}
          {[0, 1, 2].map(i => <motion.div key={i} className="absolute top-1/2 left-1/2" animate={{
          rotate: 360
        }} transition={{
          duration: 10 + i * 5,
          repeat: Infinity,
          ease: "linear"
        }} style={{
          transformOrigin: "0 0"
        }}>
              <div className="w-8 h-8 bg-accent rounded-full shadow-playful flex items-center justify-center" style={{
            transform: `translate(${120 + i * 20}px, -50%)`
          }}>
                <MapPin className="w-4 h-4 text-accent-foreground" />
              </div>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};