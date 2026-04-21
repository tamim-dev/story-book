import type { SelectHTMLAttributes } from "react";
import { cn } from "../../../../design-system/utils/cn";

export type FormSelectFieldProps = SelectHTMLAttributes<HTMLSelectElement>;

export function FormSelectField({
  className,
  children,
  ...props
}: FormSelectFieldProps) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface px-3 text-base text-text",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        "disabled:cursor-not-allowed disabled:bg-background disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
