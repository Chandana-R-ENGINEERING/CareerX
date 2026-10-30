import React, { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { codingProblemsBank } from '../../data/seedData';
import { useApp } from '../../context/AppContext';
import { CodingProblem } from '../../types';
import { runCodeSandbox } from '../../services/api';

export const CodingZoneView: React.FC = () => {
  const { solvedProblemIds, markProblemSolved, setIsAiDrawerOpen } = useApp();

  const [activeMainTab, setActiveMainTab] = useState<'challenges' | 'mooc'>('challenges');
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblemsBank[0]);
  const [code, setCode] = useState(
    codingProblemsBank[0].starterCode[selectedLanguage] || codingProblemsBank[0].starterCode['javascript']
  );
  const [activeTab, setActiveTab] = useState<'description' | 'solution' | 'submissions'>('description');
  const [showHintIndex, setShowHintIndex] = useState(-1);

  // Runner state
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const handleSelectProblem = (p: CodingProblem) => {
    setSelectedProblem(p);
    setCode(p.starterCode[selectedLanguage] || p.starterCode['javascript'] || '');
    setExecutionResult(null);
    setShowHintIndex(-1);
  };

  const handleLanguageChange = (lang: 'javascript' | 'python' | 'cpp' | 'java') => {
    setSelectedLanguage(lang);
    if (selectedProblem.starterCode[lang]) {
      setCode(selectedProblem.starterCode[lang]);
    }
  };

  const handleRunCode = async (isSubmission = false) => {
    setIsRunning(true);
    setExecutionResult(null);

    const result = await runCodeSandbox(selectedLanguage, code, selectedProblem.testCases);
    setExecutionResult(result);
    setIsRunning(false);

    if (result.allPassed && isSubmission) {
      markProblemSolved(selectedProblem.id);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header matching SkillUp screenshot 6d888499 */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2a241e] tracking-tight">
          Coding Zone
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Solve coding challenges and master programming languages with video tutorials.
        </p>
      </div>

      {/* Main Switcher: Coding Challenges vs MOOC Courses */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveMainTab('challenges')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeMainTab === 'challenges'
              ? 'bg-[#8ea755] text-white shadow-md shadow-[#8ea755]/25'
              : 'bg-[#fcf8f2] hover:bg-[#f3ece0] text-slate-700 border border-[#e8decb]'
          }`}
        >
          Coding Challenges
        </button>
        <button
          onClick={() => setActiveMainTab('mooc')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeMainTab === 'mooc'
              ? 'bg-[#8ea755] text-white shadow-md shadow-[#8ea755]/25'
              : 'bg-[#fcf8f2] hover:bg-[#f3ece0] text-slate-700 border border-[#e8decb]'
          }`}
        >
          MOOC Courses
        </button>
      </div>

      {/* Language Selector Bar matching screenshot */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <p className="text-xs font-bold text-slate-700 mb-2.5">Select Programming Language</p>
        <div className="flex flex-wrap gap-2.5">
          {(
            [
              { id: 'python', label: 'Python' },
              { id: 'java', label: 'Java' },
              { id: 'cpp', label: 'C++' },
              { id: 'javascript', label: 'JavaScript' },
              { id: 'c', label: 'C' },
              { id: 'sql', label: 'SQL' },
            ] as const
          ).map((item) => {
            const isSelected = selectedLanguage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLanguageChange(item.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8ea755] text-white shadow-sm'
                    : 'bg-[#fcf8f2] hover:bg-[#f3ece0] text-slate-700 border border-[#e8decb]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Level Cards (Easy 45, Medium 32, Hard 18) matching screenshot 6d888499 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs text-center flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#8ea755]">Easy Problems</h4>
            <p className="text-2xl font-extrabold text-slate-900 mt-2">45 problems</p>
          </div>
          <button
            onClick={() => handleSelectProblem(codingProblemsBank[0])}
            className="mt-4 w-full py-2.5 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Start Solving
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs text-center flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-amber-500">Medium Problems</h4>
            <p className="text-2xl font-extrabold text-slate-900 mt-2">32 problems</p>
          </div>
          <button
            onClick={() => handleSelectProblem(codingProblemsBank[2])}
            className="mt-4 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Start Solving
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs text-center flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-rose-500">Hard Problems</h4>
            <p className="text-2xl font-extrabold text-slate-900 mt-2">18 problems</p>
          </div>
          <button
            onClick={() => handleSelectProblem(codingProblemsBank[1])}
            className="mt-4 w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Start Solving
          </button>
        </div>
      </div>

      {/* Active Problem Workspace: Split Pane (Problem Description on Left, Editor + Runner on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Pane: Problem Description & TestCases (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col h-[750px] overflow-hidden">
          {/* Quick Problem Switcher */}
          <div className="flex gap-1.5 overflow-x-auto pb-3 border-b border-slate-100 scrollbar-none">
            {codingProblemsBank.map((p) => {
              const isSelected = selectedProblem.id === p.id;
              const isSolved = solvedProblemIds.includes(p.id);

              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectProblem(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSolved && <span className="text-emerald-400">✓</span>}
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Problem Details */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">{selectedProblem.title}</h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  selectedProblem.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {selectedProblem.difficulty}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedProblem.companyTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[11px] font-medium">
                {selectedProblem.category}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {selectedProblem.description}
            </div>

            {/* Examples */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Examples:</h4>
              {selectedProblem.examples.map((ex, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-mono">
                  <p>
                    <strong className="text-slate-900">Input:</strong> {ex.input}
                  </p>
                  <p className="mt-1">
                    <strong className="text-slate-900">Output:</strong> {ex.output}
                  </p>
                  {ex.explanation && (
                    <p className="mt-1 text-slate-500 font-sans">
                      <em>{ex.explanation}</em>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Constraints:</h4>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1 font-mono">
                {selectedProblem.constraints.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Progressive Hints */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Hints & Complexity</span>
                </span>
                <button
                  onClick={() => setShowHintIndex((prev) => (prev < selectedProblem.hints.length - 1 ? prev + 1 : prev))}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Unlock Next Hint ({showHintIndex + 1}/{selectedProblem.hints.length})
                </button>
              </div>

              {showHintIndex >= 0 && (
                <div className="mt-2 space-y-2">
                  {selectedProblem.hints.slice(0, showHintIndex + 1).map((h, idx) => (
                    <p key={idx} className="p-2.5 rounded-lg bg-indigo-50/60 text-xs text-indigo-900 border border-indigo-100">
                      <strong>Hint {idx + 1}:</strong> {h}
                    </p>
                  ))}
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">
                    Expected: {selectedProblem.timeComplexity} Time, {selectedProblem.spaceComplexity} Space
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Pane: Code Editor + Real-Time Execution Runner (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col h-[750px] overflow-hidden text-slate-200 font-mono">
          {/* Editor Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Solution ({selectedLanguage.toUpperCase()})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCode(selectedProblem.starterCode[selectedLanguage] || '')}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsAiDrawerOpen(true)}
                className="text-xs text-indigo-300 hover:text-indigo-200 px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-800/80 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Ask AI Debugger</span>
              </button>
            </div>
          </div>

          {/* Editor Textarea */}
          <div className="flex-1 my-3 bg-[#0b1120] rounded-xl p-3 border border-slate-800/90 overflow-hidden flex flex-col">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-1 bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none scrollbar-thin scrollbar-thumb-slate-800"
              spellCheck="false"
            />
          </div>

          {/* Runner Terminal Console / Results */}
          {executionResult && (
            <div className="p-3.5 mb-3 bg-[#0b1120] border border-slate-800 rounded-xl text-xs space-y-2 max-h-48 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span
                  className={`font-bold flex items-center gap-1.5 ${
                    executionResult.allPassed ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {executionResult.allPassed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span>{executionResult.status}</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Runtime: {executionResult.executionTimeMs} ms • Memory: {executionResult.memoryUsageMb}
                </span>
              </div>

              {executionResult.results?.map((r: any) => (
                <div
                  key={r.caseNumber}
                  className={`p-2 rounded font-mono text-[11px] border ${
                    r.passed ? 'border-emerald-900/60 bg-emerald-950/30' : 'border-rose-900/60 bg-rose-950/30'
                  }`}
                >
                  <p>
                    <span className="text-slate-400">Test Case {r.caseNumber}:</span> Input: {r.input}
                  </p>
                  <p>
                    <span className="text-slate-400">Expected:</span> {r.expectedOutput} |{' '}
                    <span className="text-slate-400">Got:</span> {r.actualOutput}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons: Run Code & Submit */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400">
              Safe execution sandbox with automated assertion testing
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleRunCode(false)}
                disabled={isRunning}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Code</span>
              </button>

              <button
                onClick={() => handleRunCode(true)}
                disabled={isRunning}
                className="px-5 py-2.5 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#8ea755]/25 transition-all cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Submit Solution</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
