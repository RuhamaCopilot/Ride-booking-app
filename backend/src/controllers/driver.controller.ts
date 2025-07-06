import { FastifyRequest, FastifyReply } from "fastify";
import { DriverService } from "../services/driver.service";
import {
  CreateDriverDto,
  UpdateDriverAvailabilityDto,
  UpdateVehicleTypesDto,
} from "../dtos/driver.dto";
import { AuthenticatedRequest } from "../types/fastify";

export class DriverController {
  private driverService: DriverService;

  constructor() {
    this.driverService = new DriverService();
  }

  createDriver = async (
    request: FastifyRequest<{ Body: CreateDriverDto }> & AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const driver = await this.driverService.createDriverProfile(
        request.authUser.userId,
        request.body
      );
      return reply.code(201).send(driver);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  getDriverProfile = async (
    request: AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const driverId = request.authUser.userId;
      const driver = await this.driverService.getDriverById(driverId);
      return reply.code(200).send(driver);
    } catch (error: any) {
      return reply.code(404).send({ error: error.message });
    }
  };

  updateAvailability = async (
    request: FastifyRequest<{ Body: UpdateDriverAvailabilityDto }> &
      AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const driverId = request.authUser.userId;
      const driver = await this.driverService.updateDriverAvailability(
        driverId,
        request.body.isAvailable
      );
      return reply.code(200).send(driver);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  getAvailableDrivers = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const drivers = await this.driverService.getAvailableDrivers();
      return reply.code(200).send(drivers);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  updateVehicleTypes = async (
    request: FastifyRequest<{ Body: UpdateVehicleTypesDto }> &
      AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const driverId = request.authUser.userId;
      const driver = await this.driverService.updateVehicleTypes(
        driverId,
        request.body.vehicleTypes
      );
      return reply.code(200).send(driver);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };
}
