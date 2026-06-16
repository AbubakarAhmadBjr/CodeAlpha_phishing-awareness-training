import ExpandableCard from './ExpandableCard';

interface Bullet {
  icon: string;
  text: string;
  detail?: string;
}

interface InfoSlideProps {
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: Bullet[];
}

export default function InfoSlide({ title, subtitle, body, bullets }: InfoSlideProps) {
  return (
    <div className="flex flex-col space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
          <p className="text-slate-400 text-xs bg-slate-800/40 border border-slate-700 rounded-xl px-3 py-2 mb-2">
  👆      <span className="text-slate-300">Tap any card to learn more</span>
        </p>
      </div>

      {body && (
        <div className="bg-blue-950/40 border border-blue-800/50 rounded-2xl p-4">
          <p className="text-slate-300 leading-relaxed">{body}</p>
        </div>
      )}

      {bullets && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bullets.map((b, i) => (
            <ExpandableCard
              key={i}
              icon={b.icon}
              title={b.text}
              detail={b.detail || 'No additional information available.'}
            />
          ))}
        </div>
      )}
    </div>
  );
}