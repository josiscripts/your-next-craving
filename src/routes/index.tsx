import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Blob, Sparkle, Squiggle } from "@/components/brand/Doodles";
import { DemoImageFrame } from "@/components/common/DemoImageFrame";
import { SimilarityScore } from "@/components/common/SimilarityScore";
import { DietaryFilter } from "@/components/search/DietaryFilter";
import { SearchBar } from "@/components/search/SearchBar";
import {
  getAlternativesForOriginalSync,
  getCategories,
  getPopularSearches,
  listOriginalsSync,
} from "@/services/productService";
import type { DietaryNeed } from "@/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Como la Original · Encuentra lo más parecido a tu antojo" },
      {
        name: "description",
        content:
          "Tú dime qué se te antoja. Nosotros encontramos lo más parecido que puedas comer: alternativas sin gluten y sin lactosa comparadas con el original.",
      },
      { property: "og:title", content: "Como la Original · Tu antojo, comparado" },
      {
        property: "og:description",
        content:
          "Busca tu antojo y descubre las alternativas más parecidas, con puntuación de sabor, textura y relleno.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Como la Original",
          description:
            "Plataforma de búsqueda y comparación de alternativas alimentarias parecidas al producto original.",
        }),
      },
    ],
  }),
  component: Home,
});

const steps = [
  { emoji: "🔍", title: "Dinos tu antojo", text: "Escribe el producto que te apetece de verdad." },
  { emoji: "🥗", title: "Elige tu necesidad", text: "Sin gluten, sin lactosa o ambas." },
  { emoji: "🏆", title: "Compara y decide", text: "Ranking con el parecido a tu original." },
];

function Home() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [need, setNeed] = useState<DietaryNeed>("sin-gluten");

  const categories = getCategories();
  const populars = getPopularSearches();
  const originals = listOriginalsSync();
  const featured = originals[0];
  const featuredTop = featured ? getAlternativesForOriginalSync(featured.id)[0] : undefined;

  function go(value: string) {
    if (!value.trim()) return;
    void navigate({ to: "/resultados", search: { q: value, need } });
  }

  return (
    <main>
      <section className="relative overflow-hidden">
        <Blob className="pointer-events-none absolute -left-24 top-10 size-72 text-blush" />
        <Blob className="pointer-events-none absolute -right-28 top-40 size-80 text-cream" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-mauve">
            <Sparkle aria-hidden="true" className="size-4" />
            Tu antojo, comparado
          </p>
          <h1 className="mt-5 text-4xl leading-tight sm:text-6xl">
            Tú dime qué se te antoja.
            <span className="block text-primary">
              Nosotros encontramos lo más parecido que puedas comer.
            </span>
          </h1>
          <Squiggle aria-hidden="true" className="mx-auto mt-4 h-4 w-40 text-primary" />

          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar value={term} onChange={setTerm} onSubmit={go} size="hero" />
          </div>

          <div className="mx-auto mt-6 max-w-2xl text-left">
            <DietaryFilter value={need} onChange={setNeed} />
          </div>

          <button
            type="button"
            onClick={() => go(term)}
            className="mt-6 inline-flex min-h-14 items-center rounded-full bg-primary px-8 font-display text-lg font-extrabold text-primary-foreground shadow-pop transition-transform hover:scale-[1.03]"
          >
            Encontrar mi alternativa
          </button>

          <div className="mt-8">
            <p className="font-display text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
              Antojos más buscados
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {populars.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => {
                      setTerm(p);
                      go(p);
                    }}
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary hover:bg-cream"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <h2 className="text-center text-3xl">Así funciona</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-3xl border-2 border-border bg-card p-6 text-center shadow-soft"
            >
              <span aria-hidden="true" className="text-4xl">
                {s.emoji}
              </span>
              <p className="mt-3 font-display text-xs font-extrabold uppercase tracking-wide text-primary">
                Paso {i + 1}
              </p>
              <h3 className="mt-1 text-xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {featured && featuredTop ? (
        <section className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-8 rounded-4xl bg-blush p-6 sm:p-10 md:grid-cols-2">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-mauve">
                Ejemplo de comparación
              </p>
              <h2 className="mt-2 text-3xl">
                {featured.name} vs {featuredTop.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{featuredTop.description}</p>
              <div className="mt-5 flex items-center gap-4">
                <SimilarityScore value={featuredTop.overallSimilarity} size="md" />
                <Link
                  to="/producto/$slug"
                  params={{ slug: featuredTop.slug }}
                  className="inline-flex min-h-12 items-center rounded-full bg-foreground px-6 font-display font-extrabold text-background"
                >
                  Ver la comparativa
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DemoImageFrame image={featured.image} emoji={featured.emoji} tone="cream" />
              <DemoImageFrame
                image={featuredTop.packageImage}
                emoji={featured.emoji}
                tone="beige"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl">Explora por categoría</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => go(cat.name)}
                className="h-full w-full rounded-3xl border-2 border-border bg-card p-6 text-left shadow-soft transition-transform hover:-translate-y-1"
              >
                <span aria-hidden="true" className="text-3xl">
                  {cat.emoji}
                </span>
                <p className="mt-2 font-display text-lg font-extrabold">{cat.name}</p>
                <p className="text-sm text-muted-foreground">Ver alternativas parecidas</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl">Antojos con alternativa</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {originals.map((o) => (
            <li key={o.id}>
              <Link
                to="/original/$slug"
                params={{ slug: o.slug }}
                className="block h-full rounded-3xl border-2 border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1"
              >
                <DemoImageFrame image={o.image} emoji={o.emoji} tone="cream" />
                <p className="mt-3 font-display text-lg font-extrabold">{o.name}</p>
                <p className="text-sm text-muted-foreground">{o.brandNote}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-4 text-center sm:px-6">
        <div className="rounded-4xl bg-cream px-6 py-12">
          <h2 className="text-3xl">¿No encuentras tu antojo?</h2>
          <p className="mt-2 text-muted-foreground">
            Cuéntanoslo y lo añadimos al catálogo de comparaciones.
          </p>
          <Link
            to="/contacto"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-extrabold text-primary-foreground"
          >
            Sugerir un producto
          </Link>
        </div>
      </section>
    </main>
  );
}
