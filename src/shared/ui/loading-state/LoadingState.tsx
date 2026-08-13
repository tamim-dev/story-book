export type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      {label}
    </div>
  );
}
