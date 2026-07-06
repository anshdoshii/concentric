import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="section flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo size={20} />
          <span className="text-sm font-medium text-ink-dim">Simplicity AI</span>
        </div>
        <p className="text-xs text-ink-faint text-center sm:text-right">
          © 2026 Simplicity AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
