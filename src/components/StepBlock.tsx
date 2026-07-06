import type { ComponentType } from 'react';
import { useReveal } from '../hooks/useReveal';

interface StepBlockProps {
  tag: string;
  title: string;
  body: string;
  Visual: ComponentType;
  containerRef: (el: HTMLDivElement | null) => void;
}

export function StepBlock({ tag, title, body, Visual, containerRef }: StepBlockProps) {
  const textRef = useReveal<HTMLDivElement>();
  const visualRef = useReveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="grid sm:grid-cols-2 gap-10 items-center">
      <div ref={textRef} className="reveal">
        <span className="lg:hidden text-xs font-semibold tracking-wide text-accent-2 uppercase">
          {tag}
        </span>
        <h3 className="mt-2 lg:mt-0 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-ink-dim text-[15px] leading-relaxed">{body}</p>
      </div>
      <div ref={visualRef} className="reveal-scale flex justify-center sm:justify-start">
        <Visual />
      </div>
    </div>
  );
}
