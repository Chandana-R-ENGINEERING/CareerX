import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { AiAssistantDrawer } from './components/layout/AiAssistantDrawer';
import { AuthModal } from './components/layout/AuthModal';

import { DashboardView } from './components/dashboard/DashboardView';
import { JobsView } from './components/career/JobsView';
import { JobMatchView } from './components/career/JobMatchView';
import { ApplicationsView } from './components/career/ApplicationsView';

import { AptitudeArenaView } from './components/prepare/AptitudeArenaView';
import { CodingZoneView } from './components/prepare/CodingZoneView';
import { MockInterviewView } from './components/prepare/MockInterviewView';
import { CommunicationPracticeView } from './components/prepare/CommunicationPracticeView';

import { ResumeBuilderView } from './components/build/ResumeBuilderView';
import { ResumeAnalyzerView } from './components/build/ResumeAnalyzerView';
import { SkillsProfileView } from './components/build/SkillsProfileView';
import { RoadmapView } from './components/build/RoadmapView';

import { LeaderboardView } from './components/community/LeaderboardView';
import { PlacementInsightsView } from './components/community/PlacementInsightsView';

const MainLayout: React.FC = () => {
  const { activeTab, isAiDrawerOpen, setIsAiDrawerOpen, toasts } = useApp();

  // Keyboard shortcut Cmd/Ctrl + K to open AI Assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsAiDrawerOpen(!isAiDrawerOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAiDrawerOpen, setIsAiDrawerOpen]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'jobs':
        return <JobsView />;
      case 'job-match':
        return <JobMatchView />;
      case 'applications':
        return <ApplicationsView />;
      case 'aptitude':
        return <AptitudeArenaView />;
      case 'coding':
        return <CodingZoneView />;
      case 'interview':
        return <MockInterviewView />;
      case 'communication':
        return <CommunicationPracticeView />;
      case 'resume-builder':
        return <ResumeBuilderView />;
      case 'resume-analyzer':
        return <ResumeAnalyzerView />;
      case 'skills':
        return <SkillsProfileView />;
      case 'skills-roadmap':
        return <RoadmapView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'placement-insights':
        return <PlacementInsightsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f3f6fb] font-sans antialiased text-slate-800">
      {/* Dark Navy Sidebar */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <TopHeader />

        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
          {renderActiveView()}
        </main>
      </div>

      {/* Slide-out AI Assistant Drawer */}
      <AiAssistantDrawer />

      {/* Sign In / Sign Up Modal */}
      <AuthModal />

      {/* Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          const bgColors = {
            success: 'bg-emerald-600 text-white shadow-emerald-600/30',
            info: 'bg-indigo-600 text-white shadow-indigo-600/30',
            warning: 'bg-amber-600 text-white shadow-amber-600/30',
            error: 'bg-rose-600 text-white shadow-rose-600/30',
          };

          return (
            <div
              key={toast.id}
              className={`px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold pointer-events-auto transition-all animate-in slide-in-from-bottom duration-200 ${
                bgColors[toast.type]
              }`}
            >
              {toast.message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
