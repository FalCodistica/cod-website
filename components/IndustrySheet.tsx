"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ScrollRootContext } from "./ScrollRoot";
import { useMenu } from "./SiteChrome";
import { DotGrid } from "./ui";

const PEEK = 10; // px of backdrop shown above the sheet at rest
const OFFSCREEN = 2400; // SSR-safe initial offset (no window needed)
const EASE =
  "transform 0.5s cubic-bezier(0.32,0.72,0,1), border-radius 0.5s cubic-bezier(0.32,0.72,0,1)";

/*
 * A real bottom sheet for an industry. It slides up from the bottom over a
 * dark backdrop, rests with rounded top corners + a grabber, and:
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
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const { setOpen } = useMenu();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState(false);
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
  useEffect(() => {
    if (drag.current || closing.current) return;
    move(expanded ? 0 : PEEK, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const dismiss = () => {
    const el = sheetRef.current;
    if (!el) return;
    closing.current = true;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      router.push("/");
    };
    el.addEventListener(
      "transitionend",
      (e) => e.propertyName === "transform" && finish(),
      { once: true },
    );
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

  return (
    <>
      {/* dark backdrop — the home page is revealed once the sheet dismisses */}
      <div className="fixed inset-0 z-20 bg-black" aria-hidden />

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
            {/* menu — always reachable */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-foam backdrop-blur-xl transition-transform hover:scale-105"
            >
              <DotGrid size={20} color="#2b3231" />
            </button>
          </div>

          {children}
        </ScrollRootContext.Provider>
      </div>
    </>
  );
}
