import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Users } from "lucide-react";
import { Navbar, Sidebar } from "../components";
import { routes } from "../routes/Route";

const sidebarItems = [
  {
    to: routes.home.path,
    label: "Home",
    icon: <Home className="size-4" aria-hidden="true" />,
  },
  {
    to: routes.dashboard.path,
    label: "Dashboard",
    end: true,
    icon: <LayoutDashboard className="size-4" aria-hidden="true" />,
  },
  {
    to: routes.users.path,
    label: "Users",
    icon: <Users className="size-4" aria-hidden="true" />,
  },
];

function pageTitle(pathname: string) {
  if (pathname.startsWith(routes.users.path)) {
    return "Users";
  }
  if (pathname.startsWith(routes.home.path)) {
    return "Home";
  }
  return "Dashboard";
}

export function AppLayout() {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar title="Storybook App" items={sidebarItems} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          title={pageTitle(pathname)}
          menuOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen((open) => !open)}
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
