import { Stat } from '../data/courseData';

interface IntroSlideProps {
  title: string;
  subtitle?: string;
  stats?: Stat[];
  onStart: () => void;
}

export default function IntroSlide({ title, subtitle, stats, onStart }: IntroSlideProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-4 animate-fadeIn">
      {/* Shield Icon */}
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/30">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
            <span className="text-4xl">🛡️</span>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </div>

      <div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
          {title}
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">{subtitle}</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 backdrop-blur-sm"
            >
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-200 active:scale-95"
        >
          Start Training →
        </button>
        <p className="text-slate-500 text-sm">~30 minutes • 10 quiz questions • Interactive</p>
      </div>
    </div>
  );
}
