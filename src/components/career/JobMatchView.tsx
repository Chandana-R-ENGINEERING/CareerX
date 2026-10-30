import React from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JobMatchView: React.FC = () => {
  const { user, setActiveTab, setIsAiDrawerOpen } = useApp();

  const matchedSkills = [
    { name: 'React.js & Hooks', level: 'Advanced', weight: 20 },
    { name: 'Node.js & Express', level: 'Intermediate', weight: 20 },
    { name: 'JavaScript ES6+', level: 'Advanced', weight: 15 },
    { name: 'MongoDB & Mongoose', level: 'Intermediate', weight: 15 },
    { name: 'RESTful API Design', level: 'Intermediate', weight: 10 },
  ];

  const missingSkills = [
    {
      name: 'TypeScript',
      importance: 'High',
      recommendation: 'Add strict typing to your Express backend and React component props.',
      actionTab: 'coding',
    },
    {
      name: 'Docker & Containerization',
      importance: 'Medium',
      recommendation: 'Write a Dockerfile and docker-compose.yml for your full-stack project.',
      actionTab: 'skills-roadmap',
    },
    {
      name: 'Redis Caching & In-Memory Stores',
      importance: 'Medium',
      recommendation: 'Implement Redis caching to reduce database read latencies.',
      actionTab: 'skills-roadmap',
    },
    {
      name: 'Automated Unit & Integration Testing',
      importance: 'High',
      recommendation: 'Write 5 test suites using Vitest and Supertest.',
      actionTab: 'coding',
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Job Match & Skill Gap Matrix
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Benchmarking your resume profile against hiring expectations for{' '}
          <strong className="text-slate-800">{user.targetRole}</strong>.
        </p>
      </div>

      {/* Target Role Match Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            Role Benchmark
          </span>
          <h3 className="text-2xl font-bold mt-2">{user.targetRole}</h3>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
            You match <strong className="text-white">78%</strong> of typical campus hiring requirements for
            product companies and high-growth tech startups.
          </p>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-indigo-900 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Ask AI for Tailored Plan</span>
        </button>
      </div>

      {/* Two Column Layout: Matched Skills vs Identified Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Verified Proficiencies ({matchedSkills.length})</span>
            </h4>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Satisfies 78%
            </span>
          </div>

          <div className="space-y-3">
            {matchedSkills.map((s) => (
              <div
                key={s.name}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Proficiency: {s.level}</p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-600">+{s.weight}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills & Recommendations */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Priority Skill Gaps ({missingSkills.length})</span>
            </h4>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Needs Attention
            </span>
          </div>

          <div className="space-y-3">
            {missingSkills.map((m) => (
              <div
                key={m.name}
                className="p-3.5 rounded-2xl border border-amber-200/70 bg-amber-50/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">{m.name}</p>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      m.importance === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {m.importance} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{m.recommendation}</p>

                <button
                  onClick={() => setActiveTab(m.actionTab as any)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Practice in {m.actionTab === 'coding' ? 'Coding Zone' : 'Roadmap'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
