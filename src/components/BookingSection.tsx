import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Building2, Ship, Calendar, MapPin, Users, Search, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type BookingTab = "flights" | "hotels" | "cruises";

const bookingLinks = {
  flights: [
    { name: "Expedia", url: "https://www.expedia.com/Flights", color: "bg-yellow-500" },
    { name: "Kayak", url: "https://www.kayak.com/flights", color: "bg-orange-500" },
    { name: "Skyscanner", url: "https://www.skyscanner.com", color: "bg-cyan-500" },
  ],
  hotels: [
    { name: "Booking.com", url: "https://www.booking.com", color: "bg-blue-600" },
    { name: "Hotels.com", url: "https://www.hotels.com", color: "bg-red-500" },
    { name: "Expedia", url: "https://www.expedia.com/Hotels", color: "bg-yellow-500" },
  ],
  cruises: [
    { name: "Royal Caribbean", url: "https://www.royalcaribbean.com", color: "bg-blue-700" },
    { name: "Carnival", url: "https://www.carnival.com", color: "bg-red-600" },
    { name: "Norwegian", url: "https://www.ncl.com", color: "bg-sky-600" },
    { name: "Disney Cruise", url: "https://disneycruise.disney.go.com", color: "bg-purple-600" },
  ],
};

const popularDestinations = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "London, UK",
  "Rome, Italy",
  "Barcelona, Spain",
  "Dubai, UAE",
  "Sydney, Australia",
  "Cancun, Mexico",
  "Bali, Indonesia",
];

const cruisePorts = [
  "Miami, Florida",
  "Barcelona, Spain",
  "Southampton, UK",
  "Sydney, Australia",
  "Singapore",
  "Venice, Italy",
  "Seattle, Washington",
  "Fort Lauderdale, Florida",
];

export const BookingSection = () => {
  const [activeTab, setActiveTab] = useState<BookingTab>("flights");
  
  // Flight state
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [flightDepartDate, setFlightDepartDate] = useState<Date>();
  const [flightReturnDate, setFlightReturnDate] = useState<Date>();
  const [flightPassengers, setFlightPassengers] = useState("1");
  
  // Hotel state
  const [hotelDestination, setHotelDestination] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState<Date>();
  const [hotelCheckOut, setHotelCheckOut] = useState<Date>();
  const [hotelGuests, setHotelGuests] = useState("2");
  const [hotelRooms, setHotelRooms] = useState("1");
  
  // Cruise state
  const [cruiseDeparture, setCruiseDeparture] = useState("");
  const [cruiseDestination, setCruiseDestination] = useState("");
  const [cruiseDate, setCruiseDate] = useState<Date>();
  const [cruisePassengers, setCruisePassengers] = useState("2");

  const tabs = [
    { id: "flights" as const, label: "Flights", icon: Plane, emoji: "✈️" },
    { id: "hotels" as const, label: "Hotels", icon: Building2, emoji: "🏨" },
    { id: "cruises" as const, label: "Cruises", icon: Ship, emoji: "🚢" },
  ];

  const handleSearch = (type: BookingTab) => {
    const links = bookingLinks[type];
    if (links.length > 0) {
      window.open(links[0].url, "_blank");
    }
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full text-sm font-semibold text-secondary mb-4">
            <Search className="w-4 h-4" />
            Book Your Adventure
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect <span className="text-gradient-ocean">Getaway</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search and compare the best deals on flights, hotels, and cruises from top booking sites
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-card overflow-hidden border border-border">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-4 px-6 font-display font-semibold transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span className="text-xl">{tab.emoji}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              {/* Flights Form */}
              {activeTab === "flights" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        From
                      </label>
                      <Input
                        placeholder="Departure city"
                        value={flightFrom}
                        onChange={(e) => setFlightFrom(e.target.value)}
                        list="destinations-from"
                        className="rounded-xl"
                      />
                      <datalist id="destinations-from">
                        {popularDestinations.map((dest) => (
                          <option key={dest} value={dest} />
                        ))}
                      </datalist>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        To
                      </label>
                      <Input
                        placeholder="Destination city"
                        value={flightTo}
                        onChange={(e) => setFlightTo(e.target.value)}
                        list="destinations-to"
                        className="rounded-xl"
                      />
                      <datalist id="destinations-to">
                        {popularDestinations.map((dest) => (
                          <option key={dest} value={dest} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Depart
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start rounded-xl">
                            {flightDepartDate ? format(flightDepartDate, "MMM dd, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={flightDepartDate}
                            onSelect={setFlightDepartDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        Return
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start rounded-xl">
                            {flightReturnDate ? format(flightReturnDate, "MMM dd, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={flightReturnDate}
                            onSelect={setFlightReturnDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        Passengers
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="9"
                        value={flightPassengers}
                        onChange={(e) => setFlightPassengers(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleSearch("flights")}
                    className="w-full rounded-xl py-6 text-lg font-display"
                    size="lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Flights
                  </Button>
                </motion.div>
              )}

              {/* Hotels Form */}
              {activeTab === "hotels" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Destination
                    </label>
                    <Input
                      placeholder="Where are you going?"
                      value={hotelDestination}
                      onChange={(e) => setHotelDestination(e.target.value)}
                      list="hotel-destinations"
                      className="rounded-xl"
                    />
                    <datalist id="hotel-destinations">
                      {popularDestinations.map((dest) => (
                        <option key={dest} value={dest} />
                      ))}
                    </datalist>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Check-in
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start rounded-xl">
                            {hotelCheckIn ? format(hotelCheckIn, "MMM dd, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={hotelCheckIn}
                            onSelect={setHotelCheckIn}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        Check-out
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start rounded-xl">
                            {hotelCheckOut ? format(hotelCheckOut, "MMM dd, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={hotelCheckOut}
                            onSelect={setHotelCheckOut}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        Guests
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={hotelGuests}
                        onChange={(e) => setHotelGuests(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        Rooms
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={hotelRooms}
                        onChange={(e) => setHotelRooms(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleSearch("hotels")}
                    className="w-full rounded-xl py-6 text-lg font-display"
                    size="lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Hotels
                  </Button>
                </motion.div>
              )}

              {/* Cruises Form */}
              {activeTab === "cruises" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Ship className="w-4 h-4 text-primary" />
                        Departure Port
                      </label>
                      <Input
                        placeholder="Where will you sail from?"
                        value={cruiseDeparture}
                        onChange={(e) => setCruiseDeparture(e.target.value)}
                        list="cruise-ports"
                        className="rounded-xl"
                      />
                      <datalist id="cruise-ports">
                        {cruisePorts.map((port) => (
                          <option key={port} value={port} />
                        ))}
                      </datalist>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        Destination
                      </label>
                      <Input
                        placeholder="Caribbean, Alaska, Europe..."
                        value={cruiseDestination}
                        onChange={(e) => setCruiseDestination(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Departure Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start rounded-xl">
                            {cruiseDate ? format(cruiseDate, "MMM dd, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={cruiseDate}
                            onSelect={setCruiseDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        Passengers
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={cruisePassengers}
                        onChange={(e) => setCruisePassengers(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleSearch("cruises")}
                    className="w-full rounded-xl py-6 text-lg font-display"
                    size="lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Cruises
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-muted/50 p-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Compare prices on trusted booking sites:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {bookingLinks[activeTab].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${link.color} text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 shadow-playful hover:shadow-hover transition-shadow`}
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
