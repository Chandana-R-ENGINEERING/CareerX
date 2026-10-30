import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  Users,
  Award,
  Lock,
  Mail,
  KeyRound,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PlacementInsightsView: React.FC = () => {
  const { user } = useApp();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState(user.email || 'student@gcek.ac.in');
  const [secretKey, setSecretKey] = useState('secret123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKey === 'secret123' || secretKey.length > 3) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Secret Key. Use demo credentials: secret123');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 font-sans">
      {!isUnlocked ? (
        /* Login Screen matching Screenshot 834f9674 */
        <div className="py-8 flex flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2a241e] tracking-tight">
              Placement Insights Login
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Access college placement data, past statistics, and verified student success stories.
            </p>
          </div>

          <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 text-center mb-6">
              Login to Placement Insights
            </h3>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your College Email ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.ac.in"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8ea755]/20 focus:border-[#8ea755] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Secret Key</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="secret123"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8ea755]/20 focus:border-[#8ea755] transition-all"
                  />
                </div>
              </div>

              {errorMsg && <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#8ea755] hover:bg-[#7e954b] text-white font-bold text-sm shadow-md shadow-[#8ea755]/25 transition-all cursor-pointer"
              >
                Login
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Demo credentials: <strong className="text-slate-600">secret123</strong> (any email)
            </p>
          </div>
        </div>
      ) : (
        /* Unlocked Placement Insights Dashboard */
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-bold text-[#8ea755] uppercase tracking-wider">
                Authenticated Portal
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Campus Placement Analytics & Trends
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Batch 2024-2025 verified recruiting records and company compensation bands
              </p>
            </div>

            <button
              onClick={() => setIsUnlocked(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500">Placement Rate</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#8ea755] mt-1">94.2%</p>
              <p className="text-[11px] text-slate-400 mt-0.5">482 / 512 eligible students</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500">Highest CTC</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1">₹44.0 LPA</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Amazon AWS SDE</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500">Average CTC</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">₹8.4 LPA</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">+14% YoY increase</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-500">Total Recruiters</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">118+</p>
              <p className="text-[11px] text-slate-400 mt-0.5">32 Dream Tier 1 firms</p>
            </div>
          </div>

          {/* Tier-Wise Company Hiring Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Company Tier Breakdown</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-600 text-white">
                  TIER 1 (Dream)
                </span>
                <h4 className="font-bold text-slate-900 text-sm">₹15.0 - ₹45.0 LPA</h4>
                <p className="text-xs text-slate-600">
                  Google, Microsoft, Amazon, PhonePe, Cisco, Oracle, Arcesium.
                </p>
                <p className="text-[11px] text-indigo-700 font-semibold">Criteria: 7.5+ CGPA, DSA Hard</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-600 text-white">
                  TIER 2 (Product)
                </span>
                <h4 className="font-bold text-slate-900 text-sm">₹8.0 - ₹15.0 LPA</h4>
                <p className="text-xs text-slate-600">
                  Razorpay, Swiggy, Cred, Dell, TCS Innovator, Cognizant GenC Next.
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold">Criteria: 6.5+ CGPA, MERN / Full Stack</p>
              </div>

              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/40 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-600 text-white">
                  TIER 3 (Mass / IT Services)
                </span>
                <h4 className="font-bold text-slate-900 text-sm">₹4.0 - ₹7.5 LPA</h4>
                <p className="text-xs text-slate-600">
                  TCS Ninja, Infosys Wings, Wipro Turbo, Capgemini, Accenture.
                </p>
                <p className="text-[11px] text-amber-700 font-semibold">Criteria: 6.0+ CGPA, Strong Aptitude</p>
              </div>
            </div>
          </div>

          {/* Student Success Debriefs */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Student Placement Debriefs & Tips</h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">
                    Raj Kumar (B.Tech CSE '24) • Placed at Microsoft (₹42 LPA)
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-600">Verified Offer</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Focus heavily on Two Pointers, Sliding Window, and Trees. Microsoft interviewers dug deeply
                  into my project's Redis caching layer and how I handled stale cached keys. The CareerX mock
                  interviews prepared me exactly for this scenario!"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">
                    Priya Singh (B.Tech IT '24) • Placed at Razorpay (₹16 LPA)
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-600">Verified Offer</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Quantitative aptitude was the initial screening filter where 60% of applicants were eliminated.
                  Practicing time-bound tests on CareerX ensured I cleared the 30-minute threshold with ease."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
