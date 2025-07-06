import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";

interface AuthUser {
  userId: string;
  type: string;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    authUser: AuthUser;
  }
}

export default fp(async function (fastify: FastifyInstance) {
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const token = await request.jwtVerify<AuthUser>();
        request.authUser = token;
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    }
  );
});
