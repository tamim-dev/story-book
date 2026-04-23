/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  FilterConfig,
  FiltersState,
  SearchValidationMode,
  SelectAllState,
} from "./types";

type ExecuteSource = "topbar" | "drawer";

type SearchPayload = {
  filters: FiltersState;
  searchInput: string;
  source: ExecuteSource;
};

type FilterProviderProps = PropsWithChildren<{
  filters: FilterConfig[];
  requiredFilters?: string[];
  validationMode?: SearchValidationMode;
  initialFilters?: FiltersState;
  initialSearchInput?: string;
  onExecuteSearch?: (payload: SearchPayload) => void;
}>;

type FilterContextValue = {
  filters: FilterConfig[];
  globalFilters: FiltersState;
  searchInput: string;
  requiredFilters: string[];
  validationMode: SearchValidationMode;
  canSearch: boolean;
  hasAnyFilterSelected: boolean;
  canSearchWithState: (
    nextFilters: FiltersState,
    nextSearchInput?: string,
  ) => boolean;
  setSearchInput: (value: string) => void;
  setFilterValues: (filterKey: string, values: string[]) => void;
  resetFilter: (filterKey: string) => void;
  resetAll: () => void;
  executeSearch: (source: ExecuteSource) => void;
  getSelectAllState: (filterKey: string, values: string[]) => SelectAllState;
  toggleSelectAll: (filterKey: string, values: string[]) => string[];
  toggleOption: (
    filterKey: string,
    values: string[],
    optionValue: string,
  ) => string[];
};

const FilterContext = createContext<FilterContextValue | null>(null);

function sanitizeValues(values: string[], allowedValues: string[]) {
  const allowed = new Set(allowedValues);
  return values.filter((value) => allowed.has(value));
}

function evaluateCanSearch(
  validationMode: SearchValidationMode,
  requiredFilters: string[],
  filtersState: FiltersState,
  searchValue: string,
) {
  if (validationMode === "strict") {
    return requiredFilters.some(
      (filterKey) => (filtersState[filterKey] ?? []).length > 0,
    );
  }

  const hasAnyFilterSelected = Object.values(filtersState).some(
    (values) => values.length > 0,
  );
  return hasAnyFilterSelected || searchValue.trim().length > 0;
}

export function FilterProvider({
  children,
  filters,
  requiredFilters = [],
  validationMode = "flexible",
  initialFilters = {},
  initialSearchInput = "",
  onExecuteSearch,
}: FilterProviderProps) {
  const [globalFilters, setGlobalFilters] =
    useState<FiltersState>(initialFilters);
  const [searchInput, setSearchInput] = useState(initialSearchInput);

  const filterMap = useMemo(
    () => new Map(filters.map((filter) => [filter.key, filter])),
    [filters],
  );

  const hasAnyFilterSelected = useMemo(
    () => Object.values(globalFilters).some((values) => values.length > 0),
    [globalFilters],
  );
  const canSearch = useMemo(
    () =>
      evaluateCanSearch(
        validationMode,
        requiredFilters,
        globalFilters,
        searchInput,
      ),
    [globalFilters, requiredFilters, searchInput, validationMode],
  );

  const setFilterValues = useCallback(
    (filterKey: string, values: string[]) => {
      const filter = filterMap.get(filterKey);
      if (!filter) {
        return;
      }

      const sanitized = sanitizeValues(
        values,
        filter.options.map((option) => option.value),
      );
      setGlobalFilters((previous) => ({ ...previous, [filterKey]: sanitized }));
    },
    [filterMap],
  );

  const resetFilter = useCallback((filterKey: string) => {
    setGlobalFilters((previous) => ({ ...previous, [filterKey]: [] }));
  }, []);

  const resetAll = useCallback(() => {
    setGlobalFilters({});
    setSearchInput("");
  }, []);

  const getSelectAllState = useCallback(
    (filterKey: string, values: string[]) => {
      const filter = filterMap.get(filterKey);
      if (!filter || filter.options.length === 0 || values.length === 0) {
        return "unchecked";
      }

      if (values.length === filter.options.length) {
        return "checked";
      }
      return "indeterminate";
    },
    [filterMap],
  );

  const toggleSelectAll = useCallback(
    (filterKey: string, values: string[]) => {
      const filter = filterMap.get(filterKey);
      if (!filter) {
        return values;
      }
      const allValues = filter.options.map((option) => option.value);
      const state =
        values.length === allValues.length ? "checked" : "unchecked";
      if (state === "checked") {
        return [];
      }
      return allValues;
    },
    [filterMap],
  );

  const toggleOption = useCallback(
    (filterKey: string, values: string[], optionValue: string) => {
      const filter = filterMap.get(filterKey);
      if (!filter) {
        return values;
      }

      const nextSet = new Set(values);
      if (nextSet.has(optionValue)) {
        nextSet.delete(optionValue);
      } else {
        nextSet.add(optionValue);
      }
      return sanitizeValues(
        Array.from(nextSet),
        filter.options.map((option) => option.value),
      );
    },
    [filterMap],
  );

  const executeSearch = useCallback(
    (source: ExecuteSource) => {
      if (!canSearch) {
        return;
      }
      onExecuteSearch?.({ filters: globalFilters, searchInput, source });
    },
    [canSearch, globalFilters, onExecuteSearch, searchInput],
  );

  const value = useMemo<FilterContextValue>(
    () => ({
      filters,
      globalFilters,
      searchInput,
      requiredFilters,
      validationMode,
      canSearch,
      hasAnyFilterSelected,
      canSearchWithState: (
        nextFilters: FiltersState,
        nextSearchInput?: string,
      ) =>
        evaluateCanSearch(
          validationMode,
          requiredFilters,
          nextFilters,
          nextSearchInput ?? searchInput,
        ),
      setSearchInput,
      setFilterValues,
      resetFilter,
      resetAll,
      executeSearch,
      getSelectAllState,
      toggleSelectAll,
      toggleOption,
    }),
    [
      canSearch,
      executeSearch,
      filters,
      getSelectAllState,
      globalFilters,
      hasAnyFilterSelected,
      requiredFilters,
      resetAll,
      resetFilter,
      searchInput,
      setFilterValues,
      toggleOption,
      toggleSelectAll,
      validationMode,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within FilterProvider.");
  }
  return context;
}
