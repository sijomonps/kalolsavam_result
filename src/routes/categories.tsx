import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/results";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Kalotsavam 2026" },
      { name: "description", content: "Browse all 7 competition categories for Kalotsavam 2026 Ragotsavam." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-primary">Categories</h1>
      <p className="text-sm text-muted-foreground mt-1">All seven competition categories at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/results"
            search={{ category: c.id }}
            className="rounded-2xl border border-border bg-card p-5 shadow-card transition hover:shadow-soft hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-2xl shadow-soft">{c.icon}</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.group}</p>
                <h2 className="font-display text-lg font-bold text-primary">{c.label}</h2>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-foreground/85">
              {c.events.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-2">
                  <span>{e.name}</span>
                  {e.isNew && <span className="text-[10px] font-bold uppercase text-maroon bg-gold-gradient rounded-full px-2 py-0.5">New</span>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold text-primary">View results →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
