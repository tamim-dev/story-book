import { FormSelectField } from "../../form/fields/FormSelectField";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function Select({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      <FormSelectField
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelectField>
    </div>
  );
}
