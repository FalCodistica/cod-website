"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "codistica:scroll-hint-count";
const MAX_SHOWS = 9;
const IDLE_MS = 5000;

function readCount() {
  if (typeof window === "undefined") return 0;
  const n = Number.parseInt(window.localStorage.getItem(STORAGE_KEY) ?? "0", 10);
  return Number.isFinite(n) ? n : 0;
}

function bumpCount() {
  window.localStorage.setItem(STORAGE_KEY, String(readCount() + 1));
}

/*
 * Scroll hint visibility: shown on entering the page, then again after any
 * 5s scroll pause, capped at MAX_SHOWS lifetime appearances (localStorage) so
 * it fades out of a returning user's experience.
 */
export function useScrollHint(target?: HTMLElement | Window | null) {
  const [visible, setVisible] = useState(false);
  // Tracks the "logical" visibility synchronously (state updates are async,
  // and this also survives React StrictMode's double effect-invocation in dev).
  const visibleRef = useRef(false);

  useEffect(() => {
    if (readCount() >= MAX_SHOWS) return;

    const el: HTMLElement | Window = target ?? window;
    let idleTimer: ReturnType<typeof setTimeout>;

    const reveal = () => {
      if (visibleRef.current || readCount() >= MAX_SHOWS) return;
      bumpCount();
      visibleRef.current = true;
      setVisible(true);
    };
    const scheduleReveal = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(reveal, IDLE_MS);
    };
    const onScroll = () => {
      visibleRef.current = false;
      setVisible(false);
      scheduleReveal();
    };

    reveal();
    scheduleReveal();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, [target]);

  return visible;
}
