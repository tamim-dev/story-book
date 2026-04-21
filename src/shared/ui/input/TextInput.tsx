import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../../../design-system/utils/cn";
import { BaseInput } from "../primitives/BaseInput";

export type InputVariant = "default" | "error" | "success";
export type InputSize = "sm" | "md" | "lg";

export type TextInputProps = ComponentProps<typeof BaseInput> & {
  variant?: InputVariant;
  size?: InputSize;
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

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { variant = "default", size = "md", className, ...props },
  ref,
) {
  return (
    <BaseInput
      ref={ref}
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
});
