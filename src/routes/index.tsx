import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl md:text-6xl font-bold text-primary">Result Closed</h1>
    </section>
  );
}
