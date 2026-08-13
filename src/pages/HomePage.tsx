import { Link } from "react-router-dom";
import { Card } from "../components";
import { useAuth } from "../hooks/use-auth";
import { routes } from "../routes/Route";

const sections = [
  {
    title: "Dashboard",
    description: "See your welcome message, theme toggle, and account actions.",
    to: routes.dashboard.path,
  },
  {
    title: "Users",
    description: "Browse the user list and try the advanced filters.",
    to: routes.users.path,
  },
];

export function HomePage() {
  const { authUser } = useAuth();
  const firstName = authUser?.firstName ?? "there";

  return (
    <section className="space-y-6">
      <div>
        <h1>Home</h1>
        <p className="mt-1 text-sm text-text-muted">
          Welcome back, {firstName}. Choose a section to continue.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Card
            key={section.to}
            title={section.title}
            description={section.description}
          >
            <Link
              to={section.to}
              className="text-sm font-medium text-primary hover:underline"
            >
              Open {section.title}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
