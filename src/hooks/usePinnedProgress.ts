import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, prefersReducedMotion } from '../utils/gsap';

/**
 * Pins the section for the duration of its own scroll height (stepCount
 * viewport-heights) and reports which step "owns" the current scroll
 * position — the same pinned-scene mechanic dove-landing-page uses for its
 * FeatureScroll sequence, built on GSAP ScrollTrigger's pin+scrub instead of
 * a hand-rolled follower. Disabled below `minWidth` and under
 * prefers-reduced-motion, where the caller should render a normal stacked
 * fallback instead.
 */
export function usePinnedProgress(stepCount: number, minWidth = 1024) {
  const [pinned] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= minWidth && !prefersReducedMotion(),
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !pinned) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setActiveIndex(Math.min(stepCount - 1, Math.floor(self.progress * stepCount)));
      },
    });

    ScrollTrigger.refresh();

    return () => st.kill();
  }, [stepCount, pinned]);

  return { sectionRef, activeIndex, pinned };
}
