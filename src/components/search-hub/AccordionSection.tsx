import { useState } from "react";
import { CustomCheckbox } from "../../shared/ui/input";
import { useFilterContext } from "./FilterProvider";
import type { FilterOption } from "./types";
import { ChevronDown } from "lucide-react";
import { Button } from "../Button";
import { cn } from "../../../design-system/utils/cn";
import styles from "./AccordionSection.module.css";

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
  const count = values.length;
  const selectAllState = getSelectAllState(filterKey, values);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.trigger}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className={styles.label}>{label}</span>
          {count > 0 && <span className={styles.count}>{count}</span>}
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
          <ChevronDown className={styles.chevron} data-open={isOpen} />
        </div>
      </button>

      <div
        className={styles.collapsible}
        data-open={isOpen}
        role="region"
        aria-hidden={!isOpen}
      >
        <div className={styles.inner}>
          <div className={styles.content}>
            <label className={styles.optionLabel}>
              <CustomCheckbox
                state={selectAllState}
                onChange={() => onChange(toggleSelectAll(filterKey, values))}
              />
              <span className={styles.selectAllText}>Select All</span>
            </label>

            <hr className={styles.divider} />

            {options.map((option) => (
              <label key={option.value} className={styles.optionLabel}>
                <CustomCheckbox
                  state={
                    values.includes(option.value) ? "checked" : "unchecked"
                  }
                  onChange={() =>
                    onChange(toggleOption(filterKey, values, option.value))
                  }
                />
                <span className={cn(styles.optionText)}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
