import { UserModel, IUser } from "../models/user.model";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { FastifyInstance } from "fastify";

export class UserService {
  private server: FastifyInstance;

  constructor(server: FastifyInstance) {
    this.server = server;
  }

  async createUser(userData: CreateUserDto): Promise<IUser> {
    try {
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const user = new UserModel(userData);
      await user.save();
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async loginUser(
    loginData: LoginUserDto
  ): Promise<{ user: IUser; token: string }> {
    try {
      const user = await UserModel.findOne({ email: loginData.email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isValidPassword = await user.comparePassword(loginData.password);
      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }

      const token = await this.server.jwt.sign({
        userId: user._id,
        type: user.type,
      });

      return { user, token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserById(userId: string): Promise<IUser> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
