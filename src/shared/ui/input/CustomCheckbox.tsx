import { useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../../../design-system/utils/cn";
import styles from "./CustomCheckbox.module.css";

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
    <span className={cn(styles.checkbox, isActive && styles.active, className)}>
      <input
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        onChange={onChange}
        className={styles.hiddenInput}
      />
      {isIndeterminate && !isChecked ? (
        <Minus className={styles.icon} strokeWidth={2.5} />
      ) : isChecked ? (
        <Check className={styles.icon} strokeWidth={2.5} />
      ) : null}
    </span>
  );
}
