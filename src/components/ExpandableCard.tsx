import { useState } from 'react';

interface ExpandableCardProps {
  icon: string;
  title: string;
  detail: string;          // The full explanation shown when expanded
  color?: string;          // Optional border color for expanded state
}

export default function ExpandableCard({ icon, title, detail, color = 'border-slate-700' }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 cursor-pointer ${
        expanded ? `bg-slate-800/80 ${color} shadow-md` : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-500'
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1">
          <div className="text-white font-semibold text-sm">{title}</div>
        </div>
        <div className="text-slate-500 text-xs flex-shrink-0">
          {expanded ? '▲' : '▼'}
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-slate-700/50 mt-1">
          <div className="text-slate-300 text-xs leading-relaxed">{detail}</div>
        </div>
      )}
    </div>
  );
}