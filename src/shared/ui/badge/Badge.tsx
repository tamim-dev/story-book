import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../../design-system/utils/cn";
import styles from "./Badge.module.css";

export type BadgeVariant = "primary" | "secondary" | "success" | "error";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  error: styles.error,
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
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
        styles.badge,
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
