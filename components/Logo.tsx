import Image from "next/image";
import Link from "next/link";

/* Codistica logo — icon + wordmark + "powering the invisible" tagline. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Codistica - home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/codistica-logo.png"
        alt="Codistica"
        width={1335}
        height={264}
        priority
        className="h-8 w-auto select-none sm:h-10"
      />
    </Link>
  );
}
