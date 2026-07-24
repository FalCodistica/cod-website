import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { ThemeProvider } from "@/components/ThemeProvider";

/* Sets data-theme before first paint so the page never flashes the wrong
   theme. Reads the stored choice (or falls back to the OS preference) —
   kept in sync with the logic in components/ThemeProvider.tsx. */
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:m);}catch(e){}})()`;

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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, no user input — see themeInitScript above */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <SiteChrome>
            {children}
            {/* intercepted industry sheet — overlays the page above (@sheet slot) */}
            {sheet}
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
