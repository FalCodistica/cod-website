"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Logo from "./Logo";
import {
  CopyEmailChip,
  DotChevron,
  DotGrid,
  FilledButton,
  LinkedInButton,
} from "./ui";
import { industries } from "@/lib/industries";

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

export function Header({ floating = false }: { floating?: boolean }) {
  const { open, setOpen } = useMenu();
  return (
    <header
      className={`${
        floating ? "absolute" : "relative"
      } inset-x-0 top-0 z-40 flex h-20 items-center justify-between px-5`}
    >
      <Logo />
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
        className="glass-pill absolute right-3 top-3 flex size-14 items-center justify-center transition-colors hover:bg-foam/15 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
      >
        <DotGrid size={20} />
      </button>
      <FilledButton href="mailto:info@codistica.com" className="max-sm:hidden">
        Talk to us
      </FilledButton>
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
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-14 items-center justify-center"
              >
                {/* partially-lit dot grid, as in Figma's close state */}
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                  {[
                    [2, 2, 0.08], [10, 2, 1], [18, 2, 1],
                    [2, 10, 0.08], [10, 10, 1], [18, 10, 0.08],
                    [2, 18, 1], [10, 18, 0.08], [18, 18, 1],
                  ].map(([cx, cy, o], i) => (
                    <circle key={i} cx={cx} cy={cy} r="2" fill="#dde4e3" opacity={o} />
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
                        <span className="transition-colors group-hover:text-mint">
                          {ind.name}
                        </span>
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
                  <Link
                    href="/company"
                    onClick={() => setOpen(false)}
                    className="glass-dark flex h-10 items-center justify-between rounded-b-2xl bg-foam/10 px-4 text-sm font-medium text-snow transition-colors hover:bg-foam/15"
                  >
                    About us
                    <DotChevron />
                  </Link>
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
