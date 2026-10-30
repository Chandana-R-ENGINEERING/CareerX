import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Send,
  X,
  FileCheck,
} from 'lucide-react';
import { sampleJobs } from '../../data/seedData';
import { useApp } from '../../context/AppContext';
import { JobListing } from '../../types';

export const JobsView: React.FC = () => {
  const { savedJobIds, toggleSaveJob, addApplication, user, setIsAiDrawerOpen } = useApp();

  const [search, setSearch] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState<'All' | 'Remote' | 'Hybrid' | 'On-site'>('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobListing | null>(null);
  const [applicationNotes, setApplicationNotes] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const filteredJobs = sampleJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skillsRequired.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesMode = workModeFilter === 'All' || job.workMode === workModeFilter;
    return matchesSearch && matchesMode;
  });

  const handleOpenApplyModal = (job: JobListing) => {
    setSelectedJobForModal(job);
    setIsApproved(false);
    setApplicationNotes('');
  };

  const handleConfirmApplication = () => {
    if (!selectedJobForModal || !isApproved) return;

    addApplication({
      company: selectedJobForModal.company,
      role: selectedJobForModal.title,
      appliedDate: 'Today',
      status: 'Applied',
      location: selectedJobForModal.location,
      logoLetter: selectedJobForModal.company.charAt(0),
      logoBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      salary: selectedJobForModal.stipendOrSalary,
      notes: applicationNotes || 'Applied with customized ATS resume via CareerX.',
    });

    setSelectedJobForModal(null);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Verified Opportunities
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Curated internships and campus drives matching your profile and skills.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by role, company..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value as any)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Company & Match Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100 font-extrabold text-lg flex items-center justify-center shrink-0">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {job.company} • {job.workMode}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    title={isSaved ? 'Saved' : 'Save job'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Match Score & Badges */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    {job.matchScore}% Match
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {job.stipendOrSalary}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">
                    {job.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.skillsRequired.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Eligibility info */}
                <p className="text-[11px] text-slate-400 mt-3">
                  <strong>Eligibility:</strong> {job.eligibility}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Deadline: {job.deadline}</span>

                <button
                  onClick={() => handleOpenApplyModal(job)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  Review & Apply
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Human-in-the-loop explicit application approval modal (Prompt section 10 requirement) */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090e1c]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 font-sans space-y-5">
            <button
              onClick={() => setSelectedJobForModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                Human Review & Approval
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Apply to {selectedJobForModal.company}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Role: <strong>{selectedJobForModal.title}</strong> • Package: {selectedJobForModal.stipendOrSalary}
              </p>
            </div>

            {/* Application Package Review */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Attached Profile & Resume:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ATS Score: {user.scores.resumeSkills}/30
                </span>
              </div>
              <p className="text-slate-600">
                <strong>Applicant:</strong> {user.name} ({user.email}) • {user.college}
              </p>
              <p className="text-slate-600">
                <strong>Matched Core Skills:</strong> {selectedJobForModal.skillsRequired.slice(0, 4).join(', ')}
              </p>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Recruiter Note / Referral Code (Optional)
              </label>
              <textarea
                rows={2}
                value={applicationNotes}
                onChange={(e) => setApplicationNotes(e.target.value)}
                placeholder="Mention key projects, available joining dates, or referral employee IDs..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            {/* Explicit Human Approval Checkbox (Security Constraint) */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 cursor-pointer">
              <input
                type="checkbox"
                checked={isApproved}
                onChange={(e) => setIsApproved(e.target.checked)}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                <strong>Explicit Approval:</strong> I have verified this job's eligibility criteria and
                authorize tracking this submission under my CareerX account.
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmApplication}
                disabled={!isApproved}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit & Track Application</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
