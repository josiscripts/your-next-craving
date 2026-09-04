import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, User, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useFavorites } from "@/hooks/useFavorites";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/como-funciona", label: "Cómo funciona" },
  { to: "/mis-antojos", label: "Mis antojos" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-background/90 backdrop-blur transition-all ${
        scrolled ? "border-border py-2 shadow-soft" : "border-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Logo compact={scrolled} />

        <nav aria-label="Navegación principal" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-blush" }}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors hover:bg-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/mis-antojos"
            className="relative inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-border px-3 text-sm font-bold transition-colors hover:border-mauve hover:bg-blush sm:px-4"
          >
            <Heart aria-hidden="true" className="size-4 text-mauve" />
            <span className="hidden sm:inline">Mis antojos</span>
            {favorites.length > 0 ? (
              <span className="grid min-w-5 place-items-center rounded-full bg-mauve px-1.5 text-xs font-bold text-mauve-foreground">
                {favorites.length}
              </span>
            ) : null}
          </Link>

          <Link
            to="/contacto"
            aria-label="Contacto y perfil"
            className="hidden size-11 place-items-center rounded-full border-2 border-border transition-colors hover:border-primary md:grid"
          >
            <User aria-hidden="true" className="size-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-11 place-items-center rounded-full border-2 border-border md:hidden"
          >
            {open ? <Menu aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="mx-auto mt-3 max-w-6xl px-4 md:hidden sm:px-6"
        >
          <ul className="overflow-hidden rounded-3xl border border-border bg-card">
            {navItems.map((item) => (
              <li key={item.to} className="border-b border-border last:border-0">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center px-5 text-sm font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border">
              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center px-5 text-sm font-semibold"
              >
                Contacto
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold"
          >
            <X aria-hidden="true" className="size-4" /> Cerrar
          </button>
        </nav>
      ) : null}
    </header>
  );
}
