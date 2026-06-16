import { useState } from 'react';
import { EmailExample } from '../data/courseData';

interface EmailExampleSlideProps {
  title: string;
  subtitle?: string;
  emailExample: EmailExample;
}

export default function EmailExampleSlide({ title, subtitle, emailExample }: EmailExampleSlideProps) {
  const [revealed, setRevealed] = useState(false);
  const isPhishing = emailExample.type === 'phishing';
  const flags = isPhishing ? emailExample.redFlags : emailExample.greenFlags;

  return (
    <div className="flex flex-col space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-1">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>

      {/* Email Mock */}
      <div
        className={`rounded-2xl border-2 overflow-hidden shadow-xl transition-all duration-300 ${
          isPhishing
            ? 'border-red-500/60 shadow-red-900/20'
            : 'border-green-500/60 shadow-green-900/20'
        }`}
      >
        {/* Email Header Bar */}
        <div
          className={`px-4 py-2 flex items-center gap-2 ${
            isPhishing ? 'bg-red-900/40' : 'bg-green-900/40'
          }`}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
          </div>
          <span className="text-slate-400 text-xs ml-2 font-mono">Email Client</span>
          <div className="ml-auto">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isPhishing
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-green-500/20 text-green-400 border border-green-500/40'
              }`}
            >
              {isPhishing ? '⚠️ PHISHING' : '✅ LEGITIMATE'}
            </span>
          </div>
        </div>

        {/* Email Content */}
        <div className="bg-slate-900 p-4 space-y-3">
          <div className="space-y-1 border-b border-slate-700 pb-3">
            <div className="flex gap-2 items-start">
              <span className="text-slate-500 text-xs w-14 flex-shrink-0 mt-0.5">From:</span>
              <div>
                <span className="text-white text-sm font-semibold">{emailExample.from} </span>
                <span
                  className={`text-xs font-mono px-1 py-0.5 rounded ${
                    isPhishing
                      ? 'text-red-400 bg-red-950/50 border border-red-800/50'
                      : 'text-green-400 bg-green-950/50'
                  }`}
                >
                  &lt;{emailExample.fromEmail}&gt;
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-slate-500 text-xs w-14 flex-shrink-0">Subject:</span>
              <span className={`text-sm font-medium ${isPhishing ? 'text-red-300' : 'text-slate-200'}`}>
                {emailExample.subject}
              </span>
            </div>
          </div>

          <pre className="text-slate-300 text-xs leading-relaxed font-sans whitespace-pre-wrap">
            {emailExample.body}
          </pre>

          {isPhishing && (
            <div className="bg-red-950/50 border border-red-700/50 rounded-xl p-3 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🚫</span>
                <span className="text-red-400 text-xs font-bold uppercase tracking-wide">
                  Phishing Alert — Do NOT click any links
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                This email shows multiple signs of a phishing attack. Reveal the red flags below.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reveal Flags Button */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
            isPhishing
              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-900/30'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-900/30'
          }`}
        >
          {isPhishing ? '🔍 Reveal Red Flags' : '🔍 Reveal Why It\'s Legitimate'}
        </button>
      ) : (
        <div
          className={`rounded-2xl border p-4 space-y-2 ${
            isPhishing
              ? 'bg-red-950/30 border-red-800/40'
              : 'bg-green-950/30 border-green-800/40'
          }`}
        >
          <h3
            className={`font-bold text-sm mb-3 flex items-center gap-2 ${
              isPhishing ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {isPhishing ? '🚩 Red Flags Identified:' : '✅ Trust Indicators:'}
          </h3>
          {flags?.map((flag, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className={`text-xs mt-0.5 flex-shrink-0 ${isPhishing ? 'text-red-500' : 'text-green-500'}`}>
                {isPhishing ? '●' : '●'}
              </span>
              <span className="text-slate-300 text-xs">{flag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
