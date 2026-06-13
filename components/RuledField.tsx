import type { CSSProperties } from "react";

/*
 * Ruled line field with a brighter circular "lens" in the centre.
 * Figma: a stadium-rounded block of #3f4948 lines (r=999) with a 217px
 * circle of brighter #889392 lines (r=999) centred on top. Both line
 * fields share the same 9px grid origin so their lines stay aligned.
 */
export default function RuledField({
  className = "",
  fade = false,
}: {
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={`relative h-[217px] w-full ${fade ? "fade-bottom" : ""} ${className}`}
      aria-hidden
    >
      {/* dim line field — rounded as a stadium */}
      <div className="ruled h-full w-full rounded-full" />
      {/* brighter circle of lines, centred */}
      <div
        className="ruled absolute left-1/2 top-0 size-[217px] -translate-x-1/2 rounded-full"
        style={{ "--rule-color": "#889392" } as CSSProperties}
      />
    </div>
  );
}
