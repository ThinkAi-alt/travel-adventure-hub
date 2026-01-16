import { motion } from "framer-motion";
import { Trophy, Zap, Target, Gift, Star, Sparkles } from "lucide-react";

const achievements = [
  { icon: Plane, label: "First Flight", unlocked: true },
  { icon: Star, label: "5 Star Review", unlocked: true },
  { icon: Target, label: "Trip Planner", unlocked: false },
  { icon: Gift, label: "Big Spender", unlocked: false },
];

import { Plane } from "lucide-react";

export const GamificationBar = () => {
  const currentPoints = 1250;
  const nextLevel = 2000;
  const progress = (currentPoints / nextLevel) * 100;

  return (
    <section className="py-12 bg-gradient-sunset">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/95 backdrop-blur-lg rounded-3xl p-8 shadow-hover"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Points Section */}
            <div className="flex items-center gap-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-sunset rounded-2xl flex items-center justify-center shadow-playful"
              >
                <Trophy className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <div>
                <p className="text-muted-foreground font-medium mb-1">Your Adventure Points</p>
                <motion.p
                  className="font-display text-4xl font-bold text-foreground"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {currentPoints.toLocaleString()}
                  <span className="text-accent ml-2">
                    <Zap className="w-6 h-6 inline" />
                  </span>
                </motion.p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 max-w-md w-full">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Level 5: Explorer</span>
                <span className="font-bold text-primary">{currentPoints} / {nextLevel}</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-sunset rounded-full relative"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30"
                  />
                </motion.div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {nextLevel - currentPoints} points to Level 6: Adventurer
              </p>
            </div>

            {/* Achievements */}
            <div className="flex items-center gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    achievement.unlocked
                      ? "bg-gradient-sunset shadow-playful"
                      : "bg-muted"
                  }`}
                  title={achievement.label}
                >
                  <achievement.icon
                    className={`w-6 h-6 ${
                      achievement.unlocked ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-accent px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-accent-foreground" />
                <span className="font-display font-bold text-accent-foreground">+4 More</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
