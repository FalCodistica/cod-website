"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Footer from "@/components/Footer";
import { Header } from "@/components/SiteChrome";
import { ScrollArrow, Sphere } from "@/components/ui";
import { industries } from "@/lib/industries";

const N = industries.length;
// the last industry gets one extra viewport-height of hold time, pinned and
// fully settled, before the page hands off to the footer
const EXTRA_HOLD = 1;
const RUNWAY_UNITS = N + EXTRA_HOLD;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * RUNWAY_UNITS)));
    if (idx !== active) setActive(idx);
    if (v > 0.01 && !scrolled) setScrolled(true);
  });

  const current = industries[active];

  return (
    <>
      {/* scroll runway: one viewport per industry, plus a hold for the last */}
      <div ref={containerRef} style={{ height: `${(N + EXTRA_HOLD) * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-ink">
          {/* image card — a Link so it triggers the intercepted sheet route
              (and gets prefetched automatically) */}
          <Link
            href={`/industries/${current.slug}`}
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
                  src={current.hero}
                  alt={current.name}
                  fill
                  priority={active === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
            {/* inner glow */}
            <div className="hero-shadow pointer-events-none absolute inset-0 rounded-[40px]" />
          </Link>

          {/* preload all heroes */}
          <div className="hidden">
            {industries.map((i) => (
              <Image key={i.slug} src={i.hero} alt="" width={16} height={9} />
            ))}
          </div>

          {/* heading pill */}
          <div className="glass-dark absolute inset-x-2 top-[calc(50%+8px)] z-10 flex h-10 -translate-y-1/2 items-center justify-between rounded-full px-4 sm:inset-x-5 sm:h-[100px] sm:px-10">
            <span className="pointer-events-none text-sm font-medium tracking-[-0.01em] text-snow sm:text-[clamp(28px,2.5vw,48px)] sm:tracking-[-0.03em]">
              Technology partner for
            </span>
            <Link
              href={`/industries/${current.slug}`}
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
          </div>

          {/* step indicators */}
          <StepRail side="left" active={active} />
          <StepRail side="right" active={active} />

          {/* header on top */}
          <Header floating />

          {/* scroll hint */}
          <div
            className="glass-dark pointer-events-none absolute bottom-40 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-4 py-3 text-foam transition-opacity duration-300 sm:bottom-24"
            style={{ opacity: scrolled ? 0 : 1 }}
            aria-hidden="true"
          >
            <span className="mono-label text-foam">Scroll</span>
            <span className="animate-bounce-y">
              <ScrollArrow />
            </span>
          </div>

          {/* mobile CTA */}
          <a
            href="mailto:info@codistica.com"
            className="btn-glow absolute bottom-24 left-1/2 z-10 inline-flex h-10 -translate-x-1/2 items-center justify-center rounded-full bg-foam px-4 text-sm font-medium text-coal transition-transform hover:scale-[1.02] sm:hidden"
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

function StepRail({ side, active }: { side: "left" | "right"; active: number }) {
  return (
    <div
      className={`absolute top-1/2 z-10 flex h-[97px] -translate-y-1/2 flex-col justify-between ${
        side === "left" ? "left-0 items-start" : "right-0 items-end"
      }`}
    >
      {industries.map((ind, i) => (
        <span
          key={ind.slug}
          className="h-px w-4 transition-colors duration-500"
          style={{
            background:
              i === active
                ? "#ffffff"
                : side === "left"
                  ? "linear-gradient(to right, #ffffff 50%, transparent 50%)"
                  : "linear-gradient(to left, #ffffff 50%, transparent 50%)",
            opacity: i === active ? 1 : 0.6,
          }}
        />
      ))}
    </div>
  );
}
