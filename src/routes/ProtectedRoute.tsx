import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { getStoredUser } from "../hooks/use-auth";

type ProtectedRouteProps = {
  children: ReactElement;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authUser = getStoredUser();

  if (!authUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
