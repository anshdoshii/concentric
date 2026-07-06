import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { TutorChat } from '../components/TutorChat';
import { useSession } from '../context/SessionContext';
import { getCourseById } from '../data/courses';

export function Learn() {
  const navigate = useNavigate();
  const { selectedCourseId, completeModule, isModuleComplete, completedModuleIds } = useSession();
  const course = selectedCourseId ? getCourseById(selectedCourseId) : undefined;
  const [activeIndex, setActiveIndex] = useState(0);

  if (!course) return <Navigate to="/app" replace />;

  const activeModule = course.modules[activeIndex];
  const allComplete = completedModuleIds.size >= course.modules.length;

  return (
    <>
      <AppHeader />
      <main className="section py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-ink-faint">{course.title}</div>
            <h1 className="text-xl font-semibold tracking-tight mt-0.5">{activeModule.title}</h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-ink-faint mb-1">
              {completedModuleIds.size}/{course.modules.length} modules
            </div>
            <div className="h-1.5 w-32 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6e7bff] to-[#22d3ee] transition-all duration-500"
                style={{ width: `${(completedModuleIds.size / course.modules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr_360px] gap-6">
          {/* Module sidebar */}
          <div className="space-y-1">
            {course.modules.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left rounded-lg px-3 py-2.5 text-[13px] transition-colors flex items-center justify-between ${
                  i === activeIndex ? 'bg-white/10 text-ink font-medium' : 'text-ink-faint hover:text-ink-dim'
                }`}
              >
                <span>{m.title}</span>
                {isModuleComplete(m.id) && <span className="text-good text-[11px]">✓</span>}
              </button>
            ))}
          </div>

          {/* Module content */}
          <div className="glass rounded-2xl p-6">
            <p className="text-ink-dim text-[14px] mb-5">{activeModule.summary}</p>
            <ul className="space-y-3 mb-6">
              {activeModule.content.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-ink-dim leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-2 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>

            {isModuleComplete(activeModule.id) ? (
              <span className="text-[13px] text-good font-medium">✓ Completed</span>
            ) : (
              <button
                onClick={() => completeModule(activeModule.id)}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity"
              >
                Mark module complete
              </button>
            )}

            {allComplete && (
              <div className="mt-6 pt-5 border-t border-white/8 flex items-center justify-between">
                <span className="text-[13.5px] text-ink-dim">All modules complete — ready for assessment.</span>
                <button
                  onClick={() => navigate('/app/assessment')}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all shrink-0"
                >
                  Take assessment
                </button>
              </div>
            )}
          </div>

          {/* AI tutor */}
          <TutorChat module={activeModule} />
        </div>
      </main>
    </>
  );
}
