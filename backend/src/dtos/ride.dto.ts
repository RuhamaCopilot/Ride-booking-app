import { VehicleType } from "../models/driver.model";
import { RideStatus } from "../models/ride.model";

export interface CreateRideDto {
  pickupLocation: string;
  dropLocation: string;
  rideType: VehicleType;
}

export interface UpdateRideStatusDto {
  status: RideStatus;
}

export interface RateRideDto {
  rating: number;
  comment?: string;
}

export const createRideSchema = {
  body: {
    type: "object",
    required: ["pickupLocation", "dropLocation", "rideType"],
    properties: {
      pickupLocation: { type: "string" },
      dropLocation: { type: "string" },
      rideType: {
        type: "string",
        enum: Object.values(VehicleType),
      },
    },
  },
};

export const updateRideStatusSchema = {
  params: {
    type: "object",
    required: ["rideId"],
    properties: {
      rideId: { type: "string" },
    },
  },
  body: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "string",
        enum: Object.values(RideStatus),
      },
    },
  },
};

export const rateRideSchema = {
  params: {
    type: "object",
    required: ["rideId"],
    properties: {
      rideId: { type: "string" },
    },
  },
  body: {
    type: "object",
    required: ["rating"],
    properties: {
      rating: {
        type: "number",
        minimum: 1,
        maximum: 5,
      },
      comment: {
        type: "string",
        maxLength: 500,
      },
    },
  },
};
