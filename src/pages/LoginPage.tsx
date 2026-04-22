import { type FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { useAuth } from "../hooks/use-auth";
import { routes } from "../routes/Route";

export function LoginPage() {
  const { authUser, login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (authUser) {
      navigate(routes.dashboard.path, { replace: true });
    }
  }, [authUser, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ username, password });
  };

  if (authUser) {
    return <Navigate to={routes.dashboard.path} replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <section className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-semibold text-text">Login</h1>
        <p className="mb-6 text-sm text-text-muted">
          Enter your credentials to continue.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </section>
    </main>
  );
}
