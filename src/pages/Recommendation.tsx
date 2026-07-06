import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useSession } from '../context/SessionContext';
import { getCourseByGoal } from '../data/courses';

const THINKING_STEPS = [
  'Reading your profile…',
  'Matching against the course catalogue…',
  'Weighing availability and track demand…',
];

export function Recommendation() {
  const navigate = useNavigate();
  const { profile, selectCourse } = useSession();
  const [thinkingStep, setThinkingStep] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!profile) return;
    const interval = setInterval(() => {
      setThinkingStep((s) => Math.min(s + 1, THINKING_STEPS.length - 1));
    }, 550);
    const timeout = setTimeout(() => setRevealed(true), 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [profile]);

  if (!profile) return <Navigate to="/app" replace />;

  const course = getCourseByGoal(profile.goal);

  const handleStart = () => {
    selectCourse(course.id);
    navigate('/app/learn');
  };

  return (
    <>
      <AppHeader />
      <main className="section max-w-[640px] py-20">
        {!revealed ? (
          <div className="py-24 text-center">
            <div className="pulse-dot mx-auto mb-6" />
            <p className="text-ink-dim text-[15px] transition-opacity duration-300">
              {THINKING_STEPS[thinkingStep]}
            </p>
          </div>
        ) : (
          <div className="reveal is-visible">
            <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">
              Recommended for you
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{course.title}</h1>
            <p className="mt-3 text-ink-dim text-[15px] leading-relaxed">{course.description}</p>

            <div className="mt-6 glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] text-ink-faint">
                  {course.durationWeeks}-week track · Certification included
                </span>
                <span className="text-xs font-semibold text-good">94% match</span>
              </div>
              <div className="space-y-2.5 mb-5">
                {course.matchReasons.map((r) => (
                  <div key={r} className="flex items-start gap-2.5 text-[13.5px] text-ink-dim">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-2 shrink-0" />
                    {r}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {course.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-ink-dim">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              className="mt-8 rounded-full px-6 py-3 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity"
            >
              Start learning
            </button>
          </div>
        )}
      </main>
    </>
  );
}
