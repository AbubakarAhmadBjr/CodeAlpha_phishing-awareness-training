import { useState, useEffect } from 'react';
import { slides } from './data/courseData';
import ProgressBar from './components/ProgressBar';
import IntroSlide from './components/IntroSlide';
import InfoSlide from './components/InfoSlide';
import EmailExampleSlide from './components/EmailExampleSlide';
import WebsiteExampleSlide from './components/WebsiteExampleSlide';
import TacticsSlide from './components/TacticsSlide';
import TipsSlide from './components/TipsSlide';
import QuizSlide from './components/QuizSlide';
import CompletionSlide from './components/CompletionSlide';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuizQuestions] = useState(10);
  const [quizAnswered, setQuizAnswered] = useState<Set<number>>(new Set());
  const [animating, setAnimating] = useState(false);

  const slide = slides[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === slides.length - 1;

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(idx);
      setAnimating(false);
    }, 200);
  };

  const goNext = () => { if (!isLast) goTo(currentSlide + 1); };
  const goPrev = () => { if (!isFirst) goTo(currentSlide - 1); };

  const handleRestart = () => {
    setQuizScore(0);
    setQuizAnswered(new Set());
    goTo(0);
  };

  const handleQuizAnswer = (slideIdx: number, correct: boolean) => {
    if (!quizAnswered.has(slideIdx)) {
      setQuizAnswered(prev => new Set(prev).add(slideIdx));
      if (correct) setQuizScore(prev => prev + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentSlide, animating]);

  const renderSlide = () => {
    switch (slide.type) {
      case 'intro':
        return (
          <IntroSlide
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            stats={slide.content.stats}
            onStart={goNext}
          />
        );
      case 'info':
        return (
          <InfoSlide
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            body={slide.content.body}
            bullets={slide.content.bullets}
          />
        );
      case 'example':
        if (slide.content.emailExample) {
          return (
            <EmailExampleSlide
              key={slide.id}
              title={slide.title}
              subtitle={slide.subtitle}
              emailExample={slide.content.emailExample}
            />
          );
        }
        if (slide.content.websiteExample) {
          return (
            <WebsiteExampleSlide
              key={slide.id}
              title={slide.title}
              subtitle={slide.subtitle}
              websiteExample={slide.content.websiteExample}
            />
          );
        }
        return null;
      case 'tactics':
        return (
          <TacticsSlide
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            tactics={slide.content.tactics!}
          />
        );
      case 'tips':
        return (
          <TipsSlide
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            tips={slide.content.tips!}
          />
        );
      case 'quiz':
        return (
          <QuizSlide
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            quiz={slide.content.quiz!}
            onAnswer={(correct) => handleQuizAnswer(currentSlide, correct)}
          />
        );
      case 'completion':
        return (
          <CompletionSlide
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            bullets={slide.content.bullets}
            score={quizScore}
            total={totalQuizQuestions}
            onRestart={handleRestart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-800/3 blur-3xl" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #60a5fa 1px, transparent 1px), linear-gradient(to bottom, #60a5fa 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Top Nav Bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/60 backdrop-blur-sm bg-slate-950/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <span className="text-base">🛡️</span>
          </div>
          <div>
            <div className="text-white font-black text-sm leading-none">SafefromPhish</div>
            <div className="text-slate-500 text-[10px] leading-none mt-0.5">Phishing Awareness Training by UltimateBajauro</div>
          </div>
        </div>

        {/* Quiz score tracker */}
        {quizAnswered.size > 0 && (
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-full px-3 py-1.5">
            <span className="text-yellow-400 text-xs">⭐</span>
            <span className="text-white text-xs font-bold">{quizScore}/{quizAnswered.size}</span>
            <span className="text-slate-400 text-xs">quiz</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-200 ${
                i === currentSlide
                  ? 'w-5 h-2 bg-cyan-400'
                  : i < currentSlide
                  ? 'w-2 h-2 bg-slate-500 hover:bg-slate-400'
                  : 'w-2 h-2 bg-slate-700 hover:bg-slate-600'
              }`}
              title={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </header>

      {/* Progress Bar */}
      {!isFirst && !isLast && (
        <div className="relative z-10 px-4 sm:px-6 pt-4">
          <ProgressBar current={currentSlide} total={slides.length} />
        </div>
      )}

      {/* Slide Content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div
          className={`max-w-3xl mx-auto px-4 sm:px-6 py-6 transition-all duration-200 ${
            animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {renderSlide()}
        </div>
      </main>

      {/* Bottom Navigation */}
      {!isFirst && !isLast && (
        <footer className="relative z-10 border-t border-slate-800/60 backdrop-blur-sm bg-slate-950/80 px-4 sm:px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-medium hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              ← Back
            </button>

            {/* Slide label */}
            <div className="text-center hidden sm:block">
              <span className="text-slate-500 text-xs">
                {slide.type === 'quiz' ? '🧠 Quiz' :
                 slide.type === 'example' ? '🔍 Example' :
                 slide.type === 'tactics' ? '🎭 Tactics' :
                 slide.type === 'tips' ? '💡 Best Practices' :
                 slide.type === 'info' ? '📖 Learn' : ''}
              </span>
            </div>

            <button
              onClick={goNext}
              disabled={isLast}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              Next →
            </button>
          </div>
        </footer>
      )}

      {/* Keyboard hint */}
      {!isFirst && !isLast && (
        <div className="hidden md:block absolute bottom-16 right-4 text-slate-700 text-[10px]">
          Use ← → arrow keys to navigate
        </div>
      )}
    </div>
  );
}