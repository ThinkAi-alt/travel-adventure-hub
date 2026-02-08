import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Sun, Cloud, CloudRain, Snowflake, Wind,
  MapPin, ChevronLeft, ChevronRight, Thermometer
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ItineraryItem } from "./types";
import { format, addDays, startOfDay } from "date-fns";

type WeatherType = "sunny" | "cloudy" | "rainy" | "snowy" | "windy";

interface DayPlan {
  date: Date;
  destination: ItineraryItem;
  dayNumber: number;
  dayAtDestination: number;
  weather: { type: WeatherType; temp: number };
}

const getWeatherIcon = (type: WeatherType) => {
  switch (type) {
    case "sunny": return Sun;
    case "cloudy": return Cloud;
    case "rainy": return CloudRain;
    case "snowy": return Snowflake;
    case "windy": return Wind;
  }
};

const getWeatherForLocation = (country: string, dayOffset: number): { type: WeatherType; temp: number } => {
  const weatherMap: Record<string, { types: WeatherType[]; tempRange: [number, number] }> = {
    USA: { types: ["sunny", "cloudy", "sunny"], tempRange: [22, 32] },
    France: { types: ["cloudy", "sunny", "rainy"], tempRange: [15, 25] },
    Japan: { types: ["sunny", "cloudy", "rainy"], tempRange: [18, 28] },
    Germany: { types: ["cloudy", "rainy", "sunny"], tempRange: [12, 22] },
    Australia: { types: ["sunny", "sunny", "windy"], tempRange: [24, 35] },
    UAE: { types: ["sunny", "sunny", "sunny"], tempRange: [30, 42] },
    Spain: { types: ["sunny", "sunny", "cloudy"], tempRange: [20, 32] },
    Singapore: { types: ["rainy", "cloudy", "sunny"], tempRange: [26, 33] },
    UK: { types: ["rainy", "cloudy", "cloudy"], tempRange: [10, 18] },
    Peru: { types: ["sunny", "cloudy", "sunny"], tempRange: [14, 22] },
    China: { types: ["cloudy", "sunny", "rainy"], tempRange: [16, 26] },
    Greece: { types: ["sunny", "sunny", "sunny"], tempRange: [22, 34] },
    Egypt: { types: ["sunny", "sunny", "sunny"], tempRange: [28, 40] },
  };
  const data = weatherMap[country] || { types: ["sunny"], tempRange: [20, 30] };
  const type = data.types[dayOffset % data.types.length];
  const temp = data.tempRange[0] + Math.round((data.tempRange[1] - data.tempRange[0]) * ((dayOffset * 37) % 100) / 100);
  return { type, temp };
};

const weatherColors: Record<WeatherType, string> = {
  sunny: "text-accent",
  cloudy: "text-muted-foreground",
  rainy: "text-secondary",
  snowy: "text-secondary",
  windy: "text-muted-foreground",
};

interface TripTimelineProps {
  items: ItineraryItem[];
}

export const TripTimeline = ({ items }: TripTimelineProps) => {
  const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()));
  const [selectedDay, setSelectedDay] = useState(0);

  const dayPlans: DayPlan[] = useMemo(() => {
    const plans: DayPlan[] = [];
    let currentDate = startDate;
    let totalDay = 0;

    items.forEach((item) => {
      const days = item.days || 2;
      for (let d = 0; d < days; d++) {
        plans.push({
          date: currentDate,
          destination: item,
          dayNumber: totalDay,
          dayAtDestination: d + 1,
          weather: getWeatherForLocation(item.country, d),
        });
        currentDate = addDays(currentDate, 1);
        totalDay++;
      }
    });

    return plans;
  }, [items, startDate]);

  const totalDays = dayPlans.length;
  const visibleStart = Math.max(0, selectedDay - 3);
  const visibleEnd = Math.min(totalDays, visibleStart + 7);
  const visibleDays = dayPlans.slice(visibleStart, visibleEnd);

  if (items.length === 0) return null;

  const selected = dayPlans[selectedDay];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full text-sm font-semibold text-secondary mb-4">
            <Calendar className="w-4 h-4" />
            Trip Timeline
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Day by <span className="text-gradient-sunset">Day</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Your {totalDays}-day adventure starting {format(startDate, "MMM d, yyyy")}
          </p>
        </motion.div>

        {/* Start date adjuster */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => setStartDate(addDays(startDate, -1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Badge variant="secondary" className="text-base px-4 py-2 font-display">
            <Calendar className="w-4 h-4 mr-2" />
            {format(startDate, "EEEE, MMM d, yyyy")}
          </Badge>
          <Button variant="outline" size="icon" onClick={() => setStartDate(addDays(startDate, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Timeline scroll */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-2 justify-center flex-wrap">
            {visibleDays.map((day) => {
              const WeatherIcon = getWeatherIcon(day.weather.type);
              const isSelected = day.dayNumber === selectedDay;
              return (
                <motion.button
                  key={day.dayNumber}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(day.dayNumber)}
                  className={`flex flex-col items-center p-3 rounded-2xl min-w-[80px] transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-playful"
                      : "bg-card text-foreground hover:bg-muted shadow-card"
                  }`}
                >
                  <span className="text-xs font-semibold opacity-70">{format(day.date, "EEE")}</span>
                  <span className="text-lg font-display font-bold">{format(day.date, "d")}</span>
                  <WeatherIcon className={`w-4 h-4 mt-1 ${isSelected ? "text-primary-foreground" : weatherColors[day.weather.type]}`} />
                  <span className={`text-[10px] mt-0.5 ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {day.weather.temp}°C
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Scroll nav */}
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              disabled={visibleStart <= 0}
              onClick={() => setSelectedDay(Math.max(0, selectedDay - 7))}
            >
              <ChevronLeft className="w-4 h-4" /> Previous Week
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={visibleEnd >= totalDays}
              onClick={() => setSelectedDay(Math.min(totalDays - 1, selectedDay + 7))}
            >
              Next Week <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Selected day detail */}
        {selected && (
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="overflow-hidden border-0 shadow-hover">
              <div className="relative h-48">
                <img
                  src={selected.destination.image}
                  alt={selected.destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display text-2xl font-bold">{selected.destination.name}</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="w-3 h-3" />
                    {selected.destination.country}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-2 text-white">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const W = getWeatherIcon(selected.weather.type);
                      return <W className="w-5 h-5" />;
                    })()}
                    <div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3" />
                        <span className="font-bold">{selected.weather.temp}°C</span>
                      </div>
                      <span className="text-xs capitalize">{selected.weather.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="font-display">
                    Day {selected.dayNumber + 1} of {totalDays}
                  </Badge>
                  <Badge variant="outline" className="font-display">
                    Day {selected.dayAtDestination} at {selected.destination.name}
                  </Badge>
                </div>
                <p className="text-foreground/80">{selected.destination.description}</p>
                <p className="text-sm text-muted-foreground mt-3">
                  {format(selected.date, "EEEE, MMMM d, yyyy")}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};
