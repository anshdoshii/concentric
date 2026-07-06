import { useActiveSection } from '../hooks/useActiveSection';
import { useReveal } from '../hooks/useReveal';
import { StepBlock } from './StepBlock';
import {
  OnboardingVisual,
  RecommendationVisual,
  LearningJourneyVisual,
  AssessmentVisual,
  OpsVisual,
} from './StepVisuals';

const STEPS = [
  {
    tag: 'Step 1',
    title: 'Learner onboarding & AI profiling',
    body: 'A short structured intake — background, career goal, weekly availability — feeds straight into the recommendation engine. No generic course browsing; the platform starts working on day one.',
    Visual: OnboardingVisual,
  },
  {
    tag: 'Step 2',
    title: 'Personalized course recommendation',
    body: 'The AI weighs the learner profile against the full catalogue and returns one confident answer with a rationale, not a list to get lost in. A rule-based fallback keeps this working even if the model is briefly unreachable.',
    Visual: RecommendationVisual,
  },
  {
    tag: 'Step 3',
    title: 'Guided learning journey',
    body: 'Every module ships with an AI tutor scoped to that module’s content — answers are grounded, cached for repeat questions, and rate-limited so cost stays predictable at scale.',
    Visual: LearningJourneyVisual,
  },
  {
    tag: 'Step 4',
    title: 'Automated assessment & readiness scoring',
    body: 'Timed mocks, untimed practice, and spaced repetition on weak areas all roll up into one certification-readiness score — so trainers know exactly who is ready before an employer asks.',
    Visual: AssessmentVisual,
  },
  {
    tag: 'Step 5',
    title: 'Operations console',
    body: 'Coordinators see the entire pipeline — enrolment through placement — in one view, with batches, corporate partners, and open roles tracked alongside the learners moving through them.',
    Visual: OpsVisual,
  },
];

export function StepsShowcase() {
  const { active, setRef } = useActiveSection(STEPS.length);
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section id="steps" className="relative py-28">
      <div className="section">
        <div ref={headerRef} className="reveal max-w-[640px] mb-16">
          <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">
            The build, in order
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Five steps. One continuous learner path.
          </h2>
          <p className="mt-4 text-ink-dim text-[15px] leading-relaxed">
            This is the exact sequence a learner and a coordinator move through in the Phase 1
            build — nothing here is a mockup of a future idea, it's the scope already committed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
          {/* Sticky step rail */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-1">
              {STEPS.map((s, i) => (
                <div
                  key={s.tag}
                  className="relative pl-6 py-3.5 border-l-2 transition-colors duration-300"
                  style={{
                    borderColor: active === i ? 'var(--color-accent-2)' : 'var(--color-border)',
                  }}
                >
                  <div
                    className="text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300"
                    style={{ color: active === i ? 'var(--color-accent-2)' : 'var(--color-ink-faint)' }}
                  >
                    {s.tag}
                  </div>
                  <div
                    className="text-sm mt-1 transition-colors duration-300"
                    style={{ color: active === i ? 'var(--color-ink)' : 'var(--color-ink-faint)' }}
                  >
                    {s.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="space-y-28">
            {STEPS.map((s, i) => (
              <StepBlock key={s.tag} {...s} containerRef={setRef(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
