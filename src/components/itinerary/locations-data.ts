import { Location } from "./types";

export const locations: Location[] = [
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

export const getTypeColor = (type: Location["type"]) => {
  switch (type) {
    case "theme-park": return "#f97316";
    case "city": return "#0ea5e9";
    case "cruise-port": return "#8b5cf6";
    case "landmark": return "#22c55e";
    default: return "#f97316";
  }
};
