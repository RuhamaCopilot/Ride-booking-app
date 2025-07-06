import { RideModel, IRide, RideStatus } from "../models/ride.model";
import {
  CreateRideDto,
  UpdateRideStatusDto,
  RateRideDto,
} from "../dtos/ride.dto";
import { DriverService } from "./driver.service";
import { VehicleType } from "../models/driver.model";
import { Schema, Types } from "mongoose";

export class RideService {
  private driverService: DriverService;

  constructor() {
    this.driverService = new DriverService();
  }

  private generateFare(rideType: VehicleType): number {
    const baseFares = {
      [VehicleType.CAR]: 100,
      [VehicleType.RICKSHAW]: 50,
      [VehicleType.BIKE]: 30,
    };

    const multiplier = 1 + Math.random();

    const baseFare = baseFares[rideType];
    const calculatedFare = Math.round(baseFare * multiplier);

    return calculatedFare;
  }

  async createRide(rideData: CreateRideDto): Promise<IRide> {
    const fare = this.generateFare(rideData.rideType);

    const ride = new RideModel({
      ...rideData,
      pickup: {
        address: rideData.pickupLocation,
      },
      dropoff: {
        address: rideData.dropLocation,
      },
      fare,
      status: RideStatus.REQUESTED,
      requestedAt: new Date(),
    });

    await ride.save();
    return ride;
  }

  async getRideById(rideId: string): Promise<IRide> {
    const ride = await RideModel.findById(rideId)
      .populate("userId", "name")
      .populate("driverId", "name");
    if (!ride) {
      throw new Error("Ride not found");
    }
    return ride;
  }

  async updateRideStatus(
    rideId: string,
    status: RideStatus,
    driverId: string
  ): Promise<IRide> {
    const ride = await RideModel.findById(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }

    if (!this.isValidStatusTransition(ride.status, status)) {
      throw new Error("Invalid status transition");
    }

    if (status === RideStatus.ACCEPTED && !ride.driverId) {
      ride.driverId = driverId as unknown as Schema.Types.ObjectId;
      ride.acceptedAt = new Date();
    } else if (status === RideStatus.COMPLETED) {
      ride.completedAt = new Date();
    } else if (status === RideStatus.CANCELLED) {
      ride.cancelledAt = new Date();
    }

    ride.status = status;
    await ride.save();
    return ride;
  }

  async getPendingRides(vehicleType: VehicleType): Promise<IRide[]> {
    return RideModel.find({
      status: RideStatus.REQUESTED,
      rideType: vehicleType,
      driverId: { $exists: false },
    })
      .populate("userId", "name")
      .sort({ requestedAt: 1 });
  }

  async rateRide(
    rideId: string,
    userId: string,
    ratingData: RateRideDto
  ): Promise<IRide> {
    const ride = await RideModel.findById(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.userId.toString() !== userId) {
      throw new Error("Unauthorized to rate this ride");
    }

    if (ride.status !== RideStatus.COMPLETED) {
      throw new Error("Can only rate completed rides");
    }

    if (ride.rating) {
      throw new Error("Ride has already been rated");
    }

    ride.rating = ratingData.rating;
    ride.ratingComment = ratingData.comment;

    await ride.save();
    return ride;
  }

  private isValidStatusTransition(
    currentStatus: RideStatus,
    newStatus: RideStatus
  ): boolean {
    const validTransitions: Record<RideStatus, RideStatus[]> = {
      [RideStatus.REQUESTED]: [RideStatus.ACCEPTED, RideStatus.CANCELLED],
      [RideStatus.ACCEPTED]: [RideStatus.IN_PROGRESS, RideStatus.CANCELLED],
      [RideStatus.IN_PROGRESS]: [RideStatus.COMPLETED, RideStatus.CANCELLED],
      [RideStatus.COMPLETED]: [],
      [RideStatus.CANCELLED]: [],
    };

    return validTransitions[currentStatus].includes(newStatus);
  }

  async getRideHistory(userId: string): Promise<IRide[]> {
    return RideModel.find({
      $or: [{ userId }, { driverId: userId }],
    })
      .populate("userId", "name")
      .populate("driverId", "name")
      .sort({ createdAt: -1 });
  }
}
