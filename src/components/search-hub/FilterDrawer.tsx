import { useMemo, useState } from "react";
import { Button, Drawer } from "../../components";
import { useFilterContext } from "./FilterProvider";
import type { FiltersState } from "./types";
import { AccordionSection } from "./AccordionSection";

type FilterDrawerProps = {
  onClose: () => void;
};

export function FilterDrawer({ onClose }: FilterDrawerProps) {
  const {
    filters,
    globalFilters,
    setFilterValues,
    executeSearch,
    canSearchWithState,
    searchInput,
    resetAll,
  } = useFilterContext();

  const [localFilters, setLocalFilters] = useState<FiltersState>(globalFilters);
  const sortedFilters = useMemo(
    () =>
      [...filters].sort((a, b) => {
        const aIsTwoOption = a.options.length === 2 ? 0 : 1;
        const bIsTwoOption = b.options.length === 2 ? 0 : 1;
        return aIsTwoOption - bIsTwoOption;
      }),
    [filters],
  );

  const isLocalSearchEnabled = canSearchWithState(localFilters, searchInput);

  const handleResetAll = () => {
    resetAll();
    setLocalFilters({});
  };

  const handleShowResults = () => {
    for (const filter of filters) {
      setFilterValues(filter.key, localFilters[filter.key] ?? []);
    }
    executeSearch("drawer");
    onClose();
  };

  return (
    <Drawer
      onClose={onClose}
      title="Advanced Filters"
      description="Narrow your search results by using these attributes."
      closeLabel="Close filters"
      bodyClassName="space-y-2"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleResetAll}
          >
            Reset All
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            disabled={!isLocalSearchEnabled}
            onClick={handleShowResults}
          >
            Show Results
          </Button>
        </>
      }
    >
      {sortedFilters.map((filter, index) => (
        <AccordionSection
          key={filter.key}
          filterKey={filter.key}
          label={filter.label}
          options={filter.options}
          values={localFilters[filter.key] ?? []}
          onChange={(values) =>
            setLocalFilters((prev) => ({ ...prev, [filter.key]: values }))
          }
          defaultOpen={index === 0}
        />
      ))}
    </Drawer>
  );
}
