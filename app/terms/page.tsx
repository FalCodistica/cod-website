import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Header } from "@/components/SiteChrome";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description: "Terms of use for the Codistica website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[760px] flex-col gap-6 px-5 py-20">
        <h1 className="display text-snow">Terms of use</h1>
        <p className="text-base font-medium leading-relaxed text-mist">
          Terms of use content to be provided. For any questions, contact us at info@codistica.com.
        </p>
      </main>
      <Footer />
    </>
  );
}
