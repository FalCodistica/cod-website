import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Header } from "@/components/SiteChrome";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How Codistica handles data collected through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[760px] flex-col gap-6 px-5 py-20">
        <h1 className="display text-snow">Privacy</h1>
        <p className="text-base font-medium leading-relaxed text-mist">
          Privacy policy content to be provided. For any questions about how we handle data, contact
          us at info@codistica.com.
        </p>
      </main>
      <Footer />
    </>
  );
}
