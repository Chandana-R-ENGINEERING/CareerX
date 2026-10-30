import React, { useState } from 'react';
import { Search, Sparkles, Bell, User, Check, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopHeader: React.FC = () => {
  const {
    activeTab,
    setIsAiDrawerOpen,
    setIsAuthModalOpen,
    setAuthMode,
    user,
    isDemoUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'jobs':
        return 'Discover Jobs';
      case 'resume-builder':
        return 'Resume Builder';
      case 'resume-analyzer':
        return 'Resume ATS Scanner';
      case 'job-match':
        return 'Job Match & Gap Analysis';
      case 'applications':
        return 'Application Tracker';
      case 'interview':
        return 'Mock Interview Simulator';
      case 'communication':
        return 'Communication Practice';
      case 'skills':
        return 'Skills Profile';
      case 'skills-roadmap':
        return 'Skills Roadmap';
      case 'aptitude':
        return 'AI-Powered Aptitude Arena';
      case 'coding':
        return 'Coding Zone';
      case 'leaderboard':
        return 'Leaderboard';
      case 'placement-insights':
        return 'Placement Insights';
      default:
        return 'CareerAI';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{getTitle()}</h1>
        {user.streakDays > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{user.streakDays} Day Streak</span>
          </div>
        )}
      </div>

      {/* Search Input Bar (matching screenshot with 'Google' placeholder or search) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search internships, companies, DSA questions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Ask AI Pill Button */}
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 border border-indigo-200/80 text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Ask AI</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-sm">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="font-bold text-slate-900">Notifications</span>
                <span className="text-xs text-indigo-600 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 transition-colors">
                  <p className="text-xs font-semibold text-slate-900">Google SDE Intern Update</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Round 1 scheduled on Friday. Prep tips ready!</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 transition-colors">
                  <p className="text-xs font-semibold text-slate-900">Daily Goal Reminder</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Solve 2 more questions to finish today's goal.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Sign In */}
        {isDemoUser ? (
          <button
            onClick={() => {
              setAuthMode('signin');
              setIsAuthModalOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>Sign In</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5 pl-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-100">
              {user.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" /> Verified Student
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
