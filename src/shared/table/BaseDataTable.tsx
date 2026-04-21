import type { BaseDataTableProps } from "./table.types";

export function BaseDataTable<TData extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
}: BaseDataTableProps<TData>) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-border">
          {columns.map((column) => (
            <th key={String(column.key)} className="px-3 py-2 font-semibold text-text">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={rowKey(row, index)} className="border-b border-border">
            {columns.map((column) => (
              <td key={String(column.key)} className="px-3 py-2 text-text-muted">
                {String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
