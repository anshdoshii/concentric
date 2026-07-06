import { Navigate, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { ReadinessRing } from '../components/ReadinessRing';
import { useSession } from '../context/SessionContext';
import { getCourseById } from '../data/courses';

export function Dashboard() {
  const navigate = useNavigate();
  const { profile, selectedCourseId, completedModuleIds, quizResult, reset } = useSession();
  const course = selectedCourseId ? getCourseById(selectedCourseId) : undefined;

  if (!profile || !course) return <Navigate to="/app" replace />;

  const moduleProgress = (completedModuleIds.size / course.modules.length) * 100;
  const quizScore = quizResult ? (quizResult.score / quizResult.total) * 100 : 0;
  const readiness = quizResult ? Math.round(moduleProgress * 0.4 + quizScore * 0.6) : Math.round(moduleProgress * 0.4);

  const handleRestart = () => {
    reset();
    navigate('/app');
  };

  return (
    <>
      <AppHeader />
      <main className="section max-w-[780px] py-16">
        <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">Your progress</span>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight mb-1">{course.title}</h1>
        <p className="text-ink-dim text-[14px] mb-10">
          Goal: {profile.goal.replace('-', ' ')} · Availability: {profile.availability}
        </p>

        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <div className="glass rounded-2xl p-6">
            <div className="text-xs text-ink-faint mb-2">Module completion</div>
            <div className="text-2xl font-semibold">
              {completedModuleIds.size}/{course.modules.length}
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mt-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6e7bff] to-[#22d3ee] transition-all duration-500"
                style={{ width: `${moduleProgress}%` }}
              />
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="text-xs text-ink-faint mb-2">Assessment score</div>
            {quizResult ? (
              <>
                <div className="text-2xl font-semibold">
                  {quizResult.score}/{quizResult.total}
                </div>
                <div className="text-[12px] text-ink-faint mt-1">{Math.round(quizScore)}% correct</div>
              </>
            ) : (
              <div className="text-[13px] text-ink-faint mt-1">Not attempted yet</div>
            )}
          </div>

          <div className="glass rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="text-xs text-ink-faint mb-2">Certification readiness</div>
              <div className={`text-[13px] font-medium ${readiness >= 80 ? 'text-good' : 'text-ink-dim'}`}>
                {readiness >= 80 ? 'Ready to certify' : 'In progress'}
              </div>
            </div>
            <ReadinessRing percent={readiness} size={72} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/learn')}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity"
          >
            Continue learning
          </button>
          <button
            onClick={() => navigate('/app/assessment')}
            className="rounded-full px-5 py-2.5 text-sm font-medium border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
          >
            {quizResult ? 'Retake assessment' : 'Take assessment'}
          </button>
          <button
            onClick={handleRestart}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-ink-faint hover:text-ink-dim transition-colors ml-auto"
          >
            Restart demo profile
          </button>
        </div>
      </main>
    </>
  );
}
