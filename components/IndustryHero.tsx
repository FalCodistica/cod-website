"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMenu } from "./SiteChrome";
import { DotGrid, Sphere } from "./ui";
import { industries, type Industry } from "@/lib/industries";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
 * Industry hero presented as a mobile-style bottom sheet:
 *  - rounded top corners + grabber handle, black showing above the sheet
 *  - no site header; a dot-grid button opens the menu overlay
 *  - pinned while scrolling: the image scales and the glass panel morphs
 *    from the title into the opening statement (Industry-0 → Industry-1).
 */
export default function IndustryHero({
  industry,
  statement,
}: {
  industry: Industry;
  statement: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { setOpen } = useMenu();
  const [p, setP] = useState(0);

  // progress 0 when the section top hits the viewport top,
  // progress 1 when its bottom reaches the viewport top (pin released)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      setP(clamp01(-rect.top / rect.height));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // title pill → out, statement panel → in, while the sheet is pinned
  const titleP = clamp01(p / 0.16); // 0 → 1 over first 16%
  const stmtP = clamp01((p - 0.2) / 0.22); // fades in from 20%
  const imgScale = lerp(1, 1.08, clamp01(p / 0.5));
  const hintOpacity = clamp01(1 - p / 0.1);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-3 h-[calc(100vh-12px)] min-h-[600px]">
        <div className="relative h-full overflow-hidden rounded-t-[40px] border-t border-white/30">
          {/* hero image */}
          <div
            className="absolute inset-0 origin-center"
            style={{ transform: `scale(${imgScale})` }}
          >
            <Image
              src={industry.hero}
              alt={industry.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/20" />

          {/* grabber */}
          <div
            className="absolute left-1/2 top-4 z-30 h-1 w-10 -translate-x-1/2 rounded-full bg-foam"
            aria-hidden
          />
          {/* menu button (light circle, dark dots) */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="absolute right-5 top-6 z-30 flex size-10 items-center justify-center rounded-full bg-foam backdrop-blur-xl transition-transform hover:scale-105"
          >
            <DotGrid size={20} color="#2b3231" />
          </button>

          {/* title pill */}
          <div
            className="absolute inset-0 flex items-center justify-center px-3 sm:px-5"
            style={{
              opacity: 1 - titleP,
              transform: `translateY(${lerp(0, -24, titleP)}px) scale(${lerp(1, 0.96, titleP)})`,
              pointerEvents: titleP > 0.5 ? "none" : "auto",
            }}
          >
            <div className="glass-dark flex w-full items-center justify-center rounded-full p-2.5 sm:p-10">
              <h1 className="display text-center text-foam">
                Codistica for {industry.label}
              </h1>
            </div>
          </div>

          {/* statement panel */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center p-5"
            style={{
              opacity: stmtP,
              transform: `translateY(${lerp(28, 0, stmtP)}px)`,
            }}
          >
            <div className="glass-dark max-w-[960px] rounded-[40px] p-7 sm:p-10">
              <p className="text-center text-[clamp(20px,2.4vw,44px)] font-medium leading-[1.3] tracking-[-0.02em] text-foam">
                {statement}
              </p>
            </div>
          </div>

          {/* industry switcher dots */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                aria-label={ind.name}
                className={`relative flex size-10 items-center justify-center rounded-full bg-white transition-opacity ${
                  ind.slug === industry.slug ? "" : "opacity-25 hover:opacity-60"
                }`}
              >
                <Sphere from={ind.sphere.from} to={ind.sphere.to} size={26} />
                {ind.slug === industry.slug && (
                  <span className="absolute inset-1 rounded-full border border-mint" />
                )}
              </Link>
            ))}
          </div>

          {/* scroll hint */}
          <span
            className="mono-label absolute bottom-[88px] left-1/2 -translate-x-1/2 text-foam/60"
            style={{ opacity: hintOpacity }}
            aria-hidden
          >
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
