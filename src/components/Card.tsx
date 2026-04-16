import type { ReactNode } from "react";

export type CardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function Card({ title, description, children }: CardProps) {
  return (
    <section className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      {children ? <div className="card-content">{children}</div> : null}
    </section>
  );
}
