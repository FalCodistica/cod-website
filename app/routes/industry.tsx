import { useParams } from "react-router";
import IndustryDetail from "@/components/IndustryDetail";
import NotFound from "@/components/NotFound";
import { Seo } from "@/components/Seo";
import { industryBySlug } from "@/lib/industries";
import { industryContent } from "@/lib/industry-content";

const industryDescriptions: Record<string, string> = {
  "vertical-mobility":
    "Digital intelligence for elevators, escalators and vertical mobility infrastructure, from connected controllers to predictive maintenance.",
  "waste-treatment":
    "Connected monitoring, automation and data systems for efficient, observable and accountable waste treatment infrastructure.",
  telecommunications:
    "Observable, resilient telecommunications infrastructure through connected monitoring, integration and secure remote operations.",
  fashion:
    "Digital intelligence for fashion production, connecting machinery, quality, traceability, inventory and supply-chain operations.",
  "food-beverage":
    "Connected intelligence for food and beverage production, improving safety, quality, traceability, packaging and operational efficiency.",
  "household-appliances":
    "Connected systems for household appliances, spanning embedded intelligence, diagnostics, lifecycle data and customer experience.",
  "building-automation":
    "Digital intelligence for building automation, connecting HVAC, lighting, access, energy and safety into observable infrastructure.",
};

export default function IndustryRoute() {
  const { slug = "" } = useParams();
  const industry = industryBySlug(slug);

  if (!industry || !industryContent[slug]) {
    return <NotFound />;
  }

  return (
    <>
      <Seo
        title={`Codistica for ${industry.label}`}
        description={industryDescriptions[slug]}
        path={`/industries/${slug}`}
        absoluteTitle
      />
      <IndustryDetail slug={slug} />
    </>
  );
}
