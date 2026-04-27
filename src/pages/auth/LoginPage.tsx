import { type FormEvent, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks/use-auth";
import { routes } from "../../routes/Route";

export function LoginPage() {
  const { authUser, login, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const trimmedUsername = username.trim();
  const isSubmitDisabled = useMemo(
    () => loading || trimmedUsername.length === 0 || password.length === 0,
    [loading, trimmedUsername, password],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled) {
      return;
    }

    await login({ username: trimmedUsername, password });
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
              autoComplete="username"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "login-error-message" : undefined}
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
              autoComplete="current-password"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "login-error-message" : undefined}
              required
            />
          </div>

          {error && (
            <p
              id="login-error-message"
              className="text-danger text-sm"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}

          <Button className="w-full" type="submit" disabled={isSubmitDisabled}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </section>
    </main>
  );
}
