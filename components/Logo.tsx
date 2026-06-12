import Link from "next/link";

/* CODISTICA wordmark. Placeholder lettering matched to the Figma proportions
   (166x20, #dde4e3) until the vector export is available. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Codistica — home"
      className={`select-none font-sans text-[19px] font-bold uppercase leading-none tracking-[0.18em] text-foam ${className}`}
    >
      Codistica
    </Link>
  );
}
