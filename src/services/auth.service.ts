import type { AxiosInstance } from "axios";
import type { AuthUser, LoginPayload } from "../types/api.types";

export function createAuthService(api: AxiosInstance) {
  return {
    login: async (payload: LoginPayload) => {
      const response = await api.post<AuthUser>("/auth/login", payload);
      return response as unknown as AuthUser;
    },
  };
}
