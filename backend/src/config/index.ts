import { z } from "zod";

const configSchema = z.object({
  port: z.coerce.number().default(3001),
  host: z.string().default("localhost"),
  mongodb: z.object({
    uri: z.string().default("mongodb://localhost:27017/ride_booking_system"),
  }),
  jwt: z.object({
    secret: z.string().min(32),
    expiresIn: z.string().default("1d"),
  }),
  rateLimit: z.object({
    max: z.coerce.number().default(100),
    timeWindow: z.coerce.number().default(60000),
  }),
  logLevel: z.enum(["info", "error", "debug"]).default("info"),
});

export type Config = z.infer<typeof configSchema>;

export const config = configSchema.parse({
  port: process.env.PORT,
  host: process.env.HOST,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  rateLimit: {
    max: process.env.RATE_LIMIT_MAX,
    timeWindow: process.env.RATE_LIMIT_WINDOW,
  },
  logLevel: process.env.LOG_LEVEL,
});
