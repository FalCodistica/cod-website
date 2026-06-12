"use client";

import { useEffect, useRef } from "react";
import { EyebrowPill } from "./ui";
import { type Industry } from "@/lib/industries";

/* ── math helpers (ported from the prototype) ───────────────────── */
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const bellCurve = (x: number, center: number, width: number, height: number) => {
  const d = (x - center) / width;
  return height * Math.exp(-0.5 * d * d);
};

type RGB = [number, number, number];
const hexToRgb = (hex: string): RGB => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const ASH: RGB = [136, 147, 146]; // neutral ruler (#889392)
const ALERT: RGB = [255, 180, 171]; // the challenge (#ffb4ab)

const LINE_W = 1;
const LINE_H = 180;

/*
 * Pinned canvas story (ported 1:1 from the vertical-mobility prototype,
 * themed per industry):
 *   P1 0.00–0.20  the sphere glides across the row to the centre
 *   P2 0.20–0.40  it stops; the central line rises (the challenge)
 *   P3 0.40–0.60  a second sphere emerges from below
 *   P4 0.55–0.85  the lines bend into a bell curve — mobility overcoming it
 *   P5 0.85–1.00  settle / hold
 */
export default function ChallengeScene({
  industry,
  title,
  points,
  note,
}: {
  industry: Industry;
  title: string;
  points: string[];
  note: string;
}) {
  const spaceRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const space = spaceRef.current;
    const canvas = canvasRef.current;
    if (!space || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const accent = hexToRgb(industry.sphere.from);
    let W = 0;
    let H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (p: number) => {
      ctx.clearRect(0, 0, W, H);

      // full-width ruler (matches Figma): tile lines edge-to-edge,
      // odd count so there's a true centre line
      const pitch = LINE_W + 21;
      let count = Math.floor((W - 16) / pitch) + 1;
      if (count % 2 === 0) count -= 1;
      const rowW = (count - 1) * pitch;
      const rowX = (W - rowW) / 2;
      const rowY = H / 2 - LINE_H / 2;
      const centerIdx = (count - 1) / 2;
      const centerLineX = rowX + centerIdx * pitch;
      const R = W < 640 ? 8 : 10;

      // phase progressions
      const bellEased = easeOut(clamp01((p - 0.55) / 0.3));
      const bellHeight = 90 * bellEased;
      const bellWidth = 5.5;
      const riseEased = easeInOut(clamp01((p - 0.2) / 0.2));
      const settleEased = easeInOut(clamp01((p - 0.55) / 0.2));
      const centralRise = 60 * riseEased * (1 - settleEased);

      // ── ruler lines ──
      for (let i = 0; i < count; i++) {
        const x = rowX + i * pitch;
        const bell = bellCurve(i, centerIdx, bellWidth, bellHeight);
        const bellNorm = bellHeight > 0 ? bell / bellHeight : 0; // 0..1, peaks at centre
        const extraRise = i === centerIdx ? centralRise : 0;
        const offset = bell + extraRise;

        let col = ASH;
        let alpha = 0.22;
        if (bellEased > 0) {
          const m = bellNorm * bellEased;
          col = mix(ASH, accent, m);
          alpha = lerp(0.22, 0.6, m);
        }
        if (i === centerIdx) {
          const m = riseEased * (1 - settleEased);
          if (m > 0) {
            col = mix(col, ALERT, m);
            alpha = Math.max(alpha, lerp(0.22, 0.85, m));
          }
        }

        ctx.beginPath();
        ctx.moveTo(x, rowY - offset);
        ctx.lineTo(x, rowY + LINE_H);
        ctx.strokeStyle = rgba(col, alpha);
        ctx.lineWidth = LINE_W;
        ctx.stroke();
      }

      // fade the line bottoms into the background (Figma)
      const fade = ctx.createLinearGradient(0, rowY + LINE_H - 90, 0, rowY + LINE_H);
      fade.addColorStop(0, "rgba(14,21,20,0)");
      fade.addColorStop(1, "rgba(14,21,20,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, rowY + LINE_H - 90, W, 92);

      // ── sphere 1 — rides the row, then the bell ──
      const c1X = lerp(
        rowX - 40,
        centerLineX,
        easeInOut(clamp01(p / 0.2)),
      );
      const c1Y =
        rowY - 20 - bellCurve(centerIdx, centerIdx, bellWidth, bellHeight) - centralRise;
      const c1A = clamp01(p / 0.03);
      const pulsePhase = clamp01((p - 0.2) / 0.2);
      const pulse =
        pulsePhase > 0 && settleEased < 1
          ? Math.sin(pulsePhase * Math.PI) * 0.15
          : 0;
      ctx.beginPath();
      ctx.arc(c1X, c1Y, R + 4, 0, Math.PI * 2);
      ctx.fillStyle = rgba(accent, 0.12 * c1A);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(c1X, c1Y, R, 0, Math.PI * 2);
      ctx.fillStyle = rgba(accent, Math.min(0.95, 0.7 + pulse) * c1A);
      ctx.fill();

      // ── sphere 2 — emerges from below ──
      if (p > 0.38) {
        const c2A = clamp01((p - 0.38) / 0.06);
        const c2Y = lerp(
          H + 40,
          rowY + LINE_H + 20,
          easeOut(clamp01((p - 0.4) / 0.45)),
        );
        ctx.beginPath();
        ctx.arc(centerLineX, c2Y, R + 4, 0, Math.PI * 2);
        ctx.fillStyle = rgba(accent, 0.12 * c2A);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerLineX, c2Y, R, 0, Math.PI * 2);
        ctx.fillStyle = rgba(accent, 0.85 * c2A);
        ctx.fill();
      }

      // ── overlay captions, synced to the phases ──
      if (titleRef.current)
        titleRef.current.style.opacity = String(1 - clamp01((p - 0.12) / 0.1));
      if (pointsRef.current)
        pointsRef.current.style.opacity = String(
          clamp01((p - 0.2) / 0.06) * (1 - clamp01((p - 0.52) / 0.08)),
        );
      if (noteRef.current)
        noteRef.current.style.opacity = String(clamp01((p - 0.6) / 0.08));
      if (hintRef.current)
        hintRef.current.style.opacity = String(1 - clamp01(p / 0.02));
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = space.getBoundingClientRect();
        const p = clamp01(-rect.top / (rect.height - window.innerHeight));
        draw(p);
      });
    };
    const onResize = () => {
      resize();
      onScroll();
    };

    resize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [industry.sphere.from]);

  return (
    <section ref={spaceRef} className="relative h-[450vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* framing — fades out as the story begins */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 top-[12%] flex flex-col items-center px-5"
        >
          <EyebrowPill>The challenge</EyebrowPill>
          <h2 className="heading mt-2 max-w-[720px] text-center text-foam">
            {title}
          </h2>
        </div>

        {/* the problem — appears as the central line rises */}
        <div
          ref={pointsRef}
          className="pointer-events-none absolute inset-x-0 bottom-[14%] flex flex-col items-center px-5 opacity-0"
        >
          <p className="max-w-[640px] text-center text-base font-medium leading-relaxed text-alert">
            {points.map((pt) => (
              <span key={pt} className="block">
                {pt}
              </span>
            ))}
          </p>
        </div>

        {/* the turn — appears as the bell curve forms */}
        <div
          ref={noteRef}
          className="pointer-events-none absolute inset-x-0 bottom-[14%] flex flex-col items-center px-5 opacity-0"
        >
          <p className="max-w-[640px] text-center text-base font-medium leading-relaxed text-mist">
            {note}
          </p>
        </div>

        <span
          ref={hintRef}
          className="mono-label pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-mint/40"
          aria-hidden
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
