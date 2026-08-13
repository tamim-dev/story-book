import { Menu } from "lucide-react";
import { Button } from "../button";

export type NavbarProps = {
  title: string;
  onMenuClick?: () => void;
  menuOpen?: boolean;
  menuControlsId?: string;
};

export function Navbar({
  title,
  onMenuClick,
  menuOpen = false,
  menuControlsId = "app-sidebar",
}: NavbarProps) {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-border bg-surface px-4">
      {onMenuClick ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls={menuControlsId}
          onClick={onMenuClick}
        >
          <Menu className="size-4" aria-hidden="true" />
        </Button>
      ) : null}
      <p className="text-sm font-medium text-text-muted">{title}</p>
    </header>
  );
}
