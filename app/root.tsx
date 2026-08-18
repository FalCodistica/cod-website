import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { isRouteErrorResponse, Links, Outlet, Scripts, ScrollRestoration } from "react-router";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import NotFound from "@/components/NotFound";
import { Seo } from "@/components/Seo";
import { Header, SiteChrome } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.png`,
  email: "info@codistica.com",
  sameAs: [
    "https://www.linkedin.com/company/codistica/",
    "https://www.instagram.com/codistica/",
    "https://www.tiktok.com/@codistica",
  ],
};

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={SITE.themeColor} />
        {/* static fallback for JS-less crawlers and the instant before
            react-helmet-async mounts and swaps in the per-route Seo tags */}
        <title>{SITE.title}</title>
        <meta name="description" content={SITE.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Links />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </head>
      <body>
        <HelmetProvider>{children}</HelmetProvider>
        <Analytics />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteChrome>
        <Outlet />
      </SiteChrome>
    </MotionConfig>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }
  return (
    <>
      <Seo
        title="Something went wrong"
        description="An unexpected error prevented this page from loading."
        path="/error"
        noIndex
      />
      <Header />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[760px] flex-col gap-6 px-5 py-20">
        <h1 className="display text-snow">Something went wrong</h1>
        <p className="text-base font-medium leading-relaxed text-mist">
          Please reload the page or return to the homepage.
        </p>
      </main>
      <Footer />
    </>
  );
}
