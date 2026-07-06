import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useSession } from '../context/SessionContext';
import type { CareerGoal } from '../data/courses';

const GOALS: { value: CareerGoal; label: string; blurb: string }[] = [
  { value: 'cloud-devops', label: 'Cloud / DevOps Engineer', blurb: 'Infrastructure, deployment, and operations' },
  { value: 'frontend', label: 'Frontend Engineer', blurb: 'Interfaces, product engineering, React' },
  { value: 'data-analytics', label: 'Data Analyst', blurb: 'SQL, dashboards, and data-driven decisions' },
];

const AVAILABILITY = ['5–8 hrs/week', '10–12 hrs/week', '15+ hrs/week'];

export function Onboarding() {
  const navigate = useNavigate();
  const { setProfile } = useSession();
  const [step, setStep] = useState(0);
  const [background, setBackground] = useState('');
  const [goal, setGoal] = useState<CareerGoal | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);

  const canProceed = [background.trim().length > 2, goal !== null, availability !== null][step];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    if (!goal || !availability) return;
    setProfile({ background, goal, availability });
    navigate('/app/recommendation');
  };

  return (
    <>
      <AppHeader />
      <main className="section max-w-[640px] py-20">
        <div className="flex items-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6e7bff] to-[#22d3ee] transition-all duration-500"
                style={{ width: i <= step ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">Tell us where you're starting from</h1>
            <p className="text-ink-dim text-[14px] mb-6">
              A short background — degree, current role, or what you've studied so far.
            </p>
            <textarea
              autoFocus
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="e.g. B.Tech in Electronics, 2024 graduate, no professional experience yet"
              rows={4}
              className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-accent-2/60 outline-none px-4 py-3 text-[14px] text-ink placeholder:text-ink-faint resize-none transition-colors"
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">What role are you aiming for?</h1>
            <p className="text-ink-dim text-[14px] mb-6">This drives your personalised course recommendation.</p>
            <div className="space-y-3">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all card-lift ${
                    goal === g.value
                      ? 'border-accent-2/60 bg-white/[0.06]'
                      : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <div className="text-[14px] font-medium">{g.label}</div>
                  <div className="text-[12.5px] text-ink-faint mt-0.5">{g.blurb}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">How much time can you commit?</h1>
            <p className="text-ink-dim text-[14px] mb-6">Weekly availability — we'll pace the course around this.</p>
            <div className="flex gap-3 flex-wrap">
              {AVAILABILITY.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvailability(a)}
                  className={`rounded-full border px-5 py-2.5 text-[13.5px] transition-all ${
                    availability === a
                      ? 'border-accent-2/60 bg-white/[0.06] text-ink'
                      : 'border-white/10 bg-white/[0.02] text-ink-dim'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="rounded-full px-5 py-2.5 text-sm font-medium border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step < 2 ? 'Continue' : 'Get my recommendation'}
          </button>
        </div>
      </main>
    </>
  );
}
