"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMenu } from "./SiteChrome";
import { DotGrid, Sphere } from "./ui";
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
 * Industry hero — a pinned, multi-stage scroll experience:
 *   stage 0  bottom sheet: black peek at top, rounded corners, grabber
 *   1st scroll  → the sheet snaps to fullscreen (black + handle vanish)
 *               and the title morphs into the opening statement
 *   2nd scroll  → the full-bleed image fluidly shrinks into a small card
 *   then        → the two paragraphs below it reveal word-by-word on scroll
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
  const { setOpen } = useMenu();
  const [p, setP] = useState(0);
  const [vp, setVp] = useState({ w: 0, h: 0 });

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
    const onResize = () => {
      setVp({ w: window.innerWidth, h: window.innerHeight });
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // staged thresholds (fluid, triggered) + scrubbed reveal
  const opened = p > 0.04;
  const shrunk = p > 0.28;
  const rp = clamp01((p - 0.33) / 0.4);

  const { w, h } = vp;
  const narrow = w > 0 && w < 640;
  const cardW = Math.min(960, w - 40);
  const cardH = Math.min(440, Math.round(h * (narrow ? 0.32 : 0.42)));
  const cardLeft = Math.round((w - cardW) / 2);
  const cardTop = Math.round(Math.max(64, h * (narrow ? 0.07 : 0.09)));
  const textGap = narrow ? 16 : 28;

  // image wrapper geometry per stage
  let geo: React.CSSProperties;
  if (!w) {
    geo = { top: 12, left: 0, width: "100%", height: "calc(100% - 12px)", borderRadius: 40 };
  } else if (shrunk) {
    geo = { top: cardTop, left: cardLeft, width: cardW, height: cardH, borderRadius: 24 };
  } else if (opened) {
    geo = { top: 0, left: 0, width: w, height: h, borderRadius: 0 };
  } else {
    geo = { top: 12, left: 0, width: w, height: h - 12, borderRadius: 40 };
  }

  const wordsA = detailA.split(" ");
  const wordsB = detailB.split(" ");
  const total = wordsA.length + wordsB.length;

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* black peek above the sheet (vanishes when opened) */}
        <div
          className="absolute inset-x-0 top-0 z-10 h-3 bg-black transition-opacity duration-500"
          style={{ opacity: opened ? 0 : 1 }}
          aria-hidden
        />

        {/* image — morphs from full-bleed sheet to a small card */}
        <div
          className="absolute overflow-hidden"
          style={{
            ...geo,
            boxSizing: "border-box",
            borderTop: "1px solid",
            borderTopColor: opened ? "transparent" : "rgba(255,255,255,0.3)",
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

        {/* grabber (vanishes with the black peek) */}
        <div
          className="absolute left-1/2 top-4 z-30 h-1 w-10 -translate-x-1/2 rounded-full bg-foam transition-opacity duration-500"
          style={{ opacity: opened ? 0 : 1 }}
          aria-hidden
        />

        {/* menu button — light circle, dark dots */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="absolute right-5 top-6 z-30 flex size-10 items-center justify-center rounded-full bg-foam backdrop-blur-xl transition-transform hover:scale-105"
        >
          <DotGrid size={20} color="#2b3231" />
        </button>

        {/* title pill */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-3 transition-all duration-500 sm:px-5"
          style={{
            opacity: opened ? 0 : 1,
            transform: opened ? "translateY(-24px) scale(0.96)" : "none",
            pointerEvents: opened ? "none" : "auto",
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
            opacity: opened && !shrunk ? 1 : 0,
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

        {/* industry indicator — own sphere + menu (fades out while reading) */}
        <div
          className="glass-pill absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 p-2 transition-opacity duration-500"
          style={{ opacity: shrunk ? 0 : 1, pointerEvents: shrunk ? "none" : "auto" }}
        >
          <Sphere from={industry.sphere.from} to={industry.sphere.to} size={40} />
          <button
            onClick={() => setOpen(true)}
            aria-label="Browse industries"
            className="flex size-10 items-center justify-center rounded-full bg-foam/10 transition-colors hover:bg-foam/20"
          >
            <DotGrid size={16} color="#dde4e3" />
          </button>
        </div>

        {/* scroll hint */}
        <span
          className="mono-label absolute bottom-24 left-1/2 z-20 -translate-x-1/2 text-foam/60 transition-opacity duration-300"
          style={{ opacity: opened ? 0 : 1 }}
          aria-hidden
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
