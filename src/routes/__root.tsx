import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/lib/theme";
import { StoreProvider } from "@/context/StoreContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="fallback">
      <div className="fallback__inner">
        <h1 className="fallback__code">404</h1>
        <h2 className="fallback__title">Page not found</h2>
        <p className="fallback__text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/" className="btn btn--luxe">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="fallback">
      <div className="fallback__inner">
        <h1 className="fallback__title">This page didn't load</h1>
        <p className="fallback__text">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="fallback__actions">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn--luxe"
          >
            Try again
          </button>
          <a href="/" className="btn btn--outline-luxe">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "oneof1custom — Handmade Bead Jewellery" },
      {
        name: "description",
        content:
          "Discover oneof1custom handmade bead jewellery — hand-wrapped rings, beaded bracelets and unique pieces crafted for your everyday style.",
      },
      { name: "author", content: "oneof1custom" },
      { property: "og:title", content: "oneof1custom — Handmade Bead Jewellery" },
      {
        property: "og:description",
        content: "Handmade bead jewellery crafted with chosen beads in South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@oneof1custom" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StoreProvider>
          <div className="app-shell">
            <Navbar />
            <main className="app-main">
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </main>
            <Footer />
          </div>

          <Toaster position="bottom-right" />
        </StoreProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
