import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import { Header } from "@/components/SiteChrome";

export default function FormShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-14 px-5 pb-30 pt-10">
        <main className="flex w-full max-w-[640px] flex-col items-center gap-14">{children}</main>
      </div>
      <Footer />
    </>
  );
}
