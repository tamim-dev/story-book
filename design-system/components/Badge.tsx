import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type BadgeVariant = "primary" | "secondary" | "success" | "error";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary text-surface",
  secondary: "bg-secondary text-surface",
  success: "bg-success text-surface",
  error: "bg-error text-surface",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function Badge({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
