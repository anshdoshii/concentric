export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6e7bff" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" stroke="url(#logo-g)" strokeWidth="2.4" opacity="0.35" />
      <circle cx="24" cy="24" r="14" stroke="url(#logo-g)" strokeWidth="2.6" opacity="0.65" />
      <circle cx="24" cy="24" r="6.5" fill="url(#logo-g)" />
    </svg>
  );
}
