import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { categories, eventInfo } from "@/data/results";
import { ResultCard } from "@/components/ResultCard";
import { Search } from "lucide-react";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/results")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Results — Kalotsavam 2026" },
      { name: "description", content: "Live category-wise event results for Kalotsavam 2026 Ragotsavam by JCI India Zone 22." },
    ],
  }),
  component: ResultsPage,
});

const GROUPS = ["All", "Infants & Kiddies", "Students", "JC Members"] as const;

function ResultsPage() {
  const { category, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");

  const filtered = useMemo(() => {
    return categories
      .filter((c) => (category ? c.id === category : true))
      .filter((c) => (group === "All" ? true : c.group === group))
      .map((c) => ({
        ...c,
        events: c.events.filter((e) =>
          query.trim() ? e.name.toLowerCase().includes(query.toLowerCase()) : true
        ),
      }))
      .filter((c) => c.events.length > 0);
  }, [category, group, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div>
        <h1 className="font-display text-4xl font-bold text-primary">Results</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Category-wise winners across all events.
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            navigate({ search: (s: any) => ({ ...s, q: e.target.value || undefined }) });
          }}
          placeholder="Search events (e.g. Classical Dance, Elocution)…"
          className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-3 text-sm shadow-card outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Group filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
              group === g
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Category chip filter */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => navigate({ search: (s: any) => ({ ...s, category: undefined }) })}
          className={`rounded-full px-3 py-1 text-xs font-medium border ${
            !category ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-secondary"
          }`}
        >
          All Categories
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate({ search: (s: any) => ({ ...s, category: c.id }) })}
            className={`rounded-full px-3 py-1 text-xs font-medium border ${
              category === c.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-card hover:bg-secondary"
            }`}
          >
            {c.icon} Cat {c.id}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-10 space-y-12">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">No events match your filters.</p>
          </div>
        )}
        {filtered.map((c) => (
          <section key={c.id}>
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-xl">{c.icon}</span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.group}</p>
                <h2 className="font-display text-2xl font-bold text-primary">{c.label}</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.events.map((e) => (
                <ResultCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        Need to update results?{" "}
        <Link to="/" className="text-primary font-medium">See organiser notes</Link> · Results are edited in{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5">src/data/results.ts</code>.
      </p>
    </div>
  );
}
