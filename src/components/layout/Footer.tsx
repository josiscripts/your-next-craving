import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Squiggle } from "@/components/brand/Doodles";

const columns = [
  {
    title: "Descubre",
    links: [
      { to: "/", label: "Buscar un antojo" },
      { to: "/como-funciona", label: "Cómo funciona" },
      { to: "/mis-antojos", label: "Mis antojos" },
      { to: "/como-funciona", label: "Nuestro método" },
    ],
  },
  {
    title: "Sobre nosotros",
    links: [
      { to: "/sobre-nosotros", label: "Quiénes somos" },
      { to: "/contacto", label: "Contacto" },
      { to: "/contacto", label: "Sugerir un producto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/aviso-legal", label: "Aviso legal" },
      { to: "/privacidad", label: "Política de privacidad" },
      { to: "/cookies", label: "Política de cookies" },
      { to: "/terminos", label: "Términos y condiciones" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-display text-xl font-extrabold">
              Tu antojo, comparado.
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Encuentra lo más parecido a tu antojo favorito y descubre por qué se parece.
            </p>
            <Squiggle aria-hidden="true" className="mt-4 h-4 w-28 text-primary" />
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-display text-sm font-extrabold uppercase tracking-wide">
                  {col.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}`}>
                      <Link
                        to={link.to}
                        className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Como la Original. Todos los derechos reservados. Como la Original no vende
          productos: comparamos alternativas y te enviamos a la tienda.
        </p>
      </div>
    </footer>
  );
}
