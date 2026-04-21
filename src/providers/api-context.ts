import { createContext } from "react";
import type { AxiosInstance } from "axios";

export const ApiContext = createContext<AxiosInstance | null>(null);
