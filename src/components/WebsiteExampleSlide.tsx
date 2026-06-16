import { useState } from 'react';
import { WebsiteExample } from '../data/courseData';

interface WebsiteExampleSlideProps {
  title: string;
  subtitle?: string;
  websiteExample: WebsiteExample;
}

export default function WebsiteExampleSlide({ title, subtitle, websiteExample }: WebsiteExampleSlideProps) {
  const [revealed, setRevealed] = useState(false);
  const isPhishing = websiteExample.type === 'phishing';

  // Break down the URL for annotation
  const url = websiteExample.url;
  const parts = (() => {
    try {
      const match = url.match(/^(https?:\/\/)(www\.)?([^\/]+)(\/.*)?$/);
      return match ? { protocol: match[1], www: match[2] || '', domain: match[3], path: match[4] || '' } : null;
    } catch { return null; }
  })();

  return (
    <div className="flex flex-col space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-1">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>

      {/* Browser Mock */}
      <div
        className={`rounded-2xl border-2 overflow-hidden shadow-xl ${
          isPhishing ? 'border-red-500/60 shadow-red-900/20' : 'border-green-500/60 shadow-green-900/20'
        }`}
      >
        {/* Browser Chrome */}
        <div className="bg-slate-800 px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
            </div>
            <div className="flex-1 bg-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
              {/* Lock Icon */}
              {isPhishing ? (
                <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}

              {/* Annotated URL */}
              {parts ? (
                <div className="flex items-center font-mono text-xs overflow-x-auto">
                  <span className={isPhishing ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                    {parts.protocol}
                  </span>
                  <span className="text-slate-400">{parts.www}</span>
                  <span className={isPhishing ? 'text-red-300 font-bold' : 'text-white font-bold'}>
                    {parts.domain}
                  </span>
                  {parts.path && (
                    <span className={isPhishing ? 'text-orange-400' : 'text-slate-300'}>
                      {parts.path}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-slate-300 font-mono text-xs">{url}</span>
              )}
            </div>
          </div>
        </div>

        {/* Page Content Mock */}
        <div className="bg-slate-900 p-6 min-h-[140px]">
          <div className="max-w-sm mx-auto space-y-4">
            <div className="text-center">
              <div className="text-2xl font-black text-white">{websiteExample.title}</div>
              <div className="text-slate-400 text-sm mt-1">{websiteExample.description}</div>
            </div>
            {/* Fake login form */}
            <div className="space-y-2">
              <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
                <span className="text-slate-500 text-xs">Email or phone</span>
              </div>
              <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
                <span className="text-slate-500 text-xs">Password</span>
              </div>
              <button
                disabled
                className={`w-full py-2 rounded-lg text-white text-sm font-bold ${
                  isPhishing
                    ? 'bg-blue-600 cursor-not-allowed opacity-80'
                    : 'bg-blue-600 cursor-not-allowed opacity-80'
                }`}
              >
                {isPhishing ? '🔴 DO NOT ENTER CREDENTIALS' : 'Log In'}
              </button>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div
          className={`px-4 py-2 flex items-center gap-2 ${
            isPhishing ? 'bg-red-900/30' : 'bg-green-900/30'
          }`}
        >
          <span
            className={`text-xs font-bold ${isPhishing ? 'text-red-400' : 'text-green-400'}`}
          >
            {isPhishing ? '⚠️ NOT SECURE — HTTP connection' : '🔒 SECURE — HTTPS verified'}
          </span>
          <span
            className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
              isPhishing
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-green-500/20 text-green-400 border border-green-500/40'
            }`}
          >
            {isPhishing ? 'PHISHING SITE' : 'LEGITIMATE SITE'}
          </span>
        </div>
      </div>

      {/* URL Breakdown */}
      {isPhishing && parts && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">URL Breakdown</h4>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <div className="flex items-center gap-1">
              <span className="bg-red-900/50 border border-red-700/50 text-red-400 px-2 py-1 rounded">
                http://
              </span>
              <span className="text-slate-500 text-[10px]">No SSL!</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-red-900/50 border border-red-700/50 text-red-300 px-2 py-1 rounded">
                paypa<span className="underline decoration-red-400">1</span>-secure-login.net
              </span>
              <span className="text-slate-500 text-[10px]">Fake domain</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-orange-900/50 border border-orange-700/50 text-orange-400 px-2 py-1 rounded">
                /account/verify
              </span>
              <span className="text-slate-500 text-[10px]">Suspicious path</span>
            </div>
          </div>
        </div>
      )}

      {/* Reveal Flags */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-900/30 transition-all duration-200 hover:scale-[1.02] active:scale-95"
        >
          🔍 Reveal Warning Signs
        </button>
      ) : (
        <div className="rounded-2xl border border-red-800/40 bg-red-950/30 p-4 space-y-2">
          <h3 className="font-bold text-sm text-red-400 mb-3 flex items-center gap-2">
            🚩 Red Flags in This URL:
          </h3>
          {websiteExample.redFlags?.map((flag, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-red-500 text-xs mt-0.5 flex-shrink-0">●</span>
              <span className="text-slate-300 text-xs">{flag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
