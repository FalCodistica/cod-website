"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function IndustryAccordion({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((item, i) => (
        <div key={item.title} className="border-b border-rule/40 last:border-b-0">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center gap-4 py-3 text-left"
            aria-expanded={open === i}
          >
            <span className="flex-1 text-base font-semibold text-foam">{item.title}</span>
            <span className="relative block size-[19px] shrink-0" aria-hidden="true">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foam" />
              <motion.span
                animate={{ scaleY: open === i ? 0 : 1 }}
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foam"
              />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-4 pr-9 text-base font-medium leading-relaxed text-mist">
                  {item.body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
