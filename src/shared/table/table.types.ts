export type TableColumn<TData> = {
  key: keyof TData;
  header: string;
};

export type BaseDataTableProps<TData extends Record<string, unknown>> = {
  columns: TableColumn<TData>[];
  rows: TData[];
  rowKey: (row: TData, index: number) => string;
};
