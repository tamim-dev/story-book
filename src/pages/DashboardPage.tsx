import { Navigate, useNavigate } from "react-router-dom";
import { Button, Toggle } from "../components";
import { useAuth } from "../hooks/use-auth";
import GENDER from "../utils/Gender";
import { routes } from "../routes/Route";
import { useTheme } from "../hooks/useTheme";

export function DashboardPage() {
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();

  if (!authUser) {
    return <Navigate to="/auth/login" replace />;
  }

  const isFemale = authUser.gender === GENDER.FEMALE;
  const backgroundClass = isFemale ? "bg-pink-100" : "bg-blue-100";
  const message = isFemale
    ? "You are logged in successfully. Have a great day."
    : "You are logged in successfully. Welcome back.";

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <main
      className={`flex min-h-screen items-center justify-center p-4 ${backgroundClass}`}
    >
      <section className="w-full max-w-md rounded-xl bg-background p-6 shadow-md">
        <h1>Welcome {authUser.firstName}</h1>
        <p className="mt-2 text-text-muted">{message}</p>
        <p className="mt-4 text-sm text-text-muted">{authUser.email}</p>

        <Toggle
          checked={theme === "dark"}
          onChange={(checked) => setTheme(checked ? "dark" : "light")}
          aria-label="Toggle theme"
        />
        <Button
          className="mt-6 w-full"
          variant="outline"
          onClick={() => navigate(routes.users.path)}
        >
          Users List
        </Button>
        <Button
          className="mt-6 w-full"
          variant="outline"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </section>
    </main>
  );
}
