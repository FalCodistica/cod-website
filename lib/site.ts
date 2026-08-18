/**
 * Single source of truth for the site's identity metadata.
 * `url` drives `metadataBase`, canonicals, the sitemap and robots.txt — change
 * it here if the production domain differs.
 */
export const SITE = {
  url: "https://codistica.com",
  name: "Codistica",
  title: "Codistica - Powering the invisible",
  tagline: "Powering the invisible",
  description:
    "Codistica connects physical infrastructure with digital intelligence across vertical mobility, industry, telecommunications, fashion, food and automation.",
  locale: "en_US",
  twitter: "@codistica",
  /** carried over from the previous codistica.com site */
  facebookAppId: "361021477858131",
  themeColor: "#0e1514",
} as const;

/** Absolute URL for a site-relative path, e.g. absoluteUrl("/about"). */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};
