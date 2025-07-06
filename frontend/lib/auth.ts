import type { User, LoginResponse, RegisterData } from "@/types/auth";
import { ApiClient, ApiError } from "./api-client";

export class AuthService {
  private static readonly TOKEN_KEY = "auth_token";
  private static readonly USER_KEY = "auth_user";

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static async login(email: string, password: string): Promise<User> {
    console.log("Attempting login with:", { email });
    try {
      const response = await ApiClient.post<LoginResponse>("/users/login", {
        email,
        password,
      });
      console.log("Login response:", response);
      this.setAuth(response.user, response.token);
      return response.user;
    } catch (error: unknown) {
      console.error("Login error:", error);
      if (error instanceof ApiError) {
        throw new Error(error.message);
      } else {
        throw new Error(
          "Unable to connect to the server. Please check if the server is running and try again."
        );
      }
    }
  }

  static async register(userData: RegisterData): Promise<User> {
    console.log("Attempting registration:", userData);
    try {
      const response = await ApiClient.post<LoginResponse>(
        "/users/register",
        userData
      );
      console.log("Registration response:", response);
      this.setAuth(response.user, response.token);
      return response.user;
    } catch (error: unknown) {
      console.error("Registration error:", error);
      if (error instanceof ApiError) {
        throw new Error(error.message);
      } else {
        throw new Error(
          "Unable to connect to the server. Please check if the server is running and try again."
        );
      }
    }
  }

  static async getProfile(): Promise<User> {
    return ApiClient.get<User>("/users/profile");
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  private static setAuth(user: User, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
