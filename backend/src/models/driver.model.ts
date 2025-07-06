import mongoose, { Document, Schema } from "mongoose";

export enum VehicleType {
  BIKE = "bike",
  CAR = "car",
  RICKSHAW = "rickshaw",
}

export interface IDriver {
  userId: mongoose.Types.ObjectId;

  vehicleTypes: VehicleType[];
  isAvailable: boolean;
  rating: number;
  totalRides: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDriverDocument extends IDriver, Document {}

const driverSchema = new Schema<IDriverDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    vehicleTypes: [
      {
        type: String,
        enum: Object.values(VehicleType),
        required: true,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRides: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

driverSchema.index({ isAvailable: 1, vehicleTypes: 1 });

export const Driver = mongoose.model<IDriverDocument>("Driver", driverSchema);
