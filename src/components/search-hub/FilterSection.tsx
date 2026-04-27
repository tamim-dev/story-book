import { Button, Tabs } from "../../components";
import type { FilterConfig } from "./types";
import { useFilterContext } from "./FilterProvider";
import { CustomCheckbox } from "../../shared/ui/input";
import { X } from "lucide-react";

type FilterSectionProps = {
  filter: FilterConfig;
  values: string[];
  onChange: (values: string[]) => void;
  showActions?: boolean;
  onDone?: () => void;
  onClose?: () => void;
};

export function FilterSection({
  filter,
  values,
  onChange,
  showActions = false,
  onDone,
  onClose,
}: FilterSectionProps) {
  const { getSelectAllState, toggleOption, toggleSelectAll } =
    useFilterContext();
  const selectAllState = getSelectAllState(filter.key, values);
  const shouldUseTabs = filter.options.length <= 2;
  const selectedTabValue = values[0] ?? null;

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-text">{filter.label}</span>
        {showActions ? (
          <Button
            variant="link"
            size="sm"
            aria-label="Close filter"
            onClick={onClose ?? onDone}
          >
            <X className="size-4" />
          </Button>
        ) : (
          <Button variant="link" size="sm" onClick={() => onChange([])}>
            Reset
          </Button>
        )}
      </div>

      {shouldUseTabs ? (
        <Tabs
          ariaLabel={`${filter.label} filter`}
          options={filter.options}
          value={selectedTabValue}
          allowDeselect
          onChange={(nextValue) => onChange(nextValue ? [nextValue] : [])}
        />
      ) : (
        <>
          <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-text">
            <CustomCheckbox
              state={selectAllState}
              onChange={() => onChange(toggleSelectAll(filter.key, values))}
            />
            <span className="text-sm text-text">Select All</span>
          </label>

          <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {filter.options.map((option) => {
              const checked = values.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 text-sm text-text-muted"
                >
                  <CustomCheckbox
                    state={checked ? "checked" : "unchecked"}
                    onChange={() =>
                      onChange(toggleOption(filter.key, values, option.value))
                    }
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </>
      )}

      {showActions ? (
        <div className="mt-4 flex items-center gap-4">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onChange([])}
          >
            Reset
          </Button>
          <Button type="button" size="sm" className="flex-1" onClick={onDone}>
            Done
          </Button>
        </div>
      ) : null}
    </section>
  );
}
