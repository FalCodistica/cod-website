import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import IndustryAccordion from "@/components/IndustryAccordion";
import IndustryHero from "@/components/IndustryHero";
import { DotChevron, EyebrowPill, FilledButton, Sphere } from "@/components/ui";
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

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = industries.findIndex((i) => i.slug === slug);
  const industry = industries[idx];
  const content = industryContent[slug];
  if (!industry || !content) notFound();
  const next = industries[(idx + 1) % industries.length];

  return (
    <div className="bg-black">
      {/* — hero (bottom sheet, pinned scroll-transform) — */}
      <IndustryHero industry={industry} statement={content.statement} />

      {/* — everything below the sheet — */}
      <div className="relative bg-ink">
      {/* — context: image + two columns — */}
      <section className="mx-auto max-w-[960px] px-5 py-24">
        <div className="overflow-hidden rounded-[20px]">
          <Image
            src={industry.hero}
            alt=""
            width={1920}
            height={944}
            className="h-[472px] w-full object-cover"
          />
        </div>
        <div className="grid gap-10 py-10 sm:grid-cols-2">
          <p className="text-base font-medium leading-relaxed text-mist">
            {content.detailA}
          </p>
          <p className="text-base font-medium leading-relaxed text-mist">
            {content.detailB}
          </p>
        </div>
      </section>

      {/* — the challenge — */}
      <section className="flex flex-col items-center overflow-hidden py-10">
        <EyebrowPill>The challenge</EyebrowPill>
        <h2 className="heading max-w-[720px] px-5 text-center text-foam">
          {content.challengeTitle}
        </h2>
        {/* tick ruler */}
        <div className="relative mt-10 flex w-full flex-col items-center">
          <Sphere from={industry.sphere.from} to={industry.sphere.to} size={40} />
          <div className="relative mt-0 h-[265px] w-full">
            <div className="ticks fade-bottom absolute inset-x-0 top-[85px] h-[180px]" />
            <div className="absolute left-1/2 top-0 h-[265px] w-px bg-alert" />
          </div>
        </div>
        <div className="flex max-w-[720px] flex-col gap-3 px-5 pt-3 text-center">
          <p className="text-base font-medium leading-relaxed text-alert">
            {content.challengePoints.map((p) => (
              <span key={p} className="block">
                {p}
              </span>
            ))}
          </p>
          <p className="text-base font-medium leading-relaxed text-mist">
            {content.challengeNote}
          </p>
        </div>
      </section>

      {/* — where we contribute — */}
      <section className="flex flex-col items-center px-5 py-[120px]">
        <EyebrowPill>Where we contribute</EyebrowPill>
        <div className="w-full max-w-[640px]">
          <div className="flex flex-col items-center gap-10 rounded-t-[40px] border border-rule px-5 pb-5 pt-10 sm:px-10">
            <div className="text-center">
              <h2 className="heading text-foam">{content.ecosystemHeadline[0]}</h2>
              <h2 className="heading text-mint">{content.ecosystemHeadline[1]}</h2>
            </div>
            <p className="max-w-[560px] text-center text-base font-medium leading-relaxed text-mist">
              {content.ecosystemBody}
            </p>
            <span className="mono-body text-foam">{content.applicationsLead}</span>
          </div>
          <IndustryAccordion items={content.applications} />
          <div className="h-10 rounded-b-[40px] border border-rule" aria-hidden />
        </div>
      </section>

      {/* — closing — */}
      <section className="relative flex flex-col items-center gap-[60px] overflow-hidden px-5 pb-2 pt-[120px]">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px] bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0e1514, transparent), linear-gradient(90deg, #0e1514, transparent 50%, #0e1514), url(/images/marquee-glow.jpg)",
          }}
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-2 text-center">
          <h2 className="heading text-foam">{content.closing[0]}</h2>
          <h2 className="heading text-mint">{content.closing[1]}</h2>
        </div>
        <div className="relative">
          <FilledButton href="mailto:info@codistica.com">Talk to us</FilledButton>
        </div>
        {/* next industry */}
        <Link
          href={`/industries/${next.slug}`}
          className="glass-pill relative mt-10 flex items-center gap-2 p-2 transition-colors hover:bg-foam/15"
        >
          <Sphere from={industry.sphere.from} to={industry.sphere.to} size={40} />
          <span className="flex items-center gap-2 rounded-full bg-foam/10 py-1 pl-1 pr-3 backdrop-blur-xl">
            <Sphere from={next.sphere.from} to={next.sphere.to} size={32} />
            <span className="flex flex-col gap-0.5 pr-1">
              <span className="mono-label text-mist">Next</span>
              <span className="text-sm font-medium text-foam">{next.name}</span>
            </span>
            <DotChevron />
          </span>
        </Link>
      </section>
      </div>

      <Footer />
    </div>
  );
}
