import { useReveal } from '../hooks/useReveal';

const FEATURES = [
  {
    title: 'Built on a real stack',
    body: 'Next.js, TypeScript in strict mode, and PostgreSQL — not a demo held together with mocks. What you click here is architecturally the same as what ships.',
  },
  {
    title: 'AI with a fallback',
    body: 'Every AI-dependent flow has a deterministic path underneath it. If the model is slow or unreachable, the learner still gets an answer.',
  },
  {
    title: 'Cost-aware by design',
    body: 'Module explanations are cached, tutor chat is rate-limited, and batch operations are throttled — so usage scales without the AI bill scaling faster than revenue.',
  },
  {
    title: 'Mobile-first learners',
    body: 'Built and tested against mid-range Android devices first, not as an afterthought — because that is the primary device for this audience.',
  },
  {
    title: 'One pipeline, two audiences',
    body: 'The same learner record flows from enrolment through certification into the placement pipeline, so coordinators never re-enter data trainers already captured.',
  },
  {
    title: 'Typecheck-gated releases',
    body: 'Strict TypeScript compilation is a release gate, not a suggestion — the kind of discipline that keeps a fast-moving MVP from rotting into technical debt.',
  },
];

export function FeatureGrid() {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 border-t border-white/5">
      <div className="section">
        <div ref={headerRef} className="reveal max-w-[560px] mb-14">
          <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">
            Why it holds up
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Engineering decisions, not just screens.
          </h2>
        </div>

        <div ref={gridRef} className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
