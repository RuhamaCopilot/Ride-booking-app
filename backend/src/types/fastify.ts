import { FastifyRequest } from "fastify";
import {
  CreateRideDto,
  UpdateRideStatusDto,
  RateRideDto,
} from "../dtos/ride.dto";
import { VehicleType } from "../models/driver.model";
import { RideStatus } from "../models/ride.model";

export interface AuthUser {
  userId: string;
  email: string;
  type: "user" | "driver";
}

export interface AuthenticatedRequest extends FastifyRequest {
  authUser: AuthUser;
}

export interface CreateRideRequest {
  Body: {
    pickupLocation: string;
    dropLocation: string;
    rideType: VehicleType;
  };
}

export interface GetPendingRidesRequest {
  Querystring: {
    vehicleType: VehicleType;
  };
}

export interface GetRideParams {
  Params: {
    rideId: string;
  };
}

export interface UpdateRideStatusRequest {
  Params: {
    rideId: string;
  };
  Body: {
    status: RideStatus;
  };
}

export interface RateRideRequest {
  Params: {
    rideId: string;
  };
  Body: {
    rating: number;
    comment?: string;
  };
}
