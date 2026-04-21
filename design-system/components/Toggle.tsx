import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type ToggleVariant = "primary" | "secondary" | "outline";
export type ToggleSize = "sm" | "md" | "lg";

export type ToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  className?: string;
  "aria-label": string;
};

const trackVariants: Record<ToggleVariant, string> = {
  primary: "data-[checked=true]:bg-primary",
  secondary: "data-[checked=true]:bg-secondary",
  outline: "border border-border data-[checked=true]:bg-text-muted",
};

const trackSizes: Record<ToggleSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-14",
};

const thumbSizes: Record<ToggleSize, string> = {
  sm: "size-4 data-[checked=true]:translate-x-4",
  md: "size-5 data-[checked=true]:translate-x-5",
  lg: "size-6 data-[checked=true]:translate-x-7",
};

export function Toggle({
  checked,
  onChange,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
  "aria-label": ariaLabel,
  ...rest
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      data-checked={checked}
      className={cn(
        "inline-flex items-center rounded-pill bg-border p-0.5 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        trackVariants[variant],
        trackSizes[size],
        className,
      )}
      onClick={() => onChange(!checked)}
      {...rest}
    >
      <span
        data-checked={checked}
        aria-hidden="true"
        className={cn(
          "rounded-pill bg-surface shadow-sm transition-transform",
          thumbSizes[size],
        )}
      />
    </button>
  );
}
