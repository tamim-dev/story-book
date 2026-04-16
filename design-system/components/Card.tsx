import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type CardVariant = "default" | "outlined" | "elevated";
export type CardSize = "sm" | "md" | "lg";

export type CardProps = HTMLAttributes<HTMLElement> & {
  title: string;
  description?: string;
  children?: ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
};

const variantClasses: Record<CardVariant, string> = {
  default: "border border-border bg-surface",
  outlined: "border-2 border-secondary bg-surface",
  elevated: "border border-transparent bg-surface shadow-md",
};

const sizeClasses: Record<CardSize, string> = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  title,
  description,
  children,
  variant = "default",
  size = "md",
  className,
  ...rest
}: CardProps) {
  return (
    <section
      className={cn(
        "rounded-lg text-left text-text",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {description ? <p className="text-sm text-text-muted">{description}</p> : null}
      {children ? <div className="mt-3 text-sm text-text">{children}</div> : null}
    </section>
  );
}
