import type { FormTextFieldProps } from "./FormTextField";
import { FormTextField } from "./FormTextField";

export type FormDateFieldProps = Omit<FormTextFieldProps, "type">;

export function FormDateField(props: FormDateFieldProps) {
  return <FormTextField type="date" {...props} />;
}
