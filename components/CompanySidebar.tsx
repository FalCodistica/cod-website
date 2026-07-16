"use client";

import { useEffect, useState } from "react";

type Item =
  | { kind: "dot"; label: string }
  | { kind: "section"; id: string; label: string; lines: string[]; subs?: string[] };

export const partnershipSidebarItems: Item[] = [
  { kind: "dot", label: "Partnership & collaboration" },
  {
    kind: "section",
    id: "build-with-us",
    label: "01. Build with us",
    lines: ["There are different ways to collaborate with Codistica."],
  },
  {
    kind: "section",
    id: "strategic-development",
    label: "02. Strategic development",
    lines: [
      "Some collaborations begin with a shared idea. Others begin with a complex challenge.",
      "At Codistica, strategic development focuses on [...]",
    ],
  },
  {
    kind: "section",
    id: "team-talent",
    label: "03. Team & talent",
    lines: ["The strength of Codistica comes from the people behind the systems we build"],
    subs: ["how we work", "what drives the team"],
  },
  {
    kind: "section",
    id: "investment-partnerships",
    label: "04. Investment partnerships",
    lines: ["Building intelligent infrastructure requires patience"],
    subs: ["investment philosophy", "shared strategic horizon"],
  },
];

export const howWeThinkSidebarItems: Item[] = [
  { kind: "dot", label: "How we think" },
  {
    kind: "section",
    id: "why",
    label: "01. Why",
    lines: ["It always begins with a question, a quiet spark of curiosity that refuses to fade."],
  },
  {
    kind: "section",
    id: "how",
    label: "02. How",
    lines: ["We write the hidden stories within the world around us."],
  },
  {
    kind: "section",
    id: "what",
    label: "03. What",
    lines: ["Complete, in-house IoT solutions that defy physical and virtual world boundaries."],
  },
  {
    kind: "section",
    id: "founders-belief",
    label: "04. Founder’s belief",
    lines: ["Every meaningful system begins with the way we choose to think about the world."],
    subs: ["a principle that guides us"],
  },
  {
    kind: "section",
    id: "powering-the-invisible",
    label: "05. Powering the invisible",
    lines: ["Many of the systems that sustain modern life are never seen."],
  },
];

export default function CompanySidebar({
  items,
  defaultActive,
}: {
  items: Item[];
  defaultActive: string;
}) {
  const [active, setActive] = useState(defaultActive);

  useEffect(() => {
    const ids = items.filter((i) => i.kind === "section").map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-10 hidden w-[298px] shrink-0 self-start xl:block">
      <nav className="flex flex-col gap-8">
        {items.map((item, idx) =>
          item.kind === "dot" ? (
            <span key={idx} className="flex items-center gap-2 text-foam">
              <span className="size-2 rounded-full bg-foam" />
              <span className="mono-label">{item.label}</span>
            </span>
          ) : (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col gap-4 transition-colors ${
                active === item.id ? "text-foam" : "text-ash hover:text-mist"
              }`}
            >
              <span className="mono-label">{item.label}</span>
              {item.lines.map((l) => (
                <span key={l} className="mono-body normal-case">
                  {l.toUpperCase()}
                </span>
              ))}
              {item.subs?.map((s) => (
                <span key={s} className="mono-body">
                  └── {s}
                </span>
              ))}
            </a>
          ),
        )}
      </nav>
    </aside>
  );
}
