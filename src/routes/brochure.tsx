import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, FileText } from "lucide-react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

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

const PREVIEW_PAGES = 4;

function BrochurePage() {
  const primaryPdf = BROCHURE_PDFS[0];
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [availablePages, setAvailablePages] = useState(PREVIEW_PAGES);

  useEffect(() => {
    if (!primaryPdf) return;
    let cancelled = false;
    setStatus("loading");
    const loadingTask = getDocument(primaryPdf.url);

    const renderPages = async () => {
      try {
        const doc = await loadingTask.promise;
        const pageCount = Math.min(PREVIEW_PAGES, doc.numPages);
        setAvailablePages(pageCount);
        for (let pageIndex = 1; pageIndex <= pageCount; pageIndex += 1) {
          const page = await doc.getPage(pageIndex);
          const viewport = page.getViewport({ scale: 1.2 });
          const canvas = canvasRefs.current[pageIndex - 1];
          if (!canvas || cancelled) continue;
          const context = canvas.getContext("2d");
          if (!context) continue;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: context, viewport }).promise;
        }
        await doc.destroy();
        if (!cancelled) setStatus("ready");
      } catch (error) {
        if (!cancelled) setStatus("error");
      }
    };

    renderPages();

    return () => {
      cancelled = true;
      loadingTask.destroy();
    };
  }, [primaryPdf]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold text-primary">Official Brochure</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kalotsavam 2026 — Ragotsavam · JCI India Zone 22 · Hosted by JCI Ramapuram
          </p>
        </div>
        {primaryPdf && (
          <a
            href={primaryPdf.url}
            download
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95"
          >
            <Download size={14} /> Download PDF
          </a>
        )}
      </div>

      {primaryPdf ? (
        <section className="mt-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <FileText size={18} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">{primaryPdf.label}</h2>
              <p className="text-sm text-muted-foreground">First 4 pages preview</p>
            </div>
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {Array.from({ length: availablePages }).map((_, index) => (
              <div
                key={`page-${index + 1}`}
                className="rounded-2xl border border-border bg-card p-3 shadow-card"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-muted/40">
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[index] = el;
                    }}
                    className="block h-auto w-full"
                    aria-label={`Brochure page ${index + 1}`}
                  />
                  {status === "loading" && (
                    <div className="flex items-center justify-center px-4 py-6 text-xs font-medium text-muted-foreground">
                      Loading page {index + 1}...
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center justify-center px-4 py-6 text-xs font-medium text-muted-foreground">
                      Preview unavailable
                    </div>
                  )}
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Page {index + 1}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center">
          <p className="text-sm text-muted-foreground">No brochure PDF found in /assests.</p>
        </section>
      )}

    </div>
  );
}
