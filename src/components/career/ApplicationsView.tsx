import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  XCircle,
  Briefcase,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobApplication } from '../../types';

export const ApplicationsView: React.FC = () => {
  const { applications, addApplication, updateApplicationStatus } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('Remote');
  const [notes, setNotes] = useState('');

  const statuses: JobApplication['status'][] = [
    'Applied',
    'Assessment',
    'Interview',
    'Offer',
    'Rejected',
  ];

  const filtered = applications.filter((app) => {
    return filterStatus === 'All' || app.status === filterStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;

    addApplication({
      company,
      role,
      appliedDate: 'Today',
      status: 'Applied',
      location: location || 'Bengaluru',
      logoLetter: company.charAt(0).toUpperCase(),
      logoBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      salary: salary || '₹40,000 / month',
      notes,
    });

    setIsAddModalOpen(false);
    setCompany('');
    setRole('');
    setSalary('');
    setNotes('');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Application Tracker
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Track interview rounds, assessments, and compensation offers in one place.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-600/25 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Application</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', ...statuses].map((st) => {
          const count =
            st === 'All'
              ? applications.length
              : applications.filter((a) => a.status === st).length;
          const isActive = filterStatus === st;

          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{st}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((app) => {
          const statusBadge = {
            Applied: 'bg-blue-50 text-blue-700 border-blue-200',
            Assessment: 'bg-amber-50 text-amber-700 border-amber-200',
            Interview: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            Offer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            Rejected: 'bg-slate-100 text-slate-600 border-slate-200',
          };

          return (
            <div
              key={app.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base ${app.logoBg}`}
                    >
                      {app.logoLetter}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{app.company}</h3>
                      <p className="text-xs text-slate-500 font-medium">{app.role}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusBadge[app.status]}`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{app.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Applied on: {app.appliedDate}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Package: {app.salary}</span>
                  </p>
                </div>

                {app.notes && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                    <p className="font-semibold text-slate-800 mb-0.5">Notes:</p>
                    <p className="line-clamp-2">{app.notes}</p>
                  </div>
                )}
              </div>

              {/* Status Update Selector */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">Move status:</span>
                <select
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090e1c]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 font-sans space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900">Track An Application</h3>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Adobe, Uber, Zomato"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Role</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Full Stack Developer Intern"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stipend / CTC</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="₹50,000 / mo"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Remote / Bengaluru"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Interview / Referral Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Interview on Wednesday, DSA focus..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
