import { useEffect, useId, useRef, useState } from "react";
import { Search } from "lucide-react";
import { getSuggestions } from "@/services/productService";
import type { SearchSuggestion } from "@/types";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  size?: "hero" | "compact";
  autoFocusOnMount?: boolean;
}

const kindLabel: Record<SearchSuggestion["kind"], string> = {
  original: "Producto original",
  alternativas: "Ver alternativas",
  categoria: "Categoría",
};

export function SearchBar({
  value,
  onChange,
  onSubmit,
  size = "hero",
  autoFocusOnMount = false,
}: Props) {
  const inputId = useId();
  const listId = `${inputId}-suggestions`;
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSuggestions(getSuggestions(value));
  }, [value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const hero = size === "hero";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          onSubmit(value);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Busca un producto original
        </label>
        <div
          className={`flex items-center gap-2 rounded-full border-2 border-foreground bg-card shadow-card transition-shadow focus-within:shadow-pop ${
            hero ? "px-4 py-2 sm:px-5 sm:py-3" : "px-3 py-1.5"
          }`}
        >
          <Search aria-hidden="true" className={hero ? "size-5 shrink-0" : "size-4 shrink-0"} />
          <input
            id={inputId}
            type="search"
            value={value}
            autoFocus={autoFocusOnMount}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            role="combobox"
            aria-expanded={open && suggestions.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            placeholder="Busca Oreo, KitKat, Magnum, Donuts…"
            className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${
              hero ? "min-h-11 text-base sm:text-lg" : "min-h-10 text-sm"
            }`}
          />
          <button
            type="submit"
            className={`shrink-0 rounded-full bg-primary font-display font-extrabold text-primary-foreground transition-transform hover:scale-[1.03] ${
              hero ? "min-h-11 px-5 text-sm sm:px-6" : "min-h-9 px-4 text-xs"
            }`}
          >
            Buscar
          </button>
        </div>
      </form>

      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Sugerencias de búsqueda"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-3xl border border-border bg-card shadow-pop"
        >
          {suggestions.map((s) => (
            <li key={s.id} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => {
                  onChange(s.label);
                  setOpen(false);
                  onSubmit(s.originalSlug);
                }}
                className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-cream"
              >
                <span className="font-semibold">{s.label}</span>
                <span className="text-xs text-muted-foreground">{kindLabel[s.kind]}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
