export type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="rounded-xl border border-dashed border-border bg-surface p-8 text-center"
    >
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}
