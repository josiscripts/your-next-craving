import { Link } from "@tanstack/react-router";

/**
 * Provisional wordmark. Swap the inner markup for the official logo file
 * when it is available — nothing else in the app needs to change.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Como la Original — ir al inicio"
      className="group inline-flex items-center gap-2"
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-lg shadow-soft transition-transform group-hover:-rotate-6"
      >
        🍪
      </span>
      <span className="font-display leading-none">
        <span
          className={`block font-extrabold tracking-tight text-foreground ${
            compact ? "text-base" : "text-lg"
          }`}
        >
          COMO LA
        </span>
        <span
          className={`block font-extrabold tracking-tight text-mauve ${
            compact ? "text-base" : "text-lg"
          }`}
        >
          ORIGINAL
        </span>
      </span>
    </Link>
  );
}
