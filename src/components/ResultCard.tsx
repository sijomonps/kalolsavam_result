import type { EventResult } from "@/data/results";
import { Sparkles, Trophy, Medal, Award } from "lucide-react";

const positionMeta = {
  1: { label: "1st", icon: Trophy, ring: "ring-gold", bg: "bg-gold-gradient text-maroon" },
  2: { label: "2nd", icon: Medal, ring: "ring-border", bg: "bg-secondary text-secondary-foreground" },
  3: { label: "3rd", icon: Award, ring: "ring-border", bg: "bg-secondary text-secondary-foreground" },
} as const;

const ordinal = (value: number): string => {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
};

const getPositionMeta = (position: number) =>
  positionMeta[position as 1 | 2 | 3] ?? {
    label: ordinal(position),
    icon: Award,
    ring: "ring-border",
    bg: "bg-secondary text-secondary-foreground",
  };

export function ResultCard({ event }: { event: EventResult }) {
  const winners = Array.isArray(event.winners) ? event.winners : [];

  return (
    <article className="relative rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-soft">
      {event.isNew && (
        <span className="absolute -top-2 right-4 flex items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-maroon shadow-soft">
          <Sparkles size={12} /> New
        </span>
      )}
      <h3 className="font-display text-lg font-bold text-primary">{event.name}</h3>
      {winners.length === 0 ? (
        <p className="mt-3 rounded-xl bg-secondary/60 px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Results awaited
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {winners.map((w) => {
            const meta = getPositionMeta(w.position);
            const Icon = meta.icon;
            return (
              <li
                key={w.position}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 ring-1 ${meta.ring} bg-background/60`}
              >
                <span className={`grid h-9 w-9 place-items-center rounded-full ${meta.bg} shadow-card`}>
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">{w.name}</p>
                  {w.chapter && <p className="text-xs text-muted-foreground">{w.chapter}</p>}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{meta.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
