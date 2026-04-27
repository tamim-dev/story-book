import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../../design-system/utils/cn";
import { BaseButton } from "../primitives/BaseButton";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "link"
  | "filter";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: styles.default,
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  link: styles.link,
  filter: styles.filter,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, ...rest },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref}
        className={cn(
          styles.button,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...rest}
      />
    );
  },
);
