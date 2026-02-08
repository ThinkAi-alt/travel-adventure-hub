import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Ship, Building2, Landmark, X, ExternalLink, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { ItineraryPanel } from "./itinerary/ItineraryPanel";

import { FlightPaths } from "./itinerary/FlightPaths";
import { locations, getTypeColor } from "./itinerary/locations-data";
import { Location } from "./itinerary/types";

const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const getTypeIcon = (type: Location["type"]) => {
  switch (type) {
    case "theme-park": return MapPin;
    case "city": return Building2;
    case "cruise-port": return Ship;
    case "landmark": return Landmark;
    default: return MapPin;
  }
};

interface MarkerProps {
  location: Location;
  onClick: (location: Location) => void;
  isInItinerary: boolean;
}

const Marker = ({ location, onClick, isInItinerary }: MarkerProps) => {
  const [hovered, setHovered] = useState(false);
  const position = latLngToVector3(location.lat, location.lng, 2.05);
  const Icon = getTypeIcon(location.type);
  
  return (
    <group position={position}>
      <Html
        center
        distanceFactor={8}
        style={{
          transition: 'all 0.2s',
          transform: hovered ? 'scale(1.3)' : 'scale(1)',
          cursor: 'pointer',
        }}
      >
        <div
          className="relative group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onClick(location)}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:scale-125 ${isInItinerary ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}
            style={{ backgroundColor: getTypeColor(location.type) }}
          >
            <Icon className="w-3 h-3 text-white" />
          </div>
          {isInItinerary && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-primary">✓</span>
            </div>
          )}
          {hovered && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg shadow-lg whitespace-nowrap text-xs font-semibold text-foreground border border-border">
              <div>{location.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Click to add to trip</div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

const Globe = ({ 
  onLocationClick, 
  itineraryIds,
  itineraryItems
}: { 
  onLocationClick: (location: Location) => void;
  itineraryIds: Set<string>;
  itineraryItems: import("./itinerary/types").ItineraryItem[];
}) => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1e40af"
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[2.08, 64, 64]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Land masses approximation with continents */}
      <Sphere args={[2.01, 64, 64]}>
        <meshStandardMaterial
          color="#22c55e"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.6}
        />
      </Sphere>
      
      {/* Flight Paths */}
      <FlightPaths items={itineraryItems} />

      {/* Markers */}
      {locations.map((location) => (
        <Marker 
          key={location.id} 
          location={location} 
          onClick={onLocationClick}
          isInItinerary={itineraryIds.has(location.id)}
        />
      ))}
    </group>
  );
};

const LocationModal = ({ 
  location, 
  onClose,
  onAddToTrip,
  isInItinerary
}: { 
  location: Location | null; 
  onClose: () => void;
  onAddToTrip: (location: Location) => void;
  isInItinerary: boolean;
}) => {
  if (!location) return null;
  
  const Icon = getTypeIcon(location.type);
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48">
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: getTypeColor(location.type) }}
            >
              <Icon className="w-3 h-3" />
              {location.type.replace("-", " ").toUpperCase()}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-display text-2xl font-bold text-foreground mb-1">
              {location.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{location.country}</p>
            <p className="text-foreground/80 mb-4">{location.description}</p>
            
            <div className="flex gap-3">
              <Button 
                variant={isInItinerary ? "secondary" : "hero"} 
                className="flex-1"
                onClick={() => {
                  onAddToTrip(location);
                  if (!isInItinerary) onClose();
                }}
                disabled={isInItinerary}
              >
                {isInItinerary ? (
                  <>✓ Added to Trip</>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to Trip
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const FilterButton = ({ 
  type, 
  label, 
  active, 
  onClick 
}: { 
  type: Location["type"] | "all"; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) => {
  const Icon = type === "all" ? MapPin : getTypeIcon(type as Location["type"]);
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
        active 
          ? "bg-primary text-primary-foreground shadow-playful" 
          : "bg-card text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
};

interface InteractiveGlobeProps {
  itineraryItems: import("./itinerary/types").ItineraryItem[];
  isPanelOpen: boolean;
  addLocation: (location: Location) => void;
  removeLocation: (id: string) => void;
  reorderItems: (items: import("./itinerary/types").ItineraryItem[]) => void;
  clearAll: () => void;
  togglePanel: () => void;
}

export const InteractiveGlobe = ({
  itineraryItems,
  isPanelOpen,
  addLocation,
  removeLocation,
  reorderItems,
  clearAll,
  togglePanel,
}: InteractiveGlobeProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeFilter, setActiveFilter] = useState<Location["type"] | "all">("all");

  const itineraryIds = new Set(itineraryItems.map(item => item.id));
  
  const filteredLocations = activeFilter === "all" 
    ? locations 
    : locations.filter(l => l.type === activeFilter);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleAddToTrip = (location: Location) => {
    addLocation(location);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full text-sm font-semibold text-secondary mb-4">
            🌍 Interactive Globe
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Build Your <span className="text-gradient-sunset">Dream Trip</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on destinations to add them to your itinerary. Drag to reorder, and plan your perfect multi-destination adventure!
          </p>
        </motion.div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <FilterButton type="all" label="All" active={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
          <FilterButton type="theme-park" label="Theme Parks" active={activeFilter === "theme-park"} onClick={() => setActiveFilter("theme-park")} />
          <FilterButton type="city" label="Cities" active={activeFilter === "city"} onClick={() => setActiveFilter("city")} />
          <FilterButton type="cruise-port" label="Cruise Ports" active={activeFilter === "cruise-port"} onClick={() => setActiveFilter("cruise-port")} />
          <FilterButton type="landmark" label="Landmarks" active={activeFilter === "landmark"} onClick={() => setActiveFilter("landmark")} />
        </div>
        
        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl"
        >
          {/* Itinerary Panel */}
          <ItineraryPanel
            items={itineraryItems}
            onReorder={reorderItems}
            onRemove={removeLocation}
            onClear={clearAll}
            isOpen={isPanelOpen}
            onToggle={togglePanel}
          />

          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 3, 5]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />
              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
              <Globe onLocationClick={handleMarkerClick} itineraryIds={itineraryIds} itineraryItems={itineraryItems} />
              <OrbitControls 
                enableZoom={true} 
                enablePan={false} 
                minDistance={4} 
                maxDistance={10}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 text-white text-xs">
            <div className="font-semibold mb-2">Legend</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>Theme Parks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-500" />
                <span>Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <span>Cruise Ports</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Landmarks</span>
              </div>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-xs">
            🖱️ Drag to rotate • Scroll to zoom • Click to add
          </div>
        </motion.div>
        
        {/* Location count */}
        <div className="text-center mt-6 text-muted-foreground">
          Showing <span className="font-bold text-foreground">{filteredLocations.length}</span> destinations
          {itineraryItems.length > 0 && (
            <span className="ml-2">
              • <span className="font-bold text-primary">{itineraryItems.length}</span> in your trip
            </span>
          )}
        </div>
      </div>
      
      {/* Location Modal */}
      {selectedLocation && (
        <LocationModal 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)}
          onAddToTrip={handleAddToTrip}
          isInItinerary={itineraryIds.has(selectedLocation.id)}
        />
      )}
    </section>
  );
};
