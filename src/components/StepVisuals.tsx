import { useEffect, useRef, useState } from 'react';

function useTypewriter(text: string, start: boolean, speed = 22) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!start) return;
    setOut('');
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return out;
}

function useOnScreen(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Step 1: Onboarding & AI Profiling ───────────────────────────── */
export function OnboardingVisual() {
  const { ref, visible } = useOnScreen();
  const fields = [
    { label: 'Background', value: 'B.Tech, ECE — 2024' },
    { label: 'Career goal', value: 'Cloud / DevOps Engineer' },
    { label: 'Weekly availability', value: '10–12 hrs' },
  ];

  return (
    <div ref={ref} className="glass rounded-2xl p-6 w-full max-w-[420px]">
      <div className="flex items-center gap-2 mb-5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6e7bff] to-[#22d3ee] transition-all duration-700"
              style={{ width: visible ? '100%' : '0%', transitionDelay: `${i * 200}ms` }}
            />
          </div>
        ))}
      </div>
      <div className="space-y-3.5">
        {fields.map((f, i) => (
          <div
            key={f.label}
            className="flex items-center justify-between text-sm border-b border-white/5 pb-3 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: `${300 + i * 150}ms`,
            }}
          >
            <span className="text-ink-faint">{f.label}</span>
            <span className="font-medium text-ink">{f.value}</span>
          </div>
        ))}
      </div>
      <div
        className="mt-5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-ink-dim transition-all duration-500"
        style={{ opacity: visible ? 1 : 0, transitionDelay: '850ms' }}
      >
        Profile captured — generating your recommendation…
      </div>
    </div>
  );
}

/* ── Step 2: Recommendation ─────────────────────────────────────── */
export function RecommendationVisual() {
  const { ref, visible } = useOnScreen();
  const reasons = [
    'Strong fit for infrastructure-heavy roles',
    'Matches your 10–12 hr/week availability',
    'Highest placement rate in your target city',
  ];

  return (
    <div ref={ref} className="glass rounded-2xl p-6 w-full max-w-[420px] card-hairline">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-ink-dim">Recommended for you</span>
        <span className="text-xs font-semibold text-good">94% match</span>
      </div>
      <div className="text-xl font-semibold mb-1">Full-Stack Cloud Engineering</div>
      <div className="text-sm text-ink-faint mb-5">14-week track · Certification included</div>

      <div className="space-y-2.5">
        {reasons.map((r, i) => (
          <div
            key={r}
            className="flex items-start gap-2.5 text-[13px] text-ink-dim transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-10px)',
              transitionDelay: `${i * 160}ms`,
            }}
          >
            <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-2 shrink-0" />
            {r}
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-ink-dim">
          AWS
        </span>
        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-ink-dim">
          Kubernetes
        </span>
        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-ink-dim">
          CI/CD
        </span>
      </div>
    </div>
  );
}

/* ── Step 3: Guided Learning Journey (AI tutor) ─────────────────── */
export function LearningJourneyVisual() {
  const { ref, visible } = useOnScreen();
  const question = 'Why does this module use IAM roles instead of static keys?';
  const answer = useTypewriter(
    'Because roles are temporary and scoped — no long-lived secrets to leak, and permissions rotate automatically.',
    visible,
    18,
  );

  return (
    <div ref={ref} className="glass rounded-2xl overflow-hidden w-full max-w-[440px] flex">
      <div className="w-[110px] shrink-0 border-r border-white/8 py-4 px-2.5 space-y-1.5 hidden sm:block">
        {['Intro', 'Networking', 'IAM & Roles', 'Deploy'].map((m, i) => (
          <div
            key={m}
            className={`rounded-lg px-2.5 py-2 text-[11px] leading-tight ${
              i === 2 ? 'bg-white/10 text-ink font-medium' : 'text-ink-faint'
            }`}
          >
            {m}
          </div>
        ))}
      </div>
      <div className="flex-1 p-5">
        <div className="text-xs text-ink-faint mb-3">Module 3 · IAM & Roles</div>
        <div className="rounded-xl bg-white/5 px-4 py-3 text-[13px] mb-3 self-end ml-6 text-ink">
          {question}
        </div>
        <div className="rounded-xl bg-gradient-to-br from-[#6e7bff]/15 to-[#22d3ee]/10 border border-white/10 px-4 py-3 text-[13px] text-ink-dim min-h-[68px]">
          {answer}
          {visible && answer.length < 108 && <span className="typing-caret" />}
        </div>
      </div>
    </div>
  );
}

/* ── Step 4: Assessment & Certification Readiness ──────────────── */
export function AssessmentVisual() {
  const { ref, visible } = useOnScreen();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const target = 91;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1200, 1);
      setScore(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const circumference = 2 * Math.PI * 42;

  return (
    <div ref={ref} className="glass rounded-2xl p-6 w-full max-w-[420px]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-medium text-ink-dim">Mock exam — Section 3/4</span>
        <span className="text-xs font-mono text-ink-faint">18:42</span>
      </div>

      <div className="flex items-center gap-6">
        <svg width="100" height="100" className="shrink-0">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#ffffff14" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#score-grad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <defs>
            <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6e7bff" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <text x="50" y="56" textAnchor="middle" fontSize="22" fontWeight="600" fill="#f3f5fb">
            {score}%
          </text>
        </svg>
        <div>
          <div className="text-sm font-semibold text-good mb-1">Certification-ready</div>
          <div className="text-[13px] text-ink-faint leading-relaxed">
            Above the 80% threshold across 4 mock attempts. Weak area: networking ACLs.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 5: Operations Console ─────────────────────────────────── */
export function OpsVisual() {
  const { ref, visible } = useOnScreen();
  const stages = [
    { label: 'Enrolled', value: 1248, color: '#6e7bff' },
    { label: 'Training', value: 864, color: '#8f9bff' },
    { label: 'Assessment', value: 512, color: '#22d3ee' },
    { label: 'Certified', value: 340, color: '#34d399' },
    { label: 'Placed', value: 198, color: '#c084fc' },
  ];
  const max = stages[0].value;

  return (
    <div ref={ref} className="glass rounded-2xl p-6 w-full max-w-[460px]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-medium text-ink-dim">Placement pipeline — this cycle</span>
        <span className="pulse-dot" />
      </div>
      <div className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="text-[11px] text-ink-faint w-20 shrink-0">{s.label}</span>
            <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: visible ? `${(s.value / max) * 100}%` : '0%',
                  background: s.color,
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
            <span className="text-[12px] font-medium w-10 text-right">{s.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/8 pt-4">
        <div>
          <div className="text-[11px] text-ink-faint">Active batches</div>
          <div className="text-base font-semibold mt-0.5">24</div>
        </div>
        <div>
          <div className="text-[11px] text-ink-faint">Open roles</div>
          <div className="text-base font-semibold mt-0.5">57</div>
        </div>
        <div>
          <div className="text-[11px] text-ink-faint">This month</div>
          <div className="text-base font-semibold mt-0.5 text-good">+42 placed</div>
        </div>
      </div>
    </div>
  );
}
