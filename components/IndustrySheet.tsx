"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Image from "@/components/AppImage";
import { Header } from "@/components/SiteChrome";
import { Sphere, StepRail } from "@/components/ui";
import { type Industry, industries } from "@/lib/industries";
import { ScrollRootContext } from "./ScrollRoot";
import { CloseDots } from "./ui";

const PEEK = 10; // px of the backdrop shown above the sheet at rest
const OFFSCREEN = 2400; // SSR-safe initial offset (no window needed)
const EASE =
  "transform 0.5s cubic-bezier(0.32,0.72,0,1), border-radius 0.5s cubic-bezier(0.32,0.72,0,1)";

/*
 * A real bottom sheet for an industry. It slides up from the bottom, rests
 * with rounded top corners + a grabber, and:
 *   - expands to fullscreen (corners/grabber fade) once you scroll in
 *   - the grabber can be dragged down; past a threshold it dismisses the
 *     sheet and returns to the home page
 *   - is keyed by slug, so inter-industry navigation remounts it: a fresh
 *     slide-up from the top, never a reversed scroll
 *
 * The sheet position is driven by CSS transitions (compositor, not rAF) so
 * it animates reliably; the drag writes the transform directly for 1:1 feel.
 */
export default function IndustrySheet({
  industry,
  children,
}: {
  slug: string;
  industry: Industry;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const yRef = useRef(OFFSCREEN);
  const drag = useRef<{ startPointer: number; startY: number } | null>(null);
  const closing = useRef(false);

  const move = (to: number, animated: boolean) => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.transition = animated ? EASE : "none";
    el.style.transform = `translateY(${to}px)`;
    yRef.current = to;
  };

  // expose the sheet as the scroll root for the pinned sections
  useEffect(() => setRoot(sheetRef.current), []);

  // slide-up entrance: snap one viewport down, then ease to the peek
  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only; move is a stable closure over refs
  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    move(window.innerHeight, false);
    void el.offsetHeight; // force reflow so the next change transitions
    move(PEEK, true);
  }, []);

  // expand to fullscreen once the user scrolls in
  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    const onScroll = () =>
      setExpanded((cur) => {
        const next = el.scrollTop > 48;
        return cur === next ? cur : next;
      });
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // settle to the resting position when expansion changes (not mid-drag)
  // biome-ignore lint/correctness/useExhaustiveDependencies: move is a stable closure over refs
  useEffect(() => {
    if (drag.current || closing.current) return;
    move(expanded ? 0 : PEEK, true);
  }, [expanded]);

  // matches the home hero's own breakpoint-only portrait/landscape choice
  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const dismiss = () => {
    const el = sheetRef.current;
    if (!el) return;
    closing.current = true;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      // scroll:false leaves Home's scroll position untouched.
      navigate("/", { preventScrollReset: true });
    };
    el.addEventListener("transitionend", (e) => e.propertyName === "transform" && finish(), {
      once: true,
    });
    setTimeout(finish, 600); // fallback
    move(window.innerHeight, true);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (expanded) return;
    sheetRef.current?.scrollTo(0, 0);
    drag.current = { startPointer: e.clientY, startY: yRef.current };
    move(yRef.current, false); // kill transition for 1:1 dragging
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    move(Math.max(0, drag.current.startY + (e.clientY - drag.current.startPointer)), false);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    if (yRef.current > window.innerHeight * 0.22) dismiss();
    else move(PEEK, true);
  };

  const activeIndex = industries.findIndex((i) => i.slug === industry.slug);
  const usePortrait = narrow && !!industry.heroPortrait;
  const heroSrc = usePortrait ? (industry.heroPortrait as string) : industry.hero;
  const heroPosition = usePortrait ? "50% 50%" : (industry.heroFocus ?? "50% 50%");

  return (
    <>
      {/* static reconstruction of the home hero behind the sheet — there's no
          previous page mounted underneath in a client-only SPA, so without
          this the peek strip and the slide-up/down transition would reveal
          plain black instead of something that reads as "still home". */}
      <div className="fixed inset-0 z-20 overflow-hidden bg-ink" aria-hidden="true">
        <div className="absolute inset-x-0 top-20 bottom-20 overflow-hidden rounded-[40px]">
          <Image
            src={heroSrc}
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: heroPosition }}
            sizes="100vw"
          />
          <div className="hero-shadow pointer-events-none absolute inset-0 rounded-[40px]" />
        </div>

        <h1 className="glass-dark absolute inset-x-2 top-[calc(50%+8px)] z-10 flex h-10 -translate-y-1/2 items-center justify-between rounded-full px-4 sm:inset-x-5 sm:h-[100px] sm:px-10">
          <span className="pointer-events-none text-sm font-medium tracking-[-0.01em] text-snow sm:text-[clamp(28px,2.5vw,48px)] sm:tracking-[-0.03em]">
            Technology partner for
          </span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sphere
              from={industry.sphere.from}
              to={industry.sphere.to}
              size={56}
              className="scale-50 sm:scale-100"
            />
          </div>
          <span className="relative block h-[1.15em] overflow-hidden text-right text-sm font-medium tracking-[-0.01em] text-snow sm:text-[clamp(28px,2.5vw,48px)] sm:tracking-[-0.03em]">
            <span className="block leading-[1.15]">{industry.label}</span>
          </span>
        </h1>

        <StepRail side="left" active={activeIndex} total={industries.length} />
        <StepRail side="right" active={activeIndex} total={industries.length} />

        <Header floating />
      </div>
      <div
        ref={sheetRef}
        style={{
          borderTopLeftRadius: expanded ? 0 : 40,
          borderTopRightRadius: expanded ? 0 : 40,
        }}
        className="fixed inset-0 z-30 overflow-y-auto overflow-x-hidden overscroll-contain bg-ink transition-[border-radius] duration-500 [transform:translateY(2400px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ScrollRootContext.Provider value={root}>
          {/* chrome pinned to the sheet's top edge */}
          <div className="sticky top-0 z-40 h-0">
            {/* grabber — draggable to dismiss (only while at the top) */}
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              className="absolute left-1/2 top-0 flex h-9 w-32 -translate-x-1/2 cursor-grab touch-none items-center justify-center transition-opacity duration-300 active:cursor-grabbing"
              style={{
                opacity: expanded ? 0 : 1,
                pointerEvents: expanded ? "none" : "auto",
              }}
            >
              <span className="h-1 w-10 rounded-full bg-foam" />
            </div>
            {/* close the sheet — returns to the home page */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-foam text-coal backdrop-blur-xl transition-transform hover:scale-105"
            >
              <CloseDots size={20} />
            </button>
          </div>

          {children}
        </ScrollRootContext.Provider>
      </div>
    </>
  );
}
