import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export function CTASection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="cta" className="relative py-28 overflow-hidden">
      <div
        className="aurora-blob aurora-1 w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #6e7bff, transparent 70%)' }}
      />
      <div
        className="aurora-blob aurora-2 w-[420px] h-[420px] bottom-0 right-10"
        style={{ background: 'radial-gradient(circle, #c084fc, transparent 70%)' }}
      />

      <div className="section relative text-center">
        <div ref={ref} className="reveal max-w-[640px] mx-auto">
          <h2 className="text-3xl sm:text-[44px] leading-tight font-semibold tracking-tight">
            Your next cohort is one profile{' '}
            <span className="text-gradient">away from starting.</span>
          </h2>
          <p className="mt-5 text-ink-dim text-[15px] leading-relaxed max-w-[520px] mx-auto">
            Enrol a learner and the platform takes it from there — profiling, recommendation,
            guided modules, assessment, and readiness scoring, with the operations console
            tracking every batch in real time.
          </p>
          <div className="mt-9 flex items-center justify-center gap-4">
            <Link
              to="/app"
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity"
            >
              Get started
            </Link>
            <a
              href="#top"
              className="rounded-full px-7 py-3.5 text-sm font-medium border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
