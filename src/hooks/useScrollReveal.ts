import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/gsap';

type Animation = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn';

interface Options {
  animation?: Animation;
  delay?: number;
  duration?: number;
  distance?: number;
  start?: string;
  stagger?: boolean;
  staggerAmount?: number;
}

/**
 * GSAP ScrollTrigger entrance animation — replaces plain CSS/IntersectionObserver
 * reveals with proper eased motion (power3.out) and true staggering across children.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  animation = 'fadeUp',
  delay = 0,
  duration = 0.9,
  distance = 36,
  start = 'top 82%',
  stagger = false,
  staggerAmount = 0.1,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : el;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const initial: Record<Animation, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: distance },
      fadeIn: { opacity: 0 },
      fadeLeft: { opacity: 0, x: -distance },
      fadeRight: { opacity: 0, x: distance },
      scaleIn: { opacity: 0, scale: 0.94 },
    };
    const target: Record<Animation, gsap.TweenVars> = {
      fadeUp: { opacity: 1, y: 0 },
      fadeIn: { opacity: 1 },
      fadeLeft: { opacity: 1, x: 0 },
      fadeRight: { opacity: 1, x: 0 },
      scaleIn: { opacity: 1, scale: 1 },
    };

    gsap.set(targets, initial[animation]);

    const tween = gsap.to(targets, {
      ...target[animation],
      duration,
      delay,
      ease: 'power3.out',
      stagger: stagger ? staggerAmount : 0,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation, delay, duration, distance, start, stagger, staggerAmount]);

  return ref;
}

/** Subtle parallax drift, scrubbed directly to scroll position. */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.to(el, {
      y: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return ref;
}

export { ScrollTrigger };
