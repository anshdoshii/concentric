import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { ReadinessRing } from '../components/ReadinessRing';
import { useSession } from '../context/SessionContext';
import { getCourseById } from '../data/courses';

export function Assessment() {
  const navigate = useNavigate();
  const { selectedCourseId, setQuizResult, quizResult } = useSession();
  const course = selectedCourseId ? getCourseById(selectedCourseId) : undefined;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!course) return <Navigate to="/app" replace />;

  const allAnswered = course.quiz.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    const score = course.quiz.reduce(
      (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
      0,
    );
    setQuizResult({ score, total: course.quiz.length });
    setSubmitted(true);
  };

  const percent = submitted && quizResult ? Math.round((quizResult.score / quizResult.total) * 100) : 0;

  return (
    <>
      <AppHeader />
      <main className="section max-w-[680px] py-16">
        {!submitted ? (
          <>
            <span className="text-xs font-semibold tracking-wide text-accent-2 uppercase">
              Mock assessment
            </span>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight mb-1">{course.title}</h1>
            <p className="text-ink-dim text-[14px] mb-8">
              {course.quiz.length} questions · Untimed practice attempt
            </p>

            <div className="space-y-6">
              {course.quiz.map((q, qi) => (
                <div key={q.id} className="glass rounded-2xl p-5">
                  <div className="text-[14px] font-medium mb-3.5">
                    {qi + 1}. {q.prompt}
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className={`w-full text-left rounded-lg border px-3.5 py-2.5 text-[13px] transition-all ${
                          answers[q.id] === oi
                            ? 'border-accent-2/60 bg-white/[0.06] text-ink'
                            : 'border-white/10 bg-white/[0.02] text-ink-dim'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="mt-8 rounded-full px-6 py-3 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit assessment
            </button>
          </>
        ) : (
          <div className="reveal is-visible text-center py-8">
            <div className="flex justify-center mb-6">
              <ReadinessRing percent={percent} size={140} />
            </div>
            <h2 className="text-xl font-semibold tracking-tight mb-1">
              {percent >= 80 ? 'Certification-ready' : 'Keep practicing'}
            </h2>
            <p className="text-ink-dim text-[14px] mb-8">
              {quizResult?.score}/{quizResult?.total} correct
              {percent >= 80
                ? ' — above the 80% certification threshold.'
                : ' — below the 80% threshold. Review the modules and retake when ready.'}
            </p>
            <button
              onClick={() => navigate('/app/dashboard')}
              className="rounded-full px-6 py-3 text-sm font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity"
            >
              View dashboard
            </button>
          </div>
        )}
      </main>
    </>
  );
}
