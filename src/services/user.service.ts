import type { AxiosInstance } from "axios";
import type { ApiResponse, IList, User } from "../types/api.types";

export function createUserService(api: AxiosInstance) {
  return {
    getUsers: async () => {
      const response = await api.get<ApiResponse<IList<User>>>("/users");
      return response.data;
    },
    getUserById: async (id: string) => {
      const response = await api.get<ApiResponse<User>>(`/users/${id}`);
      return response.data;
    },
  };
}
