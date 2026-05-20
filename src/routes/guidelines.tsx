import { createFileRoute } from "@tanstack/react-router";
import { guidelines } from "@/data/results";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/guidelines")({
  head: () => ({
    meta: [
      { title: "Guidelines — Kalotsavam 2026" },
      { name: "description", content: "Program guidelines and event rules for Kalotsavam 2026 Ragotsavam." },
    ],
  }),
  component: GuidelinesPage,
});

function GuidelinesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-primary">Program Guidelines</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Category-wise event rules. Please review carefully before participating.
      </p>

      <div className="mt-8 space-y-8">
        {guidelines.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <h2 className="font-display text-xl font-bold text-primary">{section.title}</h2>
            {section.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{section.subtitle}</p>
            )}

            <div className="mt-5 space-y-5">
              {section.groups.map((g) => (
                <div key={g.heading}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    {g.heading}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {g.items.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
