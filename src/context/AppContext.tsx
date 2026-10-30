import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  ViewTab,
  JobApplication,
  JobListing,
  AptitudeTestResult,
  MockInterviewSession,
} from '../types';
import {
  initialUserProfile,
  initialApplications,
  sampleJobs,
} from '../data/seedData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'signin' | 'signup';
  setAuthMode: (mode: 'signin' | 'signup') => void;
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id'>) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  solvedProblemIds: string[];
  markProblemSolved: (problemId: string) => void;
  aptitudeResults: AptitudeTestResult[];
  recordAptitudeResult: (result: AptitudeTestResult) => void;
  interviewSessions: MockInterviewSession[];
  recordInterviewSession: (session: MockInterviewSession) => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  isDemoUser: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence via localStorage for authentic session continuity
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('careerx_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Amareswar' || parsed.email === 'amareswar@gcek.ac.in') {
          parsed.name = 'Chandana';
          parsed.email = 'chandana@gcek.ac.in';
          localStorage.setItem('careerx_user', JSON.stringify(parsed));
        }
        return parsed;
      }
      return initialUserProfile;
    } catch {
      return initialUserProfile;
    }
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isDemoUser, setIsDemoUser] = useState(true);

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('careerx_applications');
      return saved ? JSON.parse(saved) : initialApplications;
    } catch {
      return initialApplications;
    }
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('careerx_saved_jobs');
      return saved ? JSON.parse(saved) : ['job_1', 'job_4'];
    } catch {
      return ['job_1', 'job_4'];
    }
  });

  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('careerx_solved_problems');
      return saved ? JSON.parse(saved) : ['code_p1'];
    } catch {
      return ['code_p1'];
    }
  });

  const [aptitudeResults, setAptitudeResults] = useState<AptitudeTestResult[]>(() => {
    try {
      const saved = localStorage.getItem('careerx_aptitude_results');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [interviewSessions, setInterviewSessions] = useState<MockInterviewSession[]>(() => {
    try {
      const saved = localStorage.getItem('careerx_interview_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('careerx_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('careerx_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('careerx_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('careerx_solved_problems', JSON.stringify(solvedProblemIds));
  }, [solvedProblemIds]);

  useEffect(() => {
    localStorage.setItem('careerx_aptitude_results', JSON.stringify(aptitudeResults));
  }, [aptitudeResults]);

  useEffect(() => {
    localStorage.setItem('careerx_interview_sessions', JSON.stringify(interviewSessions));
  }, [interviewSessions]);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addApplication = (appData: Omit<JobApplication, 'id'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `app_${Date.now()}`,
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application to ${appData.company} tracked successfully!`, 'success');
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    showToast(`Application status updated to ${status}`, 'info');
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      showToast(exists ? 'Job removed from saved' : 'Job bookmarked to saved list', 'info');
      return updated;
    });
  };

  const markProblemSolved = (problemId: string) => {
    if (!solvedProblemIds.includes(problemId)) {
      setSolvedProblemIds((prev) => [...prev, problemId]);
      setUser((prev) => {
        const newSolvedCount = prev.dailyGoalSolved + 1;
        const newScore = Math.min(99, prev.readinessScore + 2);
        return {
          ...prev,
          readinessScore: newScore,
          dailyGoalSolved: newSolvedCount,
          scores: {
            ...prev.scores,
            experienceProjects: Math.min(20, prev.scores.experienceProjects + 1),
          },
        };
      });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      showToast('Coding challenge accepted! Readiness score increased +2 pts 🚀', 'success');
    }
  };

  const recordAptitudeResult = (result: AptitudeTestResult) => {
    setAptitudeResults((prev) => [result, ...prev]);
    if (result.scorePercentage >= 60) {
      setUser((prev) => ({
        ...prev,
        readinessScore: Math.min(99, prev.readinessScore + 1),
        scores: {
          ...prev.scores,
          targetRoleMatch: Math.min(25, prev.scores.targetRoleMatch + 1),
        },
      }));
      showToast(`Aptitude test completed: ${result.scorePercentage}% score!`, 'success');
    } else {
      showToast(`Aptitude test completed: ${result.scorePercentage}%. Review explanations below!`, 'info');
    }
  };

  const recordInterviewSession = (session: MockInterviewSession) => {
    setInterviewSessions((prev) => [session, ...prev]);
    setUser((prev) => ({
      ...prev,
      readinessScore: Math.min(99, prev.readinessScore + 3),
      scores: {
        ...prev.scores,
        interviewReadiness: Math.min(15, prev.scores.interviewReadiness + 2),
      },
    }));
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    showToast(`Mock Interview evaluated! Average score: ${session.score}/10`, 'success');
  };

  const loginUser = (email: string, name?: string) => {
    setUser({
      ...initialUserProfile,
      email,
      name: name || (email.includes('@') ? email.split('@')[0] : 'Student'),
    });
    setIsDemoUser(false);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${name || 'Student'}!`, 'success');
  };

  const logoutUser = () => {
    setUser({
      ...initialUserProfile,
      name: 'Guest User',
      email: 'guest@careerx.ai',
      readinessScore: 50,
      scores: {
        resumeSkills: 15,
        targetRoleMatch: 12,
        experienceProjects: 10,
        interviewReadiness: 8,
        profileCompleteness: 5,
      },
    });
    setIsDemoUser(true);
    showToast('Signed out of CareerX', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activeTab,
        setActiveTab,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        applications,
        addApplication,
        updateApplicationStatus,
        savedJobIds,
        toggleSaveJob,
        solvedProblemIds,
        markProblemSolved,
        aptitudeResults,
        recordAptitudeResult,
        interviewSessions,
        recordInterviewSession,
        toasts,
        showToast,
        loginUser,
        logoutUser,
        isDemoUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
