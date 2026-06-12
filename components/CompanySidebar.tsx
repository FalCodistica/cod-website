"use client";

import { useEffect, useState } from "react";

type Item =
  | { kind: "dot"; label: string }
  | { kind: "section"; id: string; label: string; lines: string[]; subs?: string[] };

const items: Item[] = [
  { kind: "dot", label: "Partnership & collaboration" },
  {
    kind: "section",
    id: "strategic-development",
    label: "01. Strategic development",
    lines: [
      "Some collaborations begin with a shared idea. Others begin with a complex challenge.",
      "At Codistica, strategic development focuses on [...]",
    ],
  },
  {
    kind: "section",
    id: "team-talent",
    label: "02. Team & talent",
    lines: ["The strength of Codistica comes from the people behind the systems we build"],
    subs: ["how we work", "what drives the team"],
  },
  {
    kind: "section",
    id: "investment-partnerships",
    label: "03. Investment partnerships",
    lines: ["Building intelligent infrastructure requires patience"],
    subs: ["Investment Philosophy", "Shared Strategic Horizon"],
  },
  { kind: "dot", label: "How we think" },
  {
    kind: "section",
    id: "founders-belief",
    label: "01. Founder’s belief",
    lines: ["Every meaningful system begins with the way we choose to think about the world."],
  },
  {
    kind: "section",
    id: "principle",
    label: "02. A principle that guides us",
    lines: ["Find what you are passionate about and passionate even more."],
  },
  {
    kind: "section",
    id: "powering-the-invisible",
    label: "01. Powering the invisible",
    lines: ["Many of the systems that sustain modern life are never seen."],
  },
];

export default function CompanySidebar() {
  const [active, setActive] = useState("strategic-development");

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
  }, []);

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
