import type { Metadata } from "next";

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
    "Technology partner for vertical mobility, waste treatment, telecommunications, fashion, food & beverage, household appliances, and building automation. Connect physical infrastructure with digital intelligence.",
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

/** Social card image, served by app/opengraph-image.png + app/twitter-image.png. */
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Codistica - Powering the invisible",
};

/**
 * Per-page metadata: canonical URL plus matching Open Graph / Twitter entries,
 * so every route shares one shape. `title` is the bare page title — the root
 * layout's template appends the site name.
 *
 * The image has to be named explicitly: defining `openGraph` in a child segment
 * replaces the parent's resolved object, so the root app/opengraph-image.png
 * would otherwise be dropped on every page but "/".
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** skip the "- Codistica" suffix, for titles that already read as full ones */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} - ${SITE.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
