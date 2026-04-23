import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../../../design-system/utils/cn";
import { X } from "lucide-react";
import { Button } from "../button";

export type IDrawerProps = {
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  panelClassName?: string;
  bodyClassName?: string;
}

export function Drawer({
  onClose,
  title,
  description,
  children,
  footer,
  closeLabel = "Close drawer",
  panelClassName,
  bodyClassName,
}: IDrawerProps) {
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setIsAnimatingIn(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsAnimatingIn(false);
    closeTimerRef.current = setTimeout(() => onClose(), 300);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
      className={cn(
        "fixed inset-0 z-50 flex justify-end bg-black/40 transition-opacity duration-300",
        isAnimatingIn ? "opacity-100" : "opacity-0",
      )}
    >
      <aside
        className={cn(
          "flex h-full w-full max-w-[420px] flex-col bg-surface shadow-2xl",
          "translate-x-full transform transition-transform duration-300 ease-in-out",
          isAnimatingIn && "translate-x-0",
          panelClassName,
        )}
      >
        <div className="flex flex-shrink-0 items-start justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="text-[15px] font-semibold leading-tight text-text">
              {title}
            </h3>
            {description ? (
              <p className="mt-0.5 text-[13px] leading-snug text-text-muted">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            variant="default"
            size="sm"
            aria-label={closeLabel}
            onClick={handleClose}
            className="flex items-center justify-center rounded border border-border text-text-muted transition-colors hover:bg-background"
          >
            <X className="size-3" />
          </Button>
        </div>

        <div className={cn("flex-1 overflow-y-auto px-4 py-3", bodyClassName)}>
          {children}
        </div>

        {footer ? (
          <div className="flex flex-shrink-0 items-center gap-3 border-t border-border px-5 py-4">
            {footer}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
