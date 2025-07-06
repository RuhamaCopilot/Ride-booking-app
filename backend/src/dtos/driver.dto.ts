import { Static, Type } from "@sinclair/typebox";
import { VehicleType } from "../models/driver.model";

export const createDriverSchema = {
  body: Type.Object({
    vehicle: Type.Object({
      make: Type.String(),
      model: Type.String(),
      year: Type.Number(),
      licensePlate: Type.String(),
    }),
    vehicleTypes: Type.Array(
      Type.Union([
        Type.Literal(VehicleType.CAR),
        Type.Literal(VehicleType.BIKE),
        Type.Literal(VehicleType.RICKSHAW),
      ])
    ),
  }),
};

export const updateAvailabilitySchema = {
  body: Type.Object({
    isAvailable: Type.Boolean(),
  }),
};

export const updateVehicleTypesSchema = {
  body: Type.Object({
    vehicleTypes: Type.Array(
      Type.Union([
        Type.Literal(VehicleType.CAR),
        Type.Literal(VehicleType.BIKE),
        Type.Literal(VehicleType.RICKSHAW),
      ])
    ),
  }),
};

export type CreateDriverDto = Static<typeof createDriverSchema.body>;
export type UpdateDriverAvailabilityDto = Static<
  typeof updateAvailabilitySchema.body
>;
export type UpdateVehicleTypesDto = Static<
  typeof updateVehicleTypesSchema.body
>;
