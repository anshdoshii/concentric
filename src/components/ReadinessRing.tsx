import { useEffect, useState } from 'react';

export function ReadinessRing({ percent, size = 110 }: { percent: number; size?: number }) {
  const [display, setDisplay] = useState(0);
  const radius = size / 2 - 9;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const from = display;
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1);
      setDisplay(Math.round(from + (percent - from) * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#ffffff14" strokeWidth="8" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#readiness-grad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - display / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
      />
      <defs>
        <linearGradient id="readiness-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6e7bff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <text
        x={size / 2}
        y={size / 2 + 7}
        textAnchor="middle"
        fontSize={size * 0.22}
        fontWeight="600"
        fill="#f3f5fb"
      >
        {display}%
      </text>
    </svg>
  );
}
