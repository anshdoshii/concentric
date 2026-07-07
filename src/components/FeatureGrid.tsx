import { useScrollReveal } from '../hooks/useScrollReveal';

const FEATURES = [
  {
    title: 'One readiness score, not a spreadsheet',
    body: 'Module completion and mock-assessment performance roll up into a single certification-readiness percentage — 80% is the line trainers use to sign off on a learner.',
  },
  {
    title: 'A tutor that stays on-topic',
    body: 'Each module’s AI tutor only answers from that module’s own content, with responses cached for repeat questions and a per-learner rate limit so cost never runs ahead of usage.',
  },
  {
    title: 'A recommendation with a fallback',
    body: 'If the model is slow or unreachable, a rule-based match on career goal and availability still returns a course — a learner is never blocked on an API call.',
  },
  {
    title: 'Five stages, one pipeline',
    body: 'Enrolled → Training → Assessment → Certified → Placed. Every learner sits in exactly one stage, and coordinators see the whole cohort move through it in real time.',
  },
  {
    title: 'Built for the phone in their pocket',
    body: 'Designed and tested against mid-range Android hardware first — because that, not a laptop, is how most learners in this program will actually show up.',
  },
  {
    title: 'Zero-error release gate',
    body: 'TypeScript strict mode compiles clean on every release, no exceptions — the discipline that keeps a platform this fast-moving from quietly rotting underneath.',
  },
];

export function FeatureGrid() {
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: 'fadeUp' });
  const gridRef = useScrollReveal<HTMLDivElement>({ animation: 'fadeUp', stagger: true, staggerAmount: 0.09 });

  return (
    <section id="hood" className="relative py-24 border-t border-white/5 scroll-mt-20">
      <div className="section">
        <div ref={headerRef} className="max-w-[560px] mb-14">
          <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">
            Under the hood
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            The details that hold up under load.
          </h2>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card-lift card-hairline rounded-2xl border border-white/8 bg-white/[0.02] p-6"
            >
              <h3 className="text-[15px] font-semibold mb-2.5">{f.title}</h3>
              <p className="text-[13.5px] text-ink-dim leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
