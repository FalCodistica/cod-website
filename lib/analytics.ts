/**
 * Google Tag Manager container. Ported from the old site's GTM-PXLD8M6 —
 * that container tracked production traffic on www.codistica.com; point its
 * GTM/GA config at the new apex-only domain (codistica.com) on Google's side.
 * Override for local/dev testing via NEXT_PUBLIC_GTM_ID.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PXLD8M6";

export const CONSENT_STORAGE_KEY = "codistica-analytics-consent";

export type Consent = "unknown" | "granted" | "denied";

export function readStoredConsent(): Consent {
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : "unknown";
}
