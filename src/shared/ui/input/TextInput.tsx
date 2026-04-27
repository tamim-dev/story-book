import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../../../design-system/utils/cn";
import { BaseInput } from "../primitives/BaseInput";
import styles from "./TextInput.module.css";

export type InputVariant = "default" | "error" | "success";
export type InputSize = "sm" | "md" | "lg";

export type TextInputProps = ComponentProps<typeof BaseInput> & {
  variant?: InputVariant;
  size?: InputSize;
};

const variantClasses: Record<InputVariant, string> = {
  default: styles.default,
  error: styles.error,
  success: styles.success,
};

const sizeClasses: Record<InputSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { variant = "default", size = "md", className, ...props },
    ref,
  ) {
    return (
      <BaseInput
        ref={ref}
        className={cn(
          styles.input,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
