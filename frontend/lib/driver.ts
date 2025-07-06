import type { Driver, VehicleType } from "@/types/user";
import { ApiClient } from "./api-client";

export class DriverService {
  static async getProfile(): Promise<Driver> {
    return ApiClient.get<Driver>("/drivers/profile");
  }

  static async updateAvailability(isAvailable: boolean): Promise<Driver> {
    return ApiClient.patch<Driver>("/drivers/availability", { isAvailable });
  }

  static async getAvailableDrivers(): Promise<Driver[]> {
    return ApiClient.get<Driver[]>("/drivers/available");
  }

  static async registerVehicleTypes(
    vehicleTypes: VehicleType[]
  ): Promise<Driver> {
    return ApiClient.patch<Driver>("/drivers/vehicle-types", { vehicleTypes });
  }
}
