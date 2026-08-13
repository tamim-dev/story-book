import { Link } from "react-router-dom";
import { Card } from "../../components";
import { routes } from "../../routes/Route";

const sections = [
  {
    title: "Dashboard",
    description: "Summary cards, search, filters, and the user table.",
    to: routes.playgroundDashboard.path,
  },
  {
    title: "Users",
    description: "Search the list, filter by status, and add a new user.",
    to: routes.playgroundUsers.path,
  },
  {
    title: "Settings",
    description: "Update the profile form, toggle notifications, and save.",
    to: routes.playgroundSettings.path,
  },
];

export function PlaygroundHomePage() {
  return (
    <section className="space-y-6">
      <div>
        <h2>Home</h2>
        <p className="mt-1 text-sm text-text-muted">
          A small app shell for practicing Playwright component and E2E tests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.to} title={section.title} description={section.description}>
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
