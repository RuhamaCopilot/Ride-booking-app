import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import auth from "./auth";
import { config } from "../config";

export async function registerPlugins(server: FastifyInstance) {
  await server.register(fastifyCors, {
    origin: true,
    credentials: true,
  });

  await server.register(fastifyHelmet, {
    global: true,
  });

  await server.register(fastifyJwt, {
    secret: config.jwt.secret,
    sign: {
      expiresIn: config.jwt.expiresIn,
    },
  });

  await server.register(auth);

  await server.register(fastifyRateLimit, {
    max: config.rateLimit.max,
    timeWindow: config.rateLimit.timeWindow,
  });

  await server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Ride Booking API",
        description: "API documentation for the Ride Booking System",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://${config.host}:${config.port}`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await server.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
  });
}
