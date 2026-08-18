import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "@/components/AppImage";
import Link from "@/components/AppLink";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Header } from "@/components/SiteChrome";
import { ScrollArrow, Sphere, StepRail } from "@/components/ui";
import { useScrollHint } from "@/components/useScrollHint";
import { industries } from "@/lib/industries";
import { SITE } from "@/lib/site";

const N = industries.length;
// the last industry gets one extra viewport-height of hold time, pinned and
// fully settled, before the page hands off to the footer
const EXTRA_HOLD = 1;
const RUNWAY_UNITS = N + EXTRA_HOLD;

// Module-level, not React state: survives Home unmounting while the industry
// sheet is open. The sheet is `position: fixed`, so the document collapses to
// viewport height while it's showing and the browser clamps window.scrollY to
// 0 - it can't come back on its own once Home remounts and the page is tall
// again, so the scroll position has to be captured and restored by hand.
let savedScrollY = 0;

export default function HomeRoute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const hintVisible = useScrollHint();
  const [narrow, setNarrow] = useState(false);

  // restore before paint (no visible flash to the top), then keep saving as
  // the user scrolls so the value is fresh whenever they leave for a sheet
  useLayoutEffect(() => {
    window.scrollTo(0, savedScrollY);
    const onScroll = () => {
      savedScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * RUNWAY_UNITS)));
    if (idx !== active) setActive(idx);
  });

  const current = industries[active];
  // same breakpoint-only choice as the industry detail hero: a photo composed
  // for a tall crop reads far better on mobile than a landscape shot cropped
  // down to a sliver.
  const usePortrait = narrow && !!current.heroPortrait;
  const heroSrc = usePortrait ? (current.heroPortrait as string) : current.hero;
  const heroPosition = usePortrait ? "50% 50%" : (current.heroFocus ?? "50% 50%");

  return (
    <>
      <Seo title={SITE.title} description={SITE.description} path="/" absoluteTitle />
      {/* scroll runway: one viewport per industry, plus a hold for the last */}
      <div ref={containerRef} style={{ height: `${(N + EXTRA_HOLD) * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-ink">
          {/* image card — a Link so it triggers the intercepted sheet route
              (and gets prefetched automatically) */}
          <Link
            href={`/industries/${current.slug}`}
            preventScrollReset
            aria-label={`Explore ${current.name}`}
            className="absolute inset-x-0 top-20 bottom-20 block cursor-pointer overflow-hidden rounded-[40px]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSrc}
                  alt={current.name}
                  fill
                  priority={active === 0}
                  className="object-cover"
                  style={{ objectPosition: heroPosition }}
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
            {/* inner glow */}
            <div className="hero-shadow pointer-events-none absolute inset-0 rounded-[40px]" />
          </Link>

          {/* preload all heroes (both variants, so switching breakpoint mid-visit is instant) */}
          <div className="hidden">
            {industries.map((i) => (
              <Image key={i.slug} src={i.hero} alt="" width={16} height={9} />
            ))}
            {industries
              .filter((i) => i.heroPortrait)
              .map((i) => (
                <Image
                  key={`${i.slug}-portrait`}
                  // biome-ignore lint/style/noNonNullAssertion: filtered above
                  src={i.heroPortrait!}
                  alt=""
                  width={9}
                  height={16}
                />
              ))}
          </div>

          {/* heading pill */}
          <h1 className="glass-dark absolute inset-x-2 top-[calc(50%+8px)] z-10 flex h-10 -translate-y-1/2 items-center justify-between rounded-full px-4 sm:inset-x-5 sm:h-[100px] sm:px-10">
            <span className="pointer-events-none text-sm font-medium tracking-[-0.01em] text-snow sm:text-[clamp(28px,2.5vw,48px)] sm:tracking-[-0.03em]">
              Technology partner for
            </span>
            <Link
              href={`/industries/${current.slug}`}
              preventScrollReset
              aria-label={`Explore ${current.name}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            >
              <Sphere
                from={current.sphere.from}
                to={current.sphere.to}
                size={56}
                className="scale-50 transition-[background,box-shadow,transform] duration-700 sm:scale-100"
              />
            </Link>
            <span className="relative block h-[1.15em] overflow-hidden text-right text-sm font-medium tracking-[-0.01em] text-snow sm:text-[clamp(28px,2.5vw,48px)] sm:tracking-[-0.03em]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={current.slug}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  className="block leading-[1.15]"
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* step indicators */}
          <StepRail side="left" active={active} total={N} />
          <StepRail side="right" active={active} total={N} />

          {/* header on top */}
          <Header floating />

          {/* scroll hint */}
          <div
            className="pointer-events-none absolute bottom-40 left-1/2 z-10 -translate-x-1/2 text-foam transition-opacity duration-300 sm:bottom-24"
            style={{ opacity: hintVisible ? 1 : 0 }}
            aria-hidden="true"
          >
            <ScrollArrow />
          </div>

          {/* mobile CTA */}
          <a
            href="mailto:info@codistica.com"
            className="btn-glass absolute bottom-24 left-1/2 z-10 inline-flex h-10 -translate-x-1/2 items-center justify-center rounded-full px-4 text-sm font-medium transition-transform hover:scale-[1.02] sm:hidden"
          >
            Talk to us
          </a>
        </div>
      </div>
      {/* Deliberately no pull-up trick here. The hero is `position: sticky`
          within its own runway above, so it naturally releases and scrolls
          away over exactly the runway's last viewport while this footer
          (plain, unmodified document flow) scrolls in immediately behind it
          at the same rate — their shared edge lines up exactly throughout,
          with z-20 keeping the footer painted on top. A scroll-linked
          transform version (pulling the footer up early, then easing back
          out) was tried and reverted three times: it produced a dead gap,
          then the hero reappearing at the true end, then a genuine
          back-and-forth bounce once both were fixed — and none of those
          could be debugged live against real scroll input in this
          environment. This version has no per-viewport constant to get
          wrong: total scrollable height is always exactly the runway's
          height plus the footer's real height, so it can't gap or bounce. */}
      <div className="relative z-20 bg-ink">
        <Footer />
      </div>
    </>
  );
}
