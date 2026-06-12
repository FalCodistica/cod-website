import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import IndustryAccordion from "@/components/IndustryAccordion";
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
    <>
      {/* — hero — */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <Image
          src={industry.hero}
          alt={industry.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        {/* sheet frame with top rounded corners */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-5 rounded-t-[40px] border border-white/30" />
        {/* grabber */}
        <div className="absolute left-1/2 top-7 h-1 w-10 -translate-x-1/2 rounded-full bg-foam" aria-hidden />
        <Header floating />
        {/* centre title pill */}
        <div className="glass-dark absolute inset-x-5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2.5 sm:p-10">
          <h1 className="display text-center text-foam">
            Codistica for {industry.label}
          </h1>
        </div>
        {/* industry dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              aria-label={ind.name}
              className={`relative flex size-10 items-center justify-center rounded-full bg-white transition-opacity ${
                ind.slug === slug ? "" : "opacity-25 hover:opacity-60"
              }`}
            >
              <Sphere from={ind.sphere.from} to={ind.sphere.to} size={26} />
              {ind.slug === slug && (
                <span className="absolute inset-1 rounded-full border border-mint" />
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* — statement — */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src={industry.hero}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="glass-dark relative m-5 max-w-[960px] rounded-[40px] p-7 sm:p-10">
          <p className="text-center text-[clamp(22px,2.5vw,48px)] font-medium leading-[1.3] tracking-[-0.02em] text-foam">
            {content.statement}
          </p>
        </div>
      </section>

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

      <Footer />
    </>
  );
}
