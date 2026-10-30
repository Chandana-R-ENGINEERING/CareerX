import React, { useState } from 'react';
import {
  MessageCircle,
  Mic,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommunicationPracticeView: React.FC = () => {
  const { user, setIsAiDrawerOpen } = useApp();

  const [activeDrill, setActiveDrill] = useState<number>(0);
  const [candidateSpeech, setCandidateSpeech] = useState('');
  const [feedback, setFeedback] = useState<any>(null);

  const drills = [
    {
      title: 'The 90-Second Elevator Pitch ("Tell me about yourself")',
      formula: 'Present (Current degree & stack) → Past (Key project achievement) → Future (Why this role & company)',
      samplePrompt:
        'Tell me about yourself, your technical background, and what drives your passion for software development.',
      modelAnswer:
        "I'm Chandana, a final year Computer Science student at GCEK passionate about scalable web architecture. Recently, I built an online e-commerce system using the MERN stack with JWT authentication and optimized MongoDB queries, improving response times by 35%. I'm excited about this opportunity because your team's engineering standards align directly with my goal of creating high-availability consumer tech.",
      keyChecklist: [
        'Keep under 90 seconds (concise and structured)',
        'Mention at least one concrete project with metric impact',
        'Directly connect your background to the target company',
      ],
    },
    {
      title: 'STAR Method: Overcoming a Complex Technical Bug',
      formula: 'Situation (Context) → Task (Goal) → Action (What you did) → Result (Outcome & Learnings)',
      samplePrompt:
        'Describe a situation where code broke in production or during an evaluation. How did you diagnose and solve it?',
      modelAnswer:
        'During our semester final deployment, our API started timing out under load due to an unindexed database collection. As lead backend developer, I isolated the slow queries using MongoDB explain plans and implemented compound indices alongside Redis caching for hot product keys. This reduced query latency from 1.2s to 45ms and allowed the application to handle 500+ concurrent requests.',
      keyChecklist: [
        'Never blame teammates or tools',
        'State technical diagnostic steps clearly',
        'Highlight measurable outcome (latency reduction, tests passed)',
      ],
    },
    {
      title: 'Explaining System Design & Trade-offs to Non-Technical Interviewers',
      formula: 'Analogy → Architectural Decision → Practical Business Benefit',
      samplePrompt:
        'Why would a company migrate from a traditional relational database (Postgres) to a document store (MongoDB), or vice-versa?',
      modelAnswer:
        'Think of a relational database like an organized spreadsheet where every row strictly adheres to fixed columns—ideal for financial ledgers where ACID consistency is non-negotiable. A document database like MongoDB is more like digital filing folders where documents can evolve flexible schemas rapidly, making it great for catalogs or prototyping.',
      keyChecklist: [
        'Use intuitive real-world metaphors',
        'Explain both pros and cons honestly',
        'Conclude with the business rationale',
      ],
    },
  ];

  const currentDrill = drills[activeDrill];

  const handleEvaluateSpeech = () => {
    if (!candidateSpeech.trim()) return;

    const length = candidateSpeech.trim().split(/\s+/).length;
    setFeedback({
      wordCount: length,
      clarityScore: length >= 40 && length <= 150 ? 'Excellent (Optimal Length)' : 'Needs Pacing Adjustment',
      strengths: [
        'Logical flow from introductory context to resolution',
        'Used professional engineering terminology',
      ],
      improvementTip:
        'Ensure you articulate numbers and measurable impact (e.g. percentages, user counts) to sound even more authoritative.',
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Placement Communication Drills
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Master the behavioral, STAR method, and spoken communication rounds for top campus recruiters.
          </p>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Practice Live with AI Voice Coach</span>
        </button>
      </div>

      {/* Drill Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {drills.map((d, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveDrill(idx);
              setCandidateSpeech('');
              setFeedback(null);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeDrill === idx
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Drill {idx + 1}: {d.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Drill Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Framework: {currentDrill.formula}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{currentDrill.title}</h3>
        </div>

        {/* Prompt */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
          <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
            Interviewer Asks:
          </p>
          <p className="text-sm sm:text-base font-bold text-slate-900">
            "{currentDrill.samplePrompt}"
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700">Recruiter Evaluation Checklist:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentDrill.keyChecklist.map((c, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Practice Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Practice Your Spoken Answer (Type or Dictate):
          </label>
          <textarea
            rows={5}
            value={candidateSpeech}
            onChange={(e) => setCandidateSpeech(e.target.value)}
            placeholder="Structure your answer following the recommended formula..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        {/* Submit & Model Answer buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setCandidateSpeech(currentDrill.modelAnswer)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Load Verified Model Answer Example
          </button>

          <button
            onClick={handleEvaluateSpeech}
            disabled={!candidateSpeech.trim()}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Communication Quality</span>
          </button>
        </div>

        {/* Feedback Display */}
        {feedback && (
          <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 text-xs space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900">Communication Assessment:</span>
              <span className="font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                {feedback.clarityScore} ({feedback.wordCount} words)
              </span>
            </div>

            <p className="text-slate-700">
              <strong>Tip:</strong> {feedback.improvementTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
