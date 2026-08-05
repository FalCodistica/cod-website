"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { industries } from "@/lib/industries";
import Logo from "./Logo";
import { CopyEmailChip, DotChevron, DotGrid, LinkedInButton } from "./ui";

const MenuContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export const useMenu = () => useContext(MenuContext);

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
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
  const { open, setOpen } = useMenu();
  // Framer's onTap can still fire right after a drag release lands on the
  // same element; this flag lets that one tap be swallowed, then clears
  // itself so the next genuine tap works normally.
  const suppressTapRef = useRef(false);
  // how far the button (anchored bottom-right, size-14 = 56px, 12px margin)
  // is allowed to travel up and to the left without leaving the viewport
  const [dragBounds, setDragBounds] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  // portal target: some pages (e.g. the homepage hero) wrap the header in a
  // `position: sticky` container, which always creates its own stacking
  // context — the button's z-index would then only win against siblings
  // inside that container, not page content rendered after it (like the
  // footer). Portaling straight to <body> escapes that trap.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const BUTTON = 56;
    const MARGIN = 12;
    const update = () => {
      setDragBounds({
        top: -(window.innerHeight - BUTTON - MARGIN * 2),
        left: -(window.innerWidth - BUTTON - MARGIN * 2),
        right: 0,
        bottom: 0,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <header
      className={`${
        floating ? "absolute" : sticky ? "sticky bg-ink/90 backdrop-blur-xl" : "relative"
      } inset-x-0 top-0 z-40 flex h-20 items-center justify-between px-5`}
    >
      <Logo className="max-sm:absolute max-sm:left-1/2 max-sm:top-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2" />
      {mounted &&
        createPortal(
          <motion.button
            type="button"
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
            className="glass-pill fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-30 flex size-14 cursor-grab items-center justify-center text-foam transition-colors active:cursor-grabbing hover:bg-foam/15 sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-3 sm:-translate-x-1/2"
          >
            <DotGrid size={20} />
          </motion.button>,
          document.body,
        )}
    </header>
  );
}

function MenuOverlay() {
  const { open, setOpen } = useMenu();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-1/2 top-3 z-50 w-[min(800px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-[40px] bg-panel/95 backdrop-blur-2xl"
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
                      style={{ backgroundImage: "url(/images/texture-streaks.jpg)" }}
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
