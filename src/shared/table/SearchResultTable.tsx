import { BaseDataTable } from "./BaseDataTable";
import type { BaseDataTableProps } from "./table.types";

export function SearchResultTable<TData extends Record<string, unknown>>(
  props: BaseDataTableProps<TData>,
) {
  return <BaseDataTable {...props} />;
}
