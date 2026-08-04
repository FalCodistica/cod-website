import Link from "next/link";
import type { ReactNode } from "react";

/* Frosted-glass pill button, Inter 500 14px */
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
      className={`btn-glass inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-medium transition-transform hover:scale-[1.02] ${className}`}
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
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="text-mist"
    >
      <rect x="5" y="2" width="8" height="10" rx="1" fill="currentColor" />
      <path d="M3 5v8a1 1 0 0 0 1 1h6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function LinkedInButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.linkedin.com/company/codistica/"
      target="_blank"
      rel="noreferrer"
      className={`glass-pill inline-flex size-10 items-center justify-center text-foam transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on LinkedIn</span>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
      className={`glass-pill inline-flex size-10 items-center justify-center text-foam transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on Instagram</span>
      <svg width="18" height="18" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
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
      className={`glass-pill inline-flex size-10 items-center justify-center text-foam transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on Facebook</span>
      <svg width="12" height="19" viewBox="0 0 320 512" fill="currentColor" aria-hidden="true">
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
      className={`glass-pill inline-flex size-10 items-center justify-center text-foam transition-colors hover:bg-foam/15 ${className}`}
    >
      <span className="sr-only">Codistica on TikTok</span>
      <svg width="16" height="18" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
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
export function CloseDots({
  size = 20,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
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

/* hand swiping up (scroll hint) */
export function ScrollArrow({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 1000 1000"
      aria-hidden="true"
      className="animate-swipe-finger"
      fill={color}
    >
      <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
        <path d="M570.2,3646.5L100,3176.3l112.4-112.4c61.3-61.3,120.6-112.4,132.9-112.4c10.2,0,132.9,112.4,269.8,249.4l251.4,251.4V1698.3V-53.5h173.8h173.8v1747.8c0,960.8,6.1,1747.8,14.3,1747.8c8.2,0,128.8-112.4,265.7-249.4l251.4-251.4l122.7,122.7l122.7,122.7l-464,464c-255.5,257.6-470.2,466.1-476.3,466.1C1044.4,4116.6,827.7,3906.1,570.2,3646.5z" />
        <path d="M2996.6,2787.9c-184-20.4-339.3-40.9-343.4-47c-4.1-4.1-81.8-169.7-169.7-368l-161.5-359.8L3393.2,539.3C3981.9-272.3,4448-930.5,4427.6-924.4c-20.4,8.2-233,100.2-472.2,206.4c-239.2,106.3-443.6,194.2-451.8,194.2c-12.3,0-570.3-396.6-650-459.9c-12.3-10.2,79.7-797.2,94-809.5c8.2-6.2,300.5-139,648-292.3l633.7-282.1l286.2-263.7c157.4-145.1,325-298.5,372-337.3l85.8-73.6l821.8-128.8c451.8-71.5,827.9-139,834.1-149.2c6.1-10.2,104.2-143.1,214.6-298.5c167.6-228.9,212.6-278,253.5-278c67.5,0,273.9,141.1,253.5,173.8c-34.7,57.2-541.7,746.1-547.8,746.1c-16.4,0-1572,247.3-1629.2,257.6c-38.8,8.2-186,128.8-408.8,333.2L4413.3-2065l-576.5,255.5c-650.1,286.2-584.6,231-611.2,519.2l-12.3,143.1l163.5,116.5l161.5,116.5l795.2-353.7c437.5-194.2,881.1-390.4,985.3-437.5c104.3-47,181.9-73.6,175.8-59.3c-8.2,14.3-635.8,879-1394.1,1921.5L2722.7,2056.1l77.7,181.9c42.9,100.2,92,186,110.4,190.1c16.4,6.1,108.3,16.4,204.4,22.5l173.8,14.3l846.3-1167.2l846.3-1165.2l120.6,83.8c65.4,45,126.7,94,137,106.3c14.3,16.4-47,114.5-186,306.6l-204.4,282.1l79.7,175.8c89.9,196.2,83.8,194.2,333.2,216.7l155.4,12.3l200.3-276c108.3-151.3,208.5-276,218.7-276c26.6,0,261.7,169.7,263.7,190.1c0,8.2-59.3,98.1-132.9,196.2c-73.6,100.2-132.9,192.2-132.9,204.4c0,14.3,32.7,100.2,73.6,194.2l73.6,169.7l167.6,24.5c271.9,36.8,251.4,47,396.6-181.9l128.8-202.4l143.1,104.3l141.1,102.2l-45,65.4c-24.5,34.8-69.5,96.1-102.2,139l-57.2,73.6l77.7,179.9c90,202.4,83.8,198.3,333.2,220.8l151.3,14.3l623.5-854.5l621.4-854.5l259.6-936.2c143.1-513.1,265.7-948.5,271.9-966.9c8.2-18.4,128.8-194.2,271.9-390.5l257.6-355.7l53.2,34.7c28.6,18.4,89.9,63.4,134.9,96.1c45,34.8,85.9,65.4,90,67.5c4.1,4.1-104.3,157.4-239.2,343.4l-247.4,337.3l-263.7,958.7l-265.7,958.7L8205.2,1635c-374.1,515.1-690.9,950.6-703.2,964.9c-18.4,20.4-104.2,16.4-421.1-18.4c-218.7-24.5-398.6-45-400.7-47c0,0-36.8-81.8-79.7-179.9c-42.9-100.2-79.7-179.9-79.7-181.9c-2,0-175.8-30.7-386.3-65.4l-384.3-65.4l-73.6-163.5c-38.8-89.9-79.7-173.8-89.9-186s-94-28.6-188.1-36.8c-92-6.1-269.8-22.5-394.5-36.8l-228.9-22.5l-75.6-175.8c-42.9-96.1-77.7-177.9-81.8-181.9c-2.1-2-265.7,353.6-584.6,793.1c-549.9,756.4-582.6,797.2-641.9,795.2C3358.5,2824.7,3178.6,2808.3,2996.6,2787.9z" />
      </g>
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
