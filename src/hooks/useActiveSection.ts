import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which of several step elements currently owns the viewport's
 * "reading line" (35% down from the top), for a sticky-rail scrollytelling
 * layout where the rail highlight must track scroll position exactly.
 */
export function useActiveSection(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let closest = 0;
      let closestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom >= 0) {
          const dist = Math.abs(rect.top - line);
          if (rect.top <= line && dist < closestDist) {
            closest = i;
            closestDist = dist;
          }
        }
      });
      setActive(closest);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count]);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    refs.current[i] = el;
  };

  return { active, setRef };
}
