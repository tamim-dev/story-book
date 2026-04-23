export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig = {
  key: string;
  label: string;
  options: FilterOption[];
};

export type FiltersState = Record<string, string[]>;

export type SelectAllState = "checked" | "indeterminate" | "unchecked";

export type SearchValidationMode = "strict" | "flexible";
