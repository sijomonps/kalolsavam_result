import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ragolsavam 2026 — JCI India Zone 22" },
      { name: "description", content: "Official results & information portal for Ragolsavam 2026" },
      { name: "author", content: "JCI India Zone 22" },
      { property: "og:title", content: "Ragolsavam 2026 — JCI India Zone 22" },
      { property: "og:description", content: "Official results & information portal for Ragolsavam 2026" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Ragolsavam 2026 — JCI India Zone 22" },
      { name: "twitter:description", content: "Official results & information portal for Ragolsavam 2026" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/L3hJSrcSrXNdOLDnsOz2k6NL3CI3/social-images/social-1779202274920-WhatsApp_Image_2026-05-19_at_20.20.14.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/L3hJSrcSrXNdOLDnsOz2k6NL3CI3/social-images/social-1779202274920-WhatsApp_Image_2026-05-19_at_20.20.14.webp" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-primary">Result Closed</h1>
      </div>
    </QueryClientProvider>
  );
}
