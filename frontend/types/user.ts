export type VehicleType = "car" | "bike" | "rickshaw";

export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: "passenger" | "driver";
  createdAt: string;
  updatedAt: string;
}

export interface Passenger extends BaseUser {
  type: "passenger";
}

export interface Driver extends BaseUser {
  type: "driver";
  isAvailable: boolean;
  vehicleTypes?: VehicleType[];
  vehicle?: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
  rating?: number;
  totalRides?: number;
}

export type User = Passenger | Driver;

export interface UpdateProfileData {
  name: string;
}
