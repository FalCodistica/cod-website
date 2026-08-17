"use client";

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import Link from "next/link";
import {
  createContext,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { industries } from "@/lib/industries";
import Logo from "./Logo";
import { CopyEmailChip, DotChevron, DotGrid, LinkedInButton } from "./ui";

const MenuContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
  // the panel measures this to work out where to open from
  anchorRef: RefObject<HTMLButtonElement | null>;
}>({
  open: false,
  setOpen: () => {},
  anchorRef: { current: null },
});

export const useMenu = () => useContext(MenuContext);

// the panel is positioned before paint, so the open animation starts from the
// right corner; on the server there's nothing to measure
const useMeasureEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <MenuContext.Provider value={{ open, setOpen, anchorRef }}>
      {children}
      {/* The menu button lives here, in the root layout, rather than inside
          Header: the layout survives client-side navigation, so a button the
          user has dragged somewhere keeps that spot from page to page — and it
          shows up on every route, including the ones (industry sheets) that
          never render a Header of their own. */}
      <MenuButton />
      <MenuOverlay />
    </MenuContext.Provider>
  );
}

export function Header({
  floating = false,
  sticky = false,
}: {
  floating?: boolean;
  sticky?: boolean;
}) {
  return (
    <header
      className={`${
        floating ? "absolute" : sticky ? "sticky bg-ink/90 backdrop-blur-xl" : "relative"
      } inset-x-0 top-0 z-40 flex h-20 items-center justify-between px-5`}
    >
      <Logo className="max-sm:absolute max-sm:left-1/2 max-sm:top-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2" />
    </header>
  );
}

function MenuButton() {
  const { open, setOpen, anchorRef } = useMenu();
  // Framer's onTap can still fire right after a drag release lands on the
  // same element; this flag lets that one tap be swallowed, then clears
  // itself so the next genuine tap works normally.
  const suppressTapRef = useRef(false);
  // the drag bounds are measured from wherever the button actually rests
  // rather than assumed from its anchor — that's what lets it roam the whole
  // viewport instead of only the quadrant the anchor points into
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [dragBounds, setDragBounds] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    const MARGIN = 12;
    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // constraints are relative to the resting layout box, so back out any
      // offset already applied by a previous drag
      const left = rect.left - x.get();
      const top = rect.top - y.get();
      const bounds = {
        left: MARGIN - left,
        right: window.innerWidth - MARGIN - (left + rect.width),
        top: MARGIN - top,
        bottom: window.innerHeight - MARGIN - (top + rect.height),
      };
      setDragBounds(bounds);
      // a resize can leave a kept position outside the new viewport — pull it
      // back in
      x.set(Math.min(Math.max(x.get(), bounds.left), bounds.right));
      y.set(Math.min(Math.max(y.get(), bounds.top), bounds.bottom));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [x, y, anchorRef]);

  return (
    <motion.button
      ref={anchorRef}
      type="button"
      style={{ x, y }}
      onTap={() => {
        if (suppressTapRef.current) return;
        setOpen(!open);
      }}
      aria-label="Open menu"
      drag
      dragConstraints={dragBounds}
      dragElastic={0.08}
      dragMomentum={false}
      onDragEnd={() => {
        suppressTapRef.current = true;
        setTimeout(() => {
          suppressTapRef.current = false;
        }, 0);
      }}
      whileDrag={{ scale: 1.05 }}
      /* Bottom-right at every breakpoint: it stays clear of the sticky
         header's logo and of the industry sheet's grabber and close button, so
         there's nothing to dodge. z-45 keeps it above the sticky header (z-40)
         — which paints its own opaque background over anything below it — and
         above the industry sheet (z-30), while staying under the open menu
         panel (z-50). */
      className="glass-pill fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-[45] flex size-14 cursor-grab items-center justify-center text-foam transition-colors active:cursor-grabbing hover:bg-foam/15"
    >
      <DotGrid size={20} />
    </motion.button>
  );
}

type Placement = {
  left: number;
  top?: number;
  bottom?: number;
  width: number;
  maxHeight: number;
  /* where the panel grows from, so the scale-in reads as coming out of the
     button: an x offset within the panel plus the edge it unfolds away from */
  originX: number;
  openUp: boolean;
};

/*
 * The panel unfolds from the menu button, wherever the user has left it. Both
 * axes pick their direction from the room actually available: vertically it
 * takes whichever side of the button has more of it, horizontally it hugs the
 * button's nearer edge — so a button parked bottom-right opens up and to the
 * left, and one parked top-left opens down and to the right.
 */
function usePlacement(open: boolean, anchorRef: RefObject<HTMLButtonElement | null>) {
  const [placement, setPlacement] = useState<Placement | null>(null);

  useMeasureEffect(() => {
    // dropping the stale placement on close means the next open can never
    // paint a frame at the previous position before re-measuring
    if (!open) {
      setPlacement(null);
      return;
    }
    const MARGIN = 12; // breathing room against the viewport edges
    const GAP = 8; // between the button and the panel it opens
    const MIN_HEIGHT = 240;

    const measure = () => {
      const anchor = anchorRef.current?.getBoundingClientRect();
      if (!anchor) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const width = Math.min(800, vw - MARGIN * 2);

      const above = anchor.top - GAP - MARGIN;
      const below = vh - anchor.bottom - GAP - MARGIN;
      const openUp = above > below;

      const centreX = anchor.left + anchor.width / 2;
      // align the panel edge on the button's side, then keep it on screen
      const left = Math.min(
        Math.max(centreX < vw / 2 ? anchor.left : anchor.right - width, MARGIN),
        vw - MARGIN - width,
      );

      setPlacement({
        left,
        width,
        top: openUp ? undefined : anchor.bottom + GAP,
        bottom: openUp ? vh - anchor.top + GAP : undefined,
        maxHeight: Math.max(MIN_HEIGHT, openUp ? above : below),
        originX: Math.min(Math.max(centreX - left, 0), width),
        openUp,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, anchorRef]);

  return placement;
}

function MenuOverlay() {
  const { open, setOpen, anchorRef } = useMenu();
  const placement = usePlacement(open, anchorRef);
  return (
    <AnimatePresence>
      {open && placement && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            style={{
              left: placement.left,
              top: placement.top,
              bottom: placement.bottom,
              width: placement.width,
              maxHeight: placement.maxHeight,
              transformOrigin: `${placement.originX}px ${placement.openUp ? "100%" : "0%"}`,
            }}
            className="fixed z-50 overflow-y-auto overflow-x-hidden rounded-[40px] bg-panel/95 backdrop-blur-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* close row */}
            <div className="flex h-14 items-center justify-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-14 items-center justify-center text-foam"
              >
                {/* partially-lit dot grid, as in Figma's close state */}
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  {[
                    [2, 2, 1],
                    [10, 2, 0.08],
                    [18, 2, 1],
                    [2, 10, 0.08],
                    [10, 10, 1],
                    [18, 10, 0.08],
                    [2, 18, 1],
                    [10, 18, 0.08],
                    [18, 18, 1],
                  ].map(([cx, cy, o]) => (
                    <circle
                      key={`${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r="2"
                      fill="currentColor"
                      opacity={o}
                    />
                  ))}
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 px-10 pb-10 pt-3 sm:flex-row sm:gap-0">
              {/* industries column */}
              <nav className="flex-1">
                <div className="mono-label pb-3 text-mist">industries</div>
                <ul>
                  {industries.map((ind) => (
                    <li key={ind.slug}>
                      <Link
                        href={`/industries/${ind.slug}`}
                        onClick={() => setOpen(false)}
                        className="group flex h-10 items-center text-lg font-medium text-foam"
                      >
                        <span className="transition-colors group-hover:text-mint">{ind.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* company column */}
              <div className="flex w-full flex-col justify-between gap-6 sm:w-[360px]">
                <div>
                  <Link
                    href="/company"
                    onClick={() => setOpen(false)}
                    className="group block overflow-hidden rounded-t-2xl"
                  >
                    <div
                      className="relative flex h-[183px] items-center justify-center bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ backgroundImage: "url(/images/texture-streaks.webp)" }}
                    >
                      <span className="text-center text-lg font-medium leading-snug tracking-tight text-foam">
                        Systems worth building.
                        <br />
                        Together.
                      </span>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-px overflow-hidden rounded-b-2xl">
                    <Link
                      href="/company"
                      onClick={() => setOpen(false)}
                      className="glass-dark flex h-10 items-center justify-between bg-foam/10 px-4 text-sm font-medium text-snow transition-colors hover:bg-foam/15"
                    >
                      Partnership &amp; collaboration
                      <DotChevron />
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className="glass-dark rounded-b-2xl flex h-10 items-center justify-between bg-foam/10 px-4 text-sm font-medium text-snow transition-colors hover:bg-foam/15"
                    >
                      About us
                      <DotChevron />
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <CopyEmailChip email="info@codistica.com" />
                  <LinkedInButton />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
