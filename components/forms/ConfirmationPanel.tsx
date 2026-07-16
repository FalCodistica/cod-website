import { motion } from "motion/react";
import Link from "next/link";
import { FilledButton } from "@/components/ui";

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" stroke="#80d5d2" strokeWidth="1.5" />
      <path
        d="M7.5 12.5l3 3 6-6"
        stroke="#80d5d2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ConfirmationPanel({
  eyebrow = "Submitted",
  title,
  paragraphs,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="flex w-full max-w-[640px] flex-col items-center gap-10 py-10 text-center"
    >
      <div className="flex flex-col items-center gap-3">
        <CheckIcon />
        <span className="mono-body text-mist">{eyebrow}</span>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="heading text-foam">{title}</h1>
        <div className="flex flex-col gap-4">
          {paragraphs.map((p) => (
            <p key={p} className="text-base font-medium leading-relaxed text-mist">
              {p}
            </p>
          ))}
        </div>
      </div>
      <FilledButton href="/">Back to home</FilledButton>
      <Link href="/company" className="mono-label text-ash transition-colors hover:text-mist">
        Back to partnership &amp; collaboration
      </Link>
    </motion.div>
  );
}
