import { useEffect, useRef } from 'react';

/**
 * Adds `.is-visible` to the element once it crosses the given viewport
 * threshold, pairing with the `.reveal` / `.reveal-scale` / `.reveal-stagger`
 * CSS classes in index.css. Plain IntersectionObserver — no animation
 * runtime needed for a one-shot entrance trigger.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
