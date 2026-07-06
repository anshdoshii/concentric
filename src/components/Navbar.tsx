import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const LINKS = [
  { label: 'How it builds', href: '#steps' },
  { label: 'Learner AI', href: '#ai-demo' },
  { label: 'Assessment', href: '#assessment' },
  { label: 'Operations', href: '#ops' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="section flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <Logo size={26} />
          <span className="font-semibold text-[15px] tracking-tight text-ink">Simplicity AI</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-ink-dim">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#cta"
          className="text-sm font-medium px-4 py-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
        >
          Request Access
        </a>
      </nav>
    </header>
  );
}
