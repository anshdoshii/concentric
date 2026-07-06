import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CareerGoal } from '../data/courses';

export interface LearnerProfile {
  background: string;
  goal: CareerGoal;
  availability: string;
}

export interface QuizResult {
  score: number;
  total: number;
}

interface SessionState {
  profile: LearnerProfile | null;
  selectedCourseId: string | null;
  completedModuleIds: Set<string>;
  quizResult: QuizResult | null;
}

interface SessionContextValue extends SessionState {
  setProfile: (profile: LearnerProfile) => void;
  selectCourse: (courseId: string) => void;
  completeModule: (moduleId: string) => void;
  isModuleComplete: (moduleId: string) => boolean;
  setQuizResult: (result: QuizResult) => void;
  reset: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const EMPTY_STATE: SessionState = {
  profile: null,
  selectedCourseId: null,
  completedModuleIds: new Set(),
  quizResult: null,
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>(EMPTY_STATE);

  const value = useMemo<SessionContextValue>(
    () => ({
      ...state,
      setProfile: (profile) =>
        setState((s) => ({ ...s, profile, selectedCourseId: null, completedModuleIds: new Set(), quizResult: null })),
      selectCourse: (courseId) => setState((s) => ({ ...s, selectedCourseId: courseId })),
      completeModule: (moduleId) =>
        setState((s) => {
          const next = new Set(s.completedModuleIds);
          next.add(moduleId);
          return { ...s, completedModuleIds: next };
        }),
      isModuleComplete: (moduleId) => state.completedModuleIds.has(moduleId),
      setQuizResult: (result) => setState((s) => ({ ...s, quizResult: result })),
      reset: () => setState(EMPTY_STATE),
    }),
    [state],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within a SessionProvider');
  return ctx;
}
