import type { ReactNode } from "react";

interface Props {
  emoji?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ emoji = "🔎", title, description, action }: Props) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <span aria-hidden="true" className="text-5xl">
        {emoji}
      </span>
      <h2 className="mt-4 text-2xl">{title}</h2>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
