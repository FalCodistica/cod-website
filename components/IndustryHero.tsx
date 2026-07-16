"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import IndustrySwitcher from "./IndustrySwitcher";
import { useScrollRoot } from "./ScrollRoot";
import { DotGrid, EyebrowPill, Sphere } from "./ui";
import { type Industry } from "@/lib/industries";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function dotsFor(word: string) {
  const len = word.replace(/[^A-Za-z0-9]/g, "").length;
  return "•".repeat(Math.max(2, Math.round(len / 2)));
}

/* Two-column text that fills in word-by-word as `rp` (0→1) advances.
   Before a word is reached it shows dots, sitting in the word's footprint
   so nothing reflows as the real text fades in. */
function RevealParagraph({
  words,
  start,
  total,
  rp,
}: {
  words: string[];
  start: number;
  total: number;
  rp: number;
}) {
  return (
    <p className="text-sm font-medium leading-relaxed sm:text-base">
      {words.map((w, i) => {
        const t = clamp01(rp * total - (start + i));
        return (
          <Fragment key={i}>
            <span className="relative inline-block align-baseline">
              <span style={{ opacity: t, color: "#bec9c7" }}>{w}</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: 1 - t,
                  color: "rgba(136,147,146,0.5)",
                  letterSpacing: "0.08em",
                }}
              >
                {dotsFor(w)}
              </span>
            </span>{" "}
          </Fragment>
        );
      })}
    </p>
  );
}

/*
 * Industry hero content (inside the bottom sheet):
 *   the full-bleed image carries the title, which morphs into the opening
 *   statement, then the image fluidly shrinks into a card while the two
 *   context paragraphs below reveal word-by-word on scroll.
 * The sheet itself owns the slide-up, rounded corners, grabber and menu.
 */
export default function IndustryHero({
  industry,
  statement,
  detailA,
  detailB,
}: {
  industry: Industry;
  statement: string;
  detailA: string;
  detailB: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const root = useScrollRoot();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [p, setP] = useState(0);
  const [vp, setVp] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target: HTMLElement | Window = root ?? window;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      setP(clamp01(-rect.top / rect.height));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      setVp({ w: window.innerWidth, h: window.innerHeight });
      onScroll();
    };
    onResize();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [root]);

  // staged thresholds (fluid, triggered) + scrubbed reveal
  const past = p > 0.06; // title → statement
  const shrunk = p > 0.28; // image → card + reveal
  const rp = clamp01((p - 0.33) / 0.4);

  const { w, h } = vp;
  const narrow = w > 0 && w < 640;
  const cardW = Math.min(960, w - 40);
  const cardH = Math.min(440, Math.round(h * (narrow ? 0.32 : 0.42)));
  const cardLeft = Math.round((w - cardW) / 2);
  const cardTop = Math.round(Math.max(64, h * (narrow ? 0.07 : 0.09)));
  const textGap = narrow ? 16 : 28;

  // image wrapper geometry — full-bleed, then a centred card
  let geo: React.CSSProperties;
  if (!w) {
    geo = { top: 0, left: 0, width: "100%", height: "100%", borderRadius: 0 };
  } else if (shrunk) {
    geo = { top: cardTop, left: cardLeft, width: cardW, height: cardH, borderRadius: 24 };
  } else {
    geo = { top: 0, left: 0, width: w, height: h, borderRadius: 0 };
  }

  const wordsA = detailA.split(" ");
  const wordsB = detailB.split(" ");
  const total = wordsA.length + wordsB.length;

  return (
    <section ref={ref} className="relative -mt-px h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* image — morphs from full-bleed to a small card */}
        <div
          className="absolute overflow-hidden"
          style={{
            ...geo,
            transition: "all 0.75s cubic-bezier(0.65,0,0.35,1)",
          }}
        >
          <Image
            src={industry.hero}
            alt={industry.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* title pill */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-3 transition-all duration-500 sm:px-5"
          style={{
            opacity: past ? 0 : 1,
            transform: past ? "translateY(-24px) scale(0.96)" : "none",
            pointerEvents: past ? "none" : "auto",
          }}
        >
          <div className="glass-dark flex w-full items-center justify-center rounded-full p-2.5 sm:p-10">
            <h1 className="display text-center text-foam">
              Codistica for {industry.label}
            </h1>
          </div>
        </div>

        {/* opening statement */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-5 transition-all duration-500"
          style={{
            opacity: past && !shrunk ? 1 : 0,
            transform: shrunk ? "translateY(-24px)" : "none",
          }}
        >
          <div className="glass-dark max-w-[960px] rounded-[40px] p-7 sm:p-10">
            <p className="text-center text-[clamp(20px,2.4vw,44px)] font-medium leading-[1.3] tracking-[-0.02em] text-foam">
              {statement}
            </p>
          </div>
        </div>

        {/* word-by-word context, below the card */}
        <div
          className="absolute z-20 transition-opacity duration-500"
          style={{
            opacity: shrunk ? 1 : 0,
            top: w ? cardTop + cardH + textGap : "60%",
            left: w ? cardLeft : 20,
            width: w ? cardW : "calc(100% - 40px)",
          }}
        >
          <div className="mb-6 flex justify-center">
            <EyebrowPill>The invisible system</EyebrowPill>
          </div>
          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-6">
            <RevealParagraph words={wordsA} start={0} total={total} rp={rp} />
            <RevealParagraph
              words={wordsB}
              start={wordsA.length}
              total={total}
              rp={rp}
            />
          </div>
        </div>

        {/* industry indicator — own sphere + switcher (fades out while reading) */}
        <div
          className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 transition-opacity duration-500"
          style={{ opacity: shrunk ? 0 : 1, pointerEvents: shrunk ? "none" : "auto" }}
        >
          <IndustrySwitcher
            currentSlug={industry.slug}
            open={switcherOpen}
            onClose={() => setSwitcherOpen(false)}
          />
          <div className="glass-pill flex items-center gap-1 p-2">
            <Sphere from={industry.sphere.from} to={industry.sphere.to} size={40} />
            <button
              onClick={() => setSwitcherOpen((v) => !v)}
              aria-label="Browse industries"
              aria-expanded={switcherOpen}
              className="flex size-10 items-center justify-center rounded-full bg-foam/10 transition-colors hover:bg-foam/20"
            >
              <DotGrid size={16} color="#dde4e3" />
            </button>
          </div>
        </div>

        {/* scroll hint */}
        <span
          className="mono-label absolute bottom-24 left-1/2 z-20 -translate-x-1/2 text-foam/60 transition-opacity duration-300"
          style={{ opacity: past ? 0 : 1 }}
          aria-hidden
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
