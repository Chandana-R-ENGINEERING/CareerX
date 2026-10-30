export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  batch: string;
  targetRole: string;
  avatarUrl?: string;
  readinessScore: number;
  streakDays: number;
  dailyGoalSolved: number;
  dailyGoalTarget: number;
  scores: {
    resumeSkills: number; // max 30
    targetRoleMatch: number; // max 25
    experienceProjects: number; // max 20
    interviewReadiness: number; // max 15
    profileCompleteness: number; // max 10
  };
}

export type ViewTab =
  | 'dashboard'
  | 'jobs'
  | 'job-match'
  | 'applications'
  | 'aptitude'
  | 'coding'
  | 'interview'
  | 'communication'
  | 'resume-builder'
  | 'resume-analyzer'
  | 'skills'
  | 'skills-roadmap'
  | 'leaderboard'
  | 'placement-insights';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  status: 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Rejected';
  location: string;
  logoLetter: string;
  logoBg: string;
  salary: string;
  notes?: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  type: 'Internship' | 'Full-time';
  stipendOrSalary: string;
  experience: string;
  deadline: string;
  matchScore: number;
  skillsRequired: string[];
  description: string;
  eligibility: string;
  verified: boolean;
  postedDate: string;
}

export interface AptitudeQuestion {
  id: string;
  category: 'Quantitative' | 'Logical' | 'Verbal';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  formula?: string;
}

export interface AptitudeTestResult {
  category: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  completedAt: string;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface CodingTestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companyTags: string[];
  acceptanceRate: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    [language: string]: string;
  };
  testCases: CodingTestCase[];
  hints: string[];
  solutionExplanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface MockInterviewSession {
  id: string;
  role: string;
  type: 'Technical' | 'HR' | 'DSA' | 'Project' | 'Role-Specific';
  date: string;
  score: number;
  totalQuestions: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  qaPairs: {
    question: string;
    userAnswer: string;
    aiFeedback: string;
    score: number;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  batch: string;
  overallScore: string;
  college: string;
  codingPoints: number;
  aptitudePoints: number;
  badges: string[];
  isCurrentUser?: boolean;
}

export interface RoadmapStep {
  id: string;
  week: number;
  title: string;
  topic: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  tasks: {
    title: string;
    type: 'aptitude' | 'coding' | 'reading' | 'project';
    completed: boolean;
  }[];
}
