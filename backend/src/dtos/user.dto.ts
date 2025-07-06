import { UserType } from "../models/user.model";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;

  type: UserType;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export const createUserSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password", "type"],
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },

      type: { type: "string", enum: Object.values(UserType) },
    },
  },
};

export const loginUserSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
};
