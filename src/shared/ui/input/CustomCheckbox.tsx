import { useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../../../design-system/utils/cn";

export type CustomCheckboxState = "checked" | "indeterminate" | "unchecked";

export type CustomCheckboxProps = {
  state: CustomCheckboxState;
  onChange: () => void;
  className?: string;
};

export function CustomCheckbox({
  state,
  onChange,
  className,
}: CustomCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isChecked = state === "checked";
  const isIndeterminate = state === "indeterminate";
  const isActive = isChecked || isIndeterminate;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <span
      className={cn(
        "relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
        isActive
          ? "border-primary bg-primary text-surface"
          : "border-text-muted bg-background text-transparent",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        onChange={onChange}
        className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
      />
      {isIndeterminate && !isChecked ? (
        <Minus className="h-3 w-3" strokeWidth={2.5} />
      ) : isChecked ? (
        <Check className="h-3 w-3" strokeWidth={2.5} />
      ) : null}
    </span>
  );
}
