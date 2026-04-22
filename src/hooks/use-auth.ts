import { useMemo, useState } from "react";
import { useApi } from "./use-api";
import { createAuthService } from "../services/auth.service";
import type { AuthUser, LoginPayload } from "../types/api.types";
import { AUTH_USER_STORAGE_KEY, TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "../utils/Constants";



export function getStoredUser() {
  const value = localStorage.getItem(AUTH_USER_STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    return null;
  }
}

export function useAuth() {
  const api = useApi();
  const authService = useMemo(() => createAuthService(api), [api]);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(payload);
      setAuthUser(response);
      localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refreshToken);
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(response));
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthUser(null);
    setError(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  };

  return { authUser, login, logout, loading, error };
}
