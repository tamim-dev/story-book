import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, Tabs } from "../../components";
import { FilterSection } from "./FilterSection";
import { useFilterContext } from "./FilterProvider";
import { ChevronDown, ListFilter, Search } from "lucide-react";
import { FilterDrawer } from "./FilterDrawer";

const ALL_TAB_VALUE = "__all__";

export function TopFilterBar() {
  const {
    filters,
    globalFilters,
    searchInput,
    setSearchInput,
    setFilterValues,
    resetAll,
    executeSearch,
    canSearch,
  } = useFilterContext();

  const [activeFilterKey, setActiveFilterKey] = useState<string | null>(null);
  const [draftFilters, setDraftFilters] = useState<Record<string, string[]>>(
    {},
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [partiallyHiddenFilterKeys, setPartiallyHiddenFilterKeys] = useState<
    Set<string>
  >(new Set());
  const filtersRowRef = useRef<HTMLDivElement | null>(null);
  const filterItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const sortedFilters = useMemo(
    () =>
      [...filters].sort((a, b) => {
        const aIsTwoOption = a.options.length === 2 ? 0 : 1;
        const bIsTwoOption = b.options.length === 2 ? 0 : 1;
        return aIsTwoOption - bIsTwoOption;
      }),
    [filters],
  );

  const openFilter = (filterKey: string) => {
    setDraftFilters((previous) => ({
      ...previous,
      [filterKey]: [...(globalFilters[filterKey] ?? [])],
    }));
    setActiveFilterKey(filterKey);
  };

  const closeFilter = useCallback(() => setActiveFilterKey(null), []);

  useEffect(() => {
    if (!activeFilterKey) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const activeItem = filterItemRefs.current[activeFilterKey];
      if (activeItem && !activeItem.contains(target)) {
        closeFilter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeFilterKey, closeFilter]);

  useEffect(() => {
    const root = filtersRowRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setPartiallyHiddenFilterKeys((previous) => {
          const next = new Set(previous);

          entries.forEach((entry) => {
            const key = entry.target.getAttribute("data-filter-key");
            if (!key) return;

            if (entry.intersectionRatio < 1) {
              next.add(key);
            } else {
              next.delete(key);
            }
          });

          return next;
        });
      },
      {
        root,
        threshold: 1,
      },
    );

    const targets = sortedFilters
      .map((filter) => filterItemRefs.current[filter.key])
      .filter((node): node is HTMLDivElement => Boolean(node));

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [sortedFilters]);

  return (
    <section className="rounded-xl border border-border bg-surface p-3">
      <div className="relative">
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search by ID, name, contract..."
          className="min-w-[220px] flex-1 !pl-8 pr-2"
        />
        <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div
          ref={filtersRowRef}
          className="flex min-w-0 flex-1 gap-2 overflow-x-clip"
        >
          <div className="flex shrink-0 self-stretch">
            <Button
              type="button"
              variant="outline"
              size="md"
              aria-label="Open advanced filters"
              onClick={() => setIsDrawerOpen(true)}
            >
              <ListFilter className="size-4" />
            </Button>
          </div>
          {sortedFilters.map((filter) => {
            const selectedValues = globalFilters[filter.key] ?? [];
            const selectedCount = selectedValues.length;
            const isTabFilter = filter.options.length <= 2;
            const isOpen = activeFilterKey === filter.key;

            if (isTabFilter) {
              const tabsValue =
                selectedValues.length === 1 ? selectedValues[0] : ALL_TAB_VALUE;

              return (
                <div
                  key={filter.key}
                  data-filter-key={filter.key}
                  ref={(node) => {
                    filterItemRefs.current[filter.key] = node;
                  }}
                  className={`shrink-0 ${partiallyHiddenFilterKeys.has(filter.key) ? "pointer-events-none invisible" : ""}`}
                >
                  <Tabs
                    ariaLabel={`${filter.label} quick filter`}
                    options={[
                      { label: `All ${filter.label}`, value: ALL_TAB_VALUE },
                      ...filter.options,
                    ]}
                    value={tabsValue}
                    onChange={(nextValue) =>
                      setFilterValues(
                        filter.key,
                        !nextValue || nextValue === ALL_TAB_VALUE
                          ? []
                          : [nextValue],
                      )
                    }
                    className="w-auto shrink-0 gap-1 border-0 bg-gray-100 p-1 shadow-none"
                    tabClassName="min-w-fit px-4 text-sm font-medium"
                  />
                </div>
              );
            }

            return (
              <div
                key={filter.key}
                data-filter-key={filter.key}
                ref={(node) => {
                  filterItemRefs.current[filter.key] = node;
                }}
                className={`relative shrink-0 ${partiallyHiddenFilterKeys.has(filter.key) ? "pointer-events-none invisible" : ""}`}
              >
                <Button
                  type="button"
                  variant="filter"
                  size="md"
                  className="h-full"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() =>
                    isOpen ? closeFilter() : openFilter(filter.key)
                  }
                >
                  <span>{filter.label}</span>
                  {selectedCount > 0 ? (
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-surface">
                      {selectedCount}
                    </span>
                  ) : null}
                  <ChevronDown
                    className={`size-4 text-text-muted transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </Button>
                {isOpen ? (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-[calc(100%+10px)] z-20 w-96 max-w-[calc(100vw-2rem)]"
                  >
                    <FilterSection
                      filter={filter}
                      values={
                        draftFilters[filter.key] ??
                        globalFilters[filter.key] ??
                        []
                      }
                      onChange={(nextValues) =>
                        setDraftFilters((previous) => ({
                          ...previous,
                          [filter.key]: nextValues,
                        }))
                      }
                      showActions
                      onClose={closeFilter}
                      onDone={() => {
                        const nextValues =
                          draftFilters[filter.key] ??
                          globalFilters[filter.key] ??
                          [];
                        setFilterValues(filter.key, nextValues);
                        closeFilter();
                      }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="flex shrink-0 justify-end">
          <Button
            type="button"
            size="md"
            variant="primary"
            onClick={() => {
              executeSearch("topbar");
              resetAll();
            }}
            disabled={!canSearch}
          >
            Search
          </Button>
        </div>
      </div>
      {isDrawerOpen ? (
        <FilterDrawer onClose={() => setIsDrawerOpen(false)} />
      ) : null}
    </section>
  );
}
