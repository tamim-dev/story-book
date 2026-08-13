import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Settings, Users } from "lucide-react";
import { Navbar, Sidebar } from "../../components";
import { routes } from "../../routes/Route";
import { PlaygroundToastProvider } from "./PlaygroundToastContext";

const sidebarItems = [
  {
    to: routes.playground.path,
    label: "Home",
    end: true,
    icon: <Home className="size-4" aria-hidden="true" />,
  },
  {
    to: routes.playgroundDashboard.path,
    label: "Dashboard",
    icon: <LayoutDashboard className="size-4" aria-hidden="true" />,
  },
  {
    to: routes.playgroundUsers.path,
    label: "Users",
    icon: <Users className="size-4" aria-hidden="true" />,
  },
  {
    to: routes.playgroundSettings.path,
    label: "Settings",
    icon: <Settings className="size-4" aria-hidden="true" />,
  },
];

function pageTitle(pathname: string) {
  if (pathname.startsWith(routes.playgroundUsers.path)) {
    return "Users";
  }
  if (pathname.startsWith(routes.playgroundSettings.path)) {
    return "Settings";
  }
  if (pathname.startsWith(routes.playgroundDashboard.path)) {
    return "Dashboard";
  }
  return "Home";
}

export function PlaygroundLayout() {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <PlaygroundToastProvider>
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
          <Sidebar
            id="playground-sidebar"
            title="Testing Playground"
            ariaLabel="Playground"
            items={sidebarItems}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            title={pageTitle(pathname)}
            menuOpen={isSidebarOpen}
            menuControlsId="playground-sidebar"
            onMenuClick={() => setIsSidebarOpen((open) => !open)}
          />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </PlaygroundToastProvider>
  );
}
