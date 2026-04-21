import type { PropsWithChildren } from "react";
import { apiClient } from "../lib/api-client";
import { ApiContext } from "./api-context";

export function ApiProvider({ children }: PropsWithChildren) {
  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}
