import Link from "next/link";
import { notFound } from "next/navigation";
import ChallengeScene from "@/components/ChallengeScene";
import IndustryAccordion from "@/components/IndustryAccordion";
import IndustryHero from "@/components/IndustryHero";
import IndustrySheet from "@/components/IndustrySheet";
import { DotChevron, EyebrowPill, FilledButton, Sphere } from "@/components/ui";
import { industries } from "@/lib/industries";
import { industryContent } from "@/lib/industry-content";

/*
 * The industry bottom sheet + its scrollable content. Shared by two routes:
 *   - app/industries/[slug]/page.tsx        (direct visit / refresh: full page)
 *   - app/@sheet/(.)industries/[slug]/page.tsx (intercepted: overlays a
 *     still-mounted Home, so opening/closing never remounts the home tree)
 */
export default function IndustryDetail({ slug }: { slug: string }) {
  const idx = industries.findIndex((i) => i.slug === slug);
  const industry = industries[idx];
  const content = industryContent[slug];
  if (!industry || !content) notFound();
  const next = industries[(idx + 1) % industries.length];

  return (
    <IndustrySheet key={slug} slug={slug} industry={industry}>
      {/* — hero (title → statement → image card + word reveal) — */}
      <IndustryHero
        industry={industry}
        statement={content.statement}
        detailA={content.detailA}
        detailB={content.detailB}
      />

      {/* — everything below the hero — */}
      <div className="relative bg-ink">
        {/* — the challenge (pinned canvas story) — */}
        <ChallengeScene
          industry={industry}
          title={content.challengeTitle}
          points={content.challengePoints}
          note={content.challengeNote}
        />

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
    </IndustrySheet>
  );
}
