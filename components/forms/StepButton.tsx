function CaretRight() {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
      <path
        d="M1 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StepButton({
  children,
  showCaret = true,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { showCaret?: boolean }) {
  return (
    <button
      {...props}
      className={`btn-glow flex h-14 w-full items-center justify-center gap-3 rounded-full bg-foam text-base font-medium text-coal transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100 ${className}`}
    >
      {children}
      {showCaret && <CaretRight />}
    </button>
  );
}
