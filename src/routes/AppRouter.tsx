import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { routes } from "./Route";
import { UsersPage } from "../pages/Users";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.login.path} element={<LoginPage />} />
      <Route
        path={routes.dashboard.path}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.users.path}
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.notFound.path}
        element={<Navigate to={routes.login.path} replace />}
      />
    </Routes>
  );
};

export default AppRouter;
