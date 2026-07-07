import type { ComponentType } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface StepBlockProps {
  tag: string;
  title: string;
  body: string;
  Visual: ComponentType;
  containerRef: (el: HTMLDivElement | null) => void;
  anchorId?: string;
}

export function StepBlock({ tag, title, body, Visual, containerRef, anchorId }: StepBlockProps) {
  const textRef = useScrollReveal<HTMLDivElement>({ animation: 'fadeUp' });
  const visualRef = useScrollReveal<HTMLDivElement>({ animation: 'scaleIn', delay: 0.1 });

  return (
    <div
      ref={containerRef}
      id={anchorId}
      className="grid sm:grid-cols-2 gap-10 items-center scroll-mt-28"
    >
      <div ref={textRef}>
        <span className="lg:hidden text-xs font-semibold tracking-wide text-accent-2 uppercase">
          {tag}
        </span>
        <h3 className="mt-2 lg:mt-0 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-ink-dim text-[15px] leading-relaxed">{body}</p>
      </div>
      <div ref={visualRef} className="flex justify-center sm:justify-start">
        <Visual />
      </div>
    </div>
  );
}
