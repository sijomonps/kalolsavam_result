import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, eventInfo } from "@/data/results";
import { Trophy, FileText, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ragolsavam 2026 | JCI India Zone 22" },
      { name: "description", content: "Welcome to Ragolsavam 2026. View live competition results, brochure and event guidelines." },
    ],
  }),
  component: Home,
});

function Home() {
  const totalEvents = categories.reduce((s, c) => s + c.events.length, 0);
  const newCount = categories.reduce((s, c) => s + c.events.filter(e => e.isNew).length, 0);

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-banner text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }} />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-maroon shadow-soft">
            <Sparkles size={14} /> JCI INDIA ZONE 22
          </p>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-extrabold tracking-tight">
            Ragolsavam <span className="text-gold">2026</span>
          </h1>
          <p className="mt-3 font-display text-2xl md:text-3xl italic text-gold"><br /></p>
          <p className="mt-4 max-w-xl mx-auto text-base md:text-lg opacity-90">
            Official Results & Information Portal of Kalolsavam
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/results" className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-maroon shadow-soft hover:opacity-95">
              <Trophy size={16} /> View Results
            </Link>
            <Link to="/guidelines" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/20">
              <FileText size={16} /> Guidelines
            </Link>
          </div>
        </div>
        <div className="kerala-border h-2" aria-hidden />
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 -mt-8 grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 relative z-10">
        {[
          { label: "Categories", value: categories.length, icon: Sparkles, to: "/categories" as const },
          { label: "Events", value: totalEvents, icon: Trophy, to: "/categories" as const },
          { label: "New Results", value: newCount, icon: FileText, to: "/results" as const },
        ].map((s) => (
          <Link key={s.label} to={s.to} className="rounded-2xl border border-border bg-card p-4 shadow-card transition hover:shadow-soft hover:-translate-y-0.5">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
              <s.icon size={14} /> {s.label}
            </div>
            <p className="mt-1 font-display font-bold text-primary text-2xl md:text-3xl">
              {s.value}
            </p>
          </Link>
        ))}
      </section>

      {/* Category quick links */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Categories</h2>
            <p className="text-sm text-muted-foreground mt-1">Browse events grouped by category and discipline.</p>
          </div>
          <Link to="/categories" className="hidden md:inline text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/results"
              search={{ category: c.id }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card transition hover:shadow-soft hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl">{c.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.group}</p>
                  <h3 className="font-display text-lg font-bold text-primary">{c.label}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{c.events.length} event{c.events.length === 1 ? "" : "s"} · View results →</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
