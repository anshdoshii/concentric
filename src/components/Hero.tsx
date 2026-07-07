import { useParallax } from '../hooks/useScrollReveal';

export function Hero() {
  const blob1Ref = useParallax<HTMLDivElement>(0.18);
  const blob2Ref = useParallax<HTMLDivElement>(-0.12);

  return (
    <section id="top" className="relative pt-40 pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 noise-bg opacity-40" />
      <div ref={blob1Ref} className="absolute -top-40 -left-40">
        <div
          className="aurora-blob aurora-1 w-[520px] h-[520px]"
          style={{ background: 'radial-gradient(circle, #6e7bff, transparent 70%)' }}
        />
      </div>
      <div ref={blob2Ref} className="absolute top-20 right-[-160px]">
        <div
          className="aurora-blob aurora-2 w-[460px] h-[460px]"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)' }}
        />
      </div>

      <div className="section relative">
        <div className="max-w-[760px]">
          <div
            className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-dim"
            style={{ animationDelay: '0ms' }}
          >
            <span className="pulse-dot" />
            1,248 learners currently enrolled · 24 active batches
          </div>

          <h1
            className="hero-rise mt-6 text-[44px] sm:text-[58px] leading-[1.05] font-semibold tracking-tight"
            style={{ animationDelay: '80ms' }}
          >
            One profile in.{' '}
            <span className="text-gradient-animated">A certified learner out.</span>
          </h1>

          <p
            className="hero-rise mt-6 text-lg text-ink-dim leading-relaxed max-w-[560px]"
            style={{ animationDelay: '180ms' }}
          >
            A five-minute intake becomes a personalised course, a module-scoped AI tutor, and a
            certification-readiness score — with an operations console keeping every batch,
            trainer, and corporate partner in sync behind the scenes.
          </p>

          <div className="hero-rise mt-9 flex items-center gap-4" style={{ animationDelay: '280ms' }}>
            <a
              href="#steps"
              className="rounded-full px-6 py-3 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity"
            >
              See how it works
            </a>
            <a
              href="#steps"
              className="rounded-full px-6 py-3 text-sm font-medium border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
            >
              Meet the AI tutor
            </a>
          </div>
        </div>

        {/* Floating preview panels */}
        <div className="relative mt-20 h-[340px] hidden sm:block">
          <div className="float-panel absolute left-0 top-4 w-[320px] glass rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-ink-dim">Recommended track</span>
              <span className="pulse-dot" />
            </div>
            <div className="text-[15px] font-semibold mb-1">Full-Stack Cloud Engineering</div>
            <div className="text-xs text-ink-faint mb-4">Matched from your profile — 94% fit</div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#6e7bff] to-[#22d3ee]" />
            </div>
          </div>

          <div className="float-panel-alt absolute right-0 top-24 w-[300px] glass rounded-2xl p-5 shadow-2xl">
            <div className="text-xs font-medium text-ink-dim mb-3">Certification readiness</div>
            <div className="flex items-end gap-2 h-20">
              {[38, 52, 61, 74, 69, 83, 91].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[#6e7bff]/40 to-[#22d3ee]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-3 text-[13px] font-semibold text-good">91% ready to certify</div>
          </div>

          <div className="float-panel absolute left-1/3 bottom-0 w-[280px] glass rounded-2xl p-5 shadow-2xl" style={{ animationDelay: '-1.5s' }}>
            <div className="text-xs font-medium text-ink-dim mb-2">Active learners</div>
            <div className="text-2xl font-semibold">1,248</div>
            <div className="text-xs text-good mt-1">↑ 12% this batch cycle</div>
          </div>
        </div>
      </div>
    </section>
  );
}
