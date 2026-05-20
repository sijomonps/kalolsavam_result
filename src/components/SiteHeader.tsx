import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { eventInfo } from "@/data/results";

const nav = [
  { to: "/", label: "Home" },
  { to: "/brochure", label: "Brochure" },
  { to: "/guidelines", label: "Guidelines" },
  { to: "/results", label: "Results" },
  { to: "/categories", label: "Categories" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="kerala-border h-1.5 w-full" aria-hidden />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-gradient text-maroon font-display text-lg font-bold shadow-soft">
            R
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-primary">{eventInfo.title}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{eventInfo.tagline}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              inactiveProps={{ className: "text-foreground hover:bg-secondary" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden rounded-md p-2 text-primary hover:bg-secondary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              inactiveProps={{ className: "text-foreground hover:bg-secondary" }}
              className="rounded-md px-3 py-2 text-sm font-medium"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
