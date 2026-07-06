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
            This is the Phase 1 we're proposing —{' '}
            <span className="text-gradient">not a pitch deck.</span>
          </h2>
          <p className="mt-5 text-ink-dim text-[15px] leading-relaxed max-w-[520px] mx-auto">
            Everything above runs on the actual stack, with the actual data model, behind the
            actual AI integration described in the proposal. Let's talk about turning this into
            the production build.
          </p>
          <div className="mt-9 flex items-center justify-center gap-4">
            <a
              href="#top"
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity"
            >
              Schedule a walkthrough
            </a>
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
