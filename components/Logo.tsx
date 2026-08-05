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
        src="/codi_logo.png"
        alt="Codistica"
        width={4794}
        height={1043}
        priority
        className="h-8 w-auto select-none sm:h-10"
      />
    </Link>
  );
}
