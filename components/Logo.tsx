import Image from "next/image";
import Link from "next/link";

/* Codistica logo — icon + wordmark + "powering the invisible" tagline. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Codistica — home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/codistica-logo.png"
        alt="Codistica — powering the invisible"
        width={1334}
        height={265}
        priority
        className="h-10 w-auto select-none"
      />
    </Link>
  );
}
