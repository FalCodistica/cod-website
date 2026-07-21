import { Header } from "@/components/SiteChrome";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy - Codistica" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[760px] flex-col gap-6 px-5 py-20">
        <h1 className="display text-snow">Privacy</h1>
        <p className="text-base font-medium leading-relaxed text-mist">
          Privacy policy content to be provided. For any questions about how we
          handle data, contact us at info@codistica.com.
        </p>
      </main>
      <Footer />
    </>
  );
}
