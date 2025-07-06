import { FastifyRequest, FastifyReply } from "fastify";
import { RideService } from "../services/ride.service";
import {
  AuthenticatedRequest,
  CreateRideRequest,
  GetRideParams,
  UpdateRideStatusRequest,
  RateRideRequest,
  GetPendingRidesRequest,
} from "../types/fastify";

export class RideController {
  private rideService: RideService;

  constructor() {
    this.rideService = new RideService();
  }

  createRide = async (
    request: FastifyRequest<CreateRideRequest> & AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const rideData = {
        ...request.body,
        userId: request.authUser.userId,
      };
      const ride = await this.rideService.createRide(rideData);
      return reply.code(201).send(ride);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  getPendingRides = async (
    request: FastifyRequest<GetPendingRidesRequest> & AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const rides = await this.rideService.getPendingRides(
        request.query.vehicleType
      );
      return reply.code(200).send(rides);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  getRide = async (
    request: FastifyRequest<GetRideParams>,
    reply: FastifyReply
  ) => {
    try {
      const ride = await this.rideService.getRideById(request.params.rideId);
      return reply.code(200).send(ride);
    } catch (error: any) {
      return reply.code(404).send({ error: error.message });
    }
  };

  updateRideStatus = async (
    request: FastifyRequest<UpdateRideStatusRequest> & AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const ride = await this.rideService.updateRideStatus(
        request.params.rideId,
        request.body.status,
        request.authUser.userId
      );
      return reply.code(200).send(ride);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  rateRide = async (
    request: FastifyRequest<RateRideRequest> & AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const ride = await this.rideService.rateRide(
        request.params.rideId,
        request.authUser.userId,
        request.body
      );
      return reply.code(200).send(ride);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  getRideHistory = async (
    request: AuthenticatedRequest,
    reply: FastifyReply
  ) => {
    try {
      const rides = await this.rideService.getRideHistory(
        request.authUser.userId
      );
      return reply.code(200).send(rides);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };
}
