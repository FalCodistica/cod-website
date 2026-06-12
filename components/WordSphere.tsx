"use client";

const WORDS = [
  "Vertical Mobility", "Passenger Lifts", "Cargo Lifts", "High-Speed Lifts",
  "Escalators", "Travelators", "Controllers", "Smart Components",
  "Data Analytics", "Lifecycle Management", "Software", "Automation",
  "Monitoring", "IoT", "Waste Treatment", "Waste-to-Hydrocarbon",
  "Process Automation", "Plant Integration", "Telecommunications", "Networks",
  "Connectivity", "Integration", "Infrastructure", "Digital Twin",
  "Machine Learning", "Systems Integration", "Digital Networks", "Fashion",
  "Access Control", "Security Systems", "Lighting Control", "Energy Management",
  "Climate Systems", "Systems Thinking", "Food & Beverage", "Customer Experience",
  "Quality Monitoring", "Packaging Systems", "Energy Recovery", "Fire Protection",
  "Commissioning", "End to End", "Dashboard", "Resource Optimization",
  "Plant Modeling", "Traceability", "Processing Lines", "Inventory Systems",
  "Product Lifecycle", "Supply Chain", "Household Appliances", "Remote Access",
  "Building Automation", "Concept to Implementation",
];

/* Radial word cloud — keywords as spokes around a slowly spinning wheel,
   with a static gradient band + centre label, as in the Figma "What we do". */
export default function WordSphere() {
  const n = WORDS.length;
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[632px] items-center justify-center">
      {/* static horizontal band */}
      <div
        className="absolute inset-x-[-60px] top-1/2 h-[50%] -translate-y-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, #0e1514 0%, #1a2120 40%, #1a2120 60%, #0e1514 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ animation: "spin-slow 120s linear infinite" }}
      >
        {WORDS.map((w, i) => {
          const angle = (360 / n) * i;
          return (
            <span
              key={w}
              className="mono-label absolute left-1/2 top-1/2 origin-left whitespace-nowrap text-foam/80"
              style={{
                transform: `rotate(${angle}deg) translateX(9em)`,
              }}
            >
              <span className="mr-2 tracking-[0.4em] text-foam/40">
                {"•".repeat(((i * 7) % 3) + 1)}
              </span>
              {w}
            </span>
          );
        })}
      </div>
      <span className="mono-body relative z-10 w-[104px] text-center text-foam">
        System Integrations
      </span>
    </div>
  );
}
