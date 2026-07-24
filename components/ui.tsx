import Link from "next/link";
import type { ReactNode } from "react";

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
      className={`btn-glow inline-flex h-10 items-center justify-center rounded-full bg-foam px-6 text-sm font-medium text-coal transition-transform hover:scale-[1.02] ${className}`}
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="2" width="8" height="10" rx="1" fill="#bec9c7" />
      <path d="M3 5v8a1 1 0 0 0 1 1h6" stroke="#bec9c7" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function LinkedInButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.linkedin.com/company/codistica/"
      target="_blank"
      rel="noreferrer"
      className={`glass-pill inline-flex size-10 items-center justify-center transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on LinkedIn</span>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="#dde4e3" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.16h4.56V23H.22V8.16zM8.34 8.16h4.37v2.02h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.2h-4.55v-7.27c0-1.73-.03-3.97-2.42-3.97-2.42 0-2.79 1.89-2.79 3.84V23H8.34V8.16z" />
      </svg>
    </a>
  );
}

export function InstagramButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.instagram.com/codistica/"
      target="_blank"
      rel="noreferrer"
      className={`glass-pill inline-flex size-10 items-center justify-center transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on Instagram</span>
      <svg width="18" height="18" viewBox="0 0 448 512" fill="#dde4e3" aria-hidden="true">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    </a>
  );
}

export function FacebookButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.facebook.com/share/1DASy3AKzS/?mibextid=wwXIfr"
      target="_blank"
      rel="noreferrer"
      className={`glass-pill inline-flex size-10 items-center justify-center transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on Facebook</span>
      <svg width="12" height="19" viewBox="0 0 320 512" fill="#dde4e3" aria-hidden="true">
        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </svg>
    </a>
  );
}

export function TikTokButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.tiktok.com/@codistica"
      target="_blank"
      rel="noreferrer"
      className={`glass-pill inline-flex size-10 items-center justify-center transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on TikTok</span>
      <svg width="16" height="18" viewBox="0 0 448 512" fill="#dde4e3" aria-hidden="true">
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
      </svg>
    </a>
  );
}

/* 3x3 dot grid used by the menu trigger */
export function DotGrid({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  const r = size / 10;
  const pos = [size * 0.1, size * 0.5, size * 0.9];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {pos.flatMap((cy) =>
        pos.map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={color} />),
      )}
    </svg>
  );
}

/* the "close" dot grid from Figma — corners + centre lit, edges dimmed */
export function CloseDots({ size = 20, color = "#2b3231" }: { size?: number; color?: string }) {
  const r = size / 10;
  const pos = [size * 0.1, size * 0.5, size * 0.9];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
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
export function DotChevron({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" aria-hidden="true">
      <circle cx="1" cy="1" r="1" fill={color} />
      <circle cx="5" cy="5" r="1" fill={color} />
      <circle cx="1" cy="9" r="1" fill={color} />
    </svg>
  );
}

/* full downward arrow (shaft + head), made of dots (scroll hint) */
export function ScrollArrow({ color = "#dde4e3" }: { color?: string }) {
  return (
    <svg width="14" height="24" viewBox="0 0 14 24" aria-hidden="true">
      <circle cx="7" cy="1" r="1.4" fill={color} />
      <circle cx="7" cy="7" r="1.4" fill={color} />
      <circle cx="7" cy="13" r="1.4" fill={color} />
      <circle cx="1" cy="17" r="1.4" fill={color} />
      <circle cx="7" cy="17" r="1.4" fill={color} />
      <circle cx="13" cy="17" r="1.4" fill={color} />
      <circle cx="7" cy="23" r="1.4" fill={color} />
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
      aria-hidden="true"
      className={`sphere inline-block align-middle shrink-0 ${className}`}
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
