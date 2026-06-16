import { useState } from 'react';
import { QuizQuestion } from '../data/courseData';

interface QuizSlideProps {
  title: string;
  subtitle?: string;
  quiz: QuizQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function QuizSlide({ title, subtitle, quiz, onAnswer }: QuizSlideProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    onAnswer(quiz.options[idx].correct);
  };

  return (
    <div className="flex flex-col space-y-5 animate-fadeIn">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/40 px-2 py-0.5 rounded-full">
            🧠 Knowledge Check
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-1">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>

      {/* Question Card */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        <p className="text-white font-semibold text-sm leading-relaxed">{quiz.question}</p>
        {quiz.scenario && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <p className="text-slate-400 text-xs italic">{quiz.scenario}</p>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {quiz.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = opt.correct;
          const showResult = answered && isSelected;

          let classes = 'w-full text-left rounded-xl border px-4 py-3 transition-all duration-200 ';
          if (!answered) {
            classes += 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-purple-500/60 hover:bg-slate-800 cursor-pointer hover:scale-[1.01]';
          } else if (isSelected && isCorrect) {
            classes += 'border-green-500 bg-green-950/40 text-green-300 cursor-default scale-[1.01]';
          } else if (isSelected && !isCorrect) {
            classes += 'border-red-500 bg-red-950/40 text-red-300 cursor-default';
          } else if (!isSelected && isCorrect && answered) {
            classes += 'border-green-500/40 bg-green-950/20 text-green-400/70 cursor-default';
          } else {
            classes += 'border-slate-700/50 bg-slate-800/30 text-slate-500 cursor-default';
          }

          return (
            <div key={i}>
              <button
                className={classes}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                    {answered && isSelected && isCorrect ? '✓' : answered && isSelected && !isCorrect ? '✗' : answered && !isSelected && isCorrect ? '✓' : String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm leading-relaxed">{opt.text}</span>
                </div>
              </button>

              {/* Explanation */}
              {showResult && (
                <div
                  className={`mt-1 rounded-xl px-4 py-3 text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-green-950/40 border border-green-800/40 text-green-300'
                      : 'bg-red-950/40 border border-red-800/40 text-red-300'
                  }`}
                >
                  {opt.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {answered && (
        <div className="text-center">
          <p className="text-slate-500 text-xs">
            {quiz.options[selected!]?.correct
              ? '🎉 Great job! Click Next to continue.'
              : '💪 Don\'t worry! Click Next to keep learning.'}
          </p>
        </div>
      )}
    </div>
  );
}
