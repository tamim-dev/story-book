import { BaseDataTable } from "./BaseDataTable";
import type { BaseDataTableProps } from "./table.types";

export type SelectableTableProps<TData extends Record<string, unknown>> = BaseDataTableProps<TData> & {
  selectedRowIds?: string[];
};

export function SelectableTable<TData extends Record<string, unknown>>({
  selectedRowIds,
  ...props
}: SelectableTableProps<TData>) {
  void selectedRowIds;
  return <BaseDataTable {...props} />;
}
