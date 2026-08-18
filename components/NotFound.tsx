import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Header } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The requested page could not be found."
        path="/404"
        noIndex
      />
      <Header />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[760px] flex-col gap-6 px-5 py-20">
        <h1 className="display text-snow">Page not found</h1>
        <p className="text-base font-medium leading-relaxed text-mist">
          The page you requested does not exist or has moved.
        </p>
      </main>
      <Footer />
    </>
  );
}
