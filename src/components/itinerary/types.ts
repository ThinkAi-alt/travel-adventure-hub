export interface Location {
  id: string;
  name: string;
  type: "theme-park" | "city" | "cruise-port" | "landmark";
  lat: number;
  lng: number;
  description: string;
  image: string;
  country: string;
}

export interface ItineraryItem extends Location {
  order: number;
  days?: number;
}
