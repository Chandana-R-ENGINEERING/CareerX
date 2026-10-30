import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Clock,
  Award,
  XCircle,
  Search,
  FileCheck2,
  Video,
  Compass,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const { user, applications, setActiveTab, setIsAiDrawerOpen } = useApp();

  // Calculate metrics
  const totalApplications = applications.length;
  const totalInterviews = applications.filter((a) => a.status === 'Interview').length;
  const totalOffers = applications.filter((a) => a.status === 'Offer').length;
  const totalRejected = applications.filter((a) => a.status === 'Rejected').length;

  // Donut chart calculations (circumference for radius = 45 is 2 * PI * 45 = 282.74)
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (user.readinessScore / 100) * circumference;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Greeting Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Good Morning Chandana <span className="text-2xl">👋</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">Build your dream career, one step at a time.</p>
      </div>

      {/* Top Row: Readiness Donut Card + Next Best Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Career Readiness Card (7 cols) */}
        <div className="lg:col-span-6 xl:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          {/* Circular Donut Progress */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Emerald/Teal Progress Arc matching screenshot */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-emerald-500 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              {/* Score inside Donut */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900">{user.readinessScore}</span>
                <span className="text-[11px] font-semibold text-slate-400">/ 100</span>
              </div>
            </div>

            {/* Score & Normalized badge below circle */}
            <div className="mt-2 text-center">
              <span className="text-lg font-bold text-slate-900">{user.readinessScore}</span>
              <span className="text-xs text-slate-400 font-medium">/100</span>
              <div className="mt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                  Normalized & Grounded
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Progress Bars on right */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Career Readiness
              </span>
              <span className="text-xs font-bold text-indigo-600">{user.readinessScore}/100 Total</span>
            </div>

            {/* Resume Skills (max 30) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Resume Skills</span>
                <span className="text-slate-500">{user.scores.resumeSkills}/30</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(user.scores.resumeSkills / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* Target Role Match (max 25) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Target Role Match</span>
                <span className="text-slate-500">{user.scores.targetRoleMatch}/25</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-sky-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(user.scores.targetRoleMatch / 25) * 100}%` }}
                />
              </div>
            </div>

            {/* Experience / Projects (max 20) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Experience / Projects</span>
                <span className="text-slate-500">{user.scores.experienceProjects}/20</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(user.scores.experienceProjects / 20) * 100}%` }}
                />
              </div>
            </div>

            {/* Interview Readiness (max 15) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Interview Readiness</span>
                <span className="text-slate-500">{user.scores.interviewReadiness}/15</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(user.scores.interviewReadiness / 15) * 100}%` }}
                />
              </div>
            </div>

            {/* Profile Completeness (max 10) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Profile Completeness</span>
                <span className="text-slate-500">{user.scores.profileCompleteness}/10</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(user.scores.profileCompleteness / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Next Best Action Card (5 cols) matching screenshot */}
        <div className="lg:col-span-6 xl:col-span-7 bg-gradient-to-br from-indigo-50/70 via-white to-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-4 h-4" />
              <span>Your Next Best Action</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Address identified skill gaps for {user.targetRole}.
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
              Target role: <strong className="text-slate-800">{user.targetRole}</strong>. Benchmark your real
              resume skills against hiring expectations to elevate your placement readiness.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('job-match')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <span>View Skill Gap</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="px-4 py-3 rounded-xl border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              Ask Mentor for Action Plan
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Four Metrics Cards (Applications 24, Interviews 5, Offers 1, Rejected 8) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Applications */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Applications</p>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">24</p>
          </div>
        </div>

        {/* Interviews */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Interviews</p>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">5</p>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Offers</p>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">1</p>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Rejected</p>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">8</p>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Applications (Left) + Quick Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Applications (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Recent Applications</h3>
            <button
              onClick={() => setActiveTab('applications')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              View all →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {applications.slice(0, 3).map((app) => {
              const statusColors = {
                Interview: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                Applied: 'bg-blue-50 text-blue-700 border-blue-200',
                Assessment: 'bg-amber-50 text-amber-700 border-amber-200',
                Offer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                Rejected: 'bg-slate-100 text-slate-600 border-slate-200',
              };

              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${app.logoBg}`}
                    >
                      {app.logoLetter}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{app.company}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.role} • Applied • {app.appliedDate}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions (5 cols) matching screenshot */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100">
            Quick Actions
          </h3>

          <div className="mt-4 space-y-3">
            <button
              onClick={() => setActiveTab('jobs')}
              className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Find Jobs
                </p>
                <p className="text-[11px] text-slate-500">Explore 1000+ opportunities</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('resume-analyzer')}
              className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Check Resume ATS Score
                </p>
                <p className="text-[11px] text-slate-500">Get detailed feedback</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Start AI Interview
                </p>
                <p className="text-[11px] text-slate-500">Practice with real companies</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('skills-roadmap')}
              className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  View Career Roadmap
                </p>
                <p className="text-[11px] text-slate-500">Your personalized plan</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
