export function toTableDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

export function toTableStatus(value: string): string {
  return value.replace(/_/g, " ").toLowerCase();
}
