import { useEffect, useRef, useState } from 'react';
import type { Module } from '../data/courses';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

function useTypewriter(text: string, speed = 16) {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

function craftAnswer(question: string, module: Module): string {
  const bullet = module.content[question.length % module.content.length];
  return `In "${module.title}": ${bullet}. That's the piece most relevant to what you're asking — let me know if you want it broken down further.`;
}

export function TutorChat({ module }: { module: Module }) {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typed = useTypewriter(pending ?? '');

  useEffect(() => {
    setHistory([]);
    setPending(null);
    setInput('');
  }, [module.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history, typed]);

  useEffect(() => {
    if (pending && typed === pending) {
      const finished = pending;
      const t = setTimeout(() => {
        setHistory((h) => [...h, { role: 'assistant', text: finished }]);
        setPending(null);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [pending, typed]);

  const send = () => {
    const q = input.trim();
    if (!q || pending) return;
    setHistory((h) => [...h, { role: 'user', text: q }]);
    setInput('');
    const answer = craftAnswer(q, module);
    setTimeout(() => setPending(answer), 350);
  };

  return (
    <div className="glass rounded-2xl flex flex-col h-[420px]">
      <div className="px-4 py-3 border-b border-white/8 text-xs font-medium text-ink-dim">
        AI tutor · scoped to “{module.title}”
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {history.length === 0 && !pending && (
          <p className="text-[13px] text-ink-faint">
            Ask anything about this module — answers stay grounded in its content.
          </p>
        )}
        {history.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl px-3.5 py-2.5 text-[13px] max-w-[85%] ${
              m.role === 'user'
                ? 'bg-white/8 ml-auto text-ink'
                : 'bg-gradient-to-br from-[#6e7bff]/15 to-[#22d3ee]/10 border border-white/10 text-ink-dim'
            }`}
          >
            {m.text}
          </div>
        ))}
        {pending && (
          <div className="rounded-xl px-3.5 py-2.5 text-[13px] max-w-[85%] bg-gradient-to-br from-[#6e7bff]/15 to-[#22d3ee]/10 border border-white/10 text-ink-dim">
            {typed}
            {typed.length < pending.length && <span className="typing-caret" />}
          </div>
        )}
      </div>
      <div className="p-3 border-t border-white/8 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about this module…"
          className="flex-1 rounded-lg bg-white/5 border border-white/10 focus:border-accent-2/60 outline-none px-3 py-2 text-[13px] text-ink placeholder:text-ink-faint transition-colors"
        />
        <button
          onClick={send}
          disabled={!input.trim() || !!pending}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-canvas bg-gradient-to-r from-[#8f9bff] via-[#22d3ee] to-[#c084fc] hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
