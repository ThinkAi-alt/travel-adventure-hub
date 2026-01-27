import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Ship, Building2, Landmark, X, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface Location {
  id: string;
  name: string;
  type: "theme-park" | "city" | "cruise-port" | "landmark";
  lat: number;
  lng: number;
  description: string;
  image: string;
  country: string;
}

const locations: Location[] = [
  // Theme Parks
  { id: "1", name: "Walt Disney World", type: "theme-park", lat: 28.385, lng: -81.564, description: "The most magical place on Earth with 4 incredible theme parks.", image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400", country: "USA" },
  { id: "2", name: "Universal Orlando", type: "theme-park", lat: 28.472, lng: -81.468, description: "Epic adventures await at Universal Studios and Islands of Adventure.", image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=400", country: "USA" },
  { id: "3", name: "Disneyland Paris", type: "theme-park", lat: 48.872, lng: 2.776, description: "European magic in the heart of France.", image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400", country: "France" },
  { id: "4", name: "Tokyo DisneySea", type: "theme-park", lat: 35.627, lng: 139.889, description: "A nautical-themed adventure unique to Japan.", image: "https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=400", country: "Japan" },
  { id: "5", name: "Europa-Park", type: "theme-park", lat: 48.266, lng: 7.722, description: "Germany's largest theme park with European-themed areas.", image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400", country: "Germany" },
  
  // Cities
  { id: "6", name: "Paris", type: "city", lat: 48.856, lng: 2.352, description: "The City of Light awaits with culture, cuisine, and romance.", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400", country: "France" },
  { id: "7", name: "Tokyo", type: "city", lat: 35.682, lng: 139.759, description: "Where ancient traditions meet cutting-edge technology.", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400", country: "Japan" },
  { id: "8", name: "New York City", type: "city", lat: 40.713, lng: -74.006, description: "The city that never sleeps offers endless experiences.", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400", country: "USA" },
  { id: "9", name: "Sydney", type: "city", lat: -33.869, lng: 151.209, description: "Iconic harbor, stunning beaches, and vibrant culture.", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400", country: "Australia" },
  { id: "10", name: "Dubai", type: "city", lat: 25.205, lng: 55.271, description: "Futuristic architecture and luxury in the desert.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400", country: "UAE" },
  
  // Cruise Ports
  { id: "11", name: "Miami Cruise Port", type: "cruise-port", lat: 25.775, lng: -80.170, description: "Gateway to the Caribbean and beyond.", image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=400", country: "USA" },
  { id: "12", name: "Barcelona Port", type: "cruise-port", lat: 41.376, lng: 2.177, description: "Mediterranean cruising from Spain's vibrant coast.", image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400", country: "Spain" },
  { id: "13", name: "Singapore Cruise Terminal", type: "cruise-port", lat: 1.266, lng: 103.819, description: "Asian adventure hub for cruise enthusiasts.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400", country: "Singapore" },
  { id: "14", name: "Southampton", type: "cruise-port", lat: 50.899, lng: -1.404, description: "UK's premier cruise departure point.", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400", country: "UK" },
  
  // Landmarks
  { id: "15", name: "Machu Picchu", type: "landmark", lat: -13.163, lng: -72.545, description: "Ancient Incan citadel high in the Andes Mountains.", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400", country: "Peru" },
  { id: "16", name: "Great Wall of China", type: "landmark", lat: 40.432, lng: 116.570, description: "One of the greatest wonders of the world.", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400", country: "China" },
  { id: "17", name: "Santorini", type: "landmark", lat: 36.393, lng: 25.461, description: "Stunning Greek island with iconic white buildings.", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400", country: "Greece" },
  { id: "18", name: "Pyramids of Giza", type: "landmark", lat: 29.979, lng: 31.134, description: "Ancient wonders that have stood for millennia.", image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400", country: "Egypt" },
];

const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const getTypeColor = (type: Location["type"]) => {
  switch (type) {
    case "theme-park": return "#f97316";
    case "city": return "#0ea5e9";
    case "cruise-port": return "#8b5cf6";
    case "landmark": return "#22c55e";
    default: return "#f97316";
  }
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
}

const Marker = ({ location, onClick }: MarkerProps) => {
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
            className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:scale-125"
            style={{ backgroundColor: getTypeColor(location.type) }}
          >
            <Icon className="w-3 h-3 text-white" />
          </div>
          {hovered && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-card rounded-lg shadow-lg whitespace-nowrap text-xs font-semibold text-foreground border border-border">
              {location.name}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

const Globe = ({ onLocationClick }: { onLocationClick: (location: Location) => void }) => {
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
      
      {/* Markers */}
      {locations.map((location) => (
        <Marker key={location.id} location={location} onClick={onLocationClick} />
      ))}
    </group>
  );
};

const LocationModal = ({ location, onClose }: { location: Location | null; onClose: () => void }) => {
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
            
            <Button variant="hero" className="w-full">
              <ExternalLink className="w-4 h-4" />
              Explore {location.name}
            </Button>
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

export const InteractiveGlobe = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeFilter, setActiveFilter] = useState<Location["type"] | "all">("all");
  
  const filteredLocations = activeFilter === "all" 
    ? locations 
    : locations.filter(l => l.type === activeFilter);

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
            Explore the <span className="text-gradient-sunset">World</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Spin the globe to discover theme parks, cities, cruise ports, and landmarks around the world. 
            Click on any marker to learn more!
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
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 3, 5]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />
              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
              <Globe onLocationClick={setSelectedLocation} />
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
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 text-white text-xs">
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
            🖱️ Drag to rotate • Scroll to zoom
          </div>
        </motion.div>
        
        {/* Location count */}
        <div className="text-center mt-6 text-muted-foreground">
          Showing <span className="font-bold text-foreground">{filteredLocations.length}</span> destinations
        </div>
      </div>
      
      {/* Location Modal */}
      {selectedLocation && (
        <LocationModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />
      )}
    </section>
  );
};
