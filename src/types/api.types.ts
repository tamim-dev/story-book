export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T;
}

export interface IList<T> {
  offset: number;
  pageSize: number;
  total: number;
  items: Array<T>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
