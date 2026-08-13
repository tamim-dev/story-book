import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "../../../../design-system/utils/cn";

export type SidebarItem = {
  to: string;
  label: string;
  end?: boolean;
  icon?: ReactNode;
};

export type SidebarProps = {
  id?: string;
  title: string;
  items: SidebarItem[];
  ariaLabel?: string;
  className?: string;
};

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
    isActive ? "bg-primary text-surface" : "text-text hover:bg-background",
  );

export function Sidebar({
  id = "app-sidebar",
  title,
  items,
  ariaLabel = "Main",
  className,
}: SidebarProps) {
  return (
    <aside
      id={id}
      className={cn(
        "flex h-full w-64 flex-col border-r border-border bg-surface",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-5">
        <p className="text-lg font-semibold text-text">{title}</p>
      </div>
      <nav aria-label={ariaLabel} className="flex-1 p-3">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={linkClass}>
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
