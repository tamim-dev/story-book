export type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "error" | "warning" | "success";
  size?: "small" | "medium" | "large";
};

export const Button = ({
  label,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${disabled ? "btn-disabled" : ""}`}
    >
      {label}
    </button>
  );
};