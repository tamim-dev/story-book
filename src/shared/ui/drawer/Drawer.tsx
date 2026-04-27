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
import styles from "./Drawer.module.css";

export type DrawerProps = {
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  panelClassName?: string;
  bodyClassName?: string;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({
  onClose,
  title,
  description,
  children,
  footer,
  closeLabel = "Close drawer",
  panelClassName,
  bodyClassName,
}: DrawerProps) {
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setIsAnimatingIn(true);
        panelRef.current?.focus();
      });
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
    closeTimerRef.current = setTimeout(() => {
      previousActiveElement.current?.focus();
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
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
      className={cn(styles.overlay, isAnimatingIn && styles.overlayVisible)}
    >
      <aside
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          styles.panel,
          isAnimatingIn && styles.panelVisible,
          panelClassName,
        )}
      >
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{title}</h3>
            {description ? (
              <p className={styles.description}>{description}</p>
            ) : null}
          </div>
          <Button
            variant="default"
            size="sm"
            aria-label={closeLabel}
            onClick={handleClose}
          >
            <X className="size-3" />
          </Button>
        </div>

        <div className={cn(styles.body, bodyClassName)}>{children}</div>

        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </aside>
    </div>
  );
}
