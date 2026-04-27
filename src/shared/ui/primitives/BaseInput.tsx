import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../../../design-system/utils/cn";

export type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  className?: string;
};

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  function BaseInput({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn("appearance-none outline-none", className)}
        {...props}
      />
    );
  },
);
