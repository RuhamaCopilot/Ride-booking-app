import type { RideRequest, Ride } from "@/types/ride";
import { ApiClient } from "./api-client";

export class RideService {
  static async createRideRequest(request: RideRequest): Promise<Ride> {
    return ApiClient.post<Ride>("/rides", {
      pickupLocation: request.pickupLocation,
      dropLocation: request.dropLocation,
      rideType: request.rideType,
    });
  }

  static async getRideHistory(): Promise<Ride[]> {
    return ApiClient.get<Ride[]>("/rides/history");
  }

  static async getRide(rideId: string): Promise<Ride> {
    return ApiClient.get<Ride>(`/rides/${rideId}`);
  }

  static async getCurrentRide(): Promise<Ride | null> {
    const rides = await this.getRideHistory();
    return (
      rides.find((ride) =>
        ["pending", "accepted", "in_progress"].includes(ride.status)
      ) || null
    );
  }

  static async cancelRide(rideId: string): Promise<void> {
    return ApiClient.patch<void>(`/rides/${rideId}/status`, {
      status: "cancelled",
    });
  }

  static async getAvailableRides(): Promise<Ride[]> {
    return ApiClient.get<Ride[]>("/rides/pending");
  }

  static async acceptRide(rideId: string): Promise<Ride> {
    return ApiClient.patch<Ride>(`/rides/${rideId}/status`, {
      status: "accepted",
    });
  }

  static async startRide(rideId: string): Promise<Ride> {
    return ApiClient.patch<Ride>(`/rides/${rideId}/status`, {
      status: "in_progress",
    });
  }

  static async completeRide(rideId: string): Promise<Ride> {
    return ApiClient.patch<Ride>(`/rides/${rideId}/status`, {
      status: "completed",
    });
  }

  static async rateRide(
    rideId: string,
    rating: number,
    comment?: string
  ): Promise<void> {
    return ApiClient.post<void>(`/rides/${rideId}/rate`, { rating, comment });
  }
}
