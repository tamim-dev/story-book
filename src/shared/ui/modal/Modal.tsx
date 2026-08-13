import { useEffect, type ReactNode } from "react";
import { Button } from "../button";

export type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="playground-modal-title"
        className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-md"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="playground-modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Close dialog"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
