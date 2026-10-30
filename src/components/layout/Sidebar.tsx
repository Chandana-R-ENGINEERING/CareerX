import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FileEdit,
  FileText,
  Target,
  Layers,
  Video,
  MessageCircle,
  Code2,
  Compass,
  Brain,
  Terminal,
  Trophy,
  TrendingUp,
  Sparkles,
  LogIn,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewTab } from '../../types';

interface NavItem {
  id: ViewTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsAiDrawerOpen,
    setIsAuthModalOpen,
    setAuthMode,
    user,
    logoutUser,
    isDemoUser,
  } = useApp();

  const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileEdit },
    { id: 'resume-analyzer', label: 'Resume', icon: FileText },
    { id: 'job-match', label: 'Job Match', icon: Target },
    { id: 'applications', label: 'Applications', icon: Layers },
    { id: 'interview', label: 'Interview', icon: Video },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'skills-roadmap', label: 'Skills Roadmap', icon: Compass },
    { id: 'aptitude', label: 'Aptitude Arena', icon: Brain, badge: 'Tests' },
    { id: 'coding', label: 'Coding Zone', icon: Terminal, badge: 'DSA' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'placement-insights', label: 'Placement Insight', icon: TrendingUp },
  ];

  return (
    <aside className="w-64 bg-[#0b1120] text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800/80 select-none z-30 font-sans">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            CareerAI
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              X
            </span>
          </span>
          <p className="text-[11px] text-slate-400 font-medium">Placement Intelligence</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Main Navigation
        </div>

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && !isActive && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-3.5 border-t border-slate-800/80 space-y-2.5 bg-[#080d19]/60">
        {/* AI Assistant Shortcut Button */}
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/70 text-slate-200 text-sm font-medium transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <span className="group-hover:text-white">AI Assistant</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </span>
        </button>

        {/* User / Sign In Button */}
        {isDemoUser ? (
          <button
            onClick={() => {
              setAuthMode('signin');
              setIsAuthModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Sign Up</span>
          </button>
        ) : (
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logoutUser}
              title="Sign Out"
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
