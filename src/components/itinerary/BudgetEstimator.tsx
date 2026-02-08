import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, Plane, Hotel, Utensils, Ticket, TrendingUp,
  ChevronDown, ChevronUp, Sparkles, Globe2
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ItineraryItem } from "./types";

interface CostEstimate {
  flights: number;
  hotels: number;
  food: number;
  activities: number;
}

const getDestinationCosts = (item: ItineraryItem): CostEstimate => {
  const costMap: Record<string, CostEstimate> = {
    "USA": { flights: 350, hotels: 180, food: 80, activities: 120 },
    "France": { flights: 500, hotels: 200, food: 90, activities: 100 },
    "Japan": { flights: 800, hotels: 150, food: 60, activities: 80 },
    "Germany": { flights: 450, hotels: 160, food: 70, activities: 90 },
    "Australia": { flights: 900, hotels: 170, food: 75, activities: 110 },
    "UAE": { flights: 600, hotels: 250, food: 100, activities: 150 },
    "Spain": { flights: 420, hotels: 140, food: 65, activities: 85 },
    "Singapore": { flights: 700, hotels: 190, food: 55, activities: 95 },
    "UK": { flights: 480, hotels: 210, food: 85, activities: 105 },
    "Peru": { flights: 650, hotels: 100, food: 40, activities: 70 },
    "China": { flights: 750, hotels: 120, food: 45, activities: 75 },
    "Greece": { flights: 500, hotels: 130, food: 55, activities: 80 },
    "Egypt": { flights: 550, hotels: 90, food: 35, activities: 60 },
  };
  return costMap[item.country] || { flights: 500, hotels: 150, food: 60, activities: 80 };
};

const currencies: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  JPY: { symbol: "¥", rate: 149.5 },
};

interface BudgetEstimatorProps {
  items: ItineraryItem[];
}

export const BudgetEstimator = ({ items }: BudgetEstimatorProps) => {
  const [currency, setCurrency] = useState("USD");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { symbol, rate } = currencies[currency];

  const convert = (usd: number) => Math.round(usd * rate);
  const format = (amount: number) => `${symbol}${convert(amount).toLocaleString()}`;

  const itemCosts = useMemo(() => {
    return items.map(item => {
      const days = item.days || 2;
      const base = getDestinationCosts(item);
      return {
        item,
        costs: {
          flights: base.flights,
          hotels: base.hotels * days,
          food: base.food * days,
          activities: base.activities * days,
        },
        total: base.flights + (base.hotels + base.food + base.activities) * days,
        days,
      };
    });
  }, [items]);

  const grandTotal = itemCosts.reduce((s, c) => s + c.total, 0);
  const totalFlights = itemCosts.reduce((s, c) => s + c.costs.flights, 0);
  const totalHotels = itemCosts.reduce((s, c) => s + c.costs.hotels, 0);
  const totalFood = itemCosts.reduce((s, c) => s + c.costs.food, 0);
  const totalActivities = itemCosts.reduce((s, c) => s + c.costs.activities, 0);

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-success/20 px-4 py-2 rounded-full text-sm font-semibold text-success mb-4">
            <DollarSign className="w-4 h-4" />
            Budget Estimator
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trip <span className="text-gradient-sunset">Budget</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Estimated costs for your {items.length}-destination adventure across {[...new Set(items.map(i => i.country))].length} countries.
          </p>
        </motion.div>

        {/* Currency Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {Object.keys(currencies).map(c => (
            <Button
              key={c}
              variant={currency === c ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrency(c)}
              className="font-display font-bold"
            >
              {currencies[c].symbol} {c}
            </Button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto grid gap-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { icon: Plane, label: "Flights", value: totalFlights, color: "text-secondary" },
              { icon: Hotel, label: "Hotels", value: totalHotels, color: "text-primary" },
              { icon: Utensils, label: "Food", value: totalFood, color: "text-accent" },
              { icon: Ticket, label: "Activities", value: totalActivities, color: "text-success" },
            ].map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-4 text-center border-0 shadow-card">
                  <cat.icon className={`w-6 h-6 mx-auto mb-2 ${cat.color}`} />
                  <p className="text-xs text-muted-foreground font-semibold">{cat.label}</p>
                  <p className="font-display font-bold text-lg text-foreground">{format(cat.value)}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Per-destination breakdown */}
          {itemCosts.map(({ item, costs, total, days }, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className="border-0 shadow-card overflow-hidden cursor-pointer hover:shadow-hover transition-all"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-foreground truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.country} • {days} days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-lg text-foreground">{format(total)}</p>
                    <p className="text-xs text-muted-foreground">estimated</p>
                  </div>
                  {expandedId === item.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 grid grid-cols-4 gap-3 border-t border-border pt-3">
                        <div className="text-center">
                          <Plane className="w-4 h-4 mx-auto text-secondary mb-1" />
                          <p className="text-xs text-muted-foreground">Flights</p>
                          <p className="font-bold text-sm">{format(costs.flights)}</p>
                        </div>
                        <div className="text-center">
                          <Hotel className="w-4 h-4 mx-auto text-primary mb-1" />
                          <p className="text-xs text-muted-foreground">Hotels</p>
                          <p className="font-bold text-sm">{format(costs.hotels)}</p>
                        </div>
                        <div className="text-center">
                          <Utensils className="w-4 h-4 mx-auto text-accent mb-1" />
                          <p className="text-xs text-muted-foreground">Food</p>
                          <p className="font-bold text-sm">{format(costs.food)}</p>
                        </div>
                        <div className="text-center">
                          <Ticket className="w-4 h-4 mx-auto text-success mb-1" />
                          <p className="text-xs text-muted-foreground">Activities</p>
                          <p className="font-bold text-sm">{format(costs.activities)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}

          {/* Grand Total */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-gradient-sunset border-0 shadow-hover text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
                <h3 className="font-display text-xl font-bold text-primary-foreground">Estimated Total</h3>
              </div>
              <motion.p
                key={grandTotal}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-5xl font-display font-bold text-primary-foreground"
              >
                {format(grandTotal)}
              </motion.p>
              <p className="text-primary-foreground/70 text-sm mt-2">
                For {items.length} destinations • {itemCosts.reduce((s, c) => s + c.days, 0)} days
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
