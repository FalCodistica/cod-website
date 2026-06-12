import { Header } from "@/components/SiteChrome";
import Footer from "@/components/Footer";

export const metadata = { title: "Terms of use — Codistica" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[760px] flex-col gap-6 px-5 py-20">
        <h1 className="display text-snow">Terms of use</h1>
        <p className="text-base font-medium leading-relaxed text-mist">
          Terms of use content to be provided. For any questions, contact us at
          info@codistica.com.
        </p>
      </main>
      <Footer />
    </>
  );
}
