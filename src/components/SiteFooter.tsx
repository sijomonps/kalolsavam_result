import { eventInfo } from "@/data/results";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="kerala-border h-1.5 w-full" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <h3 className="font-display text-xl font-bold text-gold">{eventInfo.title}</h3>
          <p className="mt-1 text-sm opacity-80">{eventInfo.subtitle}</p>
          <p className="mt-3 text-sm opacity-90">Organised by {eventInfo.organizer}</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-4 py-4 text-center text-xs opacity-80">
        © {new Date().getFullYear()} {eventInfo.organizer}. All rights reserved.
      </div>
    </footer>
  );
}
