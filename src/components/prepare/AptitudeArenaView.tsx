import React, { useState, useEffect } from 'react';
import {
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { aptitudeQuestionsBank } from '../../data/seedData';
import { useApp } from '../../context/AppContext';
import { AptitudeQuestion } from '../../types';

export const AptitudeArenaView: React.FC = () => {
  const { recordAptitudeResult, setIsAiDrawerOpen } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<'Quantitative' | 'Logical' | 'Verbal'>('Quantitative');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30s per question
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Filter questions for active category
  const activeQuestions = aptitudeQuestionsBank.filter((q) => q.category === selectedCategory);
  const currentQuestion: AptitudeQuestion | undefined = activeQuestions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || isTestSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto advance if time runs out
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, isTimerRunning, isTestSubmitted]);

  const handleSelectOption = (optionIndex: number) => {
    if (isTestSubmitted || !currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      handleSubmitTest();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setTimeLeft(30);
    }
  };

  const handleSubmitTest = () => {
    setIsTestSubmitted(true);
    setIsTimerRunning(false);

    // Calculate score
    let correctCount = 0;
    const answersRecord = activeQuestions.map((q) => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedIndex: selected !== undefined ? selected : -1,
        isCorrect,
      };
    });

    const scorePercentage = Math.round((correctCount / activeQuestions.length) * 100);

    recordAptitudeResult({
      category: selectedCategory,
      totalQuestions: activeQuestions.length,
      correctCount,
      scorePercentage,
      timeSpentSeconds: activeQuestions.length * 30 - timeLeft,
      completedAt: new Date().toLocaleTimeString(),
      answers: answersRecord,
    });
  };

  const handleRestartTest = (cat = selectedCategory) => {
    setSelectedCategory(cat);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsTestSubmitted(false);
    setTimeLeft(30);
    setIsTimerRunning(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 font-sans">
      {/* Title matching SkillUp screenshot 51720504 */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2a241e] tracking-tight">
          AI-Powered Aptitude
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Master reasoning skills with interactive practice tests.
        </p>
      </div>

      {/* Select Reasoning Type (SkillUp style pills) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3">Select Reasoning Type</h3>
        <div className="flex flex-wrap gap-3">
          {(['Quantitative', 'Logical', 'Verbal'] as const).map((cat) => {
            const labelMap = {
              Quantitative: 'Quantitative Reasoning',
              Logical: 'Logical Reasoning',
              Verbal: 'Verbal Ability',
            };
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => handleRestartTest(cat)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#8ea755] text-white shadow-md shadow-[#8ea755]/30'
                    : 'bg-[#fcf8f2] hover:bg-[#f3ece0] text-slate-700 border border-[#e8decb]'
                }`}
              >
                {labelMap[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Test Runner or Results Card */}
      {!isTestSubmitted ? (
        currentQuestion && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            {/* Header: Question Counter & Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-lg font-bold text-slate-800">
                Question {currentQuestionIndex + 1} of {activeQuestions.length}
              </span>

              {/* Orange Timer Badge matching screenshot */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-600 text-white font-mono font-bold text-xs sm:text-sm shadow-xs">
                <Clock className="w-4 h-4" />
                <span>0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* Options list A, B, C, D */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === idx;
                const letter = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#8ea755] bg-[#8ea755]/10 text-slate-900 font-bold ring-2 ring-[#8ea755]/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>
                      {letter}. {option}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected
                          ? 'border-[#8ea755] bg-[#8ea755] text-white'
                          : 'border-slate-300 text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submission Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSubmitTest}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-orange-600 hover:bg-orange-50 border border-orange-200 transition-colors cursor-pointer"
                >
                  Submit Test
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#8ea755] hover:bg-[#7e954b] text-white shadow-md shadow-[#8ea755]/25 transition-all cursor-pointer"
                >
                  {currentQuestionIndex === activeQuestions.length - 1 ? 'Finish & Grade' : 'Next Question →'}
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* Results & Answer Explanations View */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-[#8ea755] uppercase tracking-wider">
                Test Complete
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {selectedCategory} Reasoning Performance
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-400 font-medium">Final Score</p>
                <p className="text-2xl font-black text-[#8ea755]">
                  {
                    activeQuestions.filter((q) => selectedAnswers[q.id] === q.correctAnswerIndex).length
                  }{' '}
                  / {activeQuestions.length}
                </p>
              </div>
              <button
                onClick={() => handleRestartTest()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8ea755] text-white font-bold text-xs shadow-md shadow-[#8ea755]/20 hover:bg-[#7e954b] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Test</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Review Answers & Formulas:</h4>
            {activeQuestions.map((q, idx) => {
              const selected = selectedAnswers[q.id];
              const isCorrect = selected === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-sm space-y-2 ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-red-200 bg-red-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-slate-900">
                      Q{idx + 1}. {q.question}
                    </p>
                    {isCorrect ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3" /> Correct
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800 flex items-center gap-1 shrink-0">
                        <XCircle className="w-3 h-3" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">
                    <strong>Your Answer:</strong>{' '}
                    {selected !== undefined ? q.options[selected] : 'Not answered'}{' '}
                    | <strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}
                  </p>

                  <div className="p-3 bg-white rounded-lg border border-slate-100 text-xs text-slate-700">
                    <p className="font-bold text-indigo-700 mb-0.5">Explanation:</p>
                    <p>{q.explanation}</p>
                    {q.formula && (
                      <p className="mt-1 font-mono text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded">
                        Formula: {q.formula}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resource Cards at Bottom matching SkillUp screenshot 51720504 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quantitative Reasoning Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Quantitative Reasoning</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Comprehensive prep materials for quantitative skills, percentages, time & work, and formulas.
            </p>
          </div>
          <button
            onClick={() => handleRestartTest('Quantitative')}
            className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Resources</span>
          </button>
        </div>

        {/* Logical Reasoning Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Logical Reasoning</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Master logical thinking, series patterns, coding-decoding, and problem-solving puzzles.
            </p>
          </div>
          <button
            onClick={() => handleRestartTest('Logical')}
            className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Resources</span>
          </button>
        </div>

        {/* Verbal Ability Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Verbal Ability</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Improve reading comprehension, grammar rules, vocabulary, and sentence arrangement.
            </p>
          </div>
          <button
            onClick={() => handleRestartTest('Verbal')}
            className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Resources</span>
          </button>
        </div>
      </div>
    </div>
  );
};
