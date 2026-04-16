import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type InputVariant = "default" | "error" | "success";
export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
};

const variantClasses: Record<InputVariant, string> = {
  default: "border-border focus-visible:border-primary",
  error: "border-error focus-visible:border-error",
  success: "border-success focus-visible:border-success",
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = "default", size = "md", className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border bg-surface text-text placeholder:text-text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        "disabled:cursor-not-allowed disabled:bg-background disabled:opacity-70",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
});
