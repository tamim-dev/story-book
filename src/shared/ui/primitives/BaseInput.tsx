import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../../../design-system/utils/cn";

export type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  className?: string;
};

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(function BaseInput(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border bg-surface text-text placeholder:text-text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        "disabled:cursor-not-allowed disabled:bg-background disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
});
