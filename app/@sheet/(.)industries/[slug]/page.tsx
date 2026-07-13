import IndustryDetail from "@/components/IndustryDetail";
import { industries } from "@/lib/industries";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

/*
 * Intercepted industry route. When navigating from within the app (Home, the
 * menu, industry→industry), this renders the sheet as an overlay in the
 * `@sheet` slot while Home stays mounted in the `children` slot underneath —
 * so opening/closing the sheet never tears down and rebuilds the home tree.
 * A direct visit / refresh falls through to app/industries/[slug]/page.tsx.
 */
export default async function InterceptedIndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <IndustryDetail slug={slug} />;
}
