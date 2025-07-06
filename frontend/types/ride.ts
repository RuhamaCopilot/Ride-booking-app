import type { User } from "./user";

export type RideType = "car" | "rickshaw" | "bike";

export type RideStatus =
  | "requested"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface RideLocation {
  address: string;
}

export interface RideRequest {
  pickupLocation: string;
  dropLocation: string;
  rideType: RideType;
}

export interface Ride {
  _id: string;
  userId: string | User;
  driverId?: string | User;
  pickup: RideLocation;
  dropoff: RideLocation;
  rideType: RideType;
  status: RideStatus;
  fare: number;
  rating?: number;
  ratingComment?: string;
  requestedAt: string;
  acceptedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface Driver {
  _id: string;
  name: string;
  phone: string;
  isAvailable: boolean;
  currentRideId?: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}
