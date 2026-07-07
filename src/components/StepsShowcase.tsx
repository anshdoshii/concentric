import { usePinnedProgress } from '../hooks/usePinnedProgress';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollReveal } from '../hooks/useScrollReveal';
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
    anchorId: 'ai-demo',
  },
  {
    tag: 'Step 4',
    title: 'Automated assessment & readiness scoring',
    body: 'Timed mocks, untimed practice, and spaced repetition on weak areas all roll up into one certification-readiness score — so trainers know exactly who is ready before an employer asks.',
    Visual: AssessmentVisual,
    anchorId: 'assessment',
  },
  {
    tag: 'Step 5',
    title: 'Operations console',
    body: 'Coordinators see the entire pipeline — enrolment through placement — in one view, with batches, corporate partners, and open roles tracked alongside the learners moving through them.',
    Visual: OpsVisual,
    anchorId: 'ops',
  },
];

function StepRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="space-y-1">
      {STEPS.map((s, i) => (
        <div
          key={s.tag}
          className="relative pl-6 py-3.5 border-l-2 transition-colors duration-300"
          style={{ borderColor: activeIndex === i ? 'var(--color-accent-2)' : 'var(--color-border)' }}
        >
          <div
            className="text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300"
            style={{ color: activeIndex === i ? 'var(--color-accent-2)' : 'var(--color-ink-faint)' }}
          >
            {s.tag}
          </div>
          <div
            className="text-sm mt-1 transition-colors duration-300"
            style={{ color: activeIndex === i ? 'var(--color-ink)' : 'var(--color-ink-faint)' }}
          >
            {s.title}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Desktop: the section pins full-screen while scrolling drives which step's scene is on stage. */
function PinnedScene({ activeIndex }: { activeIndex: number }) {
  const step = STEPS[activeIndex];
  return (
    <div className="h-screen flex items-center overflow-hidden">
      <div className="section w-full">
        <div className="grid grid-cols-[240px_1fr] gap-16 items-center">
          <StepRail activeIndex={activeIndex} />
          <div key={activeIndex} className="scene-enter grid grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">
                {step.tag}
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-ink-dim text-[15px] leading-relaxed">{step.body}</p>
            </div>
            <div className="flex justify-start">
              <step.Visual />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile / reduced-motion: normal stacked flow with per-block scroll reveals. */
function StackedFallback() {
  const { active, setRef } = useActiveSection(STEPS.length);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <StepRail activeIndex={active} />
        </div>
      </div>
      <div className="space-y-28">
        {STEPS.map((s, i) => (
          <StepBlock key={s.tag} {...s} containerRef={setRef(i)} />
        ))}
      </div>
    </div>
  );
}

export function StepsShowcase() {
  const { sectionRef, activeIndex, pinned } = usePinnedProgress(STEPS.length);
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: 'fadeUp' });

  return (
    <section id="steps" className="relative">
      <div className={pinned ? 'section pt-28' : 'section py-28'}>
        <div ref={headerRef} className="max-w-[640px] mb-16">
          <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">
            How it works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Five steps. One continuous learner path.
          </h2>
          <p className="mt-4 text-ink-dim text-[15px] leading-relaxed">
            This is the exact sequence every learner and coordinator moves through on Simplicity
            AI — from a first-day profile to a placement-ready certification.
          </p>
        </div>
      </div>

      <div ref={sectionRef} style={pinned ? { height: `${STEPS.length * 100}vh` } : undefined}>
        {pinned ? <PinnedScene activeIndex={activeIndex} /> : <div className="section"><StackedFallback /></div>}
      </div>
    </section>
  );
}
