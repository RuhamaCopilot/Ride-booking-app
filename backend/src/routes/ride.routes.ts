import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteHandler,
} from "fastify";
import { RideController } from "../controllers/ride.controller";
import {
  CreateRideRequest,
  GetRideParams,
  UpdateRideStatusRequest,
  RateRideRequest,
  GetPendingRidesRequest,
  AuthenticatedRequest,
} from "../types/fastify";

export default async function rideRoutes(fastify: FastifyInstance) {
  const rideController = new RideController();

  const createRideHandler: RouteHandler<CreateRideRequest> = async (
    request,
    reply
  ) => {
    return rideController.createRide(
      request as FastifyRequest<CreateRideRequest> & AuthenticatedRequest,
      reply
    );
  };

  fastify.post<CreateRideRequest>(
    "/",
    {
      onRequest: [fastify.authenticate],
    },
    createRideHandler
  );

  const getPendingRidesHandler: RouteHandler<GetPendingRidesRequest> = async (
    request,
    reply
  ) => {
    return rideController.getPendingRides(
      request as FastifyRequest<GetPendingRidesRequest> & AuthenticatedRequest,
      reply
    );
  };

  const getRideHandler: RouteHandler<GetRideParams> = async (
    request,
    reply
  ) => {
    return rideController.getRide(
      request as FastifyRequest<GetRideParams> & AuthenticatedRequest,
      reply
    );
  };

  const updateRideStatusHandler: RouteHandler<UpdateRideStatusRequest> = async (
    request,
    reply
  ) => {
    return rideController.updateRideStatus(
      request as FastifyRequest<UpdateRideStatusRequest> & AuthenticatedRequest,
      reply
    );
  };

  const rateRideHandler: RouteHandler<RateRideRequest> = async (
    request,
    reply
  ) => {
    return rideController.rateRide(
      request as FastifyRequest<RateRideRequest> & AuthenticatedRequest,
      reply
    );
  };

  const getRideHistoryHandler: RouteHandler = async (request, reply) => {
    return rideController.getRideHistory(
      request as AuthenticatedRequest,
      reply
    );
  };

  fastify.get<GetPendingRidesRequest>(
    "/pending",
    {
      onRequest: [fastify.authenticate],
    },
    getPendingRidesHandler
  );

  fastify.get<GetRideParams>(
    "/:rideId",
    {
      onRequest: [fastify.authenticate],
    },
    getRideHandler
  );

  fastify.patch<UpdateRideStatusRequest>(
    "/:rideId/status",
    {
      onRequest: [fastify.authenticate],
    },
    updateRideStatusHandler
  );

  fastify.post<RateRideRequest>(
    "/:rideId/rate",
    {
      onRequest: [fastify.authenticate],
    },
    rateRideHandler
  );

  fastify.get(
    "/history",
    {
      onRequest: [fastify.authenticate],
    },
    getRideHistoryHandler
  );
}
