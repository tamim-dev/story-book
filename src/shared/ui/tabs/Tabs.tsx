import { useRef } from "react";
import { cn } from "../../../../design-system/utils/cn";

export type TabOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type TabsProps = {
  options: TabOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  ariaLabel: string;
  allowDeselect?: boolean;
  className?: string;
  tabClassName?: string;
};

export function Tabs({
  options,
  value,
  onChange,
  ariaLabel,
  allowDeselect = false,
  className,
  tabClassName,
}: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const getNextEnabledIndex = (startIndex: number, step: 1 | -1) => {
    let currentIndex = startIndex;
    for (let i = 0; i < options.length; i += 1) {
      currentIndex = (currentIndex + step + options.length) % options.length;
      if (!options[currentIndex]?.disabled) {
        return currentIndex;
      }
    }
    return startIndex;
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-full w-full items-center rounded-xl border border-border bg-background p-1",
        className,
      )}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-disabled={option.disabled}
            tabIndex={isSelected ? 0 : -1}
            disabled={option.disabled}
            onClick={() => {
              if (allowDeselect && isSelected) {
                onChange(null);
                return;
              }
              onChange(option.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const step: 1 | -1 = event.key === "ArrowRight" ? 1 : -1;
                const nextIndex = getNextEnabledIndex(index, step);
                tabRefs.current[nextIndex]?.focus();
              }

              if (event.key === "Home") {
                event.preventDefault();
                const firstEnabledIndex = options.findIndex(
                  (tab) => !tab.disabled,
                );
                if (firstEnabledIndex >= 0) {
                  tabRefs.current[firstEnabledIndex]?.focus();
                }
              }

              if (event.key === "End") {
                event.preventDefault();
                const reversedIndex = [...options]
                  .reverse()
                  .findIndex((tab) => !tab.disabled);
                if (reversedIndex >= 0) {
                  const lastEnabledIndex = options.length - 1 - reversedIndex;
                  tabRefs.current[lastEnabledIndex]?.focus();
                }
              }

              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (!option.disabled) {
                  if (allowDeselect && isSelected) {
                    onChange(null);
                    return;
                  }
                  onChange(option.value);
                }
              }
            }}
            className={cn(
              "h-9 flex-1 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
              isSelected
                ? "bg-surface text-text shadow-sm"
                : "text-text-muted hover:bg-surface hover:text-text",
              option.disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer",
              tabClassName,
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
