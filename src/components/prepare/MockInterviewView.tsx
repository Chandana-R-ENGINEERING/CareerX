import React, { useState } from 'react';
import {
  Video,
  Upload,
  Calendar,
  CheckCircle2,
  Sparkles,
  Award,
  Send,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { evaluateMockInterviewAnswer } from '../../services/api';
import { MockInterviewSession } from '../../types';

export const MockInterviewView: React.FC = () => {
  const { user, recordInterviewSession, interviewSessions, setIsAiDrawerOpen } = useApp();

  const [activeSession, setActiveSession] = useState<{
    round: 'Technical' | 'HR';
    questionIndex: number;
    questions: string[];
  } | null>(null);

  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [completedSessionScore, setCompletedSessionScore] = useState<number | null>(null);

  const technicalQuestions = [
    'Explain how JWT authentication works in full-stack applications and what security measures protect against XSS/CSRF.',
    'Describe how you would design a rate limiter in Express.js to prevent DDoS or API abuse.',
    'What is the difference between Virtual DOM and Real DOM, and how does React reconciliation algorithm optimize renders?',
  ];

  const hrQuestions = [
    'Tell me about a time when you faced a difficult technical bug under a strict deadline. How did you resolve it?',
    'Why are you specifically interested in software engineering at our company, and where do you see your technical trajectory in 3 years?',
    'Describe an experience working in a team project where team members had conflicting opinions on architecture.',
  ];

  const handleStartSession = (round: 'Technical' | 'HR') => {
    setActiveSession({
      round,
      questionIndex: 0,
      questions: round === 'Technical' ? technicalQuestions : hrQuestions,
    });
    setUserAnswer('');
    setEvaluationResult(null);
    setCompletedSessionScore(null);
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim() || !activeSession) return;
    setIsEvaluating(true);

    const question = activeSession.questions[activeSession.questionIndex];
    const res = await evaluateMockInterviewAnswer(
      question,
      userAnswer,
      user.targetRole,
      activeSession.round
    );

    setEvaluationResult(res.evaluation);
    setIsEvaluating(false);

    // Save session
    const score = res.evaluation?.score || 8.0;
    setCompletedSessionScore(score);

    const sessionData: MockInterviewSession = {
      id: `int_${Date.now()}`,
      role: user.targetRole,
      type: activeSession.round,
      date: new Date().toLocaleDateString(),
      score,
      totalQuestions: 1,
      summary: `Completed ${activeSession.round} round interview drill for ${user.targetRole}.`,
      strengths: res.evaluation?.keyStrengths || ['Good technical clarity'],
      improvements: res.evaluation?.suggestedImprovements || ['Mention more concrete scalability metrics'],
      qaPairs: [
        {
          question,
          userAnswer,
          aiFeedback: res.evaluation?.technicalAccuracy || 'Solid response',
          score,
        },
      ],
    };

    recordInterviewSession(sessionData);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 font-sans">
      {/* Header matching SkillUp screenshot 594ae20d */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2a241e] tracking-tight">
          Mock Interview Simulator
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Practice real interview scenarios with AI feedback.
        </p>
      </div>

      {!activeSession ? (
        <>
          {/* Top Two Cards: Technical Round & HR Round matching screenshot 594ae20d */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Round Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Technical Round</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {interviewSessions.filter((s) => s.type === 'Technical').length + 3} sessions completed • Avg Score:{' '}
                  <span className="font-semibold text-slate-800">8.2/10</span>
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => setIsAiDrawerOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#f5b84c] hover:bg-[#e6a83a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Your Resume</span>
                </button>

                <button
                  onClick={() => handleStartSession('Technical')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Start Technical Session</span>
                </button>
              </div>
            </div>

            {/* HR Round Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">HR Round</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {interviewSessions.filter((s) => s.type === 'HR').length + 2} sessions completed • Avg Score:{' '}
                  <span className="font-semibold text-slate-800">8.8/10</span>
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => setIsAiDrawerOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#f5b84c] hover:bg-[#e6a83a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Your Resume</span>
                </button>

                <button
                  onClick={() => handleStartSession('HR')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Start HR Session</span>
                </button>
              </div>
            </div>
          </div>

          {/* Schedule with AI Mentor Card matching screenshot 594ae20d */}
          <div className="bg-white rounded-2xl p-7 border border-[#8ea755]/40 shadow-xs space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#8ea755]">Schedule with AI Mentor</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Book a personalized 1-on-1 mock interview session with our AI mentor. Get real-time
                feedback, insights on your strengths, and targeted recommendations for improvement. Perfect
                for last-minute interview prep!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#fcf8f2] border border-[#e8decb] space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8ea755]" />
                <span>Personalized feedback based on your profile & target role</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8ea755]" />
                <span>Industry-relevant questions tailored to Google, Microsoft, Amazon & Startups</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8ea755]" />
                <span>Performance analysis and improvement strategies</span>
              </div>
            </div>

            <button
              onClick={() => handleStartSession('Technical')}
              className="w-full py-3 px-4 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#8ea755]/20 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Meeting / Start Live Simulation</span>
            </button>
          </div>
        </>
      ) : (
        /* Live Interactive Session View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-[#8ea755] uppercase tracking-wider">
                {activeSession.round} Round In Progress
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Target Role: {user.targetRole}
              </h3>
            </div>
            <button
              onClick={() => setActiveSession(null)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Exit Session
            </button>
          </div>

          {/* Question Card */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              Interviewer Prompt:
            </span>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              "{activeSession.questions[activeSession.questionIndex]}"
            </p>
          </div>

          {/* Candidate Answer Box */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Your Answer (type your response clearly, as you would speak in an interview):
            </label>
            <textarea
              rows={5}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="e.g. When architecting authentication with JWT, the client first sends user credentials over HTTPS. The server issues a cryptographically signed token containing claims..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8ea755]/20 focus:border-[#8ea755] transition-all"
            />
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              AI will evaluate correctness, clarity, and key strengths.
            </span>
            <button
              onClick={handleEvaluateAnswer}
              disabled={!userAnswer.trim() || isEvaluating}
              className="px-6 py-2.5 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-[#8ea755]/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Evaluating with AI...' : 'Submit Answer for Feedback'}</span>
            </button>
          </div>

          {/* Evaluation Scorecard */}
          {evaluationResult && (
            <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-900">AI Interview Evaluation</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                  Score: {evaluationResult.score}/10
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-indigo-700 mb-1">Technical Accuracy:</p>
                  <p className="text-slate-700">{evaluationResult.technicalAccuracy}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-indigo-700 mb-1">Communication Clarity:</p>
                  <p className="text-slate-700">{evaluationResult.communicationClarity}</p>
                </div>
              </div>

              {/* Key Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-emerald-700">Key Strengths:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                    {evaluationResult.keyStrengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-amber-700">Areas for Improvement:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                    {evaluationResult.suggestedImprovements?.map((imp: string, i: number) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Answer */}
              {evaluationResult.modelAnswer && (
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-slate-900 mb-1">Recommended Model Answer:</p>
                  <p className="text-slate-600 leading-relaxed">{evaluationResult.modelAnswer}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setUserAnswer('');
                    setEvaluationResult(null);
                    if (activeSession.questionIndex < activeSession.questions.length - 1) {
                      setActiveSession((prev) =>
                        prev ? { ...prev, questionIndex: prev.questionIndex + 1 } : null
                      );
                    } else {
                      setActiveSession(null);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {activeSession.questionIndex < activeSession.questions.length - 1
                    ? 'Next Question →'
                    : 'Complete Session'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
