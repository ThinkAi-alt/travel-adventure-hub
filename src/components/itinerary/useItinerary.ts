import { useState, useCallback } from "react";
import { ItineraryItem, Location } from "./types";
import { toast } from "sonner";

export const useItinerary = () => {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const addLocation = useCallback((location: Location) => {
    setItems(prev => {
      // Check if already in itinerary
      if (prev.some(item => item.id === location.id)) {
        toast.info(`${location.name} is already in your trip!`, {
          icon: "✈️"
        });
        return prev;
      }

      toast.success(`Added ${location.name} to your trip!`, {
        icon: "🎉"
      });

      // Open panel when first item is added
      if (prev.length === 0) {
        setIsPanelOpen(true);
      }

      return [...prev, { ...location, order: prev.length }];
    });
  }, []);

  const removeLocation = useCallback((id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        toast.info(`Removed ${item.name} from your trip`);
      }
      return prev.filter(item => item.id !== id).map((item, index) => ({
        ...item,
        order: index
      }));
    });
  }, []);

  const reorderItems = useCallback((newItems: ItineraryItem[]) => {
    setItems(newItems.map((item, index) => ({
      ...item,
      order: index
    })));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    toast.info("Trip cleared!");
    setIsPanelOpen(false);
  }, []);

  const togglePanel = useCallback(() => {
    setIsPanelOpen(prev => !prev);
  }, []);

  return {
    items,
    isPanelOpen,
    addLocation,
    removeLocation,
    reorderItems,
    clearAll,
    togglePanel
  };
};
