import { useState } from 'react';
import { Tactic } from '../data/courseData';

interface TacticsSlideProps {
  title: string;
  subtitle?: string;
  tactics: Tactic[];
}

export default function TacticsSlide({ title, subtitle, tactics }: TacticsSlideProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const handleToggle = (idx: number) => {
    if (selected === idx) {
      // closing the card
      setSelected(null);
    } else {
      // opening a new card
      setSelected(idx);
      // mark this card as ever opened
      setOpened(prev => new Set(prev).add(idx));
    }
  };

  return (
    <div className="flex flex-col space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-1">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>

      <p className="text-slate-400 text-xs bg-slate-800/40 border border-slate-700 rounded-xl px-3 py-2">
        💡 <span className="text-slate-300">Tap any tactic card to see a real-world example</span>
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tactics.map((tactic, i) => {
          const isExpanded = selected === i;
          const hasBeenOpened = opened.has(i);
          // Show hint only if the card is NOT expanded and has never been opened
          const showHint = !isExpanded && !hasBeenOpened;

          return (
            <button
              key={i}
              onClick={() => handleToggle(i)}
              className={`text-left rounded-2xl p-4 border transition-all duration-200 ${
                isExpanded
                  ? 'border-white/20 bg-white/5 scale-[0.98]'
                  : 'border-slate-700/50 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/70 hover:scale-[1.02]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tactic.color} flex items-center justify-center text-xl mb-3 shadow-lg`}
              >
                {tactic.icon}
              </div>
              <div className="text-white font-bold text-sm mb-1">{tactic.name}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{tactic.description}</div>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Example:</div>
                  <div className="text-cyan-400 text-xs italic">"{tactic.example}"</div>
                </div>
              )}

              {showHint && (
                <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                  <span>👆 Tap for example</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}