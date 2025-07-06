import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes";
import driverRoutes from "./driver.routes";
import rideRoutes from "./ride.routes";

export async function registerRoutes(server: FastifyInstance) {
  server.register(userRoutes, { prefix: "/api/users" });
  server.register(driverRoutes, { prefix: "/api/drivers" });
  server.register(rideRoutes, { prefix: "/api/rides" });
}
