import type GENDER from "../utils/Gender";

export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T;
}

// export interface IList<T> {
//   offset: number;
//   pageSize: number;
//   total: number;
//   items: Array<T>;
// }
export interface IList<T> {
  limit: number;
  skip: number;
  total: number;
  users: Array<T>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  image: string;
  accessToken: string;
  refreshToken: string;
}
