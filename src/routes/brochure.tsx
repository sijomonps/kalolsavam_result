import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/brochure")({
  head: () => ({
    meta: [
      { title: "Brochure — Kalotsavam 2026" },
      { name: "description", content: "Official event brochure for Kalotsavam 2026 Ragotsavam — JCI India Zone 22." },
    ],
  }),
  component: BrochurePage,
});

const brochurePdfEntries = import.meta.glob("/assests/*.pdf", { eager: true, as: "url" }) as Record<
  string,
  string
>;

const BROCHURE_PDFS = Object.entries(brochurePdfEntries)
  .map(([path, url]) => {
    const rawName = decodeURIComponent(path.split("/").pop() ?? "");
    const label = rawName.replace(/\.pdf$/i, "");
    return { path, url, label };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

function BrochurePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold text-primary">Official Brochure</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kalotsavam 2026 — Ragotsavam · JCI India Zone 22 · Hosted by JCI Ramapuram
          </p>
        </div>
      </div>

      {BROCHURE_PDFS.length > 0 && (
        <section className="mt-6">
          <h2 className="font-display text-2xl font-bold text-primary">Brochure PDFs</h2>
          <p className="text-sm text-muted-foreground mt-1">Open or download each brochure copy.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {BROCHURE_PDFS.map((pdf) => (
              <article
                key={pdf.path}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-card"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                    <FileText size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{pdf.label}</p>
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                </div>
                <a
                  href={pdf.url}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:opacity-95"
                >
                  <Download size={14} /> Download
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
