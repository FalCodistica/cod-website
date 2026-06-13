"use client";

import Link from "next/link";
import { Sphere } from "./ui";
import { industries } from "@/lib/industries";

/*
 * The industry switcher that opens from the sphere pill — distinct from the
 * full site menu (top-right). It only lists industries, each with a step
 * tick on the right and a sphere on the current / hovered row.
 */
export default function IndustrySwitcher({
  currentSlug,
  open,
  onClose,
}: {
  currentSlug: string;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <>
      {/* click-away catcher */}
      <button
        aria-label="Close industries"
        onClick={onClose}
        className="fixed inset-0 z-30 cursor-default"
      />
      <div className="absolute bottom-[72px] left-1/2 z-40 w-[340px] max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-[28px] bg-[#1a2120]/40 p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl">
        <div className="mono-label px-2 pb-2 text-mist">industries</div>
        <ul>
          {industries.map((ind) => {
            const current = ind.slug === currentSlug;
            return (
              <li key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  onClick={onClose}
                  className="group flex h-10 items-center gap-3 px-2"
                >
                  <span className="flex size-6 items-center justify-center">
                    <Sphere
                      from={ind.sphere.from}
                      to={ind.sphere.to}
                      size={22}
                      className={
                        current
                          ? ""
                          : "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      }
                    />
                  </span>
                  <span
                    className={`flex-1 text-lg font-medium transition-colors ${
                      current ? "text-foam" : "text-mist group-hover:text-foam"
                    }`}
                  >
                    {ind.name}
                  </span>
                  <span
                    className="h-px w-10 shrink-0"
                    style={{
                      background:
                        "linear-gradient(to left, #dde4e3, transparent)",
                      opacity: current ? 1 : 0.3,
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
