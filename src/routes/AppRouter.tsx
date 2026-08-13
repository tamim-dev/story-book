import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "../pages/AppLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { PlaygroundDashboardPage } from "../pages/playground/PlaygroundDashboardPage";
import { PlaygroundHomePage } from "../pages/playground/PlaygroundHomePage";
import { PlaygroundLayout } from "../pages/playground/PlaygroundLayout";
import { PlaygroundSettingsPage } from "../pages/playground/PlaygroundSettingsPage";
import { PlaygroundUsersPage } from "../pages/playground/PlaygroundUsersPage";
import { routes } from "./Route";
import { UsersPage } from "../pages/Users";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.login.path} element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={routes.dashboard.path} element={<DashboardPage />} />
        <Route path={routes.home.path} element={<HomePage />} />
        <Route path={routes.users.path} element={<UsersPage />} />
      </Route>
      <Route path={routes.playground.path} element={<PlaygroundLayout />}>
        <Route index element={<PlaygroundHomePage />} />
        <Route path="dashboard" element={<PlaygroundDashboardPage />} />
        <Route path="users" element={<PlaygroundUsersPage />} />
        <Route path="settings" element={<PlaygroundSettingsPage />} />
      </Route>
      <Route
        path={routes.notFound.path}
        element={<Navigate to={routes.login.path} replace />}
      />
    </Routes>
  );
};

export default AppRouter;
