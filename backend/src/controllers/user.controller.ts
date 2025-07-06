import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/user.service";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";

export class UserController {
  private userService: UserService;

  constructor(server: FastifyInstance) {
    this.userService = new UserService(server);
  }

  register = async (
    request: FastifyRequest<{ Body: CreateUserDto }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await this.userService.createUser(request.body);
      const token = await reply.jwtSign({ userId: user._id, type: user.type });
      return reply.code(201).send({ user, token });
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  };

  login = async (
    request: FastifyRequest<{ Body: LoginUserDto }>,
    reply: FastifyReply
  ) => {
    try {
      const { user, token } = await this.userService.loginUser(request.body);
      return reply.code(200).send({ user, token });
    } catch (error: any) {
      return reply.code(401).send({ error: error.message });
    }
  };

  getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userId = request.authUser.userId;
      const user = await this.userService.getUserById(userId);
      return reply.code(200).send(user);
    } catch (error: any) {
      return reply.code(404).send({ error: error.message });
    }
  };
}
