import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DemoImageFrame } from "@/components/common/DemoImageFrame";
import { FavoriteButton } from "@/components/common/FavoriteButton";
import { ScoreBreakdown } from "@/components/common/ScoreBreakdown";
import { SimilarityScore } from "@/components/common/SimilarityScore";
import { getCategory } from "@/services/productService";
import type { AlternativeProduct } from "@/types";

const rankBadges = ["🥇", "🥈", "🥉", "4", "5"];

interface Props {
  product: AlternativeProduct;
  rank: number;
  emoji: string;
  index?: number;
}

export function ProductCard({ product, rank, emoji, index = 0 }: Props) {
  const category = getCategory(product.categoryId);
  const isTop = rank === 1;

  return (
    <article
      className="animate-rise overflow-hidden rounded-4xl border-2 border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {isTop ? (
        <p className="bg-primary px-5 py-2 text-center font-display text-xs font-extrabold uppercase tracking-wide text-primary-foreground">
          ⭐ La alternativa más parecida al original
        </p>
      ) : null}

      <div className="grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
        <div className="flex gap-3 sm:w-44 sm:flex-col">
          <DemoImageFrame image={product.packageImage} emoji={emoji} className="flex-1" />
          <DemoImageFrame
            image={product.openProductImage}
            emoji="🍽️"
            tone="blush"
            className="flex-1"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full bg-cream text-base"
                >
                  {rankBadges[rank - 1] ?? rank}
                </span>
                <span className="sr-only">{`Puesto ${rank}. `}</span>
                {product.brand}
              </p>
              <h3 className="mt-1 text-2xl">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category ? `${category.emoji} ${category.name}` : "Producto"}
              </p>
            </div>
            <div className="text-center">
              <SimilarityScore value={product.overallSimilarity} size="sm" />
              <p className="mt-1 font-display text-[11px] font-extrabold uppercase tracking-wide">
                🏆 parecido
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm">{product.description}</p>

          <div className="mt-4">
            <ScoreBreakdown
              scores={[
                { emoji: "😋", label: "Sabor", value: product.tasteScore },
                { emoji: "🦷", label: "Textura", value: product.textureScore },
                { emoji: "🍪", label: "Parecido al original", value: product.similarityScore },
                { emoji: "🥛", label: "Crema / relleno", value: product.fillingScore },
              ]}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/producto/$slug"
              params={{ slug: product.slug }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-bold text-background transition-transform hover:scale-[1.02]"
            >
              Ver ficha completa
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <FavoriteButton alternativeId={product.id} originalId={product.originalProductId} />
          </div>
        </div>
      </div>
    </article>
  );
}
