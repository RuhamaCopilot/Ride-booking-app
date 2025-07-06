import type { User, VehicleType } from "./user";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: "passenger" | "driver";
  vehicle?: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  vehicleTypes?: VehicleType[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
