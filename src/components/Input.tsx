import type { ChangeEvent } from "react";

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "default" | "error";
};

export function Input({
  value,
  onChange,
  placeholder,
  disabled = false,
  size = "medium",
  variant = "default",
}: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`input input-${size} input-${variant}`}
    />
  );
}
