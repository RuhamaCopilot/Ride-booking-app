import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteHandler,
} from "fastify";
import { DriverController } from "../controllers/driver.controller";
import {
  createDriverSchema,
  updateAvailabilitySchema,
  updateVehicleTypesSchema,
  CreateDriverDto,
  UpdateDriverAvailabilityDto,
  UpdateVehicleTypesDto,
} from "../dtos/driver.dto";
import { AuthenticatedRequest } from "../types/fastify";

export default async function driverRoutes(fastify: FastifyInstance) {
  const driverController = new DriverController();

  const createDriverHandler: RouteHandler<{
    Body: CreateDriverDto;
  }> = async (request, reply) => {
    return driverController.createDriver(
      request as FastifyRequest<{ Body: CreateDriverDto }> &
        AuthenticatedRequest,
      reply
    );
  };

  fastify.post<{
    Body: CreateDriverDto;
  }>(
    "/",
    {
      schema: createDriverSchema,
      onRequest: [fastify.authenticate],
    },
    createDriverHandler
  );

  fastify.get(
    "/profile",
    {
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      return driverController.getDriverProfile(
        request as AuthenticatedRequest,
        reply
      );
    }
  );

  fastify.patch<{
    Body: UpdateDriverAvailabilityDto;
  }>(
    "/availability",
    {
      schema: updateAvailabilitySchema,
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      return driverController.updateAvailability(
        request as FastifyRequest<{ Body: UpdateDriverAvailabilityDto }> &
          AuthenticatedRequest,
        reply
      );
    }
  );

  fastify.patch<{
    Body: UpdateVehicleTypesDto;
  }>(
    "/vehicle-types",
    {
      schema: updateVehicleTypesSchema,
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      return driverController.updateVehicleTypes(
        request as FastifyRequest<{ Body: UpdateVehicleTypesDto }> &
          AuthenticatedRequest,
        reply
      );
    }
  );

  fastify.get(
    "/available",
    {
      onRequest: [fastify.authenticate],
    },
    driverController.getAvailableDrivers
  );
}
