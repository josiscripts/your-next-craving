import { Check } from "lucide-react";
import type { DietaryNeed } from "@/types";

const options: Array<{ value: DietaryNeed; label: string; emoji: string; hint: string }> = [
  { value: "sin-gluten", label: "Sin gluten", emoji: "🌾", hint: "Sin trigo, cebada ni centeno" },
  { value: "sin-lactosa", label: "Sin lactosa", emoji: "🥛", hint: "Sin lactosa añadida" },
  {
    value: "sin-gluten-sin-lactosa",
    label: "Sin gluten + Sin lactosa",
    emoji: "✨",
    hint: "Las dos condiciones a la vez",
  },
];

interface Props {
  value: DietaryNeed;
  onChange: (value: DietaryNeed) => void;
  layout?: "grid" | "row";
}

export function DietaryFilter({ value, onChange, layout = "grid" }: Props) {
  return (
    <fieldset>
      <legend className="mb-3 font-display text-xl font-extrabold sm:text-2xl">
        ¿Qué necesitas?
      </legend>
      <div
        className={
          layout === "grid" ? "grid gap-3 sm:grid-cols-3" : "flex flex-wrap gap-2"
        }
        role="radiogroup"
        aria-label="Necesidades alimentarias"
      >
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`flex min-h-14 items-center gap-3 rounded-3xl border-2 bg-card px-4 py-3 text-left transition-all ${
                selected
                  ? "border-primary shadow-card"
                  : "border-border hover:border-primary/60 hover:shadow-soft"
              }`}
            >
              <span aria-hidden="true" className="text-2xl">
                {option.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm font-extrabold uppercase tracking-wide">
                  {option.label}
                </span>
                {layout === "grid" ? (
                  <span className="block text-xs text-muted-foreground">{option.hint}</span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                  selected ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {selected ? <Check className="size-3.5 text-primary-foreground" /> : null}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Solo mostraremos alternativas que cumplan esta condición cuando podamos verificarlo.
      </p>
    </fieldset>
  );
}
