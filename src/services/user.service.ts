import type { AxiosInstance } from "axios";
import type { User } from "../types/api.types";

export function createUserService(api: AxiosInstance) {
  return {
    getUsers: async () => {
      const response = await api.get<Array<User>>("/users");
      return response;

    },
    getUserById: async (id: string) => {
      const response = await api.get<User>(`/users/${id}`);
      return response;
    },
  };
}
