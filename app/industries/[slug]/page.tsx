import type { Metadata } from "next";
import IndustryDetail from "@/components/IndustryDetail";
import { industries } from "@/lib/industries";
import { industryContent } from "@/lib/industry-content";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: `Codistica for ${industry.label}`,
    description: industryContent[slug]?.statement,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <IndustryDetail slug={slug} />;
}
