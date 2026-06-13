import Image from "next/image";
import { Sphere } from "./ui";
import { industries, type Industry } from "@/lib/industries";

/*
 * A static rendering of the home hero for one industry, shown behind the
 * bottom sheet so the home page stays visible (instead of a black screen)
 * while the sheet is open or being dragged down.
 */
export default function HomeBackdrop({ industry }: { industry: Industry }) {
  const active = industries.findIndex((i) => i.slug === industry.slug);
  return (
    <div className="fixed inset-0 z-10 overflow-hidden bg-ink" aria-hidden>
      {/* hero image card */}
      <div className="absolute inset-x-0 bottom-20 top-20 overflow-hidden rounded-[40px]">
        <Image
          src={industry.hero}
          alt=""
          fill
          className="scale-[1.01] object-cover blur-[1px]"
          sizes="100vw"
        />
        <div className="hero-shadow pointer-events-none absolute inset-0 rounded-[40px]" />
      </div>

      {/* heading pill */}
      <div className="glass-dark absolute inset-x-2 top-[calc(50%+8px)] flex h-10 -translate-y-1/2 items-center justify-between rounded-full px-4 sm:inset-x-5 sm:h-[100px] sm:px-10">
        <span className="text-sm font-medium tracking-[-0.01em] text-snow sm:text-[clamp(28px,2.5vw,48px)] sm:tracking-[-0.03em]">
          Technology partner for
        </span>
        <Sphere
          from={industry.sphere.from}
          to={industry.sphere.to}
          size={56}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <span className="text-right text-sm font-medium tracking-[-0.01em] text-snow sm:text-[clamp(28px,2.5vw,48px)] sm:tracking-[-0.03em]">
          {industry.label}
        </span>
      </div>

      {/* step rails */}
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={`absolute top-1/2 flex h-[97px] -translate-y-1/2 flex-col justify-between ${
            side === "left" ? "left-0 items-start" : "right-0 items-end"
          }`}
        >
          {industries.map((ind, i) => (
            <span
              key={ind.slug}
              className="h-px w-4"
              style={{
                background:
                  i === active
                    ? "#ffffff"
                    : side === "left"
                      ? "linear-gradient(to right, #ffffff 50%, transparent 50%)"
                      : "linear-gradient(to left, #ffffff 50%, transparent 50%)",
                opacity: i === active ? 1 : 0.6,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
