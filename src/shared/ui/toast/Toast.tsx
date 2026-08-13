import { Button } from "../button";

export type ToastProps = {
  message: string;
  onDismiss: () => void;
};

export function Toast({ message, onDismiss }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-md"
    >
      <p className="text-sm text-text">{message}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        Dismiss
      </Button>
    </div>
  );
}
