import type { InputHTMLAttributes } from "react";

type RadioOption = {
  label: string;
  value: string;
};

export type FormRadioGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  options: RadioOption[];
  name: string;
  selectedValue?: string;
};

export function FormRadioGroup({
  options,
  name,
  selectedValue,
  className,
  ...props
}: FormRadioGroupProps) {
  return (
    <div className={className}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 text-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue ? selectedValue === option.value : undefined}
            {...props}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
