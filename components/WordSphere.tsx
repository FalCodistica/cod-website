"use client";

import { useState } from "react";

/*
 * "What we do" word wheel — 54 keywords as radial spokes (data + angles
 * taken verbatim from the Figma "Circle row" instances). Each word is
 * anchored on the centre side (inner edge at a fixed radius) and reads
 * outward, with a small dot cluster just inside it; the empty middle shows
 * the word currently being hovered. A horizontal gradient band lights the
 * equator so the wheel reads as a sphere. No rotation — words only
 * brighten on hover, as in Figma.
 */

const SPOKES: { label: string; angle: number; dots: string }[] = [
  { label: "Vertical Mobility", angle: 90, dots: "•• •• ••" },
  { label: "Concept to Implementation", angle: 96.7, dots: "••• ••" },
  { label: "Remote Access", angle: 103.3, dots: "••" },
  { label: "Dashboard", angle: 110, dots: "•   •" },
  { label: "Resource Optimization", angle: 116.7, dots: "•••  •••" },
  { label: "Plant Modeling", angle: 123.3, dots: "•" },
  { label: "Traceability", angle: 130, dots: "•• ••" },
  { label: "Processing Lines", angle: 136.7, dots: "•  •  •" },
  { label: "Inventory Systems", angle: 143.4, dots: "••" },
  { label: "Product Lifecycle", angle: 150, dots: "•   •" },
  { label: "Supply Chain", angle: 156.7, dots: "•••  •••" },
  { label: "Networks", angle: 163.4, dots: "•" },
  { label: "Connectivity", angle: 170, dots: "•  •" },
  { label: "Integration", angle: 176.7, dots: "•• ••" },
  { label: "Infrastructure", angle: 183.4, dots: "••• •••" },
  { label: "Digital Twin", angle: 190, dots: "• •" },
  { label: "Machine Learning", angle: 196.7, dots: "•  • ••" },
  { label: "Systems Integration", angle: 203.4, dots: "•  •  •" },
  { label: "Digital Networks", angle: 210.1, dots: "••  •• •" },
  { label: "Access Control", angle: 216.7, dots: "•••  •" },
  { label: "Security Systems", angle: 223.4, dots: "" },
  { label: "Lighting Control", angle: 230.1, dots: "•   •   •" },
  { label: "Energy Management", angle: 236.7, dots: "••" },
  { label: "Climate Systems", angle: 243.4, dots: "•   • •" },
  { label: "Systems Thinking", angle: 250.1, dots: "••• • ••" },
  { label: "Food & Beverage", angle: 256.7, dots: "••  •" },
  { label: "Telecommunications", angle: 263.4, dots: "• ••   •" },
  { label: "Waste Treatment", angle: 83.3, dots: "•••   ••" },
  { label: "Fashion", angle: 76.7, dots: "•" },
  { label: "Household Appliances", angle: 70, dots: "•  •" },
  { label: "Passenger Lifts", angle: 63.3, dots: "••• •  •" },
  { label: "Cargo Lifts", angle: 56.6, dots: "••   •••" },
  { label: "High-Speed Lifts", angle: 50, dots: "•  ••" },
  { label: "Escalators", angle: 43.3, dots: "•• •" },
  { label: "Travelators", angle: 36.6, dots: "•" },
  { label: "Controllers", angle: 30, dots: "•••• •••" },
  { label: "Smart Components", angle: 23.3, dots: "••   •" },
  { label: "Data Analytics", angle: 16.6, dots: "••• •" },
  { label: "Lifecycle Management", angle: 10, dots: "•• •  •" },
  { label: "Software", angle: 3.3, dots: "•   • •" },
  { label: "Automation", angle: -3.4, dots: "•• •• ••" },
  { label: "Monitoring", angle: -10.1, dots: "•••   •" },
  { label: "IoT", angle: -16.7, dots: "" },
  { label: "Waste-to-Hydrocarbon", angle: -23.4, dots: "•  • •" },
  { label: "Process Automation", angle: -30.1, dots: "••• ••" },
  { label: "Plant Integration", angle: -36.7, dots: "•  •••" },
  { label: "Customer Experience", angle: -43.4, dots: "•  •" },
  { label: "Quality Monitoring", angle: -50.1, dots: "••" },
  { label: "Packaging Systems", angle: -56.7, dots: "• •  •" },
  { label: "Energy Recovery", angle: -63.4, dots: "•  ••" },
  { label: "Fire Protection", angle: -70.1, dots: "•" },
  { label: "Commissioning", angle: -76.8, dots: "•   •   •" },
  { label: "End to End", angle: -83.4, dots: "•   •" },
  { label: "Building Automation", angle: -90.1, dots: "•••  •••" },
];

export default function WordSphere() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[632px] text-[10px]">
      {/* gradient equator band — fills the container width so the wheel reads
         as a sphere (matches Figma's full-width Rectangle 1295) */}
      <div
        className="absolute left-1/2 top-1/2 h-[316px] w-[156%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-ink) 0%, var(--color-panel) 40%, var(--color-panel) 60%, var(--color-ink) 100%)",
        }}
        aria-hidden="true"
      />

      {/* hovered word, shown in the centre */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex w-[150px] -translate-x-1/2 -translate-y-1/2 justify-center">
        <span
          className="text-center text-lg font-medium leading-tight tracking-tight text-foam transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {hovered}
        </span>
      </div>

      {/* radial spokes — word anchored on the centre side, reading outward */}
      {SPOKES.map(({ label, angle, dots }) => (
        <div
          key={label}
          className="absolute left-1/2 top-1/2 h-0 w-1/2 origin-left"
          style={{ transform: `rotate(${-angle}deg)` }}
        >
          {/* biome-ignore lint/a11y/noStaticElementInteractions: purely decorative hover affordance, not a focusable control */}
          <div
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered((h) => (h === label ? null : h))}
            className="group absolute left-[52%] -translate-y-1/2 cursor-default whitespace-nowrap"
          >
            {dots && (
              <span className="absolute right-full mr-2 font-mono tracking-[0.3em] text-foam/25 transition-colors group-hover:text-mint/70">
                {dots}
              </span>
            )}
            <span className="mono-label text-foam/55 transition-colors group-hover:text-foam">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
