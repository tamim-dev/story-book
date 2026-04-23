import { useEffect, useRef, useState } from "react";
import { CustomCheckbox } from "../../shared/ui/input";
import { useFilterContext } from "./FilterProvider";
import type { FilterOption } from "./types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../Button";

type AccordionSectionProps = {
  filterKey: string;
  label: string;
  options: FilterOption[];
  values: string[];
  onChange: (values: string[]) => void;
  defaultOpen?: boolean;
};

export function AccordionSection({
  filterKey,
  label,
  options,
  values,
  onChange,
  defaultOpen = false,
}: AccordionSectionProps) {
  const { getSelectAllState, toggleOption, toggleSelectAll } =
    useFilterContext();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const count = values.length;
  const selectAllState = getSelectAllState(filterKey, values);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.maxHeight = isOpen ? `${el.scrollHeight}px` : "0px";
  }, [isOpen, options, values]);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      {/* Accordion header */}
      <Button
        variant="default"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 p-4 py-6 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text">{label}</span>
          {count > 0 && (
            <span className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary">
              {count}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {count > 0 && isOpen && (
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
          <span className="text-text-muted">
            {isOpen ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </span>
        </div>
      </Button>

      <div
        ref={bodyRef}
        className={`border-t border-border${isOpen ? "open" : ""}`}
        style={{ maxHeight: defaultOpen ? `${9999}px` : "0px" }}
      >
        <div className="space-y-3 px-4 py-3">
          <label className="flex cursor-pointer items-center gap-2.5">
            <CustomCheckbox
              state={selectAllState}
              onChange={() => onChange(toggleSelectAll(filterKey, values))}
            />
            <span className="text-sm font-medium text-text">Select All</span>
          </label>

          <div className="border-t border-border" />

          {options.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <CustomCheckbox
                state={values.includes(option.value) ? "checked" : "unchecked"}
                onChange={() =>
                  onChange(toggleOption(filterKey, values, option.value))
                }
              />
              <span className="text-[13px] text-text">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
