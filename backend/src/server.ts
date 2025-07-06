import "dotenv/config";
import { FastifyInstance, FastifyServerOptions } from "fastify";
import fastify from "fastify";
import { config } from "./config";
import { registerPlugins } from "./plugins";
import { connectDB } from "./plugins/mongoose";
import { registerRoutes } from "./routes";

export async function buildServer(
  opts: FastifyServerOptions = {}
): Promise<FastifyInstance> {
  const server = fastify(opts);

  await registerPlugins(server);
  await connectDB();
  await registerRoutes(server);

  return server;
}

export async function startServer(): Promise<void> {
  try {
    const server = await buildServer();
    await server.listen({
      port: config.port,
      host: config.host,
    });
    console.log(`Server is running on port ${config.port}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

startServer();
