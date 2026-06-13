"use client";

import { createContext, useContext } from "react";

/*
 * The scroll container the pinned industry sections should track.
 * `null` means the window (default, e.g. the standalone full page).
 * Inside the bottom sheet it is the sheet's internal scroll element, so
 * IndustryHero / ChallengeScene drive their scroll math from the sheet.
 */
export const ScrollRootContext = createContext<HTMLElement | null>(null);

export const useScrollRoot = () => useContext(ScrollRootContext);
