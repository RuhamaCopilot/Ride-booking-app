import { Driver, IDriverDocument, VehicleType } from "../models/driver.model";
import { UserModel } from "../models/user.model";
import {
  CreateDriverDto,
  UpdateDriverAvailabilityDto,
} from "../dtos/driver.dto";

export class DriverService {
  async createDriverProfile(
    userId: string,
    driverData: CreateDriverDto
  ): Promise<IDriverDocument> {
    const user = await UserModel.findById(userId);
    if (!user || user.type !== "driver") {
      throw new Error("User not found or not a driver");
    }

    const existingDriver = await Driver.findOne({ userId });
    if (existingDriver) {
      throw new Error("Driver profile already exists");
    }

    const driver = new Driver({
      ...driverData,
      userId,
      isAvailable: false,
    });
    await driver.save();
    return driver;
  }

  async getDriverById(userId: string): Promise<IDriverDocument> {
    const driver = await Driver.findOne({ userId });
    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  }

  async updateDriverAvailability(
    userId: string,
    isAvailable: boolean
  ): Promise<IDriverDocument> {
    const driver = await Driver.findOneAndUpdate(
      { userId },
      { isAvailable },
      { new: true }
    );
    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  }

  async getAvailableDrivers(): Promise<IDriverDocument[]> {
    return Driver.find({ isAvailable: true });
  }

  async updateVehicleTypes(
    userId: string,
    vehicleTypes: VehicleType[]
  ): Promise<IDriverDocument> {
    const driver = await Driver.findOneAndUpdate(
      { userId },
      { vehicleTypes },
      { new: true }
    );
    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  }
}
