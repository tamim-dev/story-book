import type { ComponentProps } from "react";
import { cn } from "../../../../design-system/utils/cn";
import { BaseButton } from "../primitives/BaseButton";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "link";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ComponentProps<typeof BaseButton> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "",
  primary: "bg-primary text-surface hover:bg-primary-hover",
  secondary: "bg-secondary text-surface hover:bg-secondary-hover",
  outline: "border border-border bg-surface text-text hover:bg-background",
  link: "text-primary hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-5 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    />
  );
}
