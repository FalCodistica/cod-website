import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codistica - Powering the invisible",
  description:
    "Technology partner for vertical mobility, waste treatment, telecommunications, fashion, food & beverage, household appliances, and building automation. Connect physical infrastructure with digital intelligence.",
};

export default function RootLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode;
  sheet: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <SiteChrome>
          {children}
          {/* intercepted industry sheet — overlays the page above (@sheet slot) */}
          {sheet}
        </SiteChrome>
      </body>
    </html>
  );
}
