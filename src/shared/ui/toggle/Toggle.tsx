import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../../../design-system/utils/cn";
import styles from "./Toggle.module.css";

export type ToggleVariant = "primary" | "secondary" | "outline";
export type ToggleSize = "sm" | "md" | "lg";

export type ToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  "aria-label": string;
};

const variantClasses: Record<ToggleVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
};

const trackSizeClasses: Record<ToggleSize, string> = {
  sm: styles.smTrack,
  md: styles.mdTrack,
  lg: styles.lgTrack,
};

const thumbSizeClasses: Record<ToggleSize, string> = {
  sm: styles.smThumb,
  md: styles.mdThumb,
  lg: styles.lgThumb,
};

export function Toggle({
  checked,
  onChange,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
  "aria-label": ariaLabel,
  ...rest
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(
        styles.track,
        variantClasses[variant],
        trackSizeClasses[size],
        className,
      )}
      onClick={() => onChange(!checked)}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(styles.thumb, thumbSizeClasses[size])}
      />
    </button>
  );
}
