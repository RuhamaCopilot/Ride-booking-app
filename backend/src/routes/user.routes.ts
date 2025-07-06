import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { createUserSchema, loginUserSchema } from "../dtos/user.dto";

export async function userRoutes(server: FastifyInstance) {
  const userController = new UserController(server);

  server.post(
    "/register",
    {
      schema: createUserSchema,
    },
    userController.register
  );

  server.post(
    "/login",
    {
      schema: loginUserSchema,
    },
    userController.login
  );

  server.get(
    "/profile",
    {
      onRequest: [server.authenticate],
    },
    userController.getProfile
  );
}
