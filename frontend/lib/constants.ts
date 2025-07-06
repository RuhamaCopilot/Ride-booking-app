export const RIDE_TYPES = {
  car: {
    name: "Car",
    basePrice: 100,
    pricePerKm: 15,
    icon: "🚗",
  },
  bike: {
    name: "Bike",
    basePrice: 50,
    pricePerKm: 8,
    icon: "🏍️",
  },
  rickshaw: {
    name: "Rickshaw",
    basePrice: 75,
    pricePerKm: 12,
    icon: "🛺",
  },
} as const;

export const RIDE_STATUS_COLORS = {
  requested: "bg-yellow-100 text-yellow-800",
  accepted: "bg-blue-100 text-blue-800",
  in_progress: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
} as const;

export const LOCATIONS = [
  "Mall Road",
  "Airport",
  "Railway Station",
  "City Center",
  "University",
  "Hospital",
  "Bus Stand",
  "Market Square",
  "Tech Park",
  "Residential Area",
];
