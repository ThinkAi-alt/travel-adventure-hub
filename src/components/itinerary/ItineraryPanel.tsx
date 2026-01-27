import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { 
  MapPin, Ship, Building2, Landmark, X, GripVertical, 
  Plane, Calendar, Globe2, Sparkles, Trash2, Plus
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ItineraryItem, Location } from "./types";
import { getTypeColor } from "./locations-data";

const getTypeIcon = (type: Location["type"]) => {
  switch (type) {
    case "theme-park": return MapPin;
    case "city": return Building2;
    case "cruise-port": return Ship;
    case "landmark": return Landmark;
    default: return MapPin;
  }
};

interface ItineraryPanelProps {
  items: ItineraryItem[];
  onReorder: (items: ItineraryItem[]) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ItineraryPanel = ({ 
  items, 
  onReorder, 
  onRemove, 
  onClear,
  isOpen,
  onToggle
}: ItineraryPanelProps) => {
  const uniqueCountries = [...new Set(items.map(item => item.country))];
  const estimatedDays = items.length * 2; // Rough estimate: 2 days per destination

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={onToggle}
        className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-border hover:bg-muted transition-colors"
      >
        <div className="relative">
          <Plane className="w-5 h-5 text-primary" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {items.length}
            </span>
          )}
        </div>
        <span className="font-semibold text-foreground">My Trip</span>
      </motion.button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute top-0 left-0 bottom-0 w-80 bg-card/95 backdrop-blur-md border-r border-border shadow-2xl z-20 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-bold text-foreground">Trip Planner</h3>
                </div>
                <button 
                  onClick={onToggle}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              {items.length > 0 && (
                <div className="flex gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe2 className="w-3 h-3" />
                    {uniqueCountries.length} {uniqueCountries.length === 1 ? 'country' : 'countries'}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    ~{estimatedDays} days
                  </Badge>
                </div>
              )}
            </div>

            {/* Itinerary Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium mb-2">No destinations yet</p>
                  <p className="text-sm text-muted-foreground">
                    Click on markers on the globe to add destinations to your trip!
                  </p>
                </div>
              ) : (
                <Reorder.Group 
                  axis="y" 
                  values={items} 
                  onReorder={onReorder}
                  className="space-y-3"
                >
                  {items.map((item, index) => {
                    const Icon = getTypeIcon(item.type);
                    return (
                      <Reorder.Item
                        key={item.id}
                        value={item}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="bg-background rounded-xl border border-border p-3 shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="flex items-start gap-3">
                            {/* Drag Handle */}
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mb-1">
                                {index + 1}
                              </div>
                              <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Image */}
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <div 
                                className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: getTypeColor(item.type) }}
                              >
                                <Icon className="w-2.5 h-2.5 text-white" />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground text-sm truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">{item.country}</p>
                            </div>

                            {/* Remove Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemove(item.id);
                              }}
                              className="w-7 h-7 rounded-full hover:bg-destructive/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-destructive" />
                            </button>
                          </div>

                          {/* Connection Line */}
                          {index < items.length - 1 && (
                            <div className="ml-3 mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-px h-4 bg-border" />
                              <Plane className="w-3 h-3" />
                              <span>Travel</span>
                            </div>
                          )}
                        </motion.div>
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                <Button variant="hero" className="w-full" size="lg">
                  <Sparkles className="w-4 h-4" />
                  Plan This Adventure
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground"
                  onClick={onClear}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
