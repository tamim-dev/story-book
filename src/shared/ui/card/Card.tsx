import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../../design-system/utils/cn";
import styles from "./Card.module.css";

export type CardVariant = "default" | "outlined" | "elevated";
export type CardSize = "sm" | "md" | "lg";

export type CardProps = HTMLAttributes<HTMLElement> & {
  title: string;
  description?: string;
  children?: ReactNode;
  variant?: CardVariant;
  size?: CardSize;
};

const variantClasses: Record<CardVariant, string> = {
  default: styles.default,
  outlined: styles.outlined,
  elevated: styles.elevated,
};

const sizeClasses: Record<CardSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
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
        styles.card,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      <h3 className={styles.title}>{title}</h3>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children ? <div className={styles.body}>{children}</div> : null}
    </section>
  );
}
