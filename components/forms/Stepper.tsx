"use client";

import { motion } from "motion/react";

export default function Stepper({ steps, current }: { steps: string[]; current: number }) {
  const progress = ((current + 1) / steps.length) * 100;
  return (
    <div className="flex w-full max-w-[640px] flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) =>
          i === current ? (
            <span key={s} className="mono-body whitespace-nowrap text-foam">
              {s}
            </span>
          ) : (
            <span key={s} className="h-[18px] w-px bg-ash" aria-hidden />
          ),
        )}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-rule">
        <motion.div
          className="h-full rounded-full bg-mint"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>
    </div>
  );
}
