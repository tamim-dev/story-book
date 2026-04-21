import { useContext } from "react";
import { ApiContext } from "../providers/api-context";

export function useApi() {
  const api = useContext(ApiContext);

  if (!api) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  return api;
}
