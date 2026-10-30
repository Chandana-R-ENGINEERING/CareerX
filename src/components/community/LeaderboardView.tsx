import React, { useState } from 'react';
import { Trophy, Award, Flame, Users, Sparkles, Star } from 'lucide-react';
import { sampleLeaderboardUsers } from '../../data/seedData';
import { useApp } from '../../context/AppContext';

export const LeaderboardView: React.FC = () => {
  const { user } = useApp();
  const [filterView, setFilterView] = useState<'Global' | 'Regional'>('Global');

  // If user changed score, dynamically reflect user ranking
  const leaderboard = sampleLeaderboardUsers.map((u) => {
    if (u.isCurrentUser || u.name === 'Chandana') {
      return {
        ...u,
        name: `${user.name} (You)`,
        batch: user.batch,
        college: user.college,
        codingPoints: 2190 + (user.dailyGoalSolved * 30),
      };
    }
    return u;
  });

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 font-sans">
      {/* Title matching SkillUp screenshot 4ade6e0e */}
      <div className="flex items-center gap-3">
        <div className="text-3xl">🏆</div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2a241e] tracking-tight">
            Leaderboard
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Compete with peers and climb the rankings.
          </p>
        </div>
      </div>

      {/* Filter by View Card matching screenshot */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3">Filter by View</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterView('Global')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              filterView === 'Global'
                ? 'bg-[#8ea755] text-white shadow-md shadow-[#8ea755]/25'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setFilterView('Regional')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              filterView === 'Regional'
                ? 'bg-[#8ea755] text-white shadow-md shadow-[#8ea755]/25'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            Regional
          </button>
        </div>
      </div>

      {/* Global Rankings Table matching screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {filterView === 'Global' ? 'Global Rankings' : 'Regional / College Rankings'}
          </h3>
          <span className="text-xs text-slate-400 font-medium">Updated 5 minutes ago</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Batch</th>
                <th className="py-4 px-6 text-right">Overall Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {leaderboard.map((item) => {
                const isRank1 = item.rank === 1;
                const isCurrentUser = item.isCurrentUser;

                return (
                  <tr
                    key={item.rank}
                    className={`transition-colors ${
                      isRank1
                        ? 'bg-[#fef4dc]/80 hover:bg-[#fef4dc]'
                        : isCurrentUser
                        ? 'bg-indigo-50/50 hover:bg-indigo-50/70 font-semibold'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item.rank}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {item.rank === 1 && '👑'}
                          {item.rank === 2 && '🥈'}
                          {item.rank === 3 && '🥉'}
                          {item.rank === 4 && '⭐'}
                          {item.rank > 4 && '👤'}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-[11px] text-slate-400 font-normal">{item.college}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {item.batch}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <span className="font-black text-sm sm:text-base text-[#8ea755]">
                        {item.overallScore}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
