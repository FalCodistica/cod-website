"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_STORAGE_KEY, type Consent, GTM_ID, readStoredConsent } from "@/lib/analytics";

/**
 * Cookie-consent gate + Google Tag Manager. GTM only loads once consent is
 * granted — stricter than the old site (which loaded gtm.js unconditionally
 * and only gated the dataLayer pushes behind consent) but the currently
 * recommended posture: no tracking script touches the network pre-consent.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<Consent>("unknown");

  useEffect(() => {
    setConsent(readStoredConsent());
  }, []);

  function choose(value: Exclude<Consent, "unknown">) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {consent === "granted" && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;if(f.parentNode){f.parentNode.insertBefore(j,f);}})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {consent === "unknown" && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="glass-dark fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[44] flex flex-col gap-3 rounded-2xl p-5 sm:inset-x-auto sm:left-3 sm:max-w-sm sm:bottom-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <p className="text-sm font-medium leading-relaxed text-mist">
            We use cookies to understand how visitors use this site. We won&apos;t set analytics
            cookies until you agree — see our{" "}
            <a href="/privacy" className="text-foam underline underline-offset-2">
              privacy policy
            </a>
            .
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="btn-glass inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-medium transition-transform hover:scale-[1.02]"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="glass-pill flex h-9 items-center justify-center rounded-full px-4 text-xs font-medium text-foam transition-colors hover:bg-foam/15"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
