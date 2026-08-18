import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Header } from "@/components/SiteChrome";

export default function TermsRoute() {
  return (
    <>
      <Seo
        title="Terms of use"
        description="Terms of use for the Codistica website."
        path="/terms"
      />
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
