import Link from "next/link";
import { ReactNode } from "react";

/* Filled pill button — fill #dde4e3, text #2b3231, Inter 500 14px */
export function FilledButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-10 items-center justify-center rounded-full bg-foam px-6 text-sm font-medium text-coal transition-transform hover:scale-[1.03] ${className}`}
    >
      {children}
    </Link>
  );
}

/* Frosted pill chip, e.g. the email chip */
export function GlassChip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`glass-pill inline-flex h-10 items-center gap-2.5 px-4 text-sm font-medium text-foam ${className}`}
    >
      {children}
    </span>
  );
}

export function CopyEmailChip({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="group">
      <GlassChip className="transition-colors group-hover:bg-foam/15">
        {email}
        <CopyIcon />
      </GlassChip>
    </a>
  );
}

export function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="5" y="2" width="8" height="10" rx="1" fill="#bec9c7" />
      <path
        d="M3 5v8a1 1 0 0 0 1 1h6"
        stroke="#bec9c7"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function LinkedInButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.linkedin.com/company/codistica"
      target="_blank"
      rel="noreferrer"
      aria-label="Codistica on LinkedIn"
      className={`glass-pill inline-flex size-10 items-center justify-center transition-colors hover:bg-foam/15 ${className}`}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="#dde4e3" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.16h4.56V23H.22V8.16zM8.34 8.16h4.37v2.02h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.2h-4.55v-7.27c0-1.73-.03-3.97-2.42-3.97-2.42 0-2.79 1.89-2.79 3.84V23H8.34V8.16z" />
      </svg>
    </a>
  );
}

/* 3x3 dot grid used by the menu trigger */
export function DotGrid({ size = 20, color = "#dde4e3" }: { size?: number; color?: string }) {
  const r = size / 10;
  const pos = [size * 0.1, size * 0.5, size * 0.9];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {pos.flatMap((cy) => pos.map((cx) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={color} />
      )))}
    </svg>
  );
}

/* the "close" dot grid from Figma — corners + centre lit, edges dimmed */
export function CloseDots({ size = 20, color = "#2b3231" }: { size?: number; color?: string }) {
  const r = size / 10;
  const pos = [size * 0.1, size * 0.5, size * 0.9];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {pos.flatMap((cy, yi) =>
        pos.map((cx, xi) => {
          const lit = (xi + yi) % 2 === 0; // corners + centre
          return (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              fill={color}
              opacity={lit ? 1 : 0.1}
            />
          );
        }),
      )}
    </svg>
  );
}

/* sideways chevron made of 3 dots (menu rows) */
export function DotChevron({ color = "#dde4e3" }: { color?: string }) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" aria-hidden>
      <circle cx="1" cy="1" r="1" fill={color} />
      <circle cx="5" cy="5" r="1" fill={color} />
      <circle cx="1" cy="9" r="1" fill={color} />
    </svg>
  );
}

/* gradient ball */
export function Sphere({
  from,
  to,
  size = 56,
  className = "",
}: {
  from: string;
  to: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`sphere inline-block shrink-0 ${className}`}
      style={
        {
          width: size,
          height: size,
          fontSize: size,
          "--sphere-from": from,
          "--sphere-to": to,
        } as React.CSSProperties
      }
    />
  );
}

/* mono eyebrow with leading dot (company sidebar / sections) */
export function EyebrowDot({ children, dim = false }: { children: ReactNode; dim?: boolean }) {
  return (
    <span className={`flex items-center gap-2 ${dim ? "text-mist" : "text-foam"}`}>
      <span className={`size-2 rounded-full ${dim ? "bg-mist" : "bg-foam"}`} />
      <span className="mono-label">{children}</span>
    </span>
  );
}

/* pill eyebrow used on industry pages */
export function EyebrowPill({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="mono-body inline-flex items-center rounded-[20px] bg-panel px-5 py-1.5 text-foam backdrop-blur-xl">
        {children}
      </span>
      <span className="h-10 w-px bg-rule" aria-hidden />
    </div>
  );
}
