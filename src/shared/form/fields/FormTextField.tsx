import type { TextInputProps } from "../../ui/input";
import { TextInput } from "../../ui/input";

export type FormTextFieldProps = TextInputProps & {
  hasError?: boolean;
};

export function FormTextField({ hasError, variant, ...props }: FormTextFieldProps) {
  const resolvedVariant = hasError ? "error" : (variant ?? "default");
  return <TextInput variant={resolvedVariant} {...props} />;
}
