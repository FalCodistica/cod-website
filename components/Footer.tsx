import Link from "next/link";
import { industries } from "@/lib/industries";
import RuledField from "./RuledField";
import {
  CopyEmailChip,
  FacebookButton,
  FilledButton,
  InstagramButton,
  LinkedInButton,
  TikTokButton,
} from "./ui";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-10 p-5 sm:p-10">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
        {/* left: claim + actions + legal */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-10">
            <p className="display text-snow">Powering the invisible</p>
            <div className="flex flex-wrap items-center gap-1">
              <FilledButton href="mailto:info@codistica.com">Talk to us</FilledButton>
              <CopyEmailChip email="info@codistica.com" />
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-2.5 text-xs font-medium text-mist">
            <Link href="/privacy" className="py-2.5 transition-colors hover:text-foam">
              Privacy
            </Link>
            <Link href="/terms" className="py-2.5 transition-colors hover:text-foam">
              Terms of use
            </Link>
            <span className="py-2.5">2026 © CODISTICA All Rights Reserved</span>
          </div>
        </div>
        {/* right: link columns */}
        <div className="flex flex-col gap-10 pt-3 sm:flex-row sm:gap-0 lg:w-[720px]">
          <nav className="flex-1">
            <div className="mono-label pb-3 text-mist">industries</div>
            <ul>
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="flex h-10 items-center text-sm font-medium text-foam transition-colors hover:text-mint"
                  >
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-1 flex-col justify-between gap-10">
            <nav>
              <div className="mono-label pb-3 text-mist">Company</div>
              <ul>
                <li>
                  <Link
                    href="/company"
                    className="flex h-10 items-center text-sm font-medium text-foam transition-colors hover:text-mint"
                  >
                    Partnership &amp; collaboration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex h-10 items-center text-sm font-medium text-foam transition-colors hover:text-mint"
                  >
                    About us
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex gap-1">
              <LinkedInButton />
              <InstagramButton />
              <FacebookButton />
              <TikTokButton />
            </div>
          </div>
        </div>
      </div>
      {/* ruled lines with a centred circle, fading out */}
      <RuledField fade />
    </footer>
  );
}
