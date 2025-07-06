export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  userType: "passenger" | "driver";
  createdAt: string;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  pickupLocation: string;
  dropoffLocation: string;
  rideType: "bike" | "car" | "rickshaw";
  status: "requested" | "accepted" | "in-progress" | "completed" | "cancelled";
  fare: number;
  requestedAt: string;
  acceptedAt?: string;
  completedAt?: string;
  passenger?: User;
  driver?: User;
  passengerName: string;
  driverName?: string;
  driverPhone?: string;
}

export interface Driver extends User {
  isAvailable: boolean;
  currentRideId?: string;
}

export type RideType = {
  id: "bike" | "car" | "rickshaw";
  name: string;
  basePrice: number;
  pricePerKm: number;
  icon: string;
};
