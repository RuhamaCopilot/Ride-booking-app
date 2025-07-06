import { Schema, model, Document } from "mongoose";

export enum RideStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IRide extends Document {
  userId: Schema.Types.ObjectId;
  driverId: Schema.Types.ObjectId;
  pickup: {
    address: string;
  };
  dropoff: {
    address: string;
  };
  status: RideStatus;
  fare: number;
  distance: number;
  duration: number;
  rating?: number;
  ratingComment?: string;
  requestedAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const rideSchema = new Schema<IRide>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    pickup: {
      address: {
        type: String,
        required: true,
      },
    },
    dropoff: {
      address: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: false,
    },
    ratingComment: {
      type: String,
      required: false,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    acceptedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

rideSchema.index({ userId: 1, createdAt: -1 });
rideSchema.index({ driverId: 1, createdAt: -1 });
rideSchema.index({ status: 1 });

export const RideModel = model<IRide>("Ride", rideSchema);
