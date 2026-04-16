export type BadgeProps = {
  label: string;
  variant?: "success" | "warning" | "error";
};

export function Badge({ label, variant = "success" }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{label}</span>;
}
