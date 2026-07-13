"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Header } from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import { Sphere } from "@/components/ui";
import { industries } from "@/lib/industries";

const N = industries.length;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    if (idx !== active) setActive(idx);
  });

  const current = industries[active];

  return (
    <>
      {/* scroll runway: one viewport per industry */}
      <div ref={containerRef} style={{ height: `${N * 100}vh` }}>
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
            <Sphere
              from={current.sphere.from}
              to={current.sphere.to}
              size={56}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[background,box-shadow] duration-700"
            />
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

          {/* mobile CTA above tab bar */}
          <a
            href="mailto:info@codistica.com"
            className="absolute bottom-24 left-1/2 z-10 inline-flex h-10 -translate-x-1/2 items-center justify-center rounded-full bg-foam px-4 text-sm font-medium text-coal sm:hidden"
          >
            Talk to us
          </a>

          {/* tab bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex h-20 items-center justify-center">
            <button
              aria-label="Next industry"
              onClick={() =>
                window.scrollBy({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
              className="glass-pill flex size-14 items-center justify-center transition-colors hover:bg-foam/15"
            >
              <AsteriskIcon />
            </button>
          </div>
        </div>
      </div>
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

/* the dotted asterisk in the tab bar */
function AsteriskIcon() {
  const dots: [number, number][] = [];
  const cx = 13,
    cy = 13,
    r1 = 5,
    r2 = 11;
  for (let k = 0; k < 6; k++) {
    const a = (Math.PI / 3) * k - Math.PI / 2;
    dots.push([cx + r1 * Math.cos(a), cy + r1 * Math.sin(a)]);
    dots.push([cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)]);
  }
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 2.6 : 2.2} fill="#dde4e3" />
      ))}
    </svg>
  );
}
