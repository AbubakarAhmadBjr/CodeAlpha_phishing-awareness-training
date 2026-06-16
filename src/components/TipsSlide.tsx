import ExpandableCard from './ExpandableCard';
import { Tip } from '../data/courseData';

interface TipsSlideProps {
  title: string;
  subtitle?: string;
  tips: Tip[];
}

export default function TipsSlide({ title, subtitle, tips }: TipsSlideProps) {
  return (
    <div className="flex flex-col space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-1">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>

      {/* Optional hint */}
      <p className="text-slate-400 text-xs bg-slate-800/40 border border-slate-700 rounded-xl px-3 py-2">
        👆 <span className="text-slate-300">Tap any tip to see detailed explanation and real‑world example</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((tip, i) => (
          <ExpandableCard
            key={i}
            icon={tip.icon}
            title={tip.title}
            detail={tip.detail}
            color={tip.color}
          />
        ))}
      </div>
    </div>
  );
}