import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const STAGES = [
  { label: 'Profile', path: '/app' },
  { label: 'Recommendation', path: '/app/recommendation' },
  { label: 'Learn', path: '/app/learn' },
  { label: 'Assessment', path: '/app/assessment' },
  { label: 'Dashboard', path: '/app/dashboard' },
];

export function AppHeader() {
  const { pathname } = useLocation();
  const activeIndex = STAGES.findIndex((s) => s.path === pathname);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="section flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <Logo size={24} />
          <span className="font-semibold text-[14px] tracking-tight text-ink">Simplicity AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-xs">
          {STAGES.map((s, i) => (
            <div key={s.path} className="flex items-center gap-1">
              <span
                className={`px-2.5 py-1 rounded-full ${
                  i === activeIndex
                    ? 'text-ink font-medium bg-white/10'
                    : i < activeIndex
                      ? 'text-accent-2'
                      : 'text-ink-faint'
                }`}
              >
                {s.label}
              </span>
              {i < STAGES.length - 1 && <span className="text-ink-faint/40">→</span>}
            </div>
          ))}
        </div>

        <Link to="/" className="text-xs font-medium text-ink-faint hover:text-ink-dim transition-colors">
          Exit to site
        </Link>
      </div>
    </header>
  );
}
