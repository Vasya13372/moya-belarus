export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg className={className} preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="orn" width="32" height="24" patternUnits="userSpaceOnUse">
          <path d="M16 2 28 12 16 22 4 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 8 20 12 16 16 12 12Z" fill="currentColor" />
          <path d="M0 12h3M29 12h3" stroke="currentColor" strokeWidth="1.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#orn)" />
    </svg>
  );
}
