import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/brochure")({
  head: () => ({
    meta: [
      { title: "Brochure — Kalotsavam 2026" },
      { name: "description", content: "Official event brochure for Kalotsavam 2026 Ragotsavam — JCI India Zone 22." },
    ],
  }),
  component: BrochurePage,
});

const BROCHURE_PAGES = [
  "/brochure/page-1.jpg",
  "/brochure/page-2.jpg",
  "/brochure/page-3.jpg",
  "/brochure/page-4.jpg",
];
const BROCHURE_PDF = "/kalotsavam-brochure-2026.pdf";

function BrochurePage() {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold text-primary">Official Brochure</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kalotsavam 2026 — Ragotsavam · JCI India Zone 22 · Hosted by JCI Ramapuram
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={BROCHURE_PDF}
            download
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95"
          >
            <Download size={14} /> Download PDF
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {BROCHURE_PAGES.map((src, i) => (
          <button
            key={src}
            onClick={() => setZoomIndex(i)}
            className="group relative rounded-2xl border border-border bg-card p-3 shadow-card text-left transition hover:shadow-lg"
          >
            <img
              src={src}
              alt={`Kalotsavam 2026 brochure page ${i + 1}`}
              className="w-full rounded-xl"
              loading={i < 2 ? "eager" : "lazy"}
            />
            <div className="absolute top-5 right-5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
              <Maximize2 size={12} /> Page {i + 1}
            </div>
          </button>
        ))}
      </div>

      {zoomIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center"
          onClick={() => setZoomIndex(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); setZoomIndex(null); }}
          >
            <X size={20} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-30"
            aria-label="Previous"
            disabled={zoomIndex === 0}
            onClick={(e) => { e.stopPropagation(); setZoomIndex((i) => (i! > 0 ? i! - 1 : i)); }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-30"
            aria-label="Next"
            disabled={zoomIndex === BROCHURE_PAGES.length - 1}
            onClick={(e) => { e.stopPropagation(); setZoomIndex((i) => (i! < BROCHURE_PAGES.length - 1 ? i! + 1 : i)); }}
          >
            <ChevronRight size={22} />
          </button>
          <img
            src={BROCHURE_PAGES[zoomIndex]}
            alt={`Kalotsavam 2026 brochure page ${zoomIndex + 1} full view`}
            className="max-h-full max-w-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            Page {zoomIndex + 1} of {BROCHURE_PAGES.length}
          </div>
        </div>
      )}
    </div>
  );
}
