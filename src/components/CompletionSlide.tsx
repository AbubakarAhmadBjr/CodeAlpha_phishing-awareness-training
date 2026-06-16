interface Bullet {
  icon: string;
  text: string;
}

interface CompletionSlideProps {
  title: string;
  subtitle?: string;
  bullets?: Bullet[];
  score: number;
  total: number;
  onRestart: () => void;
}

export default function CompletionSlide({ title, subtitle, bullets, score, total, onRestart }: CompletionSlideProps) {
  const pct = Math.round((score / total) * 100);
  const grade = pct === 100 ? 'Perfect! 🏆' : pct >= 75 ? 'Great Work! 🌟' : pct >= 50 ? 'Good Effort! 💪' : 'Keep Practicing! 📚';
  const gradeColor = pct === 100 ? 'text-yellow-400' : pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-blue-400' : 'text-orange-400';
  const ringColor = pct === 100 ? 'stroke-yellow-400' : pct >= 75 ? 'stroke-green-400' : pct >= 50 ? 'stroke-blue-400' : 'stroke-orange-400';

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-fadeIn py-2">
      {/* Score Ring */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            className={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white">{score}/{total}</span>
          <span className="text-xs text-slate-400">correct</span>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-black text-white mb-2">{title}</h1>
        <p className={`text-xl font-bold ${gradeColor}`}>{grade}</p>
        {subtitle && <p className="text-slate-400 text-sm mt-2">{subtitle}</p>}
      </div>

      {/* What you learned */}
      {bullets && (
        <div className="w-full max-w-md bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-left space-y-3">
          <h3 className="text-white font-bold text-sm mb-3">📚 What You Learned:</h3>
          {bullets.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-green-400">{b.icon}</span>
              <span className="text-slate-300 text-sm">{b.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Certificate-style badge */}
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 rounded-2xl p-5">
        <div className="text-center space-y-2">
          <div className="text-2xl">🛡️</div>
          <div className="text-white font-black text-lg">Phishing Awareness Training</div>
          <div className="text-slate-400 text-xs">Training Module Completed</div>
          <div className="text-cyan-400 text-sm font-bold mt-2">SafefromPhish</div>
          <div className="mt-3 border-t border-slate-700 pt-3">
            <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
              <span>📅 {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>Score: {pct}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-200 active:scale-95"
        >
          🔄 Retake Training
        </button>
      </div>
    </div>
  );
}
